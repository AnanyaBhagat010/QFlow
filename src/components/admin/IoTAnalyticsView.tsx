import React from 'react';
import { 
  Radio, 
  Activity, 
  Users, 
  Cpu, 
  TrendingUp, 
  Clock, 
  Sliders
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { SimpleLineChart, SimpleBarChart } from '../common/SimpleCharts';

interface IoTAnalyticsViewProps {
  openDemoPanel?: () => void;
}

export const IoTAnalyticsView: React.FC<IoTAnalyticsViewProps> = () => {
  const { counters, simulation, predictedWaitMinutes } = useQueue();

  const activeCounters = counters.filter(c => c.status === 'Serving');
  const freeCounters = counters.length - activeCounters.length;

  // 4 Simplified Analytics Charts (Section 6)
  // 1. Queue Trend (Queue length over time)
  const queueTrend = [
    { label: '10:00 AM', value: 14 },
    { label: '10:30 AM', value: 22 },
    { label: '11:00 AM', value: 31 },
    { label: '11:30 AM', value: 38 },
    { label: '12:00 PM', value: 29 },
    { label: '12:30 PM', value: 26 },
    { label: '01:00 PM', value: 30 },
    { label: 'Now', value: simulation.queueLength },
  ];

  // 2. Footfall Trend (Number of people arriving over time)
  const footfallTrend = [
    { label: '10:00 AM', value: 18 },
    { label: '10:30 AM', value: 32 },
    { label: '11:00 AM', value: 45 },
    { label: '11:30 AM', value: 48 },
    { label: '12:00 PM', value: 24 },
    { label: '12:30 PM', value: 22 },
    { label: '01:00 PM', value: 35 },
    { label: 'Now', value: simulation.inflowRate },
  ];

  // 3. Waiting Time (Average waiting time)
  const waitTimeTrend = [
    { label: '10:00 AM', value: 12 },
    { label: '10:30 AM', value: 16 },
    { label: '11:00 AM', value: 22 },
    { label: '11:30 AM', value: 28 },
    { label: '12:00 PM', value: 20 },
    { label: '12:30 PM', value: 18 },
    { label: '01:00 PM', value: 21 },
    { label: 'Now', value: predictedWaitMinutes },
  ];

  // 4. Counter Usage (Simple comparison of active counters)
  const counterUsage = [
    { label: 'Counter 1', value: 92 },
    { label: 'Counter 2', value: 88 },
    { label: 'Counter 3', value: 76 },
    { label: 'Counter 4', value: counters.find(c => c.id === 4)?.status === 'Serving' ? 84 : 15 },
  ];

  return (
    <div className="space-y-8">
      
      {/* SIMULATED IoT DATA Header Banner (Section 5) */}
      <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              IoT Telemetry & Analytics
            </span>
            <span className="text-xs font-bold bg-[#FFD6A5] text-[#252033] border border-[#E9E3F0] px-2.5 py-0.5 rounded-full">
              SIMULATED IoT DATA
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#252033] mt-1">Physical Sensor Telemetry</h2>
          <p className="text-xs text-[#706A7E]">
            Real-time feed from entrance turnstiles, lounge crowd sensors, and desk chair detectors.
          </p>
        </div>
      </div>

      {/* 4 Main Simulated IoT Devices (Section 5) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#252033] text-base">4 Main IoT Devices</h3>
          <span className="text-xs text-[#706A7E] font-medium">Auto-refreshing every 3.5s</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Device 1: Entrance Sensor (People entering) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9E3F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#706A7E]">Entrance Sensor</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#706A7E]">People entering</p>
              <div className="text-2xl font-extrabold text-[#252033] mt-2">
                {simulation.inflowRate} <span className="text-xs font-normal text-[#706A7E]">people/min</span>
              </div>
              <div className="text-[11px] text-[#706A7E] mt-1">
                Total Today: <strong>{simulation.footfall}</strong>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E9E3F0] text-[10px] text-[#706A7E]">
              Last update: Just now • 3s ago
            </div>
          </div>

          {/* Device 2: Exit Sensor (People leaving) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9E3F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#706A7E]">Exit Sensor</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#706A7E]">People leaving</p>
              <div className="text-2xl font-extrabold text-[#252033] mt-2">
                {simulation.outflowRate} <span className="text-xs font-normal text-[#706A7E]">people/min</span>
              </div>
              <div className="text-[11px] text-[#706A7E] mt-1">
                Turnaround: <strong>~{simulation.avgServiceMinutes}m avg</strong>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E9E3F0] text-[10px] text-[#706A7E]">
              Last update: Just now • 4s ago
            </div>
          </div>

          {/* Device 3: Waiting Area Sensor (Crowd level) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9E3F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#706A7E]">Waiting Area Sensor</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                  simulation.waitingOccupancy > 75 
                    ? 'bg-amber-50 text-amber-700 border-amber-200' 
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {simulation.waitingOccupancy > 75 ? 'Warning' : 'Online'}
                </span>
              </div>
              <p className="text-xs text-[#706A7E]">Crowd level</p>
              <div className="text-2xl font-extrabold text-[#252033] mt-2">
                {simulation.waitingOccupancy}% <span className="text-xs font-normal text-[#706A7E]">capacity</span>
              </div>
              <div className="text-[11px] text-[#706A7E] mt-1">
                Status: <strong>{simulation.waitingOccupancy > 75 ? 'High Crowd' : 'Normal'}</strong>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E9E3F0] text-[10px] text-[#706A7E]">
              Last update: Just now • 2s ago
            </div>
          </div>

          {/* Device 4: Counter Sensor (Counter occupied/free) */}
          <div className="bg-white rounded-2xl p-5 border border-[#E9E3F0] shadow-2xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-[#706A7E]">Counter Sensor</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Online
                </span>
              </div>
              <p className="text-xs text-[#706A7E]">Counter occupied/free</p>
              <div className="text-2xl font-extrabold text-[#6A00F4] mt-2">
                {activeCounters.length} <span className="text-xs font-normal text-[#706A7E]">occupied / {freeCounters} free</span>
              </div>
              <div className="text-[11px] text-[#706A7E] mt-1">
                Chair sensors active: <strong>{counters.length} desks</strong>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E9E3F0] text-[10px] text-[#706A7E]">
              Last update: Just now • 1s ago
            </div>
          </div>

        </div>
      </div>

      {/* 4 Simplified Analytics Charts (Section 6) */}
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-[#252033] text-base">Key Analytics</h3>
          <p className="text-xs text-[#706A7E]">Simple, scannable performance and queue flow indicators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Chart 1: Queue Trend */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9E3F0]">
              <h4 className="font-bold text-[#252033] text-sm">Queue Trend</h4>
              <span className="text-xs text-[#706A7E]">Queue length over time</span>
            </div>
            <div className="pt-2">
              <SimpleLineChart
                data={queueTrend}
                color="#6A00F4"
                unit="waiting"
                height={200}
              />
            </div>
          </div>

          {/* Chart 2: Footfall Trend */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9E3F0]">
              <h4 className="font-bold text-[#252033] text-sm">Footfall Trend</h4>
              <span className="text-xs text-[#706A7E]">People arriving over time</span>
            </div>
            <div className="pt-2">
              <SimpleBarChart
                data={footfallTrend}
                color="#4D00B5"
                unit="arrivals"
                height={200}
              />
            </div>
          </div>

          {/* Chart 3: Waiting Time */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9E3F0]">
              <h4 className="font-bold text-[#252033] text-sm">Waiting Time</h4>
              <span className="text-xs text-[#706A7E]">Average waiting time (minutes)</span>
            </div>
            <div className="pt-2">
              <SimpleLineChart
                data={waitTimeTrend}
                color="#6A00F4"
                unit="min"
                height={200}
              />
            </div>
          </div>

          {/* Chart 4: Counter Usage */}
          <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#E9E3F0]">
              <h4 className="font-bold text-[#252033] text-sm">Counter Usage</h4>
              <span className="text-xs text-[#706A7E]">Active counter load (%)</span>
            </div>
            <div className="pt-2">
              <SimpleBarChart
                data={counterUsage}
                color="#059669"
                unit="%"
                height={200}
                maxValOverride={100}
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
