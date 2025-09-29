export type Language = 'en' | 'fr' | 'es' | 'pt' | 'pl';

export interface Translations {
  // Navigation
  smartphones: string;
  watches: string;
  sneakers: string;
  gadgets: string;
  mobility: string;
  
  // Actions
  addToCart: string;
  login: string;
  signup: string;
  logout: string;
  proceedToCheckout: string;
  placeOrder: string;
  continueShopping: string;
  
  // Common
  price: string;
  quantity: string;
  total: string;
  subtotal: string;
  shipping: string;
  free: string;
  discount: string;
  
  // Hero section
  heroTitle: string;
  heroSubtitle: string;
  shopNow: string;
  viewDeals: string;
  
  // Categories
  latestSmartphones: string;
  smartWatchesFitness: string;
  premiumSneakers: string;
  smartHomeGadgets: string;
  urbanMobility: string;
  
  // Cart
  shoppingCart: string;
  cartEmpty: string;
  cartTotal: string;
  removeItem: string;
  updateQuantity: string;
  
  // Checkout Form
  checkout: string;
  shippingInfo: string;
  firstName: string;
  lastName: string;
  fullNameField: string;
  address: string;
  completeAddress: string;
  city: string;
  country: string;
  phone: string;
  paymentMethod: string;
  orderSummary: string;
  orderNumber: string;
  
  // Payment Methods
  bankTransfer: string;
  prepaidTickets: string;
  maxelPay: string;
  selectPaymentMethod: string;
  bankTransferTitle: string;
  bankTransferDescription: string;
  ibanLabel: string;
  bicLabel: string;
  transferReference: string;
  transferInstructions: string;
  prepaidTicketsTitle: string;
  prepaidTicketsDescription: string;
  ticketCode: string;
  addTicketCode: string;
  removeTicketCode: string;
  sendTicketCodes: string;
  
  // Order Confirmation
  paymentInstructions: string;
  orderReceived: string;
  emailConfirmation: string;
  deliveryTime: string;
  
  // Auth
  email: string;
  password: string;
  fullName: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  
  // Messages
  itemAddedToCart: string;
  itemRemovedFromCart: string;
  orderPlaced: string;
  loginRequired: string;
  paymentSuccessful: string;
  loggedOut: string;
  fillRequiredFields: string;
  invalidEmail: string;
  invalidPhone: string;
  ticketCodeSent: string;
  
  // Search & Filters
  searchPlaceholder: string;
  selectCountry: string;
  
  // Stats
  happyCustomers: string;
  satisfactionRate: string;
  ordersCompleted: string;
  customerSupport: string;
  
  // Reviews
  whatCustomersSay: string;
  realReviews: string;
  verifiedPurchase: string;
  
  // Footer Links
  legalNotice: string;
  privacyPolicy: string;
  termsOfService: string;
  contact: string;
  
  // Legal Pages Content
  legalNoticeTitle: string;
  legalNoticeContent: string;
  privacyPolicyTitle: string;
  privacyPolicyContent: string;
  termsOfServiceTitle: string;
  termsOfServiceContent: string;
  contactTitle: string;
  contactContent: string;
  
  // Product Details
  productDetails: string;
  specifications: string;
  inStock: string;
  outOfStock: string;
  addedToCart: string;
  
  // Status
  active: string;
  comingSoon: string;
  new: string;
  sale: string;
  
  // Common Phrases
  backToHome: string;
  pageNotFound: string;
  loading: string;
  error: string;
  retry: string;
  close: string;
  save: string;
  cancel: string;
  confirm: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    smartphones: 'Smartphones',
    watches: 'Watches',
    sneakers: 'Sneakers',
    gadgets: 'Home Gadgets',
    mobility: 'Mobility',
    
    // Actions
    addToCart: 'Add to Cart',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    proceedToCheckout: 'Proceed to Checkout',
    placeOrder: 'Place Order',
    continueShopping: 'Continue Shopping',
    
    // Common
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    discount: 'Discount',
    
    // Hero section
    heroTitle: 'Premium Tech at Unbeatable Prices',
    heroSubtitle: 'Discover the latest smartphones, smartwatches, sneakers, and gadgets with discounts up to 37% off',
    shopNow: 'Shop Now',
    viewDeals: 'View Deals',
    
