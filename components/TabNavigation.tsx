'use client';

import { LayoutDashboard, Calendar, LineChart, BookOpen, CalendarCheck } from 'lucide-react';

type TabType = 'dashboard' | 'planner' | 'tryout' | 'charts' | 'calendar';

interface TabNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: 'dashboard' as TabType, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'planner' as TabType, label: 'Jadwal', icon: BookOpen },
    { id: 'tryout' as TabType, label: 'Try Out', icon: CalendarCheck },
    { id: 'charts' as TabType, label: 'Grafik', icon: LineChart },
    { id: 'calendar' as TabType, label: 'Kalender', icon: Calendar },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-2">
      <div className="flex flex-wrap gap-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-all
                ${isActive
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }
              `}
            >
              <Icon className="w-5 h-5" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
