import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import AICustomsAssistant from '@/components/AICustomsAssistant';
import { useTranslation } from 'react-i18next';

export default function AppLayout() {
  const { i18n } = useTranslation();
  return (
    <div className="flex bg-gray-50 min-h-screen text-gray-900 font-sans" id="app-layout" dir={i18n.dir()}>
        <Sidebar />
        <div className="flex flex-col flex-1" id="main-content">
            <Topbar />
            <main className="p-4" id="content-outlet">
                <Outlet />
            </main>
        </div>
        <AICustomsAssistant />
    </div>
  );
}
