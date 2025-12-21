import { TryOut, WeeklySchedule, HabitTracker, DashboardStats, SubtestScore } from '@/types';

export const calculateTotalScore = (scores: SubtestScore[]): number => {
  if (scores.length === 0) return 0;
  const total = scores.reduce((sum, item) => sum + item.score, 0);
  return Math.round(total / scores.length);
};

export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.round((current / target) * 100);
};

export const calculateStreak = (habits: HabitTracker[]): number => {
  if (habits.length === 0) return 0;
  
  const sortedHabits = [...habits].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  let streak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  for (const habit of sortedHabits) {
    const habitDate = new Date(habit.date);
    habitDate.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today.getTime() - habitDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === streak && (habit.studyCompleted || habit.practiceCompleted || habit.reviewCompleted)) {
      streak++;
    } else if (daysDiff > streak) {
      break;
    }
  }
  
  return streak;
};

export const getWeeksBetween = (startDate: Date, endDate: Date): number => {
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.ceil(diffDays / 7);
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(date);
};

export const motivationalQuotes = [
  "Konsisten adalah kunci kesuksesan! 💪",
  "Setiap usaha yang kamu lakukan tidak akan sia-sia! 🌟",
  "Hari ini lebih baik dari kemarin! 📈",
  "Kamu bisa, kamu pasti bisa! 🚀",
  "Fokus pada progressmu, bukan pada kesempurnaan! ✨",
  "Satu langkah kecil setiap hari menuju impianmu! 🎯",
  "Percaya pada prosesnya! 🌈",
  "Kamu sudah sampai sejauh ini, jangan menyerah! 💫",
  "Kerja keras tidak akan mengkhianati hasil! 🏆",
  "Impianmu menunggumu di garis finish! 🎓"
];

export const getRandomQuote = (): string => {
  return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

export const getTargetDate = (): Date => {
  return new Date('2026-04-21');
};

export const getDaysUntilTarget = (): number => {
  const today = new Date();
  const target = getTargetDate();
  const diffTime = target.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
