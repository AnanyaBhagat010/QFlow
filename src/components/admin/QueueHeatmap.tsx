import React, { useState } from 'react';
import { 
  Layers, 
  Users, 
  MapPin, 
  Radio, 
  Info,
  Maximize2,
  Activity
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { HeatmapZone } from '../../types';

export const QueueHeatmap: React.FC = () => {
  const { heatmapZones, simulation } = useQueue();
  const [selectedZone, setSelectedZone] = useState<HeatmapZone | null>(heatmapZones[1]);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              Spatial Density Modeling
            </span>
            <span className="text-[10px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
              LiDAR + Optical Mesh
            </span>
          </div>
          <h2 className="text-2xl font-bold text-[#252033] mt-1">Service Facility Crowd Heatmap</h2>
          <p className="text-xs text-[#706A7E]">
            Interactive floor plan mapping crowd distribution across Entrance, Waiting Lounge, Counter Bays, and Exits.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 p-3 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] text-xs">
          <span className="font-bold text-[#252033]">Density Legend:</span>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[#706A7E]">Green: Low (&lt;40%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[#706A7E]">Yellow: Moderate (40-65%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-orange-600" />
            <span className="text-[#706A7E]">Orange: High (65-80%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-600" />
            <span className="text-[#706A7E]">Red: Critical (&gt;80%)</span>
          </div>
        </div>

        {/* Visual Architectural Map Representation */}
        <div className="p-6 rounded-3xl bg-slate-900 text-white relative overflow-hidden shadow-inner border border-slate-800">
          
          <div className="absolute top-4 right-4 flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>GRID SCAN: 100ms REFRESH</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 my-6">
            
            {/* Zone 1: Entrance (col-span-3) */}
            <div
              onClick={() => setSelectedZone(heatmapZones[0])}
              className={`md:col-span-3 rounded-2xl p-5 border cursor-pointer transition-all ${
                selectedZone?.id === 'zone-ent' ? 'ring-2 ring-white scale-102' : 'hover:scale-101'
              } ${
                heatmapZones[0].densityLevel === 'Critical' ? 'bg-rose-950/70 border-rose-600 text-rose-100' :
                heatmapZones[0].densityLevel === 'High' ? 'bg-orange-950/70 border-orange-600 text-orange-100' :
                'bg-amber-950/70 border-amber-600 text-amber-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wide">Entrance & Gates</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40">Zone 1</span>
              </div>

              <div className="my-4 text-center">
                <span className="text-3xl font-extrabold font-mono block">
                  {heatmapZones[0].occupancyPercentage}%
                </span>
                <span className="text-xs opacity-80">{heatmapZones[0].peopleCount} / {heatmapZones[0].capacity} pax</span>
              </div>

              <div className="text-[11px] font-semibold text-center py-1 rounded bg-black/30">
                Density: {heatmapZones[0].densityLevel}
              </div>
            </div>

            {/* Zone 2: Main Waiting Area (col-span-5) */}
            <div
              onClick={() => setSelectedZone(heatmapZones[1])}
              className={`md:col-span-5 rounded-2xl p-5 border cursor-pointer transition-all ${
                selectedZone?.id === 'zone-wai' ? 'ring-2 ring-white scale-102' : 'hover:scale-101'
              } ${
                heatmapZones[1].densityLevel === 'Critical' ? 'bg-rose-950/80 border-rose-500 text-rose-100' :
                heatmapZones[1].densityLevel === 'High' ? 'bg-orange-950/80 border-orange-500 text-orange-100' :
                'bg-amber-950/80 border-amber-500 text-amber-100'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold uppercase tracking-wide">Main Waiting Lounge</span>
                <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/40">Zone 2 (PIR Mesh)</span>
              </div>

              <div className="my-4 text-center">
                <span className="text-4xl font-extrabold font-mono block text-amber-300">
                  {heatmapZones[1].occupancyPercentage}%
                </span>
                <span className="text-xs opacity-80">{heatmapZones[1].peopleCount} seated of {heatmapZones[1].capacity} seats</span>
              </div>

              <div className="text-[11px] font-semibold text-center py-1 rounded bg-black/30">
                Crowd Density: {heatmapZones[1].densityLevel}
              </div>
            </div>

            {/* Zone 3 & 4: Queue Stanchions & Counter Bays (col-span-4) */}
            <div className="md:col-span-4 flex flex-col gap-4">
              
              {/* Queue Line Stanchion */}
              <div
                onClick={() => setSelectedZone(heatmapZones[2])}
                className={`rounded-2xl p-4 border cursor-pointer transition-all ${
                  selectedZone?.id === 'zone-que' ? 'ring-2 ring-white' : ''
                } ${
                  heatmapZones[2].densityLevel === 'Critical' ? 'bg-rose-950/80 border-rose-500 text-rose-100' :
                  'bg-orange-950/80 border-orange-500 text-orange-100'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">Queue Stanchion Bay</span>
                  <span className="font-mono text-[10px]">{heatmapZones[2].peopleCount} waiting</span>
                </div>
                <div className="text-sm font-bold font-mono mt-1">
                  Occupancy: {heatmapZones[2].occupancyPercentage}% ({heatmapZones[2].densityLevel})
                </div>
              </div>

              {/* Counter Bays */}
              <div
                onClick={() => setSelectedZone(heatmapZones[3])}
                className={`rounded-2xl p-4 border cursor-pointer transition-all ${
                  selectedZone?.id === 'zone-ctr' ? 'ring-2 ring-white' : ''
                } bg-amber-950/60 border-amber-600 text-amber-100`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold">Counter Desks 1-4</span>
                  <span className="font-mono text-[10px]">3/4 Active</span>
                </div>
                <div className="text-sm font-bold font-mono mt-1">
                  Desk Capacity: {heatmapZones[3].occupancyPercentage}% ({heatmapZones[3].densityLevel})
                </div>
              </div>

            </div>

          </div>

          {/* Bottom Area: Exit Concourse */}
          <div
            onClick={() => setSelectedZone(heatmapZones[4])}
            className={`rounded-2xl p-3 border cursor-pointer transition-all text-center ${
              selectedZone?.id === 'zone-ext' ? 'ring-2 ring-white' : ''
            } bg-emerald-950/60 border-emerald-600 text-emerald-100`}
          >
            <div className="flex items-center justify-between text-xs px-2">
              <span className="font-bold">South Exit & Outflow Turnstiles</span>
              <span className="text-[11px]">Normal Thermal Outflow: {simulation.outflowRate} pax/min ({heatmapZones[4].densityLevel} Density)</span>
            </div>
          </div>

        </div>

        {/* Selected Zone Inspector */}
        {selectedZone && (
          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div>
              <span className="text-[#706A7E] font-semibold block uppercase text-[10px]">Inspecting Spatial Zone:</span>
              <strong className="text-base text-[#252033] font-bold">{selectedZone.name}</strong>
              <p className="text-[#706A7E] mt-0.5">
                Current count: {selectedZone.peopleCount} individuals • Capacity: {selectedZone.capacity} • Utilization: {selectedZone.occupancyPercentage}%
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 rounded-xl font-bold bg-white text-[#252033] border border-[#E9E3F0] shadow-2xs">
                Density: {selectedZone.densityLevel}
              </span>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
