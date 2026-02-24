export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  image: string;
}
