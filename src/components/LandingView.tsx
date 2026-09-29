import React from 'react';
import { 
  Users, 
  Clock, 
  Cpu, 
  ArrowRight, 
  CheckCircle, 
  ShieldCheck, 
  BarChart3, 
  Bell, 
  Zap, 
  Radio, 
  TrendingUp,
  Sparkles,
  Layers,
  ArrowDown,
  FileCheck
} from 'lucide-react';
import { useQueue } from '../context/QueueContext';

interface LandingViewProps {
  onGoToCustomer: () => void;
  onGoToAdmin: () => void;
  openDemoPanel?: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  onGoToCustomer,
  onGoToAdmin,
}) => {
  const { currentCenter, simulation, predictedWaitMinutes, aiRecommendations, applyRecommendation } = useQueue();
  const activeRec = aiRecommendations.find(r => !r.applied);

  return (
    <div className="space-y-12 py-6">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-blue-900 via-indigo-900 to-slate-900 text-white px-6 sm:px-12 py-14 shadow-xl border border-indigo-800/40">
        
        {/* Subtle geometric background accents */}
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-blue-200">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>IoT-Enabled Smart Queue Automation Prototype</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Q-FLOW
          </h1>
          
          <p className="text-xl sm:text-2xl font-medium text-blue-100 max-w-2xl mx-auto">
            "Join the queue digitally. Know your wait. Serve smarter."
          </p>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Eliminate chaotic physical lines in hospitals, civic centers, banks, and transit hubs.
            Harness real-time IoT sensors, automated tokens, and AI-powered resource allocation.
          </p>

          {/* Dual Main Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              id="landing-hero-join-queue"
              onClick={onGoToCustomer}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-base shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>Join Digital Queue</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              id="landing-hero-admin-dashboard"
              onClick={onGoToAdmin}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BarChart3 className="w-4 h-4 text-blue-300" />
              <span>Admin Dashboard</span>
            </button>
          </div>

          {/* Quick Scenario Badge */}
          <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Preloaded demo:</span>
            <strong className="text-white font-semibold">{currentCenter.name}</strong>
            <span>•</span>
            <span className="text-emerald-400">{simulation.queueLength} waiting</span>
            <span>•</span>
            <span className="text-amber-300">Est. wait: {predictedWaitMinutes}m</span>
          </div>
        </div>
      </section>

      {/* 3 Core Benefits */}
      <section className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Core System Architecture</h2>
          <p className="text-sm text-slate-500 mt-1">Engineered to eliminate physical waiting and balance counter load automatically</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Benefit 1 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600">Virtual Queuing</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Digital Queue</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Join without standing in line. Generate digital tokens from your smartphone, monitor live turn progress, and receive instant SMS alerts.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>SMS notifications & mobile status</span>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-indigo-600">Forecasting Engine</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Smart Prediction</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Estimate waiting time and upcoming footfall dynamically. Continuous calculations factor in active counters, queue depth, and service velocity.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>Confidence score indicator (87%)</span>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-xs font-bold tracking-wider uppercase text-amber-600">Adaptive Counter Scaling</span>
            <h3 className="text-lg font-bold text-slate-900 mt-1">Automated Management</h3>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              Leverage real-time IoT feeds to optimize counters. Administrators receive actionable recommendations to open counters before congestion peaks.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span>One-click counter activation</span>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Citizen Document Services Showcase */}
      <section className="max-w-6xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              <span>Smart Document Requirements Pre-Check</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Know Exactly What Documents to Bring
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Eliminate counter rejections and repeat visits. Q-FLOW outlines verified document checklists, required photocopies, official fees, and expected turnaround times before issuing your virtual token.
            </p>
          </div>

          <button
            onClick={onGoToCustomer}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-start sm:self-center"
          >
            <span>Explore All Documents</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: '🚗 RTO & Driving License',
              sub: 'Learner, Permanent DL, RC & Ownership Transfer',
              docs: 'Form 1A, Proof of Age, Learner License, Form 29/30, Insurance',
              fee: '₹200 - ₹530',
              center: 'Regional Transport Office (RTO)'
            },
            {
              title: '🆔 Aadhaar & UIDAI',
              sub: 'New Enrolment, Biometric Update, Address Change',
              docs: 'Birth Certificate, Valid Photo ID, Address Proof, Active Mobile',
              fee: 'Free (New) / ₹50 - ₹100',
              center: 'UIDAI Aadhaar Seva Kendra'
            },
            {
              title: '🏦 Banking KYC & Accounts',
              sub: 'Full Re-KYC, Savings Account, CIBIL & Re-verification',
              docs: 'PAN Card, Aadhaar Card, Passport Photos, Salary Slip / ITR',
              fee: 'Nil (Free)',
              center: 'Central National Bank'
            },
            {
              title: '🏛️ Municipal Certificates',
              sub: 'Birth / Death Certificate, Caste / Income, Property Tax',
              docs: 'Hospital Birth Card, Parent IDs, Revenue Affidavit, Ration Card',
              fee: '₹20 - ₹50',
              center: 'City Municipal Corporation'
            },
            {
              title: '🏥 Hospital & Health Schemes',
              sub: 'ABHA Health ID, Ayushman PM-JAY Golden Card, OPD',
              docs: 'Aadhaar Card, PM-JAY Family Letter, Ration Card, Medical Reports',
              fee: 'Free / ₹10 OPD',
              center: 'Apex Memorial Hospital'
            },
            {
              title: '🚆 Railway Concessions',
              sub: 'Senior Citizen, Disabled Divyangjan Card, Student Concession',
              docs: 'Government Disability Cert, Institution Bonafide, Age Proof',
              fee: 'Standard Tariff',
              center: 'Central Railway Terminal'
            },
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={onGoToCustomer}
              className="p-5 rounded-2xl bg-slate-50 hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 transition-all cursor-pointer space-y-2.5 group"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">
                  {item.title}
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                  {item.fee}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium line-clamp-1">{item.sub}</p>
              
              <div className="pt-2 border-t border-slate-200/60 text-[11px] text-slate-600">
                <span className="font-semibold text-slate-700 block mb-0.5">Key Documents:</span>
                <span className="text-slate-500 text-[11px] line-clamp-2">{item.docs}</span>
              </div>

              <div className="flex items-center justify-between pt-1 text-[11px] font-semibold text-blue-600">
                <span className="text-slate-400 font-normal truncate max-w-[180px]">{item.center}</span>
                <span className="flex items-center gap-1">
                  Get Token <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 25: IMPORTANT PRODUCT PRINCIPLE (Sense -> Analyze -> Predict -> Recommend -> Act -> Measure) */}
      <section className="max-w-6xl mx-auto bg-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl">
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Closed-Loop Automation Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            The Q-FLOW Autonomous Cycle
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Every minute, Q-FLOW closes the feedback loop between physical crowd sensors, predictive models, and desk allocation:
          </p>
        </div>

        {/* 6 Step Interactive Visual Pipeline (3 columns x 2 rows on desktop, 1 col on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 relative">
          
          {/* Step 1: Sense */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/90 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-blue-400">01</span>
                <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                  <Radio className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-base text-white">Sense</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                IoT sensors detect real-time inflow rate ({simulation.inflowRate} people/min) and waiting area occupancy ({simulation.waitingOccupancy}%).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Entrance Sensor & Turnstiles</span>
              <span className="text-blue-400 font-bold">IoT Inflow</span>
            </div>
          </div>

          {/* Step 2: Analyze */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/90 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-indigo-400">02</span>
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  <Layers className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-base text-white">Analyze</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Telemetry processes queue velocity ({simulation.queueLength} waiting) against currently active service desks (3/4).
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Queue Depth Telemetry</span>
              <span className="text-indigo-400 font-bold">Analysis</span>
            </div>
          </div>

          {/* Step 3: Predict */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/90 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-purple-400">03</span>
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-base text-white">Predict</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Mathematical algorithm forecasts customer wait times reaching ~{predictedWaitMinutes} mins with 87% confidence.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Dynamic Wait Formula</span>
              <span className="text-purple-400 font-bold">Forecasting</span>
            </div>
          </div>

          {/* Step 4: Recommend */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/90 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-amber-400">04</span>
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Zap className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-base text-white">Recommend</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                AI decision engine generates proactive alert to activate standby Counter 4 to relieve customer backlog.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Decision Support Engine</span>
              <span className="text-amber-400 font-bold">Action Alert</span>
            </div>
          </div>

          {/* Step 5: Act */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/90 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-emerald-400">05</span>
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-base text-white">Act</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Administrator opens Counter 4 with 1-click; counter sensor verifies operator attendance and assigns tokens.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>Human-in-the-Loop</span>
              <span className="text-emerald-400 font-bold">1-Click Dispatch</span>
            </div>
          </div>

          {/* Step 6: Measure */}
          <div className="bg-slate-800/90 rounded-2xl p-5 border border-slate-700/90 flex flex-col justify-between min-h-[190px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black font-mono text-sky-400">06</span>
                <div className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4" />
                </div>
              </div>
              <h4 className="font-extrabold text-base text-white">Measure</h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Service throughput accelerates; average wait time drops by 12 mins; metrics verify congestion resolved.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-400 font-medium">
              <span>KPI Performance Audit</span>
              <span className="text-sky-400 font-bold">Measured Loop</span>
            </div>
          </div>

        </div>

        {/* Live Recommendation Prompt Action inside diagram */}
        {activeRec && (
          <div className="mt-8 bg-blue-950/60 border border-blue-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-amber-300">Live AI Recommendation Detected</span>
                  <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded-sm">High Impact</span>
                </div>
                <p className="text-sm font-semibold text-white mt-0.5">{activeRec.recommendedAction}</p>
                <p className="text-xs text-slate-400">{activeRec.expectedEffect}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => applyRecommendation(activeRec.id)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Apply Recommendation Now
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Live System Demonstration Snapshot */}
      <section className="max-w-6xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-blue-600">Simulated IoT Infrastructure</span>
            <h3 className="text-xl font-bold text-slate-900 mt-1">Live Service Center Telemetry</h3>
            <p className="text-sm text-slate-500">Real-time edge device data feeding the central queue dispatch engine</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onGoToAdmin}
              className="text-xs font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition-colors cursor-pointer"
            >
              View Admin Telemetry →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Entrance Count</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{simulation.footfall} pax</div>
            <span className="text-[11px] text-emerald-600 font-semibold">Optical Gate LiDAR</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Lounge Occupancy</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{simulation.waitingOccupancy}%</div>
            <span className="text-[11px] text-amber-600 font-semibold">PIR Occupancy Grid</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Active Queue Depth</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">{simulation.queueLength} in line</div>
            <span className="text-[11px] text-blue-600 font-semibold">Ultrasonic Stanchion</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Inflow vs Outflow</span>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">+{simulation.inflowRate - simulation.outflowRate}/m</div>
            <span className="text-[11px] text-slate-500 font-semibold">{simulation.inflowRate} in / {simulation.outflowRate} out</span>
          </div>
        </div>
      </section>

    </div>
  );
};
