import { Card } from '@/components/ui/Card';
import { ShieldCheck, Calendar, Filter, Search, Download } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function AuditHistory() {
  const { t, i18n } = useTranslation();
  const activities = [
    { id: 1, user: 'ئەحمەد محەمەد', action: 'پشکنینی بارهەڵگر', time: '١٠:٣٠', status: 'سەلامەت' },
    { id: 2, user: 'سارا عەلی', action: 'تۆمارکردنی گومرگ', time: '٠٩:٤٥', status: 'گوماناوی', alert: true },
  ];

  return (
    <div className="space-y-6" id="audit-page" dir={i18n.dir()}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('audit_history')}</h1>
        <div className="flex gap-2">
            <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white"><Filter size={16}/> {t('filter')}</button>
            <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg"><Download size={16}/> {t('export')}</button>
        </div>
      </div>
      <Card id="audit-table-card">
        <div className="mb-4 flex gap-2">
            <input className="w-full p-2 border rounded-lg" placeholder={t('search_audits')} />
        </div>
        <table className="w-full text-right" id="audit-table">
          <thead>
            <tr className="border-b">
              <th className="p-3">{t('user')}</th>
              <th className="p-3">{t('action')}</th>
              <th className="p-3">{t('time')}</th>
              <th className="p-3">{t('status')}</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr key={act.id} className={`border-b ${act.alert ? 'bg-red-50' : ''}`}>
                <td className="p-3">{act.user}</td>
                <td className="p-3">{act.action}</td>
                <td className="p-3">{act.time}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${act.alert ? 'bg-red-500 text-white' : 'bg-green-100 text-green-800'}`}>
                    {act.status}
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
