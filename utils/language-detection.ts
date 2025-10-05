interface IPLocationResponse {
  country_code?: string;
  country?: string;
  languages?: string;
  error?: boolean;
  reason?: string;
}

const countryToLanguageMap: Record<string, string> = {
  FR: 'fr',
  BE: 'fr',
  CH: 'fr',
  LU: 'fr',
  MC: 'fr',
  CA: 'fr',
  
  US: 'en',
  GB: 'en',
  IE: 'en',
  AU: 'en',
  NZ: 'en',
  IN: 'en',
  SG: 'en',
  ZA: 'en',
  
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
  
  HU: 'hu'
};

export async function detectLanguageFromIP(ipAddress?: string): Promise<string> {
  const defaultLanguage = 'fr';
  
  if (!ipAddress || ipAddress === 'localhost' || ipAddress === '127.0.0.1' || ipAddress === '::1') {
    console.log('⚠️  Local IP detected, using default language:', defaultLanguage);
    return defaultLanguage;
  }

  try {
    const response = await fetch(`https://ipapi.co/${ipAddress}/json/`, {
      headers: {
        'User-Agent': 'Luxio-Shop/1.0'
      },
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      console.warn(`⚠️  IP geolocation API returned status ${response.status}, using default language`);
      return defaultLanguage;
    }

    const data: IPLocationResponse = await response.json();

    if (data.error) {
      console.warn(`⚠️  IP geolocation error: ${data.reason}, using default language`);
      return defaultLanguage;
    }

    if (data.country_code) {
      const detectedLanguage = countryToLanguageMap[data.country_code] || defaultLanguage;
      console.log(`✅ Language detected from IP ${ipAddress}:`, detectedLanguage, `(Country: ${data.country_code})`);
      return detectedLanguage;
    }

    console.warn('⚠️  No country code found in geolocation response, using default language');
    return defaultLanguage;

  } catch (error) {
    console.error('❌ Error detecting language from IP:', error instanceof Error ? error.message : error);
    console.log('   Using default language:', defaultLanguage);
    return defaultLanguage;
  }
}

export function getClientIP(headers: { [key: string]: string | undefined }): string | undefined {
  const xForwardedFor = headers['x-forwarded-for'];
  if (xForwardedFor) {
    const ips = xForwardedFor.split(',').map(ip => ip.trim());
    return ips[0];
  }

  const xRealIP = headers['x-real-ip'];
  if (xRealIP) {
    return xRealIP;
  }

  const cfConnectingIP = headers['cf-connecting-ip'];
  if (cfConnectingIP) {
    return cfConnectingIP;
  }

  return undefined;
}
