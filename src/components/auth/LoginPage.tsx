import React, { useState } from 'react';
import { 
  Activity, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Mail, 
  CheckCircle2,
  Sparkles,
  Info
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: (role: 'customer' | 'admin') => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'welcome' | 'customer' | 'admin'>('welcome');

  // Customer form state
  const [customerIdentifier, setCustomerIdentifier] = useState('alex.mercer@example.com');
  const [customerPass, setCustomerPass] = useState('customer123');
  const [customerError, setCustomerError] = useState<string | null>(null);

  // Admin form state
  const [adminUsername, setAdminUsername] = useState('admin@qflow.system');
  const [adminPass, setAdminPass] = useState('admin123');
  const [adminError, setAdminError] = useState<string | null>(null);

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerIdentifier.trim()) {
      setCustomerError('Please enter your email or mobile number.');
      return;
    }
    if (!customerPass.trim()) {
      setCustomerError('Please enter your password or demo passcode.');
      return;
    }
    setCustomerError(null);
    onLoginSuccess('customer');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim()) {
      setAdminError('Please enter your administrator username or email.');
      return;
    }
    if (!adminPass.trim()) {
      setAdminError('Please enter your administrator password.');
      return;
    }
    setAdminError(null);
    onLoginSuccess('admin');
  };

  const handleQuickCustomerLogin = () => {
    setCustomerIdentifier('alex.mercer@example.com');
    setCustomerPass('customer123');
    setCustomerError(null);
    onLoginSuccess('customer');
  };

  const handleQuickAdminLogin = () => {
    setAdminUsername('admin@qflow.system');
    setAdminPass('admin123');
    setAdminError(null);
    onLoginSuccess('admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F0EAFE]/80 via-[#FCFBF5] to-[#F0EAFE]/50 text-[#24213A] flex flex-col justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-[#FFF275] selection:text-[#24213A]">
      
      {/* Top Header Branding */}
      <header className="max-w-5xl mx-auto w-full flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#3A0CA3] to-[#280779] flex items-center justify-center text-white shadow-md shadow-indigo-100 shrink-0">
            <Activity className="w-6 h-6 text-[#FFF275]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-[#24213A]">Q-FLOW</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#FFF275] text-[#24213A] border border-[#E9E5F5]">
                Smart QMS
              </span>
            </div>
            <p className="text-xs text-[#6B6880] font-medium">Smart Queue Management System</p>
          </div>
        </div>

        {authMode !== 'welcome' && (
          <button
            onClick={() => {
              setAuthMode('welcome');
              setCustomerError(null);
              setAdminError(null);
            }}
            className="flex items-center gap-1.5 text-xs font-bold text-[#24213A] hover:text-[#3A0CA3] px-3.5 py-2 rounded-xl bg-white border border-[#E9E5F5] shadow-2xs hover:bg-[#F0EAFE] transition-all cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Portals</span>
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto w-full my-auto py-8">
        
        {/* VIEW 1: WELCOME SCREEN WITH 2 PORTAL OPTIONS */}
        {authMode === 'welcome' && (
          <div className="space-y-8 animate-fade-in">
            {/* Hero Title */}
            <div className="text-center space-y-3 max-w-2xl mx-auto">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#3A0CA3] bg-[#F0EAFE] px-3.5 py-1.5 rounded-full border border-[#E9E5F5]">
                Welcome to Next-Gen Queue Experience
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-[#24213A] tracking-tight">
                Skip the waiting. <span className="text-[#3A0CA3]">Track your turn.</span>
              </h1>
              <p className="text-sm sm:text-base text-[#6B6880] max-w-xl mx-auto">
                Select your portal below to access personalized citizen queue tokens or administrative operations.
              </p>
            </div>

            {/* 2 Portal Login Option Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              
              {/* Option 1: Customer Login Card */}
              <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#E9E5F5] hover:border-[#3A0CA3] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F0EAFE] text-[#3A0CA3] group-hover:bg-[#3A0CA3] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                    <User className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#24213A] group-hover:text-[#3A0CA3] transition-colors">
                      Customer Login
                    </h2>
                    <p className="text-sm text-[#6B6880] mt-1 font-medium">
                      Book tokens, track your queue, and receive updates.
                    </p>
                  </div>

                  <ul className="text-xs text-[#6B6880] space-y-2 pt-2 border-t border-[#E9E5F5]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Digital token generation for 6 government & transit departments</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Hold and track multiple departmental tokens simultaneously</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Real-time Live Queue status and automated SMS turn alerts</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-select-customer-login"
                    onClick={() => setAuthMode('customer')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#3A0CA3] hover:bg-[#280779] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-indigo-100 transition-all cursor-pointer group-hover:gap-3"
                  >
                    <span>Customer Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-[#6B6880] mt-2">
                    For citizens, patients, passengers, and bank account holders
                  </p>
                </div>
              </div>

              {/* Option 2: Admin Login Card */}
              <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-[#E9E5F5] hover:border-[#3A0CA3] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-6 group">
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF275] text-[#24213A] group-hover:bg-[#3A0CA3] group-hover:text-white flex items-center justify-center transition-all shadow-xs">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-[#24213A] group-hover:text-[#3A0CA3] transition-colors">
                      Admin Login
                    </h2>
                    <p className="text-sm text-[#6B6880] mt-1 font-medium">
                      Manage queues, monitor service centers, and view analytics.
                    </p>
                  </div>

                  <ul className="text-xs text-[#6B6880] space-y-2 pt-2 border-t border-[#E9E5F5]">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Independent desk controls & Call Next token dispatch</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>IoT sensor telemetry (entrance LiDAR, seating occupancy)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>AI congestion prediction & counter allocation recommendations</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    id="btn-select-admin-login"
                    onClick={() => setAuthMode('admin')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#24213A] hover:bg-[#3A0CA3] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-indigo-100 transition-all cursor-pointer group-hover:gap-3"
                  >
                    <span>Admin Login</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[11px] text-center text-[#6B6880] mt-2">
                    For queue managers, desk officers, and facility supervisors
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* VIEW 2: CUSTOMER LOGIN FORM */}
        {authMode === 'customer' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E5F5] shadow-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E5F5]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#F0EAFE] text-[#3A0CA3] flex items-center justify-center">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#24213A]">Customer Login</h2>
                  <p className="text-xs text-[#6B6880]">Access your digital tokens & live alerts</p>
                </div>
              </div>
              <button
                onClick={() => setAuthMode('welcome')}
                className="text-xs font-bold text-[#6B6880] hover:text-[#3A0CA3] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {customerError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {customerError}
              </div>
            )}

            <form onSubmit={handleCustomerSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#24213A] mb-1.5">
                  Email or Mobile Number
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B6880] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    id="customer-email-input"
                    value={customerIdentifier}
                    onChange={(e) => setCustomerIdentifier(e.target.value)}
                    placeholder="e.g. alex.mercer@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9E5F5] bg-[#FCFBF5] text-[#24213A] text-sm focus:outline-none focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24213A] mb-1.5">
                  Password / Passcode
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B6880] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    id="customer-password-input"
                    value={customerPass}
                    onChange={(e) => setCustomerPass(e.target.value)}
                    placeholder="Enter password (demo: customer123)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9E5F5] bg-[#FCFBF5] text-[#24213A] text-sm focus:outline-none focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3]"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-customer-submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3A0CA3] hover:bg-[#280779] text-white font-bold text-sm shadow-md shadow-indigo-100 transition-colors cursor-pointer"
              >
                Login to Customer Portal
              </button>
            </form>

            {/* Demo 1-Click Access for evaluation */}
            <div className="pt-2 border-t border-[#E9E5F5] space-y-2">
              <button
                type="button"
                id="btn-customer-demo-login"
                onClick={handleQuickCustomerLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFF275] hover:bg-[#faea5a] text-[#24213A] border border-[#E9E5F5] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3A0CA3]" />
                <span>1-Click Demo Customer Access (Alex Mercer)</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('welcome')}
                className="w-full py-2 text-xs font-bold text-[#6B6880] hover:text-[#24213A] cursor-pointer"
              >
                ← Back to Welcome Page
              </button>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F0EAFE]/60 text-[11px] text-[#6B6880] border border-[#E9E5F5]">
              <Info className="w-4 h-4 text-[#3A0CA3] shrink-0" />
              <span>Simulated demo authentication for Q-FLOW prototype evaluation.</span>
            </div>
          </div>
        )}

        {/* VIEW 3: ADMIN LOGIN FORM */}
        {authMode === 'admin' && (
          <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-[#E9E5F5] shadow-xl space-y-6 animate-fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-[#E9E5F5]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#FFF275] text-[#24213A] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-[#3A0CA3]" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[#24213A]">Admin Login</h2>
                  <p className="text-xs text-[#6B6880]">Authorized personnel operations access</p>
                </div>
              </div>
              <button
                onClick={() => setAuthMode('welcome')}
                className="text-xs font-bold text-[#6B6880] hover:text-[#3A0CA3] cursor-pointer"
              >
                Cancel
              </button>
            </div>

            {adminError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#24213A] mb-1.5">
                  Admin Username or Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#6B6880] absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    id="admin-username-input"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="e.g. admin@qflow.system"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9E5F5] bg-[#FCFBF5] text-[#24213A] text-sm focus:outline-none focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#24213A] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#6B6880] absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    id="admin-password-input"
                    value={adminPass}
                    onChange={(e) => setAdminPass(e.target.value)}
                    placeholder="Enter admin password (demo: admin123)"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E9E5F5] bg-[#FCFBF5] text-[#24213A] text-sm focus:outline-none focus:ring-2 focus:ring-[#3A0CA3] focus:border-[#3A0CA3]"
                  />
                </div>
              </div>

              <button
                type="submit"
                id="btn-admin-submit"
                className="w-full py-3 px-4 rounded-xl bg-[#3A0CA3] hover:bg-[#280779] text-white font-bold text-sm shadow-md shadow-indigo-100 transition-colors cursor-pointer"
              >
                Login to Admin Operations
              </button>
            </form>

            {/* Demo 1-Click Access for evaluation */}
            <div className="pt-2 border-t border-[#E9E5F5] space-y-2">
              <button
                type="button"
                id="btn-admin-demo-login"
                onClick={handleQuickAdminLogin}
                className="w-full py-2.5 px-4 rounded-xl bg-[#FFF275] hover:bg-[#faea5a] text-[#24213A] border border-[#E9E5F5] font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#3A0CA3]" />
                <span>1-Click Demo Admin Access (System Admin)</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('welcome')}
                className="w-full py-2 text-xs font-bold text-[#6B6880] hover:text-[#24213A] cursor-pointer"
              >
                ← Back to Welcome Page
              </button>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-[#F0EAFE]/60 text-[11px] text-[#6B6880] border border-[#E9E5F5]">
              <Info className="w-4 h-4 text-[#3A0CA3] shrink-0" />
              <span>Simulated demo authentication for Q-FLOW prototype evaluation.</span>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto w-full text-center text-xs text-[#6B6880] py-4 border-t border-[#E9E5F5]">
        <p>Q-FLOW Smart Queue Management • Enterprise IoT-Enabled Dispatch & Analytics</p>
      </footer>

    </div>
  );
};
