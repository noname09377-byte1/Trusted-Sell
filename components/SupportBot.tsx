
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { geminiService } from './gemini.ts';
import { ChatMessage } from '../types.ts';

interface SupportBotProps {
  isVisible: boolean;
  onClose: () => void;
  initialMessage?: string;
}

const SupportBot: React.FC<SupportBotProps> = ({ isVisible, onClose, initialMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', content: "Assalamu Alaikum! How can I help you today? You can submit your Gmail accounts here or ask about withdrawals." }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && initialMessage) {
      handleSend(initialMessage);
    }
  }, [isVisible, initialMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (text?: string) => {
    const messageToSend = text || inputValue;
    if (!messageToSend.trim() || isTyping) return;

    const userMsg = messageToSend.trim();
    if (!text) setInputValue('');
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    const response = await geminiService.getChatResponse(messages, userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', content: response }]);
  };

  if (!isVisible) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[600px]">
        {/* Chat Header */}
        <div className="bg-indigo-600 p-6 flex items-center justify-between text-white">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <p className="font-black text-lg tracking-tight uppercase">Admin Support & Submission</p>
              <p className="text-xs text-indigo-100 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                LIVE AGENT CONNECTED
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-xs font-black bg-white/10 px-4 py-2 rounded-xl hover:bg-white/20 transition-all uppercase tracking-widest"
          >
            Close Chat
          </button>
        </div>

        {/* Messages Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/50 scroll-smooth">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
              <div className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-tr-none' 
                  : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-1 opacity-60">
                  {msg.role === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                  <span className="text-[10px] font-black uppercase tracking-widest">
                    {msg.role === 'user' ? 'You' : 'Admin'}
                  </span>
                </div>
                <p className="text-sm font-medium leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border border-gray-100 p-4 rounded-3xl rounded-tl-none shadow-sm">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce delay-75"></span>
                  <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-150"></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Large Input Area */}
        <div className="p-6 bg-white border-t">
          <div className="relative group">
            <textarea 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="আপনার মেসেজ বা জিমেইল লিস্ট এখানে লিখুন..."
              className="w-full h-32 p-5 bg-gray-100 border-2 border-transparent rounded-2xl outline-none focus:border-indigo-600 focus:bg-white transition-all text-gray-800 placeholder-gray-400 font-medium resize-none text-base"
            />
            <button 
              onClick={() => handleSend()}
              disabled={!inputValue.trim()}
              className="absolute bottom-4 right-4 p-4 bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 disabled:opacity-50 transition-all active:scale-90 shadow-xl shadow-indigo-100"
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center justify-between mt-4 px-2">
            <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              AI Powered Support System
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Shift + Enter for new line
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportBot;
