
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.tsx';
import AdminDashboard from './components/AdminDashboard.tsx';
import SupportBot from './components/SupportBot.tsx';
import TelegramDashboard from './components/TelegramDashboard.tsx';
import TaskAssignment from './components/TaskAssignment.tsx';
import WelcomeMessage from './components/WelcomeMessage.tsx';
import Login from './components/Login.tsx';
import GmailRestorePanel from './components/GmailRestorePanel.tsx';
import { AccountModal, ReferralModal, PricesModal, TutorialModal } from './components/Modals.tsx';
import { Order, ViewState, Task } from './types.ts';
import { Star, Zap, CheckCircle, X, Ban } from 'lucide-react';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<ViewState>('store');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isRestoreOpen, setIsRestoreOpen] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [usedGmails, setUsedGmails] = useState<string[]>([]);
  
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'cancel'>('success');
  const [toastMessage, setToastMessage] = useState({ title: '', sub: '', detail: '' });
  
  // Task state
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);

  // Chat integration state
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [chatInitialMessage, setChatInitialMessage] = useState('');

  // Modal states
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isReferralOpen, setIsReferralOpen] = useState(false);
  const [isPricesOpen, setIsPricesOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  const SUBMISSION_CHANNEL_LINK = "https://t.me/+R6VyXUcmkZg2YjNl";

  useEffect(() => {
    const savedName = localStorage.getItem('croma_user_name');
    if (savedName) setUserName(savedName);

    const savedOrders = localStorage.getItem('croma_orders');
    if (savedOrders) setOrders(JSON.parse(savedOrders));

    const savedGmails = localStorage.getItem('croma_used_gmails');
    if (savedGmails) setUsedGmails(JSON.parse(savedGmails));
  }, []);

  useEffect(() => {
    localStorage.setItem('croma_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('croma_used_gmails', JSON.stringify(usedGmails));
  }, [usedGmails]);

  const handleLogin = (name: string) => {
    setUserName(name);
    localStorage.setItem('croma_user_name', name);
  };

  const handleLogout = () => {
    setUserName(null);
    localStorage.removeItem('croma_user_name');
    setIsAccountOpen(false);
  };

  const handleSellClick = () => {
    setShowWelcome(true);
    setActiveTask(null);
    setIsChatVisible(false);
  };

  const generateNewTask = () => {
    const firstNames = ['Cory', 'Ryan', 'Liam', 'Noah', 'James', 'Oliver', 'Lucas', 'Mason', 'Ethan', 'Logan'];
    const prefixes = ['jatogivov', 'nexilo', 'vunap', 'zider', 'polima', 'murex', 'kinop', 'tewab'];
    
    let gmail = '';
    let attempts = 0;
    while (attempts < 1000) {
      const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomNum = Math.floor(Math.random() * 9999999) + 1000;
      const candidate = `${prefix}${randomNum}@gmail.com`;
      if (!usedGmails.includes(candidate)) {
        gmail = candidate;
        break;
      }
      attempts++;
    }

    const newTask: Task = {
      id: Math.random().toString(36).substr(2, 9),
      firstName: firstNames[Math.floor(Math.random() * firstNames.length)],
      lastName: '',
      gmail: gmail || `user${Date.now()}@gmail.com`,
      password: Math.random().toString(36).slice(-10) + "!",
      recovery: 'panelsajibyt@gmail.com', 
      assignedAt: Date.now()
    };

    setActiveTask(newTask);
    setShowWelcome(false);
  };

  const handleTaskComplete = () => {
    if (!activeTask) return;
    
    const submissionText = `
🚀 **GMAIL SUBMISSION** 🚀
━━━━━━━━━━━━━━━━━━
👤 **Seller:** ${userName}
📧 **Account:** \`${activeTask.gmail}\`
🔑 **Password:** \`${activeTask.password}\`
🛡️ **Recovery:** \`${activeTask.recovery}\`
━━━━━━━━━━━━━━━━━━
✅ *Submitted via Mahabub System*
`;
    
    navigator.clipboard.writeText(submissionText).then(() => {
      setOrders([{
        id: Math.random().toString(36).substr(2, 9),
        serviceId: 'gmail-sell',
        serviceName: 'Gmail Submission',
        quantity: 1,
        paymentMethod: 'Task System',
        customerName: userName || 'User',
        customerHandle: '@seller',
        details: submissionText,
        status: 'pending',
        createdAt: Date.now(),
      }, ...orders]);
      
      setUsedGmails(prev => [...prev, activeTask.gmail]);
      setActiveTask(null);
      setToastType('success');
      setToastMessage({ 
        title: 'তথ্য কপি হয়েছে!', 
        sub: 'সাবমিশন তথ্য আপনার ক্লিপবোর্ডে কপি করা হয়েছে।', 
        detail: 'এখন আমাদের চ্যানেলে গিয়ে পেস্ট করুন।' 
      });
      setShowToast(true);
      setTimeout(() => setShowToast(false), 8000);
    });
  };

  const handleTaskCancel = () => {
    setActiveTask(null);
    setToastType('cancel');
    setToastMessage({ title: 'কাজটি বাতিল করা হয়েছে!', sub: 'কাজটি এখন অন্য ইউজারদের জন্য উন্মুক্ত।', detail: '' });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 6000);
  };

  const openChatWithContext = (msg: string) => {
    setChatInitialMessage(msg);
    setIsChatVisible(true);
    setActiveTask(null);
    setShowWelcome(false);
  };

  if (!userName) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-200/30 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-rose-200/20 blur-[100px] rounded-full animate-pulse delay-1000" />
      </div>

      <Navbar 
        currentView={currentView} 
        onViewChange={(view) => view === 'admin' ? setIsAdminOpen(true) : setCurrentView(view)} 
        orderCount={orders.filter(o => o.status === 'pending').length}
      />

      <main className="flex-1 relative z-10 pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <section className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[40px] p-6 md:p-10 shadow-2xl shadow-slate-200/50 mb-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-100 text-indigo-600 text-xs font-black uppercase tracking-widest mb-8 shadow-sm">
                <Star className="w-3 h-3 fill-indigo-600" />
                Trusted Admin Dashboard BD
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
                {userName.split(' ')[0]} Hub <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-sky-500 to-emerald-500">
                  Gmail Auto Sender
                </span>
              </h1>

              <div className="mb-10">
                <TelegramDashboard 
                  onSell={handleSellClick}
                  onAccount={() => setIsAccountOpen(true)}
                  onReferral={() => setIsReferralOpen(true)}
                  onWithdraw={() => openChatWithContext('আমি পেমেন্ট উইথড্র করতে চাই।')}
                  onSupport={() => window.open(SUBMISSION_CHANNEL_LINK, '_blank')}
                  onPrices={() => setIsPricesOpen(true)}
                  onTutorial={() => setIsTutorialOpen(true)}
                  onRestore={() => setIsRestoreOpen(true)}
                />
              </div>

              {showWelcome && !activeTask && (
                <div className="animate-in zoom-in-95 duration-500">
                  <WelcomeMessage 
                    userName={userName}
                    onStart={generateNewTask} 
                    onClose={() => setShowWelcome(false)}
                  />
                </div>
              )}

              {activeTask && (
                <div className="animate-in zoom-in-95 duration-500 mt-10">
                  <div className="flex items-center gap-3 mb-6 px-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-slate-900">Active Task</h3>
                  </div>
                  <TaskAssignment 
                    task={activeTask} 
                    onComplete={handleTaskComplete} 
                    onCancel={handleTaskCancel} 
                  />
                </div>
              )}

              {!activeTask && !showWelcome && (
                <div id="support-chat" className="mt-10">
                  <SupportBot 
                    isVisible={isChatVisible} 
                    onClose={() => setIsChatVisible(false)}
                    initialMessage={chatInitialMessage}
                  />
                </div>
              )}
            </div>
          </section>
        </div>
      </main>

      <AdminDashboard 
        isOpen={isAdminOpen}
        orders={orders} 
        onUpdateStatus={(id, status) => setOrders(orders.map(o => o.id === id ? { ...o, status } : o))} 
        onDeleteOrder={(id) => confirm('Delete order?') && setOrders(orders.filter(o => o.id !== id))} 
        onClose={() => setIsAdminOpen(false)}
      />

      <GmailRestorePanel
        isOpen={isRestoreOpen}
        orders={orders}
        onDeleteOrder={(id) => setOrders(orders.filter(o => o.id !== id))}
        onClose={() => setIsRestoreOpen(false)}
      />

      {isAccountOpen && (
        <AccountModal 
          onClose={() => setIsAccountOpen(false)} 
          orders={orders} 
          userName={userName || ''} 
          onLogout={handleLogout}
        />
      )}
      {isReferralOpen && <ReferralModal onClose={() => setIsReferralOpen(false)} />}
      {isPricesOpen && <PricesModal onClose={() => setIsPricesOpen(false)} />}
      {isTutorialOpen && <TutorialModal onClose={() => setIsTutorialOpen(false)} />}

      {showToast && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-10 duration-500 w-full max-w-sm px-4">
          <div className="bg-slate-900/90 backdrop-blur-xl text-white px-6 py-5 rounded-[32px] shadow-2xl flex items-center gap-4 border border-white/10">
            <div className={`${toastType === 'success' ? 'bg-emerald-500' : 'bg-red-500'} p-3 rounded-2xl shrink-0 shadow-lg`}>
              {toastType === 'success' ? <CheckCircle className="w-6 h-6 text-white" /> : <Ban className="w-6 h-6 text-white" />}
            </div>
            <div className="flex-1 text-left">
              <p className="font-black leading-none mb-1 text-sm">{toastMessage.title}</p>
              <p className="text-xs text-slate-400 leading-tight">{toastMessage.sub}</p>
              <p className="text-[10px] text-indigo-400 font-black mt-1 uppercase tracking-widest">{toastMessage.detail}</p>
            </div>
            <button onClick={() => setShowToast(false)} className="ml-auto p-2 hover:bg-white/10 rounded-xl shrink-0 transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
