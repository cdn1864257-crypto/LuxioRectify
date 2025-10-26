export type EmailLanguage = 'fr' | 'en' | 'es' | 'pt' | 'pl' | 'hu';

export interface EmailTranslations {
  // Subjects
  subject_welcome: string;
  subject_verify_email: string;
  subject_order_confirm: string;
  subject_ticket_confirm: string;
  subject_crypto_confirm: string;
  subject_admin_new_order: string;
  
  // Common
  hello: string;
  team_signature: string;
  footer_note: string;
  access_dashboard: string;
  
  // Email Verification
  verify_email_title: string;
  verify_email_message: string;
  verify_email_button: string;
  verify_email_expiration: string;
  
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
    subject_welcome: 'Bienvenue chez Luxio – Votre compte a été créé avec succès',
    subject_verify_email: 'Vérifiez votre adresse email – Luxio',
    subject_order_confirm: 'Confirmation de commande – Luxio',
    subject_ticket_confirm: 'Confirmation de commande – Luxio',
    subject_crypto_confirm: 'Confirmation de commande – Luxio',
    subject_admin_new_order: 'Nouvelle commande reçue',
    
    // Common
    hello: 'Bonjour',
    team_signature: 'Cordialement,\nL\'équipe Luxio\nVotre partenaire de confiance pour des produits premium',
    footer_note: 'Cet email a été envoyé automatiquement. Pour toute question, notre équipe est disponible 7j/7.',
    access_dashboard: 'Accéder à mon espace client',
    
    // Email Verification
    verify_email_title: 'Confirmez votre adresse email',
    verify_email_message: 'Merci de vous être inscrit chez Luxio !\n\nPour activer votre compte et accéder à notre catalogue exclusif de produits premium, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.',
    verify_email_button: 'Vérifier mon email',
    verify_email_expiration: 'Ce lien de vérification expirera dans 24 heures. Si le bouton ne fonctionne pas, copiez et collez ce lien dans votre navigateur :',
    
    // Welcome Email
    welcome_title: 'Bienvenue dans l\'univers Luxio ! 🎉',
    welcome_message: 'Merci d\'avoir rejoint Luxio, votre destination privilégiée pour des produits tech premium de haute qualité.\n\nVotre compte a été créé avec succès et vous pouvez dès maintenant profiter de notre catalogue exclusif de smartphones, montres connectées, sneakers et gadgets high-tech.\n\nChez Luxio, nous nous engageons à vous offrir :\n• Une sélection rigoureuse de produits premium authentiques\n• Une livraison rapide et sécurisée sous 24-72h\n• Un service client réactif disponible 7j/7\n• Des garanties constructeur de 2 ans sur tous nos produits',
    discover_products: 'Découvrir notre catalogue',
    
    // Order Confirmation
    order_confirmed: 'Votre commande a été confirmée avec succès ! ✓',
    order_received: 'Nous vous confirmons la bonne réception de votre commande. Notre équipe prépare déjà votre colis avec le plus grand soin.\n\nVous recevrez un email de suivi dès l\'expédition de vos articles.',
    order_number: 'Numéro de commande',
    total_amount: 'Montant total',
    payment_method: 'Mode de paiement',
    status: 'Statut de la commande',
    
    // Bank Transfer
    bank_instructions: 'Pour finaliser votre commande, veuillez effectuer un virement bancaire en utilisant les coordonnées ci-dessous.\n\nIMPORTANT : Merci d\'indiquer le motif exact du virement pour un traitement rapide de votre commande.',
    beneficiary: 'Bénéficiaire',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Motif du virement (obligatoire)',
    delivery_time: '📦 Livraison express sous 24-72h après validation de votre virement\n🔒 Emballage sécurisé et discret\n📍 Suivi de colis en temps réel',
    proof_instruction: '⚡ ASTUCE : Pour un traitement prioritaire, envoyez-nous votre justificatif de virement par email. Cela nous permettra de traiter votre commande jusqu\'à 48h plus rapidement.',
    
    // Ticket Payment
    ticket_type: 'Type de ticket prépayé',
    codes_submitted: 'Codes soumis',
    pending_validation: 'En cours de validation',
    validation_time: '⏱️ Validation en cours : Votre commande sera confirmée sous 24-48h après vérification de vos codes.\n\nNotre équipe vérifie manuellement chaque ticket pour garantir la sécurité de votre transaction.\n\nVous recevrez un email de confirmation dès validation.',
    
