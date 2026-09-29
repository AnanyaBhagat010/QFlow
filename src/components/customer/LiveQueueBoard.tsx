import React from 'react';
import { 
  Users, 
  Clock, 
  Ticket, 
  Building2,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Cpu
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { ServiceCenterId } from '../../types';
import { DEPARTMENT_NAMES } from '../../data/departmentData';

interface LiveQueueBoardProps {
  onIssueNewToken?: () => void;
}

export const LiveQueueBoard: React.FC<LiveQueueBoardProps> = ({ onIssueNewToken }) => {
  const { 
    selectedCenterId,
    setSelectedCenterId,
    serviceCenters,
    departmentCounters,
    departmentQueues,
    getUserTokenForCenter,
    predictedWaitMinutes 
  } = useQueue();

  const currentCenter = serviceCenters.find(c => c.id === selectedCenterId) || serviceCenters[0];
  const targetDeptCounters = departmentCounters[selectedCenterId] || [];
  const targetDeptQueue = departmentQueues[selectedCenterId] || [];

  // Active serving counter token for selected department
  const currentlyServingCounter = targetDeptCounters.find(c => c.status === 'Serving' && c.currentTokenNumber);
  const currentServingNumber = currentlyServingCounter?.currentTokenNumber || '—';

  // Active counter count
  const activeCountersCount = targetDeptCounters.filter(c => c.status === 'Serving').length;

  // Check if customer holds a token for THIS department
  const userTokenInDept = getUserTokenForCenter(selectedCenterId);

  // Queue wait calculation for this department
  const peopleWaiting = targetDeptQueue.length;
  const deptAvgMins = currentCenter.services[0]?.avgServiceMinutes || 6;
  const deptWaitMins = Math.max(2, Math.round((peopleWaiting * deptAvgMins) / Math.max(1, activeCountersCount)));

  // Queue Status
  const getQueueStatus = () => {
    if (peopleWaiting > 15 || currentCenter.status === 'critical') {
      return { label: 'Congested', color: 'bg-rose-100 text-rose-800 border-rose-200' };
    }
    if (peopleWaiting > 8 || currentCenter.status === 'moderate') {
      return { label: 'Moderate', color: 'bg-amber-100 text-amber-800 border-amber-200' };
    }
    return { label: 'Normal', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
  };

  const queueStatus = getQueueStatus();

  // Next upcoming tokens for this department
  const nextFewTokens = targetDeptQueue.slice(0, 6);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* 1. DEPARTMENT SELECTOR TABS */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E9E3F0] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#6A00F4]" />
            <h3 className="text-xs font-extrabold text-[#252033] uppercase tracking-wider">
              Select Department Queue
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-[#706A7E]">
            {serviceCenters.length} Independent Department Queues
          </span>
        </div>

        {/* Scrollable / Responsive Department Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {serviceCenters.map((dept) => {
            const isSelected = dept.id === selectedCenterId;
            const hasUserToken = !!getUserTokenForCenter(dept.id);
            const shortName = DEPARTMENT_NAMES[dept.id] || dept.name;

            return (
              <button
                key={dept.id}
                id={`live-queue-dept-${dept.id}`}
                onClick={() => setSelectedCenterId(dept.id)}
                className={`p-2.5 sm:p-3 rounded-2xl text-left border transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#6A00F4] text-white border-[#6A00F4] shadow-sm ring-2 ring-[#6A00F4]/20'
                    : 'bg-[#FAF8FC] hover:bg-[#F1E8FF] border-[#E9E3F0] text-[#252033]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold truncate block ${
                    isSelected ? 'text-white' : 'text-[#252033]'
                  }`}>
                    {shortName.split('(')[0].trim()}
                  </span>
                  {hasUserToken && (
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      isSelected ? 'bg-[#FFD6A5]' : 'bg-[#6A00F4]'
                    }`} title="You have an active token here" />
                  )}
                </div>
                <div className="flex items-center justify-between mt-1 text-[10px]">
                  <span className={isSelected ? 'text-purple-100' : 'text-[#706A7E]'}>
                    {(departmentQueues[dept.id] || []).length} in queue
                  </span>
                  {hasUserToken && (
                    <span className={`font-mono font-bold ${
                      isSelected ? 'text-[#FFD6A5]' : 'text-[#6A00F4]'
                    }`}>
                      Token Booked
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Header for Selected Department */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9E3F0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              Live Queue Status
            </span>
            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${queueStatus.color}`}>
              {queueStatus.label}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#252033] mt-1">{currentCenter.name}</h2>
          <p className="text-xs text-[#706A7E]">
            Real-time queue tracking • {activeCountersCount} active counters serving
          </p>
        </div>

        {onIssueNewToken && !userTokenInDept && (
          <button
            onClick={onIssueNewToken}
            className="px-4 py-2 rounded-xl bg-[#F1E8FF] text-[#6A00F4] hover:bg-[#FFD6A5] hover:text-[#252033] font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto shrink-0 border border-[#E9E3F0]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Join This Queue</span>
          </button>
        )}
      </div>

      {/* 4 Core Prominent Indicators */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* 1. Currently Serving */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-bold mb-2">
            <span>Currently Serving</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-emerald-600 my-1 tracking-tight truncate">
            {currentServingNumber}
          </div>
          <span className="text-xs text-[#706A7E] font-medium block">
            {currentlyServingCounter ? `${currentlyServingCounter.name}` : 'At active counter'}
          </span>
        </div>

        {/* 2. Your Token in this Department */}
        <div className="bg-white rounded-3xl p-6 border border-[#6A00F4]/30 bg-[#F1E8FF]/30 shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#6A00F4] font-bold mb-2">
            <span>Your Token</span>
            <Ticket className="w-4 h-4 text-[#6A00F4]" />
          </div>
          {userTokenInDept ? (
            <>
              <div className="text-3xl sm:text-4xl font-black font-mono text-[#6A00F4] my-1 tracking-tight truncate">
                {userTokenInDept.tokenNumber}
              </div>
              <span className="text-xs text-[#6A00F4] font-medium block">
                {userTokenInDept.status === 'SERVING' ? 'Now Serving!' : `${userTokenInDept.peopleAhead} people ahead`}
              </span>
            </>
          ) : (
            <>
              <div className="text-2xl sm:text-3xl font-bold font-mono text-[#706A7E]/60 my-1 tracking-tight">
                None
              </div>
              <span className="text-xs text-[#706A7E] font-medium block">
                Not booked in this dept
              </span>
            </>
          )}
        </div>

        {/* 3. People Waiting */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-bold mb-2">
            <span>People Waiting</span>
            <Users className="w-4 h-4 text-[#706A7E]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#252033] my-1 tracking-tight">
            {peopleWaiting}
          </div>
          <span className="text-xs text-[#706A7E] font-medium block">
            In this department's line
          </span>
        </div>

        {/* 4. Estimated Wait */}
        <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-bold mb-2">
            <span>Estimated Wait</span>
            <Clock className="w-4 h-4 text-[#6A00F4]" />
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#6A00F4] my-1 tracking-tight">
            {userTokenInDept ? userTokenInDept.estimatedWaitMinutes : deptWaitMins} min
          </div>
          <span className="text-xs text-[#706A7E] font-medium block">
            {userTokenInDept ? 'Until your token is called' : 'Expected wait time'}
          </span>
        </div>

      </div>

      {/* Next Few Tokens in line for THIS department */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#E9E3F0]">
          <div>
            <h3 className="font-bold text-[#252033] text-sm sm:text-base">
              Next Tokens in Line ({currentCenter.name.split('(')[0].trim()})
            </h3>
            <p className="text-xs text-[#706A7E]">Upcoming arrivals waiting for next available counter</p>
          </div>
          <span className="text-xs font-semibold text-[#706A7E]">
            {nextFewTokens.length} shown
          </span>
        </div>

        {nextFewTokens.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
            {nextFewTokens.map((tok, idx) => {
              const isUser = userTokenInDept?.tokenNumber === tok;
              return (
                <div
                  key={tok}
                  className={`p-4 rounded-2xl border text-center transition-all ${
                    isUser
                      ? 'bg-[#6A00F4] text-white border-[#6A00F4] shadow-sm ring-2 ring-[#6A00F4]/30'
                      : 'bg-[#FAF8FC] border-[#E9E3F0] text-[#252033]'
                  }`}
                >
                  <span className={`text-[10px] block font-bold uppercase tracking-wider ${
                    isUser ? 'text-purple-100' : 'text-[#706A7E]'
                  }`}>
                    Position #{idx + 1}
                  </span>
                  <span className="text-2xl font-black font-mono my-1 block">
                    {tok}
                  </span>
                  {isUser && (
                    <span className="inline-block mt-1 text-[10px] bg-white text-[#6A00F4] font-extrabold px-2 py-0.5 rounded-full">
                      YOUR TOKEN
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-[#706A7E]">
            No waiting tokens in this department queue currently.
          </div>
        )}
      </div>

    </div>
  );
};
