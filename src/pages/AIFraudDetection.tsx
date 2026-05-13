import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/Card';
import { Bot, AlertTriangle, Settings, TrendingUp, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

export default function AIFraudDetection() {
  const [alerts, setAlerts] = useState({ high: true, docs: false, fraud: true });
  const [threshold, setThreshold] = useState(80);
  const [models, setModels] = useState({ deepLearning: true, neuralNetwork: true });

  const { t, i18n } = useTranslation();

  const fraudData = [
    { name: t('previous'), fraud: 5 },
    { name: t('today'), fraud: 12 },
  ];
  
  const typeData = [
    { name: t('doc_fraud'), value: 400 },
    { name: t('bribery'), value: 300 },
    { name: t('suspicious_trans'), value: 300 },
  ];
  
  const COLORS = ['#ef4444', '#f59e0b', '#3b82f6'];

  return (
    <div className="space-y-6" id="ai-fraud-dashboard" dir={i18n.dir()}>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-slate-800">
            <Bot className="text-amber-600" /> {t('fraud_detection')}
        </h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card id="fraud-alerts-list">
            <h2 className="font-bold mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500" /> {t('alerts_settings')}</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm">Threshold: {threshold}%</label>
                    <input type="range" min="0" max="100" value={threshold} onChange={e => setThreshold(Number(e.target.value))} className="w-full" />
                </div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={models.deepLearning} onChange={e => setModels({...models, deepLearning: e.target.checked})} /> Deep Learning Detection</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={models.neuralNetwork} onChange={e => setModels({...models, neuralNetwork: e.target.checked})} /> Neural Network Model</label>
            </div>
            
            <div className="mt-4 p-4 border-t space-y-2">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alerts.high} onChange={e => setAlerts({...alerts, high: e.target.checked})} /> {t('high')}</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alerts.docs} onChange={e => setAlerts({...alerts, docs: e.target.checked})} /> {t('doc_fraud')}</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={alerts.fraud} onChange={e => setAlerts({...alerts, fraud: e.target.checked})} /> {t('suspicious_trans')}</label>
            </div>
        </Card>
        
        <Card id="ai-insights">
            <h2 className="font-bold mb-4 flex items-center gap-2"><CheckCircle className="text-green-500" /> {t('ai_insights')}</h2>
            <ul className="list-disc pr-5 space-y-2 text-sm text-slate-700">
                <li>Increase inspection speed during peak hours.</li>
                <li>Assign more officers to Bashmakh checkpoint.</li>
            </ul>
        </Card>

        <Card id="fraud-type-stats">
            <h2 className="font-bold mb-4">{t('fraud_type')}</h2>
            <div className="h-64">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                            {typeData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </Card>
        
        <Card id="fraud-accuracy-stats">
            <h2 className="font-bold mb-4">{t('ai_accuracy')}</h2>
            <div className="h-64">
                <ResponsiveContainer>
                    <BarChart data={fraudData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="fraud" fill="#d97706" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>
    </div>
  );
}
