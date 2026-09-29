import React, { useState, useEffect } from 'react';
import { 
  Ticket, 
  User, 
  Phone, 
  Clock, 
  Building2, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Smartphone,
  ShieldCheck,
  FileCheck,
  AlertCircle,
  CheckSquare,
  Square,
  DollarSign
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { Token, ServiceCenterId, DocumentRequirement } from '../../types';

interface TokenGeneratorProps {
  onTokenGenerated?: (token: Token) => void;
  initialServiceId?: string;
}

export const TokenGenerator: React.FC<TokenGeneratorProps> = ({ 
  onTokenGenerated,
  initialServiceId
}) => {
  const { currentCenter, serviceCenters, selectedCenterId, setSelectedCenterId, generateToken, simulation } = useQueue();

  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    initialServiceId || currentCenter.services[0]?.id || ''
  );
  const [customerName, setCustomerName] = useState<string>('Alex Mercer');
  const [customerPhone, setCustomerPhone] = useState<string>('+1 (555) 349-2810');
  const [preferredTime, setPreferredTime] = useState<string>('Immediate');
  const [readyDocIds, setReadyDocIds] = useState<string[]>([]);
  const [generatedToken, setGeneratedToken] = useState<Token | null>(null);

  // Sync selectedServiceId if center changes or initialServiceId changes
  useEffect(() => {
    if (initialServiceId && currentCenter.services.some(s => s.id === initialServiceId)) {
      setSelectedServiceId(initialServiceId);
    } else if (!currentCenter.services.some(s => s.id === selectedServiceId)) {
      setSelectedServiceId(currentCenter.services[0]?.id || '');
    }
  }, [currentCenter, initialServiceId]);

  // Reset ready docs when service changes
  useEffect(() => {
    const service = currentCenter.services.find(s => s.id === selectedServiceId);
    if (service?.requiredDocuments) {
      // Pre-check the first mandatory document to save time
      const firstMandatory = service.requiredDocuments.find(d => d.isMandatory);
      setReadyDocIds(firstMandatory ? [firstMandatory.id] : []);
    } else {
      setReadyDocIds([]);
    }
  }, [selectedServiceId, currentCenter]);

  const selectedService = currentCenter.services.find(s => s.id === selectedServiceId) || currentCenter.services[0];
  const requiredDocs: DocumentRequirement[] = selectedService?.requiredDocuments || [];
  const mandatoryDocs = requiredDocs.filter(d => d.isMandatory);
  const mandatoryReadyCount = mandatoryDocs.filter(d => readyDocIds.includes(d.id)).length;
  const isAllMandatoryReady = mandatoryDocs.length === 0 || mandatoryReadyCount === mandatoryDocs.length;

  const toggleDocReady = (docId: string) => {
    setReadyDocIds(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const handleQuickCenterChange = (centerId: ServiceCenterId) => {
    setSelectedCenterId(centerId);
    const targetCenter = serviceCenters.find(c => c.id === centerId);
    if (targetCenter && targetCenter.services.length > 0) {
      setSelectedServiceId(targetCenter.services[0].id);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedServiceId) return;

    const token = generateToken(
      selectedServiceId,
      customerName,
      customerPhone,
      preferredTime,
      readyDocIds
    );

    setGeneratedToken(token);
    if (onTokenGenerated) {
      onTokenGenerated(token);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      
      {/* Generated Token Success Ticket Banner */}
      {generatedToken && (
        <div className="bg-emerald-50 border-2 border-emerald-500 rounded-3xl p-6 sm:p-8 shadow-lg space-y-5 animate-in fade-in duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-200">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                ✓
              </span>
              <div>
                <h3 className="font-extrabold text-slate-900 text-lg">Virtual Queue Confirmed</h3>
                <p className="text-xs text-emerald-800">You are securely checked into the live queue</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-200 text-emerald-900">
              SMS Sent to {generatedToken.customerPhone}
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-emerald-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="text-xs font-bold text-[#706A7E] uppercase tracking-widest">Your Digital Token</span>
              <div className="text-5xl font-extrabold text-[#6A00F4] tracking-tight font-mono mt-1">
                {generatedToken.tokenNumber}
              </div>
              <p className="text-sm font-semibold text-[#252033] mt-1">
                {generatedToken.serviceName} • {currentCenter.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-[#E9E3F0] pt-4 sm:pt-0 sm:pl-6 w-full sm:w-auto">
              <div>
                <span className="text-[11px] text-[#706A7E] block font-medium">People Ahead</span>
                <strong className="text-xl font-extrabold text-[#252033]">{generatedToken.peopleAhead}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#706A7E] block font-medium">Est. Wait Time</span>
                <strong className="text-xl font-extrabold text-[#6A00F4]">~{generatedToken.estimatedWaitMinutes}m</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#706A7E] block font-medium">Assigned Counter</span>
                <strong className="text-sm font-bold text-[#252033]">{generatedToken.assignedCounterName}</strong>
              </div>
              <div>
                <span className="text-[11px] text-[#706A7E] block font-medium">Est. Service At</span>
                <strong className="text-sm font-bold text-[#252033]">{generatedToken.estimatedServiceTime}</strong>
              </div>
            </div>
          </div>

          {/* Document carry reminder on generated token */}
          {generatedToken.requiredDocuments && generatedToken.requiredDocuments.length > 0 && (
            <div className="bg-white/80 p-4 rounded-2xl border border-emerald-200 text-xs space-y-2">
              <div className="font-bold text-emerald-950 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-emerald-700" />
                  <span>Documents to Bring to {generatedToken.assignedCounterName}:</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-800">
                  {readyDocIds.length} of {generatedToken.requiredDocuments.length} checked ready
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {generatedToken.requiredDocuments.map(doc => (
                  <div key={doc.id} className="flex items-center gap-2 text-[11px] text-[#252033] bg-white p-2 rounded-lg border border-[#E9E3F0]">
                    <span className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${readyDocIds.includes(doc.id) ? 'bg-emerald-600 text-white font-bold' : 'border border-[#E9E3F0] text-transparent'}`}>
                      ✓
                    </span>
                    <span className="truncate flex-1 font-medium">{doc.name}</span>
                    {doc.isMandatory && (
                      <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1 rounded">REQ</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-emerald-200">
            <p className="text-xs text-[#706A7E] flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Token added to your booked tokens. Existing department tokens remain active.</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setGeneratedToken(null)}
                className="px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs transition-colors cursor-pointer"
              >
                + Book Another Department
              </button>
              {onTokenGenerated && (
                <button
                  type="button"
                  onClick={() => onTokenGenerated(generatedToken)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  View My Tokens →
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Generation Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-sm space-y-6">
        
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-[#6A00F4] uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Digital Token & Document Pre-Check</span>
          </div>
          <h2 className="text-2xl font-bold text-[#252033] mt-1">Virtual Token</h2>
          <p className="text-xs text-[#706A7E]">
            Select your department and required service, verify required proofs, and join the queue virtually.
          </p>
        </div>

        {/* Quick Service Center Domain Switcher */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-[#252033]">
            Select Center / Department
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {[
              { id: 'rto' as ServiceCenterId, label: 'RTO Office', icon: '🚗' },
              { id: 'aadhaar' as ServiceCenterId, label: 'Aadhaar Kendra', icon: '🆔' },
              { id: 'bank' as ServiceCenterId, label: 'Central Bank', icon: '🏦' },
              { id: 'municipal' as ServiceCenterId, label: 'Municipal Corp', icon: '🏛️' },
              { id: 'hospital' as ServiceCenterId, label: 'Apex Hospital', icon: '🏥' },
              { id: 'railway' as ServiceCenterId, label: 'Metro Railway', icon: '🚆' },
            ].map(tab => {
              const isSelected = selectedCenterId === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => handleQuickCenterChange(tab.id)}
                  className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all cursor-pointer min-h-[76px] ${
                    isSelected
                      ? 'bg-[#6A00F4] text-white border-[#6A00F4] shadow-xs ring-2 ring-[#6A00F4]/20'
                      : 'bg-[#FAF8FC] hover:bg-[#F1E8FF] text-[#252033] border-[#E9E3F0]'
                  }`}
                >
                  <div className="text-2xl leading-none mb-1.5">{tab.icon}</div>
                  <div className="font-bold text-xs truncate w-full text-center">{tab.label}</div>
                </button>
              );
            })}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Service / Document Type Selection */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-[#252033]">
              Select Document / Service Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {currentCenter.services.map((svc) => {
                const isSelected = svc.id === selectedServiceId;
                const docCount = svc.requiredDocuments?.length || 0;
                return (
                  <div
                    key={svc.id}
                    onClick={() => setSelectedServiceId(svc.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between min-h-[92px] ${
                      isSelected
                        ? 'bg-[#F1E8FF] border-[#6A00F4] ring-2 ring-[#6A00F4]/20 text-[#252033] shadow-2xs'
                        : 'bg-[#FAF8FC] border-[#E9E3F0] hover:border-[#6A00F4]/50 hover:bg-[#F1E8FF]/50 text-[#252033]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-bold text-sm text-[#252033] leading-snug">
                        {svc.name}
                      </span>
                      {isSelected && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#252033] bg-[#FFD6A5] px-2 py-0.5 rounded-full shrink-0 border border-[#E9E3F0]">
                          ✓ Selected
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#E9E3F0]">
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#6A00F4] font-medium">
                        <FileCheck className="w-3.5 h-3.5 text-[#6A00F4]" />
                        <span>{docCount} Documents Required</span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CRITICAL: Required Documents Checklist for Selected Service */}
          {selectedService && (
            <div className="bg-[#FAF8FC] rounded-2xl p-5 border border-[#E9E3F0] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E9E3F0]">
                <div>
                  <h4 className="text-sm font-bold text-[#252033] flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6A00F4]" />
                    <span>Documents Required for {selectedService.name}</span>
                  </h4>
                  <p className="text-[11px] text-[#706A7E]">
                    Tick the proofs you currently have with you to ensure swift counter verification
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${
                    isAllMandatoryReady 
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                      : 'bg-amber-50 text-amber-800 border-amber-200'
                  }`}>
                    {mandatoryReadyCount} of {mandatoryDocs.length} Mandatory Ready
                  </span>
                </div>
              </div>

              {/* Instructions if any */}
              {selectedService.instructions && selectedService.instructions.length > 0 && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-100 text-xs text-amber-900">
                  <div className="font-semibold flex items-center gap-1 text-amber-800 mb-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>Important Service Guidelines:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-0.5 text-[#252033] text-[11px]">
                    {selectedService.instructions.map((inst, i) => (
                      <li key={i}>{inst}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Documents Checklist Items */}
              <div className="space-y-2.5">
                {requiredDocs.length === 0 ? (
                  <p className="text-xs text-[#706A7E] py-2">No special documents required for this general enquiry.</p>
                ) : (
                  requiredDocs.map((doc) => {
                    const isChecked = readyDocIds.includes(doc.id);
                    return (
                      <div
                        key={doc.id}
                        onClick={() => toggleDocReady(doc.id)}
                        className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                          isChecked 
                            ? 'bg-emerald-50/60 border-emerald-300' 
                            : 'bg-white border-[#E9E3F0] hover:border-[#6A00F4]/50'
                        }`}
                      >
                        <button
                          type="button"
                          className="mt-0.5 text-[#706A7E] focus:outline-hidden"
                        >
                          {isChecked ? (
                            <CheckSquare className="w-4 h-4 text-emerald-600" />
                          ) : (
                            <Square className="w-4 h-4 text-[#E9E3F0]" />
                          )}
                        </button>

                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-1.5">
                            <span className={`text-xs font-bold ${isChecked ? 'text-emerald-950 font-semibold' : 'text-[#252033]'}`}>
                              {doc.name}
                            </span>
                            <div className="flex items-center gap-1.5">
                              {doc.isMandatory ? (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-rose-50 text-rose-700 border border-rose-200">
                                  Mandatory
                                </span>
                              ) : (
                                <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-[#FFD6A5] text-[#252033]">
                                  Optional
                                </span>
                              )}
                              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-[#F1E8FF] text-[#6A00F4] border border-[#E9E3F0]">
                                {doc.category}
                              </span>
                            </div>
                          </div>

                          <p className="text-[11px] text-[#706A7E] leading-snug">
                            {doc.notes}
                          </p>

                          <div className="pt-0.5 text-[10px] text-[#706A7E]">
                            <span>
                              Copies: <strong className="text-[#252033]">{doc.photocopyCount === 0 ? 'Original Only' : `Original + ${doc.photocopyCount} Photocopy`}</strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {!isAllMandatoryReady && (
                <div className="text-[11px] text-amber-800 bg-amber-50 p-2.5 rounded-xl border border-amber-200 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Note: You can still join the virtual queue now, but please ensure you arrange the remaining mandatory documents before reaching the counter desk.
                  </span>
                </div>
              )}
            </div>
          )}

          {/* User Details Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customer-name-input" className="block text-xs font-bold text-[#252033] mb-1 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#706A7E]" />
                Applicant Full Name
              </label>
              <input
                id="customer-name-input"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="e.g. Alex Mercer"
                className="w-full text-sm rounded-xl border border-[#E9E3F0] bg-[#FAF8FC] px-3.5 py-2.5 focus:ring-2 focus:ring-[#6A00F4] focus:border-[#6A00F4] focus:outline-hidden"
              />
            </div>

            <div>
              <label htmlFor="customer-phone-input" className="block text-xs font-bold text-[#252033] mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#706A7E]" />
                Mobile Number (for SMS & Document Checklist)
              </label>
              <input
                id="customer-phone-input"
                type="tel"
                required
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full text-sm rounded-xl border border-[#E9E3F0] bg-[#FAF8FC] px-3.5 py-2.5 focus:ring-2 focus:ring-[#6A00F4] focus:border-[#6A00F4] focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Preferred Time Window */}
          <div>
            <label className="block text-xs font-bold text-[#252033] mb-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#706A7E]" />
              Arrival Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['Immediate', 'Next 30 Minutes', 'Afternoon Slot'].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setPreferredTime(slot)}
                  className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-colors cursor-pointer ${
                    preferredTime === slot
                      ? 'bg-[#6A00F4] text-white border-[#6A00F4] font-bold'
                      : 'bg-[#FAF8FC] text-[#252033] border-[#E9E3F0] hover:bg-[#F1E8FF]'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Live Preview Calculation */}
          <div className="p-4 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0] flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="text-[#706A7E] font-medium">Estimated wait based on live IoT counter telemetry:</span>
              <div className="flex items-center gap-2">
                <strong className="text-[#252033] font-bold">~{Math.round((simulation.queueLength * (selectedService?.avgServiceMinutes || 6)) / 3)} mins</strong>
                <span className="text-[#706A7E]">•</span>
                <span className="text-[#706A7E] font-medium">{simulation.queueLength} people currently in line</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-emerald-600 font-semibold uppercase block">Live Telemetry</span>
              <span className="text-xs text-[#706A7E]">Auto-balanced</span>
            </div>
          </div>

          {/* Prominent Action Button */}
          <button
            id="btn-join-virtual-queue"
            type="submit"
            className="w-full py-3.5 px-6 rounded-2xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-base shadow-md shadow-purple-200 transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <Sparkles className="w-5 h-5 text-purple-200" />
            <span>Continue / Generate Token</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <p className="text-center text-[11px] text-[#706A7E]">
            No physical line required. You will receive an SMS confirmation with token number, wait time, and the list of documents to carry.
          </p>

        </form>
      </div>

    </div>
  );
};
