import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';

export default function ProductClassification() {
  const { t, i18n } = useTranslation();
  const products = [
    { name: t('smartphone'), hsCode: '٨٥١٧.١٢', status: t('allowed') },
    { name: t('military_weapon'), hsCode: '٩٣٠١', status: t('prohibited') },
    { name: t('medicines'), hsCode: '٣٠٠٤', status: t('allowed') },
    { name: t('vehicle'), hsCode: '٨٧٠٣', status: t('allowed') },
    { name: t('narcotics'), hsCode: '٢٩٣٩', status: t('prohibited') },
    { name: t('sugar'), hsCode: '١٧٠١', status: t('allowed') },
    { name: t('chemicals'), hsCode: '٢٨٢٧', status: t('restricted') },
    { name: t('clothing'), hsCode: '٦١٠١', status: t('allowed') },
  ];

  return (
    <div className="space-y-6" id="products-page" dir={i18n.dir()}>
      <h1 className="text-2xl font-bold">{t('products')}</h1>
      <Card id="products-table-card">
        <table className="w-full text-right" id="products-table">
          <thead>
            <tr className="border-b">
              <th className="p-3">{t('product_name')}</th>
              <th className="p-3">{t('hs_code')}</th>
              <th className="p-3">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i} className="border-b">
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.hsCode}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${p.status === t('allowed') ? 'bg-green-100 text-green-800' : p.status === t('restricted') ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
