import React from 'react';
import { Bell, Smartphone, CheckCheck, Clock, AlertTriangle, ShieldCheck, Ticket } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

interface CustomerNotificationsProps {
  onOpenPhoneModal: () => void;
}

export const CustomerNotifications: React.FC<CustomerNotificationsProps> = ({ onOpenPhoneModal }) => {
  const { notifications, markNotificationsAsRead, userToken } = useQueue();

  const getNotifIcon = (type: string) => {
    switch (type) {
      case 'creation':
        return <Ticket className="w-4 h-4 text-[#6A00F4]" />;
      case 'approaching':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      case 'serving':
        return <CheckCheck className="w-4 h-4 text-emerald-600" />;
      case 'congestion':
        return <Clock className="w-4 h-4 text-[#4D00B5]" />;
      default:
        return <Bell className="w-4 h-4 text-[#706A7E]" />;
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-sm space-y-6">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E9E3F0] gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">Notification Stream</span>
              <span className="text-[10px] font-semibold bg-[#F1E8FF] text-[#6A00F4] px-2 py-0.5 rounded-full border border-[#E9E3F0]">
                SMS & App Push
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#252033] mt-1">Virtual Queue Alerts</h2>
            <p className="text-xs text-[#706A7E]">
              Live updates delivered to <strong className="text-[#252033]">{userToken?.customerPhone || '+1 (555) 349-2810'}</strong>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPhoneModal}
              className="text-xs font-bold px-3 py-2 rounded-xl bg-[#F1E8FF] hover:bg-[#FFD6A5] text-[#6A00F4] hover:text-[#252033] border border-[#E9E3F0] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#6A00F4]" />
              <span>Launch Phone Device</span>
            </button>
            <button
              onClick={markNotificationsAsRead}
              className="text-xs text-[#706A7E] hover:text-[#252033] p-2 rounded-lg hover:bg-[#F1E8FF]"
            >
              Mark read
            </button>
          </div>
        </div>

        {/* List of Simulated Messages */}
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-2xl border transition-all ${
                n.read
                  ? 'bg-[#FAF8FC]/60 border-[#E9E3F0]'
                  : 'bg-[#F1E8FF]/50 border-[#6A00F4]/30 shadow-2xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white shadow-2xs border border-[#E9E3F0] flex items-center justify-center shrink-0">
                    {getNotifIcon(n.type)}
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-[#252033] uppercase tracking-wide">
                      {n.type === 'creation' && 'Token Created'}
                      {n.type === 'approaching' && 'Turn Approaching'}
                      {n.type === 'serving' && 'Desk Calling'}
                      {n.type === 'congestion' && 'Queue Advisory'}
                      {n.type === 'cancellation' && 'Cancelled'}
                    </span>
                    <span className="text-[11px] text-[#706A7E] font-mono ml-2">Sent via SMS Gateway</span>
                  </div>
                </div>

                <span className="text-[11px] text-[#706A7E] font-mono">{n.timestamp}</span>
              </div>

              <p className="text-xs sm:text-sm text-[#252033] font-medium mt-2.5 pl-10 leading-relaxed">
                "{n.message}"
              </p>

              <div className="mt-2.5 pt-2 pl-10 border-t border-[#E9E3F0] flex items-center justify-between text-[10px] text-[#706A7E]">
                <span className="flex items-center gap-1">
                  <CheckCheck className="w-3.5 h-3.5 text-[#6A00F4]" />
                  Delivered to carrier
                </span>
                <span className="font-mono text-[#706A7E]">ID: {n.id}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] flex items-center gap-3 text-xs text-[#706A7E]">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>
            SMS alerts are fully automated in the Q-FLOW prototype and trigger when position drops to 2 or desk is assigned.
          </span>
        </div>

      </div>

    </div>
  );
};
