
import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, Clock, Trash2, AlertCircle, ChevronRight, Zap, Copy, 
  ChevronDown, ChevronUp, Mail, Key, ShieldAlert, Landmark, Lock,
  ArrowRight
} from 'lucide-react';
import { Order } from '../types.ts';

interface AdminDashboardProps {
  isOpen: boolean;
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
  onDeleteOrder: (id: string) => void;
  onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, orders, onUpdateStatus, onDeleteOrder, onClose }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Reset authorization on panel close to keep it secure
  useEffect(() => {
    if (!isOpen) {
      setPassword('');
      setAuthError(false);
      // Optional: keep authorized for the session. If you want true security, uncomment next line:
      // setIsAuthorized(false);
    }
  }, [isOpen]);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '100') {
      setIsAuthorized(true);
      setAuthError(false);
    } else {
      setAuthError(true);
      setPassword('');
      setTimeout(() => setAuthError(false), 2000);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const parseCredentials = (details: string) => {
    const gmailMatch = details.match(/📧 \*\*Gmail:\*\* `([^`]+)`/);
    const passMatch = details.match(/🔑 \*\*Pass:\*\* `([^`]+)`/);
    const recoveryMatch = details.match(/🛡️ \*\*Recovery:\*\* `([^`]+)`/);

    return {
      gmail: gmailMatch ? gmailMatch[1] : 'N/A',
      password: passMatch ? passMatch[1] : 'N/A',
      recovery: recoveryMatch ? recoveryMatch[1] : 'N/A'
    };
  };

  return (
    <>
      <div 
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <div 
        className={`fixed top-0 right-0 h-full z-[70] w-full max-w-4xl bg-white shadow-2xl transition-transform duration-500 ease-in-out transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {!isAuthorized ? (
          /* Password Gate */
          <div className="h-full flex flex-col items-center justify-center p-8 bg-[#0F172A] relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-20">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500 blur-[80px] rounded-full"></div>
              <div className="absolute bottom-48 -left-24 w-48 h-48 bg-violet-500 blur-[60px] rounded-full"></div>
            </div>

            <div className="w-full max-w-sm relative z-10 text-center">
               <div className="mb-8">
                  <div className="w-20 h-20 bg-indigo-500/10 border border-indigo-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-10 h-10 text-indigo-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2 uppercase tracking-tight">Admin Authentication</h3>
                  <p className="text-sm text-indigo-300/50 font-medium italic">Please enter the security PIN to access orders.</p>
               </div>

               <form onSubmit={handleAuth} className="space-y-4">
                  <div className="relative group">
                    <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500/40" />
                    <input 
                      autoFocus
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="ENTER PIN..."
                      className={`w-full bg-white/5 border-2 rounded-2xl py-5 pl-12 pr-4 text-white text-center text-3xl tracking-[1em] font-black focus:outline-none transition-all ${
                        authError ? 'border-rose-500/50' : 'border-white/10 focus:border-indigo-500/50 focus:bg-white/10'
                      }`}
                    />
                  </div>
                  {authError && (
                    <div className="flex items-center justify-center gap-2 text-rose-400 text-xs font-bold animate-pulse">
                      <AlertCircle className="w-4 h-4" />
                      ACCESS DENIED!
                    </div>
                  )}
                  <button 
                    type="submit"
                    className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-3"
                  >
                    <span>AUTHORIZE</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
               </form>

               <button 
                onClick={onClose}
                className="mt-12 text-xs font-black text-white/20 uppercase tracking-[0.4em] hover:text-white/40 transition-colors"
               >
                 Go Back
               </button>
            </div>
          </div>
        ) : (
          /* Main Dashboard Content */
          <div className="h-full flex flex-col bg-[#F8FAFC]">
            <div className="p-6 border-b border-indigo-100/50 flex items-center justify-between bg-white relative overflow-hidden">
              {/* Header Background Glow */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
              
              <div className="flex items-center gap-4 relative z-10">
                <button 
                  onClick={onClose}
                  className="p-2.5 bg-slate-50 hover:bg-indigo-50 rounded-xl transition-all text-slate-400 hover:text-indigo-600 shadow-sm border border-slate-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Dashboard</span></h1>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-[10px] text-indigo-600 font-black uppercase tracking-[0.2em]">System Online • v2.5 Premium</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsAuthorized(false)}
                className="group flex items-center gap-2 text-[10px] font-black text-rose-500 bg-rose-50 px-4 py-2 rounded-xl uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-sm border border-rose-100"
              >
                <Lock className="w-3 h-3 transition-transform group-hover:rotate-12" />
                Logout
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              {orders.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>
                    <div className="relative p-10 bg-white border-2 border-slate-50 rounded-[2.5rem] shadow-xl">
                      <Clock className="w-20 h-20 text-indigo-200" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-2">পেন্ডিং কোনো কাজ নেই</h3>
                  <p className="text-slate-400 font-medium italic">Everything is up to date! Check back later.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.3em]">Active Orders ({orders.length})</h2>
                    <div className="flex gap-2">
                       <div className="w-3 h-3 bg-amber-400 rounded-full"></div>
                       <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                       <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
                    </div>
                  </div>

                  <div className="bg-white border border-slate-200/60 rounded-[2rem] shadow-xl shadow-slate-200/40 overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50/50 border-b border-slate-100">
                            <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Service Details</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Customer Info</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">Status Control</th>
                            <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {orders.map((order) => {
                            const isExpanded = expandedOrderId === order.id;
                            const creds = order.serviceId === 'gmail-sell' ? parseCredentials(order.details) : null;
                            
                            return (
                              <React.Fragment key={order.id}>
                                <tr 
                                  className={`transition-all cursor-pointer group relative ${isExpanded ? 'bg-indigo-50/40' : 'hover:bg-slate-50/50'}`}
                                  onClick={() => setExpandedOrderId(isExpanded ? null : order.id)}
                                >
                                  {/* Active Indicator */}
                                  {isExpanded && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-indigo-500 to-violet-600"></div>}
                                  
                                  <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm border ${
                                        order.status === 'pending' ? 'bg-amber-50 border-amber-100 text-amber-500' :
                                        order.status === 'completed' ? 'bg-green-50 border-green-100 text-green-500' :
                                        'bg-rose-50 border-rose-100 text-rose-500'
                                      }`}>
                                        {order.serviceId === 'gmail-sell' ? <Mail className="w-6 h-6" /> : <Zap className="w-6 h-6" />}
                                      </div>
                                      <div>
                                        <div className="flex items-center gap-2">
                                          <span className="font-black text-slate-900 text-base tracking-tight">{order.serviceName}</span>
                                          {creds && <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                          <Clock className="w-3 h-3" />
                                          {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="px-8 py-6">
                                    <div className="flex flex-col">
                                      <span className="text-sm font-black text-slate-800 tracking-tight">{order.customerName}</span>
                                      <span className="text-[11px] font-bold text-indigo-500/60 mt-0.5">{order.customerHandle}</span>
                                    </div>
                                  </td>
                                  <td className="px-8 py-6">
                                    <div onClick={(e) => e.stopPropagation()} className="relative">
                                      <select 
                                        value={order.status}
                                        onChange={(e) => onUpdateStatus(order.id, e.target.value as Order['status'])}
                                        className={`appearance-none text-[10px] font-black px-5 py-2.5 rounded-xl border-2 cursor-pointer uppercase tracking-[0.15em] shadow-sm transition-all focus:outline-none focus:ring-4 focus:ring-indigo-100/50 ${
                                          order.status === 'pending' ? 'bg-amber-50 border-amber-200 text-amber-700' : 
                                          order.status === 'completed' ? 'bg-green-50 border-green-200 text-green-700' : 
                                          'bg-rose-50 border-rose-200 text-rose-700'
                                        }`}
                                      >
                                        <option value="pending">🟡 Pending</option>
                                        <option value="completed">🟢 Approved</option>
                                        <option value="cancelled">🔴 Reject</option>
                                      </select>
                                    </div>
                                  </td>
                                  <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                      <button 
                                        className={`p-2.5 rounded-xl transition-all ${isExpanded ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-slate-50 text-slate-400 hover:text-indigo-600'}`}
                                      >
                                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                      </button>
                                      <button 
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          onDeleteOrder(order.id);
                                        }}
                                        className="p-2.5 bg-rose-50 text-rose-300 hover:text-rose-600 hover:bg-rose-100 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                                      >
                                        <Trash2 className="w-5 h-5" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                                {isExpanded && (
                                  <tr className="bg-indigo-50/20 border-t border-indigo-100/30 animate-in fade-in slide-in-from-top-4 duration-300">
                                    <td colSpan={4} className="px-8 py-10">
                                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                        <div className="space-y-6">
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-200">
                                              <AlertCircle className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className="text-xs font-black text-indigo-900 uppercase tracking-[0.3em]">Submission Data</h4>
                                          </div>
                                          
                                          {creds ? (
                                            <div className="space-y-4">
                                              {[
                                                { label: 'Gmail Address', value: creds.gmail, icon: Mail, id: 'gmail' },
                                                { label: 'Account Password', value: creds.password, icon: Key, id: 'pass' },
                                                { label: 'Recovery Email', value: creds.recovery, icon: ShieldAlert, id: 'rec' }
                                              ].map((item) => (
                                                <div key={item.id} className="bg-white p-5 rounded-[1.5rem] border border-indigo-100 shadow-sm flex items-center justify-between group/item hover:shadow-md transition-all">
                                                  <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600 group-hover/item:scale-110 transition-transform">
                                                      <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                                                      <p className="text-sm font-mono font-bold text-slate-700 select-all">{item.value}</p>
                                                    </div>
                                                  </div>
                                                  <button 
                                                    onClick={() => copyToClipboard(item.value, order.id + item.id)}
                                                    className={`p-3 rounded-xl transition-all ${
                                                      copiedId === order.id + item.id 
                                                      ? 'bg-green-500 text-white shadow-lg shadow-green-200' 
                                                      : 'bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50'
                                                    }`}
                                                  >
                                                    {copiedId === order.id + item.id ? <CheckCircle className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                                                  </button>
                                                </div>
                                              ))}
                                            </div>
                                          ) : (
                                            <div className="bg-white p-8 rounded-[2rem] border-2 border-dashed border-indigo-100 text-sm text-slate-600 leading-relaxed font-medium italic shadow-inner">
                                              {order.details}
                                            </div>
                                          )}
                                        </div>

                                        <div className="space-y-6">
                                          <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-slate-800 rounded-lg flex items-center justify-center shadow-lg shadow-slate-200">
                                              <Landmark className="w-4 h-4 text-white" />
                                            </div>
                                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Order Metadata</h4>
                                          </div>
                                          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm space-y-5 relative overflow-hidden">
                                            {/* Decorative Corner */}
                                            <div className="absolute -top-10 -right-10 w-24 h-24 bg-slate-50 rotate-45"></div>
                                            
                                            <div className="flex justify-between items-center relative z-10">
                                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Reference</span>
                                              <span className="text-xs font-mono font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">#{order.id.slice(0, 8)}</span>
                                            </div>
                                            <div className="flex justify-between items-center relative z-10">
                                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Handle</span>
                                              <span className="text-sm font-black text-slate-900">{order.customerHandle}</span>
                                            </div>
                                            <div className="flex justify-between items-center relative z-10">
                                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Timestamp</span>
                                              <span className="text-xs font-bold text-slate-600">{new Date(order.createdAt).toLocaleString()}</span>
                                            </div>
                                            
                                            <div className="pt-6 border-t border-slate-50 flex gap-3 relative z-10">
                                              <button 
                                                onClick={() => onUpdateStatus(order.id, 'completed')}
                                                className="flex-1 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:shadow-xl hover:shadow-green-200 transition-all active:scale-95"
                                              >
                                                Approve Order
                                              </button>
                                              <button 
                                                onClick={() => onUpdateStatus(order.id, 'cancelled')}
                                                className="flex-1 py-4 bg-white text-rose-500 border-2 border-rose-100 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-rose-50 transition-all active:scale-95"
                                              >
                                                Reject
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                )}
                              </React.Fragment>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 border-t border-indigo-100/50 bg-white relative overflow-hidden">
               <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/5 blur-3xl rounded-full"></div>
               
               <div className="flex items-center justify-between relative z-10">
                  <div className="flex flex-col">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-1">Mahabub Admin Command</p>
                     <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full"></div>
                        <p className="text-xs font-black text-indigo-600 uppercase tracking-widest">Secure Protocol Active</p>
                     </div>
                  </div>
                  <button 
                    onClick={onClose}
                    className="px-10 py-4 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-slate-800 hover:shadow-2xl hover:shadow-slate-400 transition-all active:scale-95"
                  >
                    Exit Control
                  </button>
               </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminDashboard;
