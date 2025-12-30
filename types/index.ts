export type SubtestType = 
  | 'Penalaran Umum'
  | 'Pengetahuan & Pemahaman Umum'
  | 'Pemahaman Bacaan & Menulis'
  | 'Pengetahuan Kuantitatif'
  | 'Literasi Bahasa Indonesia'
  | 'Literasi Bahasa Inggris'
  | 'Penalaran Matematika';

export type CategoryType = 'TPS' | 'Literasi' | 'Campuran';

export type StudyStatus = 'Not Started' | 'In Progress' | 'Done';

export type PlatformType = 'TOBK GO' | 'Pahamfy' | 'SainSin' | 'Lainnya';

export interface SubtestScore {
  subtest: SubtestType;
  score: number;
}

export interface TryOut {
  id: string;
  date: string;
  platform: PlatformType;
  scores: SubtestScore[];
  totalScore: number;
  targetScore: number;
  notes: string;
}

export interface WeeklySchedule {
  id: string;
  weekNumber: number;
  startDate: string;
  endDate: string;
  category: CategoryType;
  subtests: SubtestType[];
  status: StudyStatus;
  completedDays: number;
  totalDays: number;
}

export interface HabitTracker {
  date: string;
  studyCompleted: boolean;
  practiceCompleted: boolean;
  reviewCompleted: boolean;
}

export interface DashboardStats {
  totalWeeks: number;
  overallProgress: number;
  averageScore: number;
  currentScore: number;
  targetScore: number;
  streak: number;
}
