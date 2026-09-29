import React from 'react';
import { 
  Cpu, 
  Radio, 
  Battery, 
  Wifi, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Sliders,
  Sparkles,
  Info
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

interface IoTMonitoringProps {
  openDemoPanel: () => void;
}

export const IoTMonitoring: React.FC<IoTMonitoringProps> = ({ openDemoPanel }) => {
  const { iotDevices, simulation } = useQueue();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ONLINE':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'WARNING':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'OFFLINE':
      default:
        return 'bg-rose-50 text-rose-700 border-rose-200';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Simulation Disclaimer Banner */}
      <div className="bg-[#F1E8FF]/70 border border-[#E9E3F0] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#6A00F4] text-white flex items-center justify-center shrink-0">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-wider">
                Edge Hardware Simulation Layer
              </span>
              <span className="text-[10px] font-bold bg-[#FFD6A5] text-[#252033] px-2 py-0.5 rounded-full">
                Prototype Telemetry
              </span>
            </div>
            <p className="text-xs text-[#252033] mt-0.5 leading-relaxed">
              These sensors emulate physical LiDAR turnstiles, ultrasonic stanchions, and chair pressure pads transmitting MQTT/WebSocket packets to Q-FLOW.
            </p>
          </div>
        </div>

        <button
          onClick={openDemoPanel}
          className="shrink-0 text-xs font-bold px-3.5 py-2 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Adjust Sensor Inflow/Load</span>
        </button>
      </div>

      {/* Grid of 6 Main Section 9 Devices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {iotDevices.map((device) => {
          const isWarning = device.status === 'WARNING';
          const isOnline = device.status === 'ONLINE';

          return (
            <div
              key={device.id}
              className={`rounded-2xl p-5 border transition-all ${
                isWarning
                  ? 'bg-amber-50/30 border-amber-300 shadow-xs'
                  : 'bg-white border-[#E9E3F0] shadow-2xs hover:border-[#6A00F4]/40'
              }`}
            >
              {/* Device Header */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-[#E9E3F0]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#6A00F4]">{device.id}</span>
                    <span className="text-[10px] font-semibold text-[#706A7E]">• {device.location}</span>
                  </div>
                  <h3 className="font-extrabold text-[#252033] text-sm mt-0.5">{device.name}</h3>
                </div>

                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md border ${getStatusBadge(device.status)}`}>
                  {device.status}
                </span>
              </div>

              {/* Current Live Sensor Reading Display */}
              <div className="my-4 p-3.5 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0] text-center">
                <span className="text-[10px] font-semibold text-[#706A7E] uppercase tracking-wider block">
                  Current Telemetry Reading
                </span>
                <div className="text-xl sm:text-2xl font-extrabold text-[#252033] mt-1 font-mono">
                  {device.currentReading}
                </div>
              </div>

              {/* Hardware Health Metrics (Battery, Signal, Ping) */}
              <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-[#E9E3F0]">
                <div className="flex items-center gap-1.5 text-[#706A7E]">
                  <Battery className="w-3.5 h-3.5 text-[#706A7E]" />
                  <span className="font-medium text-[#252033]">{device.batteryPercentage}%</span>
                </div>

                <div className="flex items-center gap-1.5 text-[#706A7E]">
                  <Wifi className="w-3.5 h-3.5 text-[#706A7E]" />
                  <span className="font-medium text-[#252033]">{device.signalStrength}% RSSI</span>
                </div>

                <div className="text-right text-[11px] text-[#706A7E] truncate">
                  {device.lastUpdate.replace('Just now', '1s')}
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between text-[10px] text-[#706A7E] pt-2 border-t border-[#E9E3F0]/60">
                <span>Protocol: MQTT v5.0</span>
                <span className="text-emerald-600 font-semibold">Simulated Stream OK</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
