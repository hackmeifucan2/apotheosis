
export enum Category {
  Fitness = 'Fitness',
  GlowUp = 'Glow Up',
  Study = 'Study',
  Mind = 'Mind',
  Football = 'Football',
}

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  category: Category;
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

export interface Goal extends Task {
  priority: Priority;
}

export interface StudyTask extends Task {
  date: string; // ISO string
}

export interface RoutineSlot {
  id: number;
  time: string;
  task: string;
  completed: boolean;
  period: 'Morning' | 'Afternoon' | 'Night';
  category: Category;
}

export interface SleepData {
  date: string; // 'YYYY-MM-DD'
  hours: number;
}

export interface JournalEntry {
  date: string; // 'YYYY-MM-DD'
  text: string;
}

export interface SpiderDataPoint {
  subject: string;
  value: number;
  fullMark: 100;
}