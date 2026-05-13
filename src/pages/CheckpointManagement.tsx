import { Card } from '@/components/ui/Card';
import { UserPlus, Truck, Settings } from 'lucide-react';
import { useState } from 'react';

export default function CheckpointManagement() {
  const officers = [
    { name: 'عەلی حەسەن', checkpoint: 'پەروێزخان', schedule: '٠٨:٠٠ - ١٦:٠٠' },
    { name: 'بەیان ئەحمەد', checkpoint: 'باشماخ', schedule: '١٦:٠٠ - ٠٠:٠٠' },
  ];

  const [checkpoints, setCheckpoints] = useState([
    { id: 1, name: 'پەروێزخان', status: 'کراوە', hours: '٢٤/٧' },
    { id: 2, name: 'باشماخ', status: 'داخراو', hours: '٠٨:٠٠ - ٢٠:٠٠' },
  ]);

  const toggleCheckpoint = (id: number) => {
    setCheckpoints(prev => prev.map(cp => cp.id === id ? { ...cp, status: cp.status === 'کراوە' ? 'داخراو' : 'کراوە' } : cp));
  };

  return (
    <div className="space-y-6" id="checkpoint-mgmt" dir="rtl">
      <h1 className="text-2xl font-bold">بەرێوەبردنی خاڵە سنورییەکان</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card id="status-management">
            <h2 className="font-bold mb-4">بەڕێوەبردنی دۆخی خاڵەکان</h2>
            <div className="space-y-4">
                {checkpoints.map((cp) => (
                    <div key={cp.id} className="p-4 border rounded-lg flex justify-between items-center">
                        <div>
                            <p className="font-bold">{cp.name}</p>
                            <p className="text-sm text-slate-500">کات: {cp.hours} | دۆخ: {cp.status}</p>
                        </div>
                        <button onClick={() => toggleCheckpoint(cp.id)} className={`px-3 py-1 rounded ${cp.status === 'کراوە' ? 'bg-red-100' : 'bg-green-100'}`}>
                            {cp.status === 'کراوە' ? 'داخستن' : 'کردنەوە'}
                        </button>
                    </div>
                ))}
            </div>
        </Card>
        <Card id="assignment-card">
            <h2 className="font-bold mb-4">تەرخانکردنی ئەفسەر</h2>
            <div className="space-y-4">
                {officers.map((o, i) => (
                    <div key={i} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                           <p className="font-bold">{o.name}</p>
                           <p className="text-sm text-slate-500">{o.checkpoint} - {o.schedule}</p>
                        </div>
                        <button className="text-amber-600 hover:text-amber-800"><Settings size={18}/></button>
                    </div>
                ))}
            </div>
            <button className="mt-4 flex items-center gap-2 bg-slate-900 text-white p-3 rounded-lg hover:bg-slate-800 w-full justify-center">
                <UserPlus size={16}/> ئەفسەری نوێ تەرخان بکە
            </button>
        </Card>
      </div>
    </div>
  );
}
