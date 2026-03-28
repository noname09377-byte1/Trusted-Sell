
import React, { useState } from 'react';
import { Lock, Key, ShieldCheck, ArrowRight, AlertTriangle, CircleDot } from 'lucide-react';

interface PasswordGateProps {
  onAuthorized: () => void;
}

const PasswordGate: React.FC<PasswordGateProps> = ({ onAuthorized }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '121') {
      setIsSuccess(true);
      setTimeout(() => {
        onAuthorized();
      }, 800);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-violet-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      </div>

      <div className={`w-full max-w-md relative z-10 transition-all duration-500 ${isSuccess ? 'scale-95 opacity-0' : 'scale-100 opacity-100'} ${error ? 'animate-shake' : ''}`}>
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[45px] shadow-[0_0_50px_rgba(79,70,229,0.1)] text-center">
          
          <div className="inline-flex items-center justify-center p-5 bg-indigo-600 rounded-3xl shadow-2xl shadow-indigo-500/40 mb-8 relative group">
            <div className="absolute inset-0 bg-indigo-400 rounded-3xl animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <Lock className="w-10 h-10 text-white relative z-10" />
          </div>

          <h1 className="text-3xl font-black text-white tracking-tight mb-2">সুরক্ষিত গেটওয়ে</h1>
          <p className="text-indigo-300/60 font-black text-[10px] uppercase tracking-[0.4em] mb-10">Security Protocol Alpha</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-indigo-400 uppercase tracking-widest">গোপন পিন প্রবেশ করুন</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <Key className={`h-5 w-5 transition-colors ${error ? 'text-rose-400' : 'text-indigo-400/50 group-focus-within:text-indigo-400'}`} />
                </div>
                <input
                  required
                  autoFocus
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••"
                  className={`block w-full pl-16 pr-6 py-6 bg-white/5 border-2 rounded-3xl text-white text-center text-3xl tracking-[1em] focus:outline-none transition-all font-black placeholder-indigo-300/10 ${
                    error ? 'border-rose-500/50 bg-rose-500/5' : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/10'
                  }`}
                />
              </div>
              {error && (
                <p className="text-rose-400 text-[11px] font-bold flex items-center justify-center gap-1.5 animate-in fade-in slide-in-from-top-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  ভুল পাসওয়ার্ড! আবার চেষ্টা করুন।
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-3 py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-xl transition-all shadow-xl shadow-indigo-500/20 active:scale-95 overflow-hidden"
            >
              <span>প্রবেশ করুন</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-4 text-indigo-300/20">
            <div className="h-px flex-1 bg-white/5"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Trusted System</span>
            </div>
            <div className="h-px flex-1 bg-white/5"></div>
          </div>
        </div>
        
        <p className="text-center mt-8 text-indigo-300/20 text-[10px] font-black uppercase tracking-[0.2em]">
          MAHABUB HUB SECURE GATEWAY • v2.4
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}} />
    </div>
  );
};

export default PasswordGate;