    // Crypto Payment
    transaction_id: 'ID de transaction blockchain',
    payment_received: 'Excellent ! Votre paiement cryptomonnaie a été détecté avec succès sur la blockchain.',
    verification_message: '🔐 Sécurité blockchain : Nous attendons les confirmations réseau nécessaires avant d\'expédier votre commande.\n\n⏱️ Temps estimé : 1-6 confirmations blockchain (généralement sous 60 minutes)\n📦 Expédition immédiate après validation complète',
    
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
    subject_welcome: 'Welcome to Luxio – Your account has been created successfully',
    subject_verify_email: 'Verify your email address – Luxio',
    subject_order_confirm: 'Order Confirmation – Luxio',
    subject_ticket_confirm: 'Order Confirmation – Luxio',
    subject_crypto_confirm: 'Order Confirmation – Luxio',
    subject_admin_new_order: 'New Order Received',
    
    // Common
    hello: 'Hello',
    team_signature: 'Best regards,\nThe Luxio Team\nYour trusted partner for premium products',
    footer_note: 'This email was sent automatically. For any questions, our team is available 7 days a week.',
    access_dashboard: 'Access my customer area',
    
    // Email Verification
    verify_email_title: 'Confirm your email address',
    verify_email_message: 'Thank you for signing up with Luxio!\n\nTo activate your account and access our exclusive catalog of premium products, please confirm your email address by clicking the button below.',
    verify_email_button: 'Verify my email',
    verify_email_expiration: 'This verification link will expire in 24 hours. If the button doesn\'t work, copy and paste this link into your browser:',
    
    // Welcome Email
    welcome_title: 'Welcome to the Luxio universe! 🎉',
    welcome_message: 'Thank you for joining Luxio, your preferred destination for premium high-quality tech products.\n\nYour account has been created successfully and you can now enjoy our exclusive catalog of smartphones, smartwatches, sneakers, and high-tech gadgets.\n\nAt Luxio, we are committed to providing you with:\n• Carefully selected authentic premium products\n• Fast and secure delivery within 24-72h\n• Responsive customer service available 7 days a week\n• 2-year manufacturer warranties on all our products',
    discover_products: 'Discover our catalog',
    
    // Order Confirmation
    order_confirmed: 'Your order has been confirmed successfully! ✓',
    order_received: 'We confirm receipt of your order. Our team is already carefully preparing your package.\n\nYou will receive a tracking email as soon as your items are shipped.',
    order_number: 'Order number',
    total_amount: 'Total amount',
    payment_method: 'Payment method',
    status: 'Order status',
    
    // Bank Transfer
    bank_instructions: 'To finalize your order, please make a bank transfer using the details below.\n\nIMPORTANT: Please include the exact transfer reference for quick processing of your order.',
    beneficiary: 'Beneficiary',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Transfer reference (required)',
    delivery_time: '📦 Express delivery within 24-72h after payment validation\n🔒 Secure and discreet packaging\n📍 Real-time parcel tracking',
    proof_instruction: '⚡ TIP: For priority processing, send us your payment proof by email. This will allow us to process your order up to 48 hours faster.',
    
    // Ticket Payment
    ticket_type: 'Prepaid ticket type',
    codes_submitted: 'Codes submitted',
    pending_validation: 'Under validation',
    validation_time: '⏱️ Validation in progress: Your order will be confirmed within 24-48h after code verification.\n\nOur team manually verifies each ticket to ensure the security of your transaction.\n\nYou will receive a confirmation email upon validation.',
    
    // Crypto Payment
    transaction_id: 'Blockchain transaction ID',
    payment_received: 'Excellent! Your cryptocurrency payment has been successfully detected on the blockchain.',
    verification_message: '🔐 Blockchain security: We are waiting for the necessary network confirmations before shipping your order.\n\n⏱️ Estimated time: 1-6 blockchain confirmations (usually under 60 minutes)\n📦 Immediate shipping after full validation',
    
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
    subject_welcome: 'Bienvenido a Luxio – Su cuenta ha sido creada con éxito',
    subject_verify_email: 'Verifique su dirección de correo electrónico – Luxio',
    subject_order_confirm: 'Confirmación de pedido – Luxio',
    subject_ticket_confirm: 'Confirmación de pedido – Luxio',
    subject_crypto_confirm: 'Confirmación de pedido – Luxio',
    subject_admin_new_order: 'Nuevo pedido recibido',
    
