
import React from 'react';
import { Course } from '../types';
import { getIcon } from '../constants';
import { ChevronLeft, Clock, BarChart, ArrowUpRight } from 'lucide-react';

interface Props {
  course: Course;
}

const CourseCard: React.FC<Props> = ({ course }) => {
  const colorClasses: Record<string, string> = {
    blue: 'from-blue-500 to-indigo-600 text-blue-400',
    purple: 'from-purple-500 to-pink-600 text-purple-400',
    green: 'from-emerald-500 to-teal-600 text-emerald-400',
  };

  return (
    <div className="glass-card rounded-[2.5rem] p-8 flex flex-col h-full group relative overflow-hidden">
      {/* Decorative Gradient Blob */}
      <div className={`absolute -top-12 -left-12 w-32 h-32 bg-gradient-to-br ${colorClasses[course.color].split(' ').slice(0, 2).join(' ')} opacity-5 blur-3xl group-hover:opacity-20 transition-opacity`}></div>
      
      <div className="flex items-start justify-between mb-8">
        <div className={`w-14 h-14 rounded-[1.25rem] flex items-center justify-center bg-white/5 border border-white/10 text-white shadow-lg transition-transform group-hover:scale-110 duration-500`}>
          {getIcon(course.icon)}
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-tighter text-slate-400">
          <BarChart size={12} />
          {course.level}
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-2xl font-black mb-3 group-hover:text-indigo-400 transition-colors">{course.title}</h3>
        <p className="text-slate-400 text-sm mb-8 leading-relaxed font-medium">
          {course.description}
        </p>
      </div>
      
      <div className="flex items-center gap-6 text-[11px] font-bold text-slate-500 mb-8 border-t border-white/5 pt-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-indigo-500" />
          <span>{course.duration}</span>
        </div>
        <div className="h-4 w-px bg-white/5"></div>
        <div className="text-indigo-400 uppercase tracking-widest">معتمد</div>
      </div>

      <button className="w-full py-4 rounded-[1.25rem] bg-indigo-600 text-white font-black text-sm transition-all hover:bg-indigo-500 flex items-center justify-center gap-3 shadow-lg shadow-indigo-600/20 active:scale-95 group/btn">
        ابدأ التعلم الآن
        <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default CourseCard;
