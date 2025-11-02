import { MongoClient } from 'mongodb';
import { sendBankTransferEmail, sendBankTransferNotificationToAdmin } from '../../utils/email.js';
import { generatePaymentReference } from '../../utils/payment-reference.js';
import { getUserStatus, formatSuspensionEndDate, getSuspensionEndDate, autoReactivateExpiredSuspensions } from '../../utils/account-suspension.js';
import { validateCartTotal, validateTotalAmount } from '../lib/price-validation';

interface VercelRequest {
  query: { [key: string]: string | string[] | undefined };
  body: any;
  cookies: { [key: string]: string };
  method: string;
  url: string;
  headers: { [key: string]: string };
}

interface VercelResponse {
  status: (code: number) => VercelResponse;
  json: (object: any) => VercelResponse;
  setHeader: (name: string, value: string | string[]) => VercelResponse;
  end: (chunk?: any) => void;
}

interface BankTransferData {
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
  }>;
}

// REMOVED: Old generateOrderReference() function
// Now using centralized generatePaymentReference() from utils/payment-reference.ts
// This ensures consistent format: "FirstName LastName + 4 digits" everywhere

async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    const {
      customerEmail,
      customerName,
      totalAmount,
      cartItems
    }: BankTransferData = req.body;

    if (!customerEmail || !customerName || !totalAmount || !cartItems || cartItems.length === 0) {
      return res.status(400).json({
        error: 'Tous les champs sont obligatoires',
        missing: {
          customerEmail: !customerEmail,
          customerName: !customerName,
          totalAmount: !totalAmount,
          cartItems: !cartItems || cartItems.length === 0
        }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customerEmail)) {
      return res.status(400).json({ error: 'Format email invalide' });
    }

    // SECURITY: Validate cart prices against server-side product catalog
    const validation = validateCartTotal(cartItems);
    
    if (!validation.valid) {
      console.error(`[Bank Transfer Security] Cart validation failed: ${validation.error}`);
      return res.status(400).json({
        error: validation.error || 'Validation du panier échouée',
        details: validation.details
      });
    }

    // SECURITY: Validate that client total matches server calculation
    if (!validateTotalAmount(totalAmount, validation.serverTotal)) {
      console.error(`[Bank Transfer Security] Amount mismatch - Server: ${validation.serverTotal}€, Client: ${totalAmount}€`);
      return res.status(400).json({
        error: `Montant invalide. Montant calculé: ${validation.serverTotal}€`,
        serverTotal: validation.serverTotal,
        clientTotal: totalAmount
      });
    }

    // Use server-calculated amount (never trust client)
    const validatedAmount = validation.serverTotal;

    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      return res.status(500).json({ error: 'Configuration MongoDB manquante' });
    }

    const client = new MongoClient(mongoUri);

    try {
      await client.connect();

      const db = client.db('luxio');
      const ordersCollection = db.collection('bank_transfer_orders');
      const usersCollection = db.collection('users');

      await autoReactivateExpiredSuspensions(usersCollection);

      // Récupérer la langue de l'utilisateur
      const user = await usersCollection.findOne({ email: customerEmail.toLowerCase() });
      const userLanguage = user?.language || 'fr';

      if (user) {
        const userStatus = getUserStatus(user);
        if (userStatus === 'suspended') {
          const suspensionEndDate = getSuspensionEndDate(user);
          const formattedDate = suspensionEndDate 
            ? formatSuspensionEndDate(suspensionEndDate, userLanguage)
            : '';
          
          return res.status(403).json({
            error: 'suspended',
            message: userLanguage === 'fr' 
              ? `Votre compte est temporairement suspendu suite à plusieurs commandes non payées. Réactivation automatique prévue le ${formattedDate}.`
              : userLanguage === 'en'
              ? `Your account is temporarily suspended due to multiple unpaid orders. Automatic reactivation scheduled for ${formattedDate}.`
              : userLanguage === 'es'
              ? `Su cuenta está temporalmente suspendida debido a múltiples pedidos no pagados. Reactivación automática prevista para el ${formattedDate}.`
              : userLanguage === 'pt'
              ? `Sua conta está temporariamente suspensa devido a vários pedidos não pagos. Reativação automática prevista para ${formattedDate}.`
              : userLanguage === 'pl'
              ? `Twoje konto jest tymczasowo zawieszone z powodu wielu niezapłaconych zamówień. Automatyczna reaktywacja zaplanowana na ${formattedDate}.`
              : `Fiókja ideiglenesen fel van függesztve több fizetetlen rendelés miatt. Automatikus újraaktiválás tervezve: ${formattedDate}.`,
            suspendedUntil: suspensionEndDate
          });
        }
      }

      // Generate standardized payment reference: "FirstName LastName + 4 digits"
      const paymentReference = generatePaymentReference(customerName);

      const newOrder = {
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount: validatedAmount,
        cartItems,
        orderReference: paymentReference,  // Use the standardized reference
        paymentMethod: 'bank_transfer',
        status: 'pending',
        language: userLanguage,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await ordersCollection.insertOne(newOrder);
      const orderId = result.insertedId.toString();

      const bankDetails = {
        orderId,
        orderReference: paymentReference,  // Same reference everywhere
        customerEmail: customerEmail.toLowerCase(),
        customerName,
        totalAmount: validatedAmount,
        bankName: 'Matt Luxio',
        iban: 'ES6115632626383268707364',
        bic: 'NTSBESM1XXX',
        reference: paymentReference,  // ✅ NOW USES STANDARDIZED FORMAT: "Name + 4 digits"
        cartItems,
        language: userLanguage
      };

      Promise.all([
        sendBankTransferEmail(bankDetails),
        sendBankTransferNotificationToAdmin(bankDetails)
      ]).catch((error: Error) => {
        console.error('Erreur lors de l\'envoi des emails de virement:', error);
      });

      return res.status(201).json({
        success: true,
        message: 'Commande enregistrée avec succès',
        orderId,
        orderReference: paymentReference,  // Consistent reference
        status: 'pending',
        bankDetails: {
          bankName: bankDetails.bankName,
          iban: bankDetails.iban,
          bic: bankDetails.bic,
          reference: paymentReference,  // ✅ Standardized format everywhere
          amount: totalAmount
        }
      });
    } finally {
      await client.close();
    }

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement de la commande par virement:', error);
    return res.status(500).json({
      error: 'Erreur serveur lors de l\'enregistrement de la commande',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export default handler;
