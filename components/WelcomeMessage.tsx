import React from 'react';
import { ShieldCheck, Headset, ArrowRight, X } from 'lucide-react';

interface WelcomeMessageProps {
  userName: string;
  onStart: () => void;
  onClose: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ userName, onStart, onClose }) => {
  const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/G07De5sgX8IKOldlP1NeGc?mode=gi_t";

  return (
    <div className="w-full max-w-lg mx-auto px-4 mt-8 animate-in zoom-in-95 duration-300">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden text-left relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100 rotate-3">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">👋 স্বাগতম, {userName}!</h2>
              <p className="text-xs font-black text-indigo-600 uppercase tracking-[0.2em]">TRUSTED ACCOUNT BUYING BOT</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-lg font-bold text-slate-700 leading-tight bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
              জিমেইল একাউন্ট বিক্রি করে দৈনিক ১০০০ থেকে ২০০০ টাকা ইনকাম করুন।
            </p>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xl">🔹</span>
                <p className="text-sm font-bold text-slate-800">রেট: <span className="text-indigo-600">প্রতি একাউন্ট 100 টাকা</span></p>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-xl">🔹</span>
                <p className="text-sm font-bold text-slate-800">পেমেন্ট: <span className="text-emerald-600">বিকাশ, নগদ, রকেট</span></p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
               <a 
                 href={WHATSAPP_GROUP_URL} 
                 target="_blank" 
                 rel="noreferrer"
                 className="flex items-center justify-between w-full p-4 bg-white border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all group"
               >
                 <div className="flex items-center gap-3">
                    <Headset className="w-6 h-6 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-800">🔰 সাপোর্ট: WhatsApp Group</span>
                 </div>
                 <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
               </a>
            </div>

            <button 
              onClick={onStart}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 active:scale-[0.98] transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-3"
            >
              <span>🚀 কাজ শুরু করুন</span>
            </button>
          </div>
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-6 font-bold uppercase tracking-widest">
        SECURE SYSTEM • TRUSTED BY THOUSANDS
      </p>
    </div>
  );
};

export default WelcomeMessage;