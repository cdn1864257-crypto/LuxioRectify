export type EmailLanguage = 'fr' | 'en' | 'es' | 'pt' | 'pl' | 'hu';

export interface EmailTranslations {
  subject_order_confirm: string;
  subject_ticket_confirm: string;
  subject_crypto_confirm: string;
  subject_admin_new_order: string;
  hello: string;
  order_confirmed: string;
  bank_instructions: string;
  instant_transfer: string;
  standard_transfer: string;
  ticket_thanks: string;
  pending_validation: string;
  ticket_wait_message: string;
  crypto_received: string;
  crypto_validation_message: string;
  access_dashboard: string;
  footer_note: string;
  team_signature: string;
  order_summary: string;
  order_number: string;
  total_amount: string;
  payment_method: string;
  customer_name: string;
  customer_email: string;
  items: string;
  quantity: string;
  price: string;
  beneficiary: string;
  iban: string;
  bic: string;
  reference: string;
  transfer_reason: string;
  order_details: string;
  ticket_type: string;
  codes_submitted: string;
  status: string;
  transaction_id: string;
  new_order_received: string;
  admin_notification: string;
  bank_transfer: string;
  ticket_payment: string;
  crypto_payment: string;
}

export const emailTranslations: Record<EmailLanguage, EmailTranslations> = {
  fr: {
    subject_order_confirm: 'Confirmation de commande – Luxio',
    subject_ticket_confirm: 'Confirmation de commande – Tickets TransCash/PCS',
    subject_crypto_confirm: 'Confirmation de commande – Paiement Crypto',
    subject_admin_new_order: 'Nouvelle commande reçue',
    hello: 'Bonjour',
    order_confirmed: 'Confirmation de commande',
    bank_instructions: 'Veuillez effectuer votre virement en suivant les instructions ci-dessous :',
    instant_transfer: 'Livraison sous 24h après virement immédiat.',
    standard_transfer: '48 à 72h selon votre banque.',
    ticket_thanks: 'Merci pour votre commande via tickets TransCash/PCS.',
    pending_validation: 'En attente de validation',
    ticket_wait_message: 'Votre commande sera validée sous 24 à 48h après vérification de vos codes.',
    crypto_received: 'Votre paiement via MaxelPay a bien été reçu.',
    crypto_validation_message: 'Nous procédons à la vérification sur la blockchain. Vous recevrez une confirmation dès validation.',
    access_dashboard: 'Accéder à mon espace client',
    footer_note: 'Cet email a été envoyé automatiquement. Merci de ne pas y répondre directement.',
    team_signature: '— Équipe Luxio – Service Client',
    order_summary: 'Récapitulatif de commande',
    order_number: 'Commande',
    total_amount: 'Montant total',
    payment_method: 'Méthode de paiement',
    customer_name: 'Client',
    customer_email: 'Email',
    items: 'Articles',
    quantity: 'Quantité',
    price: 'Prix',
    beneficiary: 'Bénéficiaire',
    iban: 'IBAN',
    bic: 'BIC',
    reference: 'Référence',
    transfer_reason: 'Motif',
    order_details: 'Détails de la commande',
    ticket_type: 'Type de ticket',
    codes_submitted: 'Codes soumis',
    status: 'Statut',
    transaction_id: 'Transaction',
    new_order_received: 'Nouvelle commande reçue',
    admin_notification: 'Notification administrateur',
    bank_transfer: 'Virement bancaire',
    ticket_payment: 'Paiement par tickets',
    crypto_payment: 'Paiement crypto'
  },
  en: {
    subject_order_confirm: 'Order Confirmation – Luxio',
    subject_ticket_confirm: 'Order Confirmation – Ticket Payment',
    subject_crypto_confirm: 'Order Confirmation – Crypto Payment',
    subject_admin_new_order: 'New Order Received',
    hello: 'Hello',
    order_confirmed: 'Order Confirmation',
    bank_instructions: 'Please complete your bank transfer using the details below:',
    instant_transfer: 'Delivery within 24h after instant transfer.',
    standard_transfer: '48–72h depending on your bank.',
    ticket_thanks: 'Thank you for your order via TransCash/PCS tickets.',
    pending_validation: 'Pending validation',
    ticket_wait_message: 'Your order will be validated within 24–48h after code verification.',
    crypto_received: 'Your MaxelPay payment has been received.',
    crypto_validation_message: 'We are verifying the blockchain transaction. You\'ll receive confirmation soon.',
    access_dashboard: 'Access my dashboard',
    footer_note: 'This email was sent automatically. Please do not reply directly.',
    team_signature: '— Luxio Support Team',
    order_summary: 'Order Summary',
    order_number: 'Order',
    total_amount: 'Total Amount',
    payment_method: 'Payment Method',
    customer_name: 'Customer',
    customer_email: 'Email',
    items: 'Items',
    quantity: 'Quantity',
    price: 'Price',
    beneficiary: 'Beneficiary',
    iban: 'IBAN',
    bic: 'BIC',
    reference: 'Reference',
    transfer_reason: 'Reason',
    order_details: 'Order Details',
    ticket_type: 'Ticket Type',
    codes_submitted: 'Codes Submitted',
    status: 'Status',
    transaction_id: 'Transaction',
    new_order_received: 'New Order Received',
    admin_notification: 'Admin Notification',
    bank_transfer: 'Bank Transfer',
    ticket_payment: 'Ticket Payment',
    crypto_payment: 'Crypto Payment'
  },
  es: {
    subject_order_confirm: 'Confirmación de pedido – Luxio',
    subject_ticket_confirm: 'Confirmación de pedido – Pago con tickets',
    subject_crypto_confirm: 'Confirmación de pedido – Pago Crypto',
    subject_admin_new_order: 'Nuevo pedido recibido',
    hello: 'Hola',
    order_confirmed: 'Confirmación de pedido',
    bank_instructions: 'Por favor, realice su transferencia bancaria siguiendo las instrucciones a continuación:',
    instant_transfer: 'Entrega en 24h después de transferencia inmediata.',
    standard_transfer: '48 a 72h según su banco.',
    ticket_thanks: 'Gracias por su pedido a través de tickets TransCash/PCS.',
    pending_validation: 'Pendiente de validación',
    ticket_wait_message: 'Su pedido será validado en 24–48h después de la verificación de sus códigos.',
    crypto_received: 'Su pago vía MaxelPay ha sido recibido.',
    crypto_validation_message: 'Estamos verificando la transacción en la blockchain. Recibirá una confirmación pronto.',
    access_dashboard: 'Acceder a mi panel',
    footer_note: 'Este correo fue enviado automáticamente. Por favor, no responda directamente.',
    team_signature: '— Equipo de Soporte Luxio',
    order_summary: 'Resumen del pedido',
    order_number: 'Pedido',
    total_amount: 'Monto total',
    payment_method: 'Método de pago',
    customer_name: 'Cliente',
    customer_email: 'Email',
    items: 'Artículos',
    quantity: 'Cantidad',
    price: 'Precio',
    beneficiary: 'Beneficiario',
    iban: 'IBAN',
    bic: 'BIC',
    reference: 'Referencia',
    transfer_reason: 'Motivo',
    order_details: 'Detalles del pedido',
    ticket_type: 'Tipo de ticket',
    codes_submitted: 'Códigos enviados',
    status: 'Estado',
    transaction_id: 'Transacción',
    new_order_received: 'Nuevo pedido recibido',
    admin_notification: 'Notificación de administrador',
    bank_transfer: 'Transferencia bancaria',
    ticket_payment: 'Pago con tickets',
    crypto_payment: 'Pago crypto'
  },
  pt: {
    subject_order_confirm: 'Confirmação de pedido – Luxio',
    subject_ticket_confirm: 'Confirmação de pedido – Pagamento com tickets',
    subject_crypto_confirm: 'Confirmação de pedido – Pagamento Crypto',
    subject_admin_new_order: 'Novo pedido recebido',
    hello: 'Olá',
    order_confirmed: 'Confirmação de pedido',
    bank_instructions: 'Por favor, complete sua transferência bancária usando os detalhes abaixo:',
    instant_transfer: 'Entrega em 24h após transferência imediata.',
    standard_transfer: '48–72h dependendo do seu banco.',
    ticket_thanks: 'Obrigado pelo seu pedido via tickets TransCash/PCS.',
    pending_validation: 'Pendente de validação',
    ticket_wait_message: 'Seu pedido será validado em 24–48h após a verificação dos códigos.',
    crypto_received: 'Seu pagamento via MaxelPay foi recebido.',
    crypto_validation_message: 'Estamos verificando a transação no blockchain. Você receberá uma confirmação em breve.',
    access_dashboard: 'Acessar meu painel',
    footer_note: 'Este e-mail foi enviado automaticamente. Por favor, não responda diretamente.',
    team_signature: '— Equipe de Suporte Luxio',
    order_summary: 'Resumo do pedido',
    order_number: 'Pedido',
    total_amount: 'Valor total',
    payment_method: 'Método de pagamento',
    customer_name: 'Cliente',
    customer_email: 'Email',
    items: 'Itens',
    quantity: 'Quantidade',
    price: 'Preço',
    beneficiary: 'Beneficiário',
    iban: 'IBAN',
    bic: 'BIC',
    reference: 'Referência',
    transfer_reason: 'Motivo',
    order_details: 'Detalhes do pedido',
    ticket_type: 'Tipo de ticket',
    codes_submitted: 'Códigos enviados',
    status: 'Status',
    transaction_id: 'Transação',
    new_order_received: 'Novo pedido recebido',
    admin_notification: 'Notificação de administrador',
    bank_transfer: 'Transferência bancária',
    ticket_payment: 'Pagamento com tickets',
    crypto_payment: 'Pagamento crypto'
  },
  pl: {
    subject_order_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_ticket_confirm: 'Potwierdzenie zamówienia – Płatność biletami',
    subject_crypto_confirm: 'Potwierdzenie zamówienia – Płatność Crypto',
    subject_admin_new_order: 'Otrzymano nowe zamówienie',
    hello: 'Witaj',
    order_confirmed: 'Potwierdzenie zamówienia',
    bank_instructions: 'Prosimy o dokonanie przelewu bankowego zgodnie z poniższymi instrukcjami:',
    instant_transfer: 'Dostawa w ciągu 24h po natychmiastowym przelewie.',
    standard_transfer: '48–72h w zależności od Twojego banku.',
    ticket_thanks: 'Dziękujemy za zamówienie za pomocą biletów TransCash/PCS.',
    pending_validation: 'Oczekuje na weryfikację',
    ticket_wait_message: 'Twoje zamówienie zostanie zweryfikowane w ciągu 24–48h po sprawdzeniu kodów.',
    crypto_received: 'Twoja płatność przez MaxelPay została otrzymana.',
    crypto_validation_message: 'Weryfikujemy transakcję w blockchain. Wkrótce otrzymasz potwierdzenie.',
    access_dashboard: 'Przejdź do mojego panelu',
    footer_note: 'Ten e-mail został wysłany automatycznie. Prosimy nie odpowiadać bezpośrednio.',
    team_signature: '— Zespół Wsparcia Luxio',
    order_summary: 'Podsumowanie zamówienia',
    order_number: 'Zamówienie',
    total_amount: 'Łączna kwota',
    payment_method: 'Metoda płatności',
    customer_name: 'Klient',
    customer_email: 'Email',
    items: 'Przedmioty',
    quantity: 'Ilość',
    price: 'Cena',
    beneficiary: 'Beneficjent',
    iban: 'IBAN',
    bic: 'BIC',
    reference: 'Numer referencyjny',
    transfer_reason: 'Powód',
    order_details: 'Szczegóły zamówienia',
    ticket_type: 'Typ biletu',
    codes_submitted: 'Przesłane kody',
    status: 'Status',
    transaction_id: 'Transakcja',
    new_order_received: 'Otrzymano nowe zamówienie',
    admin_notification: 'Powiadomienie administratora',
    bank_transfer: 'Przelew bankowy',
    ticket_payment: 'Płatność biletami',
    crypto_payment: 'Płatność crypto'
  },
  hu: {
    subject_order_confirm: 'Rendelés megerősítése – Luxio',
    subject_ticket_confirm: 'Rendelés megerősítése – Jegy fizetés',
    subject_crypto_confirm: 'Rendelés megerősítése – Kripto fizetés',
    subject_admin_new_order: 'Új rendelés érkezett',
    hello: 'Szia',
    order_confirmed: 'Rendelés megerősítése',
    bank_instructions: 'Kérjük, teljesítse az átutalást az alábbi adatok szerint:',
    instant_transfer: 'Kézbesítés 24 órán belül azonnali utalás után.',
    standard_transfer: '48–72 óra a banktól függően.',
    ticket_thanks: 'Köszönjük rendelését TransCash/PCS jegyekkel.',
    pending_validation: 'Ellenőrzésre vár',
    ticket_wait_message: 'Rendelése 24–48 órán belül ellenőrzésre kerül a kódok ellenőrzése után.',
    crypto_received: 'MaxelPay fizetését megkaptuk.',
    crypto_validation_message: 'A blockchain tranzakciót ellenőrizzük. Hamarosan megerősítést kapsz.',
    access_dashboard: 'Hozzáférés a vezérlőpulthoz',
    footer_note: 'Ez az e-mail automatikusan lett elküldve. Kérjük, ne válaszoljon közvetlenül.',
    team_signature: '— Luxio Támogatási Csapat',
    order_summary: 'Rendelés összegzése',
    order_number: 'Rendelés',
    total_amount: 'Teljes összeg',
    payment_method: 'Fizetési mód',
    customer_name: 'Ügyfél',
    customer_email: 'Email',
    items: 'Tételek',
    quantity: 'Mennyiség',
    price: 'Ár',
    beneficiary: 'Kedvezményezett',
    iban: 'IBAN',
    bic: 'BIC',
    reference: 'Hivatkozás',
    transfer_reason: 'Ok',
    order_details: 'Rendelés részletei',
    ticket_type: 'Jegy típusa',
    codes_submitted: 'Beküldött kódok',
    status: 'Állapot',
    transaction_id: 'Tranzakció',
    new_order_received: 'Új rendelés érkezett',
    admin_notification: 'Adminisztrátor értesítés',
    bank_transfer: 'Banki átutalás',
    ticket_payment: 'Jegy fizetés',
    crypto_payment: 'Kripto fizetés'
  }
};

export function getTranslation(language: string | undefined): EmailTranslations {
  const lang = language?.toLowerCase();
  if (lang && lang in emailTranslations) {
    return emailTranslations[lang as EmailLanguage];
  }
  return emailTranslations.fr;
}
