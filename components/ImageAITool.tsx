
import React, { useState, useRef } from 'react';
import { Upload, Wand2, RefreshCw, Download, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { editImageWithAI } from '../services/geminiService';

const ImageAITool: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('');
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImage(base64);
        setMimeType(file.type);
        setResultImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProcess = async () => {
    if (!image || !prompt) return;
    
    setIsProcessing(true);
    setError(null);
    try {
      const edited = await editImageWithAI(image, mimeType, prompt);
      setResultImage(edited);
    } catch (err: any) {
      setError("حدث خطأ أثناء معالجة الصورة. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadResult = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = 'edited-by-codeai.png';
    link.click();
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-white/5 bg-white/5">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Wand2 className="text-indigo-400" />
          معمل تعديل الصور بالذكاء الاصطناعي
        </h2>
        <p className="text-slate-400 text-sm mt-1">ارفع صورة واطلب من Gemini تعديلها (مثال: "أضف فلتراً قديماً" أو "اجعلها بأسلوب السايبربانك")</p>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">الصورة الأصلية</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`aspect-video rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
              ${image ? 'border-indigo-500/50' : 'border-slate-700 hover:border-indigo-500/50 hover:bg-white/5'}`}
          >
            {image ? (
              <img src={image} className="w-full h-full object-cover" alt="Original" />
            ) : (
              <>
                <Upload className="w-10 h-10 text-slate-600 mb-2" />
                <span className="text-sm text-slate-500">اختر صورة للبدء</span>
              </>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*" 
              onChange={handleFileUpload} 
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">وصف التعديل المطلوب</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="مثلاً: 'حول الصورة إلى لوحة زيتية' أو 'أزل الخلفية'..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all h-24"
            />
          </div>

          <button
            onClick={handleProcess}
            disabled={!image || !prompt || isProcessing}
            className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all
              ${!image || !prompt || isProcessing 
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25'}`}
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                جاري المعالجة...
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                تطبيق السحر
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-slate-300">النتيجة</label>
          <div className="aspect-video rounded-xl border border-slate-700 bg-slate-900 flex flex-col items-center justify-center overflow-hidden">
            {resultImage ? (
              <img src={resultImage} className="w-full h-full object-cover animate-fade-in" alt="Result" />
            ) : (
              <div className="text-center p-6">
                <ImageIcon className="w-12 h-12 text-slate-800 mx-auto mb-2" />
                <p className="text-slate-600 text-sm">ستظهر الصورة المعدلة هنا بعد المعالجة</p>
              </div>
            )}
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}

          {resultImage && (
            <button
              onClick={downloadResult}
              className="w-full py-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-600/30 font-bold flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-5 h-5" />
              تحميل الصورة المعدلة
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageAITool;
