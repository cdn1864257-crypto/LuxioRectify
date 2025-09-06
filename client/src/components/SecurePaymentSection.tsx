export function SecurePaymentSection() {
  const paymentMethods = [
    { name: 'MaxelPay', icon: 'fas fa-credit-card', status: 'Active', statusColor: 'text-green-300' },
    { name: 'PayU', icon: 'fas fa-university', status: 'Coming Soon', statusColor: 'text-yellow-300' },
    { name: 'Transak', icon: 'fab fa-bitcoin', status: 'Coming Soon', statusColor: 'text-yellow-300' }
  ];

  const securityFeatures = [
    { icon: 'fas fa-shield-alt', text: 'SSL 256-bit encryption' },
    { icon: 'fas fa-lock', text: 'PCI DSS compliant processing' },
    { icon: 'fas fa-user-shield', text: 'Fraud protection guaranteed' },
    { icon: 'fas fa-undo', text: '30-day money back guarantee' }
  ];

  const partners = ['MaxelPay', 'PayU', 'Transak', 'Guardarian'];

  return (
    <section className="py-16 bg-gradient-to-br from-primary to-accent text-white" data-testid="secure-payment-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Secure Payment - Your Advantages</h2>
          <p className="text-lg text-white/90">Multiple payment options with bank-level security</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Payment Methods</h3>
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
            <h3 className="text-xl font-semibold mb-6">Security Features</h3>
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
          <p className="text-center text-white/70 mb-6">Trusted by leading payment providers</p>
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
