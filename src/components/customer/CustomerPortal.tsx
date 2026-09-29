import React, { useState } from 'react';
import { 
  PlusCircle, 
  Ticket, 
  Users, 
  Bell, 
  FileCheck,
  Building2,
  ChevronRight
} from 'lucide-react';
import { TokenGenerator } from './TokenGenerator';
import { MyTokenView } from './MyTokenView';
import { LiveQueueBoard } from './LiveQueueBoard';
import { CustomerNotifications } from './CustomerNotifications';
import { DocumentGuideView } from './DocumentGuideView';
import { ServiceCenterSelector } from './ServiceCenterSelector';
import { useQueue } from '../../context/QueueContext';

interface CustomerPortalProps {
  openPhoneModal: () => void;
  activeTab?: 'join-queue' | 'my-token' | 'live-queue' | 'notifications';
  onTabChange?: (tab: 'join-queue' | 'my-token' | 'live-queue' | 'notifications') => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({ 
  openPhoneModal,
  activeTab: controlledTab,
  onTabChange
}) => {
  const { userTokens, userToken, notifications, currentCenter } = useQueue();
  const [internalTab, setInternalTab] = useState<'join-queue' | 'my-token' | 'live-queue' | 'notifications'>('my-token');
  const [showDocGuideModal, setShowDocGuideModal] = useState(false);
  const [showCenterSelector, setShowCenterSelector] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);

  const activeSubTab = controlledTab || internalTab;

  const handleTabChange = (tab: 'join-queue' | 'my-token' | 'live-queue' | 'notifications') => {
    setShowDocGuideModal(false);
    setShowCenterSelector(false);
    setInternalTab(tab);
    if (onTabChange) {
      onTabChange(tab);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  interface CustomerNavTab {
    id: 'join-queue' | 'my-token' | 'live-queue' | 'notifications';
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
    badgeColor?: string;
  }

  // The 4 Simplified Customer Tabs (Section 2)
  const navTabs: CustomerNavTab[] = [
    { id: 'join-queue', label: 'Join Queue', icon: PlusCircle },
    { 
      id: 'my-token', 
      label: 'My Token', 
      icon: Ticket,
      badge: userTokens.length > 0 
        ? (userTokens.length > 1 ? `${userTokens.length} Tokens` : userTokens[0].tokenNumber)
        : undefined 
    },
    { id: 'live-queue', label: 'Live Queue', icon: Users },
    { 
      id: 'notifications', 
      label: 'Notifications', 
      icon: Bell,
      badge: unreadCount > 0 ? `${unreadCount}` : undefined,
      badgeColor: 'bg-indigo-600 text-white'
    },
  ];

  const handleSelectServiceFromGuide = (_centerId: any, serviceId: string) => {
    setPreselectedServiceId(serviceId);
    setShowDocGuideModal(false);
    handleTabChange('join-queue');
  };

  return (
    <div className="space-y-6 py-4">
      
      {/* 4-Item Customer Navigation Bar (Section 2) */}
      <div className="bg-white rounded-2xl p-1.5 sm:p-2 border border-[#E9E3F0] shadow-2xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto">
          {navTabs.map((item) => {
            const Icon = item.icon;
            const isActive = activeSubTab === item.id;
            return (
              <button
                key={item.id}
                id={`customer-tab-${item.id}`}
                onClick={() => {
                  handleTabChange(item.id);
                }}
                className={`flex items-center gap-2 px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isActive && !showDocGuideModal && !showCenterSelector
                    ? 'bg-[#6A00F4] text-white shadow-xs'
                    : 'text-[#252033] hover:text-[#6A00F4] hover:bg-[#F1E8FF]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[10px] px-2 py-0.2 rounded-full font-mono font-bold ${
                    isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-[#F1E8FF] text-[#6A00F4]'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Quick Helper Links: Current Center & Document Requirements */}
        <div className="flex items-center gap-2 px-1">
          <button
            onClick={() => {
              setShowCenterSelector(!showCenterSelector);
              setShowDocGuideModal(false);
            }}
            className="text-xs font-semibold text-[#706A7E] hover:text-[#252033] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg hover:bg-[#F1E8FF] cursor-pointer"
          >
            <Building2 className="w-3.5 h-3.5 text-[#6A00F4]" />
            <span className="truncate max-w-36">{currentCenter.name}</span>
          </button>

          <button
            onClick={() => {
              setShowDocGuideModal(!showDocGuideModal);
              setShowCenterSelector(false);
            }}
            className="text-xs font-bold text-[#6A00F4] hover:text-[#4D00B5] bg-[#F1E8FF] hover:bg-[#FFD6A5] flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#E9E3F0] cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Document Guide</span>
          </button>
        </div>
      </div>

      {/* Center Selector Dropdown / Overlay if opened */}
      {showCenterSelector && (
        <div className="bg-[#FAF8FC] p-4 rounded-3xl border border-[#E9E3F0] animate-fade-in space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#252033]">Select Service Center</h3>
            <button 
              onClick={() => setShowCenterSelector(false)}
              className="text-xs font-semibold text-[#706A7E] hover:text-[#252033]"
            >
              Done &times;
            </button>
          </div>
          <ServiceCenterSelector onCenterSelected={() => setShowCenterSelector(false)} />
        </div>
      )}

      {/* Document Guide Overlay if opened */}
      {showDocGuideModal && (
        <div className="bg-white p-6 rounded-3xl border border-[#E9E3F0] shadow-sm animate-fade-in space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E9E3F0]">
            <div>
              <h3 className="text-lg font-bold text-[#252033]">Document Requirements Catalog</h3>
              <p className="text-xs text-[#706A7E]">Check required IDs and certificates before booking your token</p>
            </div>
            <button 
              onClick={() => setShowDocGuideModal(false)}
              className="text-xs font-bold text-[#706A7E] hover:text-[#252033] px-3 py-1.5 bg-[#F1E8FF] border border-[#E9E3F0] rounded-lg cursor-pointer"
            >
              Back to Queue
            </button>
          </div>
          <DocumentGuideView onSelectServiceForToken={handleSelectServiceFromGuide} />
        </div>
      )}

      {/* Main Tab Views */}
      {!showDocGuideModal && !showCenterSelector && (
        <div>
          {/* 1. Join Queue */}
          {activeSubTab === 'join-queue' && (
            <TokenGenerator 
              onTokenGenerated={() => handleTabChange('my-token')}
              initialServiceId={preselectedServiceId}
            />
          )}

          {/* 2. My Token */}
          {activeSubTab === 'my-token' && (
            <MyTokenView
              onViewQueue={() => handleTabChange('live-queue')}
              onOpenPhoneModal={openPhoneModal}
              onIssueNewToken={() => handleTabChange('join-queue')}
            />
          )}

          {/* 3. Live Queue */}
          {activeSubTab === 'live-queue' && (
            <LiveQueueBoard onIssueNewToken={() => handleTabChange('join-queue')} />
          )}

          {/* 4. Notifications */}
          {activeSubTab === 'notifications' && (
            <CustomerNotifications onOpenPhoneModal={openPhoneModal} />
          )}
        </div>
      )}

    </div>
  );
};