    // Categories
    latestSmartphones: 'Latest Smartphones',
    smartWatchesFitness: 'Smart Watches & Fitness Trackers',
    premiumSneakers: 'Premium Sneakers & Fashion',
    smartHomeGadgets: 'Smart Home Gadgets',
    urbanMobility: 'Urban Mobility Solutions',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    cartTotal: 'Cart Total',
    removeItem: 'Remove Item',
    updateQuantity: 'Update Quantity',
    
    // Checkout Form
    checkout: 'Checkout',
    shippingInfo: 'Shipping Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    fullNameField: 'Full Name',
    address: 'Address',
    completeAddress: 'Complete Address',
    city: 'City',
    country: 'Country',
    phone: 'Phone Number',
    paymentMethod: 'Payment Method',
    orderSummary: 'Order Summary',
    orderNumber: 'Order Number',
    
    // Payment Methods
    bankTransfer: 'Bank Transfer',
    prepaidTickets: 'Prepaid Tickets',
    maxelPay: 'MaxelPay',
    selectPaymentMethod: 'Select Payment Method',
    bankTransferTitle: 'Bank Transfer',
    bankTransferDescription: 'Transfer the amount to our bank account',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Transfer Reference',
    transferInstructions: 'Use your order number as transfer reference',
    prepaidTicketsTitle: 'Prepaid Tickets (Transcash & PCS)',
    prepaidTicketsDescription: 'Send us your prepaid ticket codes',
    ticketCode: 'Ticket Code',
    addTicketCode: 'Add Ticket Code',
    removeTicketCode: 'Remove Code',
    sendTicketCodes: 'Send Ticket Codes',
    
    // Order Confirmation
    paymentInstructions: 'After receiving payment, you will receive an email confirmation. Your order will be delivered within 24-48 hours.',
    orderReceived: 'Order Received',
    emailConfirmation: 'You will receive an email confirmation',
    deliveryTime: 'Delivery within 24-48 hours',
    
    // Auth
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    
    // Messages
    itemAddedToCart: 'Item added to cart!',
    itemRemovedFromCart: 'Item removed from cart',
    orderPlaced: 'Order placed successfully!',
    loginRequired: 'Please login to continue checkout',
    paymentSuccessful: 'Payment successful! Order confirmed.',
    loggedOut: 'Logged out successfully',
    fillRequiredFields: 'Please fill all required fields',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    ticketCodeSent: 'Ticket codes sent successfully',
    
    // Search & Filters
    searchPlaceholder: 'Search products...',
    selectCountry: 'Select Country',
    
    // Stats
    happyCustomers: 'Happy Customers',
    satisfactionRate: 'Satisfaction Rate',
    ordersCompleted: 'Orders Completed',
    customerSupport: 'Customer Support',
    
    // Reviews
    whatCustomersSay: 'What Our Customers Say',
    realReviews: 'Real reviews from verified purchases',
    verifiedPurchase: 'Verified Purchase',
    
    // Footer Links
    legalNotice: 'Legal Notice',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    contact: 'Contact',
    
    // Legal Pages Content
    legalNoticeTitle: 'Legal Notice',
    legalNoticeContent: 'Luxio is an online store specializing in electronic products. Headquarters: [generic address]. Publication manager: [generic name]. Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicyContent: 'We only collect data necessary for order processing (name, address, email, phone). This information is never resold and can be deleted upon request via our contact email.',
    termsOfServiceTitle: 'Terms of Service',
    termsOfServiceContent: 'Prices are in euros including VAT. Accepted payments: bank transfer, Transcash/PCS prepaid tickets, MaxelPay. Orders are shipped within 24-48 hours after payment confirmation. Any complaint must be addressed to our contact email.',
    contactTitle: 'Contact',
    contactContent: 'For any questions: support@luxio-store.com',
    
    // Product Details
    productDetails: 'Product Details',
    specifications: 'Specifications',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    addedToCart: 'Added to Cart',
    
    // Status
    active: 'Active',
    comingSoon: 'Coming Soon',
    new: 'New',
    sale: 'Sale',
    
