
import React, { useState } from 'react';
import { Copy, X, CheckCircle, User, Mail, Key, ShieldAlert, ArrowRight, Zap, AlertTriangle, Loader2 } from 'lucide-react';
import { Task } from '../types.ts';

interface TaskAssignmentProps {
  task: Task;
  onComplete: () => void;
  onCancel: () => void;
}

const TaskAssignment: React.FC<TaskAssignmentProps> = ({ task, onComplete, onCancel }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInitialSubmit = () => {
    setIsVerifying(true);
    // Simulate server check
    setTimeout(() => {
      setIsVerifying(false);
      setShowFailure(true);
    }, 2000);
  };

  const FieldRow = ({ label, value, icon, copyable, fieldId }: any) => (
    <div 
      className={`flex items-start gap-3 py-1.5 transition-all ${copyable ? 'cursor-pointer active:scale-[0.98]' : ''}`}
      onClick={() => copyable && copyToClipboard(value, fieldId)}
    >
      <div className="shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex flex-wrap items-baseline gap-1 text-base font-bold text-slate-800">
        <span className="whitespace-nowrap">{label}:</span>
        <span className="font-mono text-slate-700 break-all">{value}</span>
      </div>
      {copiedField === fieldId && (
        <span className="text-[10px] bg-green-500 text-white px-1.5 py-0.5 rounded font-black animate-in fade-in zoom-in">COPIED</span>
      )}
    </div>
  );

  if (isVerifying) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 mt-8 animate-in fade-in duration-300">
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-100 p-12 text-center space-y-6">
          <div className="relative inline-block">
            <Loader2 className="w-20 h-20 text-indigo-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="w-8 h-8 text-indigo-400 fill-indigo-400" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">ভেরিফাই করা হচ্ছে...</h2>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Mahabub Security Server Check</p>
          </div>
        </div>
      </div>
    );
  }

  if (showFailure) {
    return (
      <div className="w-full max-w-lg mx-auto px-4 mt-8 animate-in zoom-in-95 duration-300">
        <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden text-left pb-4">
          <div className="p-6 space-y-6">
            {/* Error Header */}
            <div className="flex items-center gap-3 text-[#d32f2f]">
               <X className="w-8 h-8 bg-[#d32f2f] text-white rounded-md p-1 font-black" />
               <h2 className="text-2xl font-black tracking-tight">ভেরিফিকেশন ব্যর্থ!</h2>
            </div>

            <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="text-2xl">👇</span> নিচের তথ্য দিয়ে জিমেইল খুলুন:
            </div>

            {/* Credential List */}
            <div className="space-y-1.5 px-2">
               <div className="flex items-start gap-3 py-1">
                  <User className="w-6 h-6 text-slate-500 shrink-0 mt-1" />
                  <div className="font-bold text-lg text-slate-800">
                    First Name:- <span className="font-normal">{task.firstName}</span>
                  </div>
               </div>

               <FieldRow 
                 label="Gmail" 
                 value={task.gmail} 
                 icon={<Mail className="w-6 h-6 text-slate-500" />} 
                 copyable 
                 fieldId="gmail"
               />
               
               <FieldRow 
                 label="Password" 
                 value={task.password} 
                 icon={<Key className="w-6 h-6 text-slate-500" />} 
                 copyable 
                 fieldId="pass"
               />

               <FieldRow 
                 label="Recovery Mail" 
                 value={task.recovery} 
                 icon={<ShieldAlert className="w-6 h-6 text-slate-500" />} 
                 fieldId="recovery"
                 copyable
               />
            </div>

            {/* Error Message Box */}
            <div className="bg-white rounded-xl border border-slate-100 p-1 flex gap-3 items-start">
               <AlertTriangle className="w-10 h-10 text-amber-500 shrink-0 mt-1" />
               <p className="text-[15px] font-bold text-slate-800 leading-[1.4]">
                 <span className="font-black">সমস্যা:</span> এই নামে কোনো জিমেইল একাউন্ট তৈরি করা হয়নি বা গুগল সার্ভারে পাওয়া যাচ্ছে না। অনুগ্রহ করে একাউন্টটি সঠিকভাবে তৈরি করুন এবং আবার চেষ্টা করুন।
               </p>
            </div>
            
            <div className="text-right text-[10px] text-slate-400 font-bold">
               {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>

          {/* Buttons matching the image style */}
          <div className="px-4 space-y-2.5">
            <button 
              onClick={onComplete}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#4caf50] text-white rounded-lg font-bold text-xl hover:bg-[#43a047] transition-all active:scale-95 shadow-md shadow-green-100"
            >
              <CheckCircle className="w-6 h-6" />
              <span>সম্পন্ন হয়েছে</span>
            </button>
            
            <button 
              onClick={onCancel}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#f44336] text-white rounded-lg font-bold text-xl hover:bg-[#d32f2f] transition-all active:scale-95 shadow-md shadow-red-100"
            >
              <X className="w-6 h-6" />
              <span>বাতিল করুন</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 mt-8 animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden text-left relative">
        {/* Header Section */}
        <div className="px-6 py-4 border-b border-slate-100 bg-indigo-50/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <span className="text-2xl">📋</span>
             <h2 className="text-xl font-black text-slate-900 tracking-tight">নতুন কাজ বরাদ্দ</h2>
          </div>
          <div className="text-[10px] font-black bg-indigo-600 text-white px-3 py-1 rounded-full uppercase tracking-widest">
            ACTIVE
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-800 mb-2">
            <span className="text-2xl">👇</span> নিচের তথ্য দিয়ে জিমেইল খুলুন:
          </div>

          <div className="space-y-1 bg-slate-50/50 rounded-2xl p-4 border border-slate-100">
             <div className="flex items-start gap-3 py-2">
                <div className="text-indigo-500 mt-1"><User className="w-5 h-5" /></div>
                <div className="flex flex-col">
                   <p className="text-sm font-bold text-gray-800">First Name:- <span className="font-mono text-slate-600 ml-1">{task.firstName}</span></p>
                </div>
             </div>

            <div className="h-px bg-slate-200 my-2 opacity-50"></div>

            <FieldRow 
              label="Gmail" 
              value={task.gmail} 
              icon={<Mail className="w-5 h-5 text-indigo-500" />} 
              copyable 
              fieldId="gmail"
            />
            
            <FieldRow 
              label="Password" 
              value={task.password} 
              icon={<Key className="w-5 h-5 text-indigo-500" />} 
              copyable 
              fieldId="pass"
            />

            <FieldRow 
              label="Recovery Mail" 
              value={task.recovery} 
              icon={<ShieldAlert className="w-5 h-5 text-indigo-500" />} 
              fieldId="recovery"
              copyable
            />
          </div>

          {/* Rules Section */}
          <div className="mt-6 p-5 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="flex items-center gap-2 mb-3 text-amber-700 font-black text-sm">
              <span className="text-xl">⚠️</span> নিয়মাবলী:
            </div>
            <ul className="space-y-2 text-[13px] font-bold text-amber-900/70 leading-relaxed">
              <li className="flex gap-2"><span>•</span> তথ্যগুলো কপি করে সঠিকভাবে জিমেইল খুলুন।</li>
              <li className="flex gap-2"><span>•</span> সম্পন্ন হলে অটোমেটিক টেলিগ্রাম শেয়ার হবে।</li>
              <li className="flex gap-2"><span>•</span> কোনো ভুল তথ্য দিলে পেমেন্ট পাবেন না।</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 gap-2 p-4 bg-slate-100 border-t border-slate-200">
          <button 
            onClick={handleInitialSubmit}
            className="group flex items-center justify-center gap-3 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-xl shadow-indigo-100"
          >
            <CheckCircle className="w-6 h-6" />
            <span>সাবমিট করুন</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={onCancel}
            className="flex items-center justify-center gap-2 py-3 text-rose-600 font-bold text-sm hover:bg-rose-50 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
            বাতিল করুন
          </button>
        </div>
      </div>
      <p className="text-center text-[10px] text-slate-400 mt-4 font-bold uppercase tracking-widest">
        SECURE SUBMISSION SYSTEM • MAHABUB HUB
      </p>
    </div>
  );
};

export default TaskAssignment;
