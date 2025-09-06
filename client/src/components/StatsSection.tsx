import { useLanguage } from '../hooks/use-language';

export function StatsSection() {
  const { t } = useLanguage();
  
  const stats = [
    { value: '150K+', label: t('happyCustomers') },
    { value: '98%', label: t('satisfactionRate') },
    { value: '50K+', label: t('ordersCompleted') },
    { value: '24/7', label: t('customerSupport') }
  ];

  return (
    <section className="py-16 bg-muted" data-testid="stats-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} data-testid={`stat-${index}`}>
              <div className="text-3xl font-bold text-primary" data-testid={`stat-value-${index}`}>
                {stat.value}
              </div>
              <div className="text-muted-foreground" data-testid={`stat-label-${index}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
