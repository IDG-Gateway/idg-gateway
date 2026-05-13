import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';
import { DollarSign, FileText, BarChart3, TrendingUp } from 'lucide-react';

export default function Financial() {
  const { t, i18n } = useTranslation();

  const stats = [
    { title: t('revenue'), value: '250B IQD', icon: DollarSign },
    { title: t('taxation'), value: '80B IQD', icon: TrendingUp },
    { title: t('invoices'), value: '1,240', icon: FileText },
  ];

  return (
    <div className="space-y-6" dir={i18n.dir()}>
      <h1 className="text-2xl font-bold">{t('financial_system')}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Card key={i} id={`fin-stat-${i}`}>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">{s.title}</span>
              <s.icon className="text-amber-600" />
            </div>
            <div className="text-2xl font-bold mt-2">{s.value}</div>
          </Card>
        ))}
      </div>
      <Card id="financial-report-card">
        <h2 className="text-xl font-bold mb-4">Financial Reports</h2>
        <p className="text-gray-500">Detailed financial analytics will be ready for integration.</p>
      </Card>
    </div>
  );
}
