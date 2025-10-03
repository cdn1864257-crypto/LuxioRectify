export type Language = 'en' | 'fr' | 'es' | 'pt' | 'pl' | 'it' | 'hu';

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
  newCollectionAvailable: string;
  freeShipping: string;
  yearWarranty: string;
  securePayment: string;
  saveUpTo: string;
  fastDelivery: string;
  hoursGuaranteed: string;
  
  // Categories
  latestSmartphones: string;
  smartWatchesFitness: string;
  premiumSneakers: string;
  smartHomeGadgets: string;
  urbanMobility: string;
  viewAllSmartphones: string;
  
  // Cart
  shoppingCart: string;
  cartEmpty: string;
  cartEmptyDescription: string;
  cartTotal: string;
  removeItem: string;
  updateQuantity: string;
  item: string;
  items: string;
  qty: string;
  
  // Checkout Form
  checkout: string;
  checkoutSubtitle: string;
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
  maxelPayDescription: string;
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
  enterTicketCode: string;
  orderFailed: string;
  redirectingToMaxelPay: string;
  
  // Search & Filters
  searchPlaceholder: string;
  selectCountry: string;
  filterResults: string;
  searchByModel: string;
  allBrands: string;
  allCapacities: string;
  allColors: string;
  resetFilters: string;
  noProductsFound: string;
  
  // Premium Page
  premiumSmartphones: string;
  discoverLatest: string;
  products: string;
  upTo: string;
  off: string;
  variants: string;
  available: string;
  added: string;
  addedSuccessfully: string;
  previous: string;
  next: string;
  
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
  
  // Additional Payment Fields
  emailAddress: string;
  
  // Testimonials
  testimonials: Array<{
    name: string;
    avatar: string;
    rating: number;
    text: string;
    verified: boolean;
  }>;
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
    newCollectionAvailable: 'New collection available',
    freeShipping: 'Free shipping',
    yearWarranty: '2 year warranty',
    securePayment: 'Secure payment',
    saveUpTo: 'Save up to',
    fastDelivery: 'Fast delivery',
    hoursGuaranteed: '24-48h guaranteed',
    
    // Categories
    latestSmartphones: 'Latest Smartphones',
    smartWatchesFitness: 'Smart Watches & Fitness Trackers',
    premiumSneakers: 'Premium Sneakers & Fashion',
    smartHomeGadgets: 'Smart Home Gadgets',
    urbanMobility: 'Urban Mobility Solutions',
    viewAllSmartphones: 'View All Smartphones',
    
    // Cart
    shoppingCart: 'Shopping Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyDescription: 'Discover our products and add them to your cart',
    cartTotal: 'Cart Total',
    removeItem: 'Remove Item',
    updateQuantity: 'Update Quantity',
    item: 'item',
    items: 'items',
    qty: 'Qty',
    
    // Checkout Form
    checkout: 'Checkout',
    checkoutSubtitle: 'Complete your order in a few simple steps',
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
    maxelPayDescription: 'Fast and secure online payment',
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
    enterTicketCode: 'Please enter at least one ticket code',
    orderFailed: 'Order failed. Please try again.',
    redirectingToMaxelPay: 'Redirecting to MaxelPay...',
    
    // Search & Filters
    searchPlaceholder: 'Search products...',
    selectCountry: 'Select Country',
    filterResults: 'Filter Results',
    searchByModel: 'Search by model...',
    allBrands: 'All Brands',
    allCapacities: 'All Capacities',
    allColors: 'All Colors',
    resetFilters: 'Reset Filters',
    noProductsFound: 'No products found matching your filters',
    
    // Premium Page
    premiumSmartphones: 'Premium Smartphones',
    discoverLatest: 'Discover the latest flagship smartphones with exclusive discounts',
    products: 'products',
    upTo: 'Up to',
    off: 'OFF',
    variants: 'variants',
    available: 'available',
    added: 'Added',
    addedSuccessfully: 'has been added to cart',
    previous: 'Previous',
    next: 'Next',
    
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
    legalNoticeContent: 'Luxio is an online store specializing in electronic products. Headquarters: 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Publication manager: Saári Barnabás (Luxio). Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
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
    confirm: 'Confirm',
    
    // Additional Payment Fields
    emailAddress: 'Email Address',
    
    // Testimonials
    testimonials: [
      {
        name: 'Sarah Johnson',
        avatar: 'SJ',
        rating: 5,
        text: 'Amazing shopping experience! Got my iPhone 15 Pro with 20% off and it arrived the next day. Luxio\'s customer service is exceptional.',
        verified: true
      },
      {
        name: 'Michael Chen',
        avatar: 'MC',
        rating: 5,
        text: 'The Apple Watch Ultra 2 I ordered exceeded my expectations. Great quality, fast delivery, and excellent packaging protection.',
        verified: true
      },
      {
        name: 'Emma Rodriguez',
        avatar: 'ER',
        rating: 5,
        text: 'Love my new Air Jordan sneakers! Perfect fit, authentic quality, and the discount made it such a great deal.',
        verified: true
      },
      {
        name: 'David Thompson',
        avatar: 'DT',
        rating: 5,
        text: 'The smart home gadgets work perfectly together. Easy setup and the prices on Luxio are unbeatable.',
        verified: true
      },
      {
        name: 'Lisa Martinez',
        avatar: 'LM',
        rating: 5,
        text: 'Electric scooter arrived perfectly assembled and ready to ride. Great build quality and smooth checkout process.',
        verified: true
      },
      {
        name: 'James Wilson',
        avatar: 'JW',
        rating: 5,
        text: 'Fantastic experience with my Galaxy S24 Ultra purchase. Premium packaging and lightning-fast shipping to my doorstep.',
        verified: true
      },
      {
        name: 'Rachel Kim',
        avatar: 'RK',
        rating: 5,
        text: 'The Garmin watch is perfect for my fitness goals. Luxio offers the best prices and their payment system is secure.',
        verified: true
      },
      {
        name: 'Alex Foster',
        avatar: 'AF',
        rating: 5,
        text: 'Outstanding product quality and customer care. My smart speaker setup was effortless thanks to their detailed guides.',
        verified: true
      },
      {
        name: 'Jennifer Lee',
        avatar: 'JL',
        rating: 5,
        text: 'The wireless earbuds I bought have incredible sound quality. Luxio always has the best deals on premium electronics!',
        verified: true
      },
      {
        name: 'Robert Taylor',
        avatar: 'RT',
        rating: 5,
        text: 'Ordered a fitness tracker and it arrived in mint condition. Great customer service when I had questions about setup.',
        verified: true
      },
      {
        name: 'Amanda White',
        avatar: 'AW',
        rating: 5,
        text: 'My electric bike purchase was seamless from start to finish. The discount made it an incredible value for the quality.',
        verified: true
      },
      {
        name: 'Christopher Brown',
        avatar: 'CB',
        rating: 5,
        text: 'The tablet I purchased exceeded my expectations. Fast shipping, great price, and the product is exactly as described.',
        verified: true
      },
      {
        name: 'Michelle Davis',
        avatar: 'MD',
        rating: 5,
        text: 'Luxio has become my go-to store for all tech purchases. Reliable, affordable, and always authentic products.',
        verified: true
      },
      {
        name: 'Daniel Anderson',
        avatar: 'DA',
        rating: 5,
        text: 'The smart home bundle I bought works perfectly together. Installation was simple and customer support was very helpful.',
        verified: true
      },
      {
        name: 'Nicole Martinez',
        avatar: 'NM',
        rating: 5,
        text: 'Received my new smartwatch within 48 hours. The packaging was excellent and the watch is absolutely beautiful!',
        verified: true
      },
      {
        name: 'Kevin Johnson',
        avatar: 'KJ',
        rating: 5,
        text: 'Best online shopping experience I\'ve had. The website is easy to navigate and checkout was super quick and secure.',
        verified: true
      }
    ]
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
    newCollectionAvailable: 'Nouvelle collection disponible',
    freeShipping: 'Livraison gratuite',
    yearWarranty: 'Garantie 2 ans',
    securePayment: 'Paiement sécurisé',
    saveUpTo: 'Économisez jusqu\'à',
    fastDelivery: 'Livraison rapide',
    hoursGuaranteed: '24-48h garanties',
    
    // Categories
    latestSmartphones: 'Derniers smartphones',
    smartWatchesFitness: 'Montres connectées et fitness',
    premiumSneakers: 'Baskets premium et mode',
    smartHomeGadgets: 'Objets connectés maison',
    urbanMobility: 'Solutions de mobilité urbaine',
    viewAllSmartphones: 'Voir tous les smartphones',
    
    // Cart
    shoppingCart: 'Panier',
    cartEmpty: 'Votre panier est vide',
    cartEmptyDescription: 'Découvrez nos produits et ajoutez-les à votre panier',
    cartTotal: 'Total du panier',
    removeItem: 'Retirer l\'article',
    updateQuantity: 'Modifier la quantité',
    item: 'article',
    items: 'articles',
    qty: 'Qté',
    
    // Checkout Form
    checkout: 'Commande',
    checkoutSubtitle: 'Finalisez votre commande en quelques étapes',
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
    maxelPayDescription: 'Paiement en ligne rapide et sécurisé',
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
    enterTicketCode: 'Veuillez entrer au moins un code ticket',
    orderFailed: 'Commande échouée. Veuillez réessayer.',
    redirectingToMaxelPay: 'Redirection vers MaxelPay...',
    
    // Search & Filters
    searchPlaceholder: 'Rechercher des produits...',
    selectCountry: 'Sélectionner le pays',
    filterResults: 'Filtrer les résultats',
    searchByModel: 'Rechercher par modèle...',
    allBrands: 'Toutes les marques',
    allCapacities: 'Toutes les capacités',
    allColors: 'Toutes les couleurs',
    resetFilters: 'Réinitialiser les filtres',
    noProductsFound: 'Aucun produit ne correspond à vos filtres',
    
    // Premium Page
    premiumSmartphones: 'Smartphones Premium',
    discoverLatest: 'Découvrez les derniers smartphones flagship avec des réductions exclusives',
    products: 'produits',
    upTo: 'Jusqu\'à',
    off: 'DE RÉDUCTION',
    variants: 'variantes',
    available: 'disponibles',
    added: 'Ajouté',
    addedSuccessfully: 'a été ajouté au panier',
    previous: 'Précédent',
    next: 'Suivant',
    
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
    legalNoticeContent: 'Luxio est une boutique en ligne spécialisée dans les produits électroniques. Siège social : 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Responsable de publication : Saári Barnabás (Luxio). Hébergement : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
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
    confirm: 'Confirmer',
    
    // Additional Payment Fields
    emailAddress: 'Adresse email',
    
    // Testimonials
    testimonials: [
      {
        name: 'Marie Dubois',
        avatar: 'MD',
        rating: 5,
        text: 'Expérience d\'achat fantastique ! Mon iPhone 15 Pro commandé avec 20% de réduction est arrivé le lendemain. Service client exceptionnel.',
        verified: true
      },
      {
        name: 'Pierre Martin',
        avatar: 'PM',
        rating: 5,
        text: 'L\'Apple Watch Ultra 2 dépasse toutes mes attentes. Qualité premium, livraison rapide et emballage soigné.',
        verified: true
      },
      {
        name: 'Sophie Leclerc',
        avatar: 'SL',
        rating: 5,
        text: 'Mes nouvelles Air Jordan sont parfaites ! Taille idéale, qualité authentique et le prix était imbattable.',
        verified: true
      },
      {
        name: 'Thomas Moreau',
        avatar: 'TM',
        rating: 5,
        text: 'Les objets connectés fonctionnent parfaitement ensemble. Installation facile et les prix Luxio sont imbattables.',
        verified: true
      },
      {
        name: 'Julie Bernard',
        avatar: 'JB',
        rating: 5,
        text: 'Trottinette électrique livrée parfaitement assemblée et prête à utiliser. Excellente qualité et processus fluide.',
        verified: true
      },
      {
        name: 'Antoine Rousseau',
        avatar: 'AR',
        rating: 5,
        text: 'Expérience fantastique avec mon Galaxy S24 Ultra. Emballage premium et livraison ultra-rapide à domicile.',
        verified: true
      },
      {
        name: 'Camille Petit',
        avatar: 'CP',
        rating: 5,
        text: 'La montre Garmin est parfaite pour mes objectifs fitness. Luxio offre les meilleurs prix et un paiement sécurisé.',
        verified: true
      },
      {
        name: 'Maxime Girard',
        avatar: 'MG',
        rating: 5,
        text: 'Qualité produit remarquable et service client au top. Installation de mon enceinte connectée simple grâce aux guides détaillés.',
        verified: true
      },
      {
        name: 'Isabelle Leroy',
        avatar: 'IL',
        rating: 5,
        text: 'Les écouteurs sans fil que j\'ai achetés ont une qualité sonore incroyable. Luxio a toujours les meilleures offres sur l\'électronique premium !',
        verified: true
      },
      {
        name: 'François Dupont',
        avatar: 'FD',
        rating: 5,
        text: 'J\'ai commandé un tracker fitness et il est arrivé en parfait état. Excellent service client quand j\'ai eu des questions sur la configuration.',
        verified: true
      },
      {
        name: 'Céline Blanc',
        avatar: 'CB',
        rating: 5,
        text: 'Mon achat de vélo électrique s\'est déroulé sans accroc du début à la fin. La réduction en a fait une valeur incroyable pour la qualité.',
        verified: true
      },
      {
        name: 'Laurent Mercier',
        avatar: 'LM',
        rating: 5,
        text: 'La tablette que j\'ai achetée a dépassé mes attentes. Livraison rapide, excellent prix et le produit est exactement comme décrit.',
        verified: true
      },
      {
        name: 'Valérie Simon',
        avatar: 'VS',
        rating: 5,
        text: 'Luxio est devenu ma boutique préférée pour tous mes achats tech. Fiable, abordable et toujours des produits authentiques.',
        verified: true
      },
      {
        name: 'Nicolas Roux',
        avatar: 'NR',
        rating: 5,
        text: 'Le pack maison connectée que j\'ai acheté fonctionne parfaitement. Installation simple et le support client était très utile.',
        verified: true
      },
      {
        name: 'Élise Fontaine',
        avatar: 'EF',
        rating: 5,
        text: 'J\'ai reçu ma nouvelle montre connectée en 48 heures. L\'emballage était excellent et la montre est absolument magnifique !',
        verified: true
      },
      {
        name: 'Julien Garnier',
        avatar: 'JG',
        rating: 5,
        text: 'Meilleure expérience d\'achat en ligne que j\'ai eue. Le site est facile à naviguer et le paiement était super rapide et sécurisé.',
        verified: true
      }
    ]
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
    newCollectionAvailable: 'Nueva colección disponible',
    freeShipping: 'Envío gratis',
    yearWarranty: 'Garantía 2 años',
    securePayment: 'Pago seguro',
    saveUpTo: 'Ahorra hasta',
    fastDelivery: 'Entrega rápida',
    hoursGuaranteed: '24-48h garantizado',
    
    // Categories
    latestSmartphones: 'Últimos smartphones',
    smartWatchesFitness: 'Relojes inteligentes y fitness',
    premiumSneakers: 'Zapatillas premium y moda',
    smartHomeGadgets: 'Gadgets inteligentes para el hogar',
    urbanMobility: 'Soluciones de movilidad urbana',
    viewAllSmartphones: 'Ver todos los smartphones',
    
    // Cart
    shoppingCart: 'Carrito de compras',
    cartEmpty: 'Tu carrito está vacío',
    cartEmptyDescription: 'Descubre nuestros productos y añádelos a tu carrito',
    cartTotal: 'Total del carrito',
    removeItem: 'Eliminar artículo',
    updateQuantity: 'Actualizar cantidad',
    item: 'artículo',
    items: 'artículos',
    qty: 'Cant',
    
    // Checkout Form
    checkout: 'Pagar',
    checkoutSubtitle: 'Completa tu pedido en pocos pasos',
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
    maxelPayDescription: 'Pago en línea rápido y seguro',
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
    enterTicketCode: 'Por favor, introduce al menos un código de ticket',
    orderFailed: 'Pedido fallido. Por favor, inténtalo de nuevo.',
    redirectingToMaxelPay: 'Redirigiendo a MaxelPay...',
    
    // Search & Filters
    searchPlaceholder: 'Buscar productos...',
    selectCountry: 'Seleccionar país',
    filterResults: 'Filtrar resultados',
    searchByModel: 'Buscar por modelo...',
    allBrands: 'Todas las marcas',
    allCapacities: 'Todas las capacidades',
    allColors: 'Todos los colores',
    resetFilters: 'Resetear filtros',
    noProductsFound: 'No se encontraron productos que coincidan con tus filtros',
    
    // Premium Page
    premiumSmartphones: 'Smartphones Premium',
    discoverLatest: 'Descubre los últimos smartphones flagship con descuentos exclusivos',
    products: 'productos',
    upTo: 'Hasta',
    off: 'DE DESCUENTO',
    variants: 'variantes',
    available: 'disponibles',
    added: 'Añadido',
    addedSuccessfully: 'ha sido añadido al carrito',
    previous: 'Anterior',
    next: 'Siguiente',
    
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
    legalNoticeContent: 'Luxio es una tienda online especializada en productos electrónicos. Sede social: 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Responsable de publicación: Saári Barnabás (Luxio). Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
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
    confirm: 'Confirmar',
    
    // Additional Payment Fields
    emailAddress: 'Dirección de email',
    
    // Testimonials
    testimonials: [
      {
        name: 'María García',
        avatar: 'MG',
        rating: 5,
        text: '¡Experiencia de compra increíble! Mi iPhone 15 Pro con 20% de descuento llegó al día siguiente. El servicio de Luxio es excepcional.',
        verified: true
      },
      {
        name: 'Carlos Rodríguez',
        avatar: 'CR',
        rating: 5,
        text: 'El Apple Watch Ultra 2 superó todas mis expectativas. Excelente calidad, entrega rápida y empaque perfecto.',
        verified: true
      },
      {
        name: 'Ana Martínez',
        avatar: 'AM',
        rating: 5,
        text: '¡Mis nuevas Air Jordan son perfectas! Talla ideal, calidad auténtica y el precio fue imbatible.',
        verified: true
      },
      {
        name: 'Diego López',
        avatar: 'DL',
        rating: 5,
        text: 'Los gadgets inteligentes funcionan perfectamente juntos. Instalación fácil y los precios de Luxio son inmejorables.',
        verified: true
      },
      {
        name: 'Lucía Fernández',
        avatar: 'LF',
        rating: 5,
        text: 'Scooter eléctrico llegó perfectamente ensamblado y listo para usar. Excelente calidad y proceso fluido.',
        verified: true
      },
      {
        name: 'Alejandro Ruiz',
        avatar: 'AR',
        rating: 5,
        text: 'Experiencia fantástica con mi Galaxy S24 Ultra. Empaque premium y envío ultrarrápido a casa.',
        verified: true
      },
      {
        name: 'Isabel Torres',
        avatar: 'IT',
        rating: 5,
        text: 'El reloj Garmin es perfecto para mis objetivos fitness. Luxio ofrece los mejores precios y pago seguro.',
        verified: true
      },
      {
        name: 'Manuel Castro',
        avatar: 'MC',
        rating: 5,
        text: 'Calidad de producto excepcional y atención al cliente top. Mi altavoz inteligente fue fácil de instalar.',
        verified: true
      },
      {
        name: 'Carmen Sánchez',
        avatar: 'CS',
        rating: 5,
        text: 'Los auriculares inalámbricos que compré tienen una calidad de sonido increíble. ¡Luxio siempre tiene las mejores ofertas!',
        verified: true
      },
      {
        name: 'Pablo Jiménez',
        avatar: 'PJ',
        rating: 5,
        text: 'Pedí un rastreador fitness y llegó en perfecto estado. Excelente servicio al cliente cuando tuve preguntas.',
        verified: true
      },
      {
        name: 'Beatriz Moreno',
        avatar: 'BM',
        rating: 5,
        text: 'Mi compra de bicicleta eléctrica fue perfecta de principio a fin. El descuento hizo que fuera un valor increíble.',
        verified: true
      },
      {
        name: 'Javier Romero',
        avatar: 'JR',
        rating: 5,
        text: 'La tablet que compré superó mis expectativas. Envío rápido, buen precio y el producto es exactamente como se describe.',
        verified: true
      },
      {
        name: 'Sofía Navarro',
        avatar: 'SN',
        rating: 5,
        text: 'Luxio se ha convertido en mi tienda favorita para todas mis compras tech. Fiable, asequible y siempre productos auténticos.',
        verified: true
      },
      {
        name: 'Ricardo Herrera',
        avatar: 'RH',
        rating: 5,
        text: 'El paquete de hogar inteligente que compré funciona perfectamente. Instalación sencilla y el soporte fue muy útil.',
        verified: true
      },
      {
        name: 'Elena Vega',
        avatar: 'EV',
        rating: 5,
        text: 'Recibí mi nuevo smartwatch en 48 horas. ¡El empaque era excelente y el reloj es absolutamente hermoso!',
        verified: true
      },
      {
        name: 'Andrés Delgado',
        avatar: 'AD',
        rating: 5,
        text: 'La mejor experiencia de compra online que he tenido. El sitio es fácil de navegar y el pago fue rápido y seguro.',
        verified: true
      }
    ]
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
    newCollectionAvailable: 'Nova coleção disponível',
    freeShipping: 'Envio gratuito',
    yearWarranty: 'Garantia de 2 anos',
    securePayment: 'Pagamento seguro',
    saveUpTo: 'Poupe até',
    fastDelivery: 'Entrega rápida',
    hoursGuaranteed: '24-48h garantidas',
    
    // Categories
    latestSmartphones: 'Últimos smartphones',
    smartWatchesFitness: 'Relógios inteligentes e fitness',
    premiumSneakers: 'Ténis premium e moda',
    smartHomeGadgets: 'Gadgets inteligentes para casa',
    urbanMobility: 'Soluções de mobilidade urbana',
    viewAllSmartphones: 'Ver todos os smartphones',
    
    // Cart
    shoppingCart: 'Carrinho de compras',
    cartEmpty: 'O seu carrinho está vazio',
    cartEmptyDescription: 'Descubra os nossos produtos e adicione-os ao seu carrinho',
    cartTotal: 'Total do carrinho',
    removeItem: 'Remover item',
    updateQuantity: 'Atualizar quantidade',
    item: 'item',
    items: 'itens',
    qty: 'Qtd',
    
    // Checkout Form
    checkout: 'Finalizar',
    checkoutSubtitle: 'Complete o seu pedido em poucos passos',
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
    maxelPayDescription: 'Pagamento online rápido e seguro',
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
    enterTicketCode: 'Por favor, insira pelo menos um código de ticket',
    orderFailed: 'Pedido falhou. Por favor, tente novamente.',
    redirectingToMaxelPay: 'Redirecionando para MaxelPay...',
    
    // Search & Filters
    searchPlaceholder: 'Pesquisar produtos...',
    selectCountry: 'Selecionar país',
    filterResults: 'Filtrar resultados',
    searchByModel: 'Pesquisar por modelo...',
    allBrands: 'Todas as marcas',
    allCapacities: 'Todas as capacidades',
    allColors: 'Todas as cores',
    resetFilters: 'Limpar filtros',
    noProductsFound: 'Nenhum produto encontrado que corresponda aos seus filtros',
    
    // Premium Page
    premiumSmartphones: 'Smartphones Premium',
    discoverLatest: 'Descubra os últimos smartphones flagship com descontos exclusivos',
    products: 'produtos',
    upTo: 'Até',
    off: 'DE DESCONTO',
    variants: 'variantes',
    available: 'disponíveis',
    added: 'Adicionado',
    addedSuccessfully: 'foi adicionado ao carrinho',
    previous: 'Anterior',
    next: 'Seguinte',
    
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
    legalNoticeContent: 'Luxio é uma loja online especializada em produtos eletrónicos. Sede: 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Responsável pela publicação: Saári Barnabás (Luxio). Alojamento: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
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
    confirm: 'Confirmar',
    
    // Additional Payment Fields
    emailAddress: 'Endereço de email',
    
    // Testimonials
    testimonials: [
      {
        name: 'Ana Silva',
        avatar: 'AS',
        rating: 5,
        text: 'Experiência de compra fantástica! O meu iPhone 15 Pro com 20% de desconto chegou no dia seguinte. O atendimento da Luxio é excecional.',
        verified: true
      },
      {
        name: 'Pedro Santos',
        avatar: 'PS',
        rating: 5,
        text: 'O Apple Watch Ultra 2 superou todas as minhas expectativas. Excelente qualidade, entrega rápida e embalagem perfeita.',
        verified: true
      },
      {
        name: 'Maria Costa',
        avatar: 'MC',
        rating: 5,
        text: 'Os meus novos ténis Air Jordan são perfeitos! Tamanho ideal, qualidade autêntica e o preço foi imbatível.',
        verified: true
      },
      {
        name: 'João Ferreira',
        avatar: 'JF',
        rating: 5,
        text: 'Os gadgets inteligentes funcionam perfeitamente juntos. Instalação fácil e os preços da Luxio são imbatíveis.',
        verified: true
      },
      {
        name: 'Catarina Oliveira',
        avatar: 'CO',
        rating: 5,
        text: 'Trotinete elétrica chegou perfeitamente montada e pronta a usar. Excelente qualidade e processo fluido.',
        verified: true
      },
      {
        name: 'Ricardo Pereira',
        avatar: 'RP',
        rating: 5,
        text: 'Experiência fantástica com o meu Galaxy S24 Ultra. Embalagem premium e envio ultra-rápido para casa.',
        verified: true
      },
      {
        name: 'Sofia Rodrigues',
        avatar: 'SR',
        rating: 5,
        text: 'O relógio Garmin é perfeito para os meus objetivos de fitness. A Luxio oferece os melhores preços e pagamento seguro.',
        verified: true
      },
      {
        name: 'Miguel Almeida',
        avatar: 'MA',
        rating: 5,
        text: 'Qualidade de produto excecional e atendimento ao cliente top. A minha coluna inteligente foi fácil de instalar.',
        verified: true
      },
      {
        name: 'Beatriz Martins',
        avatar: 'BM',
        rating: 5,
        text: 'Os auriculares sem fios que comprei têm uma qualidade de som incrível. A Luxio tem sempre as melhores ofertas!',
        verified: true
      },
      {
        name: 'Carlos Sousa',
        avatar: 'CS',
        rating: 5,
        text: 'Encomendei um tracker fitness e chegou em perfeito estado. Excelente atendimento quando tive dúvidas.',
        verified: true
      },
      {
        name: 'Inês Gomes',
        avatar: 'IG',
        rating: 5,
        text: 'A minha compra de bicicleta elétrica foi perfeita do início ao fim. O desconto tornou-a num valor incrível.',
        verified: true
      },
      {
        name: 'Tiago Carvalho',
        avatar: 'TC',
        rating: 5,
        text: 'O tablet que comprei superou as minhas expectativas. Envio rápido, ótimo preço e o produto é exatamente como descrito.',
        verified: true
      },
      {
        name: 'Mariana Lopes',
        avatar: 'ML',
        rating: 5,
        text: 'A Luxio tornou-se a minha loja favorita para todas as compras tech. Confiável, acessível e sempre produtos autênticos.',
        verified: true
      },
      {
        name: 'Bruno Dias',
        avatar: 'BD',
        rating: 5,
        text: 'O pacote casa inteligente que comprei funciona perfeitamente. Instalação simples e o suporte foi muito útil.',
        verified: true
      },
      {
        name: 'Daniela Ribeiro',
        avatar: 'DR',
        rating: 5,
        text: 'Recebi o meu novo smartwatch em 48 horas. A embalagem era excelente e o relógio é absolutamente lindo!',
        verified: true
      },
      {
        name: 'Fábio Correia',
        avatar: 'FC',
        rating: 5,
        text: 'A melhor experiência de compra online que já tive. O site é fácil de navegar e o pagamento foi rápido e seguro.',
        verified: true
      }
    ]
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
    newCollectionAvailable: 'Nowa kolekcja dostępna',
    freeShipping: 'Darmowa dostawa',
    yearWarranty: 'Gwarancja 2 lata',
    securePayment: 'Bezpieczna płatność',
    saveUpTo: 'Oszczędź do',
    fastDelivery: 'Szybka dostawa',
    hoursGuaranteed: '24-48h gwarantowane',
    
    // Categories
    latestSmartphones: 'Najnowsze smartfony',
    smartWatchesFitness: 'Smartwatche i trackery fitness',
    premiumSneakers: 'Buty premium i moda',
    smartHomeGadgets: 'Inteligentne gadżety domowe',
    urbanMobility: 'Rozwiązania mobilności miejskiej',
    viewAllSmartphones: 'Zobacz wszystkie smartfony',
    
    // Cart
    shoppingCart: 'Koszyk',
    cartEmpty: 'Twój koszyk jest pusty',
    cartEmptyDescription: 'Odkryj nasze produkty i dodaj je do koszyka',
    cartTotal: 'Suma koszyka',
    removeItem: 'Usuń przedmiot',
    updateQuantity: 'Zaktualizuj ilość',
    item: 'przedmiot',
    items: 'przedmioty',
    qty: 'Szt',
    
    // Checkout Form
    checkout: 'Kasa',
    checkoutSubtitle: 'Dokończ swoje zamówienie w kilku krokach',
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
    maxelPayDescription: 'Szybka i bezpieczna płatność online',
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
    enterTicketCode: 'Proszę wprowadzić co najmniej jeden kod karty',
    orderFailed: 'Zamówienie nie powiodło się. Spróbuj ponownie.',
    redirectingToMaxelPay: 'Przekierowanie do MaxelPay...',
    
    // Search & Filters
    searchPlaceholder: 'Szukaj produktów...',
    selectCountry: 'Wybierz kraj',
    filterResults: 'Filtruj wyniki',
    searchByModel: 'Szukaj według modelu...',
    allBrands: 'Wszystkie marki',
    allCapacities: 'Wszystkie pojemności',
    allColors: 'Wszystkie kolory',
    resetFilters: 'Resetuj filtry',
    noProductsFound: 'Nie znaleziono produktów pasujących do filtrów',
    
    // Premium Page
    premiumSmartphones: 'Smartfony Premium',
    discoverLatest: 'Odkryj najnowsze flagowe smartfony z ekskluzywnymi zniżkami',
    products: 'produkty',
    upTo: 'Do',
    off: 'ZNIŻKI',
    variants: 'warianty',
    available: 'dostępne',
    added: 'Dodano',
    addedSuccessfully: 'został dodany do koszyka',
    previous: 'Poprzedni',
    next: 'Następny',
    
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
    legalNoticeContent: 'Luxio to sklep internetowy specjalizujący się w produktach elektronicznych. Siedziba: 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Odpowiedzialny za publikację: Saári Barnabás (Luxio). Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
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
    confirm: 'Potwierdź',
    
    // Additional Payment Fields
    emailAddress: 'Adres email',
    
    // Testimonials
    testimonials: [
      {
        name: 'Anna Kowalska',
        avatar: 'AK',
        rating: 5,
        text: 'Niesamowite doświadczenie zakupowe! Mój iPhone 15 Pro z 20% zniżką przyszedł następnego dnia. Obsługa Luxio jest wyjątkowa.',
        verified: true
      },
      {
        name: 'Piotr Nowak',
        avatar: 'PN',
        rating: 5,
        text: 'Apple Watch Ultra 2 przewyższył wszystkie moje oczekiwania. Świetna jakość, szybka dostawa i idealne opakowanie.',
        verified: true
      },
      {
        name: 'Katarzyna Wiśniewska',
        avatar: 'KW',
        rating: 5,
        text: 'Moje nowe Air Jordan są idealne! Perfekcyjny rozmiar, autentyczna jakość i cena była niezrównana.',
        verified: true
      },
      {
        name: 'Marcin Wójcik',
        avatar: 'MW',
        rating: 5,
        text: 'Inteligentne gadżety działają doskonale razem. Łatwa instalacja, a ceny w Luxio są nie do pobicia.',
        verified: true
      },
      {
        name: 'Agnieszka Kamińska',
        avatar: 'AK',
        rating: 5,
        text: 'Hulajnoga elektryczna przyszła idealnie zmontowana i gotowa do jazdy. Świetna jakość i płynny proces.',
        verified: true
      },
      {
        name: 'Tomasz Lewandowski',
        avatar: 'TL',
        rating: 5,
        text: 'Fantastyczne doświadczenie z moim Galaxy S24 Ultra. Premium opakowanie i błyskawiczna dostawa do domu.',
        verified: true
      },
      {
        name: 'Magdalena Dąbrowska',
        avatar: 'MD',
        rating: 5,
        text: 'Zegarek Garmin jest idealny do moich celów fitness. Luxio oferuje najlepsze ceny i bezpieczne płatności.',
        verified: true
      },
      {
        name: 'Łukasz Zieliński',
        avatar: 'LZ',
        rating: 5,
        text: 'Wyjątkowa jakość produktu i obsługa klienta na najwyższym poziomie. Mój inteligentny głośnik był łatwy w instalacji.',
        verified: true
      },
      {
        name: 'Joanna Szymańska',
        avatar: 'JS',
        rating: 5,
        text: 'Słuchawki bezprzewodowe mają niesamowitą jakość dźwięku. Luxio zawsze ma najlepsze oferty!',
        verified: true
      },
      {
        name: 'Krzysztof Woźniak',
        avatar: 'KW',
        rating: 5,
        text: 'Zamówiłem tracker fitness i przyszedł w idealnym stanie. Świetna obsługa gdy miałem pytania.',
        verified: true
      },
      {
        name: 'Ewa Kozłowska',
        avatar: 'EK',
        rating: 5,
        text: 'Mój zakup roweru elektrycznego był idealny od początku do końca. Zniżka zrobiła z tego niesamowitą wartość.',
        verified: true
      },
      {
        name: 'Andrzej Jankowski',
        avatar: 'AJ',
        rating: 5,
        text: 'Tablet przewyższył moje oczekiwania. Szybka dostawa, świetna cena i produkt jest dokładnie jak opisano.',
        verified: true
      },
      {
        name: 'Monika Pawlak',
        avatar: 'MP',
        rating: 5,
        text: 'Luxio stało się moim ulubionym sklepem na wszystkie zakupy tech. Niezawodny, przystępny i zawsze autentyczne produkty.',
        verified: true
      },
      {
        name: 'Grzegorz Michalski',
        avatar: 'GM',
        rating: 5,
        text: 'Pakiet smart home działa idealnie razem. Prosta instalacja i wsparcie było bardzo pomocne.',
        verified: true
      },
      {
        name: 'Aleksandra Król',
        avatar: 'AK',
        rating: 5,
        text: 'Otrzymałam nowy smartwatch w 48 godzin. Opakowanie było doskonałe i zegarek jest absolutnie piękny!',
        verified: true
      },
      {
        name: 'Robert Piotrowski',
        avatar: 'RP',
        rating: 5,
        text: 'Najlepsze doświadczenie zakupowe online. Strona jest łatwa w nawigacji a płatność była szybka i bezpieczna.',
        verified: true
      }
    ]
  },
  
  it: {
    // Navigation
    smartphones: 'Smartphone',
    watches: 'Orologi',
    sneakers: 'Sneakers',
    gadgets: 'Gadget',
    mobility: 'Mobilità',
    
    // Actions
    addToCart: 'Aggiungi al carrello',
    login: 'Accedi',
    signup: 'Registrati',
    logout: 'Esci',
    proceedToCheckout: 'Vai al checkout',
    placeOrder: 'Conferma ordine',
    continueShopping: 'Continua a comprare',
    
    // Common
    price: 'Prezzo',
    quantity: 'Quantità',
    total: 'Totale',
    subtotal: 'Subtotale',
    shipping: 'Spedizione',
    free: 'Gratis',
    discount: 'Sconto',
    
    // Hero section
    heroTitle: 'Tecnologia premium a prezzi imbattibili',
    heroSubtitle: 'Scopri gli ultimi smartphone, smartwatch, sneakers e gadget con sconti fino al 37%',
    shopNow: 'Acquista ora',
    viewDeals: 'Vedi offerte',
    newCollectionAvailable: 'Nuova collezione disponibile',
    freeShipping: 'Spedizione gratuita',
    yearWarranty: 'Garanzia 2 anni',
    securePayment: 'Pagamento sicuro',
    saveUpTo: 'Risparmia fino a',
    fastDelivery: 'Consegna rapida',
    hoursGuaranteed: '24-48h garantite',
    
    // Categories
    latestSmartphones: 'Ultimi smartphone',
    smartWatchesFitness: 'Smartwatch e fitness tracker',
    premiumSneakers: 'Sneakers premium e moda',
    smartHomeGadgets: 'Gadget per casa intelligente',
    urbanMobility: 'Soluzioni di mobilità urbana',
    viewAllSmartphones: 'Vedi tutti gli smartphone',
    
    // Cart
    shoppingCart: 'Carrello',
    cartEmpty: 'Il tuo carrello è vuoto',
    cartEmptyDescription: 'Scopri i nostri prodotti e aggiungili al carrello',
    cartTotal: 'Totale carrello',
    removeItem: 'Rimuovi articolo',
    updateQuantity: 'Aggiorna quantità',
    item: 'articolo',
    items: 'articoli',
    qty: 'Qt',
    
    // Checkout Form
    checkout: 'Checkout',
    checkoutSubtitle: 'Completa il tuo ordine in pochi passaggi',
    shippingInfo: 'Informazioni di spedizione',
    firstName: 'Nome',
    lastName: 'Cognome',
    fullNameField: 'Nome completo',
    address: 'Indirizzo',
    completeAddress: 'Indirizzo completo',
    city: 'Città',
    country: 'Paese',
    phone: 'Telefono',
    paymentMethod: 'Metodo di pagamento',
    orderSummary: 'Riepilogo ordine',
    orderNumber: 'Numero ordine',
    
    // Payment Methods
    bankTransfer: 'Bonifico bancario',
    prepaidTickets: 'Ticket prepagati',
    maxelPay: 'MaxelPay',
    maxelPayDescription: 'Pagamento online veloce e sicuro',
    selectPaymentMethod: 'Seleziona metodo di pagamento',
    bankTransferTitle: 'Bonifico bancario',
    bankTransferDescription: 'Trasferisci l\'importo sul nostro conto bancario',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Riferimento bonifico',
    transferInstructions: 'Usa il tuo numero ordine come riferimento',
    prepaidTicketsTitle: 'Ticket prepagati (Transcash & PCS)',
    prepaidTicketsDescription: 'Inviaci i tuoi codici di ticket prepagati',
    ticketCode: 'Codice ticket',
    addTicketCode: 'Aggiungi codice',
    removeTicketCode: 'Rimuovi codice',
    sendTicketCodes: 'Invia codici',
    
    // Order Confirmation
    paymentInstructions: 'Dopo aver ricevuto il pagamento, riceverai una conferma via email. Il tuo ordine sarà consegnato entro 24-48 ore.',
    orderReceived: 'Ordine ricevuto',
    emailConfirmation: 'Riceverai una conferma via email',
    deliveryTime: 'Consegna entro 24-48 ore',
    
    // Auth
    email: 'Email',
    password: 'Password',
    fullName: 'Nome completo',
    dontHaveAccount: 'Non hai un account?',
    alreadyHaveAccount: 'Hai già un account?',
    
    // Messages
    itemAddedToCart: 'Articolo aggiunto al carrello!',
    itemRemovedFromCart: 'Articolo rimosso dal carrello',
    orderPlaced: 'Ordine effettuato con successo!',
    loginRequired: 'Accedi per continuare il checkout',
    paymentSuccessful: 'Pagamento riuscito! Ordine confermato.',
    loggedOut: 'Disconnesso con successo',
    fillRequiredFields: 'Compila tutti i campi obbligatori',
    invalidEmail: 'Inserisci un indirizzo email valido',
    invalidPhone: 'Inserisci un numero di telefono valido',
    ticketCodeSent: 'Codici ticket inviati con successo',
    enterTicketCode: 'Inserisci almeno un codice ticket',
    orderFailed: 'Ordine fallito. Riprova.',
    redirectingToMaxelPay: 'Reindirizzamento a MaxelPay...',
    
    // Search & Filters
    searchPlaceholder: 'Cerca prodotti...',
    selectCountry: 'Seleziona paese',
    filterResults: 'Filtra risultati',
    searchByModel: 'Cerca per modello...',
    allBrands: 'Tutti i marchi',
    allCapacities: 'Tutte le capacità',
    allColors: 'Tutti i colori',
    resetFilters: 'Reimposta filtri',
    noProductsFound: 'Nessun prodotto trovato corrispondente ai filtri',
    
    // Premium Page
    premiumSmartphones: 'Smartphone Premium',
    discoverLatest: 'Scopri gli ultimi smartphone flagship con sconti esclusivi',
    products: 'prodotti',
    upTo: 'Fino a',
    off: 'DI SCONTO',
    variants: 'varianti',
    available: 'disponibili',
    added: 'Aggiunto',
    addedSuccessfully: 'è stato aggiunto al carrello',
    previous: 'Precedente',
    next: 'Successivo',
    
    // Stats
    happyCustomers: 'Clienti soddisfatti',
    satisfactionRate: 'Tasso di soddisfazione',
    ordersCompleted: 'Ordini completati',
    customerSupport: 'Supporto clienti',
    
    // Reviews
    whatCustomersSay: 'Cosa dicono i nostri clienti',
    realReviews: 'Recensioni vere da acquisti verificati',
    verifiedPurchase: 'Acquisto verificato',
    
    // Footer Links
    legalNotice: 'Note legali',
    privacyPolicy: 'Privacy policy',
    termsOfService: 'Termini di servizio',
    contact: 'Contatti',
    
    // Legal Pages Content
    legalNoticeTitle: 'Note legali',
    legalNoticeContent: 'Luxio è un negozio online specializzato in prodotti elettronici. Sede: 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Responsabile pubblicazione: Saári Barnabás (Luxio). Hosting: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Privacy policy',
    privacyPolicyContent: 'Raccogliamo solo i dati necessari per elaborare gli ordini (nome, indirizzo, email, telefono). Queste informazioni non vengono mai rivendute e possono essere cancellate su richiesta tramite la nostra email di contatto.',
    termsOfServiceTitle: 'Termini di servizio',
    termsOfServiceContent: 'I prezzi sono in euro IVA inclusa. Pagamenti accettati: bonifico bancario, ticket prepagati Transcash/PCS, MaxelPay. Gli ordini vengono spediti entro 24-48 ore dopo la conferma del pagamento. Qualsiasi reclamo deve essere indirizzato alla nostra email di contatto.',
    contactTitle: 'Contatti',
    contactContent: 'Per qualsiasi domanda: support@luxio-store.com',
    
    // Product Details
    productDetails: 'Dettagli prodotto',
    specifications: 'Specifiche',
    inStock: 'Disponibile',
    outOfStock: 'Esaurito',
    addedToCart: 'Aggiunto al carrello',
    
    // Status
    active: 'Attivo',
    comingSoon: 'Prossimamente',
    new: 'Nuovo',
    sale: 'Saldo',
    
    // Common Phrases
    backToHome: 'Torna alla home',
    pageNotFound: 'Pagina non trovata',
    loading: 'Caricamento...',
    error: 'Errore',
    retry: 'Riprova',
    close: 'Chiudi',
    save: 'Salva',
    cancel: 'Annulla',
    confirm: 'Conferma',
    
    // Additional Payment Fields
    emailAddress: 'Indirizzo email',
    
    // Testimonials
    testimonials: [
      {
        name: 'Giulia Rossi',
        avatar: 'GR',
        rating: 5,
        text: 'Esperienza di acquisto fantastica! Il mio iPhone 15 Pro con il 20% di sconto è arrivato il giorno dopo. Il servizio clienti di Luxio è eccezionale.',
        verified: true
      },
      {
        name: 'Marco Bianchi',
        avatar: 'MB',
        rating: 5,
        text: 'L\'Apple Watch Ultra 2 ha superato tutte le mie aspettative. Qualità eccellente, consegna veloce e imballaggio perfetto.',
        verified: true
      },
      {
        name: 'Sara Ferrari',
        avatar: 'SF',
        rating: 5,
        text: 'Le mie nuove Air Jordan sono perfette! Misura ideale, qualità autentica e il prezzo era imbattibile.',
        verified: true
      },
      {
        name: 'Andrea Romano',
        avatar: 'AR',
        rating: 5,
        text: 'I gadget smart funzionano perfettamente insieme. Installazione facile e i prezzi di Luxio sono imbattibili.',
        verified: true
      },
      {
        name: 'Elena Ricci',
        avatar: 'ER',
        rating: 5,
        text: 'Il monopattino elettrico è arrivato perfettamente assemblato e pronto all\'uso. Qualità eccellente e processo fluido.',
        verified: true
      },
      {
        name: 'Luca Marino',
        avatar: 'LM',
        rating: 5,
        text: 'Esperienza fantastica con il mio Galaxy S24 Ultra. Imballaggio premium e spedizione ultra-veloce a casa.',
        verified: true
      },
      {
        name: 'Chiara Gallo',
        avatar: 'CG',
        rating: 5,
        text: 'L\'orologio Garmin è perfetto per i miei obiettivi fitness. Luxio offre i migliori prezzi e pagamenti sicuri.',
        verified: true
      },
      {
        name: 'Matteo Conti',
        avatar: 'MC',
        rating: 5,
        text: 'Qualità del prodotto eccezionale e assistenza clienti top. Il mio speaker smart è stato facile da installare.',
        verified: true
      },
      {
        name: 'Valentina Russo',
        avatar: 'VR',
        rating: 5,
        text: 'Gli auricolari wireless che ho comprato hanno una qualità audio incredibile. Luxio ha sempre le migliori offerte!',
        verified: true
      },
      {
        name: 'Giuseppe Costa',
        avatar: 'GC',
        rating: 5,
        text: 'Ho ordinato un fitness tracker ed è arrivato in perfette condizioni. Assistenza clienti eccellente quando ho avuto domande.',
        verified: true
      },
      {
        name: 'Francesca Colombo',
        avatar: 'FC',
        rating: 5,
        text: 'Il mio acquisto di bicicletta elettrica è stato perfetto dall\'inizio alla fine. Lo sconto l\'ha resa un valore incredibile.',
        verified: true
      },
      {
        name: 'Alessandro Bruno',
        avatar: 'AB',
        rating: 5,
        text: 'Il tablet che ho comprato ha superato le mie aspettative. Spedizione veloce, ottimo prezzo e il prodotto è esattamente come descritto.',
        verified: true
      },
      {
        name: 'Martina Esposito',
        avatar: 'ME',
        rating: 5,
        text: 'Luxio è diventato il mio negozio preferito per tutti gli acquisti tech. Affidabile, conveniente e sempre prodotti autentici.',
        verified: true
      },
      {
        name: 'Federico Greco',
        avatar: 'FG',
        rating: 5,
        text: 'Il pacchetto casa intelligente che ho comprato funziona perfettamente. Installazione semplice e il supporto è stato molto utile.',
        verified: true
      },
      {
        name: 'Silvia De Luca',
        avatar: 'SDL',
        rating: 5,
        text: 'Ho ricevuto il mio nuovo smartwatch in 48 ore. L\'imballaggio era eccellente e l\'orologio è assolutamente bellissimo!',
        verified: true
      },
      {
        name: 'Davide Santoro',
        avatar: 'DS',
        rating: 5,
        text: 'La migliore esperienza di acquisto online che ho avuto. Il sito è facile da navigare e il pagamento è stato veloce e sicuro.',
        verified: true
      }
    ]
  },
  
  hu: {
    // Navigation
    smartphones: 'Okostelefonok',
    watches: 'Órák',
    sneakers: 'Cipők',
    gadgets: 'Kütyük',
    mobility: 'Mobilitás',
    
    // Actions
    addToCart: 'Kosárba',
    login: 'Bejelentkezés',
    signup: 'Regisztráció',
    logout: 'Kijelentkezés',
    proceedToCheckout: 'Fizetés',
    placeOrder: 'Rendelés leadása',
    continueShopping: 'Vásárlás folytatása',
    
    // Common
    price: 'Ár',
    quantity: 'Mennyiség',
    total: 'Összesen',
    subtotal: 'Részösszeg',
    shipping: 'Szállítás',
    free: 'Ingyenes',
    discount: 'Kedvezmény',
    
    // Hero section
    heroTitle: 'Prémium technológia verhetetlen áron',
    heroSubtitle: 'Fedezd fel a legújabb okostelefonokat, okosórákat, cipőket és kütyüket 37%-os kedvezménnyel',
    shopNow: 'Vásárlás most',
    viewDeals: 'Ajánlatok megtekintése',
    newCollectionAvailable: 'Új kollekció elérhető',
    freeShipping: 'Ingyenes szállítás',
    yearWarranty: '2 év garancia',
    securePayment: 'Biztonságos fizetés',
    saveUpTo: 'Takarítson meg',
    fastDelivery: 'Gyors szállítás',
    hoursGuaranteed: '24-48 óra garantált',
    
    // Categories
    latestSmartphones: 'Legújabb okostelefonok',
    smartWatchesFitness: 'Okosórák és fitnesz trackerek',
    premiumSneakers: 'Prémium cipők és divat',
    smartHomeGadgets: 'Okos otthon kütyük',
    urbanMobility: 'Városi mobilitási megoldások',
    viewAllSmartphones: 'Összes okostelefon megtekintése',
    
    // Cart
    shoppingCart: 'Kosár',
    cartEmpty: 'A kosár üres',
    cartEmptyDescription: 'Fedezze fel termékeinket és adja hozzá őket a kosárhoz',
    cartTotal: 'Kosár összesen',
    removeItem: 'Termék eltávolítása',
    updateQuantity: 'Mennyiség frissítése',
    item: 'termék',
    items: 'termékek',
    qty: 'Db',
    
    // Checkout Form
    checkout: 'Fizetés',
    checkoutSubtitle: 'Végezze el rendelését néhány egyszerű lépésben',
    shippingInfo: 'Szállítási információk',
    firstName: 'Keresztnév',
    lastName: 'Vezetéknév',
    fullNameField: 'Teljes név',
    address: 'Cím',
    completeAddress: 'Teljes cím',
    city: 'Város',
    country: 'Ország',
    phone: 'Telefon',
    paymentMethod: 'Fizetési mód',
    orderSummary: 'Rendelés összefoglalása',
    orderNumber: 'Rendelésszám',
    
    // Payment Methods
    bankTransfer: 'Banki átutalás',
    prepaidTickets: 'Feltöltőkártyák',
    maxelPay: 'MaxelPay',
    maxelPayDescription: 'Gyors és biztonságos online fizetés',
    selectPaymentMethod: 'Fizetési mód kiválasztása',
    bankTransferTitle: 'Banki átutalás',
    bankTransferDescription: 'Utalja át az összeget a bankszámlánkra',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Átutalás hivatkozása',
    transferInstructions: 'Használja rendelésszámát hivatkozásként',
    prepaidTicketsTitle: 'Feltöltőkártyák (Transcash & PCS)',
    prepaidTicketsDescription: 'Küldje el nekünk feltöltőkártya kódjait',
    ticketCode: 'Kártya kód',
    addTicketCode: 'Kód hozzáadása',
    removeTicketCode: 'Kód eltávolítása',
    sendTicketCodes: 'Kódok küldése',
    
    // Order Confirmation
    paymentInstructions: 'A fizetés kézhezvétele után e-mail megerősítést kap. Rendelését 24-48 órán belül kiszállítjuk.',
    orderReceived: 'Rendelés megkapva',
    emailConfirmation: 'E-mail megerősítést fog kapni',
    deliveryTime: 'Kiszállítás 24-48 órán belül',
    
    // Auth
    email: 'E-mail',
    password: 'Jelszó',
    fullName: 'Teljes név',
    dontHaveAccount: 'Nincs fiókja?',
    alreadyHaveAccount: 'Már van fiókja?',
    
    // Messages
    itemAddedToCart: 'Termék hozzáadva a kosárhoz!',
    itemRemovedFromCart: 'Termék eltávolítva a kosárból',
    orderPlaced: 'Rendelés sikeresen leadva!',
    loginRequired: 'Jelentkezzen be a folytatáshoz',
    paymentSuccessful: 'Sikeres fizetés! Rendelés megerősítve.',
    loggedOut: 'Sikeresen kijelentkezett',
    fillRequiredFields: 'Töltse ki az összes kötelező mezőt',
    invalidEmail: 'Adjon meg érvényes e-mail címet',
    invalidPhone: 'Adjon meg érvényes telefonszámot',
    ticketCodeSent: 'Kártya kódok sikeresen elküldve',
    enterTicketCode: 'Kérjük, adjon meg legalább egy kártya kódot',
    orderFailed: 'Rendelés sikertelen. Kérjük, próbálja újra.',
    redirectingToMaxelPay: 'Átirányítás MaxelPay-ra...',
    
    // Search & Filters
    searchPlaceholder: 'Termékek keresése...',
    selectCountry: 'Ország kiválasztása',
    filterResults: 'Eredmények szűrése',
    searchByModel: 'Keresés modell szerint...',
    allBrands: 'Összes márka',
    allCapacities: 'Összes kapacitás',
    allColors: 'Összes szín',
    resetFilters: 'Szűrők visszaállítása',
    noProductsFound: 'Nem található a szűrőknek megfelelő termék',
    
    // Premium Page
    premiumSmartphones: 'Prémium okostelefonok',
    discoverLatest: 'Fedezze fel a legújabb zászlóshajó okostelefonokat exkluzív kedvezményekkel',
    products: 'termékek',
    upTo: 'Akár',
    off: 'KEDVEZMÉNY',
    variants: 'változatok',
    available: 'elérhető',
    added: 'Hozzáadva',
    addedSuccessfully: 'hozzáadva a kosárhoz',
    previous: 'Előző',
    next: 'Következő',
    
    // Stats
    happyCustomers: 'Elégedett ügyfelek',
    satisfactionRate: 'Elégedettségi arány',
    ordersCompleted: 'Teljesített rendelések',
    customerSupport: 'Ügyfélszolgálat',
    
    // Reviews
    whatCustomersSay: 'Mit mondanak ügyfeleink',
    realReviews: 'Valódi értékelések ellenőrzött vásárlásoktól',
    verifiedPurchase: 'Ellenőrzött vásárlás',
    
    // Footer Links
    legalNotice: 'Jogi tájékoztató',
    privacyPolicy: 'Adatvédelmi szabályzat',
    termsOfService: 'Szolgáltatási feltételek',
    contact: 'Kapcsolat',
    
    // Legal Pages Content
    legalNoticeTitle: 'Jogi tájékoztató',
    legalNoticeContent: 'A Luxio elektronikai termékekre szakosodott online áruház. Székhely: 4349 St Jean Baptiste St Havre St Pierre, QC G0G 1P0. Kiadásért felelős: Saári Barnabás (Luxio). Tárhely: Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA.',
    privacyPolicyTitle: 'Adatvédelmi szabályzat',
    privacyPolicyContent: 'Csak a rendelések feldolgozásához szükséges adatokat gyűjtjük (név, cím, e-mail, telefon). Ezeket az információkat soha nem adjuk el, és kérésre törölhetők kapcsolati e-mailünkön keresztül.',
    termsOfServiceTitle: 'Szolgáltatási feltételek',
    termsOfServiceContent: 'Az árak euróban vannak ÁFA-val. Elfogadott fizetések: banki átutalás, Transcash/PCS feltöltőkártyák, MaxelPay. A rendeléseket 24-48 órán belül szállítjuk ki a fizetés megerősítése után. Minden panaszt a kapcsolati e-mailünkre kell címezni.',
    contactTitle: 'Kapcsolat',
    contactContent: 'Bármilyen kérdés esetén: support@luxio-store.com',
    
    // Product Details
    productDetails: 'Termék részletek',
    specifications: 'Specifikációk',
    inStock: 'Raktáron',
    outOfStock: 'Elfogyott',
    addedToCart: 'Kosárba helyezve',
    
    // Status
    active: 'Aktív',
    comingSoon: 'Hamarosan',
    new: 'Új',
    sale: 'Akció',
    
    // Common Phrases
    backToHome: 'Vissza a főoldalra',
    pageNotFound: 'Az oldal nem található',
    loading: 'Betöltés...',
    error: 'Hiba',
    retry: 'Újra',
    close: 'Bezárás',
    save: 'Mentés',
    cancel: 'Mégse',
    confirm: 'Megerősítés',
    
    // Additional Payment Fields
    emailAddress: 'E-mail cím',
    
    // Testimonials
    testimonials: [
      {
        name: 'Kovács Anna',
        avatar: 'KA',
        rating: 5,
        text: 'Fantasztikus vásárlási élmény! Az iPhone 15 Pro 20% kedvezménnyel másnap megérkezett. A Luxio ügyfélszolgálata kivételes.',
        verified: true
      },
      {
        name: 'Nagy Péter',
        avatar: 'NP',
        rating: 5,
        text: 'Az Apple Watch Ultra 2 felülmúlta minden várakozásomat. Kiváló minőség, gyors szállítás és tökéletes csomagolás.',
        verified: true
      },
      {
        name: 'Szabó Éva',
        avatar: 'SÉ',
        rating: 5,
        text: 'Az új Air Jordan cipőim tökéletesek! Ideális méret, hiteles minőség és az ár verhetetlen volt.',
        verified: true
      },
      {
        name: 'Tóth Gábor',
        avatar: 'TG',
        rating: 5,
        text: 'Az okos kütyük tökéletesen működnek együtt. Könnyű telepítés és a Luxio árai verhetetlenek.',
        verified: true
      },
      {
        name: 'Horváth Mária',
        avatar: 'HM',
        rating: 5,
        text: 'Az elektromos roller tökéletesen összeszerelve érkezett és használatra kész. Kiváló minőség és zökkenőmentes folyamat.',
        verified: true
      },
      {
        name: 'Varga László',
        avatar: 'VL',
        rating: 5,
        text: 'Fantasztikus élmény a Galaxy S24 Ultra-val. Prémium csomagolás és villámgyors szállítás hazáig.',
        verified: true
      },
      {
        name: 'Kiss Judit',
        avatar: 'KJ',
        rating: 5,
        text: 'A Garmin óra tökéletes a fitness céljaim eléréséhez. A Luxio a legjobb árakat kínálja és biztonságos fizetést.',
        verified: true
      },
      {
        name: 'Molnár Zoltán',
        avatar: 'MZ',
        rating: 5,
        text: 'Kivételes termékminőség és kiváló ügyfélszolgálat. Az okos hangszóróm könnyen telepíthető volt.',
        verified: true
      },
      {
        name: 'Balogh Éva',
        avatar: 'BÉ',
        rating: 5,
        text: 'A vezeték nélküli fülhallgatóm hihetetlen hangminőséggel rendelkezik. A Luxio mindig a legjobb ajánlatokat kínálja!',
        verified: true
      },
      {
        name: 'Farkas István',
        avatar: 'FI',
        rating: 5,
        text: 'Rendeltem egy fitness trackert és tökéletes állapotban érkezett. Kiváló ügyfélszolgálat amikor kérdéseim voltak.',
        verified: true
      },
      {
        name: 'Lakatos Katalin',
        avatar: 'LK',
        rating: 5,
        text: 'Az elektromos kerékpárom vásárlása tökéletes volt elejétől a végéig. A kedvezmény hihetetlen értéket jelentett.',
        verified: true
      },
      {
        name: 'Simon András',
        avatar: 'SA',
        rating: 5,
        text: 'A tablet amit vettem felülmúlta a várakozásaimat. Gyors szállítás, remek ár és a termék pontosan olyan mint leírva.',
        verified: true
      },
      {
        name: 'Takács Orsolya',
        avatar: 'TO',
        rating: 5,
        text: 'A Luxio lett a kedvenc boltom minden tech vásárláshoz. Megbízható, megfizethető és mindig hiteles termékek.',
        verified: true
      },
      {
        name: 'Németh Gábor',
        avatar: 'NG',
        rating: 5,
        text: 'Az okos otthon csomag amit vettem tökéletesen működik együtt. Egyszerű telepítés és a támogatás nagyon hasznos volt.',
        verified: true
      },
      {
        name: 'Papp Renáta',
        avatar: 'PR',
        rating: 5,
        text: 'Megkaptam az új okosórám 48 órán belül. A csomagolás kiváló volt és az óra abszolút gyönyörű!',
        verified: true
      },
      {
        name: 'Szilágyi Tamás',
        avatar: 'ST',
        rating: 5,
        text: 'A legjobb online vásárlási élményem. A weboldal könnyen navigálható és a fizetés gyors és biztonságos volt.',
        verified: true
      }
    ]
  }
};

export function detectLanguage(): Language {
  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as Language;
  if (langParam && ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'].includes(langParam)) {
    return langParam;
  }

  // Check localStorage
  const storedLang = localStorage.getItem('luxio-language') as Language;
  if (storedLang && ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'].includes(storedLang)) {
    return storedLang;
  }

  // Check browser language
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('pl')) return 'pl';
  if (browserLang.startsWith('it')) return 'it';
  if (browserLang.startsWith('hu')) return 'hu';

  // Default to English
  return 'en';
}