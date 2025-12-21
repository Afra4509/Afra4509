'use client';

import { TryOut, DashboardStats } from '@/types';
import { calculateProgress, getRandomQuote, getDaysUntilTarget } from '@/lib/utils';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';

interface DashboardOverviewProps {
  tryOuts: TryOut[];
  totalWeeks: number;
  overallProgress: number;
  streak: number;
}

export default function DashboardOverview({ tryOuts, totalWeeks, overallProgress, streak }: DashboardOverviewProps) {
  const averageScore = tryOuts.length > 0
    ? Math.round(tryOuts.reduce((sum, to) => sum + to.totalScore, 0) / tryOuts.length)
    : 0;
  
  const latestScore = tryOuts.length > 0 ? tryOuts[tryOuts.length - 1].totalScore : 0;
  const targetScore = 700;
  const scoreProgress = calculateProgress(latestScore, targetScore);
  const daysRemaining = getDaysUntilTarget();
  
  const quote = getRandomQuote();

  return (
    <div className="space-y-6">
      {/* Motivational Quote */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-700 dark:to-blue-900 rounded-2xl p-6 text-white shadow-lg">
        <p className="text-xl font-semibold text-center">{quote}</p>
        <p className="text-center text-blue-100 mt-2">{daysRemaining} hari menuju SNBT 2026!</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Calendar className="w-6 h-6" />}
          label="Total Minggu"
          value={totalWeeks.toString()}
          color="blue"
        />
        <StatCard
          icon={<TrendingUp className="w-6 h-6" />}
          label="Progress Keseluruhan"
          value={`${overallProgress}%`}
          color="green"
        />
        <StatCard
          icon={<Target className="w-6 h-6" />}
          label="Rata-rata Skor TO"
          value={averageScore.toString()}
          color="purple"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          label="Streak Belajar"
          value={`${streak} hari`}
          color="orange"
        />
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProgressCard
          title="Progress Skor Try Out"
          current={latestScore}
          target={targetScore}
          label="Skor Sekarang"
          targetLabel="Target Skor"
        />
        <ProgressCard
          title="Progress Belajar"
          current={overallProgress}
          target={100}
          label="Progress"
          targetLabel="Target"
          suffix="%"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: 'blue' | 'green' | 'purple' | 'orange';
}

function StatCard({ icon, label, value, color }: StatCardProps) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${colorClasses[color]}`}>
        {icon}
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
}

interface ProgressCardProps {
  title: string;
  current: number;
  target: number;
  label: string;
  targetLabel: string;
  suffix?: string;
}

function ProgressCard({ title, current, target, label, targetLabel, suffix = '' }: ProgressCardProps) {
  const percentage = calculateProgress(current, target);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">{label}</span>
          <span className="font-semibold text-gray-900 dark:text-white">{current}{suffix}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">{targetLabel}</span>
          <span className="font-semibold text-gray-900 dark:text-white">{target}{suffix}</span>
        </div>
        <div className="text-center">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{percentage}%</span>
          <span className="text-gray-600 dark:text-gray-400 text-sm ml-2">tercapai</span>
        </div>
      </div>
    </div>
  );
}
