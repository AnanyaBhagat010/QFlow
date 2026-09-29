import React from 'react';
import { 
  Zap, 
  CheckCircle2, 
  TrendingUp, 
  Cpu, 
  ArrowRight, 
  Sliders, 
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export const CounterOptimization: React.FC = () => {
  const { counters, aiRecommendations, applyRecommendation, simulation } = useQueue();

  const activeRec = aiRecommendations.find(r => !r.applied);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              Load Balancing & Workload Leveling
            </span>
            <span className="text-[10px] font-semibold bg-[#F1E8FF] text-[#6A00F4] px-2 py-0.5 rounded-full border border-[#E9E3F0]">
              Heuristic Optimization
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#252033] mt-1">Counter Workload Optimization</h2>
          <p className="text-xs text-[#706A7E]">
            Real-time utilization tracking to prevent counter burnout and eliminate bottlenecks across service disciplines.
          </p>
        </div>

        {/* Counter Utilization Table (Section 16 Table Requirement) */}
        <div className="overflow-x-auto rounded-2xl border border-[#E9E3F0]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8FC] text-[#252033] uppercase tracking-wider font-extrabold text-[11px] border-b border-[#E9E3F0]">
              <tr>
                <th className="py-3 px-4">Counter</th>
                <th className="py-3 px-4">Assigned Service</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4">Workload / Utilization</th>
                <th className="py-3 px-4 text-right">IoT Presence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E9E3F0] bg-white">
              {counters.map((c) => {
                const isOverloaded = c.utilizationRate >= 85;
                const isUnderutilized = c.utilizationRate <= 25;

                return (
                  <tr key={c.id} className="hover:bg-[#F1E8FF]/30 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#252033] text-sm">
                      {c.name}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#252033]">
                      {c.assignedServiceName}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md ${
                        c.status === 'Serving' ? 'bg-emerald-100 text-emerald-800' :
                        c.status === 'High Load' ? 'bg-rose-100 text-rose-800' :
                        c.status === 'Idle' ? 'bg-amber-100 text-amber-800' :
                        'bg-stone-100 text-[#706A7E]'
                      }`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-sm text-[#252033] w-10">
                          {c.utilizationRate}%
                        </span>
                        <div className="w-32 h-2 rounded-full bg-[#FAF8FC] border border-[#E9E3F0] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isOverloaded ? 'bg-rose-500' : isUnderutilized ? 'bg-amber-400' : 'bg-[#6A00F4]'
                            }`}
                            style={{ width: `${c.utilizationRate}%` }}
                          />
                        </div>
                        {isOverloaded && (
                          <span className="text-[10px] font-bold text-rose-600">High Load</span>
                        )}
                        {isUnderutilized && (
                          <span className="text-[10px] font-bold text-amber-600">Underutilized</span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className={`text-xs font-semibold ${c.isOccupiedByIoT ? 'text-emerald-600' : 'text-[#706A7E]'}`}>
                        {c.isOccupiedByIoT ? '● Occupied' : '○ Standby'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* AI Load Rebalancing Recommendation Card */}
        {activeRec ? (
          <div className="bg-gradient-to-r from-[#1E1926] via-[#2A1D3B] to-[#171221] text-white rounded-2xl p-6 shadow-md border border-[#6A00F4]/30 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#FFD6A5]/20 text-[#FFD6A5] flex items-center justify-center font-bold text-xs">
                ⚡
              </span>
              <span className="text-xs uppercase font-extrabold tracking-wider text-[#FFD6A5]">
                AI Optimization Recommendation
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">
                "Registration demand is high (34 waiting) while Counter 3 is underutilized (12%)."
              </h3>
              <p className="text-xs text-purple-200 leading-relaxed">
                Recommendation: <strong>Temporarily activate and assign Counter 3 to Registration</strong>.
                Expected effect: Accelerate throughput and reduce queue wait by ~12 minutes.
              </p>
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => applyRecommendation(activeRec.id)}
                className="px-5 py-2.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Apply AI Rebalance Now
              </button>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              All counters are optimally balanced. Current throughput rate is keeping pace with passenger/citizen arrival.
            </span>
          </div>
        )}

      </div>

    </div>
  );
};
