import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CartSidebar } from '@/components/CartSidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Download, Trash2, Shield, FileText } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useLocation } from 'wouter';

const GdprDashboard = () => {
  const { language } = useLanguage();
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [cartOpen, setCartOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [consents, setConsents] = useState({
    marketingEmails: false,
    analyticsTracking: false,
    thirdPartySharing: false
  });
  const [isLoadingConsents, setIsLoadingConsents] = useState(false);

  const content = {
    fr: {
      title: "Gestion de vos Données Personnelles",
      description: "Gérez vos données personnelles et vos droits RGPD",
      sections: {
        export: {
          title: "Exporter vos données",
          description: "Téléchargez toutes les données personnelles que nous avons collectées sur vous.",
          button: "Télécharger mes données",
          success: "Vos données ont été exportées avec succès",
          error: "Erreur lors de l'export des données"
        },
        consents: {
          title: "Gestion des consentements",
          description: "Gérez vos préférences de consentement pour le traitement de vos données.",
          marketing: "Emails marketing",
          marketingDesc: "Recevoir des offres et promotions par email",
          analytics: "Suivi analytique",
          analyticsDesc: "Permettre le suivi pour améliorer votre expérience",
          thirdParty: "Partage avec des tiers",
          thirdPartyDesc: "Autoriser le partage de données avec nos partenaires",
          button: "Enregistrer les préférences",
          success: "Vos préférences ont été enregistrées",
          error: "Erreur lors de l'enregistrement"
        },
        delete: {
          title: "Supprimer votre compte",
          description: "Supprimez définitivement votre compte et toutes vos données personnelles. Cette action est irréversible.",
          warning: "⚠️ Attention : Cette action est irréversible",
          passwordLabel: "Mot de passe",
          passwordPlaceholder: "Entrez votre mot de passe pour confirmer",
          confirmButton: "Supprimer mon compte",
          cancelButton: "Annuler",
          dialogTitle: "Êtes-vous absolument sûr ?",
          dialogDescription: "Cette action ne peut pas être annulée. Cela supprimera définitivement votre compte et toutes vos données de nos serveurs.",
          success: "Votre compte a été supprimé",
          error: "Erreur lors de la suppression du compte",
          activeOrders: "Impossible de supprimer le compte avec des commandes actives"
        },
        rights: {
          title: "Vos droits RGPD",
          description: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :",
          right1: "Droit d'accès : Accédez à vos données personnelles",
          right2: "Droit de rectification : Corrigez vos données inexactes",
          right3: "Droit à l'effacement : Supprimez vos données",
          right4: "Droit à la portabilité : Exportez vos données",
          right5: "Droit d'opposition : Opposez-vous au traitement de vos données",
          right6: "Droit à la limitation : Limitez le traitement de vos données"
        }
      }
    },
    en: {
      title: "Manage Your Personal Data",
      description: "Manage your personal data and GDPR rights",
      sections: {
        export: {
          title: "Export Your Data",
          description: "Download all personal data we have collected about you.",
          button: "Download My Data",
          success: "Your data has been exported successfully",
          error: "Error exporting data"
        },
        consents: {
          title: "Consent Management",
          description: "Manage your consent preferences for data processing.",
          marketing: "Marketing Emails",
          marketingDesc: "Receive offers and promotions by email",
          analytics: "Analytics Tracking",
          analyticsDesc: "Allow tracking to improve your experience",
          thirdParty: "Third-party Sharing",
          thirdPartyDesc: "Allow data sharing with our partners",
          button: "Save Preferences",
          success: "Your preferences have been saved",
          error: "Error saving preferences"
        },
        delete: {
          title: "Delete Your Account",
          description: "Permanently delete your account and all your personal data. This action is irreversible.",
          warning: "⚠️ Warning: This action is irreversible",
          passwordLabel: "Password",
          passwordPlaceholder: "Enter your password to confirm",
          confirmButton: "Delete My Account",
          cancelButton: "Cancel",
          dialogTitle: "Are you absolutely sure?",
          dialogDescription: "This action cannot be undone. This will permanently delete your account and remove all your data from our servers.",
          success: "Your account has been deleted",
          error: "Error deleting account",
          activeOrders: "Cannot delete account with active orders"
        },
        rights: {
          title: "Your GDPR Rights",
          description: "In accordance with the General Data Protection Regulation (GDPR), you have the following rights:",
          right1: "Right of access: Access your personal data",
          right2: "Right to rectification: Correct your inaccurate data",
          right3: "Right to erasure: Delete your data",
          right4: "Right to portability: Export your data",
          right5: "Right to object: Object to the processing of your data",
          right6: "Right to restriction: Restrict the processing of your data"
        }
      }
    },
    es: {
      title: "Gestione sus Datos Personales",
      description: "Gestione sus datos personales y derechos RGPD",
      sections: {
        export: {
          title: "Exportar sus Datos",
          description: "Descargue todos los datos personales que hemos recopilado sobre usted.",
          button: "Descargar Mis Datos",
          success: "Sus datos han sido exportados correctamente",
          error: "Error al exportar los datos"
        },
        consents: {
          title: "Gestión de Consentimientos",
          description: "Gestione sus preferencias de consentimiento para el procesamiento de datos.",
          marketing: "Correos de Marketing",
          marketingDesc: "Recibir ofertas y promociones por correo electrónico",
          analytics: "Seguimiento Analítico",
          analyticsDesc: "Permitir seguimiento para mejorar su experiencia",
          thirdParty: "Compartir con Terceros",
          thirdPartyDesc: "Permitir compartir datos con nuestros socios",
          button: "Guardar Preferencias",
          success: "Sus preferencias han sido guardadas",
          error: "Error al guardar preferencias"
        },
        delete: {
          title: "Eliminar su Cuenta",
          description: "Elimine permanentemente su cuenta y todos sus datos personales. Esta acción es irreversible.",
          warning: "⚠️ Advertencia: Esta acción es irreversible",
          passwordLabel: "Contraseña",
          passwordPlaceholder: "Ingrese su contraseña para confirmar",
          confirmButton: "Eliminar Mi Cuenta",
          cancelButton: "Cancelar",
          dialogTitle: "¿Está absolutamente seguro?",
          dialogDescription: "Esta acción no se puede deshacer. Esto eliminará permanentemente su cuenta y eliminará todos sus datos de nuestros servidores.",
          success: "Su cuenta ha sido eliminada",
          error: "Error al eliminar la cuenta",
          activeOrders: "No se puede eliminar la cuenta con pedidos activos"
        },
        rights: {
          title: "Sus Derechos RGPD",
          description: "De acuerdo con el Reglamento General de Protección de Datos (RGPD), tiene los siguientes derechos:",
          right1: "Derecho de acceso: Acceda a sus datos personales",
          right2: "Derecho de rectificación: Corrija sus datos inexactos",
          right3: "Derecho de supresión: Elimine sus datos",
          right4: "Derecho a la portabilidad: Exporte sus datos",
          right5: "Derecho de oposición: Opóngase al procesamiento de sus datos",
          right6: "Derecho a la limitación: Limite el procesamiento de sus datos"
        }
      }
    },
    pt: {
      title: "Gerencie seus Dados Pessoais",
      description: "Gerencie seus dados pessoais e direitos RGPD",
      sections: {
        export: {
          title: "Exportar seus Dados",
          description: "Baixe todos os dados pessoais que coletamos sobre você.",
          button: "Baixar Meus Dados",
          success: "Seus dados foram exportados com sucesso",
          error: "Erro ao exportar dados"
        },
        consents: {
          title: "Gerenciamento de Consentimento",
          description: "Gerencie suas preferências de consentimento para processamento de dados.",
          marketing: "Emails de Marketing",
          marketingDesc: "Receber ofertas e promoções por email",
          analytics: "Rastreamento Analítico",
          analyticsDesc: "Permitir rastreamento para melhorar sua experiência",
          thirdParty: "Compartilhamento com Terceiros",
          thirdPartyDesc: "Permitir compartilhamento de dados com nossos parceiros",
          button: "Salvar Preferências",
          success: "Suas preferências foram salvas",
          error: "Erro ao salvar preferências"
        },
        delete: {
          title: "Excluir sua Conta",
          description: "Exclua permanentemente sua conta e todos os seus dados pessoais. Esta ação é irreversível.",
          warning: "⚠️ Aviso: Esta ação é irreversível",
          passwordLabel: "Senha",
          passwordPlaceholder: "Digite sua senha para confirmar",
          confirmButton: "Excluir Minha Conta",
          cancelButton: "Cancelar",
          dialogTitle: "Você tem certeza absoluta?",
          dialogDescription: "Esta ação não pode ser desfeita. Isso excluirá permanentemente sua conta e removerá todos os seus dados de nossos servidores.",
          success: "Sua conta foi excluída",
          error: "Erro ao excluir conta",
          activeOrders: "Não é possível excluir conta com pedidos ativos"
        },
        rights: {
          title: "Seus Direitos RGPD",
          description: "De acordo com o Regulamento Geral de Proteção de Dados (RGPD), você tem os seguintes direitos:",
          right1: "Direito de acesso: Acesse seus dados pessoais",
          right2: "Direito de retificação: Corrija seus dados imprecisos",
          right3: "Direito ao apagamento: Exclua seus dados",
          right4: "Direito à portabilidade: Exporte seus dados",
          right5: "Direito de oposição: Oponha-se ao processamento de seus dados",
          right6: "Direito à limitação: Limite o processamento de seus dados"
        }
      }
    },
    it: {
      title: "Gestisci i tuoi Dati Personali",
      description: "Gestisci i tuoi dati personali e i diritti GDPR",
      sections: {
        export: {
          title: "Esporta i tuoi Dati",
          description: "Scarica tutti i dati personali che abbiamo raccolto su di te.",
          button: "Scarica i Miei Dati",
          success: "I tuoi dati sono stati esportati con successo",
          error: "Errore nell'esportazione dei dati"
        },
        consents: {
          title: "Gestione del Consenso",
          description: "Gestisci le tue preferenze di consenso per il trattamento dei dati.",
          marketing: "Email di Marketing",
          marketingDesc: "Ricevere offerte e promozioni via email",
          analytics: "Tracciamento Analitico",
          analyticsDesc: "Consentire il tracciamento per migliorare la tua esperienza",
          thirdParty: "Condivisione con Terze Parti",
          thirdPartyDesc: "Consentire la condivisione dei dati con i nostri partner",
          button: "Salva Preferenze",
          success: "Le tue preferenze sono state salvate",
          error: "Errore nel salvare le preferenze"
        },
        delete: {
          title: "Elimina il tuo Account",
          description: "Elimina permanentemente il tuo account e tutti i tuoi dati personali. Questa azione è irreversibile.",
          warning: "⚠️ Attenzione: Questa azione è irreversibile",
          passwordLabel: "Password",
          passwordPlaceholder: "Inserisci la tua password per confermare",
          confirmButton: "Elimina il Mio Account",
          cancelButton: "Annulla",
          dialogTitle: "Sei assolutamente sicuro?",
          dialogDescription: "Questa azione non può essere annullata. Questo eliminerà permanentemente il tuo account e rimuoverà tutti i tuoi dati dai nostri server.",
          success: "Il tuo account è stato eliminato",
          error: "Errore nell'eliminazione dell'account",
          activeOrders: "Impossibile eliminare l'account con ordini attivi"
        },
        rights: {
          title: "I tuoi Diritti GDPR",
          description: "In conformità con il Regolamento Generale sulla Protezione dei Dati (GDPR), hai i seguenti diritti:",
          right1: "Diritto di accesso: Accedi ai tuoi dati personali",
          right2: "Diritto di rettifica: Correggi i tuoi dati inesatti",
          right3: "Diritto alla cancellazione: Elimina i tuoi dati",
          right4: "Diritto alla portabilità: Esporta i tuoi dati",
          right5: "Diritto di opposizione: Opponi al trattamento dei tuoi dati",
          right6: "Diritto alla limitazione: Limita il trattamento dei tuoi dati"
        }
      }
    },
    hu: {
      title: "Személyes Adatok Kezelése",
      description: "Kezelje személyes adatait és GDPR jogait",
      sections: {
        export: {
          title: "Adatok Exportálása",
          description: "Töltse le az összes személyes adatot, amelyet rólad gyűjtöttünk.",
          button: "Adataim Letöltése",
          success: "Adatai sikeresen exportálva",
          error: "Hiba az adatok exportálása során"
        },
        consents: {
          title: "Hozzájárulás Kezelése",
          description: "Kezelje hozzájárulási preferenciáit az adatfeldolgozáshoz.",
          marketing: "Marketing Emailek",
          marketingDesc: "Ajánlatok és promóciók fogadása emailben",
          analytics: "Analitikai Követés",
          analyticsDesc: "Követés engedélyezése a felhasználói élmény javítása érdekében",
          thirdParty: "Harmadik Féllel való Megosztás",
          thirdPartyDesc: "Adatmegosztás engedélyezése partnereinkkel",
          button: "Preferenciák Mentése",
          success: "Preferenciái mentésre kerültek",
          error: "Hiba a preferenciák mentése során"
        },
        delete: {
          title: "Fiók Törlése",
          description: "Törölje véglegesen fiókját és minden személyes adatát. Ez a művelet visszavonhatatlan.",
          warning: "⚠️ Figyelem: Ez a művelet visszavonhatatlan",
          passwordLabel: "Jelszó",
          passwordPlaceholder: "Adja meg jelszavát a megerősítéshez",
          confirmButton: "Fiókom Törlése",
          cancelButton: "Mégse",
          dialogTitle: "Teljesen biztos benne?",
          dialogDescription: "Ez a művelet nem vonható vissza. Ez véglegesen törli fiókját és eltávolítja minden adatát szervereinkről.",
          success: "Fiókja törölve lett",
          error: "Hiba a fiók törlése során",
          activeOrders: "Nem lehet törölni a fiókot aktív rendelésekkel"
        },
        rights: {
          title: "GDPR Jogai",
          description: "Az Általános Adatvédelmi Rendelet (GDPR) szerint a következő jogokkal rendelkezik:",
          right1: "Hozzáférési jog: Hozzáférés személyes adataihoz",
          right2: "Helyesbítési jog: Pontatlan adatok javítása",
          right3: "Törlési jog: Adatok törlése",
          right4: "Adathordozhatósági jog: Adatok exportálása",
          right5: "Tiltakozási jog: Adatfeldolgozás ellen tiltakozás",
          right6: "Korlátozási jog: Adatfeldolgozás korlátozása"
        }
      }
    },
    pl: {
      title: "Zarządzaj Swoimi Danymi Osobowymi",
      description: "Zarządzaj swoimi danymi osobowymi i prawami RODO",
      sections: {
        export: {
          title: "Eksportuj Swoje Dane",
          description: "Pobierz wszystkie dane osobowe, które o Tobie zebraliśmy.",
          button: "Pobierz Moje Dane",
          success: "Twoje dane zostały pomyślnie wyeksportowane",
          error: "Błąd podczas eksportowania danych"
        },
        consents: {
          title: "Zarządzanie Zgodami",
          description: "Zarządzaj swoimi preferencjami zgody na przetwarzanie danych.",
          marketing: "Emaile Marketingowe",
          marketingDesc: "Otrzymywanie ofert i promocji przez email",
          analytics: "Śledzenie Analityczne",
          analyticsDesc: "Zezwól na śledzenie w celu poprawy doświadczenia",
          thirdParty: "Udostępnianie Stronom Trzecim",
          thirdPartyDesc: "Zezwól na udostępnianie danych naszym partnerom",
          button: "Zapisz Preferencje",
          success: "Twoje preferencje zostały zapisane",
          error: "Błąd podczas zapisywania preferencji"
        },
        delete: {
          title: "Usuń Swoje Konto",
          description: "Trwale usuń swoje konto i wszystkie swoje dane osobowe. Ta akcja jest nieodwracalna.",
          warning: "⚠️ Ostrzeżenie: Ta akcja jest nieodwracalna",
          passwordLabel: "Hasło",
          passwordPlaceholder: "Wprowadź hasło, aby potwierdzić",
          confirmButton: "Usuń Moje Konto",
          cancelButton: "Anuluj",
          dialogTitle: "Czy jesteś absolutnie pewien?",
          dialogDescription: "Ta akcja nie może być cofnięta. To trwale usunie Twoje konto i usunie wszystkie Twoje dane z naszych serwerów.",
          success: "Twoje konto zostało usunięte",
          error: "Błąd podczas usuwania konta",
          activeOrders: "Nie można usunąć konta z aktywnymi zamówieniami"
        },
        rights: {
          title: "Twoje Prawa RODO",
          description: "Zgodnie z Ogólnym Rozporządzeniem o Ochronie Danych (RODO), masz następujące prawa:",
          right1: "Prawo dostępu: Dostęp do swoich danych osobowych",
          right2: "Prawo do sprostowania: Poprawienie swoich nieprawidłowych danych",
          right3: "Prawo do usunięcia: Usunięcie swoich danych",
          right4: "Prawo do przenoszenia: Eksport swoich danych",
          right5: "Prawo do sprzeciwu: Sprzeciw wobec przetwarzania swoich danych",
          right6: "Prawo do ograniczenia: Ograniczenie przetwarzania swoich danych"
        }
      }
    }
  };

  const currentContent = content[language as keyof typeof content] || content.fr;

  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const response = await fetch('/api/gdpr/export-data', {
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Export failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `luxio-data-export-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: currentContent.sections.export.success,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: currentContent.sections.export.error,
        variant: "destructive"
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleSaveConsents = async () => {
    setIsLoadingConsents(true);
    try {
      await apiRequest('/api/gdpr/consents', {
        method: 'POST',
        body: consents
      });

      toast({
        title: currentContent.sections.consents.success,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: currentContent.sections.consents.error,
        variant: "destructive"
      });
    } finally {
      setIsLoadingConsents(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      return;
    }

    setIsDeleting(true);
    try {
      await apiRequest('/api/gdpr/delete-account', {
        method: 'DELETE',
        body: {
          password: deletePassword,
          confirmDeletion: true
        }
      });

      toast({
        title: currentContent.sections.delete.success,
        variant: "default"
      });

      logout();
      navigate(`/${language}`);
    } catch (error: any) {
      const errorMessage = error.message === 'ACTIVE_ORDERS_EXIST' 
        ? currentContent.sections.delete.activeOrders 
        : currentContent.sections.delete.error;
      
      toast({
        title: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (!user) {
    navigate(`/${language}`);
    return null;
  }

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
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-foreground">{currentContent.title}</h1>
              <p className="text-muted-foreground">{currentContent.description}</p>
            </div>

            <Card data-testid="card-export-data">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  {currentContent.sections.export.title}
                </CardTitle>
                <CardDescription>{currentContent.sections.export.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={handleExportData} 
                  disabled={isExporting}
                  data-testid="button-export-data"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {currentContent.sections.export.button}
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-consents">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  {currentContent.sections.consents.title}
                </CardTitle>
                <CardDescription>{currentContent.sections.consents.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="marketing">{currentContent.sections.consents.marketing}</Label>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.sections.consents.marketingDesc}
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={consents.marketingEmails}
                    onCheckedChange={(checked) => 
                      setConsents(prev => ({ ...prev, marketingEmails: checked }))
                    }
                    data-testid="switch-marketing-emails"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="analytics">{currentContent.sections.consents.analytics}</Label>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.sections.consents.analyticsDesc}
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={consents.analyticsTracking}
                    onCheckedChange={(checked) => 
                      setConsents(prev => ({ ...prev, analyticsTracking: checked }))
                    }
                    data-testid="switch-analytics-tracking"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="thirdParty">{currentContent.sections.consents.thirdParty}</Label>
                    <p className="text-sm text-muted-foreground">
                      {currentContent.sections.consents.thirdPartyDesc}
                    </p>
                  </div>
                  <Switch
                    id="thirdParty"
                    checked={consents.thirdPartySharing}
                    onCheckedChange={(checked) => 
                      setConsents(prev => ({ ...prev, thirdPartySharing: checked }))
                    }
                    data-testid="switch-third-party-sharing"
                  />
                </div>

                <Button 
                  onClick={handleSaveConsents} 
                  disabled={isLoadingConsents}
                  data-testid="button-save-consents"
                >
                  {currentContent.sections.consents.button}
                </Button>
              </CardContent>
            </Card>

            <Card data-testid="card-gdpr-rights">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {currentContent.sections.rights.title}
                </CardTitle>
                <CardDescription>{currentContent.sections.rights.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>✓ {currentContent.sections.rights.right1}</li>
                  <li>✓ {currentContent.sections.rights.right2}</li>
                  <li>✓ {currentContent.sections.rights.right3}</li>
                  <li>✓ {currentContent.sections.rights.right4}</li>
                  <li>✓ {currentContent.sections.rights.right5}</li>
                  <li>✓ {currentContent.sections.rights.right6}</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-destructive" data-testid="card-delete-account">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Trash2 className="h-5 w-5" />
                  {currentContent.sections.delete.title}
                </CardTitle>
                <CardDescription>{currentContent.sections.delete.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm font-medium text-destructive">
                  {currentContent.sections.delete.warning}
                </p>
                
                <div className="space-y-2">
                  <Label htmlFor="deletePassword">{currentContent.sections.delete.passwordLabel}</Label>
                  <Input
                    id="deletePassword"
                    type="password"
                    placeholder={currentContent.sections.delete.passwordPlaceholder}
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    data-testid="input-delete-password"
                  />
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="destructive" 
                      disabled={!deletePassword || isDeleting}
                      data-testid="button-delete-account-trigger"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      {currentContent.sections.delete.confirmButton}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>{currentContent.sections.delete.dialogTitle}</AlertDialogTitle>
                      <AlertDialogDescription>
                        {currentContent.sections.delete.dialogDescription}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-testid="button-cancel-delete">
                        {currentContent.sections.delete.cancelButton}
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAccount}
                        className="bg-destructive hover:bg-destructive/90"
                        data-testid="button-confirm-delete"
                      >
                        {currentContent.sections.delete.confirmButton}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GdprDashboard;
