import { useLanguage } from '../hooks/use-language';

export function SecurePaymentSection() {
  const { t } = useLanguage();
  const paymentMethods = [
    { name: 'MaxelPay', icon: 'fas fa-credit-card', status: t('active'), statusColor: 'text-green-300' },
    { name: 'PayU', icon: 'fas fa-university', status: t('comingSoon'), statusColor: 'text-yellow-300' },
    { name: 'Transak', icon: 'fab fa-bitcoin', status: t('comingSoon'), statusColor: 'text-yellow-300' }
  ];

  const securityFeatures = [
    { icon: 'fas fa-shield-alt', text: t('sslEncryption') },
    { icon: 'fas fa-lock', text: t('pciCompliant') },
    { icon: 'fas fa-user-shield', text: t('fraudProtection') },
    { icon: 'fas fa-undo', text: t('moneyBackGuarantee') }
  ];

  const partners = ['MaxelPay', 'PayU', 'Transak', 'Guardarian'];

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-accent text-white" data-testid="secure-payment-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{t('securePaymentAdvantages')}</h2>
          <p className="text-lg text-white/90">{t('multiplePaymentOptions')}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">{t('paymentMethods')}</h3>
            <div className="space-y-4">
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                  <div className="flex items-center space-x-3">
                    <i className={`${method.icon} text-xl`}></i>
                    <span className="font-medium">{method.name}</span>
                  </div>
                  <span className={`text-sm ${method.statusColor}`}>{method.status}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-6">{t('securityFeatures')}</h3>
            <div className="space-y-4">
              {securityFeatures.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <i className={`${feature.icon} text-green-300`}></i>
                  <span>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Partner Logos */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-center text-white/70 mb-6">{t('trustedBy')}</p>
          <div className="flex justify-center items-center space-x-8 opacity-70">
            {partners.map((partner, index) => (
              <div key={index} className="text-lg font-bold">{partner}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