    // Common
    hello: 'Hola',
    team_signature: 'Cordialmente,\nEl equipo Luxio\nSu socio de confianza para productos premium',
    footer_note: 'Este correo fue enviado automáticamente. Para cualquier pregunta, nuestro equipo está disponible 7 días a la semana.',
    access_dashboard: 'Acceder a mi área de cliente',
    
    // Email Verification
    verify_email_title: 'Confirme su dirección de correo electrónico',
    verify_email_message: '¡Gracias por registrarse en Luxio!\n\nPara activar su cuenta y acceder a nuestro catálogo exclusivo de productos premium, confirme su dirección de correo electrónico haciendo clic en el botón a continuación.',
    verify_email_button: 'Verificar mi correo',
    verify_email_expiration: 'Este enlace de verificación expirará en 24 horas. Si el botón no funciona, copie y pegue este enlace en su navegador:',
    
    // Welcome Email
    welcome_title: '¡Bienvenido al universo Luxio! 🎉',
    welcome_message: 'Gracias por unirse a Luxio, su destino preferido para productos tecnológicos premium de alta calidad.\n\nSu cuenta ha sido creada con éxito y ya puede disfrutar de nuestro catálogo exclusivo de smartphones, relojes inteligentes, zapatillas y gadgets de alta tecnología.\n\nEn Luxio, nos comprometemos a ofrecerle:\n• Una selección rigurosa de productos premium auténticos\n• Entrega rápida y segura en 24-72h\n• Servicio al cliente receptivo disponible 7 días a la semana\n• Garantías del fabricante de 2 años en todos nuestros productos',
    discover_products: 'Descubrir nuestro catálogo',
    
    // Order Confirmation
    order_confirmed: '¡Su pedido ha sido confirmado con éxito! ✓',
    order_received: 'Confirmamos la recepción de su pedido. Nuestro equipo ya está preparando cuidadosamente su paquete.\n\nRecibirá un correo de seguimiento tan pronto como se envíen sus artículos.',
    order_number: 'Número de pedido',
    total_amount: 'Monto total',
    payment_method: 'Método de pago',
    status: 'Estado del pedido',
    
    // Bank Transfer
    bank_instructions: 'Para finalizar su pedido, realice una transferencia bancaria usando los datos a continuación.\n\nIMPORTANTE: Por favor incluya la referencia exacta de la transferencia para un procesamiento rápido de su pedido.',
    beneficiary: 'Beneficiario',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Referencia de transferencia (obligatoria)',
    delivery_time: '📦 Entrega exprés en 24-72h después de la validación del pago\n🔒 Embalaje seguro y discreto\n📍 Seguimiento de paquete en tiempo real',
    proof_instruction: '⚡ CONSEJO: Para un procesamiento prioritario, envíenos su comprobante de pago por correo electrónico. Esto nos permitirá procesar su pedido hasta 48 horas más rápido.',
    
    // Ticket Payment
    ticket_type: 'Tipo de ticket prepago',
    codes_submitted: 'Códigos enviados',
    pending_validation: 'En validación',
    validation_time: '⏱️ Validación en curso: Su pedido será confirmado en 24-48h después de la verificación de los códigos.\n\nNuestro equipo verifica manualmente cada ticket para garantizar la seguridad de su transacción.\n\nRecibirá un correo de confirmación tras la validación.',
    
    // Crypto Payment
    transaction_id: 'ID de transacción blockchain',
    payment_received: '¡Excelente! Su pago en criptomoneda ha sido detectado con éxito en la blockchain.',
    verification_message: '🔐 Seguridad blockchain: Esperamos las confirmaciones de red necesarias antes de enviar su pedido.\n\n⏱️ Tiempo estimado: 1-6 confirmaciones blockchain (generalmente menos de 60 minutos)\n📦 Envío inmediato después de la validación completa',
    
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
    subject_welcome: 'Bem-vindo ao Luxio – Sua conta foi criada com sucesso',
    subject_verify_email: 'Verifique seu endereço de e-mail – Luxio',
    subject_order_confirm: 'Confirmação de pedido – Luxio',
    subject_ticket_confirm: 'Confirmação de pedido – Luxio',
    subject_crypto_confirm: 'Confirmação de pedido – Luxio',
    subject_admin_new_order: 'Novo pedido recebido',
    
