import { Card } from '@/components/ui/Card';
import { MapPin, Search } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

export default function MonitoringCenter() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [trackingInfo, setTrackingInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const trackShipment = async () => {
    setLoading(true);
    try {
        const res = await axios.get(`/api/track?trackingNumber=${trackingNumber}`);
        setTrackingInfo(res.data);
    } catch (err) {
        console.error('Tracking failed', err);
    } finally {
        setLoading(false);
    }
  };

  const shipments = [
    { id: 'S-7721', status: t('in_transit'), risk: t('low'), checkpoint: 'پەروێزخان' },
    { id: 'S-8832', status: t('inspection'), risk: t('high'), checkpoint: 'باشماخ' },
  ];

  return (
    <div className="space-y-6" id="monitoring-center" dir={i18n.dir()}>
      <h1 className="text-2xl font-bold text-slate-800">{t('monitoring')}</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 h-[450px] flex flex-col bg-slate-100" id="map-visualization">
            <h3 className="font-bold mb-4">{t('map_view')}</h3>
            <div className="flex-1 flex items-center justify-center text-slate-500">
                {t('live_map_mockup')}
            </div>
            <div className="p-4 bg-white border-t rounded-b-2xl">
                {shipments.map(s => (
                    <div key={s.id} className="flex justify-between p-2 border-b">
                        <span>{s.id} - <span className="font-bold">{s.checkpoint}</span></span>
                        <span className={`px-2 rounded ${s.risk === t('high') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>{t('risk_level')}: {s.risk}</span>
                        <span>{s.status}</span>
                    </div>
                ))}
            </div>
        </Card>
        
        <div className="space-y-6">
            <Card id="shipment-tracker">
                <h3 className="font-bold mb-4">{t('tracking_more')}</h3>
                <div className="flex gap-2">
                    <input className="w-full p-2 border rounded-lg" value={trackingNumber} onChange={e => setTrackingNumber(e.target.value)} placeholder={t('tracking_number')} />
                    <button onClick={trackShipment} className="bg-slate-900 text-white p-2 rounded-lg">{loading ? '...' : <Search size={20}/>}</button>
                </div>
                {trackingInfo && <div className="mt-4 p-2 bg-slate-100 rounded-lg text-sm">{JSON.stringify(trackingInfo)}</div>}
            </Card>
            <Card id="active-checkpoints">
                <h3 className="font-bold mb-4">{t('active_checkpoints')}</h3>
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600"><MapPin size={16}/> <span>پەروێزخان - کراوەیە</span></div>
                    <div className="flex items-center gap-2 text-green-600"><MapPin size={16}/> <span>باشماخ - کراوەیە</span></div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
