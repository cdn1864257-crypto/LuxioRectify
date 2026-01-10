export type Language = 'en' | 'fr' | 'es' | 'pt' | 'pl' | 'it' | 'hu';

export interface Translations {
  // Navigation
  navigation: string;
  accessSections: string;
  home: string;
  dashboard: string;
  cart: string;
  premium: string;
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
  or: string;
  
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
  smartphonesSubtitle: string;
  watchesSubtitle: string;
  sneakersSubtitle: string;
  gadgetsSubtitle: string;
  mobilitySubtitle: string;
  loadingProducts: string;
  
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
  oxaPay: string;
  oxaPayDescription: string;
  oxaPayInstructions: string;
  selectPaymentMethod: string;
  bankTransferTitle: string;
  bankTransferDescription: string;
  ibanLabel: string;
  bicLabel: string;
  transferReference: string;
  transferInstructions: string;
  paymentDeposit: string;
  useReferenceInstruction: string;
  prepaidTicketsTitle: string;
  prepaidTicketsDescription: string;
  ticketCode: string;
  addTicketCode: string;
  removeTicketCode: string;
  sendTicketCodes: string;
  dataProtection: string;
  verifiedPayment: string;
  stripe: string;
  stripeDescription: string;
  cardPayment: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  cardholderName: string;
  paymentProcessing: string;
  
  // Alternative Payment Methods
  mainPaymentMethod: string;
  alternativePaymentMethods: string;
  paypal: string;
  westernUnion: string;
  moneyGram: string;
  ria: string;
  alternativePaymentMessage: string;
  recommendedMethod: string;
  alternativePaymentInstructionsTitle: string;
  alternativePaymentInstructions: string;
  clickToViewAlternativeMethods: string;
  understood: string;
  alternativePaymentEmailSubject: string;
  emailBodyIntro: string;
  orderDetails: string;
  customerName: string;
  emailBodyClosing: string;
  regards: string;
  
  // Payment Notifications
  paymentSuccessTitle: string;
  paymentSuccessDescription: string;
  orderConfirmed: string;
  paymentCancelledTitle: string;
  paymentCancelledDescription: string;
  paymentPendingTitle: string;
  paymentPendingDescription: string;
  paymentErrorDescription: string;
  redirectingToCryptoPayment: string;
  redirectingToOxaPayDescription: string;
  
  // Payment Modal
  paymentModalTitle: string;
  paymentModalBankTransferTitle: string;
  paymentModalBankInstructions: string;
  paymentModalOtherMethodsTitle: string;
  paymentModalOtherMethodsMessage: string;
  paymentModalContactEmail: string;
  viewPaymentInstructions: string;
  
  // Order Confirmation
  paymentInstructions: string;
  orderReceived: string;
  emailConfirmation: string;
  deliveryTime: string;
  
  // Auth
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
  dontHaveAccount: string;
  alreadyHaveAccount: string;
  loggingIn: string;
  signingUp: string;
  loginSuccess: string;
  signupSuccess: string;
  loginError: string;
  signupError: string;
  welcomeBack: string;
  back: string;
  welcome: string;
  emailRequired: string;
  passwordRequired: string;
  emailInvalid: string;
  passwordMinLength: string;
  passwordsDontMatch: string;
  confirmPasswordRequired: string;
  firstNameRequired: string;
  lastNameRequired: string;
  countryRequired: string;
  cityRequired: string;
  addressRequired: string;
  phoneRequired: string;
  validationError: string;
  fixErrors: string;
  emailPlaceholder: string;
  firstNamePlaceholder: string;
  lastNamePlaceholder: string;
  countryPlaceholder: string;
  cityPlaceholder: string;
  addressPlaceholder: string;
  phonePlaceholder: string;
  forgotPassword: string;
  forgotPasswordTitle: string;
  forgotPasswordDescription: string;
  sendResetLink: string;
  sending: string;
  backToLogin: string;
  emailSent: string;
  resetLinkSentDescription: string;
  checkYourEmail: string;
  resetEmailSentMessage: string;
  resetLinkExpiry: string;
  emailSendError: string;
  errorOccurred: string;
  weak: string;
  medium: string;
  strong: string;
  passwordMinLength8: string;
  passwordHasLetters: string;
  passwordHasNumbers: string;
  passwordHasAtSymbol: string;
  passwordRequirements: string;
  passwordTooWeak: string;
  invalidCredentials: string;
  
  // Reset Password Page
  invalidResetLink: string;
  resetLinkInvalidOrExpired: string;
  passwordResetSuccess: string;
  passwordResetSuccessMessage: string;
  redirectingToHome: string;
  enterNewPasswordBelow: string;
  fillAllFieldsError: string;
  resettingPassword: string;
  resetPasswordButton: string;
  
  // Product Page
  productNotFound: string;
  backToProducts: string;
  addedToWishlist: string;
  removedFromWishlist: string;
  linkCopied: string;
  warranty2Years: string;
  returns30Days: string;
  
  // Messages
  itemAddedToCart: string;
  itemRemovedFromCart: string;
  orderPlaced: string;
  loginRequired: string;
  paymentSuccessful: string;
  loggedOut: string;
  fillRequiredFields: string;
  pleaseCompleteThisField: string;
  invalidEmail: string;
  invalidPhone: string;
  invalidCountry: string;
  invalidCity: string;
  invalidAddress: string;
  addressMismatch: string;
  addressNotInSelectedCity: string;
  addressNotInSelectedCountry: string;
  pleaseSelectValidAddress: string;
  pleaseSelectAddressFromSuggestions: string;
  selectAddressFromSuggestions: string;
  selectCountryAndCity: string;
  addressNotListedConfirm: string;
  confirmAddressNotListed: string;
  addressNotListedWarning: string;
  ticketCodeSent: string;
  enterTicketCode: string;
  orderFailed: string;
  paymentInitFailed: string;
  stripeUnavailable: string;
  stripeUnavailableMessage: string;
  
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
  description: string;
  specifications: string;
  capacity: string;
  color: string;
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
  
  // Payment Page
  backToCart: string;
  securedPayment: string;
  choosePaymentMethod: string;
  allTransactionsSecured: string;
  ticketsPCS: string;
  immediate: string;
  ticketPaymentInstructions: string;
  ticketInstructionsTitle: string;
  ticketInstructionSelectType: string;
  ticketInstructionCode: string;
  ticketInstructionAmount: string;
  ticketInstructionMulti: string;
  ticketInstructionValidation: string;
  dontHaveTickets: string;
  buyTickets: string;
  ticket: string;
  addTicket: string;
  ticketsTotal: string;
  requiredAmount: string;
  insufficientAmount: string;
  amountValidated: string;
  ticketCodePlaceholder: string;
  ticketAmountPlaceholder: string;
  days23: string;
  bankTransferInstructionsTitle: string;
  bankTransferInstruction1: string;
  bankTransferInstruction2: string;
  bankTransferInstruction3: string;
  bankTransferInstruction4: string;
  bankTransferInstruction5: string;
  beneficiary: string;
  referenceRequired: string;
  amount: string;
  copyBankDetails: string;
  copied: string;
  recommended: string;
  payment100Secure: string;
  paymentInfoEncrypted: string;
  neverStoreCardData: string;
  shippingAddress: string;
  editAddress: string;
  saveAddress: string;
  orderItems: string;
  vat: string;
  totalWithVat: string;
  payNow: string;
  orderSent: string;
  orderConfirmationEmail: string;
  orderRegistered: string;
  completeTransferWithReference: string;
  missingAmount: string;
  oxaPayInstructionsTitle: string;
  oxaPayInstruction1: string;
  oxaPayInstruction2: string;
  oxaPayInstruction3: string;
  oxaPayInstruction4: string;
  oxaPayInstruction5: string;
  oxaPayRecommendation: string;
  
  // Bank Transfer Modal
  verifyTransferDetails: string;
  amountToTransfer: string;
  instructionsLabel: string;
  transferInstruction1Short: string;
  transferInstruction2Short: string;
  immediateTransfer: string;
  delivery24h: string;
  standardTransfer: string;
  delivery4872h: string;
  noCancel: string;
  yesProceedTransfer: string;
  name: string;
  reference: string;
  importantReferenceNote: string;
  viewMyOrders: string;
  processing: string;
  orderReference: string;
  paymentInitError: string;
  
  // Dashboard
  hello: string;
  welcomePersonalSpace: string;
  totalOrders: string;
  noOrdersYet: string;
  inProgress: string;
  ordersProcessing: string;
  delivered: string;
  ordersReceived: string;
  totalSpent: string;
  totalAmount: string;
  orderHistory: string;
  latestOrdersStatus: string;
  noOrders: string;
  noOrdersDescription: string;
  personalInfo: string;
  luxioMember: string;
  accountDetails: string;
  accountCreated: string;
  viewProfile: string;
  actionsRequired: string;
  awaitingPayment: string;
  paymentReview: string;
  processingOrder: string;
  fulfilled: string;
  completeBankTransfer: string;
  submitPCSCodes: string;
  openOxaPay: string;
  viewInstructions: string;
  payWithin24h: string;
  unpaidOrders: string;
  paymentPending: string;
  completePayment: string;
  noActionsRequired: string;
  allOrdersPaid: string;
  createdDaysAgo: string;
  createdHoursAgo: string;
  createdMinutesAgo: string;
  timeRemainingMinutes: string;
  timeRemainingHoursMinutes: string;
  expiring: string;
  timeRemaining: string;
  reserveStock: string;
  
  // Order Actions
  cancelOrder: string;
  cancelOrderWarning: string;
  orderCancelledSuccess: string;
  paymentInstructionsTitle: string;
  bankTransferInstructionsMessage: string;
  ticketPaymentMessage: string;
  oxapayConfirmationMessage: string;
  contactSupportEmail: string;
  confirmCancellation: string;
  cancelAction: string;
  bankDetails: string;
  paymentReference: string;
  uniqueOrderNumber: string;
  deliveryInfoMessage: string;
  deliveryInfoStandard: string;
  
  // User Profile
  myAccount: string;
  profile: string;
  myOrders: string;
  settings: string;
  accountSettings: string;
  security: string;
  changePassword: string;
  passwordResetDescription: string;
  notifications: string;
  orderNotifications: string;
  priceAlerts: string;
  promotionalNewsletter: string;
  fullNameLabel: string;
  accountStats: string;
  totalOrdersCount: string;
  totalSpentAmount: string;
  orderHistoryTitle: string;
  noOrdersYetMessage: string;
  orderLabel: string;
  paidStatus: string;
  pendingStatus: string;
  user: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
  passwordChangeSuccess: string;
  passwordChangeFailed: string;
  
  // Password Visibility & Checkout
  showPassword: string;
  hidePassword: string;
  loginRequiredToCheckout: string;
  pleaseLoginOrSignupToCheckout: string;
  goToLogin: string;
  
  // Testimonials
  testimonials: Array<{
    name: string;
    avatar: string;
    rating: number;
    text: string;
    verified: boolean;
  }>;
  
  // Checkout Address
  deliveryAddress: string;
  checkoutAddressTitle: string;
  checkoutAddressSubtitle: string;
  useRegisteredAddress: string;
  continueToPayment: string;
  addressSaved: string;
  postalCode: string;
  enterNewAddress: string;
  
  // SEO Meta Tags
  seoHomeTitle: string;
  seoHomeDescription: string;
  seoHomeKeywords: string;
  seoPremiumTitle: string;
  seoPremiumDescription: string;
  seoPremiumKeywords: string;
  seoDashboardTitle: string;
  seoDashboardDescription: string;
  seoCartTitle: string;
  seoCartDescription: string;
  seoPaymentTitle: string;
  seoPaymentDescription: string;
  seoCheckoutAddressTitle: string;
  seoCheckoutAddressDescription: string;
  seoOgSiteName: string;
  seoImageAltLogo: string;
  seoImageAltProduct: string;
  seoImageAltSmartphone: string;
  seoImageAltWatch: string;
  seoImageAltSneaker: string;
  seoImageAltGadget: string;
  
  // Coupons
  couponCode: string;
  applyCoupon: string;
  enterCouponCode: string;
  couponApplied: string;
  couponInvalid: string;
  couponExpired: string;
  couponAlreadyUsed: string;
  removeCoupon: string;
  myCoupons: string;
  noCoupons: string;
  noCouponsDescription: string;
  couponDiscount: string;
  couponExpires: string;
  couponValid: string;
  couponUsed: string;
  copyCode: string;
  codeCopied: string;
  validatingCoupon: string;
  cryptoIncentive: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Navigation
    navigation: 'Navigation',
    accessSections: 'Access different sections of the site',
    home: 'Home',
    dashboard: 'Dashboard',
    cart: 'Cart',
    premium: 'Premium',
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
    or: 'or',
    
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
    smartphonesSubtitle: 'Premium devices with up to 22% off',
    watchesSubtitle: 'Track your health with discounts up to 37%',
    sneakersSubtitle: 'Step up your style with 17% off + free shipping',
    gadgetsSubtitle: 'Upgrade your home with 13% off + free delivery',
    mobilitySubtitle: 'Electric scooters & bikes with 13% off + free shipping',
    loadingProducts: 'Loading products...',
    
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
    oxaPay: 'Crypto Payment via OxaPay',
    oxaPayDescription: 'Secure payment with cryptocurrency (Bitcoin, USDT, Ethereum, etc.)',
    oxaPayInstructions: 'Follow the steps below to complete your crypto payment via OxaPay.',
    selectPaymentMethod: 'Select Payment Method',
    bankTransferTitle: 'Bank Transfer',
    bankTransferDescription: 'Transfer the amount to our bank account',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Transfer Reference',
    transferInstructions: 'Use your order number as transfer reference',
    paymentDeposit: 'Deposit',
    useReferenceInstruction: 'Use this reference as the payment reason:',
    prepaidTicketsTitle: 'Prepaid Tickets (Transcash & PCS)',
    prepaidTicketsDescription: 'Send us your prepaid ticket codes',
    ticketCode: 'Ticket Code',
    addTicketCode: 'Add Ticket Code',
    removeTicketCode: 'Remove Code',
    sendTicketCodes: 'Send Ticket Codes',
    dataProtection: 'Data Protection',
    verifiedPayment: 'Verified Payment',
    stripe: 'Stripe',
    stripeDescription: 'Secure credit card payment',
    cardPayment: 'Card Payment',
    cardNumber: 'Card number',
    expiryDate: 'Expiry date',
    cvc: 'CVC',
    cardholderName: 'Cardholder name',
    paymentProcessing: 'Processing payment...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Main Payment Method',
    alternativePaymentMethods: 'Alternative Payment Methods',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'To use this payment method, please contact our customer service at: Contact@luxiomarket.shop. We will respond promptly.',
    recommendedMethod: 'Recommended Method',
    alternativePaymentInstructionsTitle: 'How to Proceed?',
    alternativePaymentInstructions: 'Click on your preferred payment method above. This will open your email application with a pre-filled message. Send this message to our service to finalize your order. Our team will respond as soon as possible with detailed payment instructions.',
    clickToViewAlternativeMethods: 'Click to view other available payment methods',
    understood: 'Understood',
    alternativePaymentEmailSubject: 'Payment via {method} - Order {amount}€',
    emailBodyIntro: 'I would like to finalize my order with the following payment method',
    orderDetails: 'Order Details',
    customerName: 'Full Name',
    emailBodyClosing: 'Thank you for providing payment instructions to finalize this order.',
    regards: 'Best regards',
    
    // Payment Notifications
    paymentSuccessTitle: 'Payment successful!',
    paymentSuccessDescription: 'Your order has been confirmed',
    orderConfirmed: 'Order confirmed',
    paymentCancelledTitle: 'Payment cancelled',
    paymentCancelledDescription: 'Payment was cancelled. Your cart is still available.',
    paymentPendingTitle: 'Payment pending',
    paymentPendingDescription: 'Your payment is being processed. You will receive an email confirmation.',
    paymentErrorDescription: 'An error occurred during payment. Please try again.',
    redirectingToCryptoPayment: 'Redirecting to OxaPay',
    redirectingToOxaPayDescription: 'You will be redirected to the secure payment page...',
    
    // Payment Modal
    paymentModalTitle: 'Payment Instructions',
    paymentModalBankTransferTitle: 'Bank Transfer Payment',
    paymentModalBankInstructions: 'Please make a bank transfer to the following account with your order reference:',
    paymentModalOtherMethodsTitle: 'Other Payment Methods',
    paymentModalOtherMethodsMessage: 'For PayPal, Western Union, MoneyGram, or Ria payments, please contact our customer service at:',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'View Payment Instructions',
    
    // Order Confirmation
    paymentInstructions: 'After receiving payment, you will receive an email confirmation. Your order will be delivered within 24-48 hours.',
    orderReceived: 'Order Received',
    emailConfirmation: 'You will receive an email confirmation',
    deliveryTime: 'Delivery within 24-48 hours',
    
    // Auth
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    loggingIn: 'Logging in...',
    signingUp: 'Signing up...',
    loginSuccess: 'Login successful!',
    signupSuccess: 'Sign up successful!',
    loginError: 'Login error',
    signupError: 'Sign up error',
    invalidCredentials: 'Incorrect email or password',
    
    // Reset Password Page
    invalidResetLink: 'Invalid link',
    resetLinkInvalidOrExpired: 'The reset link is invalid or has expired.',
    passwordResetSuccess: 'Password reset!',
    passwordResetSuccessMessage: 'Your password has been successfully changed. Redirecting...',
    redirectingToHome: 'Redirecting to home...',
    enterNewPasswordBelow: 'Enter your new password below',
    fillAllFieldsError: 'Please fill in all fields',
    resettingPassword: 'Resetting...',
    resetPasswordButton: 'Reset password',
    
    welcomeBack: 'Welcome back',
    back: 'Back',
    welcome: 'Please check your email (including spam/junk folder) to verify your account.',
    emailRequired: 'Email is required',
    passwordRequired: 'Password is required',
    emailInvalid: 'Invalid email format',
    passwordMinLength: 'Password must be at least 6 characters',
    passwordsDontMatch: 'Passwords do not match',
    confirmPasswordRequired: 'Confirm password is required',
    firstNameRequired: 'First name is required',
    lastNameRequired: 'Last name is required',
    countryRequired: 'Country is required',
    cityRequired: 'City is required',
    addressRequired: 'Address is required',
    phoneRequired: 'Phone number is required',
    validationError: 'Validation error',
    fixErrors: 'Please correct the errors in the form',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: 'Forgot password?',
    forgotPasswordTitle: 'Forgot password',
    forgotPasswordDescription: 'Enter your email address and we will send you a link to reset your password.',
    sendResetLink: 'Send reset link',
    sending: 'Sending...',
    backToLogin: 'Back to login',
    emailSent: 'Email sent',
    resetLinkSentDescription: 'If an account exists with this email, you will receive a reset link.',
    checkYourEmail: 'Check your email',
    resetEmailSentMessage: 'If an account exists with the address {email}, you will receive an email with instructions to reset your password.',
    resetLinkExpiry: 'The link will expire in 1 hour for security reasons.',
    emailSendError: 'Error sending email',
    errorOccurred: 'An error occurred',
    weak: 'Weak',
    medium: 'Medium',
    strong: 'Strong',
    passwordMinLength8: 'At least 8 characters',
    passwordHasLetters: 'Contains letters',
    passwordHasNumbers: 'Contains numbers',
    passwordHasAtSymbol: 'Contains @ character (recommended)',
    passwordRequirements: 'Password must contain at least 8 characters, letters and numbers. The @ character is highly recommended.',
    passwordTooWeak: 'Password too weak. Add special characters to improve security.',
    
    // Messages
    // Product Page
    productNotFound: 'Product not found',
    backToProducts: 'Back to products',
    addedToWishlist: 'Added to wishlist',
    removedFromWishlist: 'Removed from wishlist',
    linkCopied: 'Link copied to clipboard',
    warranty2Years: '2 Year Warranty',
    returns30Days: '30 Day Returns',
    
    itemAddedToCart: 'Item added to cart!',
    itemRemovedFromCart: 'Item removed from cart',
    orderPlaced: 'Order placed successfully!',
    loginRequired: 'Please login to continue checkout',
    paymentSuccessful: 'Payment successful! Order confirmed.',
    loggedOut: 'Logged out successfully',
    fillRequiredFields: 'Please fill all required fields',
    pleaseCompleteThisField: 'Please complete this field',
    invalidEmail: 'Please enter a valid email address',
    invalidPhone: 'Please enter a valid phone number',
    invalidCountry: 'Please enter a valid country',
    invalidCity: 'Please enter a valid city',
    invalidAddress: 'Address must contain a number and street name',
    addressMismatch: 'The address does not match the selected city and country',
    addressNotInSelectedCity: 'The address must be in the selected city',
    addressNotInSelectedCountry: 'The address must be in the selected country',
    pleaseSelectValidAddress: 'Please select a valid address from the suggestions',
    pleaseSelectAddressFromSuggestions: 'Please select an address from the suggestions',
    selectAddressFromSuggestions: 'Please select an address from the suggestions below',
    selectCountryAndCity: 'Please select country and city first',
    addressNotListedConfirm: 'My address is not listed',
    confirmAddressNotListed: 'I confirm that my address is correct even if it is not in the suggestions',
    addressNotListedWarning: 'Please make sure your address is correct as it cannot be validated automatically',
    ticketCodeSent: 'Ticket codes sent successfully',
    enterTicketCode: 'Please enter at least one ticket code',
    orderFailed: 'Order failed. Please try again.',
    paymentInitFailed: 'Payment initialization failed. Please try again.',
    stripeUnavailable: 'Payment method unavailable',
    stripeUnavailableMessage: 'This payment method is temporarily unavailable. Please choose another payment method.',
    
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
    termsOfServiceContent: 'Prices are in euros including VAT. Accepted payments: SEPA bank transfer, Crypto via OxaPay. Orders are shipped within 24 hours after immediate payment confirmation, except for regular bank transfer (24-72h depending on banks). For complaints, please contact us via email.',
    contactTitle: 'Contact',
    contactContent: 'For any questions: Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Product Details',
    description: 'Description',
    specifications: 'Specifications',
    capacity: 'Capacity',
    color: 'Color',
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
    
    // Payment Page
    backToCart: 'Back to cart',
    securedPayment: 'Secure payment',
    choosePaymentMethod: 'Choose your preferred payment method',
    allTransactionsSecured: 'All transactions are secure and encrypted',
    ticketsPCS: 'PCS / TransCash Tickets',
    immediate: 'Immediate',
    ticketPaymentInstructions: 'Ticket Payment Instructions',
    ticketInstructionsTitle: 'Instructions for ticket payment',
    ticketInstructionSelectType: 'Select type: PCS or TransCash',
    ticketInstructionCode: 'Ticket code: Enter the 16-digit code (e.g., 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Available amount: Indicate the exact balance of each ticket in euros',
    ticketInstructionMulti: 'Multi-tickets: Add as many tickets as needed to reach the required amount',
    ticketInstructionValidation: 'Validation: The "Pay" button activates automatically when total ≥ order amount',
    dontHaveTickets: 'Don\'t have tickets?',
    buyTickets: 'Buy PCS/TransCash tickets on Recharge.com',
    ticket: 'Ticket',
    addTicket: 'Add a ticket',
    ticketsTotal: 'Tickets total:',
    requiredAmount: 'Required amount:',
    insufficientAmount: 'Insufficient amount',
    amountValidated: 'Amount validated!',
    ticketCodePlaceholder: 'Ticket code',
    ticketAmountPlaceholder: 'Amount (€)',
    days23: '2-3 days',
    bankTransferInstructionsTitle: 'Bank transfer instructions',
    bankTransferInstruction1: 'Make a transfer to the account indicated below',
    bankTransferInstruction2: '⚠️ IMPORTANT: MUST indicate the order reference',
    bankTransferInstruction3: 'The amount must exactly match the indicated amount',
    bankTransferInstruction4: 'Your order will be processed after receiving the transfer (2-3 days)',
    bankTransferInstruction5: 'You will receive a confirmation email after validation',
    beneficiary: 'Beneficiary',
    referenceRequired: 'Reference (REQUIRED)',
    amount: 'Amount',
    copyBankDetails: 'Copy bank details',
    copied: 'Copied!',
    recommended: 'Recommended',
    payment100Secure: '100% secure payment',
    paymentInfoEncrypted: 'Your payment information is encrypted and secured. We never store your bank data.',
    neverStoreCardData: 'We never store your bank data',
    shippingAddress: 'Shipping address',
    editAddress: 'Edit address',
    saveAddress: 'Save address',
    orderItems: 'Order items',
    vat: 'VAT (20%)',
    totalWithVat: 'Total with VAT',
    payNow: 'Pay now',
    orderSent: 'Order sent!',
    orderConfirmationEmail: 'You will receive a confirmation email (check your spam/junk folder if needed).',
    orderRegistered: 'Order registered',
    completeTransferWithReference: 'Complete the transfer with the indicated reference',
    missingAmount: 'missing',
    oxaPayInstructionsTitle: 'OxaPay Instructions',
    oxaPayInstruction1: 'Instant and secure payment by cryptocurrency or bank card',
    oxaPayInstruction2: 'You will be redirected to the OxaPay platform',
    oxaPayInstruction3: 'Accepts: Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Your order will be confirmed immediately after payment',
    oxaPayInstruction5: 'Secure transaction with 256-bit SSL encryption',
    oxaPayRecommendation: 'Recommended method for fast processing',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Please verify your wire transfer details before confirming your order',
    amountToTransfer: 'Amount to transfer',
    instructionsLabel: 'Instructions:',
    transferInstruction1Short: 'Make the transfer to the account above',
    transferInstruction2Short: 'Be sure to indicate the reference',
    immediateTransfer: 'Immediate transfer',
    delivery24h: 'Delivery in 24h',
    standardTransfer: 'Standard transfer',
    delivery4872h: '48-72h depending on your bank',
    noCancel: 'No, cancel',
    yesProceedTransfer: 'Yes, I proceed with the transfer',
    name: 'Name',
    reference: 'Reference',
    importantReferenceNote: 'Important: Be sure to indicate the reference',
    viewMyOrders: 'View my orders',
    processing: 'Processing...',
    orderReference: 'Order reference',
    paymentInitError: 'Error initializing payment',
    
    // Dashboard
    hello: 'Hello',
    welcomePersonalSpace: 'Welcome to your personal Luxio space',
    totalOrders: 'Total orders',
    noOrdersYet: 'No orders yet',
    inProgress: 'In progress',
    ordersProcessing: 'Orders in processing',
    delivered: 'Delivered',
    ordersReceived: 'Orders received',
    totalSpent: 'Total spent',
    totalAmount: 'Total amount',
    orderHistory: 'Order history',
    latestOrdersStatus: 'Your latest orders and their status',
    noOrders: 'No orders',
    noOrdersDescription: 'You haven\'t placed any orders yet. Discover our premium product catalog!',
    personalInfo: 'Personal information',
    luxioMember: 'Luxio Member',
    accountDetails: 'Your account details',
    accountCreated: 'Account created',
    viewProfile: 'View profile',
    actionsRequired: 'Actions Required',
    awaitingPayment: 'Awaiting Payment',
    paymentReview: 'Payment Review',
    processingOrder: 'Processing',
    fulfilled: 'Fulfilled',
    completeBankTransfer: 'Complete Bank Transfer',
    submitPCSCodes: 'Submit PCS Codes',
    openOxaPay: 'Open OxaPay',
    viewInstructions: 'View Instructions',
    payWithin24h: 'Pay within 24h to reserve stock',
    unpaidOrders: 'Unpaid Orders',
    paymentPending: 'Payment Pending',
    completePayment: 'Complete Payment',
    noActionsRequired: 'No Actions Required',
    allOrdersPaid: 'All your orders are paid!',
    createdDaysAgo: 'Created {days} day(s) ago',
    createdHoursAgo: 'Created {hours} hour(s) ago',
    createdMinutesAgo: 'Created {minutes} minute(s) ago',
    timeRemainingMinutes: '{minutes} min remaining',
    timeRemainingHoursMinutes: '{hours}h {minutes}min remaining',
    expiring: 'Expiring...',
    timeRemaining: 'Time remaining:',
    reserveStock: 'Reserve stock',
    
    // Order Actions
    cancelOrder: 'Cancel Order',
    cancelOrderWarning: '⚠️ If you have already paid for this order, please wait or contact us by email. If payment has not yet been made, you can cancel it.',
    orderCancelledSuccess: '✅ Order successfully cancelled.',
    paymentInstructionsTitle: 'Payment Instructions',
    bankTransferInstructionsMessage: 'Thank you for your order! For delivery within 24h, make the transfer immediately. For standard transfer, processing may take 48 to 72h depending on your bank.',
    ticketPaymentMessage: 'We have received your notification following the order. We are currently verifying the payment. You will receive final confirmation within a few minutes.',
    oxapayConfirmationMessage: 'Payment confirmed via OxaPay. Your order is being processed.',
    contactSupportEmail: 'Contact us at support@luxio-shop.eu if you have already paid.',
    confirmCancellation: 'Confirm Cancellation',
    cancelAction: 'Cancel',
    bankDetails: 'Bank Details',
    paymentReference: 'Payment Reference',
    uniqueOrderNumber: 'Unique Order Number',
    deliveryInfoMessage: 'For delivery within 24h, make an immediate transfer.',
    deliveryInfoStandard: 'Standard transfer: 48-72h depending on your bank.',
    
    // User Profile
    myAccount: 'My Account',
    profile: 'Profile',
    myOrders: 'My Orders',
    settings: 'Settings',
    accountSettings: 'Account Settings',
    security: 'Security',
    changePassword: 'Change Password',
    passwordResetDescription: 'Reset your password to secure your account',
    notifications: 'Notifications',
    orderNotifications: 'Order notifications',
    priceAlerts: 'Price alerts',
    promotionalNewsletter: 'Promotional newsletter',
    fullNameLabel: 'Full Name',
    accountStats: 'Account statistics',
    totalOrdersCount: 'Total orders',
    totalSpentAmount: 'Total spent',
    orderHistoryTitle: 'Order history',
    noOrdersYetMessage: 'No orders yet',
    orderLabel: 'Order',
    paidStatus: 'Paid',
    pendingStatus: 'Pending',
    user: 'User',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmNewPassword: 'Confirm New Password',
    passwordChangeSuccess: 'Password changed successfully!',
    passwordChangeFailed: 'Failed to change password',
    
    // Password Visibility & Checkout
    showPassword: 'Show password',
    hidePassword: 'Hide password',
    loginRequiredToCheckout: 'Login Required',
    pleaseLoginOrSignupToCheckout: 'Please log in or sign up to place your order.',
    goToLogin: 'Go to Login',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Premium Smartphones, Watches, Sneakers | Up to 37% Off',
    seoHomeDescription: 'Discover the latest smartphones, smartwatches, premium sneakers and high-tech gadgets with up to 37% off. Free shipping, secure payment with crypto and bank cards.',
    seoHomeKeywords: 'smartphone, smartwatch, sneakers, gadgets, high-tech, iPhone, Samsung, luxury, premium, discount',
    seoPremiumTitle: 'Premium Products - Smartphones, Watches, Sneakers | Luxio Market',
    seoPremiumDescription: 'Explore our exclusive collection of premium smartphones, luxury watches and designer sneakers. Authentic products with manufacturer warranty and fast delivery.',
    seoPremiumKeywords: 'premium smartphone, luxury watch, designer sneakers, authentic products, warranty',
    seoDashboardTitle: 'My Dashboard - Order Tracking | Luxio Market',
    seoDashboardDescription: 'Track your orders, manage your account and view your order history on Luxio Market.',
    seoCartTitle: 'Shopping Cart - Review Your Order | Luxio Market',
    seoCartDescription: 'Review your shopping cart and proceed to secure checkout. Free shipping on all orders.',
    seoPaymentTitle: 'Secure Payment - Complete Your Order | Luxio Market',
    seoPaymentDescription: 'Complete your order securely with crypto payment, bank transfer or prepaid cards. All transactions are encrypted and secure.',
    seoCheckoutAddressTitle: 'Delivery Address - Checkout | Luxio Market',
    seoCheckoutAddressDescription: 'Confirm your delivery address for secure and fast shipping. Edit or use your registered address.',
    deliveryAddress: 'Delivery Address',
    checkoutAddressTitle: 'Where should we deliver your order?',
    checkoutAddressSubtitle: 'Please confirm or update your delivery address',
    useRegisteredAddress: 'Use my registered address',
    continueToPayment: 'Continue to Payment',
    addressSaved: 'Address saved successfully',
    postalCode: 'Postal Code',
    enterNewAddress: 'Enter a new address',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Premium tech products',
    seoImageAltProduct: 'Premium product at discount price',
    seoImageAltSmartphone: 'Latest generation smartphone',
    seoImageAltWatch: 'Premium smartwatch',
    seoImageAltSneaker: 'Designer premium sneakers',
    seoImageAltGadget: 'Smart home gadget',
    
