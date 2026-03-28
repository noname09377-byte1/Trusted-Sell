import React, { useState } from 'react';
import { CircleDot, User, ArrowRight, ShieldCheck } from 'lucide-react';

interface LoginProps {
  onLogin: (name: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onLogin(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-emerald-500/10 blur-[100px] rounded-full animate-bounce duration-[10s]"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="w-full max-w-md relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="bg-white/5 backdrop-blur-3xl border border-white/10 p-10 rounded-[3rem] shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          {/* Subtle Border Glow */}
          <div className="absolute inset-0 border-2 border-indigo-500/20 rounded-[3rem] pointer-events-none group-hover:border-indigo-500/40 transition-colors duration-500"></div>
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center p-5 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-[2rem] shadow-2xl shadow-indigo-500/40 mb-8 rotate-3 hover:rotate-0 transition-transform duration-500">
              <CircleDot className="w-12 h-12 text-white animate-spin-slow" />
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter mb-3">MAHABUB <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">HUB</span></h1>
            <div className="flex items-center justify-center gap-3">
               <div className="h-px w-8 bg-indigo-500/30"></div>
               <p className="text-indigo-300/60 font-black text-[10px] uppercase tracking-[0.5em]">Premium Trusted Gateway</p>
               <div className="h-px w-8 bg-indigo-500/30"></div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.3em]">আপনার নাম দিন</label>
                <span className="text-[10px] font-bold text-indigo-500/40 italic">Identity Required</span>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <User className="h-6 w-6 text-indigo-400/40 group-focus-within:text-indigo-400 transition-all duration-300" />
                </div>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name..."
                  className="block w-full pl-16 pr-6 py-6 bg-white/5 border-2 border-white/5 rounded-[1.5rem] text-white placeholder-indigo-300/20 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 focus:bg-white/10 transition-all duration-300 font-black text-xl tracking-tight"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-4 py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-[1.5rem] font-black text-2xl transition-all duration-500 shadow-2xl shadow-indigo-500/30 active:scale-95 overflow-hidden"
            >
              {/* Animated Shine Effect */}
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              
              <span className="relative z-10">লগইন করুন</span>
              <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform duration-300 relative z-10" />
            </button>
          </form>

          <div className="mt-10 flex items-center justify-center gap-6 text-indigo-300/20">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10"></div>
            <div className="flex items-center gap-3 group/secure">
              <ShieldCheck className="w-5 h-5 group-hover/secure:text-indigo-400 transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Secure Access</span>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10"></div>
          </div>
        </div>
        
        <div className="text-center mt-12 space-y-2">
          <p className="text-indigo-300/20 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2024 Mahabub Digital Services • BD
          </p>
          <div className="flex items-center justify-center gap-4">
             <div className="w-1 h-1 bg-indigo-500/20 rounded-full"></div>
             <div className="w-1 h-1 bg-indigo-500/40 rounded-full"></div>
             <div className="w-1 h-1 bg-indigo-500/20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;