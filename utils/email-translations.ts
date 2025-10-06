export type EmailLanguage = 'fr' | 'en' | 'es' | 'pt' | 'pl' | 'hu';

export interface EmailTranslations {
  // Subjects
  subject_welcome: string;
  subject_order_confirm: string;
  subject_ticket_confirm: string;
  subject_crypto_confirm: string;
  subject_admin_new_order: string;
  
  // Common
  hello: string;
  team_signature: string;
  footer_note: string;
  access_dashboard: string;
  
  // Welcome Email
  welcome_title: string;
  welcome_message: string;
  discover_products: string;
  
  // Order Confirmation
  order_confirmed: string;
  order_received: string;
  order_number: string;
  total_amount: string;
  payment_method: string;
  status: string;
  
  // Bank Transfer
  bank_instructions: string;
  beneficiary: string;
  iban: string;
  bic: string;
  transfer_reason: string;
  delivery_time: string;
  proof_instruction: string;
  
  // Ticket Payment
  ticket_type: string;
  codes_submitted: string;
  pending_validation: string;
  validation_time: string;
  
  // Crypto Payment
  transaction_id: string;
  payment_received: string;
  verification_message: string;
  
  // Admin Notifications
  new_order_received: string;
  customer_name: string;
  customer_email: string;
  bank_transfer: string;
  ticket_payment: string;
  crypto_payment: string;
}

export const emailTranslations: Record<EmailLanguage, EmailTranslations> = {
  fr: {
    // Subjects
    subject_welcome: 'Bienvenue chez Luxio',
    subject_order_confirm: 'Confirmation de commande – Luxio',
    subject_ticket_confirm: 'Confirmation de commande – Luxio',
    subject_crypto_confirm: 'Confirmation de commande – Luxio',
    subject_admin_new_order: 'Nouvelle commande reçue',
    
    // Common
    hello: 'Bonjour',
    team_signature: 'Équipe Luxio',
    footer_note: 'Cet email a été envoyé automatiquement.',
    access_dashboard: 'Accéder à mon espace',
    
    // Welcome Email
    welcome_title: 'Bienvenue chez Luxio',
    welcome_message: 'Nous sommes ravis de vous compter parmi nous. Découvrez dès maintenant notre sélection de produits premium.',
    discover_products: 'Découvrir nos produits',
    
    // Order Confirmation
    order_confirmed: 'Commande confirmée',
    order_received: 'Nous avons bien reçu votre commande.',
    order_number: 'Commande',
    total_amount: 'Montant',
    payment_method: 'Paiement',
    status: 'Statut',
    
    // Bank Transfer
    bank_instructions: 'Veuillez effectuer votre virement avec les informations suivantes :',
    beneficiary: 'Bénéficiaire',
    iban: 'IBAN',
    bic: 'BIC',
    transfer_reason: 'Motif',
    delivery_time: 'Livraison sous 24-72h après réception du virement.',
    proof_instruction: 'Pour accélérer la vérification, envoyez votre preuve de virement à infos@luxioshopping.com',
    
    // Ticket Payment
    ticket_type: 'Type de ticket',
    codes_submitted: 'Codes soumis',
    pending_validation: 'En attente de validation',
    validation_time: 'Validation sous 24-48h après vérification.',
    
    // Crypto Payment
    transaction_id: 'Transaction',
    payment_received: 'Votre paiement a bien été reçu.',
    verification_message: 'Livraison après vérification blockchain.',
    
    // Admin Notifications
    new_order_received: 'Nouvelle commande',
    customer_name: 'Client',
    customer_email: 'Email',
    bank_transfer: 'Virement bancaire',
    ticket_payment: 'Paiement par tickets',
    crypto_payment: 'Paiement crypto'
  },
  en: {
    // Subjects
    subject_welcome: 'Welcome to Luxio',
    subject_order_confirm: 'Order Confirmation – Luxio',
    subject_ticket_confirm: 'Order Confirmation – Luxio',
    subject_crypto_confirm: 'Order Confirmation – Luxio',
    subject_admin_new_order: 'New Order Received',
    
    // Common
    hello: 'Hello',
    team_signature: 'Luxio Team',
    footer_note: 'This email was sent automatically.',
    access_dashboard: 'Access my dashboard',
    
    // Welcome Email
    welcome_title: 'Welcome to Luxio',
    welcome_message: 'We are thrilled to have you with us. Discover our premium product selection now.',
    discover_products: 'Discover our products',
    
    // Order Confirmation
    order_confirmed: 'Order confirmed',
    order_received: 'We have received your order.',
    order_number: 'Order',
    total_amount: 'Amount',
    payment_method: 'Payment',
    status: 'Status',
    
    // Bank Transfer
    bank_instructions: 'Please complete your bank transfer using the following details:',
    beneficiary: 'Beneficiary',
    iban: 'IBAN',
    bic: 'BIC',
    transfer_reason: 'Reference',
    delivery_time: 'Delivery within 24-72h after payment receipt.',
    proof_instruction: 'To speed up verification, send your payment proof to infos@luxioshopping.com',
    
    // Ticket Payment
    ticket_type: 'Ticket type',
    codes_submitted: 'Codes submitted',
    pending_validation: 'Pending validation',
    validation_time: 'Validation within 24-48h after verification.',
    
    // Crypto Payment
    transaction_id: 'Transaction',
    payment_received: 'Your payment has been received.',
    verification_message: 'Delivery after blockchain verification.',
    
    // Admin Notifications
    new_order_received: 'New Order',
    customer_name: 'Customer',
    customer_email: 'Email',
    bank_transfer: 'Bank Transfer',
    ticket_payment: 'Ticket Payment',
    crypto_payment: 'Crypto Payment'
  },
  es: {
    // Subjects
    subject_welcome: 'Bienvenido a Luxio',
    subject_order_confirm: 'Confirmación de pedido – Luxio',
    subject_ticket_confirm: 'Confirmación de pedido – Luxio',
    subject_crypto_confirm: 'Confirmación de pedido – Luxio',
    subject_admin_new_order: 'Nuevo pedido recibido',
    
    // Common
    hello: 'Hola',
    team_signature: 'Equipo Luxio',
    footer_note: 'Este correo fue enviado automáticamente.',
    access_dashboard: 'Acceder a mi panel',
    
    // Welcome Email
    welcome_title: 'Bienvenido a Luxio',
    welcome_message: 'Estamos encantados de tenerte con nosotros. Descubre ahora nuestra selección de productos premium.',
    discover_products: 'Descubrir nuestros productos',
    
    // Order Confirmation
    order_confirmed: 'Pedido confirmado',
    order_received: 'Hemos recibido su pedido.',
    order_number: 'Pedido',
    total_amount: 'Monto',
    payment_method: 'Pago',
    status: 'Estado',
    
    // Bank Transfer
    bank_instructions: 'Por favor, realice su transferencia con los siguientes datos:',
    beneficiary: 'Beneficiario',
    iban: 'IBAN',
    bic: 'BIC',
    transfer_reason: 'Motivo',
    delivery_time: 'Entrega en 24-72h después de recibir el pago.',
    proof_instruction: 'Para acelerar la verificación, envíe su comprobante de pago a infos@luxioshopping.com',
    
    // Ticket Payment
    ticket_type: 'Tipo de ticket',
    codes_submitted: 'Códigos enviados',
    pending_validation: 'Pendiente de validación',
    validation_time: 'Validación en 24-48h después de verificación.',
    
    // Crypto Payment
    transaction_id: 'Transacción',
    payment_received: 'Su pago ha sido recibido.',
    verification_message: 'Entrega después de verificación blockchain.',
    
    // Admin Notifications
    new_order_received: 'Nuevo Pedido',
    customer_name: 'Cliente',
    customer_email: 'Email',
    bank_transfer: 'Transferencia Bancaria',
    ticket_payment: 'Pago con Tickets',
    crypto_payment: 'Pago Crypto'
  },
  pt: {
    // Subjects
    subject_welcome: 'Bem-vindo ao Luxio',
    subject_order_confirm: 'Confirmação de pedido – Luxio',
    subject_ticket_confirm: 'Confirmação de pedido – Luxio',
    subject_crypto_confirm: 'Confirmação de pedido – Luxio',
    subject_admin_new_order: 'Novo pedido recebido',
    
    // Common
    hello: 'Olá',
    team_signature: 'Equipe Luxio',
    footer_note: 'Este email foi enviado automaticamente.',
    access_dashboard: 'Acessar meu painel',
    
    // Welcome Email
    welcome_title: 'Bem-vindo ao Luxio',
    welcome_message: 'Estamos felizes em tê-lo conosco. Descubra agora nossa seleção de produtos premium.',
    discover_products: 'Descobrir nossos produtos',
    
    // Order Confirmation
    order_confirmed: 'Pedido confirmado',
    order_received: 'Recebemos seu pedido.',
    order_number: 'Pedido',
    total_amount: 'Valor',
    payment_method: 'Pagamento',
    status: 'Status',
    
    // Bank Transfer
    bank_instructions: 'Por favor, faça sua transferência com as seguintes informações:',
    beneficiary: 'Beneficiário',
    iban: 'IBAN',
    bic: 'BIC',
    transfer_reason: 'Motivo',
    delivery_time: 'Entrega em 24-72h após recebimento do pagamento.',
    proof_instruction: 'Para acelerar a verificação, envie seu comprovante de pagamento para infos@luxioshopping.com',
    
    // Ticket Payment
    ticket_type: 'Tipo de ticket',
    codes_submitted: 'Códigos enviados',
    pending_validation: 'Pendente de validação',
    validation_time: 'Validação em 24-48h após verificação.',
    
    // Crypto Payment
    transaction_id: 'Transação',
    payment_received: 'Seu pagamento foi recebido.',
    verification_message: 'Entrega após verificação blockchain.',
    
    // Admin Notifications
    new_order_received: 'Novo Pedido',
    customer_name: 'Cliente',
    customer_email: 'Email',
    bank_transfer: 'Transferência Bancária',
    ticket_payment: 'Pagamento por Tickets',
    crypto_payment: 'Pagamento Crypto'
  },
  pl: {
    // Subjects
    subject_welcome: 'Witamy w Luxio',
    subject_order_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_ticket_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_crypto_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_admin_new_order: 'Otrzymano nowe zamówienie',
    
    // Common
    hello: 'Cześć',
    team_signature: 'Zespół Luxio',
    footer_note: 'Ten email został wysłany automatycznie.',
    access_dashboard: 'Dostęp do mojego panelu',
    
    // Welcome Email
    welcome_title: 'Witamy w Luxio',
    welcome_message: 'Cieszymy się, że jesteś z nami. Odkryj teraz naszą ofertę produktów premium.',
    discover_products: 'Odkryj nasze produkty',
    
    // Order Confirmation
    order_confirmed: 'Zamówienie potwierdzone',
    order_received: 'Otrzymaliśmy Twoje zamówienie.',
    order_number: 'Zamówienie',
    total_amount: 'Kwota',
    payment_method: 'Płatność',
    status: 'Status',
    
    // Bank Transfer
    bank_instructions: 'Proszę wykonać przelew z następującymi danymi:',
    beneficiary: 'Beneficjent',
    iban: 'IBAN',
    bic: 'BIC',
    transfer_reason: 'Tytuł',
    delivery_time: 'Dostawa w ciągu 24-72h po otrzymaniu płatności.',
    proof_instruction: 'Aby przyspieszyć weryfikację, wyślij potwierdzenie przelewu na infos@luxioshopping.com',
    
    // Ticket Payment
    ticket_type: 'Typ biletu',
    codes_submitted: 'Przesłane kody',
    pending_validation: 'Oczekuje na walidację',
    validation_time: 'Walidacja w ciągu 24-48h po weryfikacji.',
    
    // Crypto Payment
    transaction_id: 'Transakcja',
    payment_received: 'Otrzymaliśmy Twoją płatność.',
    verification_message: 'Dostawa po weryfikacji blockchain.',
    
    // Admin Notifications
    new_order_received: 'Nowe Zamówienie',
    customer_name: 'Klient',
    customer_email: 'Email',
    bank_transfer: 'Przelew Bankowy',
    ticket_payment: 'Płatność Biletami',
    crypto_payment: 'Płatność Crypto'
  },
  hu: {
    // Subjects
    subject_welcome: 'Üdvözöljük a Luxio-nál',
    subject_order_confirm: 'Rendelés megerősítése – Luxio',
    subject_ticket_confirm: 'Rendelés megerősítése – Luxio',
    subject_crypto_confirm: 'Rendelés megerősítése – Luxio',
    subject_admin_new_order: 'Új rendelés érkezett',
    
    // Common
    hello: 'Helló',
    team_signature: 'Luxio Csapat',
    footer_note: 'Ez az email automatikusan lett elküldve.',
    access_dashboard: 'Hozzáférés a vezérlőpulhoz',
    
    // Welcome Email
    welcome_title: 'Üdvözöljük a Luxio-nál',
    welcome_message: 'Örülünk, hogy velünk vagy. Fedezd fel prémium termékeinket most.',
    discover_products: 'Termékek felfedezése',
    
    // Order Confirmation
    order_confirmed: 'Rendelés megerősítve',
    order_received: 'Megkaptuk a rendelését.',
    order_number: 'Rendelés',
    total_amount: 'Összeg',
    payment_method: 'Fizetés',
    status: 'Státusz',
    
    // Bank Transfer
    bank_instructions: 'Kérjük, végezze el az utalást az alábbi adatokkal:',
    beneficiary: 'Kedvezményezett',
    iban: 'IBAN',
    bic: 'BIC',
    transfer_reason: 'Közlemény',
    delivery_time: 'Szállítás 24-72 órán belül a fizetés beérkezése után.',
    proof_instruction: 'A gyorsabb ellenőrzéshez küldje el az átutalási igazolást a infos@luxioshopping.com címre',
    
    // Ticket Payment
    ticket_type: 'Jegy típusa',
    codes_submitted: 'Beküldött kódok',
    pending_validation: 'Érvényesítésre vár',
    validation_time: 'Érvényesítés 24-48 órán belül ellenőrzés után.',
    
    // Crypto Payment
    transaction_id: 'Tranzakció',
    payment_received: 'Megkaptuk a fizetését.',
    verification_message: 'Szállítás blockchain ellenőrzés után.',
    
    // Admin Notifications
    new_order_received: 'Új Rendelés',
    customer_name: 'Ügyfél',
    customer_email: 'Email',
    bank_transfer: 'Banki Átutalás',
    ticket_payment: 'Jegyes Fizetés',
    crypto_payment: 'Kripto Fizetés'
  }
};

export function getTranslation(language: EmailLanguage): EmailTranslations {
  return emailTranslations[language] || emailTranslations.fr;
}
