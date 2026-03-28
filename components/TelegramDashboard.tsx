
import React from 'react';
import { 
  CircleDollarSign, User, Link2, Landmark, 
  Megaphone, LifeBuoy, Tag, PlayCircle, History
} from 'lucide-react';

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
  emoji: string;
  onClick: () => void;
  className?: string;
}

const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, emoji, onClick, className = "" }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-4 p-5 bg-white border border-gray-100 rounded-2xl hover:border-transparent hover:shadow-xl hover:-translate-y-1 transition-all active:scale-[0.95] group relative overflow-hidden ${className}`}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="flex items-center justify-center w-12 h-12 rounded-xl transition-all relative z-10 group-hover:scale-110 shadow-sm">
      {icon}
    </div>
    <div className="flex flex-col items-start text-left relative z-10">
      <div className="flex items-center gap-2">
        <span className="text-xl group-hover:animate-bounce">{emoji}</span>
        <span className="text-[13px] font-black text-gray-800 uppercase tracking-tight group-hover:text-indigo-600 transition-colors">{label}</span>
      </div>
    </div>
    <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all">
      <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
        <PlayCircle className="w-3 h-3 rotate-[-90deg]" />
      </div>
    </div>
  </button>
);

interface TelegramDashboardProps {
  onSell: () => void;
  onAccount: () => void;
  onReferral: () => void;
  onWithdraw: () => void;
  onSupport: () => void;
  onPrices: () => void;
  onTutorial: () => void;
  onRestore: () => void;
}

const TelegramDashboard: React.FC<TelegramDashboardProps> = ({
  onSell, onAccount, onReferral, onWithdraw, onSupport, onPrices, onTutorial, onRestore
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto w-full px-4">
      {/* Row 1 */}
      <MenuButton 
        emoji="💰" 
        label="জিমেইল বিক্রি করুন" 
        icon={<div className="bg-emerald-100 text-emerald-600 p-3 rounded-xl"><CircleDollarSign className="w-6 h-6" /></div>} 
        onClick={onSell} 
        className="border-l-4 border-l-emerald-500"
      />
      <MenuButton 
        emoji="👤" 
        label="MY ACCOUNT" 
        icon={<div className="bg-blue-100 text-blue-600 p-3 rounded-xl"><User className="w-6 h-6" /></div>} 
        onClick={onAccount} 
        className="border-l-4 border-l-blue-500"
      />
      
      {/* Row 2 */}
      <MenuButton 
        emoji="🔗" 
        label="REFERRAL" 
        icon={<div className="bg-purple-100 text-purple-600 p-3 rounded-xl"><Link2 className="w-6 h-6" /></div>} 
        onClick={onReferral} 
        className="border-l-4 border-l-purple-500"
      />
      <MenuButton 
        emoji="💸" 
        label="WITHDRAW" 
        icon={<div className="bg-amber-100 text-amber-600 p-3 rounded-xl"><Landmark className="w-6 h-6" /></div>} 
        onClick={onWithdraw} 
        className="border-l-4 border-l-amber-500"
      />
      
      {/* Row 3 */}
      <MenuButton 
        emoji="📢" 
        label="CHANNEL" 
        icon={<div className="bg-rose-100 text-rose-600 p-3 rounded-xl"><Megaphone className="w-6 h-6" /></div>} 
        onClick={() => window.open('https://t.me/TRUSTED_ACCOUNT_BUYER', '_blank')} 
        className="border-l-4 border-l-rose-500"
      />
      <MenuButton 
        emoji="🆘" 
        label="SUPPORT" 
        icon={<div className="bg-cyan-100 text-cyan-600 p-3 rounded-xl"><LifeBuoy className="w-6 h-6" /></div>} 
        onClick={onSupport} 
        className="border-l-4 border-l-cyan-500"
      />
      
      {/* Row 4 */}
      <MenuButton 
        emoji="🏷️" 
        label="PRICES" 
        icon={<div className="bg-orange-100 text-orange-600 p-3 rounded-xl"><Tag className="w-6 h-6" /></div>} 
        onClick={onPrices} 
        className="border-l-4 border-l-orange-500"
      />
      <MenuButton 
        emoji="🎬" 
        label="TUTORIAL" 
        icon={<div className="bg-indigo-100 text-indigo-600 p-3 rounded-xl"><PlayCircle className="w-6 h-6" /></div>} 
        onClick={onTutorial} 
        className="border-l-4 border-l-indigo-500"
      />

      {/* Row 5 - Gmail Restore */}
      <MenuButton 
        emoji="🔄" 
        label="GMAIL RESTORE" 
        icon={<div className="bg-violet-600 text-white p-3 rounded-xl shadow-lg shadow-violet-200"><History className="w-6 h-6" /></div>} 
        onClick={onRestore} 
        className="sm:col-span-2 bg-gradient-to-r from-violet-50 to-white border-violet-200"
      />
    </div>
  );
};

export default TelegramDashboard;