    // Common
    hello: 'Olá',
    team_signature: 'Cordialmente,\nA equipe Luxio\nSeu parceiro de confiança para produtos premium',
    footer_note: 'Este email foi enviado automaticamente. Para qualquer pergunta, nossa equipe está disponível 7 dias por semana.',
    access_dashboard: 'Acessar minha área de cliente',
    
    // Email Verification
    verify_email_title: 'Confirme seu endereço de e-mail',
    verify_email_message: 'Obrigado por se registrar no Luxio!\n\nPara ativar sua conta e acessar nosso catálogo exclusivo de produtos premium, confirme seu endereço de e-mail clicando no botão abaixo.',
    verify_email_button: 'Verificar meu e-mail',
    verify_email_expiration: 'Este link de verificação expirará em 24 horas. Se o botão não funcionar, copie e cole este link em seu navegador:',
    
    // Welcome Email
    welcome_title: 'Bem-vindo ao universo Luxio! 🎉',
    welcome_message: 'Obrigado por se juntar ao Luxio, seu destino preferido para produtos tecnológicos premium de alta qualidade.\n\nSua conta foi criada com sucesso e você já pode aproveitar nosso catálogo exclusivo de smartphones, relógios inteligentes, tênis e gadgets de alta tecnologia.\n\nNo Luxio, estamos comprometidos em oferecer a você:\n• Uma seleção rigorosa de produtos premium autênticos\n• Entrega rápida e segura em 24-72h\n• Atendimento ao cliente responsivo disponível 7 dias por semana\n• Garantias do fabricante de 2 anos em todos os nossos produtos',
    discover_products: 'Descobrir nosso catálogo',
    
    // Order Confirmation
    order_confirmed: 'Seu pedido foi confirmado com sucesso! ✓',
    order_received: 'Confirmamos o recebimento do seu pedido. Nossa equipe já está preparando cuidadosamente seu pacote.\n\nVocê receberá um email de rastreamento assim que seus itens forem enviados.',
    order_number: 'Número do pedido',
    total_amount: 'Valor total',
    payment_method: 'Método de pagamento',
    status: 'Status do pedido',
    
    // Bank Transfer
    bank_instructions: 'Para finalizar seu pedido, faça uma transferência bancária usando os dados abaixo.\n\nIMPORTANTE: Por favor, inclua a referência exata da transferência para um processamento rápido do seu pedido.',
    beneficiary: 'Beneficiário',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Referência da transferência (obrigatória)',
    delivery_time: '📦 Entrega expressa em 24-72h após validação do pagamento\n🔒 Embalagem segura e discreta\n📍 Rastreamento de pacote em tempo real',
    proof_instruction: '⚡ DICA: Para processamento prioritário, envie-nos seu comprovante de pagamento por e-mail. Isso nos permitirá processar seu pedido até 48 horas mais rápido.',
    
    // Ticket Payment
    ticket_type: 'Tipo de ticket pré-pago',
    codes_submitted: 'Códigos enviados',
    pending_validation: 'Em validação',
    validation_time: '⏱️ Validação em andamento: Seu pedido será confirmado em 24-48h após verificação dos códigos.\n\nNossa equipe verifica manualmente cada ticket para garantir a segurança da sua transação.\n\nVocê receberá um email de confirmação após a validação.',
    
    // Crypto Payment
    transaction_id: 'ID da transação blockchain',
    payment_received: 'Excelente! Seu pagamento em criptomoeda foi detectado com sucesso na blockchain.',
    verification_message: '🔐 Segurança blockchain: Estamos aguardando as confirmações de rede necessárias antes de enviar seu pedido.\n\n⏱️ Tempo estimado: 1-6 confirmações blockchain (geralmente menos de 60 minutos)\n📦 Envio imediato após validação completa',
    
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
    subject_welcome: 'Witamy w Luxio – Twoje konto zostało pomyślnie utworzone',
    subject_verify_email: 'Zweryfikuj swój adres e-mail – Luxio',
    subject_order_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_ticket_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_crypto_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_admin_new_order: 'Otrzymano nowe zamówienie',
    
    // Common
    hello: 'Cześć',
    team_signature: 'Z poważaniem,\nZespół Luxio\nTwój zaufany partner dla produktów premium',
    footer_note: 'Ten email został wysłany automatycznie. W razie pytań, nasz zespół jest dostępny 7 dni w tygodniu.',
    access_dashboard: 'Dostęp do mojego obszaru klienta',
    
