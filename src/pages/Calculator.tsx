import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Download, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Calculator() {
  const { t, i18n } = useTranslation();
  const [productCategory, setProductCategory] = useState('industrial');
  const [valueUSD, setValueUSD] = useState('');
  const [weight, setWeight] = useState('');
  const [volumeWeight, setVolumeWeight] = useState('');
  const [shippingType, setShippingType] = useState('air');
  const [extraFees, setExtraFees] = useState({ sonar: false, permit: false, cbi: false, nationalProtection: false });
  const [exchangeRate, setExchangeRate] = useState(1480);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD')
      .then(res => res.json())
      .then(data => {
        if (data.rates) setExchangeRate(data.rates.IQD);
      })
      .catch(() => {
        console.warn('API unavailable, using fallback rate');
      })
      .finally(() => setLoading(false));
  }, []);

  const calculate = () => {
    const val = parseFloat(valueUSD) || 0;
    const w = parseFloat(weight) || 0;
    const vw = parseFloat(volumeWeight) || 0;
    
    // Choose chargeable weight
    const chargeableWeight = shippingType === 'air' ? Math.max(w, vw) : w;
    
    // Rates based on category
    const categoryRates = { industrial: 0.05, luxury: 0.15, electronics: 0.08 };
    const rate = categoryRates[productCategory as keyof typeof categoryRates] || 0.05;
    
    let total = val * rate;
    
    // Extra fees
    if (extraFees.sonar) total += 25;
    if (extraFees.permit) total += 50;
    if (extraFees.cbi) total += 30;
    if (extraFees.nationalProtection) total += val * 0.02; // 2% protection tax

    // Precision control (±0.01)
    return Math.round(total * 100) / 100;
  };

  return (
    <div className="space-y-6" id="calculator-page" dir={i18n.dir()}>
      <h1 className="text-2xl font-bold">{t('calculator')}</h1>
      <Card id="calculator-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1">{t('category')}</label>
            <select className="w-full p-2 border rounded-lg" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
              <option value="industrial">{t('industrial')}</option>
              <option value="luxury">{t('luxury')}</option>
              <option value="electronics">{t('electronics')}</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('value_usd')}</label>
            <input type="number" className="w-full p-2 border rounded-lg" value={valueUSD} onChange={(e) => setValueUSD(e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('weight_kg')}</label>
            <input type="number" className="w-full p-2 border rounded-lg" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('volume_weight_kg')}</label>
            <input type="number" className="w-full p-2 border rounded-lg" value={volumeWeight} onChange={(e) => setVolumeWeight(e.target.value)} placeholder="0" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('shipping_type')}</label>
            <select className="w-full p-2 border rounded-lg" value={shippingType} onChange={(e) => setShippingType(e.target.value)}>
              <option value="air">{t('air')}</option>
              <option value="ground">{t('ground')}</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-2 gap-4">
            <label className="flex items-center gap-2"><input type="checkbox" checked={extraFees.sonar} onChange={e => setExtraFees({...extraFees, sonar: e.target.checked})} /> {t('sonar')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={extraFees.permit} onChange={e => setExtraFees({...extraFees, permit: e.target.checked})} /> {t('permit')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={extraFees.cbi} onChange={e => setExtraFees({...extraFees, cbi: e.target.checked})} /> {t('cbi')}</label>
            <label className="flex items-center gap-2"><input type="checkbox" checked={extraFees.nationalProtection} onChange={e => setExtraFees({...extraFees, nationalProtection: e.target.checked})} /> {t('national_protection')}</label>
        </div>
        
        <button className="mt-6 w-full bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700">{t('calculate')}</button>
      </Card>
      
      <Card id="result-card">
        <h2 className="text-xl font-bold mb-4">{t('results')}</h2>
        <div className="space-y-2 text-gray-700">
            <p>{t('total_cost')}: {calculate()} USD</p>
            <p>{t('iqd_value')}: {(calculate() * exchangeRate).toFixed(2)}</p>
            <p className="text-xs text-gray-500">* {t('cbi_rate_note')} {loading ? '...' : 'CBI'}</p>
        </div>
        <div className="mt-6 flex gap-4">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg"><Download size={16}/> {t('download_pdf')}</button>
            <button className="flex items-center gap-2 text-white px-4 py-2 rounded-lg" style={{backgroundColor: '#25D366'}}><MessageCircle size={16}/> {t('whatsapp')}</button>
        </div>
      </Card>
    </div>
  );
}
