import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';

const TermsOfService = () => {
  const { language } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);

  const content = {
    fr: {
      title: "Conditions Générales d'Utilisation",
      description: "Conditions d'utilisation de Luxio",
      sections: {
        acceptance: {
          title: "1. Acceptation des Conditions",
          content: [
            "En accédant et en utilisant le site Luxio, vous acceptez d'être lié par les présentes conditions générales d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser ce site.",
            "Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Il est de votre responsabilité de consulter régulièrement ces conditions."
          ]
        },
        account: {
          title: "2. Compte Utilisateur",
          content: [
            "Pour accéder à certaines fonctionnalités du site, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de connexion.",
            "Vous acceptez de fournir des informations exactes, complètes et à jour lors de votre inscription et de mettre à jour ces informations si nécessaire.",
            "Vous êtes entièrement responsable de toutes les activités qui se produisent sous votre compte.",
            "Vous devez nous informer immédiatement de toute utilisation non autorisée de votre compte."
          ]
        },
        purchases: {
          title: "3. Achats et Paiements",
          content: [
            "Tous les prix affichés sont en euros (€) et incluent la TVA applicable, sauf indication contraire.",
            "Nous acceptons les paiements par virement bancaire et cryptomonnaie. Les détails de paiement sont fournis lors du processus de commande.",
            "Les commandes sont soumises à acceptation et disponibilité des produits.",
            "Nous nous réservons le droit de refuser ou d'annuler toute commande pour quelque raison que ce soit."
          ]
        },
        shipping: {
          title: "4. Livraison",
          content: [
            "Les délais de livraison sont indiqués à titre indicatif et peuvent varier selon la destination et la disponibilité des produits.",
            "Nous ne sommes pas responsables des retards de livraison causés par des circonstances indépendantes de notre volonté.",
            "Les risques liés au transport sont transférés à l'acheteur dès la remise des produits au transporteur.",
            "Vous devez vérifier l'état des produits à la livraison et signaler immédiatement toute anomalie."
          ]
        },
        returns: {
          title: "5. Droit de Rétractation",
          content: [
            "Conformément à la législation en vigueur, vous disposez d'un délai de 14 jours à compter de la réception des produits pour exercer votre droit de rétractation.",
            "Les produits doivent être retournés dans leur état d'origine, non utilisés et dans leur emballage d'origine.",
            "Les frais de retour sont à votre charge, sauf en cas de produit défectueux ou d'erreur de notre part.",
            "Le remboursement sera effectué dans un délai de 14 jours suivant la réception des produits retournés."
          ]
        },
        intellectualProperty: {
          title: "6. Propriété Intellectuelle",
          content: [
            "Tous les contenus présents sur ce site (textes, images, logos, marques) sont protégés par les droits de propriété intellectuelle et appartiennent à Luxio ou à ses partenaires.",
            "Toute reproduction, distribution ou utilisation de ces contenus sans autorisation expresse est interdite.",
            "Les marques et logos affichés sur ce site sont des marques déposées."
          ]
        },
        privacy: {
          title: "7. Protection des Données Personnelles",
          content: [
            "La collecte et le traitement de vos données personnelles sont effectués conformément à notre Politique de Confidentialité et au Règlement Général sur la Protection des Données (RGPD).",
            "Vous disposez d'un droit d'accès, de rectification, de suppression et de portabilité de vos données personnelles.",
            "Pour exercer ces droits, veuillez consulter notre page de gestion des données ou nous contacter à Contact@luxiomarket.shop."
          ]
        },
        liability: {
          title: "8. Limitation de Responsabilité",
          content: [
            "Nous nous efforçons d'assurer l'exactitude des informations sur le site, mais ne pouvons garantir l'absence d'erreurs ou d'omissions.",
            "Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs résultant de l'utilisation ou de l'impossibilité d'utiliser le site.",
            "Notre responsabilité totale ne pourra en aucun cas excéder le montant total payé par vous pour les produits ou services concernés."
          ]
        },
        termination: {
          title: "9. Résiliation",
          content: [
            "Nous nous réservons le droit de suspendre ou de résilier votre accès au site à tout moment, sans préavis, en cas de violation de ces conditions.",
            "Vous pouvez résilier votre compte à tout moment en nous contactant ou via votre espace personnel.",
            "En cas de résiliation, toutes les dispositions qui, par nature, devraient survivre à la résiliation resteront en vigueur."
          ]
        },
        law: {
          title: "10. Droit Applicable et Juridiction",
          content: [
            "Les présentes conditions générales sont régies par le droit français.",
            "Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence exclusive des tribunaux français.",
            "En cas de litige, nous encourageons une résolution amiable avant toute action judiciaire."
          ]
        },
        contact: {
          title: "11. Contact",
          content: [
            "Pour toute question concernant ces conditions générales d'utilisation, veuillez nous contacter :",
            "Email: Contact@luxiomarket.shop",
            "Adresse: 123 Avenue des Champs-Élysées, 75008 Paris, France",
            "Téléphone: +33 1 23 45 67 89"
          ]
        }
      }
    },
    en: {
      title: "Terms of Service",
      description: "Luxio Terms of Service",
      sections: {
        acceptance: {
          title: "1. Acceptance of Terms",
          content: [
            "By accessing and using the Luxio website, you agree to be bound by these terms of service. If you do not accept these terms, please do not use this site.",
            "We reserve the right to modify these terms at any time. Changes will become effective upon posting on the site. It is your responsibility to review these terms regularly."
          ]
        },
        account: {
          title: "2. User Account",
          content: [
            "To access certain features of the site, you must create an account. You are responsible for maintaining the confidentiality of your login information.",
            "You agree to provide accurate, complete and current information during registration and to update this information if necessary.",
            "You are fully responsible for all activities that occur under your account.",
            "You must notify us immediately of any unauthorized use of your account."
          ]
        },
        purchases: {
          title: "3. Purchases and Payments",
          content: [
            "All prices displayed are in euros (€) and include applicable VAT, unless otherwise stated.",
            "We accept payments by bank transfer and cryptocurrency. Payment details are provided during the ordering process.",
            "Orders are subject to acceptance and product availability.",
            "We reserve the right to refuse or cancel any order for any reason."
          ]
        },
        shipping: {
          title: "4. Delivery",
          content: [
            "Delivery times are indicative and may vary depending on destination and product availability.",
            "We are not responsible for delivery delays caused by circumstances beyond our control.",
            "Transportation risks are transferred to the buyer upon delivery of the products to the carrier.",
            "You must check the condition of products upon delivery and report any anomalies immediately."
          ]
        },
        returns: {
          title: "5. Right of Withdrawal",
          content: [
            "In accordance with applicable law, you have 14 days from receipt of products to exercise your right of withdrawal.",
            "Products must be returned in their original condition, unused and in their original packaging.",
            "Return costs are at your expense, except in case of defective products or our error.",
            "Refunds will be made within 14 days of receipt of returned products."
          ]
        },
        intellectualProperty: {
          title: "6. Intellectual Property",
          content: [
            "All content on this site (texts, images, logos, trademarks) is protected by intellectual property rights and belongs to Luxio or its partners.",
            "Any reproduction, distribution or use of this content without express permission is prohibited.",
            "Trademarks and logos displayed on this site are registered trademarks."
          ]
        },
        privacy: {
          title: "7. Personal Data Protection",
          content: [
            "The collection and processing of your personal data is carried out in accordance with our Privacy Policy and the General Data Protection Regulation (GDPR).",
            "You have the right to access, rectify, delete and port your personal data.",
            "To exercise these rights, please consult our data management page or contact us at Contact@luxiomarket.shop."
          ]
        },
        liability: {
          title: "8. Limitation of Liability",
          content: [
            "We strive to ensure the accuracy of information on the site, but cannot guarantee the absence of errors or omissions.",
            "We are not responsible for indirect, incidental or consequential damages resulting from the use or inability to use the site.",
            "Our total liability shall in no case exceed the total amount paid by you for the relevant products or services."
          ]
        },
        termination: {
          title: "9. Termination",
          content: [
            "We reserve the right to suspend or terminate your access to the site at any time, without notice, in case of violation of these terms.",
            "You may terminate your account at any time by contacting us or through your personal space.",
            "Upon termination, all provisions that by their nature should survive termination shall remain in effect."
          ]
        },
        law: {
          title: "10. Applicable Law and Jurisdiction",
          content: [
            "These terms and conditions are governed by French law.",
            "Any dispute relating to their interpretation or execution falls under the exclusive jurisdiction of French courts.",
            "In case of dispute, we encourage amicable resolution before any legal action."
          ]
        },
        contact: {
          title: "11. Contact",
          content: [
            "For any questions regarding these terms of service, please contact us:",
            "Email: Contact@luxiomarket.shop",
            "Address: 123 Avenue des Champs-Élysées, 75008 Paris, France",
            "Phone: +33 1 23 45 67 89"
          ]
        }
      }
    },
    es: {
      title: "Términos de Servicio",
      description: "Términos de servicio de Luxio",
      sections: {
        acceptance: {
          title: "1. Aceptación de los Términos",
          content: [
            "Al acceder y utilizar el sitio web de Luxio, acepta estar sujeto a estos términos de servicio. Si no acepta estos términos, por favor no use este sitio.",
            "Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor al ser publicados en el sitio. Es su responsabilidad revisar estos términos regularmente."
          ]
        },
        account: {
          title: "2. Cuenta de Usuario",
          content: [
            "Para acceder a ciertas funciones del sitio, debe crear una cuenta. Usted es responsable de mantener la confidencialidad de su información de inicio de sesión.",
            "Acepta proporcionar información precisa, completa y actualizada durante el registro y actualizar esta información si es necesario.",
            "Es totalmente responsable de todas las actividades que ocurran bajo su cuenta.",
            "Debe notificarnos inmediatamente de cualquier uso no autorizado de su cuenta."
          ]
        },
        purchases: {
          title: "3. Compras y Pagos",
          content: [
            "Todos los precios mostrados están en euros (€) e incluyen el IVA aplicable, salvo que se indique lo contrario.",
            "Aceptamos pagos por transferencia bancaria y criptomonedas. Los detalles de pago se proporcionan durante el proceso de pedido.",
            "Los pedidos están sujetos a aceptación y disponibilidad de productos.",
            "Nos reservamos el derecho de rechazar o cancelar cualquier pedido por cualquier motivo."
          ]
        },
        shipping: {
          title: "4. Entrega",
          content: [
            "Los plazos de entrega son indicativos y pueden variar según el destino y la disponibilidad del producto.",
            "No somos responsables de retrasos en la entrega causados por circunstancias fuera de nuestro control.",
            "Los riesgos de transporte se transfieren al comprador al entregar los productos al transportista.",
            "Debe verificar el estado de los productos al recibirlos e informar inmediatamente de cualquier anomalía."
          ]
        },
        returns: {
          title: "5. Derecho de Desistimiento",
          content: [
            "De acuerdo con la ley aplicable, tiene 14 días desde la recepción de los productos para ejercer su derecho de desistimiento.",
            "Los productos deben devolverse en su estado original, sin usar y en su embalaje original.",
            "Los costos de devolución corren a su cargo, excepto en caso de productos defectuosos o error nuestro.",
            "Los reembolsos se realizarán dentro de los 14 días posteriores a la recepción de los productos devueltos."
          ]
        },
        intellectualProperty: {
          title: "6. Propiedad Intelectual",
          content: [
            "Todo el contenido de este sitio (textos, imágenes, logotipos, marcas) está protegido por derechos de propiedad intelectual y pertenece a Luxio o sus socios.",
            "Cualquier reproducción, distribución o uso de este contenido sin permiso expreso está prohibida.",
            "Las marcas y logotipos mostrados en este sitio son marcas registradas."
          ]
        },
        privacy: {
          title: "7. Protección de Datos Personales",
          content: [
            "La recopilación y el procesamiento de sus datos personales se llevan a cabo de acuerdo con nuestra Política de Privacidad y el Reglamento General de Protección de Datos (RGPD).",
            "Tiene derecho a acceder, rectificar, eliminar y portar sus datos personales.",
            "Para ejercer estos derechos, consulte nuestra página de gestión de datos o contáctenos en Contact@luxiomarket.shop."
          ]
        },
        liability: {
          title: "8. Limitación de Responsabilidad",
          content: [
            "Nos esforzamos por garantizar la exactitud de la información en el sitio, pero no podemos garantizar la ausencia de errores u omisiones.",
            "No somos responsables de daños indirectos, incidentales o consecuentes que resulten del uso o la imposibilidad de usar el sitio.",
            "Nuestra responsabilidad total no excederá en ningún caso el monto total pagado por usted por los productos o servicios relevantes."
          ]
        },
        termination: {
          title: "9. Terminación",
          content: [
            "Nos reservamos el derecho de suspender o terminar su acceso al sitio en cualquier momento, sin previo aviso, en caso de violación de estos términos.",
            "Puede terminar su cuenta en cualquier momento contactándonos o a través de su espacio personal.",
            "Al terminar, todas las disposiciones que por su naturaleza deberían sobrevivir a la terminación permanecerán en vigor."
          ]
        },
        law: {
          title: "10. Ley Aplicable y Jurisdicción",
          content: [
            "Estos términos y condiciones se rigen por la ley francesa.",
            "Cualquier disputa relacionada con su interpretación o ejecución está bajo la jurisdicción exclusiva de los tribunales franceses.",
            "En caso de disputa, alentamos una resolución amistosa antes de cualquier acción legal."
          ]
        },
        contact: {
          title: "11. Contacto",
          content: [
            "Para cualquier pregunta sobre estos términos de servicio, contáctenos:",
            "Email: Contact@luxiomarket.shop",
            "Dirección: 123 Avenue des Champs-Élysées, 75008 París, Francia",
            "Teléfono: +33 1 23 45 67 89"
          ]
        }
      }
    },
    pt: {
      title: "Termos de Serviço",
      description: "Termos de serviço da Luxio",
      sections: {
        acceptance: {
          title: "1. Aceitação dos Termos",
          content: [
            "Ao acessar e usar o site Luxio, você concorda em estar vinculado a estes termos de serviço. Se você não aceitar estes termos, por favor não use este site.",
            "Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor após a publicação no site. É sua responsabilidade revisar estes termos regularmente."
          ]
        },
        account: {
          title: "2. Conta de Usuário",
          content: [
            "Para acessar certos recursos do site, você deve criar uma conta. Você é responsável por manter a confidencialidade de suas informações de login.",
            "Você concorda em fornecer informações precisas, completas e atuais durante o registro e atualizar essas informações, se necessário.",
            "Você é totalmente responsável por todas as atividades que ocorrem sob sua conta.",
            "Você deve nos notificar imediatamente sobre qualquer uso não autorizado de sua conta."
          ]
        },
        purchases: {
          title: "3. Compras e Pagamentos",
          content: [
            "Todos os preços exibidos são em euros (€) e incluem o IVA aplicável, salvo indicação em contrário.",
            "Aceitamos pagamentos por transferência bancária e criptomoedas. Os detalhes de pagamento são fornecidos durante o processo de pedido.",
            "Os pedidos estão sujeitos a aceitação e disponibilidade de produtos.",
            "Reservamo-nos o direito de recusar ou cancelar qualquer pedido por qualquer motivo."
          ]
        },
        shipping: {
          title: "4. Entrega",
          content: [
            "Os prazos de entrega são indicativos e podem variar dependendo do destino e disponibilidade do produto.",
            "Não somos responsáveis por atrasos na entrega causados por circunstâncias fora do nosso controle.",
            "Os riscos de transporte são transferidos para o comprador na entrega dos produtos à transportadora.",
            "Você deve verificar a condição dos produtos ao recebê-los e relatar imediatamente qualquer anomalia."
          ]
        },
        returns: {
          title: "5. Direito de Desistência",
          content: [
            "De acordo com a lei aplicável, você tem 14 dias a partir do recebimento dos produtos para exercer seu direito de desistência.",
            "Os produtos devem ser devolvidos em sua condição original, não usados e em sua embalagem original.",
            "Os custos de devolução são por sua conta, exceto em caso de produtos defeituosos ou erro nosso.",
            "Os reembolsos serão feitos dentro de 14 dias após o recebimento dos produtos devolvidos."
          ]
        },
        intellectualProperty: {
          title: "6. Propriedade Intelectual",
          content: [
            "Todo o conteúdo deste site (textos, imagens, logotipos, marcas) é protegido por direitos de propriedade intelectual e pertence à Luxio ou seus parceiros.",
            "Qualquer reprodução, distribuição ou uso deste conteúdo sem permissão expressa é proibida.",
            "Marcas e logotipos exibidos neste site são marcas registradas."
          ]
        },
        privacy: {
          title: "7. Proteção de Dados Pessoais",
          content: [
            "A coleta e o processamento de seus dados pessoais são realizados de acordo com nossa Política de Privacidade e o Regulamento Geral de Proteção de Dados (RGPD).",
            "Você tem o direito de acessar, retificar, excluir e portar seus dados pessoais.",
            "Para exercer esses direitos, consulte nossa página de gerenciamento de dados ou entre em contato conosco em Contact@luxiomarket.shop."
          ]
        },
        liability: {
          title: "8. Limitação de Responsabilidade",
          content: [
            "Nós nos esforçamos para garantir a precisão das informações no site, mas não podemos garantir a ausência de erros ou omissões.",
            "Não somos responsáveis por danos indiretos, incidentais ou consequentes resultantes do uso ou da impossibilidade de usar o site.",
            "Nossa responsabilidade total não excederá em nenhum caso o valor total pago por você pelos produtos ou serviços relevantes."
          ]
        },
        termination: {
          title: "9. Rescisão",
          content: [
            "Reservamo-nos o direito de suspender ou encerrar seu acesso ao site a qualquer momento, sem aviso prévio, em caso de violação destes termos.",
            "Você pode encerrar sua conta a qualquer momento entrando em contato conosco ou através do seu espaço pessoal.",
            "Ao encerrar, todas as disposições que por sua natureza devem sobreviver ao encerramento permanecerão em vigor."
          ]
        },
        law: {
          title: "10. Lei Aplicável e Jurisdição",
          content: [
            "Estes termos e condições são regidos pela lei francesa.",
            "Qualquer disputa relacionada à sua interpretação ou execução está sob a jurisdição exclusiva dos tribunais franceses.",
            "Em caso de disputa, encorajamos uma resolução amigável antes de qualquer ação legal."
          ]
        },
        contact: {
          title: "11. Contato",
          content: [
            "Para quaisquer perguntas sobre estes termos de serviço, entre em contato conosco:",
            "Email: Contact@luxiomarket.shop",
            "Endereço: 123 Avenue des Champs-Élysées, 75008 Paris, França",
            "Telefone: +33 1 23 45 67 89"
          ]
        }
      }
    },
    it: {
      title: "Termini di Servizio",
      description: "Termini di servizio di Luxio",
      sections: {
        acceptance: {
          title: "1. Accettazione dei Termini",
          content: [
            "Accedendo e utilizzando il sito Luxio, accetti di essere vincolato da questi termini di servizio. Se non accetti questi termini, ti preghiamo di non utilizzare questo sito.",
            "Ci riserviamo il diritto di modificare questi termini in qualsiasi momento. Le modifiche entreranno in vigore dopo la pubblicazione sul sito. È tua responsabilità rivedere questi termini regolarmente."
          ]
        },
        account: {
          title: "2. Account Utente",
          content: [
            "Per accedere a determinate funzionalità del sito, devi creare un account. Sei responsabile del mantenimento della riservatezza delle tue informazioni di accesso.",
            "Accetti di fornire informazioni accurate, complete e aggiornate durante la registrazione e di aggiornare queste informazioni se necessario.",
            "Sei completamente responsabile di tutte le attività che si verificano sotto il tuo account.",
            "Devi notificarci immediatamente di qualsiasi uso non autorizzato del tuo account."
          ]
        },
        purchases: {
          title: "3. Acquisti e Pagamenti",
          content: [
            "Tutti i prezzi visualizzati sono in euro (€) e includono l'IVA applicabile, salvo diversa indicazione.",
            "Accettiamo pagamenti tramite bonifico bancario e criptovalute. I dettagli di pagamento vengono forniti durante il processo di ordine.",
            "Gli ordini sono soggetti ad accettazione e disponibilità dei prodotti.",
            "Ci riserviamo il diritto di rifiutare o annullare qualsiasi ordine per qualsiasi motivo."
          ]
        },
        shipping: {
          title: "4. Consegna",
          content: [
            "I tempi di consegna sono indicativi e possono variare a seconda della destinazione e della disponibilità del prodotto.",
            "Non siamo responsabili per ritardi nella consegna causati da circostanze al di fuori del nostro controllo.",
            "I rischi di trasporto vengono trasferiti all'acquirente alla consegna dei prodotti al corriere.",
            "Devi verificare la condizione dei prodotti al ricevimento e segnalare immediatamente eventuali anomalie."
          ]
        },
        returns: {
          title: "5. Diritto di Recesso",
          content: [
            "In conformità con la legge applicabile, hai 14 giorni dal ricevimento dei prodotti per esercitare il tuo diritto di recesso.",
            "I prodotti devono essere restituiti nella loro condizione originale, non utilizzati e nella loro confezione originale.",
            "I costi di reso sono a tuo carico, tranne in caso di prodotti difettosi o nostro errore.",
            "I rimborsi verranno effettuati entro 14 giorni dal ricevimento dei prodotti restituiti."
          ]
        },
        intellectualProperty: {
          title: "6. Proprietà Intellettuale",
          content: [
            "Tutti i contenuti di questo sito (testi, immagini, loghi, marchi) sono protetti da diritti di proprietà intellettuale e appartengono a Luxio o ai suoi partner.",
            "Qualsiasi riproduzione, distribuzione o uso di questo contenuto senza permesso esplicito è vietata.",
            "I marchi e i loghi visualizzati su questo sito sono marchi registrati."
          ]
        },
        privacy: {
          title: "7. Protezione dei Dati Personali",
          content: [
            "La raccolta e il trattamento dei tuoi dati personali vengono effettuati in conformità con la nostra Informativa sulla Privacy e il Regolamento Generale sulla Protezione dei Dati (GDPR).",
            "Hai il diritto di accedere, rettificare, cancellare e portare i tuoi dati personali.",
            "Per esercitare questi diritti, consulta la nostra pagina di gestione dati o contattaci a Contact@luxiomarket.shop."
          ]
        },
        liability: {
          title: "8. Limitazione di Responsabilità",
          content: [
            "Ci impegniamo a garantire l'accuratezza delle informazioni sul sito, ma non possiamo garantire l'assenza di errori od omissioni.",
            "Non siamo responsabili di danni indiretti, incidentali o consequenziali derivanti dall'uso o dall'impossibilità di utilizzare il sito.",
            "La nostra responsabilità totale non supererà in nessun caso l'importo totale pagato da te per i prodotti o servizi rilevanti."
          ]
        },
        termination: {
          title: "9. Risoluzione",
          content: [
            "Ci riserviamo il diritto di sospendere o terminare il tuo accesso al sito in qualsiasi momento, senza preavviso, in caso di violazione di questi termini.",
            "Puoi terminare il tuo account in qualsiasi momento contattandoci o attraverso il tuo spazio personale.",
            "Alla risoluzione, tutte le disposizioni che per loro natura dovrebbero sopravvivere alla risoluzione rimarranno in vigore."
          ]
        },
        law: {
          title: "10. Legge Applicabile e Giurisdizione",
          content: [
            "Questi termini e condizioni sono regolati dalla legge francese.",
            "Qualsiasi controversia relativa alla loro interpretazione o esecuzione rientra nella giurisdizione esclusiva dei tribunali francesi.",
            "In caso di controversia, incoraggiamo una risoluzione amichevole prima di qualsiasi azione legale."
          ]
        },
        contact: {
          title: "11. Contatto",
          content: [
            "Per qualsiasi domanda riguardo a questi termini di servizio, contattaci:",
            "Email: Contact@luxiomarket.shop",
            "Indirizzo: 123 Avenue des Champs-Élysées, 75008 Parigi, Francia",
            "Telefono: +33 1 23 45 67 89"
          ]
        }
      }
    },
    hu: {
      title: "Szolgáltatási Feltételek",
      description: "Luxio szolgáltatási feltételek",
      sections: {
        acceptance: {
          title: "1. Feltételek Elfogadása",
          content: [
            "A Luxio webhely elérésével és használatával elfogadja, hogy kötve van ezekhez a szolgáltatási feltételekhez. Ha nem fogadja el ezeket a feltételeket, kérjük, ne használja ezt az oldalt.",
            "Fenntartjuk a jogot arra, hogy bármikor módosítsuk ezeket a feltételeket. A változások az oldalon történő közzététel után lépnek hatályba. Az Ön felelőssége, hogy rendszeresen ellenőrizze ezeket a feltételeket."
          ]
        },
        account: {
          title: "2. Felhasználói Fiók",
          content: [
            "Az oldal bizonyos funkcióinak eléréséhez létre kell hoznia egy fiókot. Ön felelős a bejelentkezési adatok bizalmas kezeléséért.",
            "Vállalja, hogy pontos, teljes és naprakész információkat szolgáltat a regisztráció során, és szükség esetén frissíti ezeket az információkat.",
            "Ön teljes mértékben felelős a fiókja alatt zajló összes tevékenységért.",
            "Azonnal értesítenie kell minket a fiókjának bármilyen jogosulatlan használatáról."
          ]
        },
        purchases: {
          title: "3. Vásárlások és Fizetések",
          content: [
            "Minden megjelenített ár euróban (€) van feltüntetve és tartalmazza az alkalmazandó áfát, hacsak másként nincs jelezve.",
            "Elfogadunk fizetéseket banki átutalással és kriptovalutával. A fizetési részletek a rendelési folyamat során kerülnek megadásra.",
            "A rendelések elfogadás és termék elérhetőség függvényében történnek.",
            "Fenntartjuk a jogot arra, hogy bármilyen okból megtagadjuk vagy töröljük a rendelést."
          ]
        },
        shipping: {
          title: "4. Kiszállítás",
          content: [
            "A szállítási időpontok tájékoztató jellegűek és változhatnak az úti cél és a termék elérhetősége szerint.",
            "Nem vagyunk felelősek a rajtunk kívül álló körülmények miatt bekövetkező szállítási késésekért.",
            "A szállítási kockázatok átkerülnek a vevőre a termékek szállítónak történő átadásakor.",
            "Ellenőriznie kell a termékek állapotát átvételkor, és azonnal jelentenie kell minden rendellenességet."
          ]
        },
        returns: {
          title: "5. Elállási Jog",
          content: [
            "Az alkalmazandó törvényekkel összhangban 14 napja van a termékek átvételétől számítva az elállási jog gyakorlására.",
            "A termékeket eredeti állapotban, használatlanul és eredeti csomagolásban kell visszaküldeni.",
            "A visszaküldés költségei az Ön terhére esnek, kivéve hibás termékek vagy a mi hibánk esetén.",
            "A visszatérítés a visszaküldött termékek átvételét követő 14 napon belül történik."
          ]
        },
        intellectualProperty: {
          title: "6. Szellemi Tulajdon",
          content: [
            "Az ezen az oldalon található összes tartalom (szövegek, képek, logók, védjegyek) szellemi tulajdonjogok védelme alatt áll és a Luxio vagy partnerei tulajdonában van.",
            "Ezen tartalom bármilyen reprodukálása, terjesztése vagy használata kifejezett engedély nélkül tilos.",
            "Az ezen az oldalon megjelenített védjegyek és logók bejegyzett védjegyek."
          ]
        },
        privacy: {
          title: "7. Személyes Adatok Védelme",
          content: [
            "Az Ön személyes adatainak gyűjtése és feldolgozása Adatvédelmi Irányelvünk és az Általános Adatvédelmi Rendelet (GDPR) szerint történik.",
            "Jogában áll hozzáférni, javítani, törölni és hordozni személyes adatait.",
            "Ezen jogok gyakorlásához látogassa meg adatkezelési oldalunkat vagy lépjen kapcsolatba velünk a Contact@luxiomarket.shop címen."
          ]
        },
        liability: {
          title: "8. Felelősség Korlátozása",
          content: [
            "Törekszünk az oldal információinak pontosságára, de nem tudjuk garantálni a hibák vagy mulasztások hiányát.",
            "Nem vagyunk felelősek az oldal használatából vagy használatának lehetetlenségéből eredő közvetett, véletlen vagy következményes károkért.",
            "Teljes felelősségünk semmilyen esetben nem haladhatja meg az Ön által a vonatkozó termékekért vagy szolgáltatásokért fizetett teljes összeget."
          ]
        },
        termination: {
          title: "9. Megszüntetés",
          content: [
            "Fenntartjuk a jogot arra, hogy bármikor, előzetes értesítés nélkül felfüggesszük vagy megszüntessük az oldalhoz való hozzáférését ezen feltételek megsértése esetén.",
            "Bármikor megszüntetheti fiókját azzal, hogy kapcsolatba lép velünk vagy személyes terében.",
            "Megszüntetéskor minden olyan rendelkezés, amelynek természete szerint túl kell élnie a megszüntetést, hatályban marad."
          ]
        },
        law: {
          title: "10. Alkalmazandó Jog és Joghatóság",
          content: [
            "Ezeket a feltételeket a francia jog szabályozza.",
            "Az értelmezésükkel vagy végrehajtásukkal kapcsolatos bármilyen vita a francia bíróságok kizárólagos joghatósága alá tartozik.",
            "Vita esetén bármilyen jogi lépés előtt barátságos megoldást ösztönzünk."
          ]
        },
        contact: {
          title: "11. Kapcsolat",
          content: [
            "A szolgáltatási feltételekkel kapcsolatos kérdésekért lépjen kapcsolatba velünk:",
            "Email: Contact@luxiomarket.shop",
            "Cím: 123 Avenue des Champs-Élysées, 75008 Párizs, Franciaország",
            "Telefon: +33 1 23 45 67 89"
          ]
        }
      }
    },
    pl: {
      title: "Warunki Świadczenia Usług",
      description: "Warunki świadczenia usług Luxio",
      sections: {
        acceptance: {
          title: "1. Akceptacja Warunków",
          content: [
            "Uzyskując dostęp i korzystając ze strony Luxio, zgadzasz się być związany tymi warunkami świadczenia usług. Jeśli nie akceptujesz tych warunków, prosimy nie korzystać z tej strony.",
            "Zastrzegamy sobie prawo do modyfikacji tych warunków w dowolnym momencie. Zmiany wejdą w życie po opublikowaniu na stronie. Twoim obowiązkiem jest regularne sprawdzanie tych warunków."
          ]
        },
        account: {
          title: "2. Konto Użytkownika",
          content: [
            "Aby uzyskać dostęp do niektórych funkcji strony, musisz utworzyć konto. Jesteś odpowiedzialny za zachowanie poufności informacji logowania.",
            "Zgadzasz się podać dokładne, kompletne i aktualne informacje podczas rejestracji i zaktualizować te informacje w razie potrzeby.",
            "Jesteś w pełni odpowiedzialny za wszystkie działania zachodzące na Twoim koncie.",
            "Musisz natychmiast powiadomić nas o wszelkim nieautoryzowanym użyciu Twojego konta."
          ]
        },
        purchases: {
          title: "3. Zakupy i Płatności",
          content: [
            "Wszystkie wyświetlane ceny są w euro (€) i zawierają odpowiedni VAT, chyba że zaznaczono inaczej.",
            "Akceptujemy płatności przelewem bankowym i kryptowalutą. Szczegóły płatności są podawane podczas procesu zamawiania.",
            "Zamówienia podlegają akceptacji i dostępności produktów.",
            "Zastrzegamy sobie prawo do odmowy lub anulowania jakiegokolwiek zamówienia z dowolnego powodu."
          ]
        },
        shipping: {
          title: "4. Dostawa",
          content: [
            "Terminy dostawy są orientacyjne i mogą się różnić w zależności od miejsca docelowego i dostępności produktu.",
            "Nie ponosimy odpowiedzialności za opóźnienia w dostawie spowodowane okolicznościami poza naszą kontrolą.",
            "Ryzyko transportu przechodzi na kupującego po przekazaniu produktów przewoźnikowi.",
            "Musisz sprawdzić stan produktów po otrzymaniu i natychmiast zgłosić wszelkie nieprawidłowości."
          ]
        },
        returns: {
          title: "5. Prawo do Odstąpienia",
          content: [
            "Zgodnie z obowiązującym prawem masz 14 dni od otrzymania produktów na skorzystanie z prawa odstąpienia od umowy.",
            "Produkty muszą być zwrócone w oryginalnym stanie, nieużywane i w oryginalnym opakowaniu.",
            "Koszty zwrotu ponosi klient, z wyjątkiem wadliwych produktów lub naszego błędu.",
            "Zwrot pieniędzy zostanie dokonany w ciągu 14 dni od otrzymania zwróconych produktów."
          ]
        },
        intellectualProperty: {
          title: "6. Własność Intelektualna",
          content: [
            "Cała zawartość tej strony (teksty, obrazy, logo, znaki towarowe) jest chroniona prawami własności intelektualnej i należy do Luxio lub jej partnerów.",
            "Jakakolwiek reprodukcja, dystrybucja lub wykorzystanie tej treści bez wyraźnego pozwolenia jest zabroniona.",
            "Znaki towarowe i logo wyświetlane na tej stronie są zarejestrowanymi znakami towarowymi."
          ]
        },
        privacy: {
          title: "7. Ochrona Danych Osobowych",
          content: [
            "Gromadzenie i przetwarzanie Twoich danych osobowych odbywa się zgodnie z naszą Polityką Prywatności i Ogólnym Rozporządzeniem o Ochronie Danych (RODO).",
            "Masz prawo dostępu, poprawiania, usuwania i przenoszenia swoich danych osobowych.",
            "Aby skorzystać z tych praw, zapoznaj się z naszą stroną zarządzania danymi lub skontaktuj się z nami pod adresem Contact@luxiomarket.shop."
          ]
        },
        liability: {
          title: "8. Ograniczenie Odpowiedzialności",
          content: [
            "Staramy się zapewnić dokładność informacji na stronie, ale nie możemy zagwarantować braku błędów lub pominięć.",
            "Nie ponosimy odpowiedzialności za szkody pośrednie, przypadkowe lub wtórne wynikające z korzystania lub niemożności korzystania ze strony.",
            "Nasza całkowita odpowiedzialność w żadnym wypadku nie przekroczy całkowitej kwoty zapłaconej przez Ciebie za odpowiednie produkty lub usługi."
          ]
        },
        termination: {
          title: "9. Rozwiązanie",
          content: [
            "Zastrzegamy sobie prawo do zawieszenia lub zakończenia Twojego dostępu do strony w dowolnym momencie, bez powiadomienia, w przypadku naruszenia tych warunków.",
            "Możesz rozwiązać swoje konto w dowolnym momencie, kontaktując się z nami lub przez swój panel osobisty.",
            "Po rozwiązaniu wszystkie postanowienia, które ze względu na ich charakter powinny przetrwać rozwiązanie, pozostają w mocy."
          ]
        },
        law: {
          title: "10. Prawo Właściwe i Jurysdykcja",
          content: [
            "Te warunki są regulowane prawem francuskim.",
            "Wszelkie spory związane z ich interpretacją lub wykonaniem podlegają wyłącznej jurysdykcji sądów francuskich.",
            "W przypadku sporu zachęcamy do polubownego rozwiązania przed jakimkolwiek postępowaniem sądowym."
          ]
        },
        contact: {
          title: "11. Kontakt",
          content: [
            "W przypadku pytań dotyczących tych warunków świadczenia usług, skontaktuj się z nami:",
            "Email: Contact@luxiomarket.shop",
            "Adres: 123 Avenue des Champs-Élysées, 75008 Paryż, Francja",
            "Telefon: +33 1 23 45 67 89"
          ]
        }
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.fr;
  const sections = Object.values(currentContent.sections);

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
            
            {sections.map((section, index) => (
              <section key={index} className="mb-10">
                <h2 className="text-2xl font-semibold mb-4 text-foreground">{section.title}</h2>
                <div className="bg-card p-6 rounded-lg space-y-4">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}

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

export default TermsOfService;
