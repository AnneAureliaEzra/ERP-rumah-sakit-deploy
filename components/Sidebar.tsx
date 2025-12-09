import React from 'react';
import { 
  LayoutDashboard, 
  Stethoscope, 
  Banknote, 
  Package, 
  Bot, 
  Settings,
  LogOut,
  Activity
} from 'lucide-react';
import { ModuleType } from '../types';

interface SidebarProps {
  currentModule: ModuleType;
  onNavigate: (module: ModuleType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, onNavigate }) => {
  const menuItems = [
    { id: ModuleType.DASHBOARD, label: 'Dashboard CFO', icon: LayoutDashboard },
    { id: ModuleType.CLINICAL, label: 'Klinis & EMR', icon: Stethoscope },
    { id: ModuleType.FINANCE, label: 'Keuangan & Akuntansi', icon: Banknote },
    { id: ModuleType.INVENTORY, label: 'Logistik & Farmasi', icon: Package },
    { id: ModuleType.AI_ANALYTICS, label: 'Analisis Cerdas AI', icon: Bot },
  ];

  return (
    <div className="w-64 h-screen bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 text-slate-100 flex flex-col fixed left-0 top-0 shadow-2xl z-50">
      {/* Brand */}
      <div className="h-20 flex items-center px-6 border-b border-indigo-800/50 bg-indigo-950/30 backdrop-blur-sm">
        <div className="p-2 bg-white/10 rounded-lg mr-3">
          <Activity className="w-6 h-6 text-emerald-400" />
        </div>
        <div>
          <span className="block text-lg font-bold text-white tracking-wide leading-none">NexusHealth</span>
          <span className="text-xs text-indigo-300 font-medium">Enterprise ERP</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 space-y-2 px-3">
        {menuItems.map((item) => {
          const isActive = currentModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                isActive 
                  ? 'bg-white/10 text-white shadow-lg border border-white/10 backdrop-blur-md translate-x-1' 
                  : 'hover:bg-white/5 hover:text-white text-indigo-200 hover:translate-x-1'
              }`}
            >
              <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-emerald-400' : 'text-indigo-400 group-hover:text-white'}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer / User */}
      <div className="p-4 border-t border-indigo-800/50 bg-indigo-950/20">
        <button className="flex items-center px-3 py-2 w-full text-indigo-300 hover:text-white transition-colors hover:bg-white/5 rounded-lg">
          <Settings className="w-4 h-4 mr-3" />
          <span className="text-sm">Pengaturan</span>
        </button>
        <button className="flex items-center px-3 py-2 w-full text-rose-400 hover:text-rose-200 transition-colors mt-1 hover:bg-rose-900/20 rounded-lg">
          <LogOut className="w-4 h-4 mr-3" />
          <span className="text-sm">Keluar</span>
        </button>
        <div className="mt-4 px-3">
          <p className="text-[10px] text-indigo-400 font-mono">VERSI 2.5.0 (CLOUD-NATIVE)</p>
          <p className="text-[10px] text-indigo-500 font-mono">GCP: ASIA-SOUTHEAST2</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;