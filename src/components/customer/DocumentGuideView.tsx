import React, { useState, useMemo } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  HelpCircle, 
  Copy, 
  Clock, 
  DollarSign, 
  Building2, 
  ArrowRight, 
  Filter, 
  Printer, 
  CheckSquare, 
  Square,
  ShieldCheck,
  FileCheck
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { ServiceCenterId, ServiceCategory, DocumentRequirement } from '../../types';

interface DocumentGuideViewProps {
  onSelectServiceForToken?: (centerId: ServiceCenterId, serviceId: string) => void;
}

export const DocumentGuideView: React.FC<DocumentGuideViewProps> = ({ onSelectServiceForToken }) => {
  const { serviceCenters, setSelectedCenterId } = useQueue();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>(null);
  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({});

  // Flatten all services with their parent center
  const allServicesWithCenter = useMemo(() => {
    return serviceCenters.flatMap(center => 
      center.services.map(svc => ({
        ...svc,
        centerId: center.id,
        centerName: center.name,
        centerType: center.type,
      }))
    );
  }, [serviceCenters]);

  // Filtered services
  const filteredServices = useMemo(() => {
    return allServicesWithCenter.filter(item => {
      // Category filter
      if (selectedCategoryFilter === 'banking' && item.centerId !== 'bank') return false;
      if (selectedCategoryFilter === 'aadhaar' && item.centerId !== 'aadhaar') return false;
      if (selectedCategoryFilter === 'rto' && item.centerId !== 'rto') return false;
      if (selectedCategoryFilter === 'municipal' && item.centerId !== 'municipal') return false;
      if (selectedCategoryFilter === 'hospital' && item.centerId !== 'hospital') return false;
      if (selectedCategoryFilter === 'railway' && item.centerId !== 'railway') return false;

      // Search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      const inName = item.name.toLowerCase().includes(q);
      const inDesc = item.description.toLowerCase().includes(q);
      const inDept = item.department?.toLowerCase().includes(q) || false;
      const inCenter = item.centerName.toLowerCase().includes(q);
      const inDocs = item.requiredDocuments?.some(d => 
        d.name.toLowerCase().includes(q) || 
        d.notes?.toLowerCase().includes(q) ||
        d.acceptedExamples?.some(ex => ex.toLowerCase().includes(q))
      ) || false;

      return inName || inDesc || inDept || inCenter || inDocs;
    });
  }, [allServicesWithCenter, selectedCategoryFilter, searchQuery]);

  const toggleCheckDoc = (docId: string) => {
    setCheckedDocs(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };

  const handleApplyForToken = (centerId: ServiceCenterId, serviceId: string) => {
    setSelectedCenterId(centerId);
    if (onSelectServiceForToken) {
      onSelectServiceForToken(centerId, serviceId);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#6A00F4] via-[#5C00D2] to-[#4D00B5] rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs border border-white/25">
            <FileCheck className="w-3.5 h-3.5" />
            <span>Official Citizen Document Directory</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Document Requirements & Eligibility Guide
          </h2>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
            Avoid wasted trips and counter rejection. Review exact government and institutional document requirements, photocopy guidelines, official fees, and processing timelines before generating your digital token.
          </p>
        </div>

        {/* Search bar inside header */}
        <div className="mt-6 relative max-w-xl z-10">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#706A7E]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by document (e.g., Driving License, Banking KYC, Aadhaar, Caste, RC, PM-JAY)..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white text-[#252033] placeholder-[#706A7E] text-sm font-medium shadow-lg focus:outline-hidden focus:ring-3 focus:ring-purple-200"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-[#706A7E] hover:text-[#252033]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'all', label: 'All Services & Documents' },
          { id: 'rto', label: '🚗 RTO & Driving License' },
          { id: 'aadhaar', label: '🆔 Aadhaar & Identity' },
          { id: 'banking', label: '🏦 Banking KYC & Accounts' },
          { id: 'municipal', label: '🏛️ Municipal & Civil Records' },
          { id: 'hospital', label: '🏥 Hospital & Health Schemes' },
          { id: 'railway', label: '🚆 Railway & Concessions' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedCategoryFilter(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategoryFilter === tab.id
                ? 'bg-[#6A00F4] text-white shadow-xs'
                : 'bg-white text-[#706A7E] border border-[#E9E3F0] hover:bg-[#F1E8FF] hover:text-[#252033]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Results Count & Quick Notice */}
      <div className="flex items-center justify-between text-xs text-[#706A7E] px-1">
        <span>
          Showing <strong>{filteredServices.length}</strong> official document & service pathways
        </span>
        <span className="hidden sm:flex items-center gap-1 text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Against Central & State Portals
        </span>
      </div>

      {/* Document Service Cards Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredServices.map((svc) => {
          const isExpanded = expandedServiceId === svc.id;
          const mandatoryCount = svc.requiredDocuments?.filter(d => d.isMandatory).length || 0;
          const optionalCount = (svc.requiredDocuments?.length || 0) - mandatoryCount;

          return (
            <div
              key={`${svc.centerId}-${svc.id}`}
              className={`bg-white rounded-3xl border transition-all overflow-hidden ${
                isExpanded 
                  ? 'border-[#6A00F4] shadow-md ring-1 ring-[#6A00F4]/20' 
                  : 'border-[#E9E3F0] hover:border-[#6A00F4]/50 hover:shadow-xs'
              }`}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F1E8FF] text-[#6A00F4] border border-[#E9E3F0]">
                        {svc.centerName}
                      </span>
                      {svc.department && (
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#FAF8FC] text-[#706A7E] border border-[#E9E3F0]">
                          {svc.department}
                        </span>
                      )}
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#FFD6A5] text-[#252033]">
                        Code: {svc.codePrefix}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-[#252033] tracking-tight">
                      {svc.name}
                    </h3>
                    <p className="text-xs text-[#706A7E] leading-relaxed max-w-3xl">
                      {svc.description}
                    </p>
                  </div>

                  {/* Quick Meta Badges */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 self-start lg:self-center">
                    {svc.officialFee && (
                      <div className="px-3 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0] text-left min-w-[120px]">
                        <span className="text-[10px] text-[#706A7E] uppercase font-semibold block">Official Fee</span>
                        <span className="text-xs font-bold text-[#252033]">{svc.officialFee}</span>
                      </div>
                    )}

                    {svc.processingTime && (
                      <div className="px-3 py-2 rounded-xl bg-[#FAF8FC] border border-[#E9E3F0] text-left min-w-[120px]">
                        <span className="text-[10px] text-[#706A7E] uppercase font-semibold block">Turnaround</span>
                        <span className="text-xs font-bold text-[#252033]">{svc.processingTime}</span>
                      </div>
                    )}

                    <button
                      onClick={() => handleApplyForToken(svc.centerId, svc.id)}
                      className="px-4 py-2.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                    >
                      <span>Take Token</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Important Instructions if any */}
                {svc.instructions && svc.instructions.length > 0 && (
                  <div className="mt-4 p-3 rounded-2xl bg-amber-50/70 border border-amber-100 text-xs text-amber-900">
                    <div className="font-bold flex items-center gap-1.5 text-amber-800 mb-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Special Instructions & Prerequisites:</span>
                    </div>
                    <ul className="list-disc list-inside space-y-0.5 text-[#252033] text-[11px]">
                      {svc.instructions.map((inst, i) => (
                        <li key={i}>{inst}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expand / Collapse Action */}
                <div className="mt-4 pt-4 border-t border-[#E9E3F0] flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#252033]">
                      Required Documents: <strong className="text-[#6A00F4]">{svc.requiredDocuments?.length || 0}</strong>
                    </span>
                    <span className="text-[11px] text-[#706A7E]">
                      ({mandatoryCount} Mandatory, {optionalCount} Optional)
                    </span>
                  </div>

                  <button
                    onClick={() => setExpandedServiceId(isExpanded ? null : svc.id)}
                    className="text-xs font-bold text-[#6A00F4] hover:text-[#4D00B5] cursor-pointer flex items-center gap-1"
                  >
                    {isExpanded ? 'Hide Documents Checklist ▲' : 'View Full Document Requirements ▼'}
                  </button>
                </div>
              </div>

              {/* Expanded Detailed Checklist */}
              {isExpanded && (
                <div className="bg-[#FAF8FC]/70 p-6 border-t border-[#E9E3F0] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-[#252033] flex items-center gap-2">
                        <FileCheck className="w-4 h-4 text-[#6A00F4]" />
                        <span>Documents You Must Carry to the Counter</span>
                      </h4>
                      <p className="text-[11px] text-[#706A7E]">
                        Tick the items you have ready in your folder to check your verification readiness
                      </p>
                    </div>

                    <span className="text-[11px] font-semibold text-[#706A7E] bg-white px-2.5 py-1 rounded-lg border border-[#E9E3F0]">
                      Self-Audit Checklist
                    </span>
                  </div>

                  <div className="space-y-3">
                    {svc.requiredDocuments?.map((doc: DocumentRequirement) => {
                      const isChecked = !!checkedDocs[doc.id];
                      return (
                        <div
                          key={doc.id}
                          onClick={() => toggleCheckDoc(doc.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                            isChecked
                              ? 'bg-emerald-50/70 border-emerald-300 shadow-2xs'
                              : 'bg-white border-[#E9E3F0] hover:border-[#6A00F4]/50'
                          }`}
                        >
                          <button
                            type="button"
                            className="mt-0.5 text-[#706A7E] focus:outline-hidden"
                          >
                            {isChecked ? (
                              <CheckSquare className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <Square className="w-5 h-5 text-[#E9E3F0]" />
                            )}
                          </button>

                          <div className="flex-1 space-y-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <span className={`text-sm font-bold ${isChecked ? 'text-emerald-950 line-through' : 'text-[#252033]'}`}>
                                {doc.name}
                              </span>

                              <div className="flex items-center gap-1.5">
                                {doc.isMandatory ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                                    Mandatory
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#FFD6A5] text-[#252033] border border-[#E9E3F0]">
                                    Optional / If Applicable
                                  </span>
                                )}

                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-[#F1E8FF] text-[#6A00F4] border border-[#E9E3F0]">
                                  {doc.category}
                                </span>
                              </div>
                            </div>

                            <p className="text-xs text-[#706A7E]">
                              {doc.notes}
                            </p>

                            <div className="flex flex-wrap items-center gap-4 pt-1 text-[11px] text-[#706A7E]">
                              <span>
                                Photocopies: <strong className="text-[#252033]">{doc.photocopyCount === 0 ? 'Original Only' : `Original + ${doc.photocopyCount} Copy(ies)`}</strong>
                              </span>

                              {doc.acceptedExamples && doc.acceptedExamples.length > 0 && (
                                <span>
                                  Accepted: <span className="text-[#252033] font-medium">{doc.acceptedExamples.join(', ')}</span>
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Readiness Summary Footer */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#E9E3F0]">
                    <div className="text-xs text-[#706A7E]">
                      <span>Pro-tip: Keep all documents in original along with self-attested photocopies. Digital DigiLocker copies are accepted at counter QR terminals.</span>
                    </div>

                    <button
                      onClick={() => handleApplyForToken(svc.centerId, svc.id)}
                      className="px-5 py-2.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Proceed to Virtual Token</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {filteredServices.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center space-y-3 border border-[#E9E3F0]">
            <FileText className="w-10 h-10 text-[#706A7E]/40 mx-auto" />
            <h4 className="text-lg font-bold text-[#252033]">No matching document services found</h4>
            <p className="text-xs text-[#706A7E] max-w-sm mx-auto">
              Try searching for "Aadhaar", "Driving License", "Banking KYC", "Birth Certificate", or clear your filter.
            </p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategoryFilter('all'); }}
              className="px-4 py-2 rounded-xl bg-[#6A00F4] text-white text-xs font-bold shadow-xs hover:bg-[#4D00B5]"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
