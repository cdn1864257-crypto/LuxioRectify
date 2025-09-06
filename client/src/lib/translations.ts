export type Language = 'en' | 'fr' | 'pl' | 'es' | 'pt' | 'it' | 'hu';

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
  
  // Checkout
  checkout: string;
  shippingInfo: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  paymentMethod: string;
  orderSummary: string;
  
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
    
    // Checkout
    checkout: 'Checkout',
    shippingInfo: 'Shipping Information',
    firstName: 'First Name',
    lastName: 'Last Name',
    address: 'Address',
    city: 'City',
    country: 'Country',
    phone: 'Phone Number',
    paymentMethod: 'Payment Method',
    orderSummary: 'Order Summary',
    
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
    loggedOut: 'Logged out successfully'
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
    
    // Checkout
    checkout: 'Commande',
    shippingInfo: 'Informations de livraison',
    firstName: 'Prénom',
    lastName: 'Nom',
    address: 'Adresse',
    city: 'Ville',
    country: 'Pays',
    phone: 'Téléphone',
    paymentMethod: 'Mode de paiement',
    orderSummary: 'Résumé de commande',
    
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
    loggedOut: 'Déconnexion réussie'
  },
  
  pl: {
    smartphones: 'Smartfony',
    watches: 'Zegarki',
    sneakers: 'Buty',
    gadgets: 'Gadżety',
    mobility: 'Mobilność',
    addToCart: 'Dodaj do koszyka',
    login: 'Zaloguj się',
    signup: 'Zarejestruj się',
    logout: 'Wyloguj',
    proceedToCheckout: 'Przejdź do kasy',
    placeOrder: 'Złóż zamówienie',
    continueShopping: 'Kontynuuj zakupy',
    price: 'Cena',
    quantity: 'Ilość',
    total: 'Łącznie',
    subtotal: 'Suma częściowa',
    shipping: 'Dostawa',
    free: 'Darmowa',
    discount: 'Zniżka',
    heroTitle: 'Technologia premium w niezbijanej cenie',
    heroSubtitle: 'Odkryj najnowsze smartfony, smartwatche, buty i gadżety ze zniżkami do 37%',
    shopNow: 'Kup teraz',
    viewDeals: 'Zobacz oferty',
    latestSmartphones: 'Najnowsze smartfony',
    smartWatchesFitness: 'Smartwatche i trackery fitness',
    premiumSneakers: 'Buty premium i moda',
    smartHomeGadgets: 'Inteligentne gadżety domowe',
    urbanMobility: 'Rozwiązania mobilności miejskiej',
    shoppingCart: 'Koszyk',
    cartEmpty: 'Twój koszyk jest pusty',
    cartTotal: 'Suma koszyka',
    checkout: 'Kasa',
    shippingInfo: 'Informacje o dostawie',
    firstName: 'Imię',
    lastName: 'Nazwisko',
    address: 'Adres',
    city: 'Miasto',
    country: 'Kraj',
    phone: 'Telefon',
    paymentMethod: 'Metoda płatności',
    orderSummary: 'Podsumowanie zamówienia',
    email: 'Email',
    password: 'Hasło',
    fullName: 'Pełne imię',
    dontHaveAccount: 'Nie masz konta?',
    alreadyHaveAccount: 'Masz już konto?',
    itemAddedToCart: 'Dodano do koszyka!',
    itemRemovedFromCart: 'Usunięto z koszyka',
    orderPlaced: 'Zamówienie złożone pomyślnie!',
    loginRequired: 'Zaloguj się, aby kontynuować',
    paymentSuccessful: 'Płatność udana! Zamówienie potwierdzone.',
    loggedOut: 'Wylogowano pomyślnie'
  },
  
  es: {
    smartphones: 'Smartphones',
    watches: 'Relojes',
    sneakers: 'Zapatillas',
    gadgets: 'Gadgets',
    mobility: 'Movilidad',
    addToCart: 'Añadir al carrito',
    login: 'Iniciar sesión',
    signup: 'Registrarse',
    logout: 'Cerrar sesión',
    proceedToCheckout: 'Proceder al pago',
    placeOrder: 'Realizar pedido',
    continueShopping: 'Seguir comprando',
    price: 'Precio',
    quantity: 'Cantidad',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    free: 'Gratis',
    discount: 'Descuento',
    heroTitle: 'Tecnología premium a precios inmejorables',
    heroSubtitle: 'Descubre los últimos smartphones, smartwatches, zapatillas y gadgets con descuentos de hasta 37%',
    shopNow: 'Comprar ahora',
    viewDeals: 'Ver ofertas',
    latestSmartphones: 'Últimos smartphones',
    smartWatchesFitness: 'Relojes inteligentes y fitness',
    premiumSneakers: 'Zapatillas premium y moda',
    smartHomeGadgets: 'Gadgets inteligentes para el hogar',
    urbanMobility: 'Soluciones de movilidad urbana',
    shoppingCart: 'Carrito de compras',
    cartEmpty: 'Tu carrito está vacío',
    cartTotal: 'Total del carrito',
    checkout: 'Pagar',
    shippingInfo: 'Información de envío',
    firstName: 'Nombre',
    lastName: 'Apellido',
    address: 'Dirección',
    city: 'Ciudad',
    country: 'País',
    phone: 'Teléfono',
    paymentMethod: 'Método de pago',
    orderSummary: 'Resumen del pedido',
    email: 'Email',
    password: 'Contraseña',
    fullName: 'Nombre completo',
    dontHaveAccount: '¿No tienes cuenta?',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    itemAddedToCart: '¡Producto añadido al carrito!',
    itemRemovedFromCart: 'Producto eliminado del carrito',
    orderPlaced: '¡Pedido realizado con éxito!',
    loginRequired: 'Inicia sesión para continuar',
    paymentSuccessful: '¡Pago exitoso! Pedido confirmado.',
    loggedOut: 'Sesión cerrada correctamente'
  },
  
  pt: {
    smartphones: 'Smartphones',
    watches: 'Relógios',
    sneakers: 'Ténis',
    gadgets: 'Gadgets',
    mobility: 'Mobilidade',
    addToCart: 'Adicionar ao carrinho',
    login: 'Entrar',
    signup: 'Registar',
    logout: 'Sair',
    proceedToCheckout: 'Finalizar compra',
    placeOrder: 'Fazer pedido',
    continueShopping: 'Continuar comprando',
    price: 'Preço',
    quantity: 'Quantidade',
    total: 'Total',
    subtotal: 'Subtotal',
    shipping: 'Envio',
    free: 'Grátis',
    discount: 'Desconto',
    heroTitle: 'Tecnologia premium a preços imbatíveis',
    heroSubtitle: 'Descubra os mais recentes smartphones, smartwatches, ténis e gadgets com descontos até 37%',
    shopNow: 'Comprar agora',
    viewDeals: 'Ver ofertas',
    latestSmartphones: 'Últimos smartphones',
    smartWatchesFitness: 'Relógios inteligentes e fitness',
    premiumSneakers: 'Ténis premium e moda',
    smartHomeGadgets: 'Gadgets inteligentes para casa',
    urbanMobility: 'Soluções de mobilidade urbana',
    shoppingCart: 'Carrinho de compras',
    cartEmpty: 'O seu carrinho está vazio',
    cartTotal: 'Total do carrinho',
    checkout: 'Finalizar',
    shippingInfo: 'Informações de envio',
    firstName: 'Nome',
    lastName: 'Apelido',
    address: 'Morada',
    city: 'Cidade',
    country: 'País',
    phone: 'Telefone',
    paymentMethod: 'Método de pagamento',
    orderSummary: 'Resumo do pedido',
    email: 'Email',
    password: 'Palavra-passe',
    fullName: 'Nome completo',
    dontHaveAccount: 'Não tem conta?',
    alreadyHaveAccount: 'Já tem conta?',
    itemAddedToCart: 'Item adicionado ao carrinho!',
    itemRemovedFromCart: 'Item removido do carrinho',
    orderPlaced: 'Pedido realizado com sucesso!',
    loginRequired: 'Entre para continuar a compra',
    paymentSuccessful: 'Pagamento bem-sucedido! Pedido confirmado.',
    loggedOut: 'Sessão terminada com sucesso'
  },
  
  it: {
    smartphones: 'Smartphone',
    watches: 'Orologi',
    sneakers: 'Sneaker',
    gadgets: 'Gadget',
    mobility: 'Mobilità',
    addToCart: 'Aggiungi al carrello',
    login: 'Accedi',
    signup: 'Registrati',
    logout: 'Esci',
    proceedToCheckout: 'Procedi al checkout',
    placeOrder: 'Effettua ordine',
    continueShopping: 'Continua shopping',
    price: 'Prezzo',
    quantity: 'Quantità',
    total: 'Totale',
    subtotal: 'Subtotale',
    shipping: 'Spedizione',
    free: 'Gratuita',
    discount: 'Sconto',
    heroTitle: 'Tecnologia premium a prezzi imbattibili',
    heroSubtitle: 'Scopri gli ultimi smartphone, smartwatch, sneaker e gadget con sconti fino al 37%',
    shopNow: 'Acquista ora',
    viewDeals: 'Vedi offerte',
    latestSmartphones: 'Ultimi smartphone',
    smartWatchesFitness: 'Smartwatch e fitness tracker',
    premiumSneakers: 'Sneaker premium e moda',
    smartHomeGadgets: 'Gadget intelligenti per la casa',
    urbanMobility: 'Soluzioni di mobilità urbana',
    shoppingCart: 'Carrello',
    cartEmpty: 'Il tuo carrello è vuoto',
    cartTotal: 'Totale carrello',
    checkout: 'Checkout',
    shippingInfo: 'Informazioni spedizione',
    firstName: 'Nome',
    lastName: 'Cognome',
    address: 'Indirizzo',
    city: 'Città',
    country: 'Paese',
    phone: 'Telefono',
    paymentMethod: 'Metodo di pagamento',
    orderSummary: 'Riepilogo ordine',
    email: 'Email',
    password: 'Password',
    fullName: 'Nome completo',
    dontHaveAccount: 'Non hai un account?',
    alreadyHaveAccount: 'Hai già un account?',
    itemAddedToCart: 'Articolo aggiunto al carrello!',
    itemRemovedFromCart: 'Articolo rimosso dal carrello',
    orderPlaced: 'Ordine effettuato con successo!',
    loginRequired: 'Accedi per continuare il checkout',
    paymentSuccessful: 'Pagamento riuscito! Ordine confermato.',
    loggedOut: 'Disconnesso con successo'
  },
  
  hu: {
    smartphones: 'Okostelefonok',
    watches: 'Órák',
    sneakers: 'Tornacipők',
    gadgets: 'Kütyük',
    mobility: 'Mobilitás',
    addToCart: 'Kosárba',
    login: 'Bejelentkezés',
    signup: 'Regisztráció',
    logout: 'Kijelentkezés',
    proceedToCheckout: 'Tovább a fizetéshez',
    placeOrder: 'Rendelés leadása',
    continueShopping: 'Vásárlás folytatása',
    price: 'Ár',
    quantity: 'Mennyiség',
    total: 'Összesen',
    subtotal: 'Részösszeg',
    shipping: 'Szállítás',
    free: 'Ingyenes',
    discount: 'Kedvezmény',
    heroTitle: 'Prémium technológia verhetetlen áron',
    heroSubtitle: 'Fedezd fel a legújabb okostelefonokat, okosórákat, tornacipőket és kütyüket akár 37% kedvezménnyel',
    shopNow: 'Vásárlás most',
    viewDeals: 'Ajánlatok megtekintése',
    latestSmartphones: 'Legújabb okostelefonok',
    smartWatchesFitness: 'Okosórák és fitness trackerek',
    premiumSneakers: 'Prémium tornacipők és divat',
    smartHomeGadgets: 'Okos otthon kütyük',
    urbanMobility: 'Városi mobilitási megoldások',
    shoppingCart: 'Bevásárlókosár',
    cartEmpty: 'A kosár üres',
    cartTotal: 'Kosár összege',
    checkout: 'Fizetés',
    shippingInfo: 'Szállítási információk',
    firstName: 'Keresztnév',
    lastName: 'Vezetéknév',
    address: 'Cím',
    city: 'Város',
    country: 'Ország',
    phone: 'Telefon',
    paymentMethod: 'Fizetési mód',
    orderSummary: 'Rendelés összesítő',
    email: 'Email',
    password: 'Jelszó',
    fullName: 'Teljes név',
    dontHaveAccount: 'Nincs még fiókod?',
    alreadyHaveAccount: 'Van már fiókod?',
    itemAddedToCart: 'Termék hozzáadva a kosárhoz!',
    itemRemovedFromCart: 'Termék eltávolítva a kosárból',
    orderPlaced: 'Rendelés sikeresen leadva!',
    loginRequired: 'Jelentkezz be a folytatáshoz',
    paymentSuccessful: 'Sikeres fizetés! Rendelés megerősítve.',
    loggedOut: 'Sikeresen kijelentkezett'
  }
};

export const detectLanguage = (): Language => {
  // Try to detect from URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  const urlLang = urlParams.get('lang') as Language;
  if (urlLang && translations[urlLang]) {
    return urlLang;
  }
  
  // Try to detect from localStorage
  const storedLang = localStorage.getItem('luxio-language') as Language;
  if (storedLang && translations[storedLang]) {
    return storedLang;
  }
  
  // Try to detect from browser language
  const browserLang = navigator.language.split('-')[0] as Language;
  if (browserLang && translations[browserLang]) {
    return browserLang;
  }
  
  // Default to English
  return 'en';
};
