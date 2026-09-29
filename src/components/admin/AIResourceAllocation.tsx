import React from 'react';
import { 
  Zap, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Cpu, 
  Clock, 
  Users, 
  TrendingDown,
  Sparkles,
  ShieldAlert,
  XCircle,
  RotateCcw
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export const AIResourceAllocation: React.FC = () => {
  const { 
    aiRecommendations, 
    applyRecommendation, 
    dismissRecommendation, 
    counters, 
    simulation, 
    predictedWaitMinutes 
  } = useQueue();

  const activeRecs = aiRecommendations.filter(r => !r.applied);
  const appliedRecs = aiRecommendations.filter(r => r.applied);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              Automated Resource Dispatch Engine
            </span>
            <span className="text-[10px] font-semibold bg-[#FFD6A5] text-[#252033] px-2 py-0.5 rounded-full border border-[#E9E3F0]">
              High Impact Priority Feature
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#252033] mt-1">AI Counter Resource Allocation</h2>
          <p className="text-xs text-[#706A7E]">
            Evaluating queue influx, desk utilization, and IoT occupancy to recommend preventive staff allocation before bottlenecks become critical.
          </p>
        </div>

        {/* Live Recommendation Section (Section 13) */}
        {activeRecs.length > 0 ? (
          <div className="space-y-4">
            {activeRecs.map((rec) => (
              <div
                key={rec.id}
                className="bg-gradient-to-r from-[#1E1926] via-[#2A1D3B] to-[#171221] text-white rounded-3xl p-6 sm:p-8 border border-[#6A00F4]/30 shadow-lg space-y-6"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-[#6A00F4]/30 text-[#FFD6A5] flex items-center justify-center font-bold text-lg border border-[#6A00F4]/40">
                      ⚡
                    </div>
                    <div>
                      <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFD6A5] block">
                        Actionable AI Recommendation #{rec.id}
                      </span>
                      <h3 className="text-xl font-extrabold text-white mt-0.5">{rec.title}</h3>
                    </div>
                  </div>

                  <span className="text-xs font-mono font-bold bg-[#FFD6A5]/20 text-[#FFD6A5] border border-[#FFD6A5]/30 px-3 py-1 rounded-full">
                    Priority: High Congestion
                  </span>
                </div>

                {/* Analytical Breakdown Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-purple-200/80 block uppercase font-medium">Service Target</span>
                    <strong className="text-base font-bold text-white mt-1 block">{rec.serviceName}</strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-purple-200/80 block uppercase font-medium">Active Counters</span>
                    <strong className="text-base font-bold text-white mt-1 block">{counters.filter(c => c.status === 'Serving').length} of {counters.length}</strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-purple-200/80 block uppercase font-medium">Current Backlog</span>
                    <strong className="text-base font-bold text-[#FFD6A5] mt-1 block">{simulation.queueLength} waiting</strong>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10">
                    <span className="text-[10px] text-purple-200/80 block uppercase font-medium">Est. Wait Relief</span>
                    <strong className="text-base font-bold text-emerald-300 mt-1 block">-{rec.estimatedWaitReductionMinutes} mins</strong>
                  </div>
                </div>

                {/* Diagnostic Reason & Expected Effect */}
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs text-purple-100 leading-relaxed">
                    <strong className="text-white block text-sm mb-1">Observation & Root Cause:</strong>
                    "{rec.reason}"
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-[#6A00F4]/40 text-xs text-purple-100 leading-relaxed">
                    <strong className="text-white block text-sm mb-1">Recommended Action & Expected Effect:</strong>
                    "Activate <strong>{rec.recommendedAction}</strong>. {rec.expectedEffect}"
                  </div>
                </div>

                {/* Dual Buttons (Activate Counter / Ignore Recommendation) */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    id="btn-rec-activate-counter"
                    onClick={() => applyRecommendation(rec.id)}
                    className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-extrabold text-sm shadow-lg shadow-purple-950 transition-all flex items-center justify-center gap-2 cursor-pointer group"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#FFD6A5]" />
                    <span>Activate Counter Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    id="btn-rec-ignore"
                    onClick={() => dismissRecommendation(rec.id)}
                    className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#FAF8FC] hover:text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Ignore Recommendation</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-200 text-center space-y-2">
            <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto font-bold">
              ✓
            </div>
            <h4 className="font-bold text-[#252033] text-base">Resource Distribution Optimal</h4>
            <p className="text-xs text-[#706A7E] max-w-md mx-auto">
              All active counters are processing visitors within normal thresholds. Standby desks are available if inflow rate spikes above 25/min.
            </p>
          </div>
        )}

        {/* History of Applied Recommendations */}
        {appliedRecs.length > 0 && (
          <div className="pt-6 border-t border-[#E9E3F0] space-y-3">
            <h4 className="font-bold text-[#252033] text-xs uppercase tracking-wider">
              Recently Implemented AI Recommendations
            </h4>

            {appliedRecs.map((rec) => (
              <div
                key={rec.id}
                className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <span className="font-bold text-[#252033]">{rec.recommendedAction}</span>
                    <p className="text-[#706A7E] mt-0.5">{rec.expectedEffect}</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                  Applied & Active
                </span>
              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
};
