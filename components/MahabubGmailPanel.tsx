
import React, { useState, useEffect } from 'react';
import { 
  X, ShieldCheck, Zap, Star, Sparkles, Gem, ArrowRight, 
  CheckCircle2, Lock, Key, AlertCircle, Settings, 
  BarChart3, Users, ShieldAlert
} from 'lucide-react';

interface MahabubGmailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onStartWork: () => void;
}

const MahabubGmailPanel: React.FC<MahabubGmailPanelProps> = ({ isOpen, onClose, onStartWork }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showAdminTab, setShowAdminTab] = useState(false);

  // Reset state when panel closes
  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setError(false);
      // Keep authorization for the session if you want, or reset:
      // setIsAuthorized(false); 
    }
  }, [isOpen]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '990') {
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div 
        className={`fixed top-0 right-0 h-full z-[90] w-full max-w-md bg-[#0F172A] shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } border-l border-white/10`}
      >
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 blur-[80px] rounded-full"></div>
            <div className="absolute bottom-48 -left-24 w-48 h-48 bg-violet-500 blur-[60px] rounded-full"></div>
          </div>

          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between relative z-10 bg-[#0F172A]/80 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-500/20">
                <Gem className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-black text-white tracking-tight">Mahabub.gmail</h2>
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                  {isAuthorized ? 'Authorized Access' : 'Security Restricted'}
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/5 rounded-full text-white/40 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {!isAuthorized ? (
            /* Password Gate View */
            <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4 group overflow-hidden">
                  <Lock className={`w-10 h-10 text-indigo-400 transition-transform duration-500 ${error ? 'animate-bounce' : 'group-hover:scale-110'}`} />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">সুরক্ষিত এক্সেস</h3>
                <p className="text-sm text-indigo-300/50 font-medium">এই প্যানেলটি ব্যবহার করতে গোপন পিন দিন।</p>
              </div>

              <form onSubmit={handleAuth} className="w-full space-y-4">
                <div className="relative group">
                  <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500/40 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter PIN..."
                    className={`w-full bg-white/5 border-2 rounded-2xl py-5 pl-12 pr-4 text-white text-center text-2xl tracking-[0.5em] font-black focus:outline-none transition-all ${
                      error ? 'border-rose-500/50 animate-shake' : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/10'
                    }`}
                  />
                </div>
                {error && (
                  <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                    <AlertCircle className="w-4 h-4" />
                    ভুল পিন! আবার চেষ্টা করুন।
                  </div>
                )}
                <button 
                  type="submit"
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 active:scale-95"
                >
                  <span>প্রবেশ করুন</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </form>
              
              <p className="mt-8 text-[10px] text-white/20 font-black uppercase tracking-[0.3em]">Authorized Personnel Only</p>
            </div>
          ) : (
            /* Authorized Content View */
            <div className="flex-1 flex flex-col relative z-10">
              <div className="p-4 bg-white/5 border-b border-white/10 flex gap-2">
                <button 
                  onClick={() => setShowAdminTab(false)}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!showAdminTab ? 'bg-indigo-600 text-white shadow-lg' : 'text-indigo-300 hover:bg-white/5'}`}
                >
                  Features
                </button>
                <button 
                  onClick={() => setShowAdminTab(true)}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${showAdminTab ? 'bg-emerald-600 text-white shadow-lg' : 'text-emerald-300 hover:bg-white/5'}`}
                >
                  Admin Hub
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8">
                {showAdminTab ? (
                  /* Admin Section */
                  <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-3xl">
                       <div className="flex items-center gap-3 text-emerald-400 mb-4">
                          <Settings className="w-5 h-5" />
                          <h3 className="text-lg font-black uppercase tracking-tight">Admin Controls</h3>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
                             <div className="flex items-center gap-3">
                                <BarChart3 className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-bold text-white">Premium Revenue</span>
                             </div>
                             <span className="text-xs font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-lg">LIVE</span>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                             <div className="flex items-center gap-3">
                                <Users className="w-4 h-4 text-emerald-400" />
                                <span className="text-sm font-bold text-white">Active Agents</span>
                             </div>
                             <span className="text-xs font-bold text-white/40">12 Online</span>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl hover:bg-rose-500/20 transition-colors cursor-pointer">
                             <div className="flex items-center gap-3">
                                <ShieldAlert className="w-4 h-4 text-rose-400" />
                                <span className="text-sm font-bold text-white">System Security</span>
                             </div>
                             <span className="text-xs font-black text-rose-400">STABLE</span>
                          </div>
                       </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 rounded-3xl">
                       <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4">Admin Messages</p>
                       <div className="space-y-4">
                          <div className="border-l-2 border-indigo-500 pl-4 py-1">
                             <p className="text-xs text-white font-bold">New rate update pending approval.</p>
                             <p className="text-[10px] text-white/30">2 hours ago</p>
                          </div>
                          <div className="border-l-2 border-emerald-500 pl-4 py-1">
                             <p className="text-xs text-white font-bold">System integrity check completed.</p>
                             <p className="text-[10px] text-white/30">5 hours ago</p>
                          </div>
                       </div>
                    </div>
                  </div>
                ) : (
                  /* Features Section (Previous Content) */
                  <div className="animate-in fade-in slide-in-from-left-4 duration-300 space-y-8">
                    <div className="text-center space-y-4">
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em]">
                         <Star className="w-3 h-3 fill-indigo-300" />
                         Premium Access Active
                       </div>
                       <h3 className="text-3xl font-black text-white leading-tight">
                         প্রিমিয়াম জিমেইল <br />
                         <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">সিস্টেম</span>
                       </h3>
                       <p className="text-indigo-200/60 text-sm font-medium leading-relaxed">
                         এটি আমাদের একটি বিশেষ সার্ভিস যেখানে আপনি সাধারণের চেয়ে বেশি দামে জিমেইল বিক্রি করতে পারবেন।
                       </p>
                    </div>

                    <div className="space-y-4">
                       <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:border-indigo-500/50 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400">
                                <Zap className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-white">ইনস্ট্যান্ট অ্যাপ্রুভাল</p>
                                <p className="text-xs text-indigo-300/50">আপনার কাজ দ্রুত চেক করা হবে।</p>
                             </div>
                          </div>
                       </div>

                       <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:border-indigo-500/50 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400">
                                <CheckCircle2 className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-white">উচ্চমূল্য রেট</p>
                                <p className="text-xs text-indigo-300/50">প্রতি একাউন্টে পাবেন সর্বোচ্চ বোনাস।</p>
                             </div>
                          </div>
                       </div>

                       <div className="p-5 bg-white/5 border border-white/10 rounded-3xl group hover:border-indigo-500/50 transition-all">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 bg-sky-500/10 rounded-2xl flex items-center justify-center text-sky-400">
                                <ShieldCheck className="w-6 h-6" />
                             </div>
                             <div>
                                <p className="text-sm font-black text-white">নিরাপদ পেমেন্ট</p>
                                <p className="text-xs text-indigo-300/50">১০০% পেমেন্ট গ্যারান্টি।</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="bg-indigo-600/10 border border-indigo-500/20 p-6 rounded-3xl space-y-3">
                       <div className="flex items-center gap-2 text-indigo-400">
                          <Sparkles className="w-4 h-4" />
                          <p className="text-xs font-black uppercase tracking-widest">কিভাবে শুরু করবেন?</p>
                       </div>
                       <p className="text-[13px] text-indigo-100/70 leading-relaxed font-medium">
                         নিচের বাটনে ক্লিক করে কাজ শুরু করুন। আমরা আপনাকে একটি অটোমেটিক জিমেইল টাস্ক দিবো যা সম্পন্ন করলে আপনার ব্যালেন্স যোগ হবে।
                       </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Action */}
              <div className="p-6 border-t border-white/10 bg-white/5 relative z-10">
                <button 
                  onClick={() => {
                    onClose();
                    onStartWork();
                  }}
                  className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3 group active:scale-95"
                >
                  <span>প্রিমিয়াম কাজ শুরু করুন</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}} />
    </>
  );
};

export default MahabubGmailPanel;
