
export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: 'مبتدئ' | 'متوسط' | 'متقدم';
  duration: string;
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface ImageEditResult {
  originalUrl: string;
  editedUrl?: string;
  status: 'idle' | 'processing' | 'success' | 'error';
  error?: string;
}

export interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
}
