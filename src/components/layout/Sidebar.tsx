import { LayoutDashboard, Package, Calculator, History, MapPin, Truck, FileText, Settings, Bot, ShieldCheck, DollarSign, ChevronLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navItems = [
    { nameKey: 'dashboard', path: '/', icon: LayoutDashboard },
    { nameKey: 'monitoring', path: '/monitoring', icon: MapPin },
    { nameKey: 'checkpoints', path: '/checkpoints', icon: Truck },
    { nameKey: 'calculator', path: '/calculator', icon: Calculator },
    { nameKey: 'products', path: '/products', icon: Package },
    { nameKey: 'audit_history', path: '/audit', icon: History },
    { nameKey: 'fraud_detection', path: '/ai-fraud', icon: Bot },
    { nameKey: 'financial_system', path: '/financial', icon: DollarSign },
    { nameKey: 'documents_mgmt', path: '/documents', icon: FileText },
    { nameKey: 'admin_panel', path: '/admin', icon: ShieldCheck },
    { nameKey: 'settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
    const { t } = useTranslation();

    return (
        <aside className="w-64 bg-slate-950 text-white min-h-screen flex flex-col border-r border-white/10" id="sidebar">
            <div className="p-6 text-2xl font-bold border-b border-white/10 flex justify-between items-center" id="brand">
                <span>IDG Gateway</span>
                <button className="text-slate-400 hover:text-white"><ChevronLeft size={20}/></button>
            </div>
            <nav className="p-4 space-y-1 flex-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? 'bg-amber-600/20 text-amber-400 border border-amber-600/30' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
                        id={`nav-${item.path.replace('/', '') || 'dashboard'}`}
                    >
                        <item.icon size={20} />
                        <span className="text-sm font-medium">{t(item.nameKey || 'dashboard')}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
}
