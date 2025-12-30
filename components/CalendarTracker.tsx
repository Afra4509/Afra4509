'use client';

import { useState } from 'react';
import { HabitTracker } from '@/types';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface CalendarTrackerProps {
  habits: HabitTracker[];
  onUpdateHabit: (date: string, habit: Partial<HabitTracker>) => void;
  streak: number;
}

export default function CalendarTracker({ habits, onUpdateHabit, streak }: CalendarTrackerProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek, year, month };
  };

  const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentMonth);

  const getHabitForDate = (day: number): HabitTracker | undefined => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    return habits.find(h => h.date === dateStr);
  };

  const toggleHabit = (day: number, habitType: 'studyCompleted' | 'practiceCompleted' | 'reviewCompleted') => {
    const dateStr = new Date(year, month, day).toISOString().split('T')[0];
    const existingHabit = getHabitForDate(day);
    
    const updatedHabit: Partial<HabitTracker> = {
      [habitType]: !existingHabit?.[habitType],
      studyCompleted: habitType === 'studyCompleted' ? !existingHabit?.studyCompleted : existingHabit?.studyCompleted || false,
      practiceCompleted: habitType === 'practiceCompleted' ? !existingHabit?.practiceCompleted : existingHabit?.practiceCompleted || false,
      reviewCompleted: habitType === 'reviewCompleted' ? !existingHabit?.reviewCompleted : existingHabit?.reviewCompleted || false,
    };

    onUpdateHabit(dateStr, updatedHabit);
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Kalender & Habit Tracker
        </h2>
        <div className="flex items-center gap-2">
          <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg font-bold">
            🔥 {streak} Hari Streak!
          </div>
        </div>
      </div>

      {/* Calendar Navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={previousMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {monthNames[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2 mb-6">
        {dayNames.map(day => (
          <div key={day} className="text-center font-semibold text-gray-700 dark:text-gray-300 text-sm py-2">
            {day}
          </div>
        ))}
        
        {Array.from({ length: startingDayOfWeek }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const habit = getHabitForDate(day);
          const date = new Date(year, month, day);
          const isToday = date.getTime() === today.getTime();
          const isPast = date < today;
          const isFuture = date > today;
          
          const completedCount = [
            habit?.studyCompleted,
            habit?.practiceCompleted,
            habit?.reviewCompleted
          ].filter(Boolean).length;

          return (
            <div
              key={day}
              className={`
                aspect-square p-1 rounded-lg border-2 transition-all
                ${isToday ? 'border-blue-500 dark:border-blue-400' : 'border-gray-200 dark:border-gray-700'}
                ${isFuture ? 'opacity-50' : ''}
                ${completedCount === 3 ? 'bg-green-100 dark:bg-green-900/30' : ''}
                ${completedCount === 2 ? 'bg-yellow-100 dark:bg-yellow-900/30' : ''}
                ${completedCount === 1 ? 'bg-orange-100 dark:bg-orange-900/30' : ''}
              `}
            >
              <div className="text-center text-sm font-semibold text-gray-900 dark:text-white mb-1">
                {day}
              </div>
              {!isFuture && (
                <div className="flex justify-center gap-0.5">
                  {completedCount > 0 && (
                    <div className="flex">
                      {Array.from({ length: completedCount }).map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Today's Habits */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Habit Hari Ini
        </h3>
        <div className="space-y-3">
          {(() => {
            const todayStr = today.toISOString().split('T')[0];
            const todayHabit = habits.find(h => h.date === todayStr);
            const todayDay = today.getDate();

            return (
              <>
                <HabitCheckbox
                  label="📚 Belajar Hari Ini"
                  checked={todayHabit?.studyCompleted || false}
                  onChange={() => toggleHabit(todayDay, 'studyCompleted')}
                />
                <HabitCheckbox
                  label="✍️ Latihan Soal"
                  checked={todayHabit?.practiceCompleted || false}
                  onChange={() => toggleHabit(todayDay, 'practiceCompleted')}
                />
                <HabitCheckbox
                  label="🔍 Review Kesalahan"
                  checked={todayHabit?.reviewCompleted || false}
                  onChange={() => toggleHabit(todayDay, 'reviewCompleted')}
                />
              </>
            );
          })()}
        </div>
      </div>

      {/* Legend */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-6">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Legenda:</p>
        <div className="flex flex-wrap gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 dark:bg-green-900/30 border-2 border-gray-300 dark:border-gray-600 rounded" />
            <span className="text-gray-600 dark:text-gray-400">3 Habit Selesai</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-100 dark:bg-yellow-900/30 border-2 border-gray-300 dark:border-gray-600 rounded" />
            <span className="text-gray-600 dark:text-gray-400">2 Habit Selesai</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-100 dark:bg-orange-900/30 border-2 border-gray-300 dark:border-gray-600 rounded" />
            <span className="text-gray-600 dark:text-gray-400">1 Habit Selesai</span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HabitCheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

function HabitCheckbox({ label, checked, onChange }: HabitCheckboxProps) {
  return (
    <button
      onClick={onChange}
      className={`
        w-full flex items-center gap-3 p-3 rounded-lg transition-all
        ${checked 
          ? 'bg-green-100 dark:bg-green-900/30 border-2 border-green-500' 
          : 'bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
        }
      `}
    >
      <div className={`
        w-6 h-6 rounded flex items-center justify-center transition-colors
        ${checked ? 'bg-green-500' : 'bg-white dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500'}
      `}>
        {checked && <Check className="w-4 h-4 text-white" />}
      </div>
      <span className={`font-medium ${checked ? 'text-green-700 dark:text-green-400' : 'text-gray-700 dark:text-gray-300'}`}>
        {label}
      </span>
    </button>
  );
}