    // Common Phrases
    backToHome: 'Back to Home',
    pageNotFound: 'Page Not Found',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm'
  },
  
  fr: {
    // Navigation
    smartphones: 'Smartphones',
    watches: 'Montres',
    sneakers: 'Baskets',
    gadgets: 'Objets connectés',
    mobility: 'Mobilité',
    
    // Actions
    addToCart: 'Ajouter au panier',
    login: 'Connexion',
    signup: 'S\'inscrire',
    logout: 'Déconnexion',
    proceedToCheckout: 'Passer commande',
    placeOrder: 'Confirmer la commande',
    continueShopping: 'Continuer les achats',
    
    // Common
    price: 'Prix',
    quantity: 'Quantité',
    total: 'Total',
    subtotal: 'Sous-total',
    shipping: 'Livraison',
    free: 'Gratuit',
    discount: 'Remise',
    
    // Hero section
    heroTitle: 'Technologie premium à prix imbattables',
    heroSubtitle: 'Découvrez les derniers smartphones, montres connectées, baskets et gadgets avec jusqu\'à 37% de réduction',
    shopNow: 'Acheter maintenant',
    viewDeals: 'Voir les offres',
    
    // Categories
    latestSmartphones: 'Derniers smartphones',
    smartWatchesFitness: 'Montres connectées et fitness',
    premiumSneakers: 'Baskets premium et mode',
    smartHomeGadgets: 'Objets connectés maison',
    urbanMobility: 'Solutions de mobilité urbaine',
    
    // Cart
    shoppingCart: 'Panier',
    cartEmpty: 'Votre panier est vide',
    cartTotal: 'Total du panier',
    removeItem: 'Retirer l\'article',
    updateQuantity: 'Modifier la quantité',
    
    // Checkout Form
    checkout: 'Commande',
    shippingInfo: 'Informations de livraison',
    firstName: 'Prénom',
    lastName: 'Nom',
    fullNameField: 'Nom complet',
    address: 'Adresse',
    completeAddress: 'Adresse complète',
    city: 'Ville',
    country: 'Pays',
    phone: 'Téléphone',
    paymentMethod: 'Mode de paiement',
    orderSummary: 'Résumé de commande',
    orderNumber: 'Numéro de commande',
    
    // Payment Methods
    bankTransfer: 'Virement bancaire',
    prepaidTickets: 'Tickets prépayés',
    maxelPay: 'MaxelPay',
    selectPaymentMethod: 'Choisir le mode de paiement',
    bankTransferTitle: 'Virement bancaire',
    bankTransferDescription: 'Transférez le montant sur notre compte bancaire',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Référence du virement',
    transferInstructions: 'Utilisez votre numéro de commande comme référence',
    prepaidTicketsTitle: 'Tickets prépayés (Transcash & PCS)',
    prepaidTicketsDescription: 'Envoyez-nous vos codes de tickets prépayés',
    ticketCode: 'Code ticket',
    addTicketCode: 'Ajouter un code',
    removeTicketCode: 'Supprimer le code',
    sendTicketCodes: 'Envoyer les codes',
    
    // Order Confirmation
    paymentInstructions: 'Après réception du paiement, vous recevrez une confirmation par email. Votre commande sera livrée sous 24-48 h.',
    orderReceived: 'Commande reçue',
    emailConfirmation: 'Vous recevrez une confirmation par email',
    deliveryTime: 'Livraison sous 24-48 heures',
    
    // Auth
    email: 'Email',
    password: 'Mot de passe',
    fullName: 'Nom complet',
    dontHaveAccount: 'Pas encore de compte?',
    alreadyHaveAccount: 'Déjà un compte?',
    
    // Messages
    itemAddedToCart: 'Article ajouté au panier!',
    itemRemovedFromCart: 'Article retiré du panier',
    orderPlaced: 'Commande passée avec succès!',
    loginRequired: 'Veuillez vous connecter pour continuer',
    paymentSuccessful: 'Paiement réussi! Commande confirmée.',
    loggedOut: 'Déconnexion réussie',
    fillRequiredFields: 'Veuillez remplir tous les champs obligatoires',
    invalidEmail: 'Veuillez saisir une adresse email valide',
    invalidPhone: 'Veuillez saisir un numéro de téléphone valide',
    ticketCodeSent: 'Codes tickets envoyés avec succès',
    
    // Search & Filters
    searchPlaceholder: 'Rechercher des produits...',
    selectCountry: 'Sélectionner le pays',
    
    // Stats
    happyCustomers: 'Clients satisfaits',
    satisfactionRate: 'Taux de satisfaction',
    ordersCompleted: 'Commandes réalisées',
    customerSupport: 'Support client',
    
    // Reviews
    whatCustomersSay: 'Ce que disent nos clients',
    realReviews: 'Avis réels d\'achats vérifiés',
    verifiedPurchase: 'Achat vérifié',
    
    // Footer Links
    legalNotice: 'Mentions légales',
    privacyPolicy: 'Politique de confidentialité',
    termsOfService: 'Conditions générales de vente',
    contact: 'Contact',
    
    // Legal Pages Content
    legalNoticeTitle: 'Mentions légales',
    legalNoticeContent: 'Luxio est une boutique en ligne spécialisée dans les produits électroniques. Siège social : [adresse générique]. Responsable de publication : [nom générique]. Hébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Politique de confidentialité',
    privacyPolicyContent: 'Nous collectons uniquement les données nécessaires au traitement des commandes (nom, adresse, email, téléphone). Ces informations ne sont jamais revendues et peuvent être supprimées sur demande via notre email de contact.',
    termsOfServiceTitle: 'Conditions générales de vente',
    termsOfServiceContent: 'Les prix sont en euros TTC. Paiements acceptés : virement bancaire, tickets prépayés Transcash/PCS, MaxelPay. Les commandes sont expédiées sous 24-48 h après confirmation du paiement. Toute réclamation doit être adressée à notre email de contact.',
    contactTitle: 'Contact',
    contactContent: 'Pour toute question : support@luxio-store.com',
    
    // Product Details
    productDetails: 'Détails du produit',
    specifications: 'Spécifications',
    inStock: 'En stock',
    outOfStock: 'Rupture de stock',
    addedToCart: 'Ajouté au panier',
    
    // Status
    active: 'Actif',
    comingSoon: 'Bientôt disponible',
    new: 'Nouveau',
    sale: 'Promotion',
    
    // Common Phrases
    backToHome: 'Retour à l\'accueil',
    pageNotFound: 'Page non trouvée',
    loading: 'Chargement...',
    error: 'Erreur',
    retry: 'Réessayer',
    close: 'Fermer',
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer'
  },
  
  es: {
    // Navigation
    smartphones: 'Smartphones',
    watches: 'Relojes',
    sneakers: 'Zapatillas',
    gadgets: 'Gadgets',
    mobility: 'Movilidad',
    
    // Actions
    addToCart: 'Añadir al carrito',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    logout: 'Cerrar sesión',
    proceedToCheckout: 'Proceder al pago',
    placeOrder: 'Realizar pedido',
    continueShopping: 'Seguir comprando',
    
    // Common
    price: 'Precio',
    quantity: 'Cantidad',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    free: 'Gratis',
    discount: 'Descuento',
    
    // Hero section
    heroTitle: 'Tecnología premium a precios inmejorables',
    heroSubtitle: 'Descubre los últimos smartphones, smartwatches, zapatillas y gadgets con descuentos de hasta 37%',
    shopNow: 'Comprar ahora',
    viewDeals: 'Ver ofertas',
    
    // Categories
    latestSmartphones: 'Últimos smartphones',
    smartWatchesFitness: 'Relojes inteligentes y fitness',
    premiumSneakers: 'Zapatillas premium y moda',
    smartHomeGadgets: 'Gadgets inteligentes para el hogar',
    urbanMobility: 'Soluciones de movilidad urbana',
    
    // Cart
    shoppingCart: 'Carrito de compras',
    cartEmpty: 'Tu carrito está vacío',
    cartTotal: 'Total del carrito',
    removeItem: 'Eliminar artículo',
    updateQuantity: 'Actualizar cantidad',
    
    // Checkout Form
    checkout: 'Pagar',
    shippingInfo: 'Información de envío',
    firstName: 'Nombre',
    lastName: 'Apellido',
    fullNameField: 'Nombre completo',
    address: 'Dirección',
    completeAddress: 'Dirección completa',
    city: 'Ciudad',
    country: 'País',
    phone: 'Teléfono',
    paymentMethod: 'Método de pago',
    orderSummary: 'Resumen del pedido',
    orderNumber: 'Número de pedido',
    
    // Payment Methods
    bankTransfer: 'Transferencia bancaria',
    prepaidTickets: 'Tickets prepagados',
    maxelPay: 'MaxelPay',
    selectPaymentMethod: 'Seleccionar método de pago',
    bankTransferTitle: 'Transferencia bancaria',
    bankTransferDescription: 'Transfiere el importe a nuestra cuenta bancaria',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Referencia de transferencia',
    transferInstructions: 'Usa tu número de pedido como referencia',
    prepaidTicketsTitle: 'Tickets prepagados (Transcash & PCS)',
    prepaidTicketsDescription: 'Envíanos tus códigos de tickets prepagados',
    ticketCode: 'Código de ticket',
    addTicketCode: 'Añadir código',
    removeTicketCode: 'Eliminar código',
    sendTicketCodes: 'Enviar códigos',
    
    // Order Confirmation
    paymentInstructions: 'Después de recibir el pago, recibirás una confirmación por email. Tu pedido será entregado en 24-48 horas.',
    orderReceived: 'Pedido recibido',
    emailConfirmation: 'Recibirás una confirmación por email',
    deliveryTime: 'Entrega en 24-48 horas',
    
    // Auth
    email: 'Email',
    password: 'Contraseña',
    fullName: 'Nombre completo',
    dontHaveAccount: '¿No tienes cuenta?',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    
    // Messages
    itemAddedToCart: '¡Producto añadido al carrito!',
    itemRemovedFromCart: 'Producto eliminado del carrito',
    orderPlaced: '¡Pedido realizado con éxito!',
    loginRequired: 'Inicia sesión para continuar',
    paymentSuccessful: '¡Pago exitoso! Pedido confirmado.',
    loggedOut: 'Sesión cerrada correctamente',
    fillRequiredFields: 'Por favor, completa todos los campos obligatorios',
    invalidEmail: 'Por favor, introduce un email válido',
    invalidPhone: 'Por favor, introduce un teléfono válido',
    ticketCodeSent: 'Códigos de tickets enviados correctamente',
    
    // Search & Filters
    searchPlaceholder: 'Buscar productos...',
    selectCountry: 'Seleccionar país',
    
    // Stats
    happyCustomers: 'Clientes felices',
    satisfactionRate: 'Tasa de satisfacción',
    ordersCompleted: 'Pedidos completados',
    customerSupport: 'Atención al cliente',
    
    // Reviews
    whatCustomersSay: 'Lo que dicen nuestros clientes',
    realReviews: 'Reseñas reales de compras verificadas',
    verifiedPurchase: 'Compra verificada',
    
    // Footer Links
    legalNotice: 'Aviso legal',
    privacyPolicy: 'Política de privacidad',
    termsOfService: 'Términos de servicio',
    contact: 'Contacto',
    
    // Legal Pages Content
    legalNoticeTitle: 'Aviso legal',
    legalNoticeContent: 'Luxio es una tienda online especializada en productos electrónicos. Sede social: [dirección genérica]. Responsable de publicación: [nombre genérico]. Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Política de privacidad',
    privacyPolicyContent: 'Solo recopilamos los datos necesarios para el procesamiento de pedidos (nombre, dirección, email, teléfono). Esta información nunca se revende y puede ser eliminada bajo petición a través de nuestro email de contacto.',
    termsOfServiceTitle: 'Términos de servicio',
    termsOfServiceContent: 'Los precios están en euros con IVA incluido. Pagos aceptados: transferencia bancaria, tickets prepagados Transcash/PCS, MaxelPay. Los pedidos se envían en 24-48 horas tras confirmación del pago. Cualquier reclamación debe dirigirse a nuestro email de contacto.',
    contactTitle: 'Contacto',
    contactContent: 'Para cualquier pregunta: support@luxio-store.com',
    
    // Product Details
    productDetails: 'Detalles del producto',
    specifications: 'Especificaciones',
    inStock: 'En stock',
    outOfStock: 'Agotado',
    addedToCart: 'Añadido al carrito',
    
    // Status
    active: 'Activo',
    comingSoon: 'Próximamente',
    new: 'Nuevo',
    sale: 'Oferta',
    
    // Common Phrases
    backToHome: 'Volver al inicio',
    pageNotFound: 'Página no encontrada',
    loading: 'Cargando...',
    error: 'Error',
    retry: 'Reintentar',
    close: 'Cerrar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  
  pt: {
    // Navigation
    smartphones: 'Smartphones',
    watches: 'Relógios',
    sneakers: 'Ténis',
    gadgets: 'Gadgets',
    mobility: 'Mobilidade',
    
    // Actions
    addToCart: 'Adicionar ao carrinho',
    login: 'Entrar',
    signup: 'Registar',
    logout: 'Sair',
    proceedToCheckout: 'Finalizar compra',
    placeOrder: 'Fazer pedido',
    continueShopping: 'Continuar comprando',
    
    // Common
    price: 'Preço',
    quantity: 'Quantidade',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Envio',
    free: 'Grátis',
    discount: 'Desconto',
    
    // Hero section
    heroTitle: 'Tecnologia premium a preços imbatíveis',
    heroSubtitle: 'Descubra os mais recentes smartphones, smartwatches, ténis e gadgets com descontos até 37%',
    shopNow: 'Comprar agora',
    viewDeals: 'Ver ofertas',
    
    // Categories
    latestSmartphones: 'Últimos smartphones',
    smartWatchesFitness: 'Relógios inteligentes e fitness',
    premiumSneakers: 'Ténis premium e moda',
    smartHomeGadgets: 'Gadgets inteligentes para casa',
    urbanMobility: 'Soluções de mobilidade urbana',
    
    // Cart
    shoppingCart: 'Carrinho de compras',
    cartEmpty: 'O seu carrinho está vazio',
    cartTotal: 'Total do carrinho',
    removeItem: 'Remover item',
    updateQuantity: 'Atualizar quantidade',
    
    // Checkout Form
    checkout: 'Finalizar',
    shippingInfo: 'Informações de envio',
    firstName: 'Nome',
    lastName: 'Apelido',
    fullNameField: 'Nome completo',
    address: 'Morada',
    completeAddress: 'Morada completa',
    city: 'Cidade',
    country: 'País',
    phone: 'Telefone',
    paymentMethod: 'Método de pagamento',
    orderSummary: 'Resumo do pedido',
    orderNumber: 'Número do pedido',
    
    // Payment Methods
    bankTransfer: 'Transferência bancária',
    prepaidTickets: 'Tickets pré-pagos',
    maxelPay: 'MaxelPay',
    selectPaymentMethod: 'Selecionar método de pagamento',
    bankTransferTitle: 'Transferência bancária',
    bankTransferDescription: 'Transfira o valor para a nossa conta bancária',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Referência da transferência',
    transferInstructions: 'Use o seu número de pedido como referência',
    prepaidTicketsTitle: 'Tickets pré-pagos (Transcash & PCS)',
    prepaidTicketsDescription: 'Envie-nos os seus códigos de tickets pré-pagos',
    ticketCode: 'Código do ticket',
    addTicketCode: 'Adicionar código',
    removeTicketCode: 'Remover código',
    sendTicketCodes: 'Enviar códigos',
    
    // Order Confirmation
    paymentInstructions: 'Após receber o pagamento, receberá uma confirmação por email. O seu pedido será entregue em 24-48 horas.',
    orderReceived: 'Pedido recebido',
    emailConfirmation: 'Receberá uma confirmação por email',
    deliveryTime: 'Entrega em 24-48 horas',
    
    // Auth
    email: 'Email',
    password: 'Palavra-passe',
    fullName: 'Nome completo',
    dontHaveAccount: 'Não tem conta?',
    alreadyHaveAccount: 'Já tem conta?',
    
    // Messages
    itemAddedToCart: 'Item adicionado ao carrinho!',
    itemRemovedFromCart: 'Item removido do carrinho',
    orderPlaced: 'Pedido realizado com sucesso!',
    loginRequired: 'Entre para continuar a compra',
    paymentSuccessful: 'Pagamento bem-sucedido! Pedido confirmado.',
    loggedOut: 'Sessão terminada com sucesso',
    fillRequiredFields: 'Por favor, preencha todos os campos obrigatórios',
    invalidEmail: 'Por favor, introduza um email válido',
    invalidPhone: 'Por favor, introduza um telefone válido',
    ticketCodeSent: 'Códigos de tickets enviados com sucesso',
    
    // Search & Filters
    searchPlaceholder: 'Pesquisar produtos...',
    selectCountry: 'Selecionar país',
    
    // Stats
    happyCustomers: 'Clientes felizes',
    satisfactionRate: 'Taxa de satisfação',
    ordersCompleted: 'Pedidos concluídos',
    customerSupport: 'Suporte ao cliente',
    
    // Reviews
    whatCustomersSay: 'O que dizem nossos clientes',
    realReviews: 'Avaliações reais de compras verificadas',
    verifiedPurchase: 'Compra verificada',
    
    // Footer Links
    legalNotice: 'Aviso legal',
    privacyPolicy: 'Política de privacidade',
    termsOfService: 'Termos de serviço',
    contact: 'Contacto',
    
    // Legal Pages Content
    legalNoticeTitle: 'Aviso legal',
    legalNoticeContent: 'Luxio é uma loja online especializada em produtos eletrónicos. Sede: [morada genérica]. Responsável pela publicação: [nome genérico]. Alojamento: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Política de privacidade',
    privacyPolicyContent: 'Recolhemos apenas os dados necessários para o processamento de pedidos (nome, morada, email, telefone). Esta informação nunca é revendida e pode ser eliminada mediante pedido através do nosso email de contacto.',
    termsOfServiceTitle: 'Termos de serviço',
    termsOfServiceContent: 'Os preços estão em euros com IVA incluído. Pagamentos aceites: transferência bancária, tickets pré-pagos Transcash/PCS, MaxelPay. Os pedidos são enviados em 24-48 horas após confirmação do pagamento. Qualquer reclamação deve ser dirigida ao nosso email de contacto.',
    contactTitle: 'Contacto',
    contactContent: 'Para qualquer questão: support@luxio-store.com',
    
    // Product Details
    productDetails: 'Detalhes do produto',
    specifications: 'Especificações',
    inStock: 'Em stock',
    outOfStock: 'Esgotado',
    addedToCart: 'Adicionado ao carrinho',
    
    // Status
    active: 'Ativo',
    comingSoon: 'Em breve',
    new: 'Novo',
    sale: 'Promoção',
    
    // Common Phrases
    backToHome: 'Voltar ao início',
    pageNotFound: 'Página não encontrada',
    loading: 'A carregar...',
    error: 'Erro',
    retry: 'Tentar novamente',
    close: 'Fechar',
    save: 'Guardar',
    cancel: 'Cancelar',
    confirm: 'Confirmar'
  },
  
  pl: {
    // Navigation
    smartphones: 'Smartfony',
    watches: 'Zegarki',
    sneakers: 'Buty',
    gadgets: 'Gadżety',
    mobility: 'Mobilność',
    
    // Actions
    addToCart: 'Dodaj do koszyka',
    login: 'Zaloguj się',
    signup: 'Zarejestruj się',
    logout: 'Wyloguj',
    proceedToCheckout: 'Przejdź do kasy',
    placeOrder: 'Złóż zamówienie',
    continueShopping: 'Kontynuuj zakupy',
    
    // Common
    price: 'Cena',
    quantity: 'Ilość',
    total: 'Łącznie',
    subtotal: 'Suma częściowa',
    shipping: 'Dostawa',
    free: 'Darmowa',
    discount: 'Zniżka',
    
    // Hero section
    heroTitle: 'Technologia premium w niezbijanej cenie',
    heroSubtitle: 'Odkryj najnowsze smartfony, smartwatche, buty i gadżety ze zniżkami do 37%',
    shopNow: 'Kup teraz',
    viewDeals: 'Zobacz oferty',
    
    // Categories
    latestSmartphones: 'Najnowsze smartfony',
    smartWatchesFitness: 'Smartwatche i trackery fitness',
    premiumSneakers: 'Buty premium i moda',
    smartHomeGadgets: 'Inteligentne gadżety domowe',
    urbanMobility: 'Rozwiązania mobilności miejskiej',
    
    // Cart
    shoppingCart: 'Koszyk',
    cartEmpty: 'Twój koszyk jest pusty',
    cartTotal: 'Suma koszyka',
    removeItem: 'Usuń przedmiot',
    updateQuantity: 'Zaktualizuj ilość',
    
    // Checkout Form
    checkout: 'Kasa',
    shippingInfo: 'Informacje o dostawie',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    fullNameField: 'Pełne imię',
    address: 'Adres',
    completeAddress: 'Pełny adres',
    city: 'Miasto',
    country: 'Kraj',
    phone: 'Telefon',
    paymentMethod: 'Metoda płatności',
    orderSummary: 'Podsumowanie zamówienia',
    orderNumber: 'Numer zamówienia',
    
    // Payment Methods
    bankTransfer: 'Przelew bankowy',
    prepaidTickets: 'Karty przedpłacone',
    maxelPay: 'MaxelPay',
    selectPaymentMethod: 'Wybierz metodę płatności',
    bankTransferTitle: 'Przelew bankowy',
    bankTransferDescription: 'Przelej kwotę na nasze konto bankowe',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Tytuł przelewu',
    transferInstructions: 'Użyj numeru zamówienia jako tytułu przelewu',
    prepaidTicketsTitle: 'Karty przedpłacone (Transcash & PCS)',
    prepaidTicketsDescription: 'Prześlij nam kody swoich kart przedpłaconych',
    ticketCode: 'Kod karty',
    addTicketCode: 'Dodaj kod',
    removeTicketCode: 'Usuń kod',
    sendTicketCodes: 'Wyślij kody',
    
    // Order Confirmation
    paymentInstructions: 'Po otrzymaniu płatności otrzymasz potwierdzenie przez email. Twoje zamówienie zostanie dostarczone w ciągu 24-48 godzin.',
    orderReceived: 'Zamówienie otrzymane',
    emailConfirmation: 'Otrzymasz potwierdzenie przez email',
    deliveryTime: 'Dostawa w ciągu 24-48 godzin',
    
    // Auth
    email: 'Email',
    password: 'Hasło',
    fullName: 'Pełne imię',
    dontHaveAccount: 'Nie masz konta?',
    alreadyHaveAccount: 'Masz już konto?',
    
    // Messages
    itemAddedToCart: 'Dodano do koszyka!',
    itemRemovedFromCart: 'Usunięto z koszyka',
    orderPlaced: 'Zamówienie złożone pomyślnie!',
    loginRequired: 'Zaloguj się, aby kontynuować',
    paymentSuccessful: 'Płatność udana! Zamówienie potwierdzone.',
    loggedOut: 'Wylogowano pomyślnie',
    fillRequiredFields: 'Proszę wypełnić wszystkie wymagane pola',
    invalidEmail: 'Proszę wprowadzić poprawny adres email',
    invalidPhone: 'Proszę wprowadzić poprawny numer telefonu',
    ticketCodeSent: 'Kody kart wysłane pomyślnie',
    
    // Search & Filters
    searchPlaceholder: 'Szukaj produktów...',
    selectCountry: 'Wybierz kraj',
    
    // Stats
    happyCustomers: 'Zadowoleni klienci',
    satisfactionRate: 'Wskaźnik zadowolenia',
    ordersCompleted: 'Zamówienia zrealizowane',
    customerSupport: 'Obsługa klienta',
    
    // Reviews
    whatCustomersSay: 'Co mówią nasi klienci',
    realReviews: 'Prawdziwe opinie ze zweryfikowanych zakupów',
    verifiedPurchase: 'Zweryfikowany zakup',
    
    // Footer Links
    legalNotice: 'Informacje prawne',
    privacyPolicy: 'Polityka prywatności',
    termsOfService: 'Warunki usługi',
    contact: 'Kontakt',
    
    // Legal Pages Content
    legalNoticeTitle: 'Informacje prawne',
    legalNoticeContent: 'Luxio to sklep internetowy specjalizujący się w produktach elektronicznych. Siedziba: [adres ogólny]. Odpowiedzialny za publikację: [nazwa ogólna]. Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Polityka prywatności',
    privacyPolicyContent: 'Zbieramy tylko dane niezbędne do realizacji zamówień (imię, adres, email, telefon). Te informacje nigdy nie są odsprzedawane i mogą być usunięte na żądanie przez nasz email kontaktowy.',
    termsOfServiceTitle: 'Warunki usługi',
    termsOfServiceContent: 'Ceny podane są w euro z VAT. Akceptowane płatności: przelew bankowy, karty przedpłacone Transcash/PCS, MaxelPay. Zamówienia są wysyłane w ciągu 24-48 godzin po potwierdzeniu płatności. Wszelkie reklamacje należy kierować na nasz email kontaktowy.',
    contactTitle: 'Kontakt',
    contactContent: 'W przypadku pytań: support@luxio-store.com',
    
    // Product Details
    productDetails: 'Szczegóły produktu',
    specifications: 'Specyfikacje',
    inStock: 'Na stanie',
    outOfStock: 'Brak na stanie',
    addedToCart: 'Dodano do koszyka',
    
    // Status
    active: 'Aktywny',
    comingSoon: 'Wkrótce',
    new: 'Nowy',
    sale: 'Wyprzedaż',
    
    // Common Phrases
    backToHome: 'Powrót do strony głównej',
    pageNotFound: 'Strona nie znaleziona',
    loading: 'Ładowanie...',
    error: 'Błąd',
    retry: 'Spróbuj ponownie',
    close: 'Zamknij',
    save: 'Zapisz',
    cancel: 'Anuluj',
    confirm: 'Potwierdź'
  }
};

export function detectLanguage(): Language {
  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as Language;
  if (langParam && ['en', 'fr', 'es', 'pt', 'pl'].includes(langParam)) {
    return langParam;
  }

  // Check localStorage
  const storedLang = localStorage.getItem('luxio-language') as Language;
  if (storedLang && ['en', 'fr', 'es', 'pt', 'pl'].includes(storedLang)) {
    return storedLang;
  }

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('pl')) return 'pl';

  // Default to English
  return 'en';
}