import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ShieldAlert, 
  Check, 
  Info,
  Radio
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export const CongestionAlerts: React.FC = () => {
  const { alerts, resolveAlert } = useQueue();

  const getSeverityStyle = (sev: string) => {
    switch (sev) {
      case 'Critical':
        return {
          bg: 'bg-rose-50 border-rose-200 text-rose-800',
          badge: 'bg-rose-100 text-rose-800 border-rose-300',
          dot: 'bg-rose-600',
        };
      case 'Warning':
        return {
          bg: 'bg-amber-50 border-amber-200 text-amber-800',
          badge: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-600',
        };
      case 'Moderate':
        return {
          bg: 'bg-orange-50 border-orange-200 text-orange-800',
          badge: 'bg-orange-100 text-orange-800 border-orange-300',
          dot: 'bg-orange-600',
        };
      case 'Normal':
      default:
        return {
          bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
          badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-600',
        };
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Anomaly Detection System
              </span>
              <span className="text-[10px] font-semibold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                Rule-Based + Threshold Triggers
              </span>
            </div>
            <h2 className="text-2xl font-bold text-[#252033] mt-1">Congestion & Capacity Alerts</h2>
            <p className="text-xs text-[#706A7E]">
              Automated alerts triggered when physical sensors detect rapid crowd spikes or bottleneck thresholds.
            </p>
          </div>

          <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-[#FAF8FC] text-[#252033] border border-[#E9E3F0]">
            {alerts.filter(a => !a.resolved).length} Active Alerts
          </span>
        </div>

        {/* Alerts List */}
        <div className="space-y-3 pt-2">
          {alerts.map((alert) => {
            const style = getSeverityStyle(alert.severity);

            return (
              <div
                key={alert.id}
                className={`p-5 rounded-2xl border transition-all ${
                  alert.resolved
                    ? 'bg-[#FAF8FC]/70 border-[#E9E3F0] opacity-60'
                    : `${style.bg} shadow-2xs`
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-current/10 gap-2">
                  <div className="flex items-center gap-2.5">
                    <span className={`w-2.5 h-2.5 rounded-full ${style.dot} ${!alert.resolved ? 'animate-ping' : ''}`} />
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${style.badge}`}>
                      {alert.severity}
                    </span>
                    <h3 className="font-extrabold text-sm text-[#252033]">{alert.message}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-[#706A7E] font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {alert.location}
                    </span>
                    <span className="font-mono text-[11px]">{alert.time}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 my-3 text-xs text-[#252033]">
                  <div className="p-3 rounded-xl bg-white/70 border border-current/10">
                    <strong className="block text-[11px] font-bold text-[#706A7E] mb-0.5 uppercase tracking-wider">
                      Detected Cause
                    </strong>
                    <span>{alert.cause}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/70 border border-current/10">
                    <strong className="block text-[11px] font-bold text-[#706A7E] mb-0.5 uppercase tracking-wider">
                      Recommended Remediation
                    </strong>
                    <span>{alert.recommendedAction}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#706A7E]">Alert ID: {alert.id}</span>
                  
                  {!alert.resolved ? (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-[#252033] hover:bg-[#F1E8FF] border border-[#E9E3F0] font-bold text-xs transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Acknowledge / Resolve</span>
                    </button>
                  ) : (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Resolved by Admin
                    </span>
                  )}
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
