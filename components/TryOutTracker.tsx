'use client';

import { useState } from 'react';
import { TryOut, PlatformType, SubtestType, SubtestScore } from '@/types';
import { Plus, X, Save } from 'lucide-react';
import { formatDate, calculateTotalScore } from '@/lib/utils';

interface TryOutTrackerProps {
  tryOuts: TryOut[];
  onAddTryOut: (tryOut: Omit<TryOut, 'id'>) => void;
  onDeleteTryOut: (id: string) => void;
}

const subtests: SubtestType[] = [
  'Penalaran Umum',
  'Pengetahuan & Pemahaman Umum',
  'Pemahaman Bacaan & Menulis',
  'Pengetahuan Kuantitatif',
  'Literasi Bahasa Indonesia',
  'Literasi Bahasa Inggris',
  'Penalaran Matematika',
];

export default function TryOutTracker({ tryOuts, onAddTryOut, onDeleteTryOut }: TryOutTrackerProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    platform: 'TOBK GO' as PlatformType,
    targetScore: 700,
    notes: '',
  });
  const [scores, setScores] = useState<SubtestScore[]>(
    subtests.map(subtest => ({ subtest, score: 0 }))
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const totalScore = calculateTotalScore(scores);
    
    onAddTryOut({
      date: formData.date,
      platform: formData.platform,
      scores,
      totalScore,
      targetScore: formData.targetScore,
      notes: formData.notes,
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      platform: 'TOBK GO',
      targetScore: 700,
      notes: '',
    });
    setScores(subtests.map(subtest => ({ subtest, score: 0 })));
    setShowForm(false);
  };

  const updateScore = (subtest: SubtestType, score: number) => {
    setScores(scores.map(s => s.subtest === subtest ? { ...s, score } : s));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Tracker Try Out SNBT
        </h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {showForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showForm ? 'Batal' : 'Tambah Try Out'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tanggal Try Out
              </label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Platform
              </label>
              <select
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value as PlatformType })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="TOBK GO">TOBK GO</option>
                <option value="Pahamfy">Pahamfy</option>
                <option value="SainSin">SainSin</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Target Skor
              </label>
              <input
                type="number"
                value={formData.targetScore}
                onChange={(e) => setFormData({ ...formData, targetScore: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Skor per Subtest:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {subtests.map((subtest) => (
                <div key={subtest} className="flex items-center gap-2">
                  <label className="flex-1 text-sm text-gray-700 dark:text-gray-300">
                    {subtest}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="1000"
                    value={scores.find(s => s.subtest === subtest)?.score || 0}
                    onChange={(e) => updateScore(subtest, parseInt(e.target.value) || 0)}
                    className="w-24 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Catatan Evaluasi
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              placeholder="Tulis catatan atau evaluasi dari Try Out ini..."
            />
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Save className="w-4 h-4" />
            Simpan Try Out
          </button>
        </form>
      )}

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {tryOuts.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">
            Belum ada data Try Out. Klik &quot;Tambah Try Out&quot; untuk mulai tracking!
          </p>
        ) : (
          tryOuts.map((tryOut) => (
            <div
              key={tryOut.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {tryOut.platform}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {formatDate(tryOut.date)}
                  </p>
                </div>
                <button
                  onClick={() => onDeleteTryOut(tryOut.id)}
                  className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Total Skor</p>
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">{tryOut.totalScore}</p>
                </div>
                <div className="text-center p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Target</p>
                  <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{tryOut.targetScore}</p>
                </div>
                <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Gap</p>
                  <p className="text-xl font-bold text-green-600 dark:text-green-400">
                    {tryOut.totalScore - tryOut.targetScore >= 0 ? '+' : ''}{tryOut.totalScore - tryOut.targetScore}
                  </p>
                </div>
                <div className="text-center p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <p className="text-xs text-gray-600 dark:text-gray-400">Progress</p>
                  <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {Math.round((tryOut.totalScore / tryOut.targetScore) * 100)}%
                  </p>
                </div>
              </div>

              {tryOut.notes && (
                <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">{tryOut.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
