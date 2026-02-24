import React from 'react';
import { Wand2 } from 'lucide-react';

const ImageAITool: React.FC = () => {
  return (
    <div className="glass-card p-8 rounded-[3rem] flex flex-col items-start justify-between h-full relative overflow-hidden">
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest mb-4">
          <Wand2 size={16} /> أداة الذكاء الاصطناعي للصور
        </div>
        <h2 className="text-3xl font-black mb-3 leading-tight">حول أفكارك إلى <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">صور مذهلة</span></h2>
        <p className="text-slate-400 max-w-md text-base font-medium mb-8">استخدم قوة Gemini لإنشاء صور فريدة من النصوص أو تحويل صورك الحالية.</p>
        <button className="px-8 py-4 bg-purple-600 rounded-2xl font-black text-lg hover:bg-purple-500 transition-all shadow-lg shadow-purple-600/20 active:scale-95">
          ابدأ التصميم
        </button>
      </div>
      <img 
        src="https://picsum.photos/seed/imageai/1200/800?blur=5"
        alt="AI Image Generation"
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

export default ImageAITool;
