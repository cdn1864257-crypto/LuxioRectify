interface MultilingualMessage {
  en: string;
  fr: string;
  es: string;
  pt: string;
  it: string;
  hu: string;
  pl: string;
}

export const ERROR_MESSAGES = {
  UNAUTHORIZED: {
    en: 'Authentication required for this action',
    fr: 'Authentification requise pour cette action',
    es: 'Autenticación requerida para esta acción',
    pt: 'Autenticação necessária para esta ação',
    it: 'Autenticazione richiesta per questa azione',
    hu: 'Hitelesítés szükséges ehhez a művelethez',
    pl: 'Wymagane uwierzytelnienie dla tej akcji'
  } as MultilingualMessage,
  
  INVALID_CREDENTIALS: {
    en: 'Invalid email or password',
    fr: 'Email ou mot de passe invalide',
    es: 'Correo electrónico o contraseña no válidos',
    pt: 'E-mail ou senha inválidos',
    it: 'Email o password non validi',
    hu: 'Érvénytelen e-mail vagy jelszó',
    pl: 'Nieprawidłowy adres e-mail lub hasło'
  } as MultilingualMessage,
  
  EMAIL_NOT_VERIFIED: {
    en: 'Please verify your email address before logging in. Check your inbox for the verification link.',
    fr: 'Veuillez vérifier votre adresse email avant de vous connecter. Consultez votre boîte de réception pour le lien de vérification.',
    es: 'Por favor, verifique su dirección de correo electrónico antes de iniciar sesión. Revise su bandeja de entrada para el enlace de verificación.',
    pt: 'Por favor, verifique seu endereço de e-mail antes de fazer login. Verifique sua caixa de entrada para o link de verificação.',
    it: 'Si prega di verificare il proprio indirizzo email prima di accedere. Controllare la casella di posta per il link di verifica.',
    hu: 'Kérjük, ellenőrizze email címét a bejelentkezés előtt. Ellenőrizze postafiókját az ellenőrző linkért.',
    pl: 'Proszę zweryfikować swój adres e-mail przed zalogowaniem. Sprawdź skrzynkę odbiorczą pod kątem linku weryfikacyjnego.'
  } as MultilingualMessage,
  
  TOKEN_MISSING: {
    en: 'Authentication token is missing',
    fr: 'Token d\'authentification manquant',
    es: 'Falta el token de autenticación',
    pt: 'Token de autenticação ausente',
    it: 'Token di autenticazione mancante',
    hu: 'Hiányzik a hitelesítési token',
    pl: 'Brak tokenu uwierzytelniającego'
  } as MultilingualMessage,
  
  TOKEN_INVALID: {
    en: 'Authentication token is invalid or expired',
    fr: 'Token d\'authentification invalide ou expiré',
    es: 'El token de autenticación no es válido o ha caducado',
    pt: 'Token de autenticação inválido ou expirado',
    it: 'Token di autenticazione non valido o scaduto',
    hu: 'A hitelesítési token érvénytelen vagy lejárt',
    pl: 'Token uwierzytelniający jest nieprawidłowy lub wygasł'
  } as MultilingualMessage,
  
  ROUTE_NOT_FOUND: {
    en: 'Route not found. Please check the URL',
    fr: 'Route non trouvée. Veuillez vérifier l\'URL',
    es: 'Ruta no encontrada. Por favor, verifique la URL',
    pt: 'Rota não encontrada. Por favor, verifique a URL',
    it: 'Route non trovata. Si prega di verificare l\'URL',
    hu: 'Az útvonal nem található. Kérjük, ellenőrizze az URL-t',
    pl: 'Nie znaleziono trasy. Sprawdź adres URL'
  } as MultilingualMessage,
  
  CSRF_INVALID: {
    en: 'Invalid CSRF token. Session is invalid or token is missing/incorrect',
    fr: 'Token CSRF invalide. Session invalide ou token manquant/incorrect',
    es: 'Token CSRF no válido. Sesión no válida o token faltante/incorrecto',
    pt: 'Token CSRF inválido. Sessão inválida ou token ausente/incorreto',
    it: 'Token CSRF non valido. Sessione non valida o token mancante/errato',
    hu: 'Érvénytelen CSRF token. Érvénytelen munkamenet vagy hiányzó/helytelen token',
    pl: 'Nieprawidłowy token CSRF. Nieprawidłowa sesja lub brakujący/nieprawidłowy token'
  } as MultilingualMessage,
  
  INTERNAL_SERVER_ERROR: {
    en: 'Internal server error',
    fr: 'Erreur interne du serveur',
    es: 'Error interno del servidor',
    pt: 'Erro interno do servidor',
    it: 'Errore interno del server',
    hu: 'Belső szerverhiba',
    pl: 'Wewnętrzny błąd serwera'
  } as MultilingualMessage,
  
  TOO_MANY_REQUESTS: {
    en: 'Too many requests, please try again later',
    fr: 'Trop de requêtes, veuillez réessayer plus tard',
    es: 'Demasiadas solicitudes, inténtelo de nuevo más tarde',
    pt: 'Muitas solicitações, tente novamente mais tarde',
    it: 'Troppe richieste, riprova più tardi',
    hu: 'Túl sok kérés, próbálja újra később',
    pl: 'Zbyt wiele żądań, spróbuj ponownie później'
  } as MultilingualMessage,
  
  TOO_MANY_LOGIN_ATTEMPTS: {
    en: 'Too many login attempts, please try again in 15 minutes',
    fr: 'Trop de tentatives de connexion, veuillez réessayer dans 15 minutes',
    es: 'Demasiados intentos de inicio de sesión, inténtelo de nuevo en 15 minutos',
    pt: 'Muitas tentativas de login, tente novamente em 15 minutos',
    it: 'Troppi tentativi di accesso, riprova tra 15 minuti',
    hu: 'Túl sok bejelentkezési kísérlet, próbálja újra 15 perc múlva',
    pl: 'Zbyt wiele prób logowania, spróbuj ponownie za 15 minut'
  } as MultilingualMessage,
  
  USER_NOT_FOUND: {
    en: 'User not found',
    fr: 'Utilisateur non trouvé',
    es: 'Usuario no encontrado',
    pt: 'Usuário não encontrado',
    it: 'Utente non trovato',
    hu: 'A felhasználó nem található',
    pl: 'Użytkownik nie znaleziony'
  } as MultilingualMessage,
  
  ORDER_NOT_FOUND: {
    en: 'Order not found or cannot be cancelled',
    fr: 'Commande non trouvée ou impossible à annuler',
    es: 'Pedido no encontrado o no se puede cancelar',
    pt: 'Pedido não encontrado ou não pode ser cancelado',
    it: 'Ordine non trovato o non può essere annullato',
    hu: 'A rendelés nem található vagy nem törölhető',
    pl: 'Zamówienie nie znalezione lub nie można anulować'
  } as MultilingualMessage,
  
  INCORRECT_CURRENT_PASSWORD: {
    en: 'Current password is incorrect',
    fr: 'Mot de passe actuel incorrect',
    es: 'La contraseña actual es incorrecta',
    pt: 'A senha atual está incorreta',
    it: 'La password attuale non è corretta',
    hu: 'A jelenlegi jelszó helytelen',
    pl: 'Aktualne hasło jest nieprawidłowe'
  } as MultilingualMessage,
  
  SESSION_EXPIRED: {
    en: 'Your session has expired, please log in again',
    fr: 'Votre session a expiré, veuillez vous reconnecter',
    es: 'Su sesión ha caducado, inicie sesión de nuevo',
    pt: 'Sua sessão expirou, faça login novamente',
    it: 'La sessione è scaduta, effettua nuovamente l\'accesso',
    hu: 'A munkamenete lejárt, jelentkezzen be újra',
    pl: 'Sesja wygasła, zaloguj się ponownie'
  } as MultilingualMessage,
  
  REQUIRED_FIELDS: {
    en: 'Required fields are missing',
    fr: 'Champs requis manquants',
    es: 'Faltan campos obligatorios',
    pt: 'Campos obrigatórios ausentes',
    it: 'Campi obbligatori mancanti',
    hu: 'Kötelező mezők hiányoznak',
    pl: 'Brakuje wymaganych pól'
  } as MultilingualMessage,
  
  PASSWORD_TOO_SHORT: {
    en: 'Password must be at least 6 characters long',
    fr: 'Le mot de passe doit contenir au moins 6 caractères',
    es: 'La contraseña debe tener al menos 6 caracteres',
    pt: 'A senha deve ter pelo menos 6 caracteres',
    it: 'La password deve contenere almeno 6 caratteri',
    hu: 'A jelszónak legalább 6 karakterből kell állnia',
    pl: 'Hasło musi mieć co najmniej 6 znaków'
  } as MultilingualMessage,
  
  ORDER_ID_REQUIRED: {
    en: 'Order ID is required',
    fr: 'ID de commande requis',
    es: 'Se requiere ID de pedido',
    pt: 'ID do pedido é obrigatório',
    it: 'ID ordine obbligatorio',
    hu: 'Rendelésazonosító szükséges',
    pl: 'Wymagany identyfikator zamówienia'
  } as MultilingualMessage,
  
  VERIFICATION_TOKEN_MISSING: {
    en: 'Verification token is missing',
    fr: 'Token de vérification manquant',
    es: 'Falta el token de verificación',
    pt: 'Token de verificação ausente',
    it: 'Token di verifica mancante',
    hu: 'Hiányzik az ellenőrző token',
    pl: 'Brak tokenu weryfikacyjnego'
  } as MultilingualMessage,
  
  VERIFICATION_TOKEN_INVALID: {
    en: 'Verification link is invalid or has expired',
    fr: 'Le lien de vérification est invalide ou a expiré',
    es: 'El enlace de verificación no es válido o ha caducado',
    pt: 'O link de verificação é inválido ou expirou',
    it: 'Il link di verifica non è valido o è scaduto',
    hu: 'Az ellenőrző link érvénytelen vagy lejárt',
    pl: 'Link weryfikacyjny jest nieprawidłowy lub wygasł'
  } as MultilingualMessage,
  
  EMAIL_ALREADY_VERIFIED: {
    en: 'Your email is already verified',
    fr: 'Votre email est déjà vérifié',
    es: 'Su correo electrónico ya está verificado',
    pt: 'Seu e-mail já está verificado',
    it: 'La tua email è già verificata',
    hu: 'Az e-mail címe már ellenőrzött',
    pl: 'Twój e-mail jest już zweryfikowany'
  } as MultilingualMessage,
  
  EMAIL_VERIFIED_SUCCESS: {
    en: 'Email verified successfully!',
    fr: 'Email vérifié avec succès !',
    es: '¡Correo electrónico verificado con éxito!',
    pt: 'E-mail verificado com sucesso!',
    it: 'Email verificata con successo!',
    hu: 'Az e-mail sikeresen ellenőrizve!',
    pl: 'E-mail został pomyślnie zweryfikowany!'
  } as MultilingualMessage,
  
  VERIFYING_EMAIL: {
    en: 'Verifying your email...',
    fr: 'Vérification de votre email...',
    es: 'Verificando su correo electrónico...',
    pt: 'Verificando seu e-mail...',
    it: 'Verifica della tua email...',
    hu: 'Az e-mail ellenőrzése...',
    pl: 'Weryfikacja e-maila...'
  } as MultilingualMessage,
  
  REDIRECTING: {
    en: 'Redirecting you to the homepage...',
    fr: 'Redirection vers la page d\'accueil...',
    es: 'Redirigiendo a la página de inicio...',
    pt: 'Redirecionando para a página inicial...',
    it: 'Reindirizzamento alla home page...',
    hu: 'Átirányítás a kezdőlapra...',
    pl: 'Przekierowywanie na stronę główną...'
  } as MultilingualMessage
};

export function getErrorMessage(messageKey: keyof typeof ERROR_MESSAGES, lang: string = 'en'): string {
  const message = ERROR_MESSAGES[messageKey];
  const supportedLang = ['en', 'fr', 'es', 'pt', 'it', 'hu', 'pl'].includes(lang) ? lang : 'en';
  return message[supportedLang as keyof MultilingualMessage];
}

export function getLanguageFromRequest(req: any): string {
  const acceptLanguage = req.headers['accept-language'];
  if (!acceptLanguage) return 'en';
  
  const primaryLang = acceptLanguage.split(',')[0].split('-')[0].toLowerCase();
  
  const langMap: { [key: string]: string } = {
    'fr': 'fr',
    'es': 'es',
    'pt': 'pt',
    'it': 'it',
    'hu': 'hu',
    'pl': 'pl',
    'en': 'en'
  };
  
  return langMap[primaryLang] || 'en';
}
