import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';
import { Upload, FileText, Download } from 'lucide-react';

export default function Documents() {
  const { t, i18n } = useTranslation();

  return (
    <div className="space-y-6" dir={i18n.dir()}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{t('documents_mgmt')}</h1>
        <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg">
            <Upload size={16}/> {t('upload_doc')}
        </button>
      </div>
      <Card id="documents-table-card">
        <table className="w-full text-right">
            <thead>
                <tr className="border-b">
                    <th className="p-3">File Name</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr className='text-gray-500'>
                    <td className="p-3">Invoice_001.pdf</td>
                    <td className="p-3">Invoice</td>
                    <td className="p-3"><Download size={16}/></td>
                </tr>
            </tbody>
        </table>
      </Card>
    </div>
  );
}
