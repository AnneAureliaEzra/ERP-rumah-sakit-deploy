import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ClinicalModule from './components/ClinicalModule';
import AIAnalytics from './components/AIAnalytics';
import FinanceModule from './components/FinanceModule';
import InventoryModule from './components/InventoryModule';
import { ModuleType } from './types';

const App: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.DASHBOARD);

  const renderModule = () => {
    switch (currentModule) {
      case ModuleType.DASHBOARD:
        return <Dashboard />;
      case ModuleType.CLINICAL:
        return <ClinicalModule />;
      case ModuleType.AI_ANALYTICS:
        return <AIAnalytics />;
      case ModuleType.FINANCE:
        return <FinanceModule />;
      case ModuleType.INVENTORY:
        return <InventoryModule />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Sidebar currentModule={currentModule} onNavigate={setCurrentModule} />
      <main className="transition-all duration-300">
        {renderModule()}
      </main>
    </div>
  );
};

export default App;