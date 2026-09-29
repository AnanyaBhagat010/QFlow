import React, { useState } from 'react';
import { QueueProvider } from './context/QueueContext';
import { AppSidebar, UserRole, CustomerTabType, AdminTabType } from './components/layout/AppSidebar';
import { TopHeader } from './components/layout/TopHeader';
import { LoginPage } from './components/auth/LoginPage';
import { CustomerPortal } from './components/customer/CustomerPortal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { SimulatedPhoneModal } from './components/modals/SimulatedPhoneModal';
import { SimulationControlDrawer } from './components/modals/SimulationControlDrawer';

export function AppContent() {
  const [userRole, setUserRole] = useState<UserRole | null>(() => {
    try {
      const stored = sessionStorage.getItem('qflow_user_role');
      if (stored === 'customer' || stored === 'admin') {
        return stored as UserRole;
      }
      return null;
    } catch {
      return null;
    }
  });

  const [customerTab, setCustomerTab] = useState<CustomerTabType>('my-token');
  const [adminTab, setAdminTab] = useState<AdminTabType>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);
  const [isDemoDrawerOpen, setIsDemoDrawerOpen] = useState(false);

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    try {
      sessionStorage.setItem('qflow_user_role', role);
    } catch {
      // ignore storage errors
    }
    if (role === 'customer') {
      setCustomerTab('my-token');
    } else {
      setAdminTab('dashboard');
    }
  };

  const handleLogout = () => {
    setUserRole(null);
    try {
      sessionStorage.removeItem('qflow_user_role');
    } catch {
      // ignore storage errors
    }
    setIsMobileSidebarOpen(false);
  };

  // 1. Initial Screen: Professional Q-FLOW Welcome / Login Page
  if (!userRole) {
    return (
      <LoginPage onLoginSuccess={handleLoginSuccess} />
    );
  }

  // 2. Separate Logged-in Portals (Customer vs Admin)
  return (
    <div className="min-h-screen bg-[#FCFBF5] text-[#24213A] font-sans selection:bg-[#FFF275] selection:text-[#24213A] flex">
      
      {/* Role-Specific Left Sidebar Navigation */}
      <AppSidebar
        userRole={userRole}
        customerTab={customerTab}
        adminTab={adminTab}
        onSelectCustomerTab={(tab) => setCustomerTab(tab)}
        onSelectAdminTab={(tab) => setAdminTab(tab)}
        onLogout={handleLogout}
        openDemoPanel={() => setIsDemoDrawerOpen(true)}
        openPhoneModal={() => setIsPhoneModalOpen(true)}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
        
        {/* Role-Specific Top Header with Logout */}
        <TopHeader
          userRole={userRole}
          customerTab={customerTab}
          adminTab={adminTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onLogout={handleLogout}
          openPhoneModal={() => setIsPhoneModalOpen(true)}
        />

        {/* Main Content Area: Enforce strictly separated portals */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {userRole === 'customer' && (
            <CustomerPortal
              openPhoneModal={() => setIsPhoneModalOpen(true)}
              activeTab={customerTab}
              onTabChange={(tab) => setCustomerTab(tab)}
            />
          )}

          {userRole === 'admin' && (
            <AdminDashboard
              openDemoPanel={() => setIsDemoDrawerOpen(true)}
              activeTab={adminTab}
              onTabChange={(tab) => setAdminTab(tab)}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#E9E5F5] bg-white py-6 mt-12 no-print">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#6B6880] gap-4">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#24213A] text-sm tracking-tight">Q-FLOW</span>
              <span>• {userRole === 'admin' ? 'Operations Administration' : 'Customer Portal'}</span>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="text-[#3A0CA3] hover:text-[#280779] font-bold transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>

            <div className="text-[#6B6880]/70">
              Sense → Analyze → Predict → Recommend → Act → Measure
            </div>
          </div>
        </footer>

      </div>

      {/* Interactive Modals */}
      <SimulatedPhoneModal
        isOpen={isPhoneModalOpen}
        onClose={() => setIsPhoneModalOpen(false)}
      />

      <SimulationControlDrawer
        isOpen={isDemoDrawerOpen}
        onClose={() => setIsDemoDrawerOpen(false)}
      />

    </div>
  );
}

export default function App() {
  return (
    <QueueProvider>
      <AppContent />
    </QueueProvider>
  );
}
