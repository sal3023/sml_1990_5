import React from 'react';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    level: string;
    duration: string;
    image: string;
  };
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="glass-card p-6 rounded-[2rem] flex flex-col items-start group">
      <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-[1.5rem] mb-6 group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-3">
        {course.level}
      </div>
      <h3 className="text-xl font-black mb-2 leading-tight text-white group-hover:text-indigo-400 transition-colors">
        {course.title}
      </h3>
      <p className="text-slate-500 text-sm font-medium mb-4 flex-1">
        {course.description}
      </p>
      <div className="flex items-center justify-between w-full pt-4 border-t border-white/5">
        <span className="text-slate-400 text-sm font-bold">المدة: {course.duration}</span>
        <button className="px-5 py-2 bg-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-600/20">
          ابدأ المسار
        </button>
      </div>
    </div>
  );
};

export default CourseCard;
