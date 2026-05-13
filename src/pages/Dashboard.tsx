import { Card } from '@/components/ui/Card';
import { ArrowUpRight, DollarSign, ShieldAlert, Truck, PlusCircle, FileText, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function Dashboard() {
  const { t, i18n } = useTranslation();
  const kpiItems = [
    { title: t('customs_revenue'), value: '١٢٠ ملیار IQD', icon: DollarSign, change: '+١٢٪' },
    { title: 'Tax Revenue', value: '٥٠ ملیار IQD', icon: BarChart3, change: '+٨٪' },
    { title: t('monitored_shipments'), value: '٤٥', icon: ShieldAlert, change: '+٢٪' },
    { title: t('vehicles'), value: '١٢٥٠', icon: Truck, change: '-٥٪' },
  ];

  const chartData = [
    { name: 'Jan', revenue: 40, fraud: 2 },
    { name: 'Feb', revenue: 50, fraud: 3 },
    { name: 'Mar', revenue: 70, fraud: 1 },
    { name: 'Apr', revenue: 90, fraud: 4 },
  ];

  return (
    <div className="space-y-6" id="dashboard-page" dir={i18n.dir()}>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">{t('main_dashboard')}</h1>
            <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg"><PlusCircle size={16}/> New Shipment</button>
                <button className="flex items-center gap-2 border px-4 py-2 rounded-lg"><FileText size={16}/> Audit Report</button>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpiItems.map((item, index) => (
                <Card key={index} id={`kpi-${index}`}>
                    <div className="flex justify-between items-start">
                        <span className="text-gray-500">{item.title}</span>
                        <item.icon className="text-amber-600" />
                    </div>
                    <div className="text-2xl font-bold mt-2">{item.value}</div>
                    <div className="text-sm text-green-600 flex items-center gap-1 mt-1">
                        <ArrowUpRight size={16} />
                        {item.change}
                    </div>
                </Card>
            ))}
        </div>
        
        <Card id="ai-insights">
            <h2 className="text-xl font-bold mb-4">{t('ai_insights')}</h2>
            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="revenue" stroke="#f59e0b" name="Revenue" />
                        <Line type="monotone" dataKey="fraud" stroke="#ef4444" name="Fraud" />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>

        <Card id="recent-shipments">
            <h2 className="text-xl font-bold mb-4">{t('shipments_risks')}</h2>
            <div className="space-y-2">
                {[
                    { id: 'S-101', risk: t('high'), color: 'bg-red-100 text-red-800' },
                    { id: 'S-102', risk: t('medium'), color: 'bg-yellow-100 text-yellow-800' },
                    { id: 'S-103', risk: t('low'), color: 'bg-green-100 text-green-800' },
                ].map(s => (
                    <div key={s.id} className="flex justify-between p-3 border rounded-lg">
                        <span>{t('shipment')} {s.id}</span>
                        <span className={`px-2 rounded ${s.color}`}>{t('risk_level')}: {s.risk}</span>
                    </div>
                ))}
            </div>
        </Card>
    </div>
  );
}
