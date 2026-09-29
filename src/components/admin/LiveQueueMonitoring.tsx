import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Volume2, 
  Play, 
  XCircle, 
  Building2,
  CheckCircle2,
  Ticket
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { ServiceCenterId } from '../../types';
import { DEPARTMENT_NAMES } from '../../data/departmentData';

export const LiveQueueMonitoring: React.FC = () => {
  const { 
    selectedCenterId,
    setSelectedCenterId,
    serviceCenters,
    departmentCounters,
    departmentQueues,
    openCounter, 
    closeCounter, 
    callNextToken,
    userTokens
  } = useQueue();

  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const currentCenter = serviceCenters.find(c => c.id === selectedCenterId) || serviceCenters[0];
  const counters = departmentCounters[selectedCenterId] || [];
  const queueList = departmentQueues[selectedCenterId] || [];
  const activeCounters = counters.filter(c => c.status === 'Serving');

  const deptAvgMins = currentCenter.services[0]?.avgServiceMinutes || 6;
  const deptWaitMins = Math.max(2, Math.round((queueList.length * deptAvgMins) / Math.max(1, activeCounters.length)));

  const handleCallNext = (counterId: number, counterName: string) => {
    callNextToken(counterId, selectedCenterId);
    const deptShort = DEPARTMENT_NAMES[selectedCenterId]?.split('(')[0]?.trim() || selectedCenterId;
    setNotificationMsg(`Calling next token for ${deptShort} at ${counterName}...`);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleOpen = (counterId: number, counterName: string) => {
    openCounter(counterId, selectedCenterId);
    setNotificationMsg(`${counterName} opened and marked Active.`);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const handleClose = (counterId: number, counterName: string) => {
    closeCounter(counterId, selectedCenterId);
    setNotificationMsg(`${counterName} closed.`);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {notificationMsg && (
        <div className="bg-[#252033] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-[#6A00F4]" />
            <span>{notificationMsg}</span>
          </div>
          <button 
            onClick={() => setNotificationMsg(null)}
            className="text-[#706A7E] hover:text-white"
          >
            &times;
          </button>
        </div>
      )}

      {/* DEPARTMENT SELECTOR BAR FOR ADMIN */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E9E3F0] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#6A00F4]" />
            <h3 className="text-xs font-extrabold text-[#252033] uppercase tracking-wider">
              Select Department to Manage
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#706A7E]">
            Independent Queues & Desks
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {serviceCenters.map((dept) => {
            const isSelected = dept.id === selectedCenterId;
            const deptQueueCount = (departmentQueues[dept.id] || []).length;
            const deptActiveCount = (departmentCounters[dept.id] || []).filter(c => c.status === 'Serving').length;
            const shortName = DEPARTMENT_NAMES[dept.id] || dept.name;

            return (
              <button
                key={dept.id}
                id={`admin-queue-dept-${dept.id}`}
                onClick={() => setSelectedCenterId(dept.id)}
                className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#6A00F4] text-white border-[#6A00F4] shadow-xs ring-2 ring-[#6A00F4]/20'
                    : 'bg-[#FAF8FC] hover:bg-[#F1E8FF] border-[#E9E3F0] text-[#252033]'
                }`}
              >
                <span className={`text-xs font-bold block truncate ${
                  isSelected ? 'text-white' : 'text-[#252033]'
                }`}>
                  {shortName.split('(')[0].trim()}
                </span>
                <div className="flex items-center justify-between mt-1 text-[10px]">
                  <span className={isSelected ? 'text-purple-100' : 'text-[#706A7E]'}>
                    {deptQueueCount} waiting
                  </span>
                  <span className={`font-bold ${
                    isSelected ? 'text-[#FFD6A5]' : 'text-emerald-700'
                  }`}>
                    {deptActiveCount} active
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Summary Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9E3F0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              Queue & Counter Control
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#F1E8FF] text-[#4D00B5] font-mono border border-[#E9E3F0]">
              {currentCenter.name}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#252033] mt-1">
            {DEPARTMENT_NAMES[selectedCenterId] || currentCenter.name}
          </h2>
          <p className="text-xs text-[#706A7E] mt-0.5">
            Independent desk controls: calling tokens updates only this department's queue.
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <div className="px-3.5 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <span className="text-[#706A7E] block">People Waiting</span>
            <span className="text-base font-extrabold text-[#252033]">{queueList.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <span className="text-[#706A7E] block">Active Desks</span>
            <span className="text-base font-extrabold text-[#6A00F4]">{activeCounters.length}/{counters.length}</span>
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <span className="text-[#706A7E] block">Est. Wait</span>
            <span className="text-base font-extrabold text-[#6A00F4]">~{deptWaitMins}m</span>
          </div>
        </div>
      </div>

      {/* Counter Table */}
      <div className="bg-white rounded-3xl border border-[#E9E3F0] shadow-2xs overflow-hidden">
        <div className="p-5 border-b border-[#E9E3F0] flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#252033] text-base">
              Service Counters — {DEPARTMENT_NAMES[selectedCenterId]?.split('(')[0]?.trim()}
            </h3>
            <p className="text-xs text-[#706A7E]">Live desk assignments and interactive dispatch controls</p>
          </div>
          <span className="text-xs font-semibold text-[#706A7E]">
            {counters.length} Department Counters
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm min-w-[650px]">
            <thead className="bg-[#FAF8FC] text-xs uppercase tracking-wider font-bold text-[#706A7E] border-b border-[#E9E3F0]">
              <tr>
                <th className="py-3.5 px-5 whitespace-nowrap">Counter</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Status</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Token</th>
                <th className="py-3.5 px-4 whitespace-nowrap">Service</th>
                <th className="py-3.5 px-5 text-right whitespace-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E3F0]">
              {counters.map((c) => {
                const isActive = c.status === 'Serving' || c.status === 'High Load';
                const isIdle = c.status === 'Idle';
                const isClosed = c.status === 'Closed' || c.status === 'Paused';

                return (
                  <tr key={c.id} className="hover:bg-[#F1E8FF]/30 transition-colors">
                    
                    {/* Column 1: Counter */}
                    <td className="py-4 px-5 whitespace-nowrap">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${
                          isActive ? 'bg-[#6A00F4] text-white' : 'bg-[#FFD6A5] text-[#252033]'
                        }`}>
                          {c.id}
                        </div>
                        <span className="font-bold text-[#252033]">{c.name}</span>
                      </div>
                    </td>

                    {/* Column 2: Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isActive && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          Active
                        </span>
                      )}
                      {isIdle && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                          Idle
                        </span>
                      )}
                      {isClosed && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-stone-100 text-stone-600 border border-stone-200">
                          <span className="w-2 h-2 rounded-full bg-stone-400" />
                          Closed
                        </span>
                      )}
                    </td>

                    {/* Column 3: Serving Token */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {c.currentTokenNumber && isActive ? (
                        <span className="text-base font-extrabold font-mono text-[#6A00F4] bg-[#F1E8FF] px-2.5 py-1 rounded-lg border border-[#E9E3F0]">
                          {c.currentTokenNumber}
                        </span>
                      ) : (
                        <span className="text-[#706A7E] font-mono text-sm">—</span>
                      )}
                    </td>

                    {/* Column 4: Service */}
                    <td className="py-4 px-4 text-[#252033] font-medium text-xs sm:text-sm whitespace-nowrap">
                      {isActive ? c.assignedServiceName : 'Available'}
                    </td>

                    {/* Column 5: Action Buttons */}
                    <td className="py-4 px-5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {/* Call Next Button */}
                        {isActive && (
                          <button
                            id={`btn-call-next-${c.id}`}
                            onClick={() => handleCallNext(c.id, c.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-100"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Call Next</span>
                          </button>
                        )}

                        {/* Open Counter Button */}
                        {!isActive && (
                          <button
                            id={`btn-open-counter-${c.id}`}
                            onClick={() => handleOpen(c.id, c.name)}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          >
                            <Play className="w-3.5 h-3.5" />
                            <span>Open Counter</span>
                          </button>
                        )}

                        {/* Close Counter Button */}
                        {isActive && (
                          <button
                            id={`btn-close-counter-${c.id}`}
                            onClick={() => handleClose(c.id, c.name)}
                            className="px-3 py-1.5 rounded-lg bg-[#FAF8FC] hover:bg-rose-50 text-[#252033] hover:text-rose-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer border border-[#E9E3F0] hover:border-rose-200"
                          >
                            <XCircle className="w-3.5 h-3.5 text-[#706A7E]" />
                            <span>Close Counter</span>
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Next Up In Queue Line for selected department */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold text-[#252033] text-sm">
              Next Tokens Waiting — {DEPARTMENT_NAMES[selectedCenterId]}
            </h3>
            <p className="text-xs text-[#706A7E]">Upcoming arrivals waiting for next available counter</p>
          </div>
          <span className="text-xs font-semibold text-[#706A7E]">
            {queueList.length} in waiting stream
          </span>
        </div>

        {queueList.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto py-2">
            {queueList.slice(0, 10).map((tok, idx) => (
              <div
                key={tok}
                className="px-3 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0] text-center shrink-0 min-w-20"
              >
                <span className="text-[10px] text-[#706A7E] block font-medium">#{idx + 1} in line</span>
                <span className="font-mono font-bold text-[#252033] text-sm">{tok}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-4 text-center text-xs text-[#706A7E]">
            Queue is currently clear for this department.
          </div>
        )}
      </div>

    </div>
  );
};
