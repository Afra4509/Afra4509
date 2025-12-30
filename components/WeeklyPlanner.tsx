'use client';

import { WeeklySchedule, StudyStatus, CategoryType } from '@/types';
import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface WeeklyPlannerProps {
  schedules: WeeklySchedule[];
  onUpdateStatus: (id: string, status: StudyStatus) => void;
}

export default function WeeklyPlanner({ schedules, onUpdateStatus }: WeeklyPlannerProps) {
  const getStatusIcon = (status: StudyStatus) => {
    switch (status) {
      case 'Done':
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      default:
        return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getCategoryColor = (category: CategoryType) => {
    switch (category) {
      case 'TPS':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Literasi':
        return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'Campuran':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  const sortedSchedules = [...schedules].sort((a, b) => a.weekNumber - b.weekNumber);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Jadwal Belajar SNBT
      </h2>
      
      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
        {sortedSchedules.map((schedule) => (
          <div
            key={schedule.id}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {getStatusIcon(schedule.status)}
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Minggu {schedule.weekNumber}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(schedule.category)}`}>
                    {schedule.category}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatDate(schedule.startDate)} - {formatDate(schedule.endDate)}
                </p>
              </div>
              <select
                value={schedule.status}
                onChange={(e) => onUpdateStatus(schedule.id, e.target.value as StudyStatus)}
                className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Subtest:</p>
              <div className="flex flex-wrap gap-2">
                {schedule.subtests.map((subtest) => (
                  <span
                    key={subtest}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs"
                  >
                    {subtest}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Progress</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {schedule.completedDays} / {schedule.totalDays} hari
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-300"
                  style={{ width: `${(schedule.completedDays / schedule.totalDays) * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
