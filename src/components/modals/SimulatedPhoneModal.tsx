import React from 'react';
import { 
  X, 
  Smartphone, 
  Wifi, 
  Battery, 
  Bell, 
  Clock, 
  Ticket, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

interface SimulatedPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulatedPhoneModal: React.FC<SimulatedPhoneModalProps> = ({ isOpen, onClose }) => {
  const { userToken, notifications, currentCenter } = useQueue();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-sm">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-slate-300 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all flex items-center gap-1.5 text-xs font-semibold"
        >
          <X className="w-4 h-4" />
          <span>Close Device Preview</span>
        </button>

        {/* Realistic Mobile Device Frame */}
        <div className="w-full bg-[#1a1622] rounded-[44px] p-3 shadow-2xl border-4 border-[#252033] ring-1 ring-white/20">
          
          {/* Inner Screen */}
          <div className="bg-[#FAF8FC] rounded-[36px] overflow-hidden flex flex-col h-[650px] relative text-[#252033] border border-[#E9E3F0]">
            
            {/* Top Phone Status Bar (Dynamic Island & Time) */}
            <div className="bg-white px-6 pt-3 pb-2 flex items-center justify-between text-xs font-bold text-[#252033] border-b border-[#E9E3F0]">
              <span>9:41</span>
              {/* Dynamic Island Pill */}
              <div className="w-20 h-4 bg-[#252033] rounded-full flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#6A00F4] animate-pulse" />
              </div>
              <div className="flex items-center gap-1.5 text-[#706A7E]">
                <Wifi className="w-3.5 h-3.5" />
                <Battery className="w-4 h-4" />
              </div>
            </div>

            {/* Scrollable Screen Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              
              {/* Header inside Phone */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#6A00F4] uppercase tracking-wider">
                    Q-FLOW Mobile PWA
                  </span>
                  <h3 className="font-extrabold text-sm text-[#252033]">{currentCenter.name}</h3>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Main Token Card inside Phone */}
              {userToken && userToken.status === 'WAITING' ? (
                <div className="bg-gradient-to-br from-[#6A00F4] to-[#4D00B5] text-white rounded-2xl p-4 shadow-md text-center space-y-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FFD6A5] block">
                    Your Digital Queue Pass
                  </span>

                  <div className="text-4xl font-extrabold font-mono tracking-tight text-white py-1">
                    {userToken.tokenNumber}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs bg-white/10 rounded-xl p-2.5 backdrop-blur-xs">
                    <div>
                      <span className="text-purple-100 text-[10px] block">People Ahead</span>
                      <strong className="text-base font-extrabold">{userToken.peopleAhead}</strong>
                    </div>
                    <div>
                      <span className="text-purple-100 text-[10px] block">Estimated Wait</span>
                      <strong className="text-base font-extrabold">~{userToken.estimatedWaitMinutes}m</strong>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-200 block">
                    {userToken.assignedCounterName ? `Proceed to ${userToken.assignedCounterName}!` : 'Position Confirmed'}
                  </span>

                  {userToken.requiredDocuments && userToken.requiredDocuments.length > 0 && (
                    <div className="bg-black/20 rounded-xl p-2.5 text-left space-y-1 text-[10px]">
                      <span className="text-purple-100 font-bold block uppercase tracking-wider">
                        Document Checklist ({(userToken.readyDocumentIds || []).length}/{userToken.requiredDocuments.length} Ready):
                      </span>
                      {userToken.requiredDocuments.slice(0, 3).map((d) => (
                        <div key={d.id} className="flex items-center gap-1.5 truncate text-slate-100">
                          <span className={`w-3 h-3 rounded flex items-center justify-center text-[9px] ${
                            (userToken.readyDocumentIds || []).includes(d.id) 
                              ? 'bg-emerald-400 text-slate-900 font-bold' 
                              : 'border border-purple-200'
                          }`}>
                            ✓
                          </span>
                          <span className="truncate">{d.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl p-5 border border-[#E9E3F0] text-center space-y-2">
                  <Ticket className="w-8 h-8 text-[#6A00F4] mx-auto" />
                  <h4 className="font-bold text-sm text-[#252033]">No Active Token</h4>
                  <p className="text-xs text-[#706A7E]">Tap Generate Token to receive an automated virtual queue number.</p>
                </div>
              )}

              {/* Simulated Incoming SMS Push Bubble */}
              <div className="space-y-2">
                <span className="text-[11px] font-extrabold text-[#706A7E] uppercase tracking-wider block">
                  Simulated SMS Notifications
                </span>

                <div className="space-y-2">
                  {notifications.slice(0, 3).map((n) => (
                    <div
                      key={n.id}
                      className="p-3 rounded-xl bg-white border border-[#E9E3F0] shadow-2xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px] text-[#706A7E]">
                        <span className="font-bold text-[#252033] flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-[#6A00F4]" />
                          SMS • Q-FLOW Gateway
                        </span>
                        <span className="font-mono">{n.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#252033] font-medium leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips for Customers */}
              <div className="p-3 rounded-xl bg-[#FFD6A5]/40 border border-[#E9E3F0] flex items-start gap-2 text-xs text-[#252033]">
                <ShieldCheck className="w-4 h-4 text-[#6A00F4] shrink-0 mt-0.5" />
                <span>You can wait in the cafeteria or nearby cafe. Your phone will chime when you are 2 places away.</span>
              </div>

            </div>

            {/* Bottom Home Indicator Bar */}
            <div className="p-2 flex justify-center bg-white border-t border-[#E9E3F0]">
              <div className="w-32 h-1 bg-[#E9E3F0] rounded-full" />
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
