import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';

export default function AdminPanel() {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('admin_panel')}</h1>
      <Card id="admin-settings-card">
        <h2 className="text-xl font-bold mb-4">System Configuration</h2>
        <p>Admin tools will be here.</p>
      </Card>
    </div>
  );
}
