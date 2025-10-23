// src/tournaments/[tournamentId]/stats/page.js
'use client';
import { useEffect, useState } from 'react';
import { fetchTournamentStats } from '../../../../lib/api';
import { Award, ChevronsUp, Shield, Loader2 } from 'lucide-react';

export default function TournamentStatsPage({ params }) {
  const { tournamentId } = params;
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statType, setStatType] = useState('runs'); // Default to most runs

  const statOptions = [
    { value: 'runs', label: 'Most Runs', icon: ChevronsUp, unit: 'Runs' },
    { value: 'wickets', label: 'Most Wickets', icon: Shield, unit: 'Wickets' },
    { value: 'high_score', label: 'Highest Score', icon: Award, unit: 'Score' },
  ];

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const data = await fetchTournamentStats(tournamentId, statType);
        setStats(data);
      } catch (e) {
        console.error(`Failed to fetch ${statType} stats:`, e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [tournamentId, statType]);

  const currentStat = statOptions.find(opt => opt.value === statType);
  const currentStatLabel = currentStat?.label || 'Stats Leaderboard';

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
        <Award className="mr-2 text-blue-600" size={24} />
        {currentStatLabel} Leaderboard
      </h2>

      {/* Stat Selection Tabs/Buttons */}
      <div className="mb-6 flex flex-wrap gap-3 p-3 bg-gray-100 rounded-lg shadow-inner">
        {statOptions.map(opt => (
          <button
            key={opt.value}
            onClick={() => setStatType(opt.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition 
              ${statType === opt.value 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'bg-white text-gray-700 hover:bg-gray-200'}`}
          >
            <opt.icon size={18} />
            <span>{opt.label}</span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Loading {currentStatLabel}...</div>
      ) : stats.length === 0 ? (
        <p className="text-gray-500 p-4 bg-white rounded-lg border shadow-sm">No player data available yet.</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {currentStat?.unit || 'Value'}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {stats.map((player, index) => (
                <tr key={player.name} className="hover:bg-blue-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-blue-600">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{player.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{player.team}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-base font-bold text-gray-900">{player[statType]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
