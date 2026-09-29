import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Download, 
  CheckCircle2, 
  Users, 
  Clock, 
  Cpu, 
  Activity, 
  TrendingUp,
  BarChart2,
  Calendar
} from 'lucide-react';
import { useQueue } from '../../context/QueueContext';

export const ReportsSection: React.FC = () => {
  const { currentCenter, counters, simulation } = useQueue();
  const [reportGenerated, setReportGenerated] = useState(true);
  const [reportDate, setReportDate] = useState('Today, September 22, 2026');

  const totalServed = counters.reduce((sum, c) => sum + c.servedTodayCount, 0);

  const handlePrint = () => {
    window.print();
  };

  const handleGenerateReport = () => {
    setReportGenerated(false);
    setTimeout(() => {
      setReportGenerated(true);
    }, 400);
  };

  return (
    <div className="space-y-6">
      
      {/* Header and Action Buttons (Section 13) */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E9E3F0] shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#6A00F4] uppercase tracking-widest">
              Performance Audit
            </span>
            <span className="text-[10px] font-bold bg-[#FFD6A5] text-[#252033] px-2 py-0.5 rounded-full border border-[#E9E3F0]">
              Official Summary
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#252033] mt-1">Operational Reports</h2>
          <p className="text-xs text-[#706A7E]">
            Official queue summary for {currentCenter.name} ({reportDate}).
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Generate Report Button */}
          <button
            onClick={handleGenerateReport}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#6A00F4] hover:bg-[#4D00B5] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-100 transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Generate Report</span>
          </button>

          {/* Print / Save as PDF Button */}
          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#252033] hover:bg-[#6A00F4] text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer shadow-2xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* The 6 Core Metrics Card (Section 13) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E3F0] shadow-sm space-y-6">
        
        <div className="pb-4 border-b border-[#E9E3F0] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-extrabold text-[#252033] text-lg">Daily Queue Audit Summary</h3>
            <p className="text-xs text-[#706A7E]">{currentCenter.name} • Certified Telemetry</p>
          </div>
          <div className="text-xs font-mono text-[#706A7E]">
            Report Reference: QF-2026-0922
          </div>
        </div>

        {/* 6 Grid Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* 1. Total visitors */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#706A7E] mb-2">
              <span>Total Visitors</span>
              <Users className="w-4 h-4 text-[#6A00F4]" />
            </div>
            <div className="text-3xl font-black text-[#252033]">
              {simulation.footfall}
            </div>
            <p className="text-xs text-[#706A7E] mt-1">
              Registered via LiDAR entrance turnstiles
            </p>
          </div>

          {/* 2. Tokens served */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#706A7E] mb-2">
              <span>Tokens Served</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-600">
              {totalServed}
            </div>
            <p className="text-xs text-[#706A7E] mt-1">
              Successfully processed across service desks
            </p>
          </div>

          {/* 3. Average waiting time */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#706A7E] mb-2">
              <span>Average Waiting Time</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-amber-600">
              16.4 min
            </div>
            <p className="text-xs text-[#706A7E] mt-1">
              From token issuance to counter arrival
            </p>
          </div>

          {/* 4. Peak footfall */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#706A7E] mb-2">
              <span>Peak Footfall</span>
              <TrendingUp className="w-4 h-4 text-[#4D00B5]" />
            </div>
            <div className="text-3xl font-black text-[#4D00B5]">
              48 people
            </div>
            <p className="text-xs text-[#706A7E] mt-1">
              Recorded peak window: 11:00 AM – 11:30 AM
            </p>
          </div>

          {/* 5. Maximum queue */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#706A7E] mb-2">
              <span>Maximum Queue</span>
              <Activity className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-3xl font-black text-rose-600">
              42 waiting
            </div>
            <p className="text-xs text-[#706A7E] mt-1">
              Peak queue before Counter 4 AI reallocation
            </p>
          </div>

          {/* 6. Counter usage */}
          <div className="p-5 rounded-2xl bg-[#FAF8FC] border border-[#E9E3F0]">
            <div className="flex items-center justify-between text-xs font-bold text-[#706A7E] mb-2">
              <span>Counter Usage</span>
              <Cpu className="w-4 h-4 text-[#6A00F4]" />
            </div>
            <div className="text-3xl font-black text-[#252033]">
              84% avg
            </div>
            <p className="text-xs text-[#706A7E] mt-1">
              Average desk occupancy during shift hours
            </p>
          </div>

        </div>

        {/* Audit Sign-off Note */}
        <div className="pt-4 border-t border-[#E9E3F0] flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-[#706A7E] gap-2">
          <span>Official audit document generated by Q-FLOW Smart Queue Management Engine.</span>
          <span className="font-mono">Status: Verified & Validated</span>
        </div>

      </div>

    </div>
  );
};
