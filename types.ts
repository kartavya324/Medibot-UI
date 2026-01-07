
export enum TabType {
  DASHBOARD = 'dashboard',
  CHATBOT = 'chatbot',
  RECORDS = 'records',
  XRAY = 'xray',
  APPOINTMENTS = 'appointments'
}

export enum UserRole {
  PATIENT = 'patient',
  DOCTOR = 'doctor'
}

export interface HealthStat {
  label: string;
  value: string | number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'up' | 'down' | 'steady';
}

export interface MedicalFile {
  id: string;
  name: string;
  type: 'pdf' | 'jpg' | 'png';
  date: string;
  size: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
