import { useState } from 'react';
import { Bot, X, Send, Paperclip } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

export default function AICustomsAssistant() {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: t('ai_assistant_greet') }
  ]);
  const [input, setInput] = useState('');

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 p-4 bg-slate-900 text-white rounded-full shadow-lg hover:bg-slate-800 transition-colors"
      >
        <Bot size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold flex items-center gap-2">
                <Bot className="text-amber-600" /> {t('ai_assistant_title')}
              </h3>
              <button onClick={() => setIsOpen(false)}><X size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((m, i) => (
                <div key={i} className={`p-3 rounded-lg ${m.role === 'assistant' ? 'bg-slate-100' : 'bg-amber-100 self-end'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t flex gap-2">
              <input 
                className="flex-1 p-2 border rounded-lg"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={t('ask_ai')}
              />
              <button className="bg-slate-900 text-white p-2 rounded-lg"><Send size={16}/></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
