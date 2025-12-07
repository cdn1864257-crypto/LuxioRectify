import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';

const LegalNotice = () => {
  const { language } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);

  const content = {
    fr: {
      title: "Mentions Légales",
      description: "Informations légales sur Luxio",
      companyInfo: {
        title: "Informations sur l'entreprise",
        name: "Nom de l'entreprise",
        nameValue: "Luxio SAS",
        registration: "Numéro d'enregistrement",
        registrationValue: "RCS Paris 123 456 789",
        vat: "Numéro de TVA",
        vatValue: "FR 12 345678901",
        address: "Adresse",
        addressValue: "123 Avenue des Champs-Élysées, 75008 Paris, France",
        phone: "Téléphone",
        phoneValue: "+33 1 23 45 67 89",
        email: "Email",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Directeur de la publication",
        director: "Jean Dupont",
        role: "Président"
      },
      hosting: {
        title: "Hébergement",
        provider: "Nom de l'hébergeur",
        providerValue: "Replit, Inc.",
        address: "Adresse",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Site web",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Propriété Intellectuelle",
        content: [
          "L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur et la propriété intellectuelle.",
          "Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.",
          "La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.",
          "Les marques et logos Luxio sont des marques déposées. Toute reproduction totale ou partielle de ces marques ou de ces logos sans autorisation préalable et écrite de Luxio est interdite."
        ]
      },
      personalData: {
        title: "Protection des données personnelles",
        content: "La protection de vos données personnelles est importante pour nous. Pour plus d'informations, veuillez consulter notre Politique de Confidentialité."
      },
      liability: {
        title: "Limitation de responsabilité",
        content: [
          "Luxio s'efforce d'assurer l'exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, Luxio ne peut garantir l'exactitude, la précision ou l'exhaustivité des informations mises à disposition sur ce site.",
          "Luxio ne peut être tenue responsable de l'utilisation et de l'interprétation de l'information contenue dans ce site.",
          "En aucun cas, Luxio ne pourra être tenue responsable de tout dommage direct ou indirect résultant de l'utilisation de ce site."
        ]
      },
      applicableLaw: {
        title: "Droit applicable",
        content: "Les présentes mentions légales sont soumises au droit français. En cas de litige, les tribunaux français seront seuls compétents."
      }
    },
    en: {
      title: "Legal Notice",
      description: "Legal information about Luxio",
      companyInfo: {
        title: "Company Information",
        name: "Company Name",
        nameValue: "Luxio SAS",
        registration: "Registration Number",
        registrationValue: "RCS Paris 123 456 789",
        vat: "VAT Number",
        vatValue: "FR 12 345678901",
        address: "Address",
        addressValue: "123 Avenue des Champs-Élysées, 75008 Paris, France",
        phone: "Phone",
        phoneValue: "+33 1 23 45 67 89",
        email: "Email",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Publication Director",
        director: "Jean Dupont",
        role: "President"
      },
      hosting: {
        title: "Hosting",
        provider: "Hosting Provider",
        providerValue: "Replit, Inc.",
        address: "Address",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Website",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Intellectual Property",
        content: [
          "This entire website is subject to French and international copyright and intellectual property laws.",
          "All reproduction rights are reserved, including for downloadable documents and iconographic and photographic representations.",
          "Reproduction of all or part of this site on any electronic medium is strictly prohibited without express permission from the publication director.",
          "Luxio trademarks and logos are registered trademarks. Any total or partial reproduction of these trademarks or logos without prior written permission from Luxio is prohibited."
        ]
      },
      personalData: {
        title: "Personal Data Protection",
        content: "The protection of your personal data is important to us. For more information, please see our Privacy Policy."
      },
      liability: {
        title: "Limitation of Liability",
        content: [
          "Luxio strives to ensure the accuracy and updating of information published on this site. However, Luxio cannot guarantee the accuracy, precision or completeness of information made available on this site.",
          "Luxio cannot be held responsible for the use and interpretation of information contained in this site.",
          "Under no circumstances shall Luxio be liable for any direct or indirect damage resulting from the use of this site."
        ]
      },
      applicableLaw: {
        title: "Applicable Law",
        content: "These legal notices are subject to French law. In case of dispute, French courts shall have sole jurisdiction."
      }
    },
    es: {
      title: "Aviso Legal",
      description: "Información legal sobre Luxio",
      companyInfo: {
        title: "Información de la Empresa",
        name: "Nombre de la empresa",
        nameValue: "Luxio SAS",
        registration: "Número de registro",
        registrationValue: "RCS Paris 123 456 789",
        vat: "Número de IVA",
        vatValue: "FR 12 345678901",
        address: "Dirección",
        addressValue: "123 Avenue des Champs-Élysées, 75008 París, Francia",
        phone: "Teléfono",
        phoneValue: "+33 1 23 45 67 89",
        email: "Correo electrónico",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Director de Publicación",
        director: "Jean Dupont",
        role: "Presidente"
      },
      hosting: {
        title: "Alojamiento",
        provider: "Proveedor de alojamiento",
        providerValue: "Replit, Inc.",
        address: "Dirección",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Sitio web",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Propiedad Intelectual",
        content: [
          "Este sitio web está sujeto a las leyes francesas e internacionales sobre derechos de autor y propiedad intelectual.",
          "Todos los derechos de reproducción están reservados, incluidos los documentos descargables y las representaciones iconográficas y fotográficas.",
          "La reproducción total o parcial de este sitio en cualquier medio electrónico está estrictamente prohibida sin el permiso expreso del director de publicación.",
          "Las marcas y logotipos de Luxio son marcas registradas. Cualquier reproducción total o parcial de estas marcas o logotipos sin permiso previo por escrito de Luxio está prohibida."
        ]
      },
      personalData: {
        title: "Protección de Datos Personales",
        content: "La protección de sus datos personales es importante para nosotros. Para más información, consulte nuestra Política de Privacidad."
      },
      liability: {
        title: "Limitación de Responsabilidad",
        content: [
          "Luxio se esfuerza por garantizar la exactitud y actualización de la información publicada en este sitio. Sin embargo, Luxio no puede garantizar la exactitud, precisión o integridad de la información disponible en este sitio.",
          "Luxio no se hace responsable del uso e interpretación de la información contenida en este sitio.",
          "En ningún caso Luxio será responsable de ningún daño directo o indirecto resultante del uso de este sitio."
        ]
      },
      applicableLaw: {
        title: "Ley Aplicable",
        content: "Estos avisos legales están sujetos a la ley francesa. En caso de disputa, los tribunales franceses tendrán jurisdicción exclusiva."
      }
    },
    pt: {
      title: "Aviso Legal",
      description: "Informações legais sobre Luxio",
      companyInfo: {
        title: "Informações da Empresa",
        name: "Nome da empresa",
        nameValue: "Luxio SAS",
        registration: "Número de registro",
        registrationValue: "RCS Paris 123 456 789",
        vat: "Número de IVA",
        vatValue: "FR 12 345678901",
        address: "Endereço",
        addressValue: "123 Avenue des Champs-Élysées, 75008 Paris, França",
        phone: "Telefone",
        phoneValue: "+33 1 23 45 67 89",
        email: "Email",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Diretor de Publicação",
        director: "Jean Dupont",
        role: "Presidente"
      },
      hosting: {
        title: "Hospedagem",
        provider: "Provedor de hospedagem",
        providerValue: "Replit, Inc.",
        address: "Endereço",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Site",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Propriedade Intelectual",
        content: [
          "Todo este site está sujeito às leis francesas e internacionais sobre direitos autorais e propriedade intelectual.",
          "Todos os direitos de reprodução são reservados, incluindo documentos para download e representações iconográficas e fotográficas.",
          "A reprodução total ou parcial deste site em qualquer meio eletrônico é estritamente proibida sem permissão expressa do diretor de publicação.",
          "As marcas e logotipos Luxio são marcas registradas. Qualquer reprodução total ou parcial dessas marcas ou logotipos sem permissão prévia por escrito da Luxio é proibida."
        ]
      },
      personalData: {
        title: "Proteção de Dados Pessoais",
        content: "A proteção de seus dados pessoais é importante para nós. Para mais informações, consulte nossa Política de Privacidade."
      },
      liability: {
        title: "Limitação de Responsabilidade",
        content: [
          "A Luxio se esforça para garantir a precisão e atualização das informações publicadas neste site. No entanto, a Luxio não pode garantir a exatidão, precisão ou integridade das informações disponibilizadas neste site.",
          "A Luxio não pode ser responsabilizada pelo uso e interpretação das informações contidas neste site.",
          "Em nenhuma circunstância a Luxio será responsável por quaisquer danos diretos ou indiretos resultantes do uso deste site."
        ]
      },
      applicableLaw: {
        title: "Lei Aplicável",
        content: "Estes avisos legais estão sujeitos à lei francesa. Em caso de disputa, os tribunais franceses terão jurisdição exclusiva."
      }
    },
    it: {
      title: "Note Legali",
      description: "Informazioni legali su Luxio",
      companyInfo: {
        title: "Informazioni sull'Azienda",
        name: "Nome dell'azienda",
        nameValue: "Luxio SAS",
        registration: "Numero di registrazione",
        registrationValue: "RCS Paris 123 456 789",
        vat: "Partita IVA",
        vatValue: "FR 12 345678901",
        address: "Indirizzo",
        addressValue: "123 Avenue des Champs-Élysées, 75008 Parigi, Francia",
        phone: "Telefono",
        phoneValue: "+33 1 23 45 67 89",
        email: "Email",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Direttore della Pubblicazione",
        director: "Jean Dupont",
        role: "Presidente"
      },
      hosting: {
        title: "Hosting",
        provider: "Provider di hosting",
        providerValue: "Replit, Inc.",
        address: "Indirizzo",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Sito web",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Proprietà Intellettuale",
        content: [
          "L'intero sito è soggetto alle leggi francesi e internazionali sul diritto d'autore e sulla proprietà intellettuale.",
          "Tutti i diritti di riproduzione sono riservati, compresi i documenti scaricabili e le rappresentazioni iconografiche e fotografiche.",
          "La riproduzione totale o parziale di questo sito su qualsiasi supporto elettronico è severamente vietata senza l'espressa autorizzazione del direttore della pubblicazione.",
          "I marchi e i loghi Luxio sono marchi registrati. Qualsiasi riproduzione totale o parziale di questi marchi o loghi senza previa autorizzazione scritta di Luxio è vietata."
        ]
      },
      personalData: {
        title: "Protezione dei Dati Personali",
        content: "La protezione dei tuoi dati personali è importante per noi. Per ulteriori informazioni, consulta la nostra Informativa sulla Privacy."
      },
      liability: {
        title: "Limitazione di Responsabilità",
        content: [
          "Luxio si impegna a garantire l'accuratezza e l'aggiornamento delle informazioni pubblicate su questo sito. Tuttavia, Luxio non può garantire l'accuratezza, la precisione o la completezza delle informazioni rese disponibili su questo sito.",
          "Luxio non può essere ritenuta responsabile dell'uso e dell'interpretazione delle informazioni contenute in questo sito.",
          "In nessun caso Luxio potrà essere ritenuta responsabile di eventuali danni diretti o indiretti derivanti dall'uso di questo sito."
        ]
      },
      applicableLaw: {
        title: "Legge Applicabile",
        content: "Le presenti note legali sono soggette alla legge francese. In caso di controversia, i tribunali francesi avranno giurisdizione esclusiva."
      }
    },
    hu: {
      title: "Jogi Nyilatkozat",
      description: "Jogi információk a Luxio-ról",
      companyInfo: {
        title: "Vállalati Információk",
        name: "Cégnév",
        nameValue: "Luxio SAS",
        registration: "Regisztrációs szám",
        registrationValue: "RCS Paris 123 456 789",
        vat: "ÁFA szám",
        vatValue: "FR 12 345678901",
        address: "Cím",
        addressValue: "123 Avenue des Champs-Élysées, 75008 Párizs, Franciaország",
        phone: "Telefon",
        phoneValue: "+33 1 23 45 67 89",
        email: "Email",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Kiadási Igazgató",
        director: "Jean Dupont",
        role: "Elnök"
      },
      hosting: {
        title: "Tárhely",
        provider: "Tárhely szolgáltató",
        providerValue: "Replit, Inc.",
        address: "Cím",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Weboldal",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Szellemi Tulajdon",
        content: [
          "Ez a teljes weboldal a francia és nemzetközi szerzői jogi és szellemi tulajdonjogi törvények hatálya alá tartozik.",
          "Minden reprodukciós jog fenntartva, beleértve a letölthető dokumentumokat és az ikonográfiai és fotográfiai ábrázolásokat.",
          "Az oldal egészének vagy egy részének reprodukálása bármilyen elektronikus hordozón szigorúan tilos a kiadási igazgató kifejezett engedélye nélkül.",
          "A Luxio védjegyek és logók bejegyzett védjegyek. Ezen védjegyek vagy logók teljes vagy részleges reprodukálása a Luxio előzetes írásbeli engedélye nélkül tilos."
        ]
      },
      personalData: {
        title: "Személyes Adatok Védelme",
        content: "Személyes adatai védelme fontos számunkra. További információkért kérjük, tekintse meg Adatvédelmi Irányelveinket."
      },
      liability: {
        title: "Felelősség Korlátozása",
        content: [
          "A Luxio törekszik az oldalon közzétett információk pontosságának és frissítésének biztosítására. A Luxio azonban nem garantálhatja az oldalon elérhető információk pontosságát, precizitását vagy teljességét.",
          "A Luxio nem tehető felelőssé az oldalon található információk használatáért és értelmezéséért.",
          "Semmilyen esetben sem tehető a Luxio felelőssé az oldal használatából eredő közvetlen vagy közvetett károkért."
        ]
      },
      applicableLaw: {
        title: "Alkalmazandó Jog",
        content: "Ezen jogi nyilatkozatok a francia jog hatálya alá tartoznak. Vita esetén a francia bíróságok rendelkeznek kizárólagos joghatósággal."
      }
    },
    pl: {
      title: "Informacje Prawne",
      description: "Informacje prawne o Luxio",
      companyInfo: {
        title: "Informacje o Firmie",
        name: "Nazwa firmy",
        nameValue: "Luxio SAS",
        registration: "Numer rejestracyjny",
        registrationValue: "RCS Paris 123 456 789",
        vat: "Numer VAT",
        vatValue: "FR 12 345678901",
        address: "Adres",
        addressValue: "123 Avenue des Champs-Élysées, 75008 Paryż, Francja",
        phone: "Telefon",
        phoneValue: "+33 1 23 45 67 89",
        email: "Email",
        emailValue: "Contact@luxiomarket.shop"
      },
      publication: {
        title: "Dyrektor Publikacji",
        director: "Jean Dupont",
        role: "Prezes"
      },
      hosting: {
        title: "Hosting",
        provider: "Dostawca hostingu",
        providerValue: "Replit, Inc.",
        address: "Adres",
        addressValue: "548 Market St PMB 36716, San Francisco, CA 94104, USA",
        website: "Strona internetowa",
        websiteValue: "https://replit.com"
      },
      intellectualProperty: {
        title: "Własność Intelektualna",
        content: [
          "Cała ta strona internetowa podlega francuskim i międzynarodowym przepisom dotyczącym praw autorskich i własności intelektualnej.",
          "Wszelkie prawa reprodukcji są zastrzeżone, w tym dokumenty do pobrania oraz reprezentacje ikonograficzne i fotograficzne.",
          "Reprodukcja całości lub części tej strony na jakimkolwiek nośniku elektronicznym jest surowo zabroniona bez wyraźnej zgody dyrektora publikacji.",
          "Znaki towarowe i loga Luxio są zarejestrowanymi znakami towarowymi. Jakakolwiek całkowita lub częściowa reprodukcja tych znaków towarowych lub logotypów bez uprzedniej pisemnej zgody Luxio jest zabroniona."
        ]
      },
      personalData: {
        title: "Ochrona Danych Osobowych",
        content: "Ochrona Twoich danych osobowych jest dla nas ważna. Aby uzyskać więcej informacji, zapoznaj się z naszą Polityką Prywatności."
      },
      liability: {
        title: "Ograniczenie Odpowiedzialności",
        content: [
          "Luxio dąży do zapewnienia dokładności i aktualizacji informacji publikowanych na tej stronie. Jednak Luxio nie może zagwarantować dokładności, precyzji lub kompletności informacji udostępnianych na tej stronie.",
          "Luxio nie ponosi odpowiedzialności za wykorzystanie i interpretację informacji zawartych na tej stronie.",
          "W żadnym wypadku Luxio nie ponosi odpowiedzialności za jakiekolwiek bezpośrednie lub pośrednie szkody wynikające z korzystania z tej strony."
        ]
      },
      applicableLaw: {
        title: "Prawo Właściwe",
        content: "Niniejsze informacje prawne podlegają prawu francuskiemu. W przypadku sporu, sądy francuskie mają wyłączną jurysdykcję."
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.fr;

  return (
    <>
      <Helmet>
        <title>{currentContent.title} - Luxio</title>
        <meta name="description" content={currentContent.description} />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header onToggleCart={() => setCartOpen(!cartOpen)} />
        <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />
        
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-foreground">{currentContent.title}</h1>
            
            {/* Company Information */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.companyInfo.title}</h2>
              <div className="bg-card p-6 rounded-lg space-y-3">
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.companyInfo.name}:</span>
                  <span className="text-muted-foreground">{currentContent.companyInfo.nameValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.companyInfo.registration}:</span>
                  <span className="text-muted-foreground">{currentContent.companyInfo.registrationValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.companyInfo.vat}:</span>
                  <span className="text-muted-foreground">{currentContent.companyInfo.vatValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.companyInfo.address}:</span>
                  <span className="text-muted-foreground">{currentContent.companyInfo.addressValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.companyInfo.phone}:</span>
                  <span className="text-muted-foreground">{currentContent.companyInfo.phoneValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.companyInfo.email}:</span>
                  <span className="text-muted-foreground">{currentContent.companyInfo.emailValue}</span>
                </div>
              </div>
            </section>

            {/* Publication Director */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.publication.title}</h2>
              <div className="bg-card p-6 rounded-lg">
                <p className="text-muted-foreground">
                  {currentContent.publication.director} - {currentContent.publication.role}
                </p>
              </div>
            </section>

            {/* Hosting */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.hosting.title}</h2>
              <div className="bg-card p-6 rounded-lg space-y-3">
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.hosting.provider}:</span>
                  <span className="text-muted-foreground">{currentContent.hosting.providerValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.hosting.address}:</span>
                  <span className="text-muted-foreground">{currentContent.hosting.addressValue}</span>
                </div>
                <div className="flex">
                  <span className="font-medium w-48 text-card-foreground">{currentContent.hosting.website}:</span>
                  <a href={currentContent.hosting.websiteValue} className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                    {currentContent.hosting.websiteValue}
                  </a>
                </div>
              </div>
            </section>

            {/* Intellectual Property */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.intellectualProperty.title}</h2>
              <div className="bg-card p-6 rounded-lg space-y-4">
                {currentContent.intellectualProperty.content.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Personal Data */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.personalData.title}</h2>
              <div className="bg-card p-6 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">
                  {currentContent.personalData.content}
                </p>
              </div>
            </section>

            {/* Liability */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.liability.title}</h2>
              <div className="bg-card p-6 rounded-lg space-y-4">
                {currentContent.liability.content.map((paragraph, index) => (
                  <p key={index} className="text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            {/* Applicable Law */}
            <section className="mb-10">
              <h2 className="text-2xl font-semibold mb-4 text-foreground">{currentContent.applicableLaw.title}</h2>
              <div className="bg-card p-6 rounded-lg">
                <p className="text-muted-foreground leading-relaxed">
                  {currentContent.applicableLaw.content}
                </p>
              </div>
            </section>

            <div className="text-sm text-muted-foreground mt-8">
              {language === 'en' ? 'Last updated' : language === 'es' ? 'Última actualización' : language === 'pt' ? 'Última atualização' : language === 'it' ? 'Ultimo aggiornamento' : language === 'hu' ? 'Utolsó frissítés' : language === 'pl' ? 'Ostatnia aktualizacja' : 'Dernière mise à jour'} : {new Date().toLocaleDateString(language === 'en' ? 'en-US' : language === 'es' ? 'es-ES' : language === 'pt' ? 'pt-PT' : language === 'it' ? 'it-IT' : language === 'hu' ? 'hu-HU' : language === 'pl' ? 'pl-PL' : 'fr-FR')}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default LegalNotice;
