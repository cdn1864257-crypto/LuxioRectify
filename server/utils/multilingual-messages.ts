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
