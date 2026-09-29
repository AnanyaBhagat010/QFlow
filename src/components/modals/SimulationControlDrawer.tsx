import React from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Zap, 
  Sliders, 
  Users, 
  Activity, 
  CheckCircle2,
  TrendingUp,
  Clock,
  Cpu
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

interface SimulationControlDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SimulationControlDrawer: React.FC<SimulationControlDrawerProps> = ({ isOpen, onClose }) => {
  const { 
    isSimulating, 
    toggleSimulation, 
    increaseFootfall,
    increaseQueue,
    openAvailableCounter,
    resetSimulation, 
    simulation, 
    counters,
    predictedWaitMinutes
  } = useQueue();

  if (!isOpen) return null;

  const activeCounters = counters.filter(c => c.status === 'Serving');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
      
      {/* Drawer Container */}
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col overflow-y-auto border-l border-[#E9E3F0]">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E9E3F0] flex items-center justify-between bg-[#252033] text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#6A00F4]/30 text-[#FFD6A5] flex items-center justify-center">
              <Sliders className="w-5 h-5 text-[#FFD6A5]" />
            </div>
            <div>
              <h2 className="font-extrabold text-base">Demo Presentation Mode</h2>
              <p className="text-xs text-purple-200/80">Quick 1-Click Controls for Presentation</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 flex-1 text-[#252033] bg-[#FAF8FC]">
          
          {/* Live System State Readout */}
          <div className="p-4 rounded-2xl bg-white border border-[#E9E3F0] space-y-3 shadow-2xs">
            <span className="text-xs font-bold text-[#706A7E] uppercase tracking-wider block">
              Current Live Status
            </span>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2.5 bg-[#FAF8FC] rounded-xl border border-[#E9E3F0]">
                <span className="text-[11px] text-[#706A7E] block">People Waiting</span>
                <span className="text-2xl font-black text-[#252033]">{simulation.queueLength}</span>
              </div>
              <div className="p-2.5 bg-[#FAF8FC] rounded-xl border border-[#E9E3F0]">
                <span className="text-[11px] text-[#706A7E] block">Estimated Wait</span>
                <span className="text-2xl font-black text-[#6A00F4]">~{predictedWaitMinutes}m</span>
              </div>
              <div className="p-2.5 bg-[#FAF8FC] rounded-xl border border-[#E9E3F0]">
                <span className="text-[11px] text-[#706A7E] block">Active Counters</span>
                <span className="text-2xl font-black text-[#6A00F4]">{activeCounters.length}/{counters.length}</span>
              </div>
              <div className="p-2.5 bg-[#FAF8FC] rounded-xl border border-[#E9E3F0]">
                <span className="text-[11px] text-[#706A7E] block">Crowd Level</span>
                <span className="text-2xl font-black text-[#252033]">{simulation.waitingOccupancy}%</span>
              </div>
            </div>
          </div>

          {/* Core Demo Controls */}
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-[#706A7E] uppercase tracking-wider block">
              Essential Presentation Controls
            </span>

            {/* Control 1: Increase Footfall */}
            <button
              id="demo-btn-increase-footfall"
              onClick={increaseFootfall}
              className="w-full p-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-left transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold shrink-0">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252033] text-sm">Increase Footfall</h4>
                  <p className="text-xs text-[#706A7E]">Spikes arrival rate, increases queue & wait, triggers AI</p>
                </div>
              </div>
              <span className="text-xs font-bold text-amber-700 bg-amber-200/60 px-2.5 py-1 rounded-lg shrink-0">
                +Footfall
              </span>
            </button>

            {/* Control 2: Increase Queue */}
            <button
              id="demo-btn-increase-queue"
              onClick={increaseQueue}
              className="w-full p-4 rounded-2xl bg-[#F1E8FF] hover:bg-[#e7d8ff] border border-[#6A00F4]/30 text-left transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#6A00F4] text-white flex items-center justify-center font-bold shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252033] text-sm">Increase Queue</h4>
                  <p className="text-xs text-[#706A7E]">Adds waiting people to virtual queue directly</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#252033] bg-[#FFD6A5] px-2.5 py-1 rounded-lg shrink-0 border border-[#E9E3F0]">
                +Queue
              </span>
            </button>

            {/* Control 3: Open Counter */}
            <button
              id="demo-btn-open-counter"
              onClick={openAvailableCounter}
              className="w-full p-4 rounded-2xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-left transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-2xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-[#252033] text-sm">Open Counter</h4>
                  <p className="text-xs text-[#706A7E]">Activates standby desk, decreases queue & wait times</p>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-200/60 px-2.5 py-1 rounded-lg shrink-0">
                Open Desk
              </span>
            </button>

            {/* Control 4: Start / Stop Simulation */}
            <button
              id="demo-btn-toggle-simulation"
              onClick={toggleSimulation}
              className={`w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer shadow-2xs ${
                isSimulating
                  ? 'bg-[#FFD6A5]/30 hover:bg-[#FFD6A5]/50 border-amber-300'
                  : 'bg-white hover:bg-stone-50 border-[#E9E3F0]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl text-white flex items-center justify-center font-bold shrink-0 ${
                  isSimulating ? 'bg-[#6A00F4]' : 'bg-[#706A7E]'
                }`}>
                  {isSimulating ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-[#252033] text-sm">
                    {isSimulating ? 'Stop Simulation' : 'Start Simulation'}
                  </h4>
                  <p className="text-xs text-[#706A7E]">
                    {isSimulating ? 'Continuous auto-tick running every 3.5s' : 'Start automated background stream'}
                  </p>
                </div>
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-lg shrink-0 ${
                isSimulating ? 'bg-[#6A00F4] text-white' : 'bg-[#E9E3F0] text-[#252033]'
              }`}>
                {isSimulating ? 'Active' : 'Paused'}
              </span>
            </button>
          </div>

          {/* Reset Baseline */}
          <div className="pt-2">
            <button
              id="demo-btn-reset"
              onClick={resetSimulation}
              className="w-full py-3 px-4 rounded-xl bg-white hover:bg-[#F1E8FF] text-[#252033] font-bold text-xs flex items-center justify-center gap-2 border border-[#E9E3F0] hover:border-[#6A00F4] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-[#706A7E]" />
              <span>Reset to Default Baseline (34 Waiting, 3 Active Counters)</span>
            </button>
          </div>

          {/* Demonstration Cycle Explanation */}
          <div className="p-4 rounded-2xl bg-[#252033] text-white space-y-2 text-xs">
            <span className="font-bold text-[#FFD6A5] block uppercase tracking-wider text-[11px]">
              Demo Script Flow:
            </span>
            <p className="text-purple-100/90 leading-relaxed">
              1. Click <strong>Increase Footfall</strong> &rarr; Watch waiting count and wait time surge.<br />
              2. Notice the <strong>Alert</strong> & <strong>AI Recommendation</strong> appear.<br />
              3. Click <strong>Open Counter</strong> &rarr; Watch active counters increase, queue shrink, and wait time drop.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