    // Coupons
    couponCode: 'Coupon Code',
    applyCoupon: 'Apply Coupon',
    enterCouponCode: 'Enter coupon code',
    couponApplied: 'Coupon applied successfully',
    couponInvalid: 'Invalid coupon code',
    couponExpired: 'This coupon has expired',
    couponAlreadyUsed: 'This coupon has already been used',
    removeCoupon: 'Remove coupon',
    myCoupons: 'My Coupons',
    noCoupons: 'No coupons available',
    noCouponsDescription: 'You don\'t have any coupons yet. Earn coupons by ordering more than 2 phones or spending 3000€ or more.',
    couponDiscount: 'off',
    couponExpires: 'Expires',
    couponValid: 'Valid',
    couponUsed: 'Used',
    copyCode: 'Copy code',
    codeCopied: 'Code copied!',
    validatingCoupon: 'Validating...',
    cryptoIncentive: '🎁 Special Crypto Offer: Pay with cryptocurrency and automatically receive a 10% discount coupon for your next order!',
  },
  
  fr: {
    // Navigation
    navigation: 'Navigation',
    accessSections: 'Accédez aux différentes sections du site',
    home: 'Accueil',
    dashboard: 'Tableau de bord',
    cart: 'Panier',
    premium: 'Premium',
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
    or: 'ou',
    
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
    smartphonesSubtitle: 'Appareils premium avec jusqu\'à 22% de réduction',
    watchesSubtitle: 'Suivez votre santé avec jusqu\'à 37% de réduction',
    sneakersSubtitle: 'Sublimez votre style avec 17% de réduction + livraison gratuite',
    gadgetsSubtitle: 'Modernisez votre maison avec 13% de réduction + livraison gratuite',
    mobilitySubtitle: 'Trottinettes et vélos électriques avec 13% de réduction + livraison gratuite',
    loadingProducts: 'Chargement des produits...',
    
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
    oxaPay: 'Paiement via Crypto OxaPay',
    oxaPayDescription: 'Paiement sécurisé par cryptomonnaie (Bitcoin, USDT, Ethereum, etc.)',
    oxaPayInstructions: 'Suivez les instructions ci-dessous pour finaliser votre paiement crypto via OxaPay.',
    selectPaymentMethod: 'Choisir le mode de paiement',
    bankTransferTitle: 'Virement bancaire',
    bankTransferDescription: 'Transférez le montant sur notre compte bancaire',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Référence du virement',
    transferInstructions: 'Utilisez votre numéro de commande comme référence',
    paymentDeposit: 'Dépôt',
    useReferenceInstruction: 'Utilisez cette référence comme motif de virement :',
    prepaidTicketsTitle: 'Tickets prépayés (Transcash & PCS)',
    prepaidTicketsDescription: 'Envoyez-nous vos codes de tickets prépayés',
    ticketCode: 'Code ticket',
    addTicketCode: 'Ajouter un code',
    removeTicketCode: 'Supprimer le code',
    sendTicketCodes: 'Envoyer les codes',
    dataProtection: 'Données Protégées',
    verifiedPayment: 'Paiement Vérifié',
    stripe: 'Stripe',
    stripeDescription: 'Paiement sécurisé par carte bancaire',
    cardPayment: 'Carte Bancaire',
    cardNumber: 'Numéro de carte',
    expiryDate: 'Date d\'expiration',
    cvc: 'CVC',
    cardholderName: 'Nom du titulaire',
    paymentProcessing: 'Traitement du paiement...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Méthode de paiement principale',
    alternativePaymentMethods: 'Moyens de paiement alternatifs',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'Pour utiliser ce moyen de paiement, veuillez contacter notre service client à : Contact@luxiomarket.shop. Nous vous répondrons rapidement.',
    recommendedMethod: 'Méthode Recommandée',
    alternativePaymentInstructionsTitle: 'Comment procéder ?',
    alternativePaymentInstructions: 'Cliquez sur le moyen de paiement de votre choix ci-dessus. Cela ouvrira votre application email avec un message pré-rempli. Envoyez ce message à notre service pour finaliser votre commande. Notre équipe vous répondra dans les plus brefs délais avec les instructions de paiement détaillées.',
    clickToViewAlternativeMethods: 'Cliquez pour voir les autres moyens de paiement disponibles',
    understood: 'Compris',
    alternativePaymentEmailSubject: 'Paiement via {method} - Commande {amount}€',
    emailBodyIntro: 'Je souhaite finaliser ma commande avec le moyen de paiement suivant',
    orderDetails: 'Détails de la commande',
    customerName: 'Nom complet',
    emailBodyClosing: 'Merci de me fournir les instructions de paiement pour finaliser cette commande.',
    regards: 'Cordialement',
    
    // Payment Notifications
    paymentSuccessTitle: 'Paiement réussi !',
    paymentSuccessDescription: 'Votre commande a été confirmée',
    orderConfirmed: 'Commande confirmée',
    paymentCancelledTitle: 'Paiement annulé',
    paymentCancelledDescription: 'Le paiement a été annulé. Votre panier est toujours disponible.',
    paymentPendingTitle: 'Paiement en attente',
    paymentPendingDescription: 'Votre paiement est en cours de traitement. Vous recevrez une confirmation par email.',
    paymentErrorDescription: 'Une erreur s\'est produite lors du paiement. Veuillez réessayer.',
    redirectingToCryptoPayment: 'Redirection vers OxaPay',
    redirectingToOxaPayDescription: 'Vous allez être redirigé vers la page de paiement sécurisée...',
    
    // Payment Modal
    paymentModalTitle: 'Instructions de paiement',
    paymentModalBankTransferTitle: 'Paiement par virement bancaire',
    paymentModalBankInstructions: 'Veuillez effectuer un virement bancaire sur le compte suivant avec votre référence de commande :',
    paymentModalOtherMethodsTitle: 'Autres moyens de paiement',
    paymentModalOtherMethodsMessage: 'Pour les paiements PayPal, Western Union, MoneyGram ou Ria, veuillez contacter notre service client à :',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'Voir les instructions de paiement',
    
    // Order Confirmation
    paymentInstructions: 'Après réception du paiement, vous recevrez une confirmation par email. Votre commande sera livrée sous 24-48 h.',
    orderReceived: 'Commande reçue',
    emailConfirmation: 'Vous recevrez une confirmation par email',
    deliveryTime: 'Livraison sous 24-48 heures',
    
    // Auth
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    fullName: 'Nom complet',
    dontHaveAccount: 'Pas encore de compte ?',
    alreadyHaveAccount: 'Vous avez déjà un compte ?',
    loggingIn: 'Connexion en cours...',
    signingUp: 'Inscription en cours...',
    loginSuccess: 'Connexion réussie !',
    signupSuccess: 'Inscription réussie !',
    loginError: 'Erreur de connexion',
    signupError: 'Erreur',
    invalidCredentials: 'Email ou mot de passe incorrect',
    
    // Reset Password Page
    invalidResetLink: 'Lien invalide',
    resetLinkInvalidOrExpired: 'Le lien de réinitialisation est invalide ou a expiré.',
    passwordResetSuccess: 'Mot de passe réinitialisé !',
    passwordResetSuccessMessage: 'Votre mot de passe a été modifié avec succès. Redirection en cours...',
    redirectingToHome: 'Redirection vers l\'accueil...',
    enterNewPasswordBelow: 'Entrez votre nouveau mot de passe ci-dessous',
    fillAllFieldsError: 'Veuillez remplir tous les champs',
    resettingPassword: 'Réinitialisation...',
    resetPasswordButton: 'Réinitialiser le mot de passe',
    
    welcomeBack: 'Bienvenue',
    back: 'Retour',
    welcome: 'Veuillez vérifier votre email (y compris le dossier spam/courrier indésirable) pour activer votre compte.',
    emailRequired: 'L\'email est obligatoire',
    passwordRequired: 'Le mot de passe est obligatoire',
    emailInvalid: 'Format email invalide',
    passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères',
    passwordsDontMatch: 'Les mots de passe ne correspondent pas',
    confirmPasswordRequired: 'La confirmation du mot de passe est obligatoire',
    firstNameRequired: 'Le prénom est obligatoire',
    lastNameRequired: 'Le nom est obligatoire',
    countryRequired: 'Le pays est obligatoire',
    cityRequired: 'La ville est obligatoire',
    addressRequired: 'L\'adresse est obligatoire',
    phoneRequired: 'Le téléphone est obligatoire',
    validationError: 'Erreur de validation',
    fixErrors: 'Veuillez corriger les erreurs dans le formulaire',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: 'Mot de passe oublié ?',
    forgotPasswordTitle: 'Mot de passe oublié',
    forgotPasswordDescription: 'Entrez votre adresse email et nous vous enverrons un lien pour réinitialiser votre mot de passe.',
    sendResetLink: 'Envoyer le lien de réinitialisation',
    sending: 'Envoi en cours...',
    backToLogin: 'Retour à la connexion',
    emailSent: 'Email envoyé',
    resetLinkSentDescription: 'Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.',
    checkYourEmail: 'Vérifiez votre email',
    resetEmailSentMessage: 'Si un compte existe avec l\'adresse {email}, vous recevrez un email avec des instructions pour réinitialiser votre mot de passe.',
    resetLinkExpiry: 'Le lien expirera dans 1 heure pour des raisons de sécurité.',
    emailSendError: 'Erreur lors de l\'envoi de l\'email',
    errorOccurred: 'Une erreur est survenue',
    weak: 'Faible',
    medium: 'Moyen',
    strong: 'Fort',
    passwordMinLength8: 'Au moins 8 caractères',
    passwordHasLetters: 'Contient des lettres',
    passwordHasNumbers: 'Contient des chiffres',
    passwordHasAtSymbol: 'Contient le caractère @ (recommandé)',
    passwordRequirements: 'Le mot de passe doit contenir au moins 8 caractères, des lettres et des chiffres. Le caractère @ est fortement recommandé.',
    passwordTooWeak: 'Mot de passe trop faible. Ajoutez des caractères spéciaux pour renforcer la sécurité.',
    
    // Messages
    // Product Page
    productNotFound: 'Produit non trouvé',
    backToProducts: 'Retour aux produits',
    addedToWishlist: 'Ajouté aux favoris',
    removedFromWishlist: 'Retiré des favoris',
    linkCopied: 'Lien copié dans le presse-papier',
    warranty2Years: 'Garantie 2 ans',
    returns30Days: 'Retours 30 jours',
    
    itemAddedToCart: 'Article ajouté au panier!',
    itemRemovedFromCart: 'Article retiré du panier',
    orderPlaced: 'Commande passée avec succès!',
    loginRequired: 'Veuillez vous connecter pour continuer',
    paymentSuccessful: 'Paiement réussi! Commande confirmée.',
    loggedOut: 'Déconnexion réussie',
    fillRequiredFields: 'Veuillez remplir tous les champs obligatoires',
    pleaseCompleteThisField: 'Veuillez renseigner ce champ',
    invalidEmail: 'Veuillez saisir une adresse email valide',
    invalidPhone: 'Veuillez saisir un numéro de téléphone valide',
    invalidCountry: 'Veuillez entrer un pays valide',
    invalidCity: 'Veuillez entrer une ville valide',
    invalidAddress: 'L\'adresse doit contenir un numéro et un nom de rue',
    addressMismatch: 'L\'adresse ne correspond pas à la ville et au pays sélectionnés',
    addressNotInSelectedCity: 'L\'adresse doit être dans la ville sélectionnée',
    addressNotInSelectedCountry: 'L\'adresse doit être dans le pays sélectionné',
    pleaseSelectValidAddress: 'Veuillez sélectionner une adresse valide parmi les suggestions',
    pleaseSelectAddressFromSuggestions: 'Veuillez sélectionner une adresse parmi les suggestions',
    selectAddressFromSuggestions: 'Veuillez sélectionner une adresse parmi les suggestions ci-dessous',
    selectCountryAndCity: 'Veuillez d\'abord sélectionner le pays et la ville',
    addressNotListedConfirm: 'Mon adresse n\'est pas répertoriée',
    confirmAddressNotListed: 'Je confirme que mon adresse est correcte même si elle ne figure pas dans les suggestions',
    addressNotListedWarning: 'Veuillez vous assurer que votre adresse est correcte car elle ne peut pas être validée automatiquement',
    ticketCodeSent: 'Codes tickets envoyés avec succès',
    enterTicketCode: 'Veuillez entrer au moins un code ticket',
    orderFailed: 'Commande échouée. Veuillez réessayer.',
    paymentInitFailed: 'Échec de l\'initialisation du paiement. Veuillez réessayer.',
    stripeUnavailable: 'Moyen de paiement indisponible',
    stripeUnavailableMessage: 'Ce moyen de paiement est temporairement indisponible. Veuillez choisir un autre moyen de paiement.',
    
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
    termsOfServiceContent: 'Les prix sont en euros TTC. Paiements acceptés : Virement bancaire SEPA, Crypto via OxaPay. Les commandes sont expédiées sous 24h après confirmation du paiement immédiat, sauf virement ordinaire (24-72h selon banques). Réclamations → email de contact.',
    contactTitle: 'Contact',
    contactContent: 'Pour toute question : Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Détails du produit',
    description: 'Description',
    specifications: 'Caractéristiques',
    capacity: 'Capacité',
    color: 'Couleur',
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
    
    // Payment Page
    backToCart: 'Retour au panier',
    securedPayment: 'Paiement sécurisé',
    choosePaymentMethod: 'Choisissez votre méthode de paiement préférée',
    allTransactionsSecured: 'Toutes les transactions sont sécurisées et cryptées',
    ticketsPCS: 'Tickets PCS / TransCash',
    immediate: 'Immédiat',
    ticketPaymentInstructions: 'Instructions pour le paiement par tickets',
    ticketInstructionsTitle: 'Instructions pour le paiement par tickets',
    ticketInstructionSelectType: 'Sélectionnez le type : PCS ou TransCash',
    ticketInstructionCode: 'Code du ticket : Saisissez le code à 16 chiffres (ex: 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Montant disponible : Indiquez le solde exact de chaque ticket en euros',
    ticketInstructionMulti: 'Multi-tickets : Ajoutez autant de tickets que nécessaire pour atteindre le montant requis',
    ticketInstructionValidation: 'Validation : Le bouton "Payer" s\'active automatiquement quand le total ≥ montant de la commande',
    dontHaveTickets: 'Vous n\'avez pas de tickets ?',
    buyTickets: 'Acheter des tickets PCS/TransCash sur Recharge.com',
    ticket: 'Ticket',
    addTicket: 'Ajouter un ticket',
    ticketsTotal: 'Total des tickets :',
    requiredAmount: 'Montant requis :',
    insufficientAmount: 'Montant insuffisant',
    amountValidated: 'Montant validé !',
    ticketCodePlaceholder: 'Code du ticket',
    ticketAmountPlaceholder: 'Montant (€)',
    days23: '2-3 jours',
    bankTransferInstructionsTitle: 'Instructions pour le virement bancaire',
    bankTransferInstruction1: 'Effectuez un virement vers le compte indiqué ci-dessous',
    bankTransferInstruction2: '⚠️ IMPORTANT : Indiquez OBLIGATOIREMENT la référence de commande',
    bankTransferInstruction3: 'Le montant doit correspondre exactement à celui indiqué',
    bankTransferInstruction4: 'Votre commande sera traitée après réception du virement (2-3 jours)',
    bankTransferInstruction5: 'Vous recevrez un email de confirmation après validation',
    beneficiary: 'Bénéficiaire',
    referenceRequired: 'Référence (OBLIGATOIRE)',
    amount: 'Montant',
    copyBankDetails: 'Copier les informations bancaires',
    copied: 'Copié !',
    recommended: 'Recommandé',
    payment100Secure: 'Paiement 100% sécurisé',
    paymentInfoEncrypted: 'Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons jamais vos données bancaires.',
    neverStoreCardData: 'Nous ne stockons jamais vos données bancaires',
    shippingAddress: 'Adresse de livraison',
    editAddress: 'Modifier l\'adresse',
    saveAddress: 'Enregistrer l\'adresse',
    orderItems: 'Articles de la commande',
    vat: 'TVA (20%)',
    totalWithVat: 'Total TTC',
    payNow: 'Payer maintenant',
    orderSent: 'Commande envoyée !',
    orderConfirmationEmail: 'Vous recevrez un email de confirmation (vérifiez votre dossier spam/courrier indésirable si nécessaire).',
    orderRegistered: 'Commande enregistrée',
    completeTransferWithReference: 'Effectuez le virement avec la référence indiquée',
    missingAmount: 'manquant',
    oxaPayInstructionsTitle: 'Instructions pour OxaPay',
    oxaPayInstruction1: 'Paiement instantané et sécurisé par cryptomonnaies ou carte bancaire',
    oxaPayInstruction2: 'Vous serez redirigé vers la plateforme OxaPay',
    oxaPayInstruction3: 'Accepte : Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Votre commande sera confirmée immédiatement après paiement',
    oxaPayInstruction5: 'Transaction sécurisée avec cryptage SSL 256 bits',
    oxaPayRecommendation: 'Méthode recommandée pour un traitement rapide',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Veuillez vérifier les détails de votre virement avant de confirmer votre commande',
    amountToTransfer: 'Montant à transférer',
    instructionsLabel: 'Instructions :',
    transferInstruction1Short: 'Effectuez le virement vers le compte ci-dessus',
    transferInstruction2Short: 'Indiquez bien la référence',
    immediateTransfer: 'Virement immédiat',
    delivery24h: 'Livraison en 24h',
    standardTransfer: 'Virement ordinaire',
    delivery4872h: '48-72h selon votre banque',
    noCancel: 'Non, annuler',
    yesProceedTransfer: 'Oui, je procède au virement',
    name: 'Nom',
    reference: 'Motif',
    importantReferenceNote: 'Important : Indiquez bien le motif',
    viewMyOrders: 'Voir mes commandes',
    processing: 'Traitement...',
    orderReference: 'Référence de commande',
    paymentInitError: 'Erreur lors de l\'initialisation du paiement',
    
    // Dashboard
    hello: 'Bonjour',
    welcomePersonalSpace: 'Bienvenue dans votre espace personnel Luxio',
    totalOrders: 'Commandes totales',
    noOrdersYet: 'Aucune commande pour le moment',
    inProgress: 'En cours',
    ordersProcessing: 'Commandes en traitement',
    delivered: 'Livrées',
    ordersReceived: 'Commandes reçues',
    totalSpent: 'Total dépensé',
    totalAmount: 'Montant total',
    orderHistory: 'Historique des commandes',
    latestOrdersStatus: 'Vos dernières commandes et leur statut',
    noOrders: 'Aucune commande',
    noOrdersDescription: 'Vous n\'avez pas encore passé de commande. Découvrez notre catalogue de produits premium !',
    personalInfo: 'Informations personnelles',
    luxioMember: 'Membre Luxio',
    accountDetails: 'Détails de votre compte',
    accountCreated: 'Compte créé',
    viewProfile: 'Voir le profil',
    actionsRequired: 'Actions Requises',
    awaitingPayment: 'En attente de paiement',
    paymentReview: 'Paiement en révision',
    processingOrder: 'En traitement',
    fulfilled: 'Livré',
    completeBankTransfer: 'Effectuer le virement',
    submitPCSCodes: 'Soumettre les codes PCS',
    openOxaPay: 'Ouvrir OxaPay',
    viewInstructions: 'Voir les instructions',
    payWithin24h: 'Payez sous 24h pour réserver le stock',
    unpaidOrders: 'Commandes non payées',
    paymentPending: 'Paiement en attente',
    completePayment: 'Compléter le paiement',
    noActionsRequired: 'Aucune action requise',
    allOrdersPaid: 'Toutes vos commandes sont payées !',
    createdDaysAgo: 'Créée il y a {days} jour(s)',
    createdHoursAgo: 'Créée il y a {hours} heure(s)',
    createdMinutesAgo: 'Créée il y a {minutes} minute(s)',
    timeRemainingMinutes: '{minutes} min restantes',
    timeRemainingHoursMinutes: '{hours}h {minutes}min restantes',
    expiring: 'Expiration...',
    timeRemaining: 'Temps restant :',
    reserveStock: 'Réserver le stock',
    
    // Order Actions
    cancelOrder: 'Annuler la commande',
    cancelOrderWarning: '⚠️ Si vous avez déjà payé cette commande, veuillez patienter ou nous contacter par e-mail. Si le paiement n\'a pas encore été effectué, vous pouvez l\'annuler.',
    orderCancelledSuccess: '✅ Commande annulée avec succès.',
    paymentInstructionsTitle: 'Instructions de paiement',
    bankTransferInstructionsMessage: 'Merci pour votre commande ! Pour une livraison en 24h, effectuez le virement immédiatement. En cas de virement ordinaire, le traitement peut prendre 48 à 72h selon la banque.',
    ticketPaymentMessage: 'Nous avons bien reçu votre notification suite à la commande. Nous procédons actuellement à la vérification du paiement. Vous recevrez une confirmation définitive d\'ici quelques minutes.',
    oxapayConfirmationMessage: 'Paiement confirmé via OxaPay. Votre commande est en cours de traitement.',
    contactSupportEmail: 'Contactez-nous à support@luxio-shop.eu si vous avez déjà payé.',
    confirmCancellation: 'Confirmer l\'annulation',
    cancelAction: 'Annuler',
    bankDetails: 'Coordonnées bancaires',
    paymentReference: 'Motif',
    uniqueOrderNumber: 'Numéro de commande unique',
    deliveryInfoMessage: 'Pour une livraison en 24h, effectuez un virement immédiat.',
    deliveryInfoStandard: 'Virement ordinaire : 48-72h selon votre banque.',
    
    // User Profile
    myAccount: 'Mon Compte',
    profile: 'Profil',
    myOrders: 'Mes Commandes',
    settings: 'Paramètres',
    accountSettings: 'Paramètres du compte',
    security: 'Sécurité',
    changePassword: 'Changer le mot de passe',
    passwordResetDescription: 'Réinitialisez votre mot de passe pour sécuriser votre compte',
    notifications: 'Notifications',
    orderNotifications: 'Notifications de commande',
    priceAlerts: 'Alertes de prix',
    promotionalNewsletter: 'Newsletter promotionnelle',
    fullNameLabel: 'Nom complet',
    accountStats: 'Statistiques du compte',
    totalOrdersCount: 'Commandes totales',
    totalSpentAmount: 'Montant total dépensé',
    orderHistoryTitle: 'Historique des commandes',
    noOrdersYetMessage: 'Aucune commande pour le moment',
    orderLabel: 'Commande',
    paidStatus: 'Payé',
    pendingStatus: 'En attente',
    user: 'Utilisateur',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    confirmNewPassword: 'Confirmer le mot de passe',
    passwordChangeSuccess: 'Mot de passe changé avec succès !',
    passwordChangeFailed: 'Échec du changement de mot de passe',
    
    // Password Visibility & Checkout
    showPassword: 'Afficher le mot de passe',
    hidePassword: 'Masquer le mot de passe',
    loginRequiredToCheckout: 'Connexion requise',
    pleaseLoginOrSignupToCheckout: 'Veuillez vous connecter ou vous inscrire pour passer commande.',
    goToLogin: 'Se connecter',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Smartphones, Montres, Baskets Premium | Jusqu\'à 37% de Réduction',
    seoHomeDescription: 'Découvrez les derniers smartphones, montres connectées, baskets premium et gadgets high-tech avec jusqu\'à 37% de réduction. Livraison gratuite, paiement sécurisé crypto et carte bancaire.',
    seoHomeKeywords: 'smartphone, montre connectée, baskets, gadgets, high-tech, iPhone, Samsung, luxe, premium, réduction',
    seoPremiumTitle: 'Produits Premium - Smartphones, Montres, Baskets | Luxio Market',
    seoPremiumDescription: 'Explorez notre collection exclusive de smartphones premium, montres de luxe et baskets de créateur. Produits authentiques avec garantie constructeur et livraison rapide.',
    seoPremiumKeywords: 'smartphone premium, montre luxe, baskets créateur, produits authentiques, garantie',
    seoDashboardTitle: 'Mon Tableau de Bord - Suivi de Commandes | Luxio Market',
    seoDashboardDescription: 'Suivez vos commandes, gérez votre compte et consultez l\'historique de vos achats sur Luxio Market.',
    seoCartTitle: 'Panier - Vérifiez Votre Commande | Luxio Market',
    seoCartDescription: 'Consultez votre panier et procédez au paiement sécurisé. Livraison gratuite sur toutes les commandes.',
    seoPaymentTitle: 'Paiement Sécurisé - Finalisez Votre Commande | Luxio Market',
    seoPaymentDescription: 'Finalisez votre commande en toute sécurité avec paiement crypto, virement bancaire ou cartes prépayées. Toutes les transactions sont chiffrées et sécurisées.',
    seoCheckoutAddressTitle: 'Adresse de Livraison - Commande | Luxio Market',
    seoCheckoutAddressDescription: 'Confirmez votre adresse de livraison pour une expédition sécurisée et rapide. Modifiez ou utilisez votre adresse enregistrée.',
    deliveryAddress: 'Adresse de livraison',
    checkoutAddressTitle: 'Où devons-nous livrer votre commande ?',
    checkoutAddressSubtitle: 'Veuillez confirmer ou mettre à jour votre adresse de livraison',
    useRegisteredAddress: 'Utiliser mon adresse enregistrée',
    continueToPayment: 'Continuer vers le paiement',
    addressSaved: 'Adresse enregistrée avec succès',
    postalCode: 'Code postal',
    enterNewAddress: 'Saisir une nouvelle adresse',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Produits tech premium',
    seoImageAltProduct: 'Produit premium à prix réduit',
    seoImageAltSmartphone: 'Smartphone dernière génération',
    seoImageAltWatch: 'Montre connectée premium',
    seoImageAltSneaker: 'Baskets premium de créateur',
    seoImageAltGadget: 'Gadget maison connectée',
    
    // Coupons
    couponCode: 'Code promo',
    applyCoupon: 'Appliquer le coupon',
    enterCouponCode: 'Entrez le code promo',
    couponApplied: 'Coupon appliqué avec succès',
    couponInvalid: 'Code promo invalide',
    couponExpired: 'Ce coupon a expiré',
    couponAlreadyUsed: 'Ce coupon a déjà été utilisé',
    removeCoupon: 'Supprimer le coupon',
    myCoupons: 'Mes Coupons',
    noCoupons: 'Aucun coupon disponible',
    noCouponsDescription: 'Vous n\'avez pas encore de coupons. Gagnez des coupons en commandant plus de 2 téléphones ou en dépensant 3000€ ou plus.',
    couponDiscount: 'de réduction',
    couponExpires: 'Expire le',
    couponValid: 'Valide',
    couponUsed: 'Utilisé',
    copyCode: 'Copier le code',
    codeCopied: 'Code copié !',
    validatingCoupon: 'Validation...',
    cryptoIncentive: '🎁 Offre Spéciale Crypto : Payez en cryptomonnaie et recevez automatiquement un coupon de réduction de 10% pour votre prochaine commande !',
  },
  
  es: {
    // Navigation
    navigation: 'Navegación',
    accessSections: 'Accede a diferentes secciones del sitio',
    home: 'Inicio',
    dashboard: 'Panel de control',
    cart: 'Carrito',
    premium: 'Premium',
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
    or: 'o',
    
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
    smartphonesSubtitle: 'Dispositivos premium con hasta 22% de descuento',
    watchesSubtitle: 'Cuida tu salud con hasta 37% de descuento',
    sneakersSubtitle: 'Mejora tu estilo con 17% de descuento + envío gratis',
    gadgetsSubtitle: 'Moderniza tu hogar con 13% de descuento + envío gratis',
    mobilitySubtitle: 'Patinetes y bicicletas eléctricas con 13% de descuento + envío gratis',
    loadingProducts: 'Cargando productos...',
    
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
    oxaPay: 'Pago con Cripto via OxaPay',
    oxaPayDescription: 'Pago seguro con criptomoneda (Bitcoin, USDT, Ethereum, etc.)',
    oxaPayInstructions: 'Sigue las instrucciones a continuación para completar tu pago con criptomonedas a través de OxaPay.',
    selectPaymentMethod: 'Seleccionar método de pago',
    bankTransferTitle: 'Transferencia bancaria',
    bankTransferDescription: 'Transfiere el importe a nuestra cuenta bancaria',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Referencia de transferencia',
    transferInstructions: 'Usa tu número de pedido como referencia',
    paymentDeposit: 'Depósito',
    useReferenceInstruction: 'Utiliza esta referencia como motivo del pago:',
    prepaidTicketsTitle: 'Tickets prepagados (Transcash & PCS)',
    prepaidTicketsDescription: 'Envíanos tus códigos de tickets prepagados',
    ticketCode: 'Código de ticket',
    addTicketCode: 'Añadir código',
    removeTicketCode: 'Eliminar código',
    sendTicketCodes: 'Enviar códigos',
    dataProtection: 'Protección de Datos',
    verifiedPayment: 'Pago Verificado',
    stripe: 'Stripe',
    stripeDescription: 'Pago seguro con tarjeta de crédito',
    cardPayment: 'Tarjeta de Crédito',
    cardNumber: 'Número de tarjeta',
    expiryDate: 'Fecha de vencimiento',
    cvc: 'CVC',
    cardholderName: 'Nombre del titular',
    paymentProcessing: 'Procesando pago...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Método de pago principal',
    alternativePaymentMethods: 'Métodos de pago alternativos',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'Para utilizar este método de pago, por favor contacte a nuestro servicio de atención al cliente en: Contact@luxiomarket.shop. Le responderemos rápidamente.',
    recommendedMethod: 'Método Recomendado',
    alternativePaymentInstructionsTitle: '¿Cómo proceder?',
    alternativePaymentInstructions: 'Haga clic en su método de pago preferido arriba. Esto abrirá su aplicación de correo electrónico con un mensaje prellenado. Envíe este mensaje a nuestro servicio para finalizar su pedido. Nuestro equipo responderá lo antes posible con instrucciones de pago detalladas.',
    clickToViewAlternativeMethods: 'Haga clic para ver otros métodos de pago disponibles',
    understood: 'Entendido',
    alternativePaymentEmailSubject: 'Pago mediante {method} - Pedido {amount}€',
    emailBodyIntro: 'Me gustaría finalizar mi pedido con el siguiente método de pago',
    orderDetails: 'Detalles del pedido',
    customerName: 'Nombre completo',
    emailBodyClosing: 'Gracias por proporcionar las instrucciones de pago para finalizar este pedido.',
    regards: 'Saludos',
    
    // Payment Notifications
    paymentSuccessTitle: '¡Pago exitoso!',
    paymentSuccessDescription: 'Su pedido ha sido confirmado',
    orderConfirmed: 'Pedido confirmado',
    paymentCancelledTitle: 'Pago cancelado',
    paymentCancelledDescription: 'El pago ha sido cancelado. Su carrito sigue disponible.',
    paymentPendingTitle: 'Pago pendiente',
    paymentPendingDescription: 'Su pago está siendo procesado. Recibirá una confirmación por correo electrónico.',
    paymentErrorDescription: 'Se produjo un error durante el pago. Por favor, inténtelo de nuevo.',
    redirectingToCryptoPayment: 'Redirigiendo a OxaPay',
    redirectingToOxaPayDescription: 'Será redirigido a la página de pago segura...',
    
    // Payment Modal
    paymentModalTitle: 'Instrucciones de pago',
    paymentModalBankTransferTitle: 'Pago por transferencia bancaria',
    paymentModalBankInstructions: 'Por favor realice una transferencia bancaria a la siguiente cuenta con su referencia de pedido:',
    paymentModalOtherMethodsTitle: 'Otros métodos de pago',
    paymentModalOtherMethodsMessage: 'Para pagos con PayPal, Western Union, MoneyGram o Ria, por favor contacte a nuestro servicio al cliente en:',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'Ver instrucciones de pago',
    
    // Order Confirmation
    paymentInstructions: 'Después de recibir el pago, recibirás una confirmación por email. Tu pedido será entregado en 24-48 horas.',
    orderReceived: 'Pedido recibido',
    emailConfirmation: 'Recibirás una confirmación por email',
    deliveryTime: 'Entrega en 24-48 horas',
    
    // Auth
    email: 'Email',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    fullName: 'Nombre completo',
    dontHaveAccount: '¿No tienes cuenta?',
    alreadyHaveAccount: '¿Ya tienes cuenta?',
    loggingIn: 'Iniciando sesión...',
    signingUp: 'Registrando...',
    loginSuccess: '¡Inicio de sesión exitoso!',
    signupSuccess: '¡Registro exitoso!',
    loginError: 'Error de inicio de sesión',
    signupError: 'Error',
    invalidCredentials: 'Correo electrónico o contraseña incorrecta',
    
    // Reset Password Page
    invalidResetLink: 'Enlace inválido',
    resetLinkInvalidOrExpired: 'El enlace de restablecimiento es inválido o ha expirado.',
    passwordResetSuccess: '¡Contraseña restablecida!',
    passwordResetSuccessMessage: 'Tu contraseña ha sido cambiada con éxito. Redirigiendo...',
    redirectingToHome: 'Redirigiendo al inicio...',
    enterNewPasswordBelow: 'Ingresa tu nueva contraseña a continuación',
    fillAllFieldsError: 'Por favor completa todos los campos',
    resettingPassword: 'Restableciendo...',
    resetPasswordButton: 'Restablecer contraseña',
    
    welcomeBack: 'Bienvenido',
    back: 'Volver',
    welcome: 'Por favor, verifique su correo electrónico (incluyendo la carpeta de spam/correo no deseado) para activar su cuenta.',
    emailRequired: 'El email es obligatorio',
    passwordRequired: 'La contraseña es obligatoria',
    emailInvalid: 'Formato de email inválido',
    passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
    passwordsDontMatch: 'Las contraseñas no coinciden',
    confirmPasswordRequired: 'La confirmación de la contraseña es obligatoria',
    firstNameRequired: 'El nombre es obligatorio',
    lastNameRequired: 'El apellido es obligatorio',
    countryRequired: 'El país es obligatorio',
    cityRequired: 'La ciudad es obligatoria',
    addressRequired: 'La dirección es obligatoria',
    phoneRequired: 'El teléfono es obligatorio',
    validationError: 'Error de validación',
    fixErrors: 'Por favor corrige los errores en el formulario',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: '¿Olvidaste tu contraseña?',
    forgotPasswordTitle: 'Contraseña olvidada',
    forgotPasswordDescription: 'Ingresa tu dirección de correo electrónico y te enviaremos un enlace para restablecer tu contraseña.',
    sendResetLink: 'Enviar enlace de restablecimiento',
    sending: 'Enviando...',
    backToLogin: 'Volver al inicio de sesión',
    emailSent: 'Correo enviado',
    resetLinkSentDescription: 'Si existe una cuenta con este correo, recibirás un enlace de restablecimiento.',
    checkYourEmail: 'Revisa tu correo',
    resetEmailSentMessage: 'Si existe una cuenta con la dirección {email}, recibirás un correo con instrucciones para restablecer tu contraseña.',
    resetLinkExpiry: 'El enlace expirará en 1 hora por razones de seguridad.',
    emailSendError: 'Error al enviar el correo',
    errorOccurred: 'Ocurrió un error',
    weak: 'Débil',
    medium: 'Medio',
    strong: 'Fuerte',
    passwordMinLength8: 'Al menos 8 caracteres',
    passwordHasLetters: 'Contiene letras',
    passwordHasNumbers: 'Contiene números',
    passwordHasAtSymbol: 'Contiene el carácter @ (recomendado)',
    passwordRequirements: 'La contraseña debe contener al menos 8 caracteres, letras y números. El carácter @ es altamente recomendado.',
    passwordTooWeak: 'Contraseña demasiado débil. Agrega caracteres especiales para mejorar la seguridad.',
    
    // Messages
    // Product Page
    productNotFound: 'Producto no encontrado',
    backToProducts: 'Volver a productos',
    addedToWishlist: 'Añadido a favoritos',
    removedFromWishlist: 'Eliminado de favoritos',
    linkCopied: 'Enlace copiado al portapapeles',
    warranty2Years: 'Garantía 2 años',
    returns30Days: 'Devoluciones 30 días',
    
    itemAddedToCart: '¡Producto añadido al carrito!',
    itemRemovedFromCart: 'Producto eliminado del carrito',
    orderPlaced: '¡Pedido realizado con éxito!',
    loginRequired: 'Inicia sesión para continuar',
    paymentSuccessful: '¡Pago exitoso! Pedido confirmado.',
    loggedOut: 'Sesión cerrada correctamente',
    fillRequiredFields: 'Por favor, completa todos los campos obligatorios',
    pleaseCompleteThisField: 'Por favor, completa este campo',
    invalidEmail: 'Por favor, introduce un email válido',
    invalidPhone: 'Por favor, introduce un teléfono válido',
    invalidCountry: 'Por favor, introduce un país válido',
    invalidCity: 'Por favor, introduce una ciudad válida',
    invalidAddress: 'La dirección debe contener un número y el nombre de la calle',
    addressMismatch: 'La dirección no coincide con la ciudad y el país seleccionados',
    addressNotInSelectedCity: 'La dirección debe estar en la ciudad seleccionada',
    addressNotInSelectedCountry: 'La dirección debe estar en el país seleccionado',
    pleaseSelectValidAddress: 'Por favor, seleccione una dirección válida de las sugerencias',
    pleaseSelectAddressFromSuggestions: 'Por favor, seleccione una dirección de las sugerencias',
    selectAddressFromSuggestions: 'Por favor, seleccione una dirección de las sugerencias a continuación',
    selectCountryAndCity: 'Por favor, seleccione primero el país y la ciudad',
    addressNotListedConfirm: 'Mi dirección no está listada',
    confirmAddressNotListed: 'Confirmo que mi dirección es correcta aunque no aparezca en las sugerencias',
    addressNotListedWarning: 'Por favor, asegúrese de que su dirección es correcta ya que no se puede validar automáticamente',
    ticketCodeSent: 'Códigos de tickets enviados correctamente',
    enterTicketCode: 'Por favor, introduce al menos un código de ticket',
    orderFailed: 'Pedido fallido. Por favor, inténtalo de nuevo.',
    paymentInitFailed: 'Error al inicializar el pago. Por favor, inténtalo de nuevo.',
    stripeUnavailable: 'Método de pago no disponible',
    stripeUnavailableMessage: 'Este método de pago no está disponible temporalmente. Por favor, elija otro método de pago.',
    
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
    termsOfServiceContent: 'Los precios están en euros con IVA incluido. Pagos aceptados: Transferencia bancaria SEPA, Cripto vía OxaPay. Los pedidos se envían en 24 horas tras confirmación del pago inmediato, excepto transferencia ordinaria (24-72h según bancos). Reclamaciones → email de contacto.',
    contactTitle: 'Contacto',
    contactContent: 'Para cualquier pregunta: Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Detalles del producto',
    description: 'Descripción',
    specifications: 'Especificaciones',
    capacity: 'Capacidad',
    color: 'Color',
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
    
    // Payment Page
    backToCart: 'Volver al carrito',
    securedPayment: 'Pago seguro',
    choosePaymentMethod: 'Elija su método de pago preferido',
    allTransactionsSecured: 'Todas las transacciones son seguras y encriptadas',
    ticketsPCS: 'Tickets PCS / TransCash',
    immediate: 'Inmediato',
    ticketPaymentInstructions: 'Instrucciones para el pago con tickets',
    ticketInstructionsTitle: 'Instrucciones para el pago con tickets',
    ticketInstructionSelectType: 'Seleccione el tipo: PCS o TransCash',
    ticketInstructionCode: 'Código del ticket: Ingrese el código de 16 dígitos (ej: 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Monto disponible: Indique el saldo exacto de cada ticket en euros',
    ticketInstructionMulti: 'Multi-tickets: Agregue tantos tickets como sea necesario para alcanzar el monto requerido',
    ticketInstructionValidation: 'Validación: El botón "Pagar" se activa automáticamente cuando el total ≥ monto del pedido',
    dontHaveTickets: '¿No tiene tickets?',
    buyTickets: 'Comprar tickets PCS/TransCash en Recharge.com',
    ticket: 'Ticket',
    addTicket: 'Agregar un ticket',
    ticketsTotal: 'Total de tickets:',
    requiredAmount: 'Monto requerido:',
    insufficientAmount: 'Monto insuficiente',
    amountValidated: '¡Monto validado!',
    ticketCodePlaceholder: 'Código del ticket',
    ticketAmountPlaceholder: 'Monto (€)',
    days23: '2-3 días',
    bankTransferInstructionsTitle: 'Instrucciones para transferencia bancaria',
    bankTransferInstruction1: 'Realice una transferencia a la cuenta indicada a continuación',
    bankTransferInstruction2: '⚠️ IMPORTANTE: Indique OBLIGATORIAMENTE la referencia del pedido',
    bankTransferInstruction3: 'El monto debe corresponder exactamente al indicado',
    bankTransferInstruction4: 'Su pedido será procesado después de recibir la transferencia (2-3 días)',
    bankTransferInstruction5: 'Recibirá un correo de confirmación después de la validación',
    beneficiary: 'Beneficiario',
    referenceRequired: 'Referencia (OBLIGATORIA)',
    amount: 'Monto',
    copyBankDetails: 'Copiar información bancaria',
    copied: '¡Copiado!',
    recommended: 'Recomendado',
    payment100Secure: 'Pago 100% seguro',
    paymentInfoEncrypted: 'Su información de pago está encriptada y asegurada. Nunca almacenamos sus datos bancarios.',
    neverStoreCardData: 'Nunca almacenamos sus datos bancarios',
    shippingAddress: 'Dirección de envío',
    editAddress: 'Editar dirección',
    saveAddress: 'Guardar dirección',
    orderItems: 'Artículos del pedido',
    vat: 'IVA (20%)',
    totalWithVat: 'Total con IVA',
    payNow: 'Pagar ahora',
    orderSent: '¡Pedido enviado!',
    orderConfirmationEmail: 'Recibirá un correo de confirmación (revise su carpeta de spam/correo no deseado si es necesario).',
    orderRegistered: 'Pedido registrado',
    completeTransferWithReference: 'Complete la transferencia con la referencia indicada',
    missingAmount: 'faltante',
    oxaPayInstructionsTitle: 'Instrucciones para OxaPay',
    oxaPayInstruction1: 'Pago instantáneo y seguro por criptomonedas o tarjeta bancaria',
    oxaPayInstruction2: 'Será redirigido a la plataforma OxaPay',
    oxaPayInstruction3: 'Acepta: Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Su pedido será confirmado inmediatamente después del pago',
    oxaPayInstruction5: 'Transacción segura con encriptación SSL de 256 bits',
    oxaPayRecommendation: 'Método recomendado para procesamiento rápido',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Por favor verifique los detalles de su transferencia antes de confirmar su pedido',
    amountToTransfer: 'Monto a transferir',
    instructionsLabel: 'Instrucciones:',
    transferInstruction1Short: 'Realice la transferencia a la cuenta indicada arriba',
    transferInstruction2Short: 'Asegúrese de indicar la referencia',
    immediateTransfer: 'Transferencia inmediata',
    delivery24h: 'Entrega en 24h',
    standardTransfer: 'Transferencia estándar',
    delivery4872h: '48-72h según su banco',
    noCancel: 'No, cancelar',
    yesProceedTransfer: 'Sí, procedo con la transferencia',
    name: 'Nombre',
    reference: 'Referencia',
    importantReferenceNote: 'Importante: Asegúrese de indicar la referencia',
    viewMyOrders: 'Ver mis pedidos',
    processing: 'Procesando...',
    orderReference: 'Referencia del pedido',
    paymentInitError: 'Error al inicializar el pago',
    
    // Dashboard
    hello: 'Hola',
    welcomePersonalSpace: 'Bienvenido a su espacio personal Luxio',
    totalOrders: 'Pedidos totales',
    noOrdersYet: 'Sin pedidos por el momento',
    inProgress: 'En progreso',
    ordersProcessing: 'Pedidos en proceso',
    delivered: 'Entregados',
    ordersReceived: 'Pedidos recibidos',
    totalSpent: 'Total gastado',
    totalAmount: 'Monto total',
    orderHistory: 'Historial de pedidos',
    latestOrdersStatus: 'Sus últimos pedidos y su estado',
    noOrders: 'Sin pedidos',
    noOrdersDescription: '¡Aún no ha realizado ningún pedido. Descubra nuestro catálogo de productos premium!',
    personalInfo: 'Información personal',
    luxioMember: 'Miembro Luxio',
    accountDetails: 'Detalles de su cuenta',
    accountCreated: 'Cuenta creada',
    viewProfile: 'Ver perfil',
    actionsRequired: 'Acciones Requeridas',
    awaitingPayment: 'Esperando Pago',
    paymentReview: 'Revisión de Pago',
    processingOrder: 'En Proceso',
    fulfilled: 'Completado',
    completeBankTransfer: 'Completar Transferencia',
    submitPCSCodes: 'Enviar Códigos PCS',
    openOxaPay: 'Abrir OxaPay',
    viewInstructions: 'Ver Instrucciones',
    payWithin24h: 'Paga en 24h para reservar stock',
    unpaidOrders: 'Pedidos No Pagados',
    paymentPending: 'Pago Pendiente',
    completePayment: 'Completar Pago',
    noActionsRequired: 'No Se Requieren Acciones',
    allOrdersPaid: '¡Todos tus pedidos están pagados!',
    createdDaysAgo: 'Creado hace {days} día(s)',
    createdHoursAgo: 'Creado hace {hours} hora(s)',
    createdMinutesAgo: 'Creado hace {minutes} minuto(s)',
    timeRemainingMinutes: '{minutes} min restantes',
    timeRemainingHoursMinutes: '{hours}h {minutes}min restantes',
    expiring: 'Expirando...',
    timeRemaining: 'Tiempo restante:',
    reserveStock: 'Reservar stock',
    
    // Order Actions
    cancelOrder: 'Cancelar Pedido',
    cancelOrderWarning: '⚠️ Si ya ha pagado este pedido, espere o contáctenos por correo electrónico. Si aún no se ha realizado el pago, puede cancelarlo.',
    orderCancelledSuccess: '✅ Pedido cancelado correctamente.',
    paymentInstructionsTitle: 'Instrucciones de Pago',
    bankTransferInstructionsMessage: '¡Gracias por su pedido! Para entrega en 24h, realice la transferencia inmediatamente. En caso de transferencia estándar, el procesamiento puede tardar 48 a 72h según su banco.',
    ticketPaymentMessage: 'Hemos recibido su notificación del pedido. Actualmente estamos verificando el pago. Recibirá una confirmación definitiva en unos minutos.',
    oxapayConfirmationMessage: 'Pago confirmado a través de OxaPay. Su pedido está siendo procesado.',
    contactSupportEmail: 'Contáctenos en support@luxio-shop.eu si ya ha pagado.',
    confirmCancellation: 'Confirmar Cancelación',
    cancelAction: 'Cancelar',
    bankDetails: 'Datos Bancarios',
    paymentReference: 'Referencia de Pago',
    uniqueOrderNumber: 'Número de Pedido Único',
    deliveryInfoMessage: 'Para entrega en 24h, realice una transferencia inmediata.',
    deliveryInfoStandard: 'Transferencia estándar: 48-72h según su banco.',
    
    // User Profile
    myAccount: 'Mi Cuenta',
    profile: 'Perfil',
    myOrders: 'Mis Pedidos',
    settings: 'Configuración',
    accountSettings: 'Configuración de la cuenta',
    security: 'Seguridad',
    changePassword: 'Cambiar contraseña',
    passwordResetDescription: 'Restablezca su contraseña para proteger su cuenta',
    notifications: 'Notificaciones',
    orderNotifications: 'Notificaciones de pedido',
    priceAlerts: 'Alertas de precio',
    promotionalNewsletter: 'Boletín promocional',
    fullNameLabel: 'Nombre completo',
    accountStats: 'Estadísticas de la cuenta',
    totalOrdersCount: 'Pedidos totales',
    totalSpentAmount: 'Total gastado',
    orderHistoryTitle: 'Historial de pedidos',
    noOrdersYetMessage: 'Aún no hay pedidos',
    orderLabel: 'Pedido',
    paidStatus: 'Pagado',
    pendingStatus: 'Pendiente',
    user: 'Usuario',
    currentPassword: 'Contraseña actual',
    newPassword: 'Nueva contraseña',
    confirmNewPassword: 'Confirmar contraseña',
    passwordChangeSuccess: '¡Contraseña cambiada con éxito!',
    passwordChangeFailed: 'Error al cambiar la contraseña',
    
    // Password Visibility & Checkout
    showPassword: 'Mostrar contraseña',
    hidePassword: 'Ocultar contraseña',
    loginRequiredToCheckout: 'Inicio de sesión requerido',
    pleaseLoginOrSignupToCheckout: 'Por favor inicie sesión o regístrese para realizar su pedido.',
    goToLogin: 'Ir a Inicio de sesión',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Smartphones, Relojes, Zapatillas Premium | Hasta 37% de Descuento',
    seoHomeDescription: 'Descubre los últimos smartphones, relojes inteligentes, zapatillas premium y gadgets high-tech con hasta 37% de descuento. Envío gratis, pago seguro con crypto y tarjeta bancaria.',
    seoHomeKeywords: 'smartphone, reloj inteligente, zapatillas, gadgets, high-tech, iPhone, Samsung, lujo, premium, descuento',
    seoPremiumTitle: 'Productos Premium - Smartphones, Relojes, Zapatillas | Luxio Market',
    seoPremiumDescription: 'Explora nuestra colección exclusiva de smartphones premium, relojes de lujo y zapatillas de diseñador. Productos auténticos con garantía del fabricante y entrega rápida.',
    seoPremiumKeywords: 'smartphone premium, reloj lujo, zapatillas diseñador, productos auténticos, garantía',
    seoDashboardTitle: 'Mi Panel de Control - Seguimiento de Pedidos | Luxio Market',
    seoDashboardDescription: 'Rastrea tus pedidos, gestiona tu cuenta y consulta el historial de tus compras en Luxio Market.',
    seoCartTitle: 'Carrito de Compras - Revisa Tu Pedido | Luxio Market',
    seoCartDescription: 'Consulta tu carrito y procede al pago seguro. Envío gratis en todos los pedidos.',
    seoPaymentTitle: 'Pago Seguro - Completa Tu Pedido | Luxio Market',
    seoPaymentDescription: 'Completa tu pedido de forma segura con pago crypto, transferencia bancaria o tarjetas prepagadas. Todas las transacciones están cifradas y son seguras.',
    seoCheckoutAddressTitle: 'Dirección de Entrega - Pedido | Luxio Market',
    seoCheckoutAddressDescription: 'Confirma tu dirección de entrega para un envío seguro y rápido. Edita o usa tu dirección registrada.',
    deliveryAddress: 'Dirección de entrega',
    checkoutAddressTitle: '¿Dónde debemos entregar tu pedido?',
    checkoutAddressSubtitle: 'Por favor confirma o actualiza tu dirección de entrega',
    useRegisteredAddress: 'Usar mi dirección registrada',
    continueToPayment: 'Continuar al pago',
    addressSaved: 'Dirección guardada con éxito',
    postalCode: 'Código postal',
    enterNewAddress: 'Ingresar una nueva dirección',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Productos tech premium',
    seoImageAltProduct: 'Producto premium a precio reducido',
    seoImageAltSmartphone: 'Smartphone de última generación',
    seoImageAltWatch: 'Reloj inteligente premium',
    seoImageAltSneaker: 'Zapatillas premium de diseñador',
    seoImageAltGadget: 'Gadget para casa inteligente',
    
    // Coupons
    couponCode: 'Código de cupón',
    applyCoupon: 'Aplicar cupón',
    enterCouponCode: 'Ingresa el código de cupón',
    couponApplied: 'Cupón aplicado con éxito',
    couponInvalid: 'Código de cupón inválido',
    couponExpired: 'Este cupón ha expirado',
    couponAlreadyUsed: 'Este cupón ya ha sido utilizado',
    removeCoupon: 'Eliminar cupón',
    myCoupons: 'Mis Cupones',
    noCoupons: 'No hay cupones disponibles',
    noCouponsDescription: 'Aún no tienes cupones. Gana cupones pidiendo más de 2 teléfonos o gastando 3000€ o más.',
    couponDiscount: 'de descuento',
    couponExpires: 'Expira',
    couponValid: 'Válido',
    couponUsed: 'Usado',
    copyCode: 'Copiar código',
    codeCopied: '¡Código copiado!',
    validatingCoupon: 'Validando...'
  },
  
  pt: {
    // Navigation
    navigation: 'Navegação',
    accessSections: 'Aceda a diferentes secções do site',
    home: 'Início',
    dashboard: 'Painel de controlo',
    cart: 'Carrinho',
    premium: 'Premium',
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
    or: 'ou',
    
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
    smartphonesSubtitle: 'Dispositivos premium com até 22% de desconto',
    watchesSubtitle: 'Monitore sua saúde com até 37% de desconto',
    sneakersSubtitle: 'Melhore seu estilo com 17% de desconto + frete grátis',
    gadgetsSubtitle: 'Modernize sua casa com 13% de desconto + entrega grátis',
    mobilitySubtitle: 'Scooters e bicicletas elétricas com 13% de desconto + frete grátis',
    loadingProducts: 'Carregando produtos...',
    
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
    oxaPay: 'Pagamento via Cripto OxaPay',
    oxaPayDescription: 'Pagamento seguro com criptomoeda (Bitcoin, USDT, Ethereum, etc.)',
    oxaPayInstructions: 'Siga as instruções abaixo para concluir o pagamento em criptomoeda via OxaPay.',
    selectPaymentMethod: 'Selecionar método de pagamento',
    bankTransferTitle: 'Transferência bancária',
    bankTransferDescription: 'Transfira o valor para a nossa conta bancária',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Referência da transferência',
    transferInstructions: 'Use o seu número de pedido como referência',
    paymentDeposit: 'Depósito',
    useReferenceInstruction: 'Use esta referência como motivo do pagamento:',
    prepaidTicketsTitle: 'Tickets pré-pagos (Transcash & PCS)',
    prepaidTicketsDescription: 'Envie-nos os seus códigos de tickets pré-pagos',
    ticketCode: 'Código do ticket',
    addTicketCode: 'Adicionar código',
    removeTicketCode: 'Remover código',
    sendTicketCodes: 'Enviar códigos',
    dataProtection: 'Proteção de Dados',
    verifiedPayment: 'Pagamento Verificado',
    stripe: 'Stripe',
    stripeDescription: 'Pagamento seguro com cartão de crédito',
    cardPayment: 'Cartão de Crédito',
    cardNumber: 'Número do cartão',
    expiryDate: 'Data de validade',
    cvc: 'CVC',
    cardholderName: 'Nome do titular',
    paymentProcessing: 'Processando pagamento...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Método de pagamento principal',
    alternativePaymentMethods: 'Métodos de pagamento alternativos',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'Para utilizar este método de pagamento, por favor contacte o nosso serviço de apoio ao cliente em: Contact@luxiomarket.shop. Responderemos rapidamente.',
    recommendedMethod: 'Método Recomendado',
    alternativePaymentInstructionsTitle: 'Como proceder?',
    alternativePaymentInstructions: 'Clique no seu método de pagamento preferido acima. Isso abrirá seu aplicativo de e-mail com uma mensagem pré-preenchida. Envie esta mensagem ao nosso serviço para finalizar seu pedido. Nossa equipe responderá o mais rápido possível com instruções de pagamento detalhadas.',
    clickToViewAlternativeMethods: 'Clique para ver outros métodos de pagamento disponíveis',
    understood: 'Compreendido',
    alternativePaymentEmailSubject: 'Pagamento via {method} - Pedido {amount}€',
    emailBodyIntro: 'Gostaria de finalizar meu pedido com o seguinte método de pagamento',
    orderDetails: 'Detalhes do pedido',
    customerName: 'Nome completo',
    emailBodyClosing: 'Obrigado por fornecer as instruções de pagamento para finalizar este pedido.',
    regards: 'Atenciosamente',
    
    // Payment Notifications
    paymentSuccessTitle: 'Pagamento bem-sucedido!',
    paymentSuccessDescription: 'Seu pedido foi confirmado',
    orderConfirmed: 'Pedido confirmado',
    paymentCancelledTitle: 'Pagamento cancelado',
    paymentCancelledDescription: 'O pagamento foi cancelado. Seu carrinho ainda está disponível.',
    paymentPendingTitle: 'Pagamento pendente',
    paymentPendingDescription: 'Seu pagamento está sendo processado. Você receberá uma confirmação por e-mail.',
    paymentErrorDescription: 'Ocorreu um erro durante o pagamento. Por favor, tente novamente.',
    redirectingToCryptoPayment: 'Redirecionando para OxaPay',
    redirectingToOxaPayDescription: 'Você será redirecionado para a página de pagamento segura...',
    
    // Payment Modal
    paymentModalTitle: 'Instruções de pagamento',
    paymentModalBankTransferTitle: 'Pagamento por transferência bancária',
    paymentModalBankInstructions: 'Por favor efetue uma transferência bancária para a seguinte conta com a sua referência de pedido:',
    paymentModalOtherMethodsTitle: 'Outros métodos de pagamento',
    paymentModalOtherMethodsMessage: 'Para pagamentos PayPal, Western Union, MoneyGram ou Ria, por favor contacte o nosso serviço de apoio ao cliente em:',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'Ver instruções de pagamento',
    
    // Order Confirmation
    paymentInstructions: 'Após receber o pagamento, receberá uma confirmação por email. O seu pedido será entregue em 24-48 horas.',
    orderReceived: 'Pedido recebido',
    emailConfirmation: 'Receberá uma confirmação por email',
    deliveryTime: 'Entrega em 24-48 horas',
    
    // Auth
    email: 'Email',
    password: 'Palavra-passe',
    confirmPassword: 'Confirmar palavra-passe',
    fullName: 'Nome completo',
    dontHaveAccount: 'Não tem conta?',
    alreadyHaveAccount: 'Já tem conta?',
    loggingIn: 'Entrando...',
    signingUp: 'Registrando...',
    loginSuccess: 'Login bem-sucedido!',
    signupSuccess: 'Registro bem-sucedido!',
    loginError: 'Erro de login',
    signupError: 'Erro',
    invalidCredentials: 'Email ou senha incorretos',
    
    // Reset Password Page
    invalidResetLink: 'Link inválido',
    resetLinkInvalidOrExpired: 'O link de redefinição é inválido ou expirou.',
    passwordResetSuccess: 'Senha redefinida!',
    passwordResetSuccessMessage: 'Sua senha foi alterada com sucesso. Redirecionando...',
    redirectingToHome: 'Redirecionando para o início...',
    enterNewPasswordBelow: 'Digite sua nova senha abaixo',
    fillAllFieldsError: 'Por favor, preencha todos os campos',
    resettingPassword: 'Redefinindo...',
    resetPasswordButton: 'Redefinir senha',
    
    welcomeBack: 'Bem-vindo',
    back: 'Voltar',
    welcome: 'Por favor, verifique seu email (incluindo a pasta de spam/lixo eletrônico) para ativar sua conta.',
    emailRequired: 'O email é obrigatório',
    passwordRequired: 'A palavra-passe é obrigatória',
    emailInvalid: 'Formato de email inválido',
    passwordMinLength: 'A palavra-passe deve ter pelo menos 6 caracteres',
    passwordsDontMatch: 'As palavras-passe não correspondem',
    confirmPasswordRequired: 'A confirmação da palavra-passe é obrigatória',
    firstNameRequired: 'O primeiro nome é obrigatório',
    lastNameRequired: 'O sobrenome é obrigatório',
    countryRequired: 'O país é obrigatório',
    cityRequired: 'A cidade é obrigatória',
    addressRequired: 'O endereço é obrigatório',
    phoneRequired: 'O telefone é obrigatório',
    validationError: 'Erro de validação',
    fixErrors: 'Por favor, corrija os erros no formulário',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: 'Esqueceu a senha?',
    forgotPasswordTitle: 'Esqueci a senha',
    forgotPasswordDescription: 'Digite seu endereço de e-mail e enviaremos um link para redefinir sua senha.',
    sendResetLink: 'Enviar link de redefinição',
    sending: 'Enviando...',
    backToLogin: 'Voltar ao login',
    emailSent: 'E-mail enviado',
    resetLinkSentDescription: 'Se existir uma conta com este e-mail, você receberá um link de redefinição.',
    checkYourEmail: 'Verifique seu e-mail',
    resetEmailSentMessage: 'Se existir uma conta com o endereço {email}, você receberá um e-mail com instruções para redefinir sua senha.',
    resetLinkExpiry: 'O link expirará em 1 hora por razões de segurança.',
    emailSendError: 'Erro ao enviar e-mail',
    errorOccurred: 'Ocorreu um erro',
    weak: 'Fraca',
    medium: 'Média',
    strong: 'Forte',
    passwordMinLength8: 'Pelo menos 8 caracteres',
    passwordHasLetters: 'Contém letras',
    passwordHasNumbers: 'Contém números',
    passwordHasAtSymbol: 'Contém o caractere @ (recomendado)',
    passwordRequirements: 'A senha deve conter pelo menos 8 caracteres, letras e números. O caractere @ é altamente recomendado.',
    passwordTooWeak: 'Senha muito fraca. Adicione caracteres especiais para melhorar a segurança.',
    
    // Messages
    // Product Page
    productNotFound: 'Produto não encontrado',
    backToProducts: 'Voltar aos produtos',
    addedToWishlist: 'Adicionado aos favoritos',
    removedFromWishlist: 'Removido dos favoritos',
    linkCopied: 'Link copiado para a área de transferência',
    warranty2Years: 'Garantia 2 anos',
    returns30Days: 'Devoluções 30 dias',
    
    itemAddedToCart: 'Item adicionado ao carrinho!',
    itemRemovedFromCart: 'Item removido do carrinho',
    orderPlaced: 'Pedido realizado com sucesso!',
    loginRequired: 'Entre para continuar a compra',
    paymentSuccessful: 'Pagamento bem-sucedido! Pedido confirmado.',
    loggedOut: 'Sessão terminada com sucesso',
    fillRequiredFields: 'Por favor, preencha todos os campos obrigatórios',
    pleaseCompleteThisField: 'Por favor, preencha este campo',
    invalidEmail: 'Por favor, introduza um email válido',
    invalidPhone: 'Por favor, introduza um telefone válido',
    invalidCountry: 'Por favor, introduza um país válido',
    invalidCity: 'Por favor, introduza uma cidade válida',
    invalidAddress: 'O endereço deve conter um número e o nome da rua',
    addressMismatch: 'O endereço não corresponde à cidade e ao país selecionados',
    addressNotInSelectedCity: 'O endereço deve estar na cidade selecionada',
    addressNotInSelectedCountry: 'O endereço deve estar no país selecionado',
    pleaseSelectValidAddress: 'Por favor, selecione um endereço válido das sugestões',
    pleaseSelectAddressFromSuggestions: 'Por favor, selecione um endereço das sugestões',
    selectAddressFromSuggestions: 'Por favor, selecione um endereço das sugestões abaixo',
    selectCountryAndCity: 'Por favor, selecione primeiro o país e a cidade',
    addressNotListedConfirm: 'Meu endereço não está listado',
    confirmAddressNotListed: 'Confirmo que meu endereço está correto mesmo que não esteja nas sugestões',
    addressNotListedWarning: 'Por favor, certifique-se de que seu endereço está correto, pois não pode ser validado automaticamente',
    ticketCodeSent: 'Códigos de tickets enviados com sucesso',
    enterTicketCode: 'Por favor, insira pelo menos um código de ticket',
    orderFailed: 'Pedido falhou. Por favor, tente novamente.',
    paymentInitFailed: 'Falha ao inicializar o pagamento. Por favor, tente novamente.',
    stripeUnavailable: 'Método de pagamento indisponível',
    stripeUnavailableMessage: 'Este método de pagamento está temporariamente indisponível. Por favor, escolha outro método de pagamento.',
    
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
    termsOfServiceContent: 'Os preços estão em euros com IVA incluído. Pagamentos aceites: Transferência bancária SEPA, Cripto via OxaPay. Os pedidos são enviados em 24 horas após confirmação do pagamento imediato, exceto transferência ordinária (24-72h conforme bancos). Reclamações → email de contacto.',
    contactTitle: 'Contacto',
    contactContent: 'Para qualquer questão: Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Detalhes do produto',
    description: 'Descrição',
    specifications: 'Especificações',
    capacity: 'Capacidade',
    color: 'Cor',
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
    
    // Payment Page
    backToCart: 'Voltar ao carrinho',
    securedPayment: 'Pagamento seguro',
    choosePaymentMethod: 'Escolha o seu método de pagamento preferido',
    allTransactionsSecured: 'Todas as transações são seguras e encriptadas',
    ticketsPCS: 'Tickets PCS / TransCash',
    immediate: 'Imediato',
    ticketPaymentInstructions: 'Instruções para pagamento com tickets',
    ticketInstructionsTitle: 'Instruções para pagamento com tickets',
    ticketInstructionSelectType: 'Selecione o tipo: PCS ou TransCash',
    ticketInstructionCode: 'Código do ticket: Insira o código de 16 dígitos (ex: 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Montante disponível: Indique o saldo exato de cada ticket em euros',
    ticketInstructionMulti: 'Multi-tickets: Adicione quantos tickets forem necessários para atingir o montante necessário',
    ticketInstructionValidation: 'Validação: O botão "Pagar" ativa automaticamente quando o total ≥ montante do pedido',
    dontHaveTickets: 'Não tem tickets?',
    buyTickets: 'Comprar tickets PCS/TransCash em Recharge.com',
    ticket: 'Ticket',
    addTicket: 'Adicionar um ticket',
    ticketsTotal: 'Total de tickets:',
    requiredAmount: 'Montante necessário:',
    insufficientAmount: 'Montante insuficiente',
    amountValidated: 'Montante validado!',
    ticketCodePlaceholder: 'Código do ticket',
    ticketAmountPlaceholder: 'Montante (€)',
    days23: '2-3 dias',
    bankTransferInstructionsTitle: 'Instruções para transferência bancária',
    bankTransferInstruction1: 'Realize uma transferência para a conta indicada abaixo',
    bankTransferInstruction2: '⚠️ IMPORTANTE: Indique OBRIGATORIAMENTE a referência do pedido',
    bankTransferInstruction3: 'O montante deve corresponder exatamente ao indicado',
    bankTransferInstruction4: 'O seu pedido será processado após receber a transferência (2-3 dias)',
    bankTransferInstruction5: 'Receberá um email de confirmação após a validação',
    beneficiary: 'Beneficiário',
    referenceRequired: 'Referência (OBRIGATÓRIA)',
    amount: 'Montante',
    copyBankDetails: 'Copiar dados bancários',
    copied: 'Copiado!',
    recommended: 'Recomendado',
    payment100Secure: 'Pagamento 100% seguro',
    paymentInfoEncrypted: 'A sua informação de pagamento está encriptada e protegida. Nunca armazenamos os seus dados bancários.',
    neverStoreCardData: 'Nunca armazenamos os seus dados bancários',
    shippingAddress: 'Morada de envio',
    editAddress: 'Editar morada',
    saveAddress: 'Guardar morada',
    orderItems: 'Artigos do pedido',
    vat: 'IVA (20%)',
    totalWithVat: 'Total com IVA',
    payNow: 'Pagar agora',
    orderSent: 'Pedido enviado!',
    orderConfirmationEmail: 'Receberá um email de confirmação (verifique sua pasta de spam/lixo eletrônico se necessário).',
    orderRegistered: 'Pedido registado',
    completeTransferWithReference: 'Complete a transferência com a referência indicada',
    missingAmount: 'em falta',
    oxaPayInstructionsTitle: 'Instruções para OxaPay',
    oxaPayInstruction1: 'Pagamento instantâneo e seguro por criptomoedas ou cartão bancário',
    oxaPayInstruction2: 'Você será redirecionado para a plataforma OxaPay',
    oxaPayInstruction3: 'Aceita: Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Seu pedido será confirmado imediatamente após o pagamento',
    oxaPayInstruction5: 'Transação segura com criptografia SSL de 256 bits',
    oxaPayRecommendation: 'Método recomendado para processamento rápido',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Por favor verifique os detalhes da sua transferência antes de confirmar o pedido',
    amountToTransfer: 'Montante a transferir',
    instructionsLabel: 'Instruções:',
    transferInstruction1Short: 'Realize a transferência para a conta indicada acima',
    transferInstruction2Short: 'Certifique-se de indicar a referência',
    immediateTransfer: 'Transferência imediata',
    delivery24h: 'Entrega em 24h',
    standardTransfer: 'Transferência padrão',
    delivery4872h: '48-72h dependendo do seu banco',
    noCancel: 'Não, cancelar',
    yesProceedTransfer: 'Sim, procedo com a transferência',
    name: 'Nome',
    reference: 'Motivo',
    importantReferenceNote: 'Importante: Certifique-se de indicar o motivo',
    viewMyOrders: 'Ver meus pedidos',
    processing: 'Processando...',
    orderReference: 'Referência do pedido',
    paymentInitError: 'Erro ao inicializar o pagamento',
    
    // Dashboard
    hello: 'Olá',
    welcomePersonalSpace: 'Bem-vindo ao seu espaço pessoal Luxio',
    totalOrders: 'Total de pedidos',
    noOrdersYet: 'Sem pedidos por enquanto',
    inProgress: 'Em progresso',
    ordersProcessing: 'Pedidos em processamento',
    delivered: 'Entregues',
    ordersReceived: 'Pedidos recebidos',
    totalSpent: 'Total gasto',
    totalAmount: 'Montante total',
    orderHistory: 'Histórico de pedidos',
    latestOrdersStatus: 'Os seus últimos pedidos e o seu estado',
    noOrders: 'Sem pedidos',
    noOrdersDescription: 'Ainda não fez nenhum pedido. Descubra o nosso catálogo de produtos premium!',
    personalInfo: 'Informação pessoal',
    luxioMember: 'Membro Luxio',
    accountDetails: 'Detalhes da sua conta',
    accountCreated: 'Conta criada',
    viewProfile: 'Ver perfil',
    actionsRequired: 'Ações Necessárias',
    awaitingPayment: 'Aguardando Pagamento',
    paymentReview: 'Revisão de Pagamento',
    processingOrder: 'Em Processamento',
    fulfilled: 'Concluído',
    completeBankTransfer: 'Completar Transferência',
    submitPCSCodes: 'Enviar Códigos PCS',
    openOxaPay: 'Abrir OxaPay',
    viewInstructions: 'Ver Instruções',
    payWithin24h: 'Pague em 24h para reservar stock',
    unpaidOrders: 'Pedidos Não Pagos',
    paymentPending: 'Pagamento Pendente',
    completePayment: 'Completar Pagamento',
    noActionsRequired: 'Nenhuma Ação Necessária',
    allOrdersPaid: 'Todos os seus pedidos estão pagos!',
    createdDaysAgo: 'Criado há {days} dia(s)',
    createdHoursAgo: 'Criado há {hours} hora(s)',
    createdMinutesAgo: 'Criado há {minutes} minuto(s)',
    timeRemainingMinutes: '{minutes} min restantes',
    timeRemainingHoursMinutes: '{hours}h {minutes}min restantes',
    expiring: 'A expirar...',
    timeRemaining: 'Tempo restante:',
    reserveStock: 'Reservar stock',
    
    // Order Actions
    cancelOrder: 'Cancelar Pedido',
    cancelOrderWarning: '⚠️ Se já pagou este pedido, aguarde ou contacte-nos por e-mail. Se o pagamento ainda não foi efetuado, pode cancelá-lo.',
    orderCancelledSuccess: '✅ Pedido cancelado com sucesso.',
    paymentInstructionsTitle: 'Instruções de Pagamento',
    bankTransferInstructionsMessage: 'Obrigado pelo seu pedido! Para entrega em 24h, efetue a transferência imediatamente. Em caso de transferência normal, o processamento pode demorar 48 a 72h dependendo do seu banco.',
    ticketPaymentMessage: 'Recebemos a sua notificação do pedido. Estamos atualmente a verificar o pagamento. Receberá uma confirmação final dentro de alguns minutos.',
    oxapayConfirmationMessage: 'Pagamento confirmado via OxaPay. O seu pedido está a ser processado.',
    contactSupportEmail: 'Contacte-nos em support@luxio-shop.eu se já pagou.',
    confirmCancellation: 'Confirmar Cancelamento',
    cancelAction: 'Cancelar',
    bankDetails: 'Dados Bancários',
    paymentReference: 'Referência de Pagamento',
    uniqueOrderNumber: 'Número de Pedido Único',
    deliveryInfoMessage: 'Para entrega em 24h, efetue uma transferência imediata.',
    deliveryInfoStandard: 'Transferência normal: 48-72h dependendo do seu banco.',
    
    // User Profile
    myAccount: 'Minha Conta',
    profile: 'Perfil',
    myOrders: 'Meus Pedidos',
    settings: 'Configurações',
    accountSettings: 'Configurações da conta',
    security: 'Segurança',
    changePassword: 'Alterar senha',
    passwordResetDescription: 'Redefina sua senha para proteger sua conta',
    notifications: 'Notificações',
    orderNotifications: 'Notificações de pedido',
    priceAlerts: 'Alertas de preço',
    promotionalNewsletter: 'Newsletter promocional',
    fullNameLabel: 'Nome completo',
    accountStats: 'Estatísticas da conta',
    totalOrdersCount: 'Pedidos totais',
    totalSpentAmount: 'Total gasto',
    orderHistoryTitle: 'Histórico de pedidos',
    noOrdersYetMessage: 'Ainda sem pedidos',
    orderLabel: 'Pedido',
    paidStatus: 'Pago',
    pendingStatus: 'Pendente',
    user: 'Usuário',
    currentPassword: 'Senha atual',
    newPassword: 'Nova senha',
    confirmNewPassword: 'Confirmar senha',
    passwordChangeSuccess: 'Senha alterada com sucesso!',
    passwordChangeFailed: 'Falha ao alterar a senha',
    
    // Password Visibility & Checkout
    showPassword: 'Mostrar senha',
    hidePassword: 'Ocultar senha',
    loginRequiredToCheckout: 'Login necessário',
    pleaseLoginOrSignupToCheckout: 'Por favor, faça login ou cadastre-se para fazer seu pedido.',
    goToLogin: 'Ir para Login',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Smartphones, Relógios, Ténis Premium | Até 37% de Desconto',
    seoHomeDescription: 'Descubra os mais recentes smartphones, relógios inteligentes, ténis premium e gadgets high-tech com até 37% de desconto. Envio gratuito, pagamento seguro com crypto e cartão bancário.',
    seoHomeKeywords: 'smartphone, relógio inteligente, ténis, gadgets, high-tech, iPhone, Samsung, luxo, premium, desconto',
    seoPremiumTitle: 'Produtos Premium - Smartphones, Relógios, Ténis | Luxio Market',
    seoPremiumDescription: 'Explore a nossa coleção exclusiva de smartphones premium, relógios de luxo e ténis de designer. Produtos autênticos com garantia do fabricante e entrega rápida.',
    seoPremiumKeywords: 'smartphone premium, relógio luxo, ténis designer, produtos autênticos, garantia',
    seoDashboardTitle: 'Meu Painel de Controlo - Rastreamento de Pedidos | Luxio Market',
    seoDashboardDescription: 'Rastreie os seus pedidos, gira a sua conta e consulte o histórico das suas compras na Luxio Market.',
    seoCartTitle: 'Carrinho de Compras - Reveja o Seu Pedido | Luxio Market',
    seoCartDescription: 'Consulte o seu carrinho e proceda ao pagamento seguro. Envio gratuito em todos os pedidos.',
    seoPaymentTitle: 'Pagamento Seguro - Complete o Seu Pedido | Luxio Market',
    seoPaymentDescription: 'Complete o seu pedido de forma segura com pagamento crypto, transferência bancária ou cartões pré-pagos. Todas as transações são encriptadas e seguras.',
    seoCheckoutAddressTitle: 'Endereço de Entrega - Pedido | Luxio Market',
    seoCheckoutAddressDescription: 'Confirme o seu endereço de entrega para um envio seguro e rápido. Edite ou use o seu endereço registado.',
    deliveryAddress: 'Endereço de entrega',
    checkoutAddressTitle: 'Onde devemos entregar o seu pedido?',
    checkoutAddressSubtitle: 'Por favor confirme ou atualize o seu endereço de entrega',
    useRegisteredAddress: 'Usar o meu endereço registado',
    continueToPayment: 'Continuar para o pagamento',
    addressSaved: 'Endereço guardado com sucesso',
    postalCode: 'Código postal',
    enterNewAddress: 'Inserir um novo endereço',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Produtos tech premium',
    seoImageAltProduct: 'Produto premium a preço reduzido',
    seoImageAltSmartphone: 'Smartphone de última geração',
    seoImageAltWatch: 'Relógio inteligente premium',
    seoImageAltSneaker: 'Ténis premium de designer',
    seoImageAltGadget: 'Gadget para casa inteligente',
    
    // Coupons
    couponCode: 'Código do cupom',
    applyCoupon: 'Aplicar cupom',
    enterCouponCode: 'Digite o código do cupom',
    couponApplied: 'Cupom aplicado com sucesso',
    couponInvalid: 'Código de cupom inválido',
    couponExpired: 'Este cupom expirou',
    couponAlreadyUsed: 'Este cupom já foi utilizado',
    removeCoupon: 'Remover cupom',
    myCoupons: 'Meus Cupons',
    noCoupons: 'Nenhum cupom disponível',
    noCouponsDescription: 'Você ainda não tem cupons. Ganhe cupons pedindo mais de 2 telefones ou gastando 3000€ ou mais.',
    couponDiscount: 'de desconto',
    couponExpires: 'Expira em',
    couponValid: 'Válido',
    couponUsed: 'Usado',
    copyCode: 'Copiar código',
    codeCopied: 'Código copiado!',
    validatingCoupon: 'Validando...'
  },
  
  pl: {
    // Navigation
    navigation: 'Nawigacja',
    accessSections: 'Dostęp do różnych sekcji witryny',
    home: 'Strona główna',
    dashboard: 'Panel kontrolny',
    cart: 'Koszyk',
    premium: 'Premium',
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
    or: 'lub',
    
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
    smartphonesSubtitle: 'Urządzenia premium z rabatem do 22%',
    watchesSubtitle: 'Monitoruj swoje zdrowie z rabatem do 37%',
    sneakersSubtitle: 'Podnieś swój styl z 17% zniżki + darmowa wysyłka',
    gadgetsSubtitle: 'Unowocześnij swój dom z 13% zniżki + darmowa dostawa',
    mobilitySubtitle: 'Hulajnogi i rowery elektryczne z 13% zniżki + darmowa wysyłka',
    loadingProducts: 'Ładowanie produktów...',
    
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
    oxaPay: 'Płatność Krypto przez OxaPay',
    oxaPayDescription: 'Bezpieczna płatność kryptowalutą (Bitcoin, USDT, Ethereum, itp.)',
    oxaPayInstructions: 'Postępuj zgodnie z poniższymi instrukcjami, aby ukończyć płatność kryptowalutą przez OxaPay.',
    selectPaymentMethod: 'Wybierz metodę płatności',
    bankTransferTitle: 'Przelew bankowy',
    bankTransferDescription: 'Przelej kwotę na nasze konto bankowe',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Tytuł przelewu',
    transferInstructions: 'Użyj numeru zamówienia jako tytułu przelewu',
    paymentDeposit: 'Wpłata',
    useReferenceInstruction: 'Użyj tego odniesienia jako tytułu płatności:',
    prepaidTicketsTitle: 'Karty przedpłacone (Transcash & PCS)',
    prepaidTicketsDescription: 'Prześlij nam kody swoich kart przedpłaconych',
    ticketCode: 'Kod karty',
    addTicketCode: 'Dodaj kod',
    removeTicketCode: 'Usuń kod',
    sendTicketCodes: 'Wyślij kody',
    dataProtection: 'Ochrona Danych',
    verifiedPayment: 'Zweryfikowana Płatność',
    stripe: 'Stripe',
    stripeDescription: 'Bezpieczna płatność kartą kredytową',
    cardPayment: 'Karta Kredytowa',
    cardNumber: 'Numer karty',
    expiryDate: 'Data ważności',
    cvc: 'CVC',
    cardholderName: 'Nazwisko posiadacza karty',
    paymentProcessing: 'Przetwarzanie płatności...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Główna metoda płatności',
    alternativePaymentMethods: 'Alternatywne metody płatności',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'Aby skorzystać z tej metody płatności, skontaktuj się z naszą obsługą klienta pod adresem: Contact@luxiomarket.shop. Odpowiemy szybko.',
    recommendedMethod: 'Zalecana metoda',
    alternativePaymentInstructionsTitle: 'Jak postępować?',
    alternativePaymentInstructions: 'Kliknij preferowaną metodę płatności powyżej. Spowoduje to otwarcie aplikacji e-mail z wstępnie wypełnioną wiadomością. Wyślij tę wiadomość do naszego serwisu, aby sfinalizować zamówienie. Nasz zespół odpowie jak najszybciej ze szczegółowymi instrukcjami płatności.',
    clickToViewAlternativeMethods: 'Kliknij, aby zobaczyć inne dostępne metody płatności',
    understood: 'Rozumiem',
    alternativePaymentEmailSubject: 'Płatność przez {method} - Zamówienie {amount}€',
    emailBodyIntro: 'Chciałbym sfinalizować moje zamówienie za pomocą następującej metody płatności',
    orderDetails: 'Szczegóły zamówienia',
    customerName: 'Imię i nazwisko',
    emailBodyClosing: 'Dziękuję za podanie instrukcji płatności, aby sfinalizować to zamówienie.',
    regards: 'Pozdrawiam',
    
    // Payment Notifications
    paymentSuccessTitle: 'Płatność zakończona sukcesem!',
    paymentSuccessDescription: 'Twoje zamówienie zostało potwierdzone',
    orderConfirmed: 'Zamówienie potwierdzone',
    paymentCancelledTitle: 'Płatność anulowana',
    paymentCancelledDescription: 'Płatność została anulowana. Twój koszyk jest nadal dostępny.',
    paymentPendingTitle: 'Płatność oczekująca',
    paymentPendingDescription: 'Twoja płatność jest przetwarzana. Otrzymasz potwierdzenie e-mailem.',
    paymentErrorDescription: 'Wystąpił błąd podczas płatności. Spróbuj ponownie.',
    redirectingToCryptoPayment: 'Przekierowanie do OxaPay',
    redirectingToOxaPayDescription: 'Zostaniesz przekierowany na bezpieczną stronę płatności...',
    
    // Payment Modal
    paymentModalTitle: 'Instrukcje płatności',
    paymentModalBankTransferTitle: 'Płatność przelewem bankowym',
    paymentModalBankInstructions: 'Proszę dokonać przelewu bankowego na następujące konto z numerem zamówienia jako tytułem:',
    paymentModalOtherMethodsTitle: 'Inne metody płatności',
    paymentModalOtherMethodsMessage: 'W przypadku płatności PayPal, Western Union, MoneyGram lub Ria prosimy o kontakt z naszą obsługą klienta pod adresem:',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'Zobacz instrukcje płatności',
    
    // Order Confirmation
    paymentInstructions: 'Po otrzymaniu płatności otrzymasz potwierdzenie przez email. Twoje zamówienie zostanie dostarczone w ciągu 24-48 godzin.',
    orderReceived: 'Zamówienie otrzymane',
    emailConfirmation: 'Otrzymasz potwierdzenie przez email',
    deliveryTime: 'Dostawa w ciągu 24-48 godzin',
    
    // Auth
    email: 'Email',
    password: 'Hasło',
    confirmPassword: 'Potwierdź hasło',
    fullName: 'Pełne imię',
    dontHaveAccount: 'Nie masz konta?',
    alreadyHaveAccount: 'Masz już konto?',
    loggingIn: 'Logowanie...',
    signingUp: 'Rejestracja...',
    loginSuccess: 'Logowanie udane!',
    signupSuccess: 'Rejestracja udana!',
    loginError: 'Błąd logowania',
    signupError: 'Błąd',
    invalidCredentials: 'Nieprawidłowy email lub hasło',
    
    // Reset Password Page
    invalidResetLink: 'Nieprawidłowy link',
    resetLinkInvalidOrExpired: 'Link resetujący jest nieprawidłowy lub wygasł.',
    passwordResetSuccess: 'Hasło zresetowane!',
    passwordResetSuccessMessage: 'Twoje hasło zostało pomyślnie zmienione. Przekierowywanie...',
    redirectingToHome: 'Przekierowywanie do strony głównej...',
    enterNewPasswordBelow: 'Wprowadź nowe hasło poniżej',
    fillAllFieldsError: 'Proszę wypełnić wszystkie pola',
    resettingPassword: 'Resetowanie...',
    resetPasswordButton: 'Zresetuj hasło',
    
    welcomeBack: 'Witaj ponownie',
    back: 'Wróć',
    welcome: 'Proszę sprawdzić e-mail (w tym folder spam/niechciana poczta), aby aktywować konto.',
    emailRequired: 'Email jest wymagany',
    passwordRequired: 'Hasło jest wymagane',
    emailInvalid: 'Nieprawidłowy format email',
    passwordMinLength: 'Hasło musi mieć co najmniej 6 znaków',
    passwordsDontMatch: 'Hasła nie pasują do siebie',
    confirmPasswordRequired: 'Potwierdzenie hasła jest wymagane',
    firstNameRequired: 'Imię jest wymagane',
    lastNameRequired: 'Nazwisko jest wymagane',
    countryRequired: 'Kraj jest wymagany',
    cityRequired: 'Miasto jest wymagane',
    addressRequired: 'Adres jest wymagany',
    phoneRequired: 'Telefon jest wymagany',
    validationError: 'Błąd walidacji',
    fixErrors: 'Proszę poprawić błędy w formularzu',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: 'Nie pamiętasz hasła?',
    forgotPasswordTitle: 'Zapomniane hasło',
    forgotPasswordDescription: 'Wprowadź swój adres e-mail, a wyślemy Ci link do zresetowania hasła.',
    sendResetLink: 'Wyślij link resetujący',
    sending: 'Wysyłanie...',
    backToLogin: 'Powrót do logowania',
    emailSent: 'E-mail wysłany',
    resetLinkSentDescription: 'Jeśli konto z tym e-mailem istnieje, otrzymasz link resetujący.',
    checkYourEmail: 'Sprawdź swoją pocztę',
    resetEmailSentMessage: 'Jeśli konto z adresem {email} istnieje, otrzymasz e-mail z instrukcjami resetowania hasła.',
    resetLinkExpiry: 'Link wygaśnie za 1 godzinę ze względów bezpieczeństwa.',
    emailSendError: 'Błąd wysyłania e-maila',
    errorOccurred: 'Wystąpił błąd',
    weak: 'Słabe',
    medium: 'Średnie',
    strong: 'Silne',
    passwordMinLength8: 'Co najmniej 8 znaków',
    passwordHasLetters: 'Zawiera litery',
    passwordHasNumbers: 'Zawiera cyfry',
    passwordHasAtSymbol: 'Zawiera znak @ (zalecane)',
    passwordRequirements: 'Hasło musi zawierać co najmniej 8 znaków, litery i cyfry. Znak @ jest wysoce zalecany.',
    passwordTooWeak: 'Hasło zbyt słabe. Dodaj znaki specjalne, aby zwiększyć bezpieczeństwo.',
    
    // Messages
    // Product Page
    productNotFound: 'Produkt nie znaleziony',
    backToProducts: 'Powrót do produktów',
    addedToWishlist: 'Dodano do listy życzeń',
    removedFromWishlist: 'Usunięto z listy życzeń',
    linkCopied: 'Link skopiowany do schowka',
    warranty2Years: 'Gwarancja 2 lata',
    returns30Days: 'Zwroty 30 dni',
    
    itemAddedToCart: 'Dodano do koszyka!',
    itemRemovedFromCart: 'Usunięto z koszyka',
    orderPlaced: 'Zamówienie złożone pomyślnie!',
    loginRequired: 'Zaloguj się, aby kontynuować',
    paymentSuccessful: 'Płatność udana! Zamówienie potwierdzone.',
    loggedOut: 'Wylogowano pomyślnie',
    fillRequiredFields: 'Proszę wypełnić wszystkie wymagane pola',
    pleaseCompleteThisField: 'Proszę wypełnić to pole',
    invalidEmail: 'Proszę wprowadzić poprawny adres email',
    invalidPhone: 'Proszę wprowadzić poprawny numer telefonu',
    invalidCountry: 'Proszę wprowadzić prawidłowy kraj',
    invalidCity: 'Proszę wprowadzić prawidłowe miasto',
    invalidAddress: 'Adres musi zawierać numer i nazwę ulicy',
    addressMismatch: 'Adres nie pasuje do wybranego miasta i kraju',
    addressNotInSelectedCity: 'Adres musi być w wybranym mieście',
    addressNotInSelectedCountry: 'Adres musi być w wybranym kraju',
    pleaseSelectValidAddress: 'Proszę wybrać prawidłowy adres z sugestii',
    pleaseSelectAddressFromSuggestions: 'Proszę wybrać adres z sugestii',
    selectAddressFromSuggestions: 'Proszę wybrać adres z poniższych sugestii',
    selectCountryAndCity: 'Proszę najpierw wybrać kraj i miasto',
    addressNotListedConfirm: 'Mój adres nie znajduje się na liście',
    confirmAddressNotListed: 'Potwierdzam, że mój adres jest prawidłowy, nawet jeśli nie znajduje się w sugestiach',
    addressNotListedWarning: 'Proszę upewnić się, że adres jest poprawny, ponieważ nie można go automatycznie zweryfikować',
    ticketCodeSent: 'Kody kart wysłane pomyślnie',
    enterTicketCode: 'Proszę wprowadzić co najmniej jeden kod karty',
    orderFailed: 'Zamówienie nie powiodło się. Spróbuj ponownie.',
    paymentInitFailed: 'Nie udało się zainicjować płatności. Spróbuj ponownie.',
    stripeUnavailable: 'Metoda płatności niedostępna',
    stripeUnavailableMessage: 'Ta metoda płatności jest tymczasowo niedostępna. Proszę wybrać inną metodę płatności.',
    
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
    termsOfServiceContent: 'Ceny podane są w euro z VAT. Akceptowane płatności: Przelew bankowy SEPA, Kryptowaluty przez OxaPay. Zamówienia są wysyłane w ciągu 24 godzin po natychmiastowym potwierdzeniu płatności, z wyjątkiem zwykłego przelewu (24-72h w zależności od banków). Reklamacje → email kontaktowy.',
    contactTitle: 'Kontakt',
    contactContent: 'W przypadku pytań: Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Szczegóły produktu',
    description: 'Opis',
    specifications: 'Specyfikacje',
    capacity: 'Pojemność',
    color: 'Kolor',
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
    
    // Payment Page
    backToCart: 'Wróć do koszyka',
    securedPayment: 'Bezpieczna płatność',
    choosePaymentMethod: 'Wybierz preferowaną metodę płatności',
    allTransactionsSecured: 'Wszystkie transakcje są bezpieczne i szyfrowane',
    ticketsPCS: 'Bilety PCS / TransCash',
    immediate: 'Natychmiastowa',
    ticketPaymentInstructions: 'Instrukcje płatności biletami',
    ticketInstructionsTitle: 'Instrukcje płatności biletami',
    ticketInstructionSelectType: 'Wybierz typ: PCS lub TransCash',
    ticketInstructionCode: 'Kod biletu: Wprowadź 16-cyfrowy kod (np. 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Dostępna kwota: Podaj dokładne saldo każdego biletu w euro',
    ticketInstructionMulti: 'Multi-bilety: Dodaj tyle biletów, ile potrzeba, aby osiągnąć wymaganą kwotę',
    ticketInstructionValidation: 'Walidacja: Przycisk "Zapłać" aktywuje się automatycznie, gdy suma ≥ kwota zamówienia',
    dontHaveTickets: 'Nie masz biletów?',
    buyTickets: 'Kup bilety PCS/TransCash na Recharge.com',
    ticket: 'Bilet',
    addTicket: 'Dodaj bilet',
    ticketsTotal: 'Suma biletów:',
    requiredAmount: 'Wymagana kwota:',
    insufficientAmount: 'Niewystarczająca kwota',
    amountValidated: 'Kwota zwalidowana!',
    ticketCodePlaceholder: 'Kod biletu',
    ticketAmountPlaceholder: 'Kwota (€)',
    days23: '2-3 dni',
    bankTransferInstructionsTitle: 'Instrukcje przelewu bankowego',
    bankTransferInstruction1: 'Wykonaj przelew na konto wskazane poniżej',
    bankTransferInstruction2: '⚠️ WAŻNE: OBOWIĄZKOWO podaj numer referencyjny zamówienia',
    bankTransferInstruction3: 'Kwota musi dokładnie odpowiadać wskazanej',
    bankTransferInstruction4: 'Twoje zamówienie zostanie przetworzone po otrzymaniu przelewu (2-3 dni)',
    bankTransferInstruction5: 'Otrzymasz email potwierdzający po walidacji',
    beneficiary: 'Beneficjent',
    referenceRequired: 'Numer referencyjny (OBOWIĄZKOWY)',
    amount: 'Kwota',
    copyBankDetails: 'Kopiuj dane bankowe',
    copied: 'Skopiowano!',
    recommended: 'Zalecane',
    payment100Secure: 'Płatność 100% bezpieczna',
    paymentInfoEncrypted: 'Twoje informacje płatnicze są zaszyfrowane i zabezpieczone. Nigdy nie przechowujemy Twoich danych bankowych.',
    neverStoreCardData: 'Nigdy nie przechowujemy Twoich danych bankowych',
    shippingAddress: 'Adres dostawy',
    editAddress: 'Edytuj adres',
    saveAddress: 'Zapisz adres',
    orderItems: 'Pozycje zamówienia',
    vat: 'VAT (20%)',
    totalWithVat: 'Suma z VAT',
    payNow: 'Zapłać teraz',
    orderSent: 'Zamówienie wysłane!',
    orderConfirmationEmail: 'Otrzymasz email potwierdzający (sprawdź folder spam/niechciana poczta, jeśli to konieczne).',
    orderRegistered: 'Zamówienie zarejestrowane',
    completeTransferWithReference: 'Wykonaj przelew z podanym numerem referencyjnym',
    missingAmount: 'brakuje',
    oxaPayInstructionsTitle: 'Instrukcje OxaPay',
    oxaPayInstruction1: 'Natychmiastowa i bezpieczna płatność kryptowalutą lub kartą bankową',
    oxaPayInstruction2: 'Zostaniesz przekierowany na platformę OxaPay',
    oxaPayInstruction3: 'Akceptuje: Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Twoje zamówienie zostanie potwierdzone natychmiast po płatności',
    oxaPayInstruction5: 'Bezpieczna transakcja z szyfrowaniem SSL 256-bit',
    oxaPayRecommendation: 'Zalecana metoda szybkiego przetwarzania',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Prosimy zweryfikować szczegóły przelewu przed potwierdzeniem zamówienia',
    amountToTransfer: 'Kwota do przelewu',
    instructionsLabel: 'Instrukcje:',
    transferInstruction1Short: 'Wykonaj przelew na wskazany powyżej rachunek',
    transferInstruction2Short: 'Upewnij się, że podałeś odniesienie',
    immediateTransfer: 'Przelew natychmiastowy',
    delivery24h: 'Dostawa w 24h',
    standardTransfer: 'Przelew standardowy',
    delivery4872h: '48-72h w zależności od banku',
    noCancel: 'Nie, anuluj',
    yesProceedTransfer: 'Tak, przystępuję do przelewu',
    name: 'Nazwa',
    reference: 'Odniesienie',
    importantReferenceNote: 'Ważne: Upewnij się, że podałeś odniesienie',
    viewMyOrders: 'Zobacz moje zamówienia',
    processing: 'Przetwarzanie...',
    orderReference: 'Numer zamówienia',
    paymentInitError: 'Błąd inicjalizacji płatności',
    
    // Dashboard
    hello: 'Cześć',
    welcomePersonalSpace: 'Witaj w Twoim osobistym profilu Luxio',
    totalOrders: 'Suma zamówień',
    noOrdersYet: 'Brak zamówień na razie',
    inProgress: 'W trakcie',
    ordersProcessing: 'Zamówienia w realizacji',
    delivered: 'Dostarczone',
    ordersReceived: 'Zamówienia otrzymane',
    totalSpent: 'Łącznie wydane',
    totalAmount: 'Całkowita kwota',
    orderHistory: 'Historia zamówień',
    latestOrdersStatus: 'Twoje ostatnie zamówienia i ich status',
    noOrders: 'Brak zamówień',
    noOrdersDescription: 'Nie złożyłeś jeszcze żadnego zamówienia. Odkryj nasz katalog produktów premium!',
    personalInfo: 'Informacje osobiste',
    luxioMember: 'Członek Luxio',
    accountDetails: 'Szczegóły konta',
    accountCreated: 'Konto utworzone',
    viewProfile: 'Zobacz profil',
    actionsRequired: 'Wymagane Działania',
    awaitingPayment: 'Oczekiwanie na Płatność',
    paymentReview: 'Weryfikacja Płatności',
    processingOrder: 'Przetwarzanie',
    fulfilled: 'Zrealizowane',
    completeBankTransfer: 'Dokończ Przelew',
    submitPCSCodes: 'Wyślij Kody PCS',
    openOxaPay: 'Otwórz OxaPay',
    viewInstructions: 'Zobacz Instrukcje',
    payWithin24h: 'Zapłać w ciągu 24h, aby zarezerwować zapasy',
    unpaidOrders: 'Nieopłacone Zamówienia',
    paymentPending: 'Płatność Oczekuje',
    completePayment: 'Zakończ Płatność',
    noActionsRequired: 'Brak Wymaganych Działań',
    allOrdersPaid: 'Wszystkie zamówienia są opłacone!',
    createdDaysAgo: 'Utworzono {days} dzień (dni) temu',
    createdHoursAgo: 'Utworzono {hours} godzinę (y) temu',
    createdMinutesAgo: 'Utworzono {minutes} minutę (y) temu',
    timeRemainingMinutes: 'pozostało {minutes} min',
    timeRemainingHoursMinutes: 'pozostało {hours}h {minutes}min',
    expiring: 'Wygasa...',
    timeRemaining: 'Pozostały czas:',
    reserveStock: 'Zarezerwuj zapasy',
    
    // Order Actions
    cancelOrder: 'Anuluj Zamówienie',
    cancelOrderWarning: '⚠️ Jeśli już zapłaciłeś za to zamówienie, poczekaj lub skontaktuj się z nami e-mailem. Jeśli płatność nie została jeszcze dokonana, możesz je anulować.',
    orderCancelledSuccess: '✅ Zamówienie pomyślnie anulowane.',
    paymentInstructionsTitle: 'Instrukcje Płatności',
    bankTransferInstructionsMessage: 'Dziękujemy za zamówienie! W celu dostawy w ciągu 24h, wykonaj przelew natychmiast. W przypadku przelewu standardowego, przetwarzanie może potrwać 48 do 72h w zależności od banku.',
    ticketPaymentMessage: 'Otrzymaliśmy Twoją notyfikację o zamówieniu. Obecnie weryfikujemy płatność. Otrzymasz ostateczne potwierdzenie w ciągu kilku minut.',
    oxapayConfirmationMessage: 'Płatność potwierdzona przez OxaPay. Twoje zamówienie jest w trakcie realizacji.',
    contactSupportEmail: 'Skontaktuj się z nami na support@luxio-shop.eu jeśli już zapłaciłeś.',
    confirmCancellation: 'Potwierdź Anulowanie',
    cancelAction: 'Anuluj',
    bankDetails: 'Dane Bankowe',
    paymentReference: 'Tytuł Przelewu',
    uniqueOrderNumber: 'Unikalny Numer Zamówienia',
    deliveryInfoMessage: 'W celu dostawy w ciągu 24h, wykonaj natychmiastowy przelew.',
    deliveryInfoStandard: 'Przelew standardowy: 48-72h w zależności od banku.',
    
    // User Profile
    myAccount: 'Moje Konto',
    profile: 'Profil',
    myOrders: 'Moje Zamówienia',
    settings: 'Ustawienia',
    accountSettings: 'Ustawienia konta',
    security: 'Bezpieczeństwo',
    changePassword: 'Zmień hasło',
    passwordResetDescription: 'Zresetuj hasło, aby zabezpieczyć swoje konto',
    notifications: 'Powiadomienia',
    orderNotifications: 'Powiadomienia o zamówieniach',
    priceAlerts: 'Alerty cenowe',
    promotionalNewsletter: 'Newsletter promocyjny',
    fullNameLabel: 'Pełna nazwa',
    accountStats: 'Statystyki konta',
    totalOrdersCount: 'Łącznie zamówień',
    totalSpentAmount: 'Łączne wydatki',
    orderHistoryTitle: 'Historia zamówień',
    noOrdersYetMessage: 'Brak zamówień',
    orderLabel: 'Zamówienie',
    paidStatus: 'Opłacone',
    pendingStatus: 'Oczekujące',
    user: 'Użytkownik',
    currentPassword: 'Obecne hasło',
    newPassword: 'Nowe hasło',
    confirmNewPassword: 'Potwierdź hasło',
    passwordChangeSuccess: 'Hasło zmienione pomyślnie!',
    passwordChangeFailed: 'Nie udało się zmienić hasła',
    
    // Password Visibility & Checkout
    showPassword: 'Pokaż hasło',
    hidePassword: 'Ukryj hasło',
    loginRequiredToCheckout: 'Wymagane logowanie',
    pleaseLoginOrSignupToCheckout: 'Zaloguj się lub zarejestruj, aby złożyć zamówienie.',
    goToLogin: 'Przejdź do logowania',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Smartfony, Zegarki, Buty Premium | Do 37% Zniżki',
    seoHomeDescription: 'Odkryj najnowsze smartfony, inteligentne zegarki, buty premium i gadżety high-tech ze zniżkami do 37%. Darmowa dostawa, bezpieczna płatność crypto i kartą bankową.',
    seoHomeKeywords: 'smartfon, inteligentny zegarek, buty, gadżety, high-tech, iPhone, Samsung, luksus, premium, zniżka',
    seoPremiumTitle: 'Produkty Premium - Smartfony, Zegarki, Buty | Luxio Market',
    seoPremiumDescription: 'Poznaj naszą ekskluzywną kolekcję smartfonów premium, luksusowych zegarków i markowych butów. Autentyczne produkty z gwarancją producenta i szybką dostawą.',
    seoPremiumKeywords: 'smartfon premium, luksusowy zegarek, markowe buty, autentyczne produkty, gwarancja',
    seoDashboardTitle: 'Mój Panel Kontrolny - Śledzenie Zamówień | Luxio Market',
    seoDashboardDescription: 'Śledź swoje zamówienia, zarządzaj kontem i przeglądaj historię zakupów w Luxio Market.',
    seoCartTitle: 'Koszyk - Sprawdź Swoje Zamówienie | Luxio Market',
    seoCartDescription: 'Sprawdź swój koszyk i przejdź do bezpiecznego płacenia. Darmowa dostawa na wszystkie zamówienia.',
    seoPaymentTitle: 'Bezpieczna Płatność - Dokończ Zamówienie | Luxio Market',
    seoPaymentDescription: 'Dokończ zamówienie bezpiecznie z płatnością crypto, przelewem bankowym lub kartami przedpłaconymi. Wszystkie transakcje są zaszyfrowane i bezpieczne.',
    seoCheckoutAddressTitle: 'Adres Dostawy - Zamówienie | Luxio Market',
    seoCheckoutAddressDescription: 'Potwierdź swój adres dostawy dla bezpiecznej i szybkiej wysyłki. Edytuj lub użyj zarejestrowanego adresu.',
    deliveryAddress: 'Adres dostawy',
    checkoutAddressTitle: 'Gdzie mamy dostarczyć zamówienie?',
    checkoutAddressSubtitle: 'Proszę potwierdzić lub zaktualizować adres dostawy',
    useRegisteredAddress: 'Użyj mojego zarejestrowanego adresu',
    continueToPayment: 'Kontynuuj do płatności',
    addressSaved: 'Adres zapisany pomyślnie',
    postalCode: 'Kod pocztowy',
    enterNewAddress: 'Wprowadź nowy adres',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Produkty tech premium',
    seoImageAltProduct: 'Produkt premium w obniżonej cenie',
    seoImageAltSmartphone: 'Smartfon najnowszej generacji',
    seoImageAltWatch: 'Inteligentny zegarek premium',
    seoImageAltSneaker: 'Markowe buty premium',
    seoImageAltGadget: 'Gadżet dla inteligentnego domu',
    
    // Coupons
    couponCode: 'Kod kuponu',
    applyCoupon: 'Zastosuj kupon',
    enterCouponCode: 'Wprowadź kod kuponu',
    couponApplied: 'Kupon zastosowany pomyślnie',
    couponInvalid: 'Nieprawidłowy kod kuponu',
    couponExpired: 'Ten kupon wygasł',
    couponAlreadyUsed: 'Ten kupon został już wykorzystany',
    removeCoupon: 'Usuń kupon',
    myCoupons: 'Moje Kupony',
    noCoupons: 'Brak dostępnych kuponów',
    noCouponsDescription: 'Nie masz jeszcze żadnych kuponów. Zdobądź kupony zamawiając więcej niż 2 telefony lub wydając 3000€ lub więcej.',
    couponDiscount: 'zniżki',
    couponExpires: 'Wygasa',
    couponValid: 'Ważny',
    couponUsed: 'Wykorzystany',
    copyCode: 'Kopiuj kod',
    codeCopied: 'Kod skopiowany!',
    validatingCoupon: 'Weryfikacja...'
  },
  
  it: {
    // Navigation
    navigation: 'Navigazione',
    accessSections: 'Accedi alle diverse sezioni del sito',
    home: 'Home',
    dashboard: 'Cruscotto',
    cart: 'Carrello',
    premium: 'Premium',
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
    or: 'o',
    
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
    smartphonesSubtitle: 'Dispositivi premium con sconti fino al 22%',
    watchesSubtitle: 'Monitora la tua salute con sconti fino al 37%',
    sneakersSubtitle: 'Migliora il tuo stile con 17% di sconto + spedizione gratuita',
    gadgetsSubtitle: 'Modernizza la tua casa con 13% di sconto + consegna gratuita',
    mobilitySubtitle: 'Monopattini e bici elettriche con 13% di sconto + spedizione gratuita',
    loadingProducts: 'Caricamento prodotti...',
    
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
    oxaPay: 'Pagamento Cripto tramite OxaPay',
    oxaPayDescription: 'Pagamento sicuro con criptovaluta (Bitcoin, USDT, Ethereum, ecc.)',
    oxaPayInstructions: 'Segui le istruzioni qui sotto per completare il pagamento in criptovaluta tramite OxaPay.',
    selectPaymentMethod: 'Seleziona metodo di pagamento',
    bankTransferTitle: 'Bonifico bancario',
    bankTransferDescription: 'Trasferisci l\'importo sul nostro conto bancario',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Riferimento bonifico',
    transferInstructions: 'Usa il tuo numero ordine come riferimento',
    paymentDeposit: 'Deposito',
    useReferenceInstruction: 'Usa questo riferimento come causale del pagamento:',
    prepaidTicketsTitle: 'Ticket prepagati (Transcash & PCS)',
    prepaidTicketsDescription: 'Inviaci i tuoi codici di ticket prepagati',
    ticketCode: 'Codice ticket',
    addTicketCode: 'Aggiungi codice',
    removeTicketCode: 'Rimuovi codice',
    sendTicketCodes: 'Invia codici',
    dataProtection: 'Protezione Dati',
    verifiedPayment: 'Pagamento Verificato',
    stripe: 'Stripe',
    stripeDescription: 'Pagamento sicuro con carta di credito',
    cardPayment: 'Carta di Credito',
    cardNumber: 'Numero della carta',
    expiryDate: 'Data di scadenza',
    cvc: 'CVC',
    cardholderName: 'Nome del titolare',
    paymentProcessing: 'Elaborazione pagamento...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Metodo di pagamento principale',
    alternativePaymentMethods: 'Metodi di pagamento alternativi',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'Per utilizzare questo metodo di pagamento, contatta il nostro servizio clienti a: Contact@luxiomarket.shop. Risponderemo prontamente.',
    recommendedMethod: 'Metodo Consigliato',
    alternativePaymentInstructionsTitle: 'Come procedere?',
    alternativePaymentInstructions: 'Clicca sul tuo metodo di pagamento preferito sopra. Questo aprirà la tua applicazione email con un messaggio precompilato. Invia questo messaggio al nostro servizio per finalizzare il tuo ordine. Il nostro team risponderà il prima possibile con istruzioni di pagamento dettagliate.',
    clickToViewAlternativeMethods: 'Clicca per vedere altri metodi di pagamento disponibili',
    understood: 'Compreso',
    alternativePaymentEmailSubject: 'Pagamento tramite {method} - Ordine {amount}€',
    emailBodyIntro: 'Vorrei finalizzare il mio ordine con il seguente metodo di pagamento',
    orderDetails: 'Dettagli dell\'ordine',
    customerName: 'Nome completo',
    emailBodyClosing: 'Grazie per aver fornito le istruzioni di pagamento per finalizzare questo ordine.',
    regards: 'Cordiali saluti',
    
    // Payment Notifications
    paymentSuccessTitle: 'Pagamento riuscito!',
    paymentSuccessDescription: 'Il tuo ordine è stato confermato',
    orderConfirmed: 'Ordine confermato',
    paymentCancelledTitle: 'Pagamento annullato',
    paymentCancelledDescription: 'Il pagamento è stato annullato. Il tuo carrello è ancora disponibile.',
    paymentPendingTitle: 'Pagamento in sospeso',
    paymentPendingDescription: 'Il tuo pagamento è in elaborazione. Riceverai una conferma via email.',
    paymentErrorDescription: 'Si è verificato un errore durante il pagamento. Riprova.',
    redirectingToCryptoPayment: 'Reindirizzamento a OxaPay',
    redirectingToOxaPayDescription: 'Sarai reindirizzato alla pagina di pagamento sicura...',
    
    // Payment Modal
    paymentModalTitle: 'Istruzioni di pagamento',
    paymentModalBankTransferTitle: 'Pagamento tramite bonifico bancario',
    paymentModalBankInstructions: 'Si prega di effettuare un bonifico bancario sul seguente conto con il riferimento dell\'ordine:',
    paymentModalOtherMethodsTitle: 'Altri metodi di pagamento',
    paymentModalOtherMethodsMessage: 'Per i pagamenti PayPal, Western Union, MoneyGram o Ria, si prega di contattare il nostro servizio clienti a:',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'Visualizza istruzioni di pagamento',
    
    // Order Confirmation
    paymentInstructions: 'Dopo aver ricevuto il pagamento, riceverai una conferma via email. Il tuo ordine sarà consegnato entro 24-48 ore.',
    orderReceived: 'Ordine ricevuto',
    emailConfirmation: 'Riceverai una conferma via email',
    deliveryTime: 'Consegna entro 24-48 ore',
    
    // Auth
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Conferma password',
    fullName: 'Nome completo',
    dontHaveAccount: 'Non hai un account?',
    alreadyHaveAccount: 'Hai già un account?',
    loggingIn: 'Accesso in corso...',
    signingUp: 'Registrazione in corso...',
    loginSuccess: 'Accesso riuscito!',
    signupSuccess: 'Registrazione riuscita!',
    loginError: 'Errore di accesso',
    signupError: 'Errore',
    invalidCredentials: 'Email o password non corretta',
    
    // Reset Password Page
    invalidResetLink: 'Link non valido',
    resetLinkInvalidOrExpired: 'Il link di reimpostazione non è valido o è scaduto.',
    passwordResetSuccess: 'Password reimpostata!',
    passwordResetSuccessMessage: 'La tua password è stata modificata con successo. Reindirizzamento...',
    redirectingToHome: 'Reindirizzamento alla home...',
    enterNewPasswordBelow: 'Inserisci la tua nuova password qui sotto',
    fillAllFieldsError: 'Si prega di compilare tutti i campi',
    resettingPassword: 'Reimpostazione...',
    resetPasswordButton: 'Reimposta password',
    
    welcomeBack: 'Bentornato',
    back: 'Indietro',
    welcome: 'Si prega di verificare la propria email (inclusa la cartella spam/posta indesiderata) per attivare l\'account.',
    emailRequired: 'L\'email è obbligatoria',
    passwordRequired: 'La password è obbligatoria',
    emailInvalid: 'Formato email non valido',
    passwordMinLength: 'La password deve contenere almeno 6 caratteri',
    passwordsDontMatch: 'Le password non corrispondono',
    confirmPasswordRequired: 'La conferma della password è obbligatoria',
    firstNameRequired: 'Il nome è obbligatorio',
    lastNameRequired: 'Il cognome è obbligatorio',
    countryRequired: 'Il paese è obbligatorio',
    cityRequired: 'La città è obbligatoria',
    addressRequired: 'L\'indirizzo è obbligatorio',
    phoneRequired: 'Il telefono è obbligatorio',
    validationError: 'Errore di validazione',
    fixErrors: 'Si prega di correggere gli errori nel modulo',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: 'Password dimenticata?',
    forgotPasswordTitle: 'Password dimenticata',
    forgotPasswordDescription: 'Inserisci il tuo indirizzo email e ti invieremo un link per reimpostare la password.',
    sendResetLink: 'Invia link di ripristino',
    sending: 'Invio in corso...',
    backToLogin: 'Torna al login',
    emailSent: 'Email inviata',
    resetLinkSentDescription: 'Se esiste un account con questa email, riceverai un link di ripristino.',
    checkYourEmail: 'Controlla la tua email',
    resetEmailSentMessage: 'Se esiste un account con l\'indirizzo {email}, riceverai un\'email con istruzioni per reimpostare la password.',
    resetLinkExpiry: 'Il link scadrà tra 1 ora per motivi di sicurezza.',
    emailSendError: 'Errore nell\'invio dell\'email',
    errorOccurred: 'Si è verificato un errore',
    weak: 'Debole',
    medium: 'Media',
    strong: 'Forte',
    passwordMinLength8: 'Almeno 8 caratteri',
    passwordHasLetters: 'Contiene lettere',
    passwordHasNumbers: 'Contiene numeri',
    passwordHasAtSymbol: 'Contiene il carattere @ (consigliato)',
    passwordRequirements: 'La password deve contenere almeno 8 caratteri, lettere e numeri. Il carattere @ è altamente consigliato.',
    passwordTooWeak: 'Password troppo debole. Aggiungi caratteri speciali per migliorare la sicurezza.',
    
    // Messages
    // Product Page
    productNotFound: 'Prodotto non trovato',
    backToProducts: 'Torna ai prodotti',
    addedToWishlist: 'Aggiunto ai preferiti',
    removedFromWishlist: 'Rimosso dai preferiti',
    linkCopied: 'Link copiato negli appunti',
    warranty2Years: 'Garanzia 2 anni',
    returns30Days: 'Resi 30 giorni',
    
    itemAddedToCart: 'Articolo aggiunto al carrello!',
    itemRemovedFromCart: 'Articolo rimosso dal carrello',
    orderPlaced: 'Ordine effettuato con successo!',
    loginRequired: 'Accedi per continuare il checkout',
    paymentSuccessful: 'Pagamento riuscito! Ordine confermato.',
    loggedOut: 'Disconnesso con successo',
    fillRequiredFields: 'Compila tutti i campi obbligatori',
    pleaseCompleteThisField: 'Si prega di compilare questo campo',
    invalidEmail: 'Inserisci un indirizzo email valido',
    invalidPhone: 'Inserisci un numero di telefono valido',
    invalidCountry: 'Inserisci un paese valido',
    invalidCity: 'Inserisci una città valida',
    invalidAddress: 'L\'indirizzo deve contenere un numero e il nome della via',
    addressMismatch: 'L\'indirizzo non corrisponde alla città e al paese selezionati',
    addressNotInSelectedCity: 'L\'indirizzo deve essere nella città selezionata',
    addressNotInSelectedCountry: 'L\'indirizzo deve essere nel paese selezionato',
    pleaseSelectValidAddress: 'Si prega di selezionare un indirizzo valido dai suggerimenti',
    pleaseSelectAddressFromSuggestions: 'Si prega di selezionare un indirizzo dai suggerimenti',
    selectAddressFromSuggestions: 'Si prega di selezionare un indirizzo dai suggerimenti qui sotto',
    selectCountryAndCity: 'Si prega di selezionare prima il paese e la città',
    addressNotListedConfirm: 'Il mio indirizzo non è elencato',
    confirmAddressNotListed: 'Confermo che il mio indirizzo è corretto anche se non compare nei suggerimenti',
    addressNotListedWarning: 'Si prega di assicurarsi che l\'indirizzo sia corretto poiché non può essere convalidato automaticamente',
    ticketCodeSent: 'Codici ticket inviati con successo',
    enterTicketCode: 'Inserisci almeno un codice ticket',
    orderFailed: 'Ordine fallito. Riprova.',
    paymentInitFailed: 'Inizializzazione del pagamento fallita. Riprova.',
    stripeUnavailable: 'Metodo di pagamento non disponibile',
    stripeUnavailableMessage: 'Questo metodo di pagamento è temporaneamente non disponibile. Si prega di scegliere un altro metodo di pagamento.',
    
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
    termsOfServiceContent: 'I prezzi sono in euro IVA inclusa. Pagamenti accettati: Bonifico bancario SEPA, Cripto tramite OxaPay. Gli ordini vengono spediti entro 24 ore dopo la conferma del pagamento immediato, tranne bonifico ordinario (24-72h a seconda delle banche). Reclami → email di contatto.',
    contactTitle: 'Contatti',
    contactContent: 'Per qualsiasi domanda: Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Dettagli prodotto',
    description: 'Descrizione',
    specifications: 'Specifiche',
    capacity: 'Capacità',
    color: 'Colore',
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
    
    // Payment Page
    backToCart: 'Torna al carrello',
    securedPayment: 'Pagamento sicuro',
    choosePaymentMethod: 'Scegli il tuo metodo di pagamento preferito',
    allTransactionsSecured: 'Tutte le transazioni sono sicure e crittografate',
    ticketsPCS: 'Biglietti PCS / TransCash',
    immediate: 'Immediato',
    ticketPaymentInstructions: 'Istruzioni per il pagamento con biglietti',
    ticketInstructionsTitle: 'Istruzioni per il pagamento con biglietti',
    ticketInstructionSelectType: 'Seleziona il tipo: PCS o TransCash',
    ticketInstructionCode: 'Codice biglietto: Inserisci il codice a 16 cifre (es: 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Importo disponibile: Indica il saldo esatto di ogni biglietto in euro',
    ticketInstructionMulti: 'Multi-biglietti: Aggiungi tutti i biglietti necessari per raggiungere l\'importo richiesto',
    ticketInstructionValidation: 'Convalida: Il pulsante "Paga" si attiva automaticamente quando il totale ≥ importo dell\'ordine',
    dontHaveTickets: 'Non hai biglietti?',
    buyTickets: 'Acquista biglietti PCS/TransCash su Recharge.com',
    ticket: 'Biglietto',
    addTicket: 'Aggiungi un biglietto',
    ticketsTotal: 'Totale biglietti:',
    requiredAmount: 'Importo richiesto:',
    insufficientAmount: 'Importo insufficiente',
    amountValidated: 'Importo convalidato!',
    ticketCodePlaceholder: 'Codice biglietto',
    ticketAmountPlaceholder: 'Importo (€)',
    days23: '2-3 giorni',
    bankTransferInstructionsTitle: 'Istruzioni per bonifico bancario',
    bankTransferInstruction1: 'Effettua un bonifico sul conto indicato di seguito',
    bankTransferInstruction2: '⚠️ IMPORTANTE: Indica OBBLIGATORIAMENTE il riferimento dell\'ordine',
    bankTransferInstruction3: 'L\'importo deve corrispondere esattamente a quello indicato',
    bankTransferInstruction4: 'Il tuo ordine sarà elaborato dopo aver ricevuto il bonifico (2-3 giorni)',
    bankTransferInstruction5: 'Riceverai un\'email di conferma dopo la convalida',
    beneficiary: 'Beneficiario',
    referenceRequired: 'Riferimento (OBBLIGATORIO)',
    amount: 'Importo',
    copyBankDetails: 'Copia dati bancari',
    copied: 'Copiato!',
    recommended: 'Consigliato',
    payment100Secure: 'Pagamento 100% sicuro',
    paymentInfoEncrypted: 'Le tue informazioni di pagamento sono crittografate e protette. Non memorizziamo mai i tuoi dati bancari.',
    neverStoreCardData: 'Non memorizziamo mai i tuoi dati bancari',
    shippingAddress: 'Indirizzo di spedizione',
    editAddress: 'Modifica indirizzo',
    saveAddress: 'Salva indirizzo',
    orderItems: 'Articoli dell\'ordine',
    vat: 'IVA (20%)',
    totalWithVat: 'Totale con IVA',
    payNow: 'Paga ora',
    orderSent: 'Ordine inviato!',
    orderConfirmationEmail: 'Riceverai un\'email di conferma (controlla la cartella spam/posta indesiderata se necessario).',
    orderRegistered: 'Ordine registrato',
    completeTransferWithReference: 'Completa il bonifico con il riferimento indicato',
    missingAmount: 'mancante',
    oxaPayInstructionsTitle: 'Istruzioni OxaPay',
    oxaPayInstruction1: 'Pagamento istantaneo e sicuro tramite criptovaluta o carta bancaria',
    oxaPayInstruction2: 'Verrai reindirizzato alla piattaforma OxaPay',
    oxaPayInstruction3: 'Accetta: Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Il tuo ordine sarà confermato immediatamente dopo il pagamento',
    oxaPayInstruction5: 'Transazione sicura con crittografia SSL a 256 bit',
    oxaPayRecommendation: 'Metodo consigliato per elaborazione rapida',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Si prega di verificare i dettagli del bonifico prima di confermare l\'ordine',
    amountToTransfer: 'Importo da trasferire',
    instructionsLabel: 'Istruzioni:',
    transferInstruction1Short: 'Effettuare il bonifico sul conto indicato sopra',
    transferInstruction2Short: 'Assicurarsi di indicare il riferimento',
    immediateTransfer: 'Bonifico immediato',
    delivery24h: 'Consegna in 24h',
    standardTransfer: 'Bonifico standard',
    delivery4872h: '48-72h a seconda della banca',
    noCancel: 'No, annulla',
    yesProceedTransfer: 'Sì, procedo con il bonifico',
    name: 'Nome',
    reference: 'Riferimento',
    importantReferenceNote: 'Importante: Assicurarsi di indicare il riferimento',
    viewMyOrders: 'Visualizza i miei ordini',
    processing: 'Elaborazione...',
    orderReference: 'Riferimento ordine',
    paymentInitError: 'Errore nell\'inizializzazione del pagamento',
    
    // Dashboard
    hello: 'Ciao',
    welcomePersonalSpace: 'Benvenuto nel tuo spazio personale Luxio',
    totalOrders: 'Ordini totali',
    noOrdersYet: 'Nessun ordine per ora',
    inProgress: 'In corso',
    ordersProcessing: 'Ordini in elaborazione',
    delivered: 'Consegnati',
    ordersReceived: 'Ordini ricevuti',
    totalSpent: 'Totale speso',
    totalAmount: 'Importo totale',
    orderHistory: 'Storico ordini',
    latestOrdersStatus: 'I tuoi ultimi ordini e il loro stato',
    noOrders: 'Nessun ordine',
    noOrdersDescription: 'Non hai ancora effettuato nessun ordine. Scopri il nostro catalogo di prodotti premium!',
    personalInfo: 'Informazioni personali',
    luxioMember: 'Membro Luxio',
    accountDetails: 'Dettagli del tuo account',
    accountCreated: 'Account creato',
    viewProfile: 'Vedi profilo',
    actionsRequired: 'Azioni Richieste',
    awaitingPayment: 'In Attesa di Pagamento',
    paymentReview: 'Revisione Pagamento',
    processingOrder: 'In Elaborazione',
    fulfilled: 'Completato',
    completeBankTransfer: 'Completa Bonifico',
    submitPCSCodes: 'Invia Codici PCS',
    openOxaPay: 'Apri OxaPay',
    viewInstructions: 'Vedi Istruzioni',
    payWithin24h: 'Paga entro 24h per riservare le scorte',
    unpaidOrders: 'Ordini Non Pagati',
    paymentPending: 'Pagamento in Sospeso',
    completePayment: 'Completa Pagamento',
    noActionsRequired: 'Nessuna Azione Richiesta',
    allOrdersPaid: 'Tutti i tuoi ordini sono pagati!',
    createdDaysAgo: 'Creato {days} giorno/i fa',
    createdHoursAgo: 'Creato {hours} ora/e fa',
    createdMinutesAgo: 'Creato {minutes} minuto/i fa',
    timeRemainingMinutes: '{minutes} min rimanenti',
    timeRemainingHoursMinutes: '{hours}h {minutes}min rimanenti',
    expiring: 'In scadenza...',
    timeRemaining: 'Tempo rimanente:',
    reserveStock: 'Riserva scorte',
    
    // Order Actions
    cancelOrder: 'Annulla Ordine',
    cancelOrderWarning: '⚠️ Se hai già pagato questo ordine, attendi o contattaci via e-mail. Se il pagamento non è ancora stato effettuato, puoi annullarlo.',
    orderCancelledSuccess: '✅ Ordine annullato con successo.',
    paymentInstructionsTitle: 'Istruzioni di Pagamento',
    bankTransferInstructionsMessage: 'Grazie per il tuo ordine! Per la consegna entro 24h, effettua il bonifico immediatamente. In caso di bonifico standard, il processing può richiedere 48-72h a seconda della tua banca.',
    ticketPaymentMessage: 'Abbiamo ricevuto la tua notifica dell\'ordine. Stiamo attualmente verificando il pagamento. Riceverai una conferma definitiva entro pochi minuti.',
    oxapayConfirmationMessage: 'Pagamento confermato tramite OxaPay. Il tuo ordine è in elaborazione.',
    contactSupportEmail: 'Contattaci a support@luxio-shop.eu se hai già pagato.',
    confirmCancellation: 'Conferma Annullamento',
    cancelAction: 'Annulla',
    bankDetails: 'Dati Bancari',
    paymentReference: 'Causale Pagamento',
    uniqueOrderNumber: 'Numero Ordine Unico',
    deliveryInfoMessage: 'Per la consegna entro 24h, effettua un bonifico immediato.',
    deliveryInfoStandard: 'Bonifico standard: 48-72h a seconda della tua banca.',
    
    // User Profile
    myAccount: 'Il Mio Account',
    profile: 'Profilo',
    myOrders: 'I Miei Ordini',
    settings: 'Impostazioni',
    accountSettings: 'Impostazioni dell\'account',
    security: 'Sicurezza',
    changePassword: 'Cambia password',
    passwordResetDescription: 'Reimposta la password per proteggere il tuo account',
    notifications: 'Notifiche',
    orderNotifications: 'Notifiche ordini',
    priceAlerts: 'Avvisi sui prezzi',
    promotionalNewsletter: 'Newsletter promozionale',
    fullNameLabel: 'Nome completo',
    accountStats: 'Statistiche account',
    totalOrdersCount: 'Ordini totali',
    totalSpentAmount: 'Totale speso',
    orderHistoryTitle: 'Storico ordini',
    noOrdersYetMessage: 'Nessun ordine ancora',
    orderLabel: 'Ordine',
    paidStatus: 'Pagato',
    pendingStatus: 'In attesa',
    user: 'Utente',
    currentPassword: 'Password attuale',
    newPassword: 'Nuova password',
    confirmNewPassword: 'Conferma password',
    passwordChangeSuccess: 'Password cambiata con successo!',
    passwordChangeFailed: 'Impossibile cambiare la password',
    
    // Password Visibility & Checkout
    showPassword: 'Mostra password',
    hidePassword: 'Nascondi password',
    loginRequiredToCheckout: 'Accesso richiesto',
    pleaseLoginOrSignupToCheckout: 'Effettua il login o registrati per effettuare l\'ordine.',
    goToLogin: 'Vai al Login',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Smartphone, Orologi, Sneakers Premium | Fino al 37% di Sconto',
    seoHomeDescription: 'Scopri gli ultimi smartphone, smartwatch, sneakers premium e gadget high-tech con sconti fino al 37%. Spedizione gratuita, pagamento sicuro con crypto e carta bancaria.',
    seoHomeKeywords: 'smartphone, smartwatch, sneakers, gadget, high-tech, iPhone, Samsung, lusso, premium, sconto',
    seoPremiumTitle: 'Prodotti Premium - Smartphone, Orologi, Sneakers | Luxio Market',
    seoPremiumDescription: 'Esplora la nostra collezione esclusiva di smartphone premium, orologi di lusso e sneakers di design. Prodotti autentici con garanzia del produttore e consegna rapida.',
    seoPremiumKeywords: 'smartphone premium, orologio lusso, sneakers designer, prodotti autentici, garanzia',
    seoDashboardTitle: 'Il Mio Cruscotto - Tracciamento Ordini | Luxio Market',
    seoDashboardDescription: 'Traccia i tuoi ordini, gestisci il tuo account e consulta la cronologia degli acquisti su Luxio Market.',
    seoCartTitle: 'Carrello - Verifica il Tuo Ordine | Luxio Market',
    seoCartDescription: 'Consulta il tuo carrello e procedi al pagamento sicuro. Spedizione gratuita su tutti gli ordini.',
    seoPaymentTitle: 'Pagamento Sicuro - Completa il Tuo Ordine | Luxio Market',
    seoPaymentDescription: 'Completa il tuo ordine in sicurezza con pagamento crypto, bonifico bancario o carte prepagate. Tutte le transazioni sono crittografate e sicure.',
    seoCheckoutAddressTitle: 'Indirizzo di Consegna - Ordine | Luxio Market',
    seoCheckoutAddressDescription: 'Conferma il tuo indirizzo di consegna per una spedizione sicura e veloce. Modifica o usa il tuo indirizzo registrato.',
    deliveryAddress: 'Indirizzo di consegna',
    checkoutAddressTitle: 'Dove dobbiamo consegnare il tuo ordine?',
    checkoutAddressSubtitle: 'Per favore conferma o aggiorna il tuo indirizzo di consegna',
    useRegisteredAddress: 'Usa il mio indirizzo registrato',
    continueToPayment: 'Continua al pagamento',
    addressSaved: 'Indirizzo salvato con successo',
    postalCode: 'Codice postale',
    enterNewAddress: 'Inserisci un nuovo indirizzo',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Prodotti tech premium',
    seoImageAltProduct: 'Prodotto premium a prezzo scontato',
    seoImageAltSmartphone: 'Smartphone di ultima generazione',
    seoImageAltWatch: 'Smartwatch premium',
    seoImageAltSneaker: 'Sneakers premium di design',
    seoImageAltGadget: 'Gadget per casa intelligente',
    
    // Coupons
    couponCode: 'Codice coupon',
    applyCoupon: 'Applica coupon',
    enterCouponCode: 'Inserisci il codice coupon',
    couponApplied: 'Coupon applicato con successo',
    couponInvalid: 'Codice coupon non valido',
    couponExpired: 'Questo coupon è scaduto',
    couponAlreadyUsed: 'Questo coupon è già stato utilizzato',
    removeCoupon: 'Rimuovi coupon',
    myCoupons: 'I Miei Coupon',
    noCoupons: 'Nessun coupon disponibile',
    noCouponsDescription: 'Non hai ancora coupon. Guadagna coupon ordinando più di 2 telefoni o spendendo 3000€ o più.',
    couponDiscount: 'di sconto',
    couponExpires: 'Scade il',
    couponValid: 'Valido',
    couponUsed: 'Usato',
    copyCode: 'Copia codice',
    codeCopied: 'Codice copiato!',
    validatingCoupon: 'Validazione...'
  },
  
  hu: {
    // Navigation
    navigation: 'Navigáció',
    accessSections: 'Hozzáférés a webhely különböző szakaszaihoz',
    home: 'Kezdőlap',
    dashboard: 'Irányítópult',
    cart: 'Kosár',
    premium: 'Prémium',
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
    or: 'vagy',
    
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
    smartphonesSubtitle: 'Prémium eszközök akár 22% kedvezménnyel',
    watchesSubtitle: 'Kövesse nyomon egészségét akár 37% kedvezménnyel',
    sneakersSubtitle: 'Emelje stílusát 17% kedvezménnyel + ingyenes szállítás',
    gadgetsSubtitle: 'Modernizálja otthonát 13% kedvezménnyel + ingyenes kiszállítás',
    mobilitySubtitle: 'Elektromos rollerek és kerékpárok 13% kedvezménnyel + ingyenes szállítás',
    loadingProducts: 'Termékek betöltése...',
    
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
    oxaPay: 'Kripto Fizetés OxaPay-en keresztül',
    oxaPayDescription: 'Biztonságos fizetés kriptovalutával (Bitcoin, USDT, Ethereum, stb.)',
    oxaPayInstructions: 'Kövesse az alábbi utasításokat a kriptovaluta fizetés befejezéséhez az OxaPay-en keresztül.',
    selectPaymentMethod: 'Fizetési mód kiválasztása',
    bankTransferTitle: 'Banki átutalás',
    bankTransferDescription: 'Utalja át az összeget a bankszámlánkra',
    ibanLabel: 'IBAN',
    bicLabel: 'BIC',
    transferReference: 'Átutalás hivatkozása',
    transferInstructions: 'Használja rendelésszámát hivatkozásként',
    paymentDeposit: 'Befizetés',
    useReferenceInstruction: 'Használd ezt a hivatkozást fizetési megjegyzésként:',
    prepaidTicketsTitle: 'Feltöltőkártyák (Transcash & PCS)',
    prepaidTicketsDescription: 'Küldje el nekünk feltöltőkártya kódjait',
    ticketCode: 'Kártya kód',
    addTicketCode: 'Kód hozzáadása',
    removeTicketCode: 'Kód eltávolítása',
    sendTicketCodes: 'Kódok küldése',
    dataProtection: 'Adatvédelem',
    verifiedPayment: 'Ellenőrzött Fizetés',
    stripe: 'Stripe',
    stripeDescription: 'Biztonságos bankkártya fizetés',
    cardPayment: 'Bankkártya',
    cardNumber: 'Kártyaszám',
    expiryDate: 'Lejárati dátum',
    cvc: 'CVC',
    cardholderName: 'Kártyabirtokos neve',
    paymentProcessing: 'Fizetés feldolgozása...',
    
    // Alternative Payment Methods
    mainPaymentMethod: 'Fő fizetési mód',
    alternativePaymentMethods: 'Alternatív fizetési módok',
    paypal: 'PayPal',
    westernUnion: 'Western Union',
    moneyGram: 'MoneyGram',
    ria: 'Ria',
    alternativePaymentMessage: 'A fizetési mód használatához kérjük, lépjen kapcsolatba ügyfélszolgálatunkkal: Contact@luxiomarket.shop. Gyorsan válaszolunk.',
    recommendedMethod: 'Ajánlott módszer',
    alternativePaymentInstructionsTitle: 'Hogyan kell eljárni?',
    alternativePaymentInstructions: 'Kattintson a fenti preferált fizetési módra. Ez megnyitja az e-mail alkalmazást egy előre kitöltött üzenettel. Küldje el ezt az üzenetet szolgáltatásunknak a rendelés véglegesítéséhez. Csapatunk a lehető leghamarabb válaszol részletes fizetési utasításokkal.',
    clickToViewAlternativeMethods: 'Kattintson más elérhető fizetési módok megtekintéséhez',
    understood: 'Értettem',
    alternativePaymentEmailSubject: 'Fizetés {method} által - Rendelés {amount}€',
    emailBodyIntro: 'Szeretném véglegesíteni rendelésemet a következő fizetési móddal',
    orderDetails: 'Rendelés részletei',
    customerName: 'Teljes név',
    emailBodyClosing: 'Köszönöm a fizetési utasítások megadását a rendelés véglegesítéséhez.',
    regards: 'Üdvözlettel',
    
    // Payment Notifications
    paymentSuccessTitle: 'Sikeres fizetés!',
    paymentSuccessDescription: 'Rendelése megerősítve lett',
    orderConfirmed: 'Rendelés megerősítve',
    paymentCancelledTitle: 'Fizetés megszakítva',
    paymentCancelledDescription: 'A fizetés megszakításra került. A kosara továbbra is elérhető.',
    paymentPendingTitle: 'Függőben lévő fizetés',
    paymentPendingDescription: 'Fizetése feldolgozás alatt áll. E-mailben megerősítést kap.',
    paymentErrorDescription: 'Hiba történt a fizetés során. Kérjük, próbálja újra.',
    redirectingToCryptoPayment: 'Átirányítás a OxaPay-hez',
    redirectingToOxaPayDescription: 'Hamarosan átirányítjuk a biztonságos fizetési oldalra...',
    
    // Payment Modal
    paymentModalTitle: 'Fizetési útmutató',
    paymentModalBankTransferTitle: 'Banki átutalással történő fizetés',
    paymentModalBankInstructions: 'Kérjük, utalja át az összeget a következő bankszámlára a rendelésszámával együtt:',
    paymentModalOtherMethodsTitle: 'Egyéb fizetési módok',
    paymentModalOtherMethodsMessage: 'PayPal, Western Union, MoneyGram vagy Ria fizetéshez kérjük, lépjen kapcsolatba ügyfélszolgálatunkkal:',
    paymentModalContactEmail: 'Contact@luxiomarket.shop',
    viewPaymentInstructions: 'Fizetési útmutató megtekintése',
    
    // Order Confirmation
    paymentInstructions: 'A fizetés kézhezvétele után e-mail megerősítést kap. Rendelését 24-48 órán belül kiszállítjuk.',
    orderReceived: 'Rendelés megkapva',
    emailConfirmation: 'E-mail megerősítést fog kapni',
    deliveryTime: 'Kiszállítás 24-48 órán belül',
    
    // Auth
    email: 'E-mail',
    password: 'Jelszó',
    confirmPassword: 'Jelszó megerősítése',
    fullName: 'Teljes név',
    dontHaveAccount: 'Nincs fiókja?',
    alreadyHaveAccount: 'Már van fiókja?',
    loggingIn: 'Bejelentkezés...',
    signingUp: 'Regisztráció...',
    loginSuccess: 'Sikeres bejelentkezés!',
    signupSuccess: 'Sikeres regisztráció!',
    loginError: 'Bejelentkezési hiba',
    signupError: 'Hiba',
    invalidCredentials: 'Helytelen e-mail cím vagy jelszó',
    
    // Reset Password Page
    invalidResetLink: 'Érvénytelen link',
    resetLinkInvalidOrExpired: 'A visszaállítási link érvénytelen vagy lejárt.',
    passwordResetSuccess: 'Jelszó visszaállítva!',
    passwordResetSuccessMessage: 'Jelszava sikeresen megváltoztatva. Átirányítás...',
    redirectingToHome: 'Átirányítás a főoldalra...',
    enterNewPasswordBelow: 'Adja meg új jelszavát alább',
    fillAllFieldsError: 'Kérjük, töltse ki az összes mezőt',
    resettingPassword: 'Visszaállítás...',
    resetPasswordButton: 'Jelszó visszaállítása',
    
    welcomeBack: 'Üdvözöljük újra',
    back: 'Vissza',
    welcome: 'Kérjük, ellenőrizze e-mailjét (beleértve a spam/levélszemét mappát) a fiókja aktiválásához.',
    emailRequired: 'Az e-mail cím kötelező',
    passwordRequired: 'A jelszó kötelező',
    emailInvalid: 'Érvénytelen e-mail formátum',
    passwordMinLength: 'A jelszónak legalább 6 karakterből kell állnia',
    passwordsDontMatch: 'A jelszavak nem egyeznek',
    confirmPasswordRequired: 'A jelszó megerősítése kötelező',
    firstNameRequired: 'A keresztnév kötelező',
    lastNameRequired: 'A vezetéknév kötelező',
    countryRequired: 'Az ország kötelező',
    cityRequired: 'A város kötelező',
    addressRequired: 'A cím kötelező',
    phoneRequired: 'A telefonszám kötelező',
    validationError: 'Érvényesítési hiba',
    fixErrors: 'Kérjük, javítsa ki a hibákat az űrlapon',
    emailPlaceholder: '',
    firstNamePlaceholder: '',
    lastNamePlaceholder: '',
    countryPlaceholder: '',
    cityPlaceholder: '',
    addressPlaceholder: '',
    phonePlaceholder: '',
    forgotPassword: 'Elfelejtette jelszavát?',
    forgotPasswordTitle: 'Elfelejtett jelszó',
    forgotPasswordDescription: 'Adja meg e-mail címét, és küldünk egy linket a jelszó visszaállításához.',
    sendResetLink: 'Visszaállítási link küldése',
    sending: 'Küldés...',
    backToLogin: 'Vissza a bejelentkezéshez',
    emailSent: 'E-mail elküldve',
    resetLinkSentDescription: 'Ha létezik fiók ezzel az e-maillel, kap egy visszaállítási linket.',
    checkYourEmail: 'Ellenőrizze e-mailjét',
    resetEmailSentMessage: 'Ha létezik fiók a(z) {email} címmel, kap egy e-mailt a jelszó visszaállításához szükséges utasításokkal.',
    resetLinkExpiry: 'A link biztonsági okokból 1 óra múlva lejár.',
    emailSendError: 'Hiba az e-mail küldésekor',
    errorOccurred: 'Hiba történt',
    weak: 'Gyenge',
    medium: 'Közepes',
    strong: 'Erős',
    passwordMinLength8: 'Legalább 8 karakter',
    passwordHasLetters: 'Tartalmaz betűket',
    passwordHasNumbers: 'Tartalmaz számokat',
    passwordHasAtSymbol: '@ karaktert tartalmaz (ajánlott)',
    passwordRequirements: 'A jelszónak legalább 8 karaktert, betűket és számokat kell tartalmaznia. Az @ karakter erősen ajánlott.',
    passwordTooWeak: 'A jelszó túl gyenge. Adjon hozzá speciális karaktereket a biztonság növelése érdekében.',
    
    // Messages
    // Product Page
    productNotFound: 'Termék nem található',
    backToProducts: 'Vissza a termékekhez',
    addedToWishlist: 'Hozzáadva a kívánságlistához',
    removedFromWishlist: 'Eltávolítva a kívánságlistáról',
    linkCopied: 'Link másolva a vágólapra',
    warranty2Years: '2 év garancia',
    returns30Days: '30 napos visszatérítés',
    
    itemAddedToCart: 'Termék hozzáadva a kosárhoz!',
    itemRemovedFromCart: 'Termék eltávolítva a kosárból',
    orderPlaced: 'Rendelés sikeresen leadva!',
    loginRequired: 'Jelentkezzen be a folytatáshoz',
    paymentSuccessful: 'Sikeres fizetés! Rendelés megerősítve.',
    loggedOut: 'Sikeresen kijelentkezett',
    fillRequiredFields: 'Töltse ki az összes kötelező mezőt',
    pleaseCompleteThisField: 'Kérjük, töltse ki ezt a mezőt',
    invalidEmail: 'Adjon meg érvényes e-mail címet',
    invalidPhone: 'Adjon meg érvényes telefonszámot',
    invalidCountry: 'Adjon meg érvényes országot',
    invalidCity: 'Adjon meg érvényes várost',
    invalidAddress: 'A címnek tartalmaznia kell egy házszámot és utcanevet',
    addressMismatch: 'A cím nem egyezik a kiválasztott várossal és országgal',
    addressNotInSelectedCity: 'A címnek a kiválasztott városban kell lennie',
    addressNotInSelectedCountry: 'A címnek a kiválasztott országban kell lennie',
    pleaseSelectValidAddress: 'Kérjük, válasszon érvényes címet a javaslatokból',
    pleaseSelectAddressFromSuggestions: 'Kérjük, válasszon címet a javaslatokból',
    selectAddressFromSuggestions: 'Kérjük, válasszon címet az alábbi javaslatokból',
    selectCountryAndCity: 'Kérjük, először válassza ki az országot és a várost',
    addressNotListedConfirm: 'A címem nincs felsorolva',
    confirmAddressNotListed: 'Megerősítem, hogy a címem helyes, még akkor is, ha nem szerepel a javaslatokban',
    addressNotListedWarning: 'Kérjük, győződjön meg arról, hogy a címe helyes, mivel nem lehet automatikusan ellenőrizni',
    ticketCodeSent: 'Kártya kódok sikeresen elküldve',
    enterTicketCode: 'Kérjük, adjon meg legalább egy kártya kódot',
    orderFailed: 'Rendelés sikertelen. Kérjük, próbálja újra.',
    paymentInitFailed: 'A fizetés inicializálása sikertelen. Kérjük, próbálja újra.',
    stripeUnavailable: 'Fizetési mód nem elérhető',
    stripeUnavailableMessage: 'Ez a fizetési mód átmenetileg nem elérhető. Kérjük, válasszon másik fizetési módot.',
    
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
    termsOfServiceContent: 'Az árak euróban vannak ÁFA-val. Elfogadott fizetések: SEPA banki átutalás, Kripto OxaPay-en keresztül. A rendeléseket 24 órán belül szállítjuk ki az azonnali fizetés megerősítése után, kivéve rendes átutalást (24-72h bankoktól függően). Panaszok → kapcsolati e-mail.',
    contactTitle: 'Kapcsolat',
    contactContent: 'Bármilyen kérdés esetén: Contact@luxiomarket.shop',
    
    // Product Details
    productDetails: 'Termék részletek',
    description: 'Leírás',
    specifications: 'Specifikációk',
    capacity: 'Kapacitás',
    color: 'Szín',
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
    
    // Payment Page
    backToCart: 'Vissza a kosárhoz',
    securedPayment: 'Biztonságos fizetés',
    choosePaymentMethod: 'Válassza ki az Ön által preferált fizetési módot',
    allTransactionsSecured: 'Minden tranzakció biztonságos és titkosított',
    ticketsPCS: 'PCS / TransCash jegyek',
    immediate: 'Azonnali',
    ticketPaymentInstructions: 'Útmutató a jegyes fizetéshez',
    ticketInstructionsTitle: 'Útmutató a jegyes fizetéshez',
    ticketInstructionSelectType: 'Válassza ki a típust: PCS vagy TransCash',
    ticketInstructionCode: 'Jegykód: Írja be a 16 számjegyű kódot (pl: 1234 5678 9012 3456)',
    ticketInstructionAmount: 'Elérhető összeg: Adja meg minden jegy pontos egyenlegét euróban',
    ticketInstructionMulti: 'Multi-jegyek: Adjon hozzá annyi jegyet, amennyi szükséges a kívánt összeg eléréséhez',
    ticketInstructionValidation: 'Érvényesítés: A "Fizetés" gomb automatikusan aktiválódik, ha az összeg ≥ rendelés összege',
    dontHaveTickets: 'Nincs jegye?',
    buyTickets: 'PCS/TransCash jegyek vásárlása a Recharge.com oldalon',
    ticket: 'Jegy',
    addTicket: 'Jegy hozzáadása',
    ticketsTotal: 'Jegyek összesen:',
    requiredAmount: 'Szükséges összeg:',
    insufficientAmount: 'Elégtelen összeg',
    amountValidated: 'Összeg érvényesítve!',
    ticketCodePlaceholder: 'Jegykód',
    ticketAmountPlaceholder: 'Összeg (€)',
    days23: '2-3 nap',
    bankTransferInstructionsTitle: 'Útmutató a banki átutaláshoz',
    bankTransferInstruction1: 'Utaljon az alábbi számlára',
    bankTransferInstruction2: '⚠️ FONTOS: KÖTELEZŐEN adja meg a rendelési hivatkozást',
    bankTransferInstruction3: 'Az összegnek pontosan meg kell egyeznie a megadottal',
    bankTransferInstruction4: 'A rendelését az átutalás beérkezése után dolgozzuk fel (2-3 nap)',
    bankTransferInstruction5: 'Az érvényesítés után megerősítő e-mailt fog kapni',
    beneficiary: 'Kedvezményezett',
    referenceRequired: 'Hivatkozás (KÖTELEZŐ)',
    amount: 'Összeg',
    copyBankDetails: 'Banki adatok másolása',
    copied: 'Másolva!',
    recommended: 'Ajánlott',
    payment100Secure: '100% biztonságos fizetés',
    paymentInfoEncrypted: 'Az Ön fizetési adatai titkosítva és biztonságban vannak. Soha nem tároljuk banki adatait.',
    neverStoreCardData: 'Soha nem tároljuk banki adatait',
    shippingAddress: 'Szállítási cím',
    editAddress: 'Cím szerkesztése',
    saveAddress: 'Cím mentése',
    orderItems: 'Rendelési tételek',
    vat: 'ÁFA (20%)',
    totalWithVat: 'Összesen ÁFÁ-val',
    payNow: 'Fizetés most',
    orderSent: 'Rendelés elküldve!',
    orderConfirmationEmail: 'Megerősítő e-mailt fog kapni (ellenőrizze a spam/levélszemét mappát, ha szükséges).',
    orderRegistered: 'Rendelés rögzítve',
    completeTransferWithReference: 'Végezze el az átutalást a megadott hivatkozással',
    missingAmount: 'hiányzik',
    oxaPayInstructionsTitle: 'OxaPay utasítások',
    oxaPayInstruction1: 'Azonnali és biztonságos fizetés kriptovalutával vagy bankkártyával',
    oxaPayInstruction2: 'Átirányításra kerül a OxaPay platformra',
    oxaPayInstruction3: 'Elfogad: Bitcoin, Ethereum, USDT, Visa, Mastercard',
    oxaPayInstruction4: 'Rendelése azonnal megerősítésre kerül fizetés után',
    oxaPayInstruction5: 'Biztonságos tranzakció 256 bites SSL titkosítással',
    oxaPayRecommendation: 'Ajánlott módszer a gyors feldolgozáshoz',
    
    // Bank Transfer Modal
    verifyTransferDetails: 'Kérjük, ellenőrizze az átutalás részleteit mielőtt megerősíti a rendelést',
    amountToTransfer: 'Átutalandó összeg',
    instructionsLabel: 'Utasítások:',
    transferInstruction1Short: 'Végezze el az átutalást a fent megadott számlára',
    transferInstruction2Short: 'Ügyeljen arra, hogy megadja a hivatkozást',
    immediateTransfer: 'Azonnali átutalás',
    delivery24h: 'Kézbesítés 24 órán belül',
    standardTransfer: 'Normál átutalás',
    delivery4872h: '48-72 óra banktól függően',
    noCancel: 'Nem, mégse',
    yesProceedTransfer: 'Igen, folytatom az átutalást',
    name: 'Név',
    reference: 'Hivatkozás',
    importantReferenceNote: 'Fontos: Ügyeljen arra, hogy megadja a hivatkozást',
    viewMyOrders: 'Rendeléseim megtekintése',
    processing: 'Feldolgozás...',
    orderReference: 'Rendelési hivatkozás',
    paymentInitError: 'Hiba a fizetés inicializálása során',
    
    // Dashboard
    hello: 'Helló',
    welcomePersonalSpace: 'Üdvözöljük a személyes Luxio felületén',
    totalOrders: 'Összes rendelés',
    noOrdersYet: 'Még nincsenek rendelései',
    inProgress: 'Folyamatban',
    ordersProcessing: 'Feldolgozás alatt álló rendelések',
    delivered: 'Kézbesítve',
    ordersReceived: 'Beérkezett rendelések',
    totalSpent: 'Összes költés',
    totalAmount: 'Teljes összeg',
    orderHistory: 'Rendelési előzmények',
    latestOrdersStatus: 'A legutóbbi rendelései és státuszuk',
    noOrders: 'Nincsenek rendelések',
    noOrdersDescription: 'Még nem adott le rendelést. Fedezze fel prémium termékkatalógusunkat!',
    personalInfo: 'Személyes adatok',
    luxioMember: 'Luxio Tag',
    accountDetails: 'Fiókadatok',
    accountCreated: 'Fiók létrehozva',
    viewProfile: 'Profil megtekintése',
    actionsRequired: 'Szükséges Műveletek',
    awaitingPayment: 'Fizetésre Várva',
    paymentReview: 'Fizetés Felülvizsgálata',
    processingOrder: 'Feldolgozás',
    fulfilled: 'Teljesítve',
    completeBankTransfer: 'Átutalás Befejezése',
    submitPCSCodes: 'PCS Kódok Beküldése',
    openOxaPay: 'OxaPay Megnyitása',
    viewInstructions: 'Utasítások Megtekintése',
    payWithin24h: 'Fizessen 24 órán belül a készlet lefoglalásához',
    unpaidOrders: 'Kifizetetlen Rendelések',
    paymentPending: 'Függőben Lévő Fizetés',
    completePayment: 'Fizetés Befejezése',
    noActionsRequired: 'Nincs Szükség Műveletre',
    allOrdersPaid: 'Minden rendelés ki van fizetve!',
    createdDaysAgo: 'Létrehozva {days} napja',
    createdHoursAgo: 'Létrehozva {hours} órája',
    createdMinutesAgo: 'Létrehozva {minutes} perce',
    timeRemainingMinutes: '{minutes} perc van hátra',
    timeRemainingHoursMinutes: '{hours}ó {minutes}p van hátra',
    expiring: 'Lejár...',
    timeRemaining: 'Hátralévő idő:',
    reserveStock: 'Készlet lefoglalása',
    
    // Order Actions
    cancelOrder: 'Rendelés Törlése',
    cancelOrderWarning: '⚠️ Ha már fizetett erre a rendelésre, kérjük várjon vagy lépjen velünk kapcsolatba e-mailben. Ha a fizetés még nem történt meg, törölheti.',
    orderCancelledSuccess: '✅ Rendelés sikeresen törölve.',
    paymentInstructionsTitle: 'Fizetési Utasítások',
    bankTransferInstructionsMessage: 'Köszönjük rendelését! A 24 órás kézbesítéshez azonnal hajtsa végre az átutalást. Normál átutalás esetén a feldolgozás 48-72 órát vehet igénybe a bankjától függően.',
    ticketPaymentMessage: 'Megkaptuk a rendelésről szóló értesítést. Jelenleg ellenőrizzük a fizetést. Pár percen belül végleges megerősítést kap.',
    oxapayConfirmationMessage: 'Fizetés megerősítve a OxaPay-en keresztül. Rendelése feldolgozás alatt áll.',
    contactSupportEmail: 'Lépjen velünk kapcsolatba a support@luxio-shop.eu címen, ha már fizetett.',
    confirmCancellation: 'Törlés Megerősítése',
    cancelAction: 'Mégse',
    bankDetails: 'Banki Adatok',
    paymentReference: 'Fizetési Hivatkozás',
    uniqueOrderNumber: 'Egyedi Rendelésszám',
    deliveryInfoMessage: '24 órás szállításhoz hajtson végre azonnali átutalást.',
    deliveryInfoStandard: 'Normál átutalás: 48-72 óra a banktól függően.',
    
    // User Profile
    myAccount: 'Fiókom',
    profile: 'Profil',
    myOrders: 'Rendeléseim',
    settings: 'Beállítások',
    accountSettings: 'Fiók beállításai',
    security: 'Biztonság',
    changePassword: 'Jelszó módosítása',
    passwordResetDescription: 'Állítsa vissza jelszavát fiókja védelme érdekében',
    notifications: 'Értesítések',
    orderNotifications: 'Rendelési értesítések',
    priceAlerts: 'Ár riasztások',
    promotionalNewsletter: 'Promóciós hírlevél',
    fullNameLabel: 'Teljes név',
    accountStats: 'Fiók statisztikák',
    totalOrdersCount: 'Összes rendelés',
    totalSpentAmount: 'Összes költés',
    orderHistoryTitle: 'Rendelési előzmények',
    noOrdersYetMessage: 'Még nincsenek rendelések',
    orderLabel: 'Rendelés',
    paidStatus: 'Fizetve',
    pendingStatus: 'Függőben',
    user: 'Felhasználó',
    currentPassword: 'Jelenlegi jelszó',
    newPassword: 'Új jelszó',
    confirmNewPassword: 'Jelszó megerősítése',
    passwordChangeSuccess: 'Jelszó sikeresen megváltoztatva!',
    passwordChangeFailed: 'Nem sikerült megváltoztatni a jelszót',
    
    // Password Visibility & Checkout
    showPassword: 'Jelszó megjelenítése',
    hidePassword: 'Jelszó elrejtése',
    loginRequiredToCheckout: 'Bejelentkezés szükséges',
    pleaseLoginOrSignupToCheckout: 'Kérjük, jelentkezzen be vagy regisztráljon a rendelés leadásához.',
    goToLogin: 'Bejelentkezés',
    
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
    ],
    
    // SEO Meta Tags
    seoHomeTitle: 'Luxio Market - Okostelefonok, Órák, Prémium Cipők | Akár 37% Kedvezmény',
    seoHomeDescription: 'Fedezze fel a legújabb okostelefonokat, okosórákat, prémium cipőket és high-tech kütyüket akár 37% kedvezménnyel. Ingyenes szállítás, biztonságos fizetés crypto-val és bankkártyával.',
    seoHomeKeywords: 'okostelefon, okosóra, cipők, kütyük, high-tech, iPhone, Samsung, luxus, prémium, kedvezmény',
    seoPremiumTitle: 'Prémium Termékek - Okostelefonok, Órák, Cipők | Luxio Market',
    seoPremiumDescription: 'Fedezze fel exkluzív prémium okostelefonok, luxus órák és designer cipők kollekcióját. Hiteles termékek gyártói garanciával és gyors szállítással.',
    seoPremiumKeywords: 'prémium okostelefon, luxus óra, designer cipők, hiteles termékek, garancia',
    seoDashboardTitle: 'Irányítópult - Rendelések Nyomon Követése | Luxio Market',
    seoDashboardDescription: 'Kövesse nyomon rendeléseit, kezelje fiókját és tekintse meg vásárlási előzményeit a Luxio Market-en.',
    seoCartTitle: 'Kosár - Ellenőrizze Rendelését | Luxio Market',
    seoCartDescription: 'Tekintse meg kosarát és lépjen tovább a biztonságos fizetéshez. Ingyenes szállítás minden rendelésnél.',
    seoPaymentTitle: 'Biztonságos Fizetés - Végezze El Rendelését | Luxio Market',
    seoPaymentDescription: 'Végezze el rendelését biztonságosan crypto fizetéssel, banki átutalással vagy előre fizetett kártyákkal. Minden tranzakció titkosított és biztonságos.',
    seoCheckoutAddressTitle: 'Szállítási Cím - Rendelés | Luxio Market',
    seoCheckoutAddressDescription: 'Erősítse meg szállítási címét a biztonságos és gyors kézbesítéshez. Szerkessze vagy használja a regisztrált címét.',
    deliveryAddress: 'Szállítási cím',
    checkoutAddressTitle: 'Hová szállítsuk rendelését?',
    checkoutAddressSubtitle: 'Kérjük, erősítse meg vagy frissítse szállítási címét',
    useRegisteredAddress: 'Regisztrált címem használata',
    continueToPayment: 'Tovább a fizetéshez',
    addressSaved: 'Cím sikeresen mentve',
    postalCode: 'Irányítószám',
    enterNewAddress: 'Új cím megadása',
    seoOgSiteName: 'Luxio Market',
    seoImageAltLogo: 'Luxio Market - Prémium tech termékek',
    seoImageAltProduct: 'Prémium termék kedvezményes áron',
    seoImageAltSmartphone: 'Legújabb generációs okostelefon',
    seoImageAltWatch: 'Prémium okosóra',
    seoImageAltSneaker: 'Designer prémium cipők',
    seoImageAltGadget: 'Okos otthon kütyü',
    
    // Coupons
    couponCode: 'Kuponkód',
    applyCoupon: 'Kupon alkalmazása',
    enterCouponCode: 'Add meg a kuponkódot',
    couponApplied: 'Kupon sikeresen alkalmazva',
    couponInvalid: 'Érvénytelen kuponkód',
    couponExpired: 'Ez a kupon lejárt',
    couponAlreadyUsed: 'Ez a kupon már felhasználásra került',
    removeCoupon: 'Kupon eltávolítása',
    myCoupons: 'Kuponjaim',
    noCoupons: 'Nincs elérhető kupon',
    noCouponsDescription: 'Még nincsenek kuponjaid. Szerezz kuponokat 2-nél több telefon rendelésével vagy 3000€ vagy annál nagyobb összeg elköltésével.',
    couponDiscount: 'kedvezmény',
    couponExpires: 'Lejár',
    couponValid: 'Érvényes',
    couponUsed: 'Felhasznált',
    copyCode: 'Kód másolása',
    codeCopied: 'Kód másolva!',
    validatingCoupon: 'Ellenőrzés...'
  }
};

const countryToLanguageMap: { [key: string]: Language } = {
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  LU: 'fr',
  MC: 'fr',
  CA: 'fr',
  
  ES: 'es',
  MX: 'es',
  AR: 'es',
  CO: 'es',
  CL: 'es',
  PE: 'es',
  VE: 'es',
  
  PT: 'pt',
  BR: 'pt',
  
  PL: 'pl',
  
  IT: 'it',
  
  HU: 'hu',
  
  US: 'en',
  GB: 'en',
  IE: 'en',
  AU: 'en',
  NZ: 'en',
  IN: 'en',
  SG: 'en',
  ZA: 'en',
};

async function detectLanguageFromIP(): Promise<Language | null> {
  try {
    const cachedCountry = sessionStorage.getItem('luxio-detected-country');
    let countryCode: string;

    if (cachedCountry) {
      countryCode = cachedCountry;
    } else {
      const response = await fetch('https://ipapi.co/country_code/', {
        method: 'GET',
        headers: { 'Accept': 'text/plain' }
      });

      if (!response.ok) {
        return null;
      }

      countryCode = (await response.text()).trim();
      sessionStorage.setItem('luxio-detected-country', countryCode);
    }

    return countryToLanguageMap[countryCode] || 'en';
  } catch (error) {
    console.warn('Failed to detect language from IP:', error);
    return null;
  }
}

export function detectLanguage(): Language {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as Language;
  if (langParam && ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'].includes(langParam)) {
    return langParam;
  }

  const storedLang = localStorage.getItem('luxio-language') as Language;
  if (storedLang && ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'].includes(storedLang)) {
    return storedLang;
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('pl')) return 'pl';
  if (browserLang.startsWith('it')) return 'it';
  if (browserLang.startsWith('hu')) return 'hu';

  return 'en';
}

export async function detectLanguageAsync(): Promise<Language> {
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang') as Language;
  if (langParam && ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'].includes(langParam)) {
    return langParam;
  }

  const storedLang = localStorage.getItem('luxio-language') as Language;
  if (storedLang && ['en', 'fr', 'es', 'pt', 'pl', 'it', 'hu'].includes(storedLang)) {
    return storedLang;
  }

  const ipLang = await detectLanguageFromIP();
  if (ipLang) {
    return ipLang;
  }

  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('fr')) return 'fr';
  if (browserLang.startsWith('es')) return 'es';
  if (browserLang.startsWith('pt')) return 'pt';
  if (browserLang.startsWith('pl')) return 'pl';
  if (browserLang.startsWith('it')) return 'it';
  if (browserLang.startsWith('hu')) return 'hu';

  return 'en';
}
