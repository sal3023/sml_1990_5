import React from 'react';
import { MessageSquare, Send } from 'lucide-react';

const AIChatTutor: React.FC = () => {
  return (
    <div className="glass-card p-8 rounded-[3rem] flex flex-col h-full">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-2xl bg-pink-500/10 text-pink-400">
          <MessageSquare size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black">مساعد الدردشة الذكي</h2>
          <p className="text-slate-500 text-sm">احصل على مساعدة فورية من Gemini</p>
        </div>
      </div>
      
      <div className="flex-1 bg-slate-900/30 rounded-2xl p-6 mb-6 overflow-y-auto custom-scrollbar">
        {/* Chat messages would go here */}
        <div className="text-center text-slate-600 text-sm font-medium">ابدأ محادثة مع معلمك الافتراضي...</div>
      </div>

      <div className="flex items-center gap-4">
        <input 
          type="text" 
          placeholder="اسأل معلمك الافتراضي..." 
          className="flex-1 bg-slate-900/50 border border-white/5 rounded-2xl px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500/30 transition-all placeholder:text-slate-600 font-medium"
        />
        <button className="p-3 bg-pink-600 rounded-2xl hover:bg-pink-500 transition-all active:scale-95 shadow-lg shadow-pink-600/20">
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AIChatTutor;
