'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import TabNavigation from '@/components/TabNavigation';
import DashboardOverview from '@/components/DashboardOverview';
import WeeklyPlanner from '@/components/WeeklyPlanner';
import TryOutTracker from '@/components/TryOutTracker';
import Charts from '@/components/Charts';
import CalendarTracker from '@/components/CalendarTracker';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { TryOut, WeeklySchedule, HabitTracker, StudyStatus } from '@/types';
import { calculateStreak, getWeeksBetween, getTargetDate } from '@/lib/utils';
import { generateInitialSchedules, generateSampleTryOuts, generateInitialHabits } from '@/lib/initialData';

type TabType = 'dashboard' | 'planner' | 'tryout' | 'charts' | 'calendar';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [tryOuts, setTryOuts, tryOutsLoaded] = useLocalStorage<TryOut[]>('snbt-tryouts', generateSampleTryOuts());
  const [schedules, setSchedules, schedulesLoaded] = useLocalStorage<WeeklySchedule[]>('snbt-schedules', generateInitialSchedules());
  const [habits, setHabits, habitsLoaded] = useLocalStorage<HabitTracker[]>('snbt-habits', generateInitialHabits());

  const handleAddTryOut = (tryOut: Omit<TryOut, 'id'>) => {
    const newTryOut: TryOut = {
      ...tryOut,
      id: `to-${Date.now()}`,
    };
    setTryOuts([...tryOuts, newTryOut]);
  };

  const handleDeleteTryOut = (id: string) => {
    setTryOuts(tryOuts.filter(to => to.id !== id));
  };

  const handleUpdateScheduleStatus = (id: string, status: StudyStatus) => {
    setSchedules(schedules.map(schedule => 
      schedule.id === id ? { ...schedule, status } : schedule
    ));
  };

  const handleUpdateHabit = (date: string, habitUpdate: Partial<HabitTracker>) => {
    const existingHabit = habits.find(h => h.date === date);
    
    if (existingHabit) {
      setHabits(habits.map(h => 
        h.date === date ? { ...h, ...habitUpdate } : h
      ));
    } else {
      setHabits([...habits, {
        date,
        studyCompleted: habitUpdate.studyCompleted || false,
        practiceCompleted: habitUpdate.practiceCompleted || false,
        reviewCompleted: habitUpdate.reviewCompleted || false,
      }]);
    }
  };

  // Calculate stats
  const totalWeeks = getWeeksBetween(new Date(), getTargetDate());
  const completedWeeks = schedules.filter(s => s.status === 'Done').length;
  const overallProgress = Math.round((completedWeeks / schedules.length) * 100);
  const streak = calculateStreak(habits);

  // Show loading state
  if (!tryOutsLoaded || !schedulesLoaded || !habitsLoaded) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <main className="container mx-auto px-4 py-6 space-y-6">
        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        
        {activeTab === 'dashboard' && (
          <DashboardOverview
            tryOuts={tryOuts}
            totalWeeks={totalWeeks}
            overallProgress={overallProgress}
            streak={streak}
          />
        )}
        
        {activeTab === 'planner' && (
          <WeeklyPlanner
            schedules={schedules}
            onUpdateStatus={handleUpdateScheduleStatus}
          />
        )}
        
        {activeTab === 'tryout' && (
          <TryOutTracker
            tryOuts={tryOuts}
            onAddTryOut={handleAddTryOut}
            onDeleteTryOut={handleDeleteTryOut}
          />
        )}
        
        {activeTab === 'charts' && (
          <Charts tryOuts={tryOuts} />
        )}
        
        {activeTab === 'calendar' && (
          <CalendarTracker
            habits={habits}
            onUpdateHabit={handleUpdateHabit}
            streak={streak}
          />
        )}
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>SNBT Dashboard 2026 | Dibuat dengan ❤️ untuk kesuksesanmu</p>
        </div>
      </footer>
    </div>
  );
}
