export type EmailLanguage = 'fr' | 'en' | 'es' | 'pt' | 'pl' | 'hu' | 'it';

export interface EmailTranslations {
  // Subjects
  subject_welcome: string;
  subject_verify_email: string;
  subject_order_confirm: string;
  subject_ticket_confirm: string;
  subject_crypto_confirm: string;
  subject_admin_new_order: string;
  subject_account_suspended: string;
  subject_account_reactivated: string;
  
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
  bank_transfer_info_title: string;
  ticket_payment: string;
  crypto_payment: string;
  
  // Account Suspension
  account_suspended_title: string;
  account_suspended_message: string;
  account_suspended_reason: string;
  account_suspended_until: string;
  account_suspended_actions: string;
  account_reactivated_title: string;
  account_reactivated_message: string;
  account_reactivated_welcome: string;
  
  // Coupon
  subject_coupon: string;
  coupon_title: string;
  coupon_message: string;
  coupon_code_label: string;
  coupon_discount_label: string;
  coupon_expires_label: string;
  coupon_how_to_use: string;
  coupon_shop_now: string;
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
    subject_account_suspended: 'Compte temporairement suspendu – Luxio',
    subject_account_reactivated: 'Votre compte a été réactivé – Luxio',
    
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
    proof_instruction: '⚡ ASTUCE : Pour un traitement prioritaire, envoyez-nous votre justificatif de virement à Contact@luxiomarket.shop. Cela nous permettra de traiter votre commande jusqu\'à 48h plus rapidement.',
    
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
    bank_transfer_info_title: 'Informations de virement',
    ticket_payment: 'Paiement par tickets',
    crypto_payment: 'Paiement crypto',
    
    // Account Suspension
    account_suspended_title: 'Compte temporairement suspendu ⚠️',
    account_suspended_message: 'Votre compte Luxio a été temporairement suspendu en raison de plusieurs commandes non payées.\n\nNous avons détecté que plusieurs de vos commandes ont expiré ou ont été annulées sans paiement au cours des derniers 30 jours. Pour maintenir un service de qualité pour tous nos clients, nous avons temporairement suspendu votre capacité à passer de nouvelles commandes.',
    account_suspended_reason: 'Raison de la suspension : 3 commandes ou plus non payées sur les 30 derniers jours',
    account_suspended_until: 'Votre compte sera automatiquement réactivé le',
    account_suspended_actions: 'Pendant cette période :\n• Vous pouvez toujours consulter votre historique de commandes\n• Vous ne pouvez pas passer de nouvelles commandes\n• Votre compte sera automatiquement réactivé après 7 jours\n\nSi vous pensez qu\'il s\'agit d\'une erreur, n\'hésitez pas à contacter notre service client.',
    account_reactivated_title: 'Votre compte a été réactivé ! ✅',
    account_reactivated_message: 'Bonne nouvelle ! Votre compte Luxio a été réactivé avec succès.\n\nVous pouvez à nouveau profiter de notre catalogue complet et passer de nouvelles commandes sans restriction.',
    account_reactivated_welcome: 'Nous sommes ravis de vous revoir parmi nous. N\'hésitez pas à découvrir nos derniers produits premium.',
    
