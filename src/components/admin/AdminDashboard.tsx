import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Radio, 
  Zap, 
  FileText,
  Sliders
} from 'lucide-react';
import { AdminOverview } from './AdminOverview';
import { LiveQueueMonitoring } from './LiveQueueMonitoring';
import { IoTAnalyticsView } from './IoTAnalyticsView';
import { AIRecommendationsView } from './AIRecommendationsView';
import { ReportsSection } from './ReportsSection';
import { useQueue } from '../../context/QueueContext';

interface AdminDashboardProps {
  openDemoPanel: () => void;
  activeTab?: 'dashboard' | 'queue' | 'iot-analytics' | 'ai' | 'reports';
  onTabChange?: (tab: 'dashboard' | 'queue' | 'iot-analytics' | 'ai' | 'reports') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  openDemoPanel,
  activeTab: controlledTab,
  onTabChange
}) => {
  const { aiRecommendations, alerts } = useQueue();
  const [internalTab, setInternalTab] = useState<'dashboard' | 'queue' | 'iot-analytics' | 'ai' | 'reports'>('dashboard');

  const activeTab = controlledTab || internalTab;

  const handleTabChange = (tab: 'dashboard' | 'queue' | 'iot-analytics' | 'ai' | 'reports') => {
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const pendingRecCount = aiRecommendations.filter(r => !r.applied).length;
  const activeAlertCount = alerts.filter(a => !a.resolved).length;

  interface AdminNavItem {
    id: 'dashboard' | 'queue' | 'iot-analytics' | 'ai' | 'reports';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }

  // The 5 Simplified Admin Navigation Tabs (Section 2)
  const navItems: AdminNavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'queue', label: 'Queue Management', icon: Users },
    { id: 'iot-analytics', label: 'IoT & Analytics', icon: Radio },
    { 
      id: 'ai', 
      label: 'AI Recommendations', 
      icon: Zap,
      badge: pendingRecCount > 0 ? `${pendingRecCount}` : undefined,
      badgeColor: 'bg-[#FFD6A5] text-[#252033] font-black'
    },
    { id: 'reports', label: 'Reports', icon: FileText },
  ];

  return (
    <div className="space-y-6 py-4">
      
      {/* 5-Item Admin Navigation Bar (Section 2) */}
      <div className="bg-white rounded-2xl p-1.5 sm:p-2 border border-[#E9E3F0] shadow-2xs overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2 min-w-max">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`admin-tab-${item.id}`}
                onClick={() => handleTabChange(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#6A00F4] text-white shadow-xs'
                    : 'text-[#252033] hover:text-[#6A00F4] hover:bg-[#F1E8FF]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? 'bg-white/20 text-white font-bold' : item.badgeColor || 'bg-[#FFD6A5] text-[#252033]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="transition-all">
        {activeTab === 'dashboard' && (
          <AdminOverview
            onNavigateTab={(tab) => {
              if (tab === 'counters') handleTabChange('queue');
              else if (tab === 'ai') handleTabChange('ai');
              else if (tab === 'iot' || tab === 'analytics') handleTabChange('iot-analytics');
              else if (tab === 'reports') handleTabChange('reports');
              else handleTabChange('dashboard');
            }}
            openDemoPanel={openDemoPanel}
          />
        )}

        {activeTab === 'queue' && (
          <LiveQueueMonitoring />
        )}

        {activeTab === 'iot-analytics' && (
          <IoTAnalyticsView openDemoPanel={openDemoPanel} />
        )}

        {activeTab === 'ai' && (
          <AIRecommendationsView />
        )}

        {activeTab === 'reports' && (
          <ReportsSection />
        )}
      </div>

    </div>
  );
};
