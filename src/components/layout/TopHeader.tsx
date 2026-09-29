import React, { useState } from 'react';
import { Menu, Bell, LogOut, User, ShieldCheck } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { CustomerTabType, AdminTabType, UserRole } from './AppSidebar';

interface TopHeaderProps {
  userRole: UserRole;
  customerTab: CustomerTabType;
  adminTab: AdminTabType;
  onOpenMobileSidebar: () => void;
  onLogout: () => void;
  openPhoneModal?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  userRole,
  customerTab,
  adminTab,
  onOpenMobileSidebar,
  onLogout,
  openPhoneModal,
}) => {
  const { 
    notifications,
    markNotificationsAsRead,
  } = useQueue();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read).length;

  // Derive friendly page title
  const getPageTitle = () => {
    if (userRole === 'customer') {
      switch (customerTab) {
        case 'join-queue':
          return { section: 'Customer Portal', title: 'Join Digital Queue' };
        case 'my-token':
          return { section: 'Customer Portal', title: 'My Digital Token' };
        case 'live-queue':
          return { section: 'Customer Portal', title: 'Live Queue Status' };
        case 'notifications':
          return { section: 'Customer Portal', title: 'SMS & App Notifications' };
      }
    }
    if (userRole === 'admin') {
      switch (adminTab) {
        case 'dashboard':
          return { section: 'Admin Operations', title: 'Operations Dashboard' };
        case 'queue':
          return { section: 'Admin Operations', title: 'Queue & Counter Management' };
        case 'iot-analytics':
          return { section: 'Admin Operations', title: 'IoT Sensors & Analytics' };
        case 'ai':
          return { section: 'Admin Operations', title: 'AI Recommendations' };
        case 'reports':
          return { section: 'Admin Operations', title: 'Performance Reports' };
      }
    }
    return { section: 'Portal', title: 'Smart Queue Management' };
  };

  const { section, title } = getPageTitle();

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-[#E9E5F5]">
      <div className="px-4 sm:px-6 lg:px-8 py-3 min-h-[64px] flex items-center justify-between gap-3">
        
        {/* Left Side: Mobile Hamburger & Current Page Title */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile menu button */}
          <button
            id="mobile-sidebar-toggle-btn"
            onClick={onOpenMobileSidebar}
            className="p-2 -ml-1 rounded-xl text-[#6B6880] hover:text-[#24213A] hover:bg-[#F0EAFE] lg:hidden cursor-pointer"
            aria-label="Open Navigation Sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Breadcrumb & Title */}
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-xs text-[#6B6880] font-medium">
              <span className="font-bold text-[#24213A] tracking-tight">Q-FLOW</span>
              <span>•</span>
              <span className="font-bold text-[#3A0CA3]">
                {section}
              </span>
              <span>/</span>
              <span className="text-[#24213A] font-semibold truncate">{title}</span>
            </div>
            <h1 className="text-base sm:text-lg font-extrabold text-[#24213A] tracking-tight truncate leading-snug">
              {title}
            </h1>
          </div>
        </div>

        {/* Right Side: Clean & Functional Controls */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          
          {/* User Role Indicator pill */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-xl border bg-[#F0EAFE] border-[#E9E5F5] text-[#24213A]">
            {userRole === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#3A0CA3]" />
                <span>Admin Operations</span>
              </>
            ) : (
              <>
                <User className="w-3.5 h-3.5 text-[#3A0CA3]" />
                <span>Customer Portal</span>
              </>
            )}
          </div>

          {/* Notifications Bell Dropdown */}
          <div className="relative">
            <button
              id="topheader-notifications-btn"
              onClick={() => {
                setShowNotifDropdown(!showNotifDropdown);
                if (!showNotifDropdown) markNotificationsAsRead();
              }}
              className="relative p-2 rounded-xl text-[#6B6880] hover:text-[#24213A] hover:bg-[#F0EAFE] border border-[#E9E5F5] transition-colors cursor-pointer"
              title="System Alerts & SMS"
            >
              <Bell className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-[#FFF275] border border-[#24213A]" />
              )}
            </button>

            {/* Notifications Dropdown Card */}
            {showNotifDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowNotifDropdown(false)} 
                />
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-[#E9E5F5] p-4 z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E9E5F5]">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-[#3A0CA3]" />
                      <span className="font-bold text-sm text-[#24213A]">Live Queue Alerts</span>
                    </div>
                    <span className="text-[11px] text-[#6B6880] font-medium">
                      {notifications.length} messages
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-[#E9E5F5] mt-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-[#6B6880] py-4 text-center">No alerts at this moment</p>
                    ) : (
                      notifications.slice(0, 5).map((n) => (
                        <div key={n.id} className="py-2.5 text-xs">
                          <div className="flex items-center justify-between text-[#6B6880] mb-1">
                            <span className="font-mono text-[10px] font-semibold">{n.phoneNumber}</span>
                            <span>{n.timestamp}</span>
                          </div>
                          <p className="text-[#24213A] leading-relaxed font-normal">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#E9E5F5] flex items-center justify-between">
                    {openPhoneModal ? (
                      <button
                        onClick={() => {
                          setShowNotifDropdown(false);
                          openPhoneModal();
                        }}
                        className="text-xs font-bold text-[#3A0CA3] hover:text-[#280779] cursor-pointer"
                      >
                        Open Phone Simulator →
                      </button>
                    ) : (
                      <span />
                    )}
                    <button
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-xs text-[#6B6880] hover:text-[#24213A] cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Quick Header Log Out Button */}
          <button
            id="topheader-logout-btn"
            onClick={onLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-[#3A0CA3] hover:text-white bg-[#F0EAFE] hover:bg-[#3A0CA3] border border-[#E9E5F5] hover:border-[#3A0CA3] transition-colors cursor-pointer"
            title="Log Out of Session"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Out</span>
          </button>

        </div>

      </div>
    </header>
  );
};