    // Email Verification
    verify_email_title: 'Potwierdź swój adres e-mail',
    verify_email_message: 'Dziękujemy za rejestrację w Luxio!\n\nAby aktywować swoje konto i uzyskać dostęp do naszego ekskluzywnego katalogu produktów premium, potwierdź swój adres e-mail, klikając przycisk poniżej.',
    verify_email_button: 'Zweryfikuj mój e-mail',
    verify_email_expiration: 'Ten link weryfikacyjny wygaśnie za 24 godziny. Jeśli przycisk nie działa, skopiuj i wklej ten link do przeglądarki:',
    
    // Welcome Email
    welcome_title: 'Witamy w uniwersum Luxio! 🎉',
    welcome_message: 'Dziękujemy za dołączenie do Luxio, Twojego preferowanego miejsca dla premium produktów technologicznych wysokiej jakości.\n\nTwoje konto zostało pomyślnie utworzone i możesz teraz cieszyć się naszym ekskluzywnym katalogiem smartfonów, zegarków inteligentnych, butów i gadżetów high-tech.\n\nW Luxio zobowiązujemy się zapewnić Ci:\n• Starannie wyselekcjonowane autentyczne produkty premium\n• Szybką i bezpieczną dostawę w ciągu 24-72h\n• Responsywną obsługę klienta dostępną 7 dni w tygodniu\n• 2-letnią gwarancję producenta na wszystkie nasze produkty',
    discover_products: 'Odkryj nasz katalog',
    
    // Order Confirmation
    order_confirmed: 'Twoje zamówienie zostało pomyślnie potwierdzone! ✓',
    order_received: 'Potwierdzamy otrzymanie Twojego zamówienia. Nasz zespół już starannie przygotowuje Twoją paczkę.\n\nOtrzymasz email śledzący, gdy tylko Twoje artykuły zostaną wysłane.',
    order_number: 'Numer zamówienia',
    total_amount: 'Kwota całkowita',
    payment_method: 'Metoda płatności',
    status: 'Status zamówienia',
    
    // Bank Transfer
    bank_instructions: 'Aby sfinalizować zamówienie, wykonaj przelew bankowy używając poniższych danych.\n\nWAŻNE: Proszę podać dokładny tytuł przelewu dla szybkiego przetworzenia zamówienia.',
    beneficiary: 'Beneficjent',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Tytuł przelewu (wymagany)',
    delivery_time: '📦 Dostawa ekspresowa w ciągu 24-72h po walidacji płatności\n🔒 Bezpieczne i dyskretne opakowanie\n📍 Śledzenie paczki w czasie rzeczywistym',
    proof_instruction: '⚡ WSKAZÓWKA: Dla priorytetowego przetwarzania, wyślij nam potwierdzenie płatności e-mailem. Pozwoli nam to przetworzyć Twoje zamówienie nawet o 48 godzin szybciej.',
    
    // Ticket Payment
    ticket_type: 'Typ biletu przedpłaconego',
    codes_submitted: 'Przesłane kody',
    pending_validation: 'W trakcie walidacji',
    validation_time: '⏱️ Walidacja w toku: Twoje zamówienie zostanie potwierdzone w ciągu 24-48h po weryfikacji kodów.\n\nNasz zespół ręcznie weryfikuje każdy bilet, aby zagwarantować bezpieczeństwo Twojej transakcji.\n\nOtrzymasz email potwierdzający po walidacji.',
    
    // Crypto Payment
    transaction_id: 'ID transakcji blockchain',
    payment_received: 'Doskonale! Twoja płatność kryptowalutą została pomyślnie wykryta na blockchain.',
    verification_message: '🔐 Bezpieczeństwo blockchain: Czekamy na niezbędne potwierdzenia sieciowe przed wysłaniem zamówienia.\n\n⏱️ Szacowany czas: 1-6 potwierdzeń blockchain (zazwyczaj poniżej 60 minut)\n📦 Natychmiastowa wysyłka po pełnej walidacji',
    
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
    subject_welcome: 'Üdvözöljük a Luxio-nál – Fiókja sikeresen létrejött',
    subject_verify_email: 'Igazolja email címét – Luxio',
    subject_order_confirm: 'Rendelés megerősítése – Luxio',
    subject_ticket_confirm: 'Rendelés megerősítése – Luxio',
    subject_crypto_confirm: 'Rendelés megerősítése – Luxio',
    subject_admin_new_order: 'Új rendelés érkezett',
    
