import React from 'react';
import { ShoppingBag, Settings, Headset, CircleDot } from 'lucide-react';
import { ViewState } from '../types.ts';

interface NavbarProps {
  currentView: ViewState;
  onViewChange: (view: ViewState) => void;
  orderCount: number;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange, orderCount }) => {
  const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/G07De5sgX8IKOldlP1NeGc?mode=gi_t";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-xl border-b border-indigo-50/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onViewChange('store')}>
            <div className="bg-gradient-to-br from-indigo-600 to-violet-600 p-2 rounded-2xl group-hover:rotate-12 transition-all shadow-lg shadow-indigo-200">
              <CircleDot className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-slate-900 leading-none">MAHABUB</span>
              <span className="text-[10px] font-black tracking-[0.3em] text-indigo-500 uppercase leading-none mt-1">Trusted Hub</span>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <button 
              onClick={() => onViewChange('store')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-black transition-all rounded-2xl uppercase tracking-widest ${
                currentView === 'store' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Store
            </button>
            
            <a 
              href={WHATSAPP_GROUP_URL} 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 px-5 py-2.5 text-sm font-black text-slate-500 hover:bg-slate-50 hover:text-indigo-600 rounded-2xl transition-all uppercase tracking-widest"
            >
              <Headset className="w-4 h-4" />
              Support
            </a>

            <div className="h-8 w-px bg-slate-100 mx-2" />

            <button 
              onClick={() => onViewChange('admin')}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-black transition-all rounded-2xl relative uppercase tracking-widest ${
                currentView === 'admin' 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-indigo-600'
              }`}
            >
              <Settings className="w-4 h-4" />
              Admin
              {orderCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-black text-white animate-bounce shadow-lg border-2 border-white">
                  {orderCount}
                </span>
              )}
            </button>
          </div>

          <div className="md:hidden flex items-center">
            <button 
              onClick={() => onViewChange('admin')}
              className="p-3 text-slate-500 hover:text-indigo-600 bg-slate-50 rounded-2xl relative transition-all active:scale-90"
            >
              <Settings className="w-6 h-6" />
              {orderCount > 0 && (
                <span className="absolute top-2 right-2 h-3 w-3 bg-rose-500 rounded-full border-2 border-white shadow-sm"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;