
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Terminal, BrainCircuit, Rocket, LayoutDashboard, Settings, 
  UserCircle, BookOpen, ChevronDown, ChevronRight, Bell, 
  X, Info, CheckCircle, AlertTriangle, RefreshCw, Filter, SortAsc, Search,
  Zap, Trophy, Target, Award, Sparkles, Layers
} from 'lucide-react';
import CourseCard from './components/CourseCard';
import ImageAITool from './components/ImageAITool';
import AIChatTutor from './components/AIChatTutor';
import { COURSES } from './constants';
import { Notification, Course } from './types';

interface NavSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

const NavSection: React.FC<NavSectionProps> = ({ title, children, isOpen, onToggle }) => (
  <div className="mb-6">
    <button 
      onClick={onToggle}
      className="flex items-center justify-between w-full px-4 py-2 text-[11px] font-extrabold text-slate-500 uppercase tracking-[0.2em] hover:text-slate-300 transition-colors group"
    >
      <span>{title}</span>
      {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
    </button>
    {isOpen && (
      <div className="mt-2 space-y-1 px-2 animate-in fade-in slide-in-from-top-1 duration-200">
        {children}
      </div>
    )}
  </div>
);

const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <a href="#" className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${active ? 'bg-indigo-600/10 text-indigo-400 border-r-2 border-indigo-500 shadow-sm shadow-indigo-500/5' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'}`}>
    {icon}
    <span className="font-semibold text-sm">{label}</span>
  </a>
);

const QuickStat = ({ icon: Icon, label, value, color }: { icon: any, label: string, value: string, color: string }) => (
  <div className="glass-card p-5 rounded-[2rem] flex items-center gap-4 group">
    <div className={`p-3 rounded-2xl bg-${color}-500/10 text-${color}-400 group-hover:scale-110 transition-transform`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{label}</p>
      <p className="text-xl font-black">{value}</p>
    </div>
  </div>
);

const App: React.FC = () => {
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({
    main: true,
    tools: true,
    account: true
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const addNotification = useCallback((message: string, type: Notification['type'] = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => setNotifications(prev => prev.filter(n => n.id !== id)), 5000);
  }, []);

  const removeNotification = (id: string) => setNotifications(prev => prev.filter(n => n.id !== id));
  const toggleSection = (section: string) => setCollapsedSections(prev => ({ ...prev, [section]: !prev[section] }));

  useEffect(() => {
    const timer = setTimeout(() => addNotification('تم تحديث المحتوى التعليمي للذكاء الاصطناعي بنجاح.', 'success'), 1500);
    return () => clearTimeout(timer);
  }, [addNotification]);

  const filteredAndSortedCourses = useMemo(() => {
    let result = [...COURSES];
    if (searchQuery) {
      result = result.filter(c => c.title.includes(searchQuery) || c.description.includes(searchQuery));
    }
    if (filterLevel !== 'all') {
      result = result.filter(c => c.level === filterLevel);
    }
    if (sortBy === 'title') result.sort((a, b) => a.title.localeCompare(b.title, 'ar'));
    else if (sortBy === 'duration') {
      result.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
    }
    return result;
  }, [filterLevel, sortBy, searchQuery]);

  // Counts for filters
  const counts = useMemo(() => ({
    all: COURSES.length,
    beginner: COURSES.filter(c => c.level === 'مبتدئ').length,
    intermediate: COURSES.filter(c => c.level === 'متوسط').length,
    advanced: COURSES.filter(c => c.level === 'متقدم').length,
  }), []);

  const FilterPill = ({ label, value, count }: { label: string, value: string, count: number }) => (
    <button
      onClick={() => setFilterLevel(value)}
      className={`relative px-6 py-3 rounded-2xl text-sm font-bold transition-all flex items-center gap-3 border ${
        filterLevel === value 
          ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/20' 
          : 'bg-slate-900/50 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/5'
      }`}
    >
      {label}
      <span className={`px-2 py-0.5 rounded-lg text-[10px] ${
        filterLevel === value ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-500'
      }`}>
        {count}
      </span>
    </button>
  );

  return (
    <div className="min-h-screen flex bg-transparent">
      
      {/* Toast Notifications */}
      <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] flex flex-col gap-3 w-full max-w-sm px-6 pointer-events-none">
        {notifications.map((n) => (
          <div key={n.id} className="w-full glass-card p-4 rounded-[1.5rem] shadow-2xl flex items-center gap-4 pointer-events-auto animate-in slide-in-from-top-4 duration-500">
            <div className={`p-2 rounded-full ${n.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
              {n.type === 'success' ? <CheckCircle size={18} /> : <Info size={18} />}
            </div>
            <p className="flex-1 text-sm font-bold">{n.message}</p>
            <button onClick={() => removeNotification(n.id)} className="text-slate-600 hover:text-white"><X size={14} /></button>
          </div>
        ))}
      </div>

      {/* Modern Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col glass-card border-none rounded-none border-l border-white/5 bg-slate-950/40 p-8 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-4 mb-16 shrink-0 group cursor-pointer">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-3 rounded-[1.25rem] shadow-xl shadow-indigo-500/20 group-hover:rotate-6 transition-transform">
            <Terminal className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-2xl font-black tracking-tighter">CodeAI</span>
            <div className="h-1 w-full bg-indigo-500/20 rounded-full mt-1 overflow-hidden">
              <div className="h-full w-2/3 bg-indigo-500"></div>
            </div>
          </div>
        </div>

        <nav className="flex-1">
          <NavSection title="الأكاديمية" isOpen={collapsedSections.main} onToggle={() => toggleSection('main')}>
            <NavItem icon={<LayoutDashboard size={20} />} label="لوحة التحكم" active />
            <NavItem icon={<BookOpen size={20} />} label="المسارات" />
            <NavItem icon={<Trophy size={20} />} label="الإنجازات" />
          </NavSection>

          <NavSection title="الأدوات الذكية" isOpen={collapsedSections.tools} onToggle={() => toggleSection('tools')}>
            <NavItem icon={<BrainCircuit size={20} />} label="مختبر الصور" />
            <NavItem icon={<Zap size={20} />} label="مساعد البرمجة" />
          </NavSection>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <div className="glass-card p-4 rounded-[1.5rem] flex items-center gap-4">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-black text-lg">AH</div>
            <div className="overflow-hidden">
              <p className="text-sm font-black truncate">أحمد حسن</p>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest">خطة الاحتراف</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Container */}
      <main className="flex-1 p-6 lg:p-12 max-w-[1600px] mx-auto w-full">
        
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-2">
              <Sparkles size={12} /> نسخة 2025 المحدثة
            </div>
            <h1 className="text-4xl lg:text-5xl font-black leading-tight">
              تعلم هندسة <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">المستقبل</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-lg font-medium">نحن ندمج أحدث تقنيات Gemini لتمكينك من احتراف البرمجة والذكاء الاصطناعي بشكل تفاعلي.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button onClick={() => addNotification('لا توجد تحديثات جديدة حالياً.', 'info')} className="p-4 glass-card rounded-[1.5rem] hover:text-indigo-400 relative transition-all active:scale-95 group">
              <Bell size={22} />
              <span className="absolute top-4 right-4 w-2 h-2 bg-pink-500 rounded-full border-2 border-[#030712] group-hover:animate-ping"></span>
            </button>
            <div className="h-10 w-px bg-white/5 mx-2 hidden lg:block"></div>
            <button className="flex items-center gap-3 glass-card px-6 py-3 rounded-[1.5rem] font-bold text-sm hover:bg-white/5 transition-all active:scale-95">
              <Settings size={18} /> تخصيص الواجهة
            </button>
          </div>
        </header>

        {/* Quick Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <QuickStat icon={Award} label="نقاط التعلم" value="1,240" color="indigo" />
          <QuickStat icon={Target} label="المسار الحالي" value="85%" color="purple" />
          <QuickStat icon={Zap} label="سرعة الإنجاز" value="متفوق" color="pink" />
          <QuickStat icon={UserCircle} label="رتبة الأكاديمية" value="#12" color="blue" />
        </section>

        {/* AI Powered Section */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-8 mb-16">
          <div className="xl:col-span-8">
            <ImageAITool />
          </div>
          <div className="xl:col-span-4">
            <AIChatTutor />
          </div>
        </section>

        {/* Courses Section */}
        <section className="space-y-12">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div className="space-y-4">
              <h2 className="text-3xl font-black flex items-center gap-4">
                <div className="p-2.5 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <BookOpen size={28} />
                </div>
                مسارات التعلم الذكي
              </h2>
              <p className="text-slate-500 font-medium max-w-lg">استكشف مناهجنا المصممة بعناية لتناسب كافة المستويات، من الصفر حتى الاحتراف.</p>
              
              {/* Modern Filter Pills */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <FilterPill label="الكل" value="all" count={counts.all} />
                <FilterPill label="مبتدئ" value="مبتدئ" count={counts.beginner} />
                <FilterPill label="متوسط" value="متوسط" count={counts.intermediate} />
                <FilterPill label="متقدم" value="متقدم" count={counts.advanced} />
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="relative group flex-1">
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-400 transition-colors" size={20} />
                  <input 
                    type="text"
                    placeholder="ابحث عن مهارة جديدة..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-slate-900/50 border border-white/5 rounded-[1.5rem] pr-14 pl-6 py-4 text-sm w-full lg:w-[400px] outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500/30 transition-all placeholder:text-slate-600 font-bold"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/10 rounded-full text-slate-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
                
                <button 
                  onClick={() => setSortBy(sortBy === 'title' ? 'default' : 'title')}
                  className={`p-4 rounded-[1.5rem] transition-all flex items-center gap-2 border ${
                    sortBy === 'title' 
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                    : 'bg-slate-900/50 border-white/5 text-slate-500 hover:text-white'
                  }`}
                  title="ترتيب أبجدي"
                >
                  <SortAsc size={22} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Info */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-600 uppercase tracking-widest px-4">
            <div className="flex items-center gap-2">
              <Layers size={14} />
              عرض {filteredAndSortedCourses.length} مسار تعليمي
            </div>
            {filterLevel !== 'all' && (
              <button 
                onClick={() => setFilterLevel('all')}
                className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
              >
                مسح التصفية <X size={10} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAndSortedCourses.length > 0 ? (
              filteredAndSortedCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <div className="col-span-full glass-card rounded-[3rem] p-20 text-center flex flex-col items-center justify-center border-dashed border-slate-800">
                <div className="w-20 h-20 rounded-full bg-slate-900 flex items-center justify-center mb-6 text-slate-700">
                  <Search size={40} />
                </div>
                <h3 className="text-2xl font-black mb-3">عذراً، لم نجد نتائج</h3>
                <p className="text-slate-500 font-medium max-w-sm mx-auto">لم نتمكن من العثور على أي مسار يطابق " {searchQuery} " في مستوى {filterLevel}.</p>
                <button 
                  onClick={() => {setFilterLevel('all'); setSearchQuery('');}}
                  className="mt-8 px-8 py-3 bg-indigo-600 rounded-2xl font-black text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-600/20 active:scale-95"
                >
                  عرض جميع المسارات
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-32 pt-16 border-t border-white/5 text-center text-slate-600">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Terminal className="w-5 h-5" />
            <span className="font-black tracking-tighter text-slate-400">CodeAI Academy</span>
          </div>
          <p className="text-sm font-medium">جميع الحقوق محفوظة © 2025 - الأكاديمية مدعومة بتقنيات Google Gemini</p>
        </footer>
      </main>

      {/* Mobile Nav Overlay */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 glass-card rounded-[2rem] px-8 py-4 flex gap-10 border-white/10 shadow-2xl z-50">
        <LayoutDashboard className="text-indigo-400" />
        <BookOpen className="text-slate-500" />
        <BrainCircuit className="text-slate-500" />
        <Settings className="text-slate-500" />
      </div>
    </div>
  );
};

export default App;
