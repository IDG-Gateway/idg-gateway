import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Card id="login-card">
        <h1 className="text-2xl font-bold mb-4">{t('login')}</h1>
        <input 
          className="w-full p-2 border rounded-lg mb-4" 
          placeholder="Email" 
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <button 
          onClick={() => navigate('/')}
          className="w-full bg-slate-900 text-white p-2 rounded-lg"
        >
          {t('login')}
        </button>
      </Card>
    </div>
  );
}
