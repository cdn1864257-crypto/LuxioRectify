import { useLanguage } from '../hooks/use-language';

export function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { key: 'smartphones', href: '#smartphones' },
    { key: 'watches', href: '#watches' },
    { key: 'sneakers', href: '#sneakers' },
    { key: 'gadgets', href: '#gadgets' },
    { key: 'mobility', href: '#mobility' }
  ];

  const customerService = [
    'Contact Us',
    'Shipping Info',
    'Returns',
    'Size Guide',
    'FAQ'
  ];

  const legal = [
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy',
    'GDPR Compliance'
  ];

  const socialIcons = [
    'fab fa-facebook',
    'fab fa-twitter',
    'fab fa-instagram',
    'fab fa-youtube'
  ];

  return (
    <footer className="bg-primary text-primary-foreground py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4" data-testid="footer-logo">Luxio</div>
            <p className="text-primary-foreground/80 mb-4">
              Premium electronics and tech at unbeatable prices. Your trusted partner for the latest smartphones, wearables, and smart gadgets.
            </p>
            <div className="flex space-x-4">
              {socialIcons.map((icon, index) => (
                <i key={index} className={`${icon} text-xl hover:text-accent cursor-pointer`}></i>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="hover:text-accent transition-colors">
                    {t(link.key as keyof typeof t)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              {customerService.map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-primary-foreground/80">
              {legal.map((item, index) => (
                <li key={index}>
                  <a href="#" className="hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-primary-foreground/60">
          <p>&copy; 2024 Luxio. All rights reserved. | Secure payments powered by MaxelPay</p>
        </div>
      </div>
    </footer>
  );
}
