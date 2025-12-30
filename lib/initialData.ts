import { WeeklySchedule, TryOut, HabitTracker, SubtestType } from '@/types';

export const generateInitialSchedules = (): WeeklySchedule[] => {
  const startDate = new Date('2024-12-23');
  const endDate = new Date('2026-04-21');
  const totalWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
  
  const subtestGroups: { category: 'TPS' | 'Literasi' | 'Campuran', subtests: SubtestType[] }[] = [
    {
      category: 'TPS',
      subtests: ['Penalaran Umum', 'Pengetahuan & Pemahaman Umum', 'Pengetahuan Kuantitatif']
    },
    {
      category: 'Literasi',
      subtests: ['Literasi Bahasa Indonesia', 'Literasi Bahasa Inggris', 'Pemahaman Bacaan & Menulis']
    },
    {
      category: 'TPS',
      subtests: ['Penalaran Matematika', 'Pengetahuan Kuantitatif']
    },
  ];

  const schedules: WeeklySchedule[] = [];
  
  for (let week = 0; week < Math.min(totalWeeks, 52); week++) {
    const weekStart = new Date(startDate);
    weekStart.setDate(startDate.getDate() + (week * 7));
    
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6);
    
    const group = subtestGroups[week % subtestGroups.length];
    
    schedules.push({
      id: `week-${week + 1}`,
      weekNumber: week + 1,
      startDate: weekStart.toISOString().split('T')[0],
      endDate: weekEnd.toISOString().split('T')[0],
      category: group.category,
      subtests: group.subtests,
      status: week === 0 ? 'In Progress' : 'Not Started',
      completedDays: 0,
      totalDays: 7,
    });
  }
  
  return schedules;
};

export const generateSampleTryOuts = (): TryOut[] => {
  const sampleData: TryOut[] = [
    {
      id: 'to-1',
      date: '2024-12-15',
      platform: 'TOBK GO',
      scores: [
        { subtest: 'Penalaran Umum', score: 550 },
        { subtest: 'Pengetahuan & Pemahaman Umum', score: 520 },
        { subtest: 'Pemahaman Bacaan & Menulis', score: 580 },
        { subtest: 'Pengetahuan Kuantitatif', score: 490 },
        { subtest: 'Literasi Bahasa Indonesia', score: 600 },
        { subtest: 'Literasi Bahasa Inggris', score: 570 },
        { subtest: 'Penalaran Matematika', score: 480 },
      ],
      totalScore: 541,
      targetScore: 700,
      notes: 'Try Out pertama, masih banyak yang perlu dipelajari terutama Matematika dan Kuantitatif.',
    },
    {
      id: 'to-2',
      date: '2024-12-22',
      platform: 'Pahamfy',
      scores: [
        { subtest: 'Penalaran Umum', score: 580 },
        { subtest: 'Pengetahuan & Pemahaman Umum', score: 550 },
        { subtest: 'Pemahaman Bacaan & Menulis', score: 590 },
        { subtest: 'Pengetahuan Kuantitatif', score: 520 },
        { subtest: 'Literasi Bahasa Indonesia', score: 610 },
        { subtest: 'Literasi Bahasa Inggris', score: 590 },
        { subtest: 'Penalaran Matematika', score: 510 },
      ],
      totalScore: 564,
      targetScore: 700,
      notes: 'Ada peningkatan! Fokus latihan soal Matematika mulai terlihat hasilnya.',
    },
  ];
  
  return sampleData;
};

export const generateInitialHabits = (): HabitTracker[] => {
  const habits: HabitTracker[] = [];
  const today = new Date();
  
  // Generate habits for the last 7 days
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    habits.push({
      date: date.toISOString().split('T')[0],
      studyCompleted: i < 5,
      practiceCompleted: i < 4,
      reviewCompleted: i < 3,
    });
  }
  
  return habits;
};
