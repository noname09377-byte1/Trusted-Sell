
import React, { useState } from 'react';
import { X, Copy, Check, Landmark, Users, Info, Mail, Shield, Zap, Smartphone, LogOut, User } from 'lucide-react';
import { Order } from '../types.ts';

interface ModalProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const BaseModal: React.FC<ModalProps> = ({ title, onClose, children, className = "" }) => (
  <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
    <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 ${className}`}>
      <div className="flex items-center justify-between p-6 border-b">
        <h2 className="text-xl font-black text-gray-900">{title}</h2>
        <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  </div>
);

export const AccountModal: React.FC<{ 
  onClose: () => void; 
  orders: Order[]; 
  userName: string;
  onLogout: () => void;
}> = ({ onClose, orders, userName, onLogout }) => {
  const completedTaskOrders = orders.filter(o => o.status === 'completed' && o.serviceId !== 'admin-credit');
  const manualCredits = orders.filter(o => o.status === 'completed' && o.serviceId === 'admin-credit');
  const pendingTasks = orders.filter(o => o.status === 'pending').length;

  const taskEarnings = completedTaskOrders.length * 100;
  const manualBonus = manualCredits.reduce((acc, curr) => acc + (curr.priceOverride || 0), 0);
  const totalBalance = taskEarnings + manualBonus;

  return (
    <BaseModal title="My Account" onClose={onClose}>
      <div className="space-y-4">
        <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl border border-indigo-100 mb-2">
           <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
              <User className="w-6 h-6" />
           </div>
           <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 leading-none mb-1">Active User</p>
              <p className="text-xl font-black text-slate-900 leading-none">{userName}</p>
           </div>
        </div>

        <div className="flex flex-col gap-4 p-5 bg-slate-900 rounded-3xl text-white shadow-xl">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-50">Total Available Balance</p>
           <h2 className="text-4xl font-black">৳{totalBalance}</h2>
           
           <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10">
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Earnings</p>
                 <p className="text-xl font-bold">৳{taskEarnings}</p>
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">Bonuses</p>
                 <p className="text-xl font-bold text-emerald-400">৳{manualBonus}</p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 gap-2">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">✅</span>
              <span className="text-sm font-bold text-gray-700">সফল কাজ</span>
            </div>
            <span className="font-black text-indigo-600">{completedTaskOrders.length} টি</span>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <span className="text-xl">⌛</span>
              <span className="text-sm font-bold text-gray-700">পেন্ডিং কাজ</span>
            </div>
            <span className="font-black text-amber-600">{pendingTasks} টি</span>
          </div>
        </div>

        <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-2xl">
           <div className="flex gap-3">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-indigo-700 font-bold leading-relaxed">
                আপনার ইনকাম ও বোনাস টাকা একসাথে উইথড্র করতে পারবেন। উইথড্র করার জন্য সাপোর্টে মেসেজ দিন।
              </p>
           </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={onLogout}
            className="flex items-center justify-center gap-2 py-4 bg-rose-50 text-rose-600 rounded-2xl font-black text-sm hover:bg-rose-100 transition-all active:scale-95 border border-rose-100"
          >
            <LogOut className="w-4 h-4" />
            লগআউট
          </button>
          <button 
            onClick={onClose}
            className="py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg active:scale-95"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export const ReferralModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [copied, setCopied] = useState(false);
  const refLink = "https://mahabub.app/ref/trusted_user_22";

  const handleCopy = () => {
    navigator.clipboard.writeText(refLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <BaseModal title="Refer & Earn" onClose={onClose}>
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-full flex items-center justify-center mx-auto">
          <Users className="w-8 h-8" />
        </div>
        <p className="text-gray-600 text-sm">
          Earn <span className="font-bold text-indigo-600">৳10</span> for every new seller you refer who completes their first order!
        </p>
        <div className="flex items-center gap-2 p-3 bg-slate-100 rounded-xl border border-slate-200">
          <input readOnly value={refLink} className="bg-transparent text-xs font-mono text-slate-600 flex-1 outline-none" />
          <button onClick={handleCopy} className="p-2 bg-white rounded-lg shadow-sm hover:text-indigo-600 transition-colors">
            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </BaseModal>
  );
};

export const TutorialModal: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <BaseModal title="How to Work" onClose={onClose}>
    <div className="space-y-4">
      <div className="aspect-video bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden">
        <iframe 
          className="w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Tutorial Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowFullScreen
        ></iframe>
      </div>
      <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
        <span className="w-5 h-5 text-blue-500 shrink-0"><Info className="w-full h-full" /></span>
        <p className="text-xs text-blue-700 leading-relaxed">
          আমাদের সাথে কাজ করার নিয়ম খুবই সহজ। ভিডিওটি সম্পূর্ণ দেখুন এবং যেকোনো সমস্যায় আমাদের সাপোর্ট টিমের সাহায্য নিন।
        </p>
      </div>
    </div>
  </BaseModal>
);

export const PricesModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const priceList = [
    { name: 'Fresh Gmail', price: '৳100', icon: <Mail className="w-4 h-4" /> },
    { name: 'Aged Gmail (2022+)', price: '৳150', icon: <Shield className="w-4 h-4" /> },
    { name: 'Bulk (50x Pack)', price: '৳4500', icon: <Zap className="w-4 h-4" /> },
    { name: 'SMS Verify', price: '৳80', icon: <Smartphone className="w-4 h-4" /> },
  ];

  return (
    <BaseModal title="একাউন্টের দাম" onClose={onClose}>
      <div className="space-y-3">
        {priceList.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
                {item.icon}
              </div>
              <span className="font-bold text-gray-700">{item.name}</span>
            </div>
            <span className="text-xl font-black text-indigo-600">{item.price}</span>
          </div>
        ))}
        <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl mt-4">
          <p className="text-xs text-amber-700 font-medium">
            * দাম যেকোনো সময় পরিবর্তন হতে পারে। বড় ডিল করার আগে এডমিনের সাথে কথা বলে নিন।
          </p>
        </div>
      </div>
    </BaseModal>
  );
};
