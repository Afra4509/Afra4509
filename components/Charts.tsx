'use client';

import { TryOut, SubtestType } from '@/types';
import { LineChart, Line, BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatDate } from '@/lib/utils';
import { useState } from 'react';

interface ChartsProps {
  tryOuts: TryOut[];
}

export default function Charts({ tryOuts }: ChartsProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');

  const platforms = ['all', ...new Set(tryOuts.map(to => to.platform))];

  const filteredTryOuts = tryOuts.filter(to => 
    (selectedPlatform === 'all' || to.platform === selectedPlatform)
  );

  // Line Chart Data - Score progression over time
  const lineChartData = filteredTryOuts.map(to => ({
    date: formatDate(to.date),
    totalScore: to.totalScore,
    targetScore: to.targetScore,
  }));

  // Bar Chart Data - Average scores per subtest
  const getAverageSubtestScores = () => {
    if (filteredTryOuts.length === 0) return [];

    const subtestAverages: Record<string, number[]> = {};
    
    filteredTryOuts.forEach(to => {
      to.scores.forEach(score => {
        if (!subtestAverages[score.subtest]) {
          subtestAverages[score.subtest] = [];
        }
        subtestAverages[score.subtest].push(score.score);
      });
    });

    return Object.entries(subtestAverages).map(([subtest, scores]) => ({
      subtest: subtest.length > 20 ? subtest.substring(0, 20) + '...' : subtest,
      fullSubtest: subtest,
      score: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
    }));
  };

  const barChartData = getAverageSubtestScores();

  // Radar Chart Data - Latest subtest performance
  const radarChartData = filteredTryOuts.length > 0
    ? filteredTryOuts[filteredTryOuts.length - 1].scores.map(score => ({
        subtest: score.subtest.split(' ').slice(0, 2).join(' '),
        fullSubtest: score.subtest,
        score: score.score,
        maxScore: 1000,
      }))
    : [];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Filter Platform
            </label>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {platforms.map(platform => (
                <option key={platform} value={platform}>
                  {platform === 'all' ? 'Semua Platform' : platform}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredTryOuts.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 shadow-md text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Belum ada data Try Out untuk ditampilkan. Mulai tambahkan data Try Out untuk melihat visualisasi!
          </p>
        </div>
      ) : (
        <>
          {/* Line Chart - Score Progression */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Perkembangan Skor Try Out
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="totalScore"
                  stroke="#3B82F6"
                  strokeWidth={3}
                  name="Skor Total"
                  dot={{ fill: '#3B82F6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
                <Line
                  type="monotone"
                  dataKey="targetScore"
                  stroke="#10B981"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  name="Target Skor"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Average Subtest Scores */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Rata-rata Skor per Subtest
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={barChartData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9CA3AF" />
                <YAxis dataKey="subtest" type="category" stroke="#9CA3AF" width={150} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{payload[0].payload.fullSubtest}</p>
                          <p className="text-blue-400">Skor: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
                <Bar dataKey="score" fill="#8B5CF6" name="Rata-rata Skor" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart - Latest Performance */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Kekuatan & Kelemahan Subtest (Try Out Terakhir)
            </h3>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarChartData}>
                <PolarGrid stroke="#374151" />
                <PolarAngleAxis dataKey="subtest" stroke="#9CA3AF" />
                <PolarRadiusAxis angle={90} domain={[0, 1000]} stroke="#9CA3AF" />
                <Radar
                  name="Skor"
                  dataKey="score"
                  stroke="#F59E0B"
                  fill="#F59E0B"
                  fillOpacity={0.6}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#F3F4F6'
                  }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-gray-800 p-3 rounded-lg border border-gray-700">
                          <p className="text-white font-medium">{payload[0].payload.fullSubtest}</p>
                          <p className="text-orange-400">Skor: {payload[0].value}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
