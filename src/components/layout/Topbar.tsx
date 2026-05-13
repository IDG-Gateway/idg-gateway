import { Bell, User, Search, Globe, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Topbar() {
    const { i18n, t } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        document.documentElement.dir = i18n.dir(lng);
    };

    return (
        <header className="sticky top-0 z-30 h-16 bg-white/70 backdrop-blur-lg border-b border-white/20 flex items-center justify-between px-6 shadow-sm" id="topbar">
            <div className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 w-64 text-sm bg-white/50 focus-within:ring-2 focus-within:ring-amber-500/20" id="search-bar">
                <Search size={16} className="text-gray-400" />
                <input type="text" placeholder={t('search')} className="outline-none bg-transparent w-full" />
            </div>
            <div className="flex items-center gap-4" id="user-actions">
                <div className="relative group">
                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-amber-600">
                        <Globe size={18} />
                        {i18n.language.toUpperCase()}
                        <ChevronDown size={14} />
                    </button>
                    <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border p-2 hidden group-hover:block transition-all">
                        {['en', 'ar', 'ku'].map(lng => (
                            <button key={lng} onClick={() => changeLanguage(lng)} className="block px-4 py-2 text-sm hover:bg-slate-50 rounded-lg">{lng.toUpperCase()}</button>
                        ))}
                    </div>
                </div>
                <button className="text-gray-500 hover:text-amber-600" id="notify-button"><Bell size={20} /></button>
                <div className="flex items-center gap-2 border-l pl-4 ml-2" id="profile-menu">
                    <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white ring-2 ring-slate-100" id="avatar" />
                    <span className="text-sm font-medium">سەرپەرشتیار</span>
                </div>
            </div>
        </header>
    );
}
