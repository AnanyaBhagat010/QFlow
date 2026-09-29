import React, { useState } from 'react';
import { 
  Ticket, 
  Clock, 
  Users, 
  RotateCw, 
  XCircle, 
  Smartphone, 
  CheckCircle2, 
  AlertCircle, 
  FileCheck, 
  CheckSquare, 
  Square, 
  Volume2,
  Building2,
  PlusCircle,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';
import { DEPARTMENT_NAMES } from '../../data/departmentData';

interface MyTokenViewProps {
  onViewQueue: () => void;
  onOpenPhoneModal: () => void;
  onIssueNewToken: () => void;
}

export const MyTokenView: React.FC<MyTokenViewProps> = ({
  onViewQueue,
  onOpenPhoneModal,
  onIssueNewToken,
}) => {
  const { 
    userTokens,
    userToken, 
    selectedUserTokenId,
    setSelectedUserTokenId,
    cancelTokenById,
    refreshTokenById,
    toggleUserTokenDocument,
    departmentCounters,
    serviceCenters 
  } = useQueue();

  const [refreshedToast, setRefreshedToast] = useState(false);

  // If user has no tokens at all
  if (userTokens.length === 0 || !userToken) {
    return (
      <div className="max-w-md mx-auto bg-white rounded-3xl p-8 border border-[#E9E3F0] text-center space-y-4 shadow-2xs">
        <div className="w-14 h-14 rounded-2xl bg-[#F1E8FF] text-[#6A00F4] flex items-center justify-center mx-auto">
          <Ticket className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-bold text-[#252033]">No Active Digital Token</h3>
        <p className="text-xs text-[#706A7E] max-w-sm mx-auto">
          You do not have an active queue token. Join a department queue now to generate your digital token.
        </p>
        <button
          onClick={onIssueNewToken}
          className="px-6 py-2.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-sm shadow-md shadow-purple-100 transition-colors cursor-pointer"
        >
          Join Queue Now
        </button>
      </div>
    );
  }

  // Active token details
  const activeToken = userToken;
  const targetDeptCounters = departmentCounters[activeToken.centerId] || [];
  const currentlyServingCounter = targetDeptCounters.find(c => c.status === 'Serving' && c.currentTokenNumber);
  const currentServingNumber = currentlyServingCounter?.currentTokenNumber || '—';

  const deptName = activeToken.centerName || DEPARTMENT_NAMES[activeToken.centerId] || 'Department';

  // Status mapping
  const getStatusText = (token = activeToken) => {
    if (token.status === 'SERVING') return 'Now Serving';
    if (token.status === 'APPROACHING') return 'Turn Approaching';
    if (token.status === 'CANCELLED') return 'Cancelled';
    if (token.status === 'COMPLETED') return 'Completed';
    return 'Waiting';
  };

  const getCounterText = () => {
    if (activeToken.status === 'SERVING') return activeToken.assignedCounterName || 'Counter 1';
    if (activeToken.status === 'APPROACHING') return `${activeToken.assignedCounterName || 'Counter 1'} (Standby)`;
    return 'Not assigned yet';
  };

  // Progress computation
  const progressPercent = activeToken.status === 'SERVING'
    ? 100
    : activeToken.status === 'CANCELLED'
    ? 0
    : Math.min(95, Math.max(15, 100 - activeToken.peopleAhead * 15));

  const handleRefresh = () => {
    refreshTokenById(activeToken.id);
    setRefreshedToast(true);
    setTimeout(() => setRefreshedToast(false), 2500);
  };

  const handleCancelThisToken = () => {
    cancelTokenById(activeToken.id);
  };

  const requiredDocs = activeToken.requiredDocuments || [];
  const readyDocIds = activeToken.readyDocumentIds || [];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      {/* Toast Feedback */}
      {refreshedToast && (
        <div className="bg-[#252033] text-white px-4 py-2.5 rounded-xl shadow-lg flex items-center justify-between text-xs font-semibold animate-fade-in">
          <div className="flex items-center gap-2">
            <RotateCw className="w-3.5 h-3.5 text-[#6A00F4] animate-spin" />
            <span>Token status refreshed for {deptName}!</span>
          </div>
        </div>
      )}

      {/* MULTIPLE TOKENS SELECTOR BAR (If user has 2+ tokens or wants to switch) */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E9E3F0] shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#6A00F4] animate-pulse" />
            <h3 className="text-xs font-extrabold text-[#252033] uppercase tracking-wider">
              Your Booked Tokens ({userTokens.length})
            </h3>
          </div>
          <button
            onClick={onIssueNewToken}
            className="text-xs font-bold text-[#6A00F4] hover:text-[#4D00B5] flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F1E8FF] hover:bg-[#FFD6A5] transition-colors cursor-pointer border border-[#E9E3F0]"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>+ Book Another Department</span>
          </button>
        </div>

        {/* Tokens List / Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1">
          {userTokens.map((t) => {
            const isSelected = t.id === activeToken.id;
            const shortDept = DEPARTMENT_NAMES[t.centerId]?.split('(')[0]?.trim() || t.centerName || t.centerId;
            const isServing = t.status === 'SERVING';
            const isCancelled = t.status === 'CANCELLED';

            return (
              <button
                key={t.id}
                onClick={() => setSelectedUserTokenId(t.id)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer relative flex flex-col justify-between ${
                  isSelected 
                    ? 'bg-[#6A00F4] text-white border-[#6A00F4] shadow-md ring-2 ring-[#6A00F4]/20' 
                    : 'bg-[#FAF8FC] hover:bg-[#F1E8FF] border-[#E9E3F0] text-[#252033]'
                }`}
              >
                <div className="flex items-center justify-between gap-1 w-full">
                  <span className={`text-[11px] font-extrabold uppercase tracking-wide truncate ${
                    isSelected ? 'text-purple-100' : 'text-[#706A7E]'
                  }`}>
                    {shortDept}
                  </span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-md ${
                    isServing
                      ? isSelected ? 'bg-emerald-400 text-emerald-950' : 'bg-emerald-100 text-emerald-800'
                      : isCancelled
                      ? isSelected ? 'bg-rose-400 text-white' : 'bg-rose-100 text-rose-800'
                      : isSelected ? 'bg-white/20 text-white' : 'bg-[#FFD6A5] text-[#252033]'
                  }`}>
                    {getStatusText(t)}
                  </span>
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className={`font-mono text-xl font-black ${
                    isSelected ? 'text-white' : 'text-[#6A00F4]'
                  }`}>
                    {t.tokenNumber}
                  </span>
                  <span className={`text-[11px] font-medium ${
                    isSelected ? 'text-purple-100' : 'text-[#706A7E]'
                  }`}>
                    {t.peopleAhead > 0 ? `${t.peopleAhead} ahead` : 'At desk'}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Serving Notification Alert */}
      {activeToken.status === 'SERVING' && (
        <div className="bg-emerald-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <Volume2 className="w-5 h-5 shrink-0" />
            <div>
              <p className="font-extrabold text-sm uppercase">It's Your Turn for {deptName}!</p>
              <p className="text-xs text-emerald-100">
                Please proceed to <strong>{getCounterText()}</strong> now.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Detailed Token Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-sm space-y-6">
        
        {/* Top Header with Department Name & SMS View */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#E9E3F0] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#F1E8FF] text-[#6A00F4] flex items-center justify-center shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-extrabold text-[#6A00F4] uppercase tracking-widest block">
                {deptName}
              </span>
              <p className="text-sm font-bold text-[#252033]">{activeToken.serviceName}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenPhoneModal}
              className="px-3 py-1.5 rounded-xl bg-[#F1E8FF] text-[#6A00F4] hover:bg-[#FFD6A5] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#E9E3F0]"
            >
              <Smartphone className="w-3.5 h-3.5 text-[#6A00F4]" />
              <span>SMS View</span>
            </button>
            <button
              onClick={onViewQueue}
              className="px-3 py-1.5 rounded-xl bg-[#FAF8FC] text-[#252033] hover:bg-[#F1E8FF] text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-[#E9E3F0]"
            >
              <Users className="w-3.5 h-3.5 text-[#6A00F4]" />
              <span>Live Queue</span>
            </button>
          </div>
        </div>

        {/* Big YOUR TOKEN Display */}
        <div className="text-center py-5 bg-gradient-to-b from-[#FAF8FC] to-[#F1E8FF]/40 rounded-2xl border border-[#E9E3F0]">
          <span className="text-xs uppercase font-extrabold tracking-widest text-[#706A7E] block">
            YOUR DIGITAL TOKEN
          </span>
          <div className="text-6xl sm:text-7xl font-black font-mono text-[#6A00F4] my-2 tracking-tight">
            {activeToken.tokenNumber}
          </div>
          <p className="text-xs text-[#706A7E] font-medium">
            Applicant: <strong className="text-[#252033]">{activeToken.customerName}</strong> • {deptName}
          </p>
        </div>

        {/* 6 Core Information Rows */}
        <div className="bg-[#FAF8FC]/60 rounded-2xl p-4 border border-[#E9E3F0] divide-y divide-[#E9E3F0] text-sm">
          
          {/* Department */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#706A7E] font-medium">Department</span>
            <span className="font-bold text-[#252033] text-right">
              {deptName}
            </span>
          </div>

          {/* Status */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#706A7E] font-medium">Status</span>
            <span className={`font-bold px-2.5 py-0.5 rounded-full text-xs ${
              activeToken.status === 'SERVING' 
                ? 'bg-emerald-100 text-emerald-800' 
                : activeToken.status === 'APPROACHING'
                ? 'bg-amber-100 text-amber-800'
                : activeToken.status === 'CANCELLED'
                ? 'bg-rose-100 text-rose-800'
                : 'bg-[#FFD6A5] text-[#252033]'
            }`}>
              {getStatusText(activeToken)}
            </span>
          </div>

          {/* People Ahead */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#706A7E] font-medium">People Ahead in {activeToken.tokenNumber.split('-')[0]} Queue</span>
            <span className="font-extrabold text-[#252033] text-base">
              {activeToken.peopleAhead}
            </span>
          </div>

          {/* Estimated Wait */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#706A7E] font-medium">Estimated Wait Time</span>
            <span className="font-extrabold text-[#6A00F4] text-base">
              {activeToken.estimatedWaitMinutes} min
            </span>
          </div>

          {/* Current Serving Token in this Department */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#706A7E] font-medium">Current Token Serving in {deptName}</span>
            <span className="font-mono font-extrabold text-[#6A00F4] text-base">
              {currentServingNumber}
            </span>
          </div>

          {/* Counter Details */}
          <div className="py-2.5 flex items-center justify-between">
            <span className="text-[#706A7E] font-medium">Counter Information</span>
            <span className="font-bold text-[#252033]">
              {getCounterText()}
            </span>
          </div>

        </div>

        {/* Simple Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#706A7E] font-semibold">
            <span>Queue Progress</span>
            <span>{progressPercent}% Complete</span>
          </div>
          <div className="w-full bg-[#E9E3F0]/70 rounded-full h-3 overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-500 ${
                activeToken.status === 'SERVING' ? 'bg-emerald-500' : 'bg-[#6A00F4]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Action Buttons: Refresh & Cancel Only This Token */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          {/* Refresh Button */}
          <button
            id="btn-token-refresh"
            onClick={handleRefresh}
            className="py-3 px-4 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-100 transition-colors"
          >
            <RotateCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>

          {/* Cancel Token Button */}
          <button
            id="btn-token-cancel"
            onClick={handleCancelThisToken}
            disabled={activeToken.status === 'CANCELLED' || activeToken.status === 'SERVING'}
            className="py-3 px-4 rounded-xl bg-[#FAF8FC] hover:bg-rose-50 text-[#252033] hover:text-rose-700 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 border border-[#E9E3F0] hover:border-rose-200 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <XCircle className="w-4 h-4" />
            <span>Cancel This Token</span>
          </button>
        </div>

      </div>

      {/* Required Document Checklist for Active Token */}
      {requiredDocs.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-[#E9E3F0] shadow-2xs space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-[#E9E3F0]">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <h4 className="font-bold text-[#252033] text-sm">
                Required Documents for {activeToken.serviceName}
              </h4>
            </div>
            <span className="text-xs font-semibold text-[#706A7E]">
              {readyDocIds.length}/{requiredDocs.length} ready
            </span>
          </div>

          <div className="space-y-2">
            {requiredDocs.map((doc) => {
              const isChecked = readyDocIds.includes(doc.id);
              return (
                <div
                  key={doc.id}
                  onClick={() => toggleUserTokenDocument(doc.id, activeToken.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                    isChecked
                      ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950'
                      : 'bg-[#FAF8FC] border-[#E9E3F0] text-[#252033] hover:border-[#6A00F4]/50'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Square className="w-4 h-4 text-[#706A7E] shrink-0" />
                    )}
                    <div>
                      <span className="text-xs font-bold block">{doc.name}</span>
                      <span className="text-[11px] text-[#706A7E] block">
                        {doc.notes || 'Original + 1 photocopy'}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                    doc.isMandatory ? 'bg-amber-100 text-amber-800' : 'bg-[#FFD6A5] text-[#252033]'
                  }`}>
                    {doc.isMandatory ? 'Mandatory' : 'Optional'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};
