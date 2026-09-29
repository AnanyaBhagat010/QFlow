import React from 'react';
import { 
  Users, 
  Clock, 
  Cpu, 
  Ticket, 
  AlertTriangle, 
  Zap, 
  ArrowRight,
  Building2
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { SimpleBarChart } from '../common/SimpleCharts';
import { DEPARTMENT_NAMES } from '../../data/departmentData';

interface AdminOverviewProps {
  onNavigateTab: (tabId: string) => void;
  openDemoPanel: () => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab, openDemoPanel }) => {
  const { 
    selectedCenterId,
    setSelectedCenterId,
    serviceCenters,
    departmentCounters,
    departmentQueues,
    simulation, 
    predictedWaitMinutes,
    aiRecommendations, 
    alerts,
    openAvailableCounter
  } = useQueue();

  const currentCenter = serviceCenters.find(c => c.id === selectedCenterId) || serviceCenters[0];
  const counters = departmentCounters[selectedCenterId] || [];
  const queueList = departmentQueues[selectedCenterId] || [];
  const activeCounters = counters.filter(c => c.status === 'Serving' || c.status === 'High Load');
  const activeServingCounter = counters.find(c => c.status === 'Serving' && c.currentTokenNumber);
  const currentToken = activeServingCounter?.currentTokenNumber || '—';

  const deptAvgMins = currentCenter.services[0]?.avgServiceMinutes || 6;
  const deptWaitMins = Math.max(2, Math.round((queueList.length * deptAvgMins) / Math.max(1, activeCounters.length)));

  // Find active alert or provide default
  const activeAlert = alerts.find(a => !a.resolved);
  const alertText = activeAlert ? activeAlert.message : 'Registration queue is increasing.';

  // Find active recommendation or provide default
  const pendingRec = aiRecommendations.find(r => !r.applied);
  const recText = pendingRec ? pendingRec.recommendedAction : 'Activate Counter 4 to reduce waiting time.';
  const recReason = pendingRec ? pendingRec.reason : 'Registration queue is increasing and existing counters are highly occupied.';

  // Footfall Trend Data (People arriving over time)
  const footfallTrendData = [
    { label: '10:00 AM', value: 18 },
    { label: '10:30 AM', value: 32 },
    { label: '11:00 AM', value: 45 },
    { label: '11:30 AM', value: 48 },
    { label: '12:00 PM', value: 24 },
    { label: '12:30 PM', value: 22 },
    { label: '01:00 PM', value: 35 },
    { label: 'Now', value: simulation.inflowRate },
  ];

  return (
    <div className="space-y-6">
      
      {/* Department Selector Filter */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#E9E3F0] shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#6A00F4]" />
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#252033]">
            Department Metric Filter:
          </span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {serviceCenters.map((dept) => {
            const isSelected = dept.id === selectedCenterId;
            const shortName = DEPARTMENT_NAMES[dept.id]?.split('(')[0]?.trim() || dept.name;
            return (
              <button
                key={dept.id}
                onClick={() => setSelectedCenterId(dept.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-[#6A00F4] text-white shadow-xs'
                    : 'bg-[#FAF8FC] hover:bg-[#F1E8FF] text-[#252033] border border-[#E9E3F0]'
                }`}
              >
                {shortName}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Prominent Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Metric 1: People Waiting */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E9E3F0] shadow-2xs hover:border-[#6A00F4]/50 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-semibold mb-2">
            <span>People Waiting</span>
            <div className="w-8 h-8 rounded-lg bg-[#F1E8FF] text-[#6A00F4] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#252033]">
            {queueList.length}
          </div>
          <span className="text-[11px] font-medium text-[#706A7E] mt-2 block">
            In {DEPARTMENT_NAMES[selectedCenterId]?.split('(')[0]?.trim()} queue
          </span>
        </div>

        {/* Metric 2: Current Token */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E9E3F0] shadow-2xs hover:border-[#6A00F4]/50 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-semibold mb-2">
            <span>Current Token</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFD6A5] text-[#252033] flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black font-mono text-[#6A00F4] truncate">
            {currentToken}
          </div>
          <span className="text-[11px] font-medium text-[#706A7E] mt-2 block">
            {activeServingCounter ? `Being served at ${activeServingCounter.name}` : 'No active serving desk'}
          </span>
        </div>

        {/* Metric 3: Average Wait */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E9E3F0] shadow-2xs hover:border-[#6A00F4]/50 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-semibold mb-2">
            <span>Average Wait</span>
            <div className="w-8 h-8 rounded-lg bg-[#F1E8FF] text-[#6A00F4] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-[#6A00F4]">
            {deptWaitMins} min
          </div>
          <span className="text-[11px] font-medium text-[#706A7E] mt-2 block">
            Estimated wait for new arrival
          </span>
        </div>

        {/* Metric 4: Active Counters */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#E9E3F0] shadow-2xs hover:border-[#6A00F4]/50 transition-colors">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-semibold mb-2">
            <span>Active Counters</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl sm:text-4xl font-black text-emerald-600">
            {activeCounters.length}/{counters.length}
          </div>
          <span className="text-[11px] font-medium text-[#706A7E] mt-2 block">
            {counters.length - activeCounters.length} available standby
          </span>
        </div>

      </div>

      {/* Footfall Trend Chart */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-[#E9E3F0] gap-2">
          <div>
            <h3 className="font-bold text-[#252033] text-base">Footfall Trend</h3>
            <p className="text-xs text-[#706A7E]">Number of people arriving over time</p>
          </div>
          <span className="text-xs font-bold text-[#4D00B5] bg-[#F1E8FF] border border-[#E9E3F0] px-2.5 py-1 rounded-lg self-start sm:self-auto">
            Total Today: {simulation.footfall}
          </span>
        </div>

        <div className="pt-2">
          <SimpleBarChart
            data={footfallTrendData}
            color="#6A00F4"
            unit="arrivals"
            height={240}
          />
        </div>
      </div>

      {/* Current Alert (Section 3) */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Current Alert
              </span>
              <span className="text-[10px] bg-amber-200/80 text-amber-900 font-bold px-2 py-0.5 rounded-full">
                Active
              </span>
            </div>
            <p className="text-sm font-bold text-[#252033] mt-0.5">
              "{alertText}"
            </p>
            <p className="text-xs text-[#706A7E] mt-0.5">
              Detected by Entrance Sensor. Action recommended to prevent customer delay.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab('ai')}
          className="text-xs font-bold text-amber-800 hover:text-amber-900 flex items-center gap-1 shrink-0 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* AI Recommendation (Section 13: Clear spacing, not cramped, ACTIVATE COUNTER button) */}
      <div className="bg-gradient-to-br from-[#1E1926] via-[#2A1D3B] to-[#171221] text-white rounded-3xl p-6 sm:p-8 shadow-sm border border-[#E9E3F0]/20">
        
        {/* Header Tag */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#6A00F4]/30 text-[#FFD6A5] flex items-center justify-center shrink-0 border border-[#6A00F4]/40">
              <Zap className="w-5 h-5 text-[#FFD6A5]" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FFD6A5] block">
                LIVE AI RECOMMENDATION
              </span>
              <p className="text-xs text-purple-200 font-medium">Predictive Queue Balancing</p>
            </div>
          </div>
          <span className="text-[11px] bg-[#FFD6A5]/20 text-[#FFD6A5] px-3 py-1 rounded-full font-bold border border-[#FFD6A5]/30">
            Real-Time Analysis
          </span>
        </div>

        {/* Content rows with clear spacing */}
        <div className="space-y-5">
          
          {/* Situation Headline */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200/70 block mb-1">
              Trigger Event
            </span>
            <p className="text-base sm:text-lg font-bold text-white">
              "{alertText}"
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <span className="text-[11px] font-medium text-purple-200/70 block mb-1">
                Current waiting:
              </span>
              <span className="text-2xl font-black text-white">
                {simulation.queueLength} people
              </span>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4">
              <span className="text-[11px] font-medium text-purple-200/70 block mb-1">
                Estimated wait:
              </span>
              <span className="text-2xl font-black text-[#FFD6A5]">
                {predictedWaitMinutes} minutes
              </span>
            </div>
          </div>

          {/* Recommendation & Reason */}
          <div className="bg-white/5 border border-[#6A00F4]/40 rounded-2xl p-5 space-y-3">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#FFD6A5] block mb-0.5">
                Recommendation:
              </span>
              <p className="text-lg font-extrabold text-white">
                {recText}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200/70 block mb-0.5">
                Reason:
              </span>
              <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                {recReason}
              </p>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-purple-200/70">
              Applying this recommendation will open a standby desk and reduce wait times by ~12 mins.
            </p>

            <button
              id="btn-activate-counter-overview"
              onClick={openAvailableCounter}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-black text-sm shadow-md shadow-purple-950 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4 text-white" />
              <span>ACTIVATE COUNTER</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
