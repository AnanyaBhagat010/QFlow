import React, { useState } from 'react';
import { 
  Building2, 
  Activity, 
  Smartphone, 
  Sliders, 
  Play, 
  Pause, 
  Bell, 
  CheckCircle2, 
  Radio, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useQueue } from '../context/QueueContext';

interface NavbarProps {
  currentTab: 'landing' | 'customer' | 'admin';
  setCurrentTab: (tab: 'landing' | 'customer' | 'admin') => void;
  openDemoPanel: () => void;
  openPhoneModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openDemoPanel,
  openPhoneModal,
}) => {
  const { 
    simulation, 
    toggleAutoSimulation, 
    resetToDefaultScenario, 
    notifications, 
    markNotificationsAsRead,
    currentCenter,
    selectedCenterId,
    setSelectedCenterId,
    serviceCenters,
    aiRecommendations,
    userToken
  } = useQueue();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const unreadNotifs = notifications.filter(n => !n.read).length;
  const pendingAiRecs = aiRecommendations.filter(r => !r.applied).length;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setCurrentTab('landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-hidden"
              id="brand-logo-btn"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-indigo-100 group-hover:scale-105 transition-transform">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900">Q-FLOW</span>
                  <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-sm bg-blue-50 text-blue-700 border border-blue-200">
                    IoT Smart Queue
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">Sense • Analyze • Predict • Optimize</p>
              </div>
            </button>

            {/* Service Center Selector Dropdown in Navbar */}
            <div className="hidden lg:flex items-center ml-4 pl-4 border-l border-slate-200">
              <label htmlFor="nav-center-select" className="text-xs font-semibold text-slate-500 mr-2 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                Center:
              </label>
              <select
                id="nav-center-select"
                value={selectedCenterId}
                onChange={(e) => setSelectedCenterId(e.target.value as any)}
                className="text-xs font-medium text-slate-700 bg-slate-100 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                {serviceCenters.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.currentQueueLength} waiting)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Navigation Mode Switcher */}
          <nav className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80">
            <button
              id="nav-tab-landing"
              onClick={() => setCurrentTab('landing')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'landing'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overview
            </button>
            <button
              id="nav-tab-customer"
              onClick={() => setCurrentTab('customer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'customer'
                  ? 'bg-white text-blue-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Customer Portal</span>
              {userToken && userToken.status === 'WAITING' && (
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              )}
            </button>
            <button
              id="nav-tab-admin"
              onClick={() => setCurrentTab('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                currentTab === 'admin'
                  ? 'bg-white text-indigo-700 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Admin Dashboard</span>
              {pendingAiRecs > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  {pendingAiRecs} AI
                </span>
              )}
            </button>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2">
            
            {/* Live Simulation Auto Button */}
            <button
              id="btn-toggle-live-simulation"
              onClick={toggleAutoSimulation}
              className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors ${
                simulation.isSimulating
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
              title="Automatically updates queue and footfall every 3.5 seconds"
            >
              {simulation.isSimulating ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <Pause className="w-3.5 h-3.5" />
                  <span>Simulating Live</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-slate-500" />
                  <span>Start Live Sim</span>
                </>
              )}
            </button>

            {/* Quick Demo Controls Panel */}
            <button
              id="btn-open-demo-panel"
              onClick={openDemoPanel}
              className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
              title="Adjust footfall, queue length, counters and scenario parameters"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Demo Controls</span>
            </button>

            {/* Simulated SMS Phone Modal Trigger */}
            <button
              id="btn-open-sms-phone"
              onClick={openPhoneModal}
              className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              title="Simulated Virtual Queue SMS Phone"
            >
              <Smartphone className="w-4 h-4" />
              {unreadNotifs > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">
                  {unreadNotifs}
                </span>
              )}
            </button>

            {/* Notifications Bell Dropdown */}
            <div className="relative">
              <button
                id="btn-notifications-dropdown"
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  if (!showNotifDropdown) markNotificationsAsRead();
                }}
                className="relative p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
                title="System Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>

              {/* Dropdown Card */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-600" />
                      <span className="font-bold text-sm text-slate-900">Live Queue Alerts</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{notifications.length} messages</span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 mt-2">
                    {notifications.slice(0, 5).map((n) => (
                      <div key={n.id} className="py-2.5 text-xs">
                        <div className="flex items-center justify-between text-slate-400 mb-1">
                          <span className="font-mono text-[10px]">{n.phoneNumber}</span>
                          <span>{n.timestamp}</span>
                        </div>
                        <p className="text-slate-700 leading-relaxed">{n.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={openPhoneModal}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                    >
                      Open Mobile Simulator →
                    </button>
                    <button
                      onClick={() => setShowNotifDropdown(false)}
                      className="text-xs text-slate-500 hover:text-slate-700"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Reset to Scenario 23 */}
            <button
              id="btn-reset-scenario"
              onClick={resetToDefaultScenario}
              className="hidden lg:flex items-center gap-1 text-xs text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
              title="Reset to default hackathon scenario (City Hospital, 34 waiting, 3/4 counters)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </div>

      {/* Demo Status Sub-bar */}
      <div className="bg-slate-100/80 border-t border-slate-200/60 px-4 sm:px-6 py-1 text-xs text-slate-600 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-3 min-w-max">
          <span className="inline-flex items-center gap-1.5 font-bold text-[11px] text-slate-700">
            <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
            DEMO ENVIRONMENT:
          </span>
          <span className="font-medium text-slate-700">{currentCenter.name}</span>
          <span className="text-slate-400">•</span>
          <span>Footfall: <strong className="text-slate-800">{simulation.footfall} pax</strong></span>
          <span className="text-slate-400">•</span>
          <span>Queue Depth: <strong className="text-slate-800">{simulation.queueLength} waiting</strong></span>
          <span className="text-slate-400">•</span>
          <span>Inflow: <strong className="text-slate-800">{simulation.inflowRate}/min</strong></span>
          <span className="text-slate-400">•</span>
          <span>Outflow: <strong className="text-slate-800">{simulation.outflowRate}/min</strong></span>
        </div>

        <div className="hidden sm:flex items-center gap-2 min-w-max ml-4">
          <span className="text-[11px] text-slate-500">Simulated IoT Feeds Active</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        </div>
      </div>
    </header>
  );
};
