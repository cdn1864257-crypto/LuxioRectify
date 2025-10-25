import { useLanguage } from '@/contexts/LanguageContext';
import { SEO } from '@/components/SEO';
import { Shield, Lock, Database, Eye, Mail, Phone } from 'lucide-react';
import type { Language } from '@/lib/translations';

const privacyPolicyContent: Record<Language, {
  title: string;
  lastUpdated: string;
  intro: string;
  sections: Array<{
    icon: any;
    title: string;
    content: string;
  }>;
  contact: string;
}> = {
  en: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: October 25, 2025',
    intro: 'At Luxio Market, we are committed to protecting your privacy and personal data in compliance with GDPR (General Data Protection Regulation) and applicable data protection laws.',
    sections: [
      {
        icon: Database,
        title: '1. Data We Collect',
        content: 'We collect only essential information necessary to provide our services: Personal identification (name, email), Shipping address for order fulfillment, Payment information (processed securely by third-party providers), Order history and preferences. We do NOT collect unnecessary tracking data or sell your information to third parties.',
      },
      {
        icon: Lock,
        title: '2. How We Use Your Data',
        content: 'Your data is used exclusively for: Processing and fulfilling your orders, Communicating about your orders and account, Improving our services and user experience, Complying with legal obligations. We never use your data for unauthorized marketing or share it without your explicit consent.',
      },
      {
        icon: Shield,
        title: '3. Data Protection & Security',
        content: 'We implement industry-standard security measures: HTTPS encryption for all communications, Secure HTTPOnly cookies for authentication, Regular security audits and updates, Limited access to personal data (need-to-know basis), Secure data storage with encryption at rest.',
      },
      {
        icon: Eye,
        title: '4. Your Rights (GDPR)',
        content: 'You have the right to: Access your personal data, Rectify incorrect information, Request data deletion ("Right to be Forgotten"), Export your data in machine-readable format, Withdraw consent at any time, Object to data processing, Lodge a complaint with supervisory authorities.',
      },
    ],
    contact: 'For privacy concerns or to exercise your rights, contact us at: privacy@luxiomarket.shop',
  },
  fr: {
    title: 'Politique de Confidentialité',
    lastUpdated: 'Dernière mise à jour : 25 octobre 2025',
    intro: 'Chez Luxio Market, nous nous engageons à protéger votre vie privée et vos données personnelles conformément au RGPD (Règlement Général sur la Protection des Données) et aux lois applicables en matière de protection des données.',
    sections: [
      {
        icon: Database,
        title: '1. Données Collectées',
        content: 'Nous collectons uniquement les informations essentielles : Identification personnelle (nom, email), Adresse de livraison pour les commandes, Informations de paiement (traitées par des prestataires tiers sécurisés), Historique et préférences de commandes. Nous ne collectons PAS de données de suivi inutiles et ne vendons jamais vos informations.',
      },
      {
        icon: Lock,
        title: '2. Utilisation des Données',
        content: 'Vos données sont utilisées exclusivement pour : Traiter et expédier vos commandes, Communiquer sur vos commandes et votre compte, Améliorer nos services et l\'expérience utilisateur, Respecter les obligations légales. Nous n\'utilisons jamais vos données pour du marketing non autorisé.',
      },
      {
        icon: Shield,
        title: '3. Protection et Sécurité',
        content: 'Nous appliquons des mesures de sécurité standard : Chiffrement HTTPS pour toutes les communications, Cookies HTTPOnly sécurisés pour l\'authentification, Audits de sécurité réguliers, Accès limité aux données personnelles, Stockage sécurisé avec chiffrement au repos.',
      },
      {
        icon: Eye,
        title: '4. Vos Droits (RGPD)',
        content: 'Vous avez le droit de : Accéder à vos données personnelles, Rectifier les informations incorrectes, Demander la suppression ("Droit à l\'oubli"), Exporter vos données en format lisible par machine, Retirer votre consentement à tout moment, Vous opposer au traitement des données, Déposer une plainte auprès des autorités de contrôle.',
      },
    ],
    contact: 'Pour toute préoccupation concernant la confidentialité ou pour exercer vos droits, contactez-nous à : privacy@luxiomarket.shop',
  },
  es: {
    title: 'Política de Privacidad',
    lastUpdated: 'Última actualización: 25 de octubre de 2025',
    intro: 'En Luxio Market, estamos comprometidos a proteger su privacidad y datos personales en cumplimiento con el RGPD (Reglamento General de Protección de Datos) y las leyes aplicables de protección de datos.',
    sections: [
      {
        icon: Database,
        title: '1. Datos que Recopilamos',
        content: 'Recopilamos solo información esencial: Identificación personal (nombre, correo electrónico), Dirección de envío para pedidos, Información de pago (procesada por proveedores terceros seguros), Historial y preferencias de pedidos. NO recopilamos datos de seguimiento innecesarios ni vendemos su información.',
      },
      {
        icon: Lock,
        title: '2. Uso de sus Datos',
        content: 'Sus datos se utilizan exclusivamente para: Procesar y cumplir sus pedidos, Comunicar sobre sus pedidos y cuenta, Mejorar nuestros servicios y experiencia del usuario, Cumplir con obligaciones legales. Nunca usamos sus datos para marketing no autorizado.',
      },
      {
        icon: Shield,
        title: '3. Protección y Seguridad',
        content: 'Implementamos medidas de seguridad estándar: Cifrado HTTPS para todas las comunicaciones, Cookies HTTPOnly seguras para autenticación, Auditorías de seguridad regulares, Acceso limitado a datos personales, Almacenamiento seguro con cifrado en reposo.',
      },
      {
        icon: Eye,
        title: '4. Sus Derechos (RGPD)',
        content: 'Usted tiene derecho a: Acceder a sus datos personales, Rectificar información incorrecta, Solicitar la eliminación de datos ("Derecho al Olvido"), Exportar sus datos en formato legible, Retirar el consentimiento en cualquier momento, Oponerse al procesamiento de datos, Presentar una queja ante las autoridades supervisoras.',
      },
    ],
    contact: 'Para preocupaciones sobre privacidad o para ejercer sus derechos, contáctenos en: privacy@luxiomarket.shop',
  },
  pt: {
    title: 'Política de Privacidade',
    lastUpdated: 'Última atualização: 25 de outubro de 2025',
    intro: 'Na Luxio Market, estamos comprometidos em proteger sua privacidade e dados pessoais em conformidade com o RGPD (Regulamento Geral de Proteção de Dados) e as leis aplicáveis de proteção de dados.',
    sections: [
      {
        icon: Database,
        title: '1. Dados que Coletamos',
        content: 'Coletamos apenas informações essenciais: Identificação pessoal (nome, e-mail), Endereço de entrega para pedidos, Informações de pagamento (processadas por fornecedores terceiros seguros), Histórico e preferências de pedidos. NÃO coletamos dados de rastreamento desnecessários nem vendemos suas informações.',
      },
      {
        icon: Lock,
        title: '2. Uso dos seus Dados',
        content: 'Seus dados são usados exclusivamente para: Processar e cumprir seus pedidos, Comunicar sobre seus pedidos e conta, Melhorar nossos serviços e experiência do usuário, Cumprir obrigações legais. Nunca usamos seus dados para marketing não autorizado.',
      },
      {
        icon: Shield,
        title: '3. Proteção e Segurança',
        content: 'Implementamos medidas de segurança padrão: Criptografia HTTPS para todas as comunicações, Cookies HTTPOnly seguros para autenticação, Auditorias de segurança regulares, Acesso limitado a dados pessoais, Armazenamento seguro com criptografia em repouso.',
      },
      {
        icon: Eye,
        title: '4. Seus Direitos (RGPD)',
        content: 'Você tem o direito de: Acessar seus dados pessoais, Retificar informações incorretas, Solicitar a exclusão de dados ("Direito ao Esquecimento"), Exportar seus dados em formato legível, Retirar o consentimento a qualquer momento, Opor-se ao processamento de dados, Apresentar uma reclamação às autoridades supervisoras.',
      },
    ],
    contact: 'Para questões de privacidade ou para exercer seus direitos, entre em contato conosco em: privacy@luxiomarket.shop',
  },
  pl: {
    title: 'Polityka Prywatności',
    lastUpdated: 'Ostatnia aktualizacja: 25 października 2025',
    intro: 'W Luxio Market zobowiązujemy się do ochrony Twojej prywatności i danych osobowych zgodnie z RODO (Ogólne Rozporządzenie o Ochronie Danych) i obowiązującymi przepisami o ochronie danych.',
    sections: [
      {
        icon: Database,
        title: '1. Zbierane Dane',
        content: 'Zbieramy tylko niezbędne informacje: Identyfikacja osobista (imię, e-mail), Adres dostawy do zamówień, Informacje o płatności (przetwarzane przez bezpiecznych dostawców zewnętrznych), Historia i preferencje zamówień. NIE zbieramy niepotrzebnych danych śledzących ani nie sprzedajemy Twoich informacji.',
      },
      {
        icon: Lock,
        title: '2. Wykorzystanie Danych',
        content: 'Twoje dane są używane wyłącznie do: Przetwarzania i realizacji zamówień, Komunikacji dotyczącej zamówień i konta, Poprawy naszych usług i doświadczeń użytkownika, Przestrzegania obowiązków prawnych. Nigdy nie używamy Twoich danych do nieautoryzowanego marketingu.',
      },
      {
        icon: Shield,
        title: '3. Ochrona i Bezpieczeństwo',
        content: 'Wdrażamy standardowe środki bezpieczeństwa: Szyfrowanie HTTPS dla wszystkich komunikacji, Bezpieczne pliki cookie HTTPOnly do uwierzytelniania, Regularne audyty bezpieczeństwa, Ograniczony dostęp do danych osobowych, Bezpieczne przechowywanie z szyfrowaniem w spoczynku.',
      },
      {
        icon: Eye,
        title: '4. Twoje Prawa (RODO)',
        content: 'Masz prawo do: Dostępu do swoich danych osobowych, Poprawy nieprawidłowych informacji, Żądania usunięcia danych ("Prawo do bycia zapomnianym"), Eksportu danych w formacie czytelnym maszynowo, Wycofania zgody w dowolnym momencie, Sprzeciwu wobec przetwarzania danych, Złożenia skargi do organów nadzorczych.',
      },
    ],
    contact: 'W sprawach dotyczących prywatności lub w celu wykonania swoich praw, skontaktuj się z nami pod adresem: privacy@luxiomarket.shop',
  },
  it: {
    title: 'Politica sulla Privacy',
    lastUpdated: 'Ultimo aggiornamento: 25 ottobre 2025',
    intro: 'A Luxio Market, ci impegniamo a proteggere la tua privacy e i tuoi dati personali in conformità con il GDPR (Regolamento Generale sulla Protezione dei Dati) e le leggi applicabili sulla protezione dei dati.',
    sections: [
      {
        icon: Database,
        title: '1. Dati Raccolti',
        content: 'Raccogliamo solo informazioni essenziali: Identificazione personale (nome, email), Indirizzo di spedizione per gli ordini, Informazioni di pagamento (elaborate da fornitori terzi sicuri), Cronologia e preferenze degli ordini. NON raccogliamo dati di tracciamento non necessari né vendiamo le tue informazioni.',
      },
      {
        icon: Lock,
        title: '2. Utilizzo dei Dati',
        content: 'I tuoi dati sono utilizzati esclusivamente per: Elaborare e evadere i tuoi ordini, Comunicare sui tuoi ordini e account, Migliorare i nostri servizi e l\'esperienza utente, Rispettare gli obblighi legali. Non utilizziamo mai i tuoi dati per marketing non autorizzato.',
      },
      {
        icon: Shield,
        title: '3. Protezione e Sicurezza',
        content: 'Implementiamo misure di sicurezza standard: Crittografia HTTPS per tutte le comunicazioni, Cookie HTTPOnly sicuri per l\'autenticazione, Audit di sicurezza regolari, Accesso limitato ai dati personali, Archiviazione sicura con crittografia a riposo.',
      },
      {
        icon: Eye,
        title: '4. I Tuoi Diritti (GDPR)',
        content: 'Hai il diritto di: Accedere ai tuoi dati personali, Rettificare informazioni errate, Richiedere la cancellazione dei dati ("Diritto all\'Oblio"), Esportare i tuoi dati in formato leggibile, Ritirare il consenso in qualsiasi momento, Opporsi al trattamento dei dati, Presentare un reclamo alle autorità di controllo.',
      },
    ],
    contact: 'Per questioni sulla privacy o per esercitare i tuoi diritti, contattaci a: privacy@luxiomarket.shop',
  },
  hu: {
    title: 'Adatvédelmi Irányelvek',
    lastUpdated: 'Utoljára frissítve: 2025. október 25.',
    intro: 'A Luxio Market elkötelezett az Ön adatainak és magánéletének védelme mellett a GDPR (Általános Adatvédelmi Rendelet) és a vonatkozó adatvédelmi törvények szerint.',
    sections: [
      {
        icon: Database,
        title: '1. Gyűjtött Adatok',
        content: 'Csak alapvető információkat gyűjtünk: Személyazonosítás (név, e-mail), Szállítási cím a rendelésekhez, Fizetési információk (biztonságos harmadik fél szolgáltatók által feldolgozva), Rendelési előzmények és preferenciák. NEM gyűjtünk szükségtelen követési adatokat, és nem adjuk el az információit.',
      },
      {
        icon: Lock,
        title: '2. Adatok Használata',
        content: 'Az adatait kizárólag a következőkre használjuk: Rendelések feldolgozása és teljesítése, Rendelésekkel és fiókkal kapcsolatos kommunikáció, Szolgáltatásaink és felhasználói élmény javítása, Jogi kötelezettségek betartása. Soha nem használjuk az adatait jogosulatlan marketingre.',
      },
      {
        icon: Shield,
        title: '3. Védelem és Biztonság',
        content: 'Szabványos biztonsági intézkedéseket alkalmazunk: HTTPS titkosítás minden kommunikációhoz, Biztonságos HTTPOnly sütik a hitelesítéshez, Rendszeres biztonsági auditok, Korlátozott hozzáférés a személyes adatokhoz, Biztonságos tárolás titkosítással.',
      },
      {
        icon: Eye,
        title: '4. Az Ön Jogai (GDPR)',
        content: 'Önnek joga van: Hozzáférni személyes adataihoz, Javítani a helytelen információkat, Kérni az adatok törlését ("Elfeledtetéshez való jog"), Exportálni adatait géppel olvasható formátumban, Bármikor visszavonni hozzájárulását, Tiltakozni az adatkezelés ellen, Panaszt tenni a felügyeleti hatóságoknál.',
      },
    ],
    contact: 'Adatvédelmi kérdésekkel vagy jogai gyakorlásával kapcsolatban vegye fel velünk a kapcsolatot: privacy@luxiomarket.shop',
  },
};

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const content = privacyPolicyContent[language] || privacyPolicyContent.en;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={content.title}
        description={content.intro}
        noindex={false}
      />
      
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{content.title}</h1>
          <p className="text-sm text-muted-foreground">{content.lastUpdated}</p>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <p className="text-lg text-muted-foreground mb-8">{content.intro}</p>

          {content.sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <div key={index} className="mb-8 p-6 bg-accent/50 rounded-lg border">
                <div className="flex items-start gap-4">
                  <Icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
                    <p className="text-muted-foreground whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="mt-8 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-start gap-4">
              <Mail className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
                <p className="text-muted-foreground">{content.contact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
