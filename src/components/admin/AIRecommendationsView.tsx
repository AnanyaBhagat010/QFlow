import React, { useState } from 'react';
import { 
  Zap, 
  Clock, 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Cpu, 
  ArrowRight,
  Sparkles,
  RotateCcw
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export const AIRecommendationsView: React.FC = () => {
  const { 
    simulation, 
    predictedWaitMinutes, 
    predictedFootfallNext30m, 
    counters, 
    openAvailableCounter, 
    aiRecommendations, 
    alerts, 
    resolveAlert 
  } = useQueue();

  const [activatedSuccess, setActivatedSuccess] = useState(false);

  const activeCounters = counters.filter(c => c.status === 'Serving');
  const counter4Active = counters.find(c => c.id === 4)?.status === 'Serving';
  const pendingRec = aiRecommendations.find(r => !r.applied);
  const activeAlerts = alerts.filter(a => !a.resolved);

  const handleActivate = () => {
    openAvailableCounter();
    setActivatedSuccess(true);
    setTimeout(() => setActivatedSuccess(false), 5000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9E3F0] shadow-2xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
            Predictive Decision Engine
          </span>
          <span className="text-[10px] font-bold bg-[#FFD6A5] text-[#252033] px-2.5 py-0.5 rounded-full border border-[#E9E3F0]">
            Real-Time AI
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#252033] mt-1">AI Queue Prediction & Recommendations</h2>
        <p className="text-xs text-[#706A7E]">
          Intelligent queue forecasting that detects congestion spikes early and recommends counter allocation.
        </p>
      </div>

      {/* Success Banner if just activated */}
      {activatedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-600 text-white shadow-md flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="text-sm font-bold">Counter 4 Activated Successfully!</p>
              <p className="text-xs text-emerald-100">
                Staff desk opened. Inflow balanced. Waiting time is now dropping to ~12 minutes.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white text-emerald-800 px-3 py-1 rounded-lg">
            Active Now
          </span>
        </div>
      )}

      {/* Main AI Demonstration Card (Section 7) */}
      <div className="bg-white rounded-3xl border border-[#E9E3F0] shadow-sm overflow-hidden">
        
        {/* Card Header */}
        <div className="bg-gradient-to-r from-[#1E1926] via-[#2A1D3B] to-[#171221] text-white p-6 sm:p-7 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#6A00F4]/30 text-[#FFD6A5] flex items-center justify-center shrink-0 border border-[#6A00F4]/40">
              <Zap className="w-6 h-6 text-[#FFD6A5]" />
            </div>
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#FFD6A5] block">
                Primary AI Demonstration
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">
                Sense &rarr; Predict &rarr; Recommend &rarr; Act
              </h3>
            </div>
          </div>
        </div>

        {/* The 5 Key Pillars from Section 7 */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* 1. Current Situation */}
            <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#706A7E] uppercase tracking-wider mb-2">
                <Users className="w-4 h-4 text-[#6A00F4]" />
                <span>Current Situation</span>
              </div>
              <div className="text-2xl font-extrabold text-[#252033]">
                "{simulation.queueLength} people are waiting."
              </div>
              <p className="text-xs text-[#706A7E] mt-1">
                Active counters: {activeCounters.length}/{counters.length} currently serving citizens.
              </p>
            </div>

            {/* 2. Prediction */}
            <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#706A7E] uppercase tracking-wider mb-2">
                <Clock className="w-4 h-4 text-[#6A00F4]" />
                <span>Prediction</span>
              </div>
              <div className="text-2xl font-extrabold text-[#6A00F4]">
                "Estimated waiting time: {predictedWaitMinutes} minutes."
              </div>
              <p className="text-xs text-[#706A7E] mt-1">
                Calculated by queue service velocity and desk turnaround rates.
              </p>
            </div>

            {/* 3. Forecast */}
            <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
              <div className="flex items-center gap-2 text-xs font-bold text-[#706A7E] uppercase tracking-wider mb-2">
                <TrendingUp className="w-4 h-4 text-[#4D00B5]" />
                <span>Forecast</span>
              </div>
              <div className="text-xl font-bold text-[#252033]">
                "Footfall is expected to increase in the next 30 minutes."
              </div>
              <p className="text-xs text-[#706A7E] mt-1">
                Projected influx: ~{predictedFootfallNext30m} new visitors entering based on historical peak patterns.
              </p>
            </div>

            {/* 4. Recommendation & Reason */}
            <div className="p-5 rounded-2xl bg-[#F1E8FF] border border-[#6A00F4]/30">
              <div className="flex items-center gap-2 text-xs font-bold text-[#4D00B5] uppercase tracking-wider mb-2">
                <Sparkles className="w-4 h-4 text-[#6A00F4]" />
                <span>Recommendation & Reason</span>
              </div>
              <div className="text-xl font-bold text-[#252033]">
                "Open Counter 4."
              </div>
              <p className="text-xs text-[#706A7E] mt-1 leading-relaxed">
                Reason: "Registration queue is increasing and existing counters are highly occupied."
              </p>
            </div>

          </div>

          {/* Action Callout Button (Section 7) */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div>
              <span className="text-xs font-bold text-[#706A7E] uppercase tracking-wider block">
                Administrator Action
              </span>
              <p className="text-sm font-bold text-[#252033] mt-0.5">
                {counter4Active 
                  ? 'Counter 4 is currently OPEN and actively processing tokens.' 
                  : 'Click below to execute the AI recommendation and open standby Counter 4.'}
              </p>
            </div>

            <button
              id="btn-activate-counter-ai-page"
              onClick={handleActivate}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition-all flex items-center justify-center gap-2.5 cursor-pointer ${
                counter4Active 
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white' 
                  : 'bg-[#6A00F4] hover:bg-[#4D00B5] text-white shadow-purple-200 hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              <Zap className="w-4 h-4 text-white" />
              <span>{counter4Active ? 'COUNTER 4 ACTIVE (RE-TRIGGER)' : 'ACTIVATE COUNTER'}</span>
            </button>
          </div>

        </div>

      </div>

      {/* Congestion Alerts Section */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E9E3F0]">
          <div>
            <h3 className="font-bold text-[#252033] text-base">Congestion Alerts</h3>
            <p className="text-xs text-[#706A7E]">Automated warning threshold triggers</p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFD6A5] text-[#252033] border border-[#E9E3F0]">
            {activeAlerts.length} Active Alerts
          </span>
        </div>

        {activeAlerts.length === 0 ? (
          <div className="p-6 text-center text-[#706A7E] text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            No active congestion alerts. Queue flow is currently stable.
          </div>
        ) : (
          <div className="space-y-3">
            {activeAlerts.map(alert => (
              <div 
                key={alert.id}
                className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#252033]">{alert.severity} Alert: {alert.location}</span>
                      <span className="text-[10px] font-mono text-[#706A7E]">{alert.time}</span>
                    </div>
                    <p className="text-xs text-[#706A7E] mt-0.5">{alert.message}</p>
                    <p className="text-[11px] text-amber-800 font-medium mt-0.5">Cause: {alert.cause}</p>
                  </div>
                </div>

                <button
                  onClick={() => resolveAlert(alert.id)}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#F1E8FF] text-[#252033] font-bold text-xs border border-[#E9E3F0] transition-colors cursor-pointer shrink-0"
                >
                  Mark Resolved
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
