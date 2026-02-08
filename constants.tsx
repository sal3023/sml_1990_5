
import React from 'react';
import { Code, Brain, Database, Globe, Cpu, Layout } from 'lucide-react';
import { Course } from './types';

export const COURSES: Course[] = [
  {
    id: 'python-101',
    title: 'أساسيات بايثون للذكاء الاصطناعي',
    description: 'تعلم لغة البرمجة الأكثر شهرة في عالم البيانات والذكاء الاصطناعي من الصفر.',
    icon: 'Code',
    level: 'مبتدئ',
    duration: '25 ساعة معتمدة',
    color: 'blue'
  },
  {
    id: 'generative-ai',
    title: 'الذكاء الاصطناعي التوليدي (GenAI)',
    description: 'تعلم كيفية استخدام وتطوير نماذج الذكاء الاصطناعي التوليدية لبناء تطبيقات ذكية ومبتكرة.',
    icon: 'Cpu',
    level: 'متوسط',
    duration: '30 ساعة معتمدة',
    color: 'blue'
  },
  {
    id: 'nlp-specialization',
    title: 'معالجة اللغات الطبيعية (NLP)',
    description: 'تعلم تقنيات فهم وتحليل النصوص واللغات باستخدام النماذج اللغوية الكبيرة.',
    icon: 'Layout',
    level: 'متقدم',
    duration: '45 ساعة معتمدة',
    color: 'green'
  },
  {
    id: 'deep-learning',
    title: 'مقدمة في التعلم العميق',
    description: 'فهم الشبكات العصبية وكيفية بناء نماذج قوية باستخدام TensorFlow و PyTorch.',
    icon: 'Brain',
    level: 'متوسط',
    duration: '40 ساعة معتمدة',
    color: 'purple'
  },
  {
    id: 'web-dev-fullstack',
    title: 'تطوير الويب الشامل',
    description: 'بناء تطبيقات ويب حديثة باستخدام React و Node.js مع دمج تقنيات AI.',
    icon: 'Globe',
    level: 'متقدم',
    duration: '60 ساعة معتمدة',
    color: 'green'
  }
];

export const getIcon = (name: string) => {
  switch (name) {
    case 'Code': return <Code className="w-6 h-6" />;
    case 'Brain': return <Brain className="w-6 h-6" />;
    case 'Database': return <Database className="w-6 h-6" />;
    case 'Globe': return <Globe className="w-6 h-6" />;
    case 'Cpu': return <Cpu className="w-6 h-6" />;
    case 'Layout': return <Layout className="w-6 h-6" />;
    default: return <Code className="w-6 h-6" />;
  }
};
