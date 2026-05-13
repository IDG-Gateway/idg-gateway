import { Bell } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';

export default function Notifications() {
  const { t, i18n } = useTranslation();

  return (
    <div className="p-4 w-64 bg-white border rounded-lg shadow-lg" dir={i18n.dir()}>
      <h3 className="font-bold mb-2 flex items-center gap-2"><Bell size={16}/> {t('notifications')}</h3>
      <div className="space-y-2">
        <p className="text-sm p-2 bg-red-50 rounded">Suspicious shipment detected!</p>
        <p className="text-sm p-2 bg-blue-50 rounded">New audit report generated.</p>
      </div>
    </div>
  );
}