    // Common
    hello: 'Helló',
    team_signature: 'Tisztelettel,\nA Luxio Csapat\nAz Ön megbízható partnere prémium termékekhez',
    footer_note: 'Ez az email automatikusan lett elküldve. Bármilyen kérdés esetén csapatunk elérhető a héten 7 napja.',
    access_dashboard: 'Hozzáférés az ügyfél területhez',
    
    // Email Verification
    verify_email_title: 'Erősítse meg email címét',
    verify_email_message: 'Köszönjük, hogy regisztrált a Luxio-nál!\n\nFiókja aktiválásához és exkluzív prémium termékkatalógusunkhoz való hozzáféréshez erősítse meg email címét az alábbi gombra kattintva.',
    verify_email_button: 'Email megerősítése',
    verify_email_expiration: 'Ez az ellenőrző link 24 órán belül lejár. Ha a gomb nem működik, másolja és illessze be ezt a linket a böngészőjébe:',
    
    // Welcome Email
    welcome_title: 'Üdvözöljük a Luxio univerzumban! 🎉',
    welcome_message: 'Köszönjük, hogy csatlakozott a Luxio-hoz, az Ön preferált céljához a prémium minőségű tech termékekért.\n\nFiókja sikeresen létrejött és most már élvezheti exkluzív katalógusunkat okostelefonok, okosórák, cipők és high-tech eszközök terén.\n\nA Luxio-nál elkötelezettek vagyunk, hogy biztosítsuk Önnek:\n• Gondosan válogatott autentikus prémium termékeket\n• Gyors és biztonságos szállítást 24-72 órán belül\n• Reagáló ügyfélszolgálatot, amely elérhető a héten 7 napja\n• 2 éves gyártói garanciát minden termékünkre',
    discover_products: 'Katalógus felfedezése',
    
    // Order Confirmation
    order_confirmed: 'Rendelése sikeresen megerősítve! ✓',
    order_received: 'Megerősítjük rendelése beérkezését. Csapatunk már gondosan készíti csomagját.\n\nKövetési emailt fog kapni, amint termékei feladásra kerülnek.',
    order_number: 'Rendelésszám',
    total_amount: 'Teljes összeg',
    payment_method: 'Fizetési mód',
    status: 'Rendelés státusza',
    
    // Bank Transfer
    bank_instructions: 'Rendelése véglegesítéséhez végezzen banki átutalást az alábbi adatok használatával.\n\nFONTOS: Kérjük, adja meg a pontos átutalási közleményt rendelése gyors feldolgozásához.',
    beneficiary: 'Kedvezményezett',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Átutalási közlemény (kötelező)',
    delivery_time: '📦 Expressz szállítás 24-72 órán belül a fizetés jóváhagyása után\n🔒 Biztonságos és diszkrét csomagolás\n📍 Valós idejű csomag követés',
    proof_instruction: '⚡ TIPP: Prioritásos feldolgozáshoz küldje el fizetési igazolását e-mailben. Ez lehetővé teszi számunkra, hogy akár 48 órával gyorsabban feldolgozzuk rendelését.',
    
    // Ticket Payment
    ticket_type: 'Előre fizetett jegy típusa',
    codes_submitted: 'Beküldött kódok',
    pending_validation: 'Érvényesítés alatt',
    validation_time: '⏱️ Érvényesítés folyamatban: Rendelése 24-48 órán belül megerősítésre kerül a kódok ellenőrzése után.\n\nCsapatunk manuálisan ellenőrzi minden jegyet tranzakciója biztonságának garantálásához.\n\nMegerősítő emailt fog kapni az érvényesítés után.',
    
    // Crypto Payment
    transaction_id: 'Blockchain tranzakció ID',
    payment_received: 'Kiváló! Kriptovaluta fizetése sikeresen észlelve lett a blockchainon.',
    verification_message: '🔐 Blockchain biztonság: Várjuk a szükséges hálózati megerősítéseket rendelése feladása előtt.\n\n⏱️ Becsült idő: 1-6 blockchain megerősítés (általában 60 percen belül)\n📦 Azonnali feladás teljes érvényesítés után',
    
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
