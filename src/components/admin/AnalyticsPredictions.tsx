import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  Users, 
  Cpu, 
  Calendar, 
  Sparkles, 
  AlertTriangle,
  Info,
  ShieldCheck,
  ArrowUpRight
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { HOURLY_ANALYTICS, SEVEN_DAYS_ANALYTICS, THIRTY_DAYS_ANALYTICS } from '../../data/mockData';

export const AnalyticsPredictions: React.FC = () => {
  const { 
    simulation, 
    predictedWaitMinutes, 
    predictedFootfallNext30m, 
    predictionConfidence, 
    counters 
  } = useQueue();

  const [activeTimeframe, setActiveTimeframe] = useState<'today' | '7days' | '30days'>('today');

  const currentDataset = 
    activeTimeframe === 'today' ? HOURLY_ANALYTICS :
    activeTimeframe === '7days' ? SEVEN_DAYS_ANALYTICS : THIRTY_DAYS_ANALYTICS;

  const maxFootfall = Math.max(...currentDataset.map(d => d.footfall));
  const maxQueue = Math.max(...currentDataset.map(d => d.queueLength));

  return (
    <div className="space-y-6">
      
      {/* Header with Timeframe Filter Tabs */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-2xs space-y-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E9E3F0] gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
                Telemetry Analytics Engine
              </span>
              <span className="text-[10px] font-semibold bg-[#F1E8FF] text-[#6A00F4] px-2 py-0.5 rounded-full border border-[#E9E3F0]">
                Queuing Theory M/M/c
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#252033] mt-1">Footfall & AI Predictions</h2>
            <p className="text-xs text-[#706A7E]">
              Correlating real-time IoT LiDAR streams with historical arrival rates to forecast waiting times and desk congestion.
            </p>
          </div>

          {/* Timeframe Filter (Today, 7 days, 30 days) */}
          <div className="flex items-center bg-[#FAF8FC] p-1 rounded-xl border border-[#E9E3F0]">
            <button
              onClick={() => setActiveTimeframe('today')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTimeframe === 'today' ? 'bg-[#6A00F4] text-white shadow-xs' : 'text-[#706A7E] hover:text-[#252033]'
              }`}
            >
              Today (Hourly)
            </button>
            <button
              onClick={() => setActiveTimeframe('7days')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTimeframe === '7days' ? 'bg-[#6A00F4] text-white shadow-xs' : 'text-[#706A7E] hover:text-[#252033]'
              }`}
            >
              Last 7 Days
            </button>
            <button
              onClick={() => setActiveTimeframe('30days')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTimeframe === '30days' ? 'bg-[#6A00F4] text-white shadow-xs' : 'text-[#706A7E] hover:text-[#252033]'
              }`}
            >
              Last 30 Days
            </button>
          </div>
        </div>

        {/* Section 11 & 12: Dual AI Prediction Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Section 11: AI Waiting-Time Prediction Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E1926] via-[#2A1D3B] to-[#171221] text-white shadow-md border border-[#6A00F4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FFD6A5]" />
                <h3 className="font-bold text-sm tracking-wide uppercase text-purple-200">
                  AI Waiting-Time Prediction
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Confidence: {predictionConfidence}%
              </span>
            </div>

            <div>
              <span className="text-xs text-purple-200/80 block">Predicted Waiting Time</span>
              <div className="text-4xl font-extrabold text-[#FFD6A5] mt-0.5 tracking-tight">
                {predictedWaitMinutes} minutes
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs text-xs text-purple-100 leading-relaxed border border-white/10">
              "Waiting time is estimated from current queue length ({simulation.queueLength}), active counters ({counters.filter(c => c.status === 'Serving').length}), and recent service speed ({simulation.avgServiceMinutes}m/person)."
            </div>

            <div className="grid grid-cols-3 gap-2 text-[11px] text-purple-200/80 pt-1">
              <div>
                <span>Arrival:</span> <strong className="text-white">{simulation.inflowRate}/min</strong>
              </div>
              <div>
                <span>Service rate:</span> <strong className="text-white">{simulation.outflowRate}/min</strong>
              </div>
              <div>
                <span>Status:</span> <strong className="text-[#FFD6A5]">Congested</strong>
              </div>
            </div>
            
            <p className="text-[10px] text-purple-300/60 italic">
              * Simulated queuing theory calculation for hackathon prototype.
            </p>
          </div>

          {/* Section 12: Footfall Prediction Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#1E1926] via-[#2A1D3B] to-[#171221] text-white shadow-md border border-[#6A00F4]/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#FFD6A5]" />
                <h3 className="font-bold text-sm tracking-wide uppercase text-purple-200">
                  Footfall Forecast (Next 30m)
                </h3>
              </div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                Risk: Moderate Congestion
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-xs text-purple-200/70 block">Current Footfall</span>
                <div className="text-3xl font-extrabold text-white mt-0.5">
                  {simulation.footfall} pax
                </div>
              </div>

              <div>
                <span className="text-xs text-[#FFD6A5] block">Predicted in 30 Mins</span>
                <div className="text-3xl font-extrabold text-[#FFD6A5] mt-0.5">
                  {predictedFootfallNext30m} pax
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 backdrop-blur-xs text-xs text-purple-100 leading-relaxed border border-white/10">
              "Footfall trend is <strong>Increasing</strong> based on entrance turnstile velocity. Outflow is currently lagging inflow by +{simulation.inflowRate - simulation.outflowRate} people/minute."
            </div>

            <div className="flex items-center justify-between text-xs text-purple-200 pt-1">
              <span>Forecast horizon: 30 minutes</span>
              <span className="text-[#FFD6A5] font-bold">Trend: Ascending</span>
            </div>

            <p className="text-[10px] text-purple-300/60 italic">
              * Prototype demand prediction based on time-series decay.
            </p>
          </div>

        </div>

        {/* Section 10: Charts & Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
          
          {/* Chart 1: Footfall & Inflow Over Time */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#252033] text-sm">Footfall Volume Over Time</h4>
                <p className="text-[11px] text-[#706A7E]">Hourly / Periodic visitor throughput counts</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#6A00F4]">Max: {maxFootfall}</span>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="h-48 flex items-end gap-2 pt-6 pb-2 px-2 border-b border-[#E9E3F0]">
              {currentDataset.map((point) => {
                const heightPercent = Math.max(12, Math.round((point.footfall / maxFootfall) * 100));
                return (
                  <div key={point.time} className="flex-1 flex flex-col items-center gap-1 group relative">
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#252033] text-white text-[10px] font-mono py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                      {point.footfall} pax
                    </div>
                    
                    <div
                      className="w-full bg-[#6A00F4] rounded-t-md hover:bg-[#4D00B5] transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[10px] font-semibold text-[#706A7E] truncate w-full text-center">
                      {point.time.replace(':00', '').replace(' ', '')}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex items-center justify-between text-[11px] text-[#706A7E]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#6A00F4]" />
                Footfall Count (LiDAR Entrance Gate)
              </span>
              <span>Total Volume: {currentDataset.reduce((a, b) => a + b.footfall, 0)}</span>
            </div>
          </div>

          {/* Chart 2: Queue Depth & Waiting Time Over Time */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-[#252033] text-sm">Queue Length & Waiting Delay</h4>
                <p className="text-[11px] text-[#706A7E]">Dynamic backlog in persons and average wait in minutes</p>
              </div>
              <span className="text-xs font-mono font-bold text-amber-700">Peak: {maxQueue} in line</span>
            </div>

            {/* Custom SVG Line/Bar Chart */}
            <div className="h-48 flex items-end gap-2 pt-6 pb-2 px-2 border-b border-[#E9E3F0]">
              {currentDataset.map((point) => {
                const heightPercent = Math.max(15, Math.round((point.queueLength / maxQueue) * 100));
                return (
                  <div key={point.time} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-[#252033] text-white text-[10px] font-mono py-0.5 px-1.5 rounded pointer-events-none whitespace-nowrap z-10">
                      {point.queueLength} waiting (~{point.avgWaitMinutes}m)
                    </div>
                    
                    <div
                      className="w-full bg-[#FFD6A5] rounded-t-md hover:bg-[#ffc685] transition-all"
                      style={{ height: `${heightPercent}%` }}
                    />
                    <span className="text-[10px] font-semibold text-[#706A7E] truncate w-full text-center">
                      {point.time.replace(':00', '').replace(' ', '')}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#706A7E]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#FFD6A5]" />
                Active Queue Stanchion Length
              </span>
              <span>Avg Delay: ~{Math.round(currentDataset.reduce((a, b) => a + b.avgWaitMinutes, 0) / currentDataset.length)} mins</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