    // Coupon
    subject_coupon: 'Votre code promo exclusif - Luxio',
    coupon_title: 'Vous avez reçu un code promo exclusif !',
    coupon_message: 'Merci pour votre commande ! En récompense de votre fidélité, nous vous offrons un code promo exclusif pour votre prochaine commande.',
    coupon_code_label: 'Votre code promo',
    coupon_discount_label: 'Réduction',
    coupon_expires_label: 'Valable jusqu\'au',
    coupon_how_to_use: 'Pour utiliser votre code, entrez-le lors du paiement dans le champ "Code promo".',
    coupon_shop_now: 'Faire du shopping maintenant'
  },
  en: {
    // Subjects
    subject_welcome: 'Welcome to Luxio – Your account has been created successfully',
    subject_verify_email: 'Verify your email address – Luxio',
    subject_order_confirm: 'Order Confirmation – Luxio',
    subject_ticket_confirm: 'Order Confirmation – Luxio',
    subject_crypto_confirm: 'Order Confirmation – Luxio',
    subject_admin_new_order: 'New Order Received',
    subject_account_suspended: 'Account Temporarily Suspended – Luxio',
    subject_account_reactivated: 'Your Account Has Been Reactivated – Luxio',
    
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
    proof_instruction: '⚡ TIP: For priority processing, send us your payment proof to Contact@luxiomarket.shop. This will allow us to process your order up to 48 hours faster.',
    
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
    bank_transfer_info_title: 'Bank Transfer Information',
    ticket_payment: 'Ticket Payment',
    crypto_payment: 'Crypto Payment',
    
    // Account Suspension
    account_suspended_title: 'Account Temporarily Suspended ⚠️',
    account_suspended_message: 'Your Luxio account has been temporarily suspended due to multiple unpaid orders.\n\nWe have detected that several of your orders have expired or been canceled without payment in the last 30 days. To maintain quality service for all our customers, we have temporarily suspended your ability to place new orders.',
    account_suspended_reason: 'Suspension reason: 3 or more unpaid orders in the last 30 days',
    account_suspended_until: 'Your account will be automatically reactivated on',
    account_suspended_actions: 'During this period:\n• You can still view your order history\n• You cannot place new orders\n• Your account will be automatically reactivated after 7 days\n\nIf you believe this is an error, please contact our customer service.',
    account_reactivated_title: 'Your Account Has Been Reactivated! ✅',
    account_reactivated_message: 'Good news! Your Luxio account has been successfully reactivated.\n\nYou can now enjoy our full catalog again and place new orders without restrictions.',
    account_reactivated_welcome: 'We\'re happy to have you back with us. Feel free to discover our latest premium products.',
    
    // Coupon
    subject_coupon: 'Your exclusive promo code - Luxio',
    coupon_title: 'You\'ve received an exclusive promo code!',
    coupon_message: 'Thank you for your order! As a reward for your loyalty, we\'re giving you an exclusive promo code for your next order.',
    coupon_code_label: 'Your promo code',
    coupon_discount_label: 'Discount',
    coupon_expires_label: 'Valid until',
    coupon_how_to_use: 'To use your code, enter it at checkout in the "Promo code" field.',
    coupon_shop_now: 'Shop now'
  },
  es: {
    // Subjects
    subject_welcome: 'Bienvenido a Luxio – Su cuenta ha sido creada con éxito',
    subject_verify_email: 'Verifique su dirección de correo electrónico – Luxio',
    subject_order_confirm: 'Confirmación de pedido – Luxio',
    subject_ticket_confirm: 'Confirmación de pedido – Luxio',
    subject_crypto_confirm: 'Confirmación de pedido – Luxio',
    subject_admin_new_order: 'Nuevo pedido recibido',
    subject_account_suspended: 'Cuenta Temporalmente Suspendida – Luxio',
    subject_account_reactivated: 'Su Cuenta Ha Sido Reactivada – Luxio',
    
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
    proof_instruction: '⚡ CONSEJO: Para un procesamiento prioritario, envíenos su comprobante de pago a Contact@luxiomarket.shop. Esto nos permitirá procesar su pedido hasta 48 horas más rápido.',
    
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
    bank_transfer_info_title: 'Información de transferencia',
    ticket_payment: 'Pago con Tickets',
    crypto_payment: 'Pago Crypto',
    
    // Account Suspension
    account_suspended_title: 'Cuenta Temporalmente Suspendida ⚠️',
    account_suspended_message: 'Su cuenta de Luxio ha sido temporalmente suspendida debido a múltiples pedidos no pagados.\n\nHemos detectado que varios de sus pedidos han expirado o sido cancelados sin pago en los últimos 30 días. Para mantener un servicio de calidad para todos nuestros clientes, hemos suspendido temporalmente su capacidad de realizar nuevos pedidos.',
    account_suspended_reason: 'Razón de la suspensión: 3 o más pedidos no pagados en los últimos 30 días',
    account_suspended_until: 'Su cuenta será reactivada automáticamente el',
    account_suspended_actions: 'Durante este período:\n• Puede consultar su historial de pedidos\n• No puede realizar nuevos pedidos\n• Su cuenta será reactivada automáticamente después de 7 días\n\nSi cree que esto es un error, no dude en contactar nuestro servicio al cliente.',
    account_reactivated_title: '¡Su Cuenta Ha Sido Reactivada! ✅',
    account_reactivated_message: '¡Buenas noticias! Su cuenta de Luxio ha sido reactivada con éxito.\n\nPuede volver a disfrutar de nuestro catálogo completo y realizar nuevos pedidos sin restricciones.',
    account_reactivated_welcome: 'Estamos encantados de tenerle de vuelta. No dude en descubrir nuestros últimos productos premium.',
    
    // Coupon
    subject_coupon: 'Tu código promocional exclusivo - Luxio',
    coupon_title: '¡Has recibido un código promocional exclusivo!',
    coupon_message: '¡Gracias por tu pedido! Como recompensa por tu fidelidad, te regalamos un código promocional exclusivo para tu próximo pedido.',
    coupon_code_label: 'Tu código promocional',
    coupon_discount_label: 'Descuento',
    coupon_expires_label: 'Válido hasta',
    coupon_how_to_use: 'Para usar tu código, ingrésalo en el campo "Código promocional" durante el pago.',
    coupon_shop_now: 'Comprar ahora'
  },
  pt: {
    // Subjects
    subject_welcome: 'Bem-vindo ao Luxio – Sua conta foi criada com sucesso',
    subject_verify_email: 'Verifique seu endereço de e-mail – Luxio',
    subject_order_confirm: 'Confirmação de pedido – Luxio',
    subject_ticket_confirm: 'Confirmação de pedido – Luxio',
    subject_crypto_confirm: 'Confirmação de pedido – Luxio',
    subject_admin_new_order: 'Novo pedido recebido',
    subject_account_suspended: 'Conta Temporariamente Suspensa – Luxio',
    subject_account_reactivated: 'Sua Conta Foi Reactivada – Luxio',
    
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
    proof_instruction: '⚡ DICA: Para processamento prioritário, envie-nos seu comprovante de pagamento para Contact@luxiomarket.shop. Isso nos permitirá processar seu pedido até 48 horas mais rápido.',
    
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
    bank_transfer_info_title: 'Informações de transferência',
    ticket_payment: 'Pagamento por Tickets',
    crypto_payment: 'Pagamento Crypto',
    
    // Account Suspension
    account_suspended_title: 'Conta Temporariamente Suspensa ⚠️',
    account_suspended_message: 'Sua conta Luxio foi temporariamente suspensa devido a vários pedidos não pagos.\n\nDetectamos que vários de seus pedidos expiraram ou foram cancelados sem pagamento nos últimos 30 dias. Para manter um serviço de qualidade para todos os nossos clientes, suspendemos temporariamente sua capacidade de fazer novos pedidos.',
    account_suspended_reason: 'Motivo da suspensão: 3 ou mais pedidos não pagos nos últimos 30 dias',
    account_suspended_until: 'Sua conta será reativada automaticamente em',
    account_suspended_actions: 'Durante este período:\n• Você ainda pode visualizar seu histórico de pedidos\n• Você não pode fazer novos pedidos\n• Sua conta será reativada automaticamente após 7 dias\n\nSe você acha que isso é um erro, entre em contato com nosso atendimento ao cliente.',
    account_reactivated_title: 'Sua Conta Foi Reativada! ✅',
    account_reactivated_message: 'Boas notícias! Sua conta Luxio foi reativada com sucesso.\n\nVocê pode novamente desfrutar do nosso catálogo completo e fazer novos pedidos sem restrições.',
    account_reactivated_welcome: 'Estamos felizes em tê-lo de volta. Sinta-se à vontade para descobrir nossos produtos premium mais recentes.',
    
    // Coupon
    subject_coupon: 'Seu código promocional exclusivo - Luxio',
    coupon_title: 'Você recebeu um código promocional exclusivo!',
    coupon_message: 'Obrigado pelo seu pedido! Como recompensa pela sua fidelidade, oferecemos um código promocional exclusivo para seu próximo pedido.',
    coupon_code_label: 'Seu código promocional',
    coupon_discount_label: 'Desconto',
    coupon_expires_label: 'Válido até',
    coupon_how_to_use: 'Para usar seu código, insira-o no campo "Código promocional" durante o pagamento.',
    coupon_shop_now: 'Comprar agora'
  },
  pl: {
    // Subjects
    subject_welcome: 'Witamy w Luxio – Twoje konto zostało pomyślnie utworzone',
    subject_verify_email: 'Zweryfikuj swój adres e-mail – Luxio',
    subject_order_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_ticket_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_crypto_confirm: 'Potwierdzenie zamówienia – Luxio',
    subject_admin_new_order: 'Otrzymano nowe zamówienie',
    subject_account_suspended: 'Konto Tymczasowo Zawieszone – Luxio',
    subject_account_reactivated: 'Twoje Konto Zostało Reaktywowane – Luxio',
    
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
    proof_instruction: '⚡ WSKAZÓWKA: Dla priorytetowego przetwarzania, wyślij nam potwierdzenie płatności na Contact@luxiomarket.shop. Pozwoli nam to przetworzyć Twoje zamówienie nawet o 48 godzin szybciej.',
    
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
    bank_transfer_info_title: 'Informacje o przelewie',
    ticket_payment: 'Płatność Biletami',
    crypto_payment: 'Płatność Crypto',
    
    // Account Suspension
    account_suspended_title: 'Konto Tymczasowo Zawieszone ⚠️',
    account_suspended_message: 'Twoje konto Luxio zostało tymczasowo zawieszone z powodu wielu niezapłaconych zamówień.\n\nWykryliśmy, że kilka Twoich zamówień wygasło lub zostało anulowanych bez płatności w ciągu ostatnich 30 dni. Aby utrzymać jakość usług dla wszystkich naszych klientów, tymczasowo zawiesiliśmy możliwość składania nowych zamówień.',
    account_suspended_reason: 'Powód zawieszenia: 3 lub więcej niezapłaconych zamówień w ciągu ostatnich 30 dni',
    account_suspended_until: 'Twoje konto zostanie automatycznie reaktywowane',
    account_suspended_actions: 'W tym okresie:\n• Nadal możesz przeglądać historię zamówień\n• Nie możesz składać nowych zamówień\n• Twoje konto zostanie automatycznie reaktywowane po 7 dniach\n\nJeśli uważasz, że to błąd, skontaktuj się z naszą obsługą klienta.',
    account_reactivated_title: 'Twoje Konto Zostało Reaktywowane! ✅',
    account_reactivated_message: 'Dobre wieści! Twoje konto Luxio zostało pomyślnie reaktywowane.\n\nMożesz ponownie cieszyć się pełnym katalogiem i składać nowe zamówienia bez ograniczeń.',
    account_reactivated_welcome: 'Cieszymy się, że jesteś z nami z powrotem. Zapraszamy do odkrywania naszych najnowszych produktów premium.',
    
    // Coupon
    subject_coupon: 'Twój ekskluzywny kod promocyjny - Luxio',
    coupon_title: 'Otrzymałeś ekskluzywny kod promocyjny!',
    coupon_message: 'Dziękujemy za zamówienie! W nagrodę za Twoją lojalność, oferujemy Ci ekskluzywny kod promocyjny na następne zamówienie.',
    coupon_code_label: 'Twój kod promocyjny',
    coupon_discount_label: 'Rabat',
    coupon_expires_label: 'Ważny do',
    coupon_how_to_use: 'Aby użyć kodu, wpisz go w polu "Kod promocyjny" podczas płatności.',
    coupon_shop_now: 'Kup teraz'
  },
  hu: {
    // Subjects
    subject_welcome: 'Üdvözöljük a Luxio-nál – Fiókja sikeresen létrejött',
    subject_verify_email: 'Igazolja email címét – Luxio',
    subject_order_confirm: 'Rendelés megerősítése – Luxio',
    subject_ticket_confirm: 'Rendelés megerősítése – Luxio',
    subject_crypto_confirm: 'Rendelés megerősítése – Luxio',
    subject_admin_new_order: 'Új rendelés érkezett',
    subject_account_suspended: 'Fiók Ideiglenesen Felfüggesztve – Luxio',
    subject_account_reactivated: 'Fiókját Újraaktiváltuk – Luxio',
    
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
    proof_instruction: '⚡ TIPP: Prioritásos feldolgozáshoz küldje el fizetési igazolását a Contact@luxiomarket.shop címre. Ez lehetővé teszi számunkra, hogy akár 48 órával gyorsabban feldolgozzuk rendelését.',
    
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
    bank_transfer_info_title: 'Átutalási információk',
    ticket_payment: 'Jegyes Fizetés',
    crypto_payment: 'Kripto Fizetés',
    
    // Account Suspension
    account_suspended_title: 'Fiók Ideiglenesen Felfüggesztve ⚠️',
    account_suspended_message: 'Luxio fiókját ideiglenesen felfüggesztettük több fizetetlen rendelés miatt.\n\nÉszrevettük, hogy több rendelése lejárt vagy törlődött fizetés nélkül az elmúlt 30 napban. Az összes ügyfelünk számára minőségi szolgáltatás fenntartása érdekében ideiglenesen felfüggesztettük új rendelések leadásának lehetőségét.',
    account_suspended_reason: 'Felfüggesztés oka: 3 vagy több fizetetlen rendelés az elmúlt 30 napban',
    account_suspended_until: 'Fiókját automatikusan újraaktiváljuk',
    account_suspended_actions: 'Ebben az időszakban:\n• Továbbra is megtekintheti rendelési előzményeit\n• Nem adhat le új rendeléseket\n• Fiókját 7 nap után automatikusan újraaktiváljuk\n\nHa úgy gondolja, hogy ez hiba, kérjük, lépjen kapcsolatba ügyfélszolgálatunkkal.',
    account_reactivated_title: 'Fiókját Újraaktiváltuk! ✅',
    account_reactivated_message: 'Jó hír! Luxio fiókját sikeresen újraaktiváltuk.\n\nÚjra élvezheti teljes katalógusunkat és korlátozások nélkül adhat le új rendeléseket.',
    account_reactivated_welcome: 'Örülünk, hogy visszatért hozzánk. Fedezze fel legújabb prémium termékeinket.',
    
    // Coupon
    subject_coupon: 'Exkluzív promóciós kódod - Luxio',
    coupon_title: 'Exkluzív promóciós kódot kaptál!',
    coupon_message: 'Köszönjük a rendelésed! Hűséged jutalmaként exkluzív promóciós kódot kapsz a következő rendelésedhez.',
    coupon_code_label: 'A promóciós kódod',
    coupon_discount_label: 'Kedvezmény',
    coupon_expires_label: 'Érvényes',
    coupon_how_to_use: 'A kód használatához írd be a "Promóciós kód" mezőbe a fizetés során.',
    coupon_shop_now: 'Vásárolj most'
  },
  it: {
    // Subjects
    subject_welcome: 'Benvenuto in Luxio – Il tuo account è stato creato con successo',
    subject_verify_email: 'Verifica il tuo indirizzo email – Luxio',
    subject_order_confirm: 'Conferma dell\'ordine – Luxio',
    subject_ticket_confirm: 'Conferma dell\'ordine – Luxio',
    subject_crypto_confirm: 'Conferma dell\'ordine – Luxio',
    subject_admin_new_order: 'Nuovo ordine ricevuto',
    subject_account_suspended: 'Account temporaneamente sospeso – Luxio',
    subject_account_reactivated: 'Il tuo account è stato riattivato – Luxio',
    
    // Common
    hello: 'Ciao',
    team_signature: 'Cordiali saluti,\nIl team di Luxio\nIl tuo partner di fiducia per prodotti premium',
    footer_note: 'Questa email è stata inviata automaticamente. Per qualsiasi domanda, il nostro team è disponibile 7 giorni su 7.',
    access_dashboard: 'Accedi alla mia area clienti',
    
    // Email Verification
    verify_email_title: 'Conferma il tuo indirizzo email',
    verify_email_message: 'Grazie per esserti registrato su Luxio!\n\nPer attivare il tuo account e accedere al nostro catalogo esclusivo di prodotti premium, conferma il tuo indirizzo email cliccando sul pulsante qui sotto.',
    verify_email_button: 'Verifica la mia email',
    verify_email_expiration: 'Questo link di verifica scadrà tra 24 ore. Se il pulsante non funziona, copia e incolla questo link nel tuo browser:',
    
    // Welcome Email
    welcome_title: 'Benvenuto nell\'universo Luxio! 🎉',
    welcome_message: 'Grazie per esserti unito a Luxio, la tua destinazione preferita per prodotti tecnologici premium di alta qualità.\n\nIl tuo account è stato creato con successo e ora puoi goderti il nostro catalogo esclusivo di smartphone, smartwatch, sneakers e gadget high-tech.\n\nIn Luxio, ci impegniamo a fornirti:\n• Una selezione rigorosa di prodotti premium autentici\n• Consegna rapida e sicura in 24-72 ore\n• Servizio clienti reattivo disponibile 7 giorni su 7\n• Garanzie del produttore di 2 anni su tutti i nostri prodotti',
    discover_products: 'Scopri il nostro catalogo',
    
    // Order Confirmation
    order_confirmed: 'Il tuo ordine è stato confermato con successo! ✓',
    order_received: 'Confermiamo la ricezione del tuo ordine. Il nostro team sta già preparando con cura il tuo pacco.\n\nRiceverai un\'email di tracciamento non appena i tuoi articoli saranno spediti.',
    order_number: 'Numero d\'ordine',
    total_amount: 'Importo totale',
    payment_method: 'Metodo di pagamento',
    status: 'Stato dell\'ordine',
    
    // Bank Transfer
    bank_instructions: 'Per finalizzare il tuo ordine, effettua un bonifico bancario utilizzando i dettagli qui sotto.\n\nIMPORTANTE: includi il riferimento esatto del bonifico per una rapida elaborazione del tuo ordine.',
    beneficiary: 'Beneficiario',
    iban: 'IBAN',
    bic: 'BIC / SWIFT',
    transfer_reason: 'Causale del bonifico (obbligatoria)',
    delivery_time: '📦 Consegna espressa in 24-72 ore dopo la convalida del pagamento\n🔒 Imballaggio sicuro e discreto\n📍 Tracciamento del pacco in tempo reale',
    proof_instruction: '⚡ SUGGERIMENTO: Per un\'elaborazione prioritaria, inviaci la prova di pagamento a Contact@luxiomarket.shop. Questo ci permetterà di elaborare il tuo ordine fino a 48 ore più velocemente.',
    
    // Ticket Payment
    ticket_type: 'Tipo di ticket prepagato',
    codes_submitted: 'Codici inviati',
    pending_validation: 'In attesa di convalida',
    validation_time: '⏱️ Convalida in corso: Il tuo ordine sarà confermato entro 24-48 ore dalla verifica del codice.\n\nIl nostro team verifica manualmente ogni ticket per garantire la sicurezza della tua transazione.\n\nRiceverai un\'email di conferma dopo la convalida.',
    
    // Crypto Payment
    transaction_id: 'ID transazione blockchain',
    payment_received: 'Eccellente! Il tuo pagamento in criptovaluta è stato rilevato con successo sulla blockchain.',
    verification_message: '🔐 Sicurezza blockchain: stiamo attendendo le necessarie conferme di rete prima di spedire il tuo ordine.\n\n⏱️ Tempo stimato: 1-6 conferme blockchain (solitamente entro 60 minuti)\n📦 Spedizione immediata dopo la convalida completa',
    
    // Admin Notifications
    new_order_received: 'Nuovo ordine ricevuto',
    customer_name: 'Cliente',
    customer_email: 'Email',
    bank_transfer: 'Bonifico bancario',
    bank_transfer_info_title: 'Informazioni sul bonifico',
    ticket_payment: 'Pagamento con ticket',
    crypto_payment: 'Pagamento crypto',
    
    // Account Suspension
    account_suspended_title: 'Account temporaneamente sospeso ⚠️',
    account_suspended_message: 'Il tuo account Luxio è stato temporaneamente sospeso a causa di diversi ordini non pagati.\n\nAbbiamo rilevato che molti dei tuoi ordini sono scaduti o sono stati annullati senza pagamento negli ultimi 30 giorni. Per mantenere un servizio di qualità per tutti i nostri clienti, abbiamo temporaneamente sospeso la tua possibilità di effettuare nuovi ordini.',
    account_suspended_reason: 'Motivo della sospensione: 3 o più ordini non pagati negli ultimi 30 giorni',
    account_suspended_until: 'Il tuo account verrà riattivato automaticamente il',
    account_suspended_actions: 'Durante questo periodo:\n• Puoi ancora visualizzare la cronologia degli ordini\n• Non puoi effettuare nuovi ordini\n• Il tuo account verrà riattivato automaticamente dopo 7 giorni\n\nSe ritieni che si tratti di un errore, non esitare a contattare il nostro servizio clienti.',
    account_reactivated_title: 'Il tuo account è stato riattivato! ✅',
    account_reactivated_message: 'Buone notizie! Il tuo account Luxio è stato riattivato con successo.\n\nPuoi goderti di nuovo il nostro catalogo completo ed effettuare nuovi ordini senza restrizioni.',
    account_reactivated_welcome: 'Siamo felici di riaverti con noi. Sentiti libero di scoprire i nostri ultimi prodotti premium.',
    
    // Coupon
    subject_coupon: 'Il tuo codice promozionale esclusivo - Luxio',
    coupon_title: 'Hai ricevuto un codice promozionale esclusivo!',
    coupon_message: 'Grazie per il tuo ordine! Come premio per la tua fedeltà, ti offriamo un codice promozionale esclusivo per il tuo prossimo ordine.',
    coupon_code_label: 'Il tuo codice promozionale',
    coupon_discount_label: 'Sconto',
    coupon_expires_label: 'Valido fino al',
    coupon_how_to_use: 'Per utilizzare il tuo codice, inseriscilo al momento del pagamento nel campo "Codice promozionale".',
    coupon_shop_now: 'Fai shopping ora'
  }
};

export function getTranslation(language: EmailLanguage): EmailTranslations {
  return emailTranslations[language] || emailTranslations.fr;
}
