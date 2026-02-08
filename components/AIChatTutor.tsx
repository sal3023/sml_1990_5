
import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, Bot, Sparkles, Trash2, Maximize2, 
  Terminal, Lightbulb, Code, BookOpen, 
  ChevronLeft, Copy, Check
} from 'lucide-react';
import { chatWithTutor } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChatTutor: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = async (customMsg?: string) => {
    const msgToSend = customMsg || input;
    if (!msgToSend.trim() || isTyping) return;

    const userMsg = msgToSend.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      const response = await chatWithTutor(userMsg);
      setMessages(prev => [...prev, { role: 'model', text: response || '' }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'model', text: '⚠️ حدث خطأ في النظام الذكي. يرجى المحاولة لاحقاً.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(index);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const QuickPrompt = ({ icon: Icon, text, onClick }: any) => (
    <button 
      onClick={onClick}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all text-[11px] font-bold text-slate-400 hover:text-indigo-300"
    >
      <Icon size={14} />
      {text}
    </button>
  );

  return (
    <div className={`glass-card rounded-[2.5rem] flex flex-col transition-all duration-500 overflow-hidden border-indigo-500/20 shadow-2xl shadow-indigo-500/5 ${isExpanded ? 'fixed inset-4 z-[100] h-auto' : 'h-[650px] relative'}`}>
      
      {/* Header with Glassmorphism and Glow */}
      <div className="p-6 bg-gradient-to-r from-indigo-600/10 via-purple-600/5 to-transparent border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-indigo-500 blur-lg opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl">
              <Bot className="w-7 h-7" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full animate-pulse"></div>
          </div>
          <div>
            <h3 className="text-base font-black tracking-tight flex items-center gap-2">
              المستشار الذكي (CodeAI)
              <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-[9px] text-indigo-400 font-black uppercase">PRO 3.0</span>
            </h3>
            <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1.5">
              <span className="w-1 h-1 bg-emerald-500 rounded-full"></span>
              متاح الآن لتحليل الكود وشرح المفاهيم
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button onClick={() => setMessages([])} className="p-2.5 text-slate-500 hover:text-red-400 transition-colors rounded-xl hover:bg-white/5">
            <Trash2 size={18} />
          </button>
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-2.5 text-slate-500 hover:text-indigo-400 transition-colors rounded-xl hover:bg-white/5">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-500/5 flex items-center justify-center border border-indigo-500/10 float-animation">
              <Sparkles className="w-10 h-10 text-indigo-400" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-black text-white">أهلاً بك في كوداي!</h4>
              <p className="text-sm text-slate-500 max-w-[280px] font-medium leading-relaxed">
                أنا رفيقك في رحلة احتراف البرمجة. يمكنني مساعدتك في أي شيء من كتابة أول كود لك إلى بنية الأنظمة المعقدة.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
              <QuickPrompt icon={Terminal} text="شرح كود بايثون" onClick={() => handleSend("ممكن تشرح لي كيف تعمل الـ Decorators في بايثون؟")} />
              <QuickPrompt icon={Lightbulb} text="أفكار مشاريع" onClick={() => handleSend("أعطني 3 أفكار مشاريع AI للمبتدئين")} />
              <QuickPrompt icon={Code} text="تصحيح أخطاء" onClick={() => handleSend("عندي خطأ في React، كيف أصلحه؟")} />
              <QuickPrompt icon={BookOpen} text="مسار تعلم" onClick={() => handleSend("ما هو أفضل مسار لتعلم معالجة اللغات الطبيعية؟")} />
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'} group`}>
            <div className={`relative max-w-[85%] transition-all duration-300 ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-[1.5rem] rounded-tr-none px-5 py-4 shadow-lg shadow-indigo-600/10' 
                : 'bg-slate-900/80 border border-white/5 text-slate-200 rounded-[1.5rem] rounded-tl-none px-6 py-5 backdrop-blur-xl'
            }`}>
              
              {/* Message Content with Custom Code Rendering */}
              <div className="prose prose-invert prose-sm max-w-none font-medium leading-relaxed whitespace-pre-wrap">
                {msg.text}
              </div>

              {/* Action Toolbar for AI Messages */}
              {msg.role === 'model' && (
                <div className="absolute -bottom-6 left-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => copyToClipboard(msg.text, i)}
                    className="p-1.5 rounded-lg bg-slate-800 border border-white/5 text-[10px] font-bold flex items-center gap-1 hover:text-indigo-400 transition-colors"
                  >
                    {copiedId === i ? <Check size={12} /> : <Copy size={12} />}
                    {copiedId === i ? 'تم النسخ' : 'نسخ'}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-end">
            <div className="bg-slate-900/50 rounded-[1.5rem] rounded-tl-none px-6 py-5 border border-white/5 flex flex-col gap-3">
              <div className="flex gap-2 items-center text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping"></div>
                جاري التفكير برمجياً...
              </div>
              <div className="flex gap-1.5">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Section - Innovative Minimalist Design */}
      <div className="p-6 bg-slate-950/40 border-t border-white/5">
        <div className="relative flex items-center gap-4 bg-slate-900/80 rounded-[2rem] p-2 pr-6 border border-white/10 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل كوداي عن أي شيء برمجياً..."
            className="flex-1 bg-transparent py-4 text-sm font-bold outline-none placeholder:text-slate-600"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim() || isTyping}
            className="p-4 bg-indigo-600 rounded-full hover:bg-indigo-500 disabled:opacity-30 transition-all shadow-xl shadow-indigo-600/20 active:scale-90"
          >
            <Send className="w-5 h-5 text-white transform rotate-180" />
          </button>
        </div>
        <p className="mt-4 text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest">
           مدعوم بنظام تفكير Gemini 3 Pro المتطور للحصول على أعلى دقة برمجية
        </p>
      </div>
    </div>
  );
};

export default AIChatTutor;
