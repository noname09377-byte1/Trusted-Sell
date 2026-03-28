
import React, { useState, useEffect } from 'react';
import { 
  X, Lock, Key, AlertCircle, ArrowRight, Mail, Copy, 
  CheckCircle, Trash2, Search, History, ShieldCheck
} from 'lucide-react';
import { Order } from '../types.ts';

interface GmailRestorePanelProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  onDeleteOrder: (id: string) => void;
}

const GmailRestorePanel: React.FC<GmailRestorePanelProps> = ({ isOpen, onClose, orders, onDeleteOrder }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Filter only Gmail submissions
  const gmailOrders = orders.filter(o => o.serviceId === 'gmail-sell');
  
  const filteredOrders = gmailOrders.filter(o => 
    o.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setError(false);
    }
  }, [isOpen]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '100') {
      setIsAuthorized(true);
      setError(false);
    } else {
      setError(true);
      setPassword('');
      setTimeout(() => setError(false), 2000);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const extractGmail = (details: string) => {
    const match = details.match(/📧 \*\*Account:\*\* `([^`]+)`/);
    return match ? match[1] : 'Unknown';
  };

  const extractPassword = (details: string) => {
    const match = details.match(/🔑 \*\*Password:\*\* `([^`]+)`/);
    return match ? match[1] : 'Unknown';
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full z-[110] w-full max-w-md bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2.5 rounded-2xl shadow-xl shadow-indigo-200">
              <History className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">Gmail Restore</h2>
              <div className="flex items-center gap-1.5">
                <div className={`w-1.5 h-1.5 rounded-full ${isAuthorized ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                <p className={`text-[10px] font-black uppercase tracking-widest ${isAuthorized ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isAuthorized ? 'Authorized Access' : 'Security Locked'}
                </p>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl text-slate-400 hover:text-slate-900 transition-all active:scale-90"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {!isAuthorized ? (
          /* Password Gate */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#0F172A] relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-600/20 blur-[100px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-violet-600/20 blur-[100px] rounded-full animate-pulse delay-700" />

            <div className="w-full max-w-xs relative z-10">
              <div className="mb-10">
                <div className="w-24 h-24 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] flex items-center justify-center mx-auto mb-6 shadow-2xl group transition-transform hover:scale-110 duration-500">
                  <Lock className="w-12 h-12 text-indigo-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-3xl font-black text-white mb-3 tracking-tight">RESTORE PANEL</h3>
                <p className="text-sm text-indigo-300/60 font-medium leading-relaxed">Enter security PIN to access<br/>saved Gmail accounts.</p>
              </div>

              <form onSubmit={handleAuth} className="space-y-6">
                <div className="relative group">
                  <Key className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-500/40 group-focus-within:text-indigo-400 transition-colors" />
                  <input 
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••"
                    className={`w-full bg-white/5 border-2 rounded-[24px] py-6 pl-14 pr-4 text-white text-center text-4xl tracking-[0.5em] font-black focus:outline-none transition-all ${
                      error ? 'border-rose-500/50 animate-shake' : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/10'
                    }`}
                  />
                </div>
                {error && (
                  <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest animate-bounce">
                    <AlertCircle className="w-4 h-4" />
                    ACCESS DENIED
                  </div>
                )}
                <button 
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-[24px] font-black text-lg transition-all shadow-2xl shadow-indigo-500/30 flex items-center justify-center gap-3 active:scale-95 group"
                >
                  <span>AUTHORIZE ACCESS</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Content */
          <div className="flex-1 flex flex-col overflow-hidden bg-slate-50/30">
            <div className="p-5 bg-white border-b border-slate-100 shadow-sm">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input 
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Gmail or User..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:bg-white focus:border-indigo-500 transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {filteredOrders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-10">
                  <div className="w-20 h-20 bg-slate-100 rounded-[32px] flex items-center justify-center mb-6 animate-pulse">
                    <Mail className="w-10 h-10 text-slate-300" />
                  </div>
                  <p className="text-slate-400 font-black uppercase tracking-widest text-sm">No Gmails found</p>
                </div>
              ) : (
                filteredOrders.map((order) => (
                  <div 
                    key={order.id}
                    className="bg-white border border-slate-100 rounded-[24px] p-5 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
                    
                    <div className="flex items-start justify-between mb-4 relative z-10">
                      <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-indigo-50 to-violet-50 p-3 rounded-2xl group-hover:bg-indigo-600 transition-colors duration-500">
                          <ShieldCheck className="w-6 h-6 text-indigo-600 group-hover:text-white transition-colors duration-500" />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Gmail Account</p>
                          <p className="text-sm font-mono font-black text-slate-900 break-all">{extractGmail(order.details)}</p>
                          <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Password</p>
                            <p className="text-sm font-mono font-black text-indigo-600">{extractPassword(order.details)}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button 
                          onClick={() => copyToClipboard(order.details, order.id)}
                          className={`p-3 rounded-xl transition-all active:scale-90 ${
                            copiedId === order.id 
                            ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' 
                            : 'bg-slate-50 text-slate-400 hover:bg-indigo-600 hover:text-white hover:shadow-lg hover:shadow-indigo-200'
                          }`}
                          title="Copy Full Details"
                        >
                          {copiedId === order.id ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                        </button>
                        <button 
                          onClick={() => onDeleteOrder(order.id)}
                          className="p-3 bg-slate-50 text-slate-400 hover:bg-rose-600 hover:text-white hover:shadow-lg hover:shadow-rose-200 rounded-xl transition-all active:scale-90 opacity-0 group-hover:opacity-100"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 relative z-10">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-[12px] font-black text-slate-600 shadow-sm">
                          {order.customerName.charAt(0)}
                        </div>
                        <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight">{order.customerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <History className="w-3 h-3" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-slate-100 bg-white flex items-center justify-between shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse" />
                <p className="text-[11px] font-black text-slate-900 uppercase tracking-widest">
                  {filteredOrders.length} Accounts Saved
                </p>
              </div>
              <button 
                onClick={() => setIsAuthorized(false)}
                className="px-4 py-2 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default GmailRestorePanel;
