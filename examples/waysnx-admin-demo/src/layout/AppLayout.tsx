import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className={`app-layout ${sidebarCollapsed ? 'app-layout--collapsed' : ''}`}>
      <AppSidebar collapsed={sidebarCollapsed} onCollapseChange={setSidebarCollapsed} />
      <div className="app-main">
        <AppHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
