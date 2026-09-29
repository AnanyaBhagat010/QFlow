import React from 'react';
import { 
  Activity, 
  PlusCircle, 
  Ticket, 
  Users, 
  Bell, 
  LayoutDashboard, 
  Radio, 
  Zap, 
  FileText, 
  ChevronRight,
  LogOut,
  User,
  ShieldCheck
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export type UserRole = 'customer' | 'admin';
export type CustomerTabType = 'join-queue' | 'my-token' | 'live-queue' | 'notifications';
export type AdminTabType = 'dashboard' | 'queue' | 'iot-analytics' | 'ai' | 'reports';

interface AppSidebarProps {
  userRole: UserRole;
  customerTab: CustomerTabType;
  adminTab: AdminTabType;
  onSelectCustomerTab: (tab: CustomerTabType) => void;
  onSelectAdminTab: (tab: AdminTabType) => void;
  onLogout: () => void;
  openDemoPanel?: () => void;
  openPhoneModal?: () => void;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  userRole,
  customerTab,
  adminTab,
  onSelectCustomerTab,
  onSelectAdminTab,
  onLogout,
  isMobileOpen,
  onCloseMobile,
}) => {
  const { 
    notifications, 
    aiRecommendations, 
    userTokens,
  } = useQueue();

  const unreadNotifs = notifications.filter(n => !n.read).length;
  const pendingAiRecs = aiRecommendations.filter(r => !r.applied).length;

  const handleNavClick = (callback: () => void) => {
    callback();
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#E9E5F5] flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          
          {/* Logo & Brand */}
          <div className="px-2">
            <div className="flex items-center gap-3 text-left w-full group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#3A0CA3] to-[#280779] flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
                <Activity className="w-5 h-5 text-[#FFF275]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-[#24213A]">Q-FLOW</span>
                  <span className={`text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-sm ${
                    userRole === 'admin' 
                      ? 'bg-[#FFF275] text-[#24213A] border border-[#E9E5F5]' 
                      : 'bg-[#F0EAFE] text-[#3A0CA3] border border-[#E9E5F5]'
                  }`}>
                    {userRole === 'admin' ? 'Admin' : 'Customer'}
                  </span>
                </div>
                <p className="text-[11px] text-[#6B6880] font-medium truncate">Smart Queue System</p>
              </div>
            </div>
          </div>

          {/* User Role Badge / Info Card */}
          <div className="px-2">
            <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs ${
              userRole === 'admin'
                ? 'bg-[#F0EAFE] border-[#E9E5F5] text-[#24213A]'
                : 'bg-[#F0EAFE]/60 border-[#E9E5F5] text-[#24213A]'
            }`}>
              {userRole === 'admin' ? (
                <ShieldCheck className="w-4 h-4 text-[#3A0CA3] shrink-0" />
              ) : (
                <User className="w-4 h-4 text-[#3A0CA3] shrink-0" />
              )}
              <div className="min-w-0">
                <span className="font-bold block truncate text-[#24213A]">
                  {userRole === 'admin' ? 'System Administrator' : 'Alex Mercer'}
                </span>
                <span className="text-[10px] text-[#6B6880] block truncate">
                  {userRole === 'admin' ? 'admin@qflow.system' : '+1 (555) 349-2810'}
                </span>
              </div>
            </div>
          </div>

          {/* 1. CUSTOMER SECTION ONLY (When logged in as Customer) */}
          {userRole === 'customer' && (
            <div className="space-y-1">
              <div className="px-3 pb-1 text-[11px] font-extrabold uppercase tracking-wider text-[#6B6880]">
                CUSTOMER
              </div>

              {/* Join Queue */}
              <button
                id="sidebar-nav-join-queue"
                onClick={() => handleNavClick(() => onSelectCustomerTab('join-queue'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  customerTab === 'join-queue'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 shrink-0" />
                  <span>Join Queue</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                  customerTab === 'join-queue' ? 'text-white' : 'text-[#6B6880]'
                }`} />
              </button>

              {/* My Token */}
              <button
                id="sidebar-nav-my-token"
                onClick={() => handleNavClick(() => onSelectCustomerTab('my-token'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  customerTab === 'my-token'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ticket className="w-4 h-4 shrink-0" />
                  <span>My Token</span>
                </div>
                {userTokens.length > 0 ? (
                  <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md ${
                    customerTab === 'my-token'
                      ? 'bg-[#FFF275] text-[#24213A]'
                      : 'bg-[#F0EAFE] text-[#3A0CA3]'
                  }`}>
                    {userTokens.length > 1 ? `${userTokens.length} Tokens` : userTokens[0].tokenNumber}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                    customerTab === 'my-token' ? 'text-white' : 'text-[#6B6880]'
                  }`} />
                )}
              </button>

              {/* Live Queue */}
              <button
                id="sidebar-nav-live-queue"
                onClick={() => handleNavClick(() => onSelectCustomerTab('live-queue'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  customerTab === 'live-queue'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Live Queue</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                  customerTab === 'live-queue' ? 'text-white' : 'text-[#6B6880]'
                }`} />
              </button>

              {/* Notifications */}
              <button
                id="sidebar-nav-notifications"
                onClick={() => handleNavClick(() => onSelectCustomerTab('notifications'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  customerTab === 'notifications'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Bell className="w-4 h-4 shrink-0" />
                  <span>Notifications</span>
                </div>
                {unreadNotifs > 0 ? (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    customerTab === 'notifications'
                      ? 'bg-[#FFF275] text-[#24213A]'
                      : 'bg-[#FFF275] text-[#24213A]'
                  }`}>
                    {unreadNotifs}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                    customerTab === 'notifications' ? 'text-white' : 'text-[#6B6880]'
                  }`} />
                )}
              </button>
            </div>
          )}

          {/* 2. ADMIN SECTION ONLY (When logged in as Admin) */}
          {userRole === 'admin' && (
            <div className="space-y-1">
              <div className="px-3 pb-1 text-[11px] font-extrabold uppercase tracking-wider text-[#6B6880]">
                ADMIN
              </div>

              {/* Dashboard */}
              <button
                id="sidebar-nav-admin-dashboard"
                onClick={() => handleNavClick(() => onSelectAdminTab('dashboard'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  adminTab === 'dashboard'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4 shrink-0" />
                  <span>Dashboard</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                  adminTab === 'dashboard' ? 'text-white' : 'text-[#6B6880]'
                }`} />
              </button>

              {/* Queue Management */}
              <button
                id="sidebar-nav-admin-queue"
                onClick={() => handleNavClick(() => onSelectAdminTab('queue'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  adminTab === 'queue'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Queue Management</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                  adminTab === 'queue' ? 'text-white' : 'text-[#6B6880]'
                }`} />
              </button>

              {/* IoT & Analytics */}
              <button
                id="sidebar-nav-admin-iot"
                onClick={() => handleNavClick(() => onSelectAdminTab('iot-analytics'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  adminTab === 'iot-analytics'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 shrink-0" />
                  <span>IoT & Analytics</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                  adminTab === 'iot-analytics' ? 'text-white' : 'text-[#6B6880]'
                }`} />
              </button>

              {/* AI Recommendations */}
              <button
                id="sidebar-nav-admin-ai"
                onClick={() => handleNavClick(() => onSelectAdminTab('ai'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  adminTab === 'ai'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Zap className="w-4 h-4 shrink-0" />
                  <span>AI Recommendations</span>
                </div>
                {pendingAiRecs > 0 ? (
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                    adminTab === 'ai'
                      ? 'bg-[#FFF275] text-[#24213A] font-black'
                      : 'bg-[#FFF275] text-[#24213A] border border-[#E9E5F5]'
                  }`}>
                    {pendingAiRecs}
                  </span>
                ) : (
                  <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                    adminTab === 'ai' ? 'text-white' : 'text-[#6B6880]'
                  }`} />
                )}
              </button>

              {/* Reports */}
              <button
                id="sidebar-nav-admin-reports"
                onClick={() => handleNavClick(() => onSelectAdminTab('reports'))}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  adminTab === 'reports'
                    ? 'bg-[#3A0CA3] text-white shadow-2xs font-bold'
                    : 'text-[#24213A] hover:bg-[#F0EAFE] hover:text-[#3A0CA3]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 shrink-0" />
                  <span>Reports</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 opacity-60 ${
                  adminTab === 'reports' ? 'text-white' : 'text-[#6B6880]'
                }`} />
              </button>
            </div>
          )}

        </div>

        {/* LOGOUT BUTTON AT SIDEBAR BOTTOM */}
        <div className="p-4 border-t border-[#E9E5F5] bg-[#FCFBF5]">
          <button
            id="sidebar-logout-btn"
            onClick={() => handleNavClick(onLogout)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold text-[#3A0CA3] hover:text-white bg-white hover:bg-[#3A0CA3] border border-[#E9E5F5] hover:border-[#3A0CA3] transition-all shadow-2xs cursor-pointer group"
          >
            <div className="flex items-center gap-2">
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Log Out</span>
            </div>
            <span className="text-[10px] text-[#6B6880] group-hover:text-white/80 font-normal">
              Exit {userRole === 'admin' ? 'Admin' : 'Customer'}
            </span>
          </button>
        </div>

      </aside>
    </>
  );
};
