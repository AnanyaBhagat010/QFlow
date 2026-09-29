import React from 'react';
import { Building2, Clock, Users, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { ServiceCenterId } from '../../types';

interface ServiceCenterSelectorProps {
  onCenterSelected?: () => void;
}

export const ServiceCenterSelector: React.FC<ServiceCenterSelectorProps> = ({ onCenterSelected }) => {
  const { serviceCenters, selectedCenterId, setSelectedCenterId } = useQueue();

  const handleSelect = (id: ServiceCenterId) => {
    setSelectedCenterId(id);
    if (onCenterSelected) {
      onCenterSelected();
    }
  };

  const getCrowdBadge = (crowd: string) => {
    switch (crowd) {
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Moderate':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'High':
      case 'Critical':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div>
          <h2 className="text-xl font-bold text-[#302820]">Select Service Center</h2>
          <p className="text-xs text-[#766A5F]">Pick a public service facility to view live counters and request a virtual token</p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FFF4D6] text-[#302820] border border-[#EFE5D8]">
          {serviceCenters.length} Locations Active
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {serviceCenters.map((center) => {
          const isSelected = center.id === selectedCenterId;
          return (
            <div
              key={center.id}
              onClick={() => handleSelect(center.id)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-[#FFF0E5]/60 border-[#FC6C26] shadow-md ring-2 ring-[#FC6C26]/20'
                  : 'bg-white border-[#EFE5D8] hover:border-[#FC6C26]/50 hover:shadow-xs'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                    isSelected ? 'bg-[#FC6C26] text-white' : 'bg-[#FFFBF0] text-[#766A5F] border border-[#EFE5D8]'
                  }`}>
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#302820] text-base flex items-center gap-2">
                      {center.name}
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-[#FC6C26]" />
                      )}
                    </h3>
                    <p className="text-xs text-[#766A5F] font-medium">{center.type}</p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${getCrowdBadge(center.crowdLevel)}`}>
                    {center.crowdLevel} Crowd
                  </span>
                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Open ({center.operatingHours.split('-')[1]?.trim() || 'Closes 6PM'})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-[#EFE5D8] text-xs">
                <div>
                  <span className="text-[#766A5F] block text-[11px]">Current Queue</span>
                  <strong className="text-[#302820] text-sm font-bold flex items-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-[#FC6C26]" />
                    {center.currentQueueLength} waiting
                  </strong>
                </div>

                <div>
                  <span className="text-[#766A5F] block text-[11px]">Active Counters</span>
                  <strong className="text-[#302820] text-sm font-bold block mt-0.5">
                    {center.availableCounters} / {center.totalCounters} open
                  </strong>
                </div>

                <div>
                  <span className="text-[#766A5F] block text-[11px]">Approx. Wait</span>
                  <strong className="text-[#302820] text-sm font-bold flex items-center gap-1 mt-0.5 text-amber-700">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    ~{center.approxWaitTimeMinutes} mins
                  </strong>
                </div>
              </div>

              {/* Service categories tags */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {center.services.map((svc) => (
                  <span key={svc.id} className="text-[10px] font-medium bg-[#FFFBF0] text-[#766A5F] border border-[#EFE5D8] px-2 py-0.5 rounded-md">
                    {svc.name}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs font-semibold">
                <span className={isSelected ? 'text-[#FC6C26] font-bold' : 'text-[#766A5F]'}>
                  {isSelected ? '✓ Selected for Token Generation' : 'Click to select center'}
                </span>
                <span className="flex items-center gap-1 text-[#FC6C26]">
                  Select <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
