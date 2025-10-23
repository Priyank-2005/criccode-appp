// src/tournaments/[tournamentId]/ranking/page.js (Points Table)
'use client';
import { useEffect, useState } from 'react';
import { fetchTournamentRanking } from '../../../../lib/api';
import { Table, Check, X, Minus, Loader2 } from 'lucide-react';

export default function TournamentRankingPage({ params }) {
  const { tournamentId } = params;
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRanking() {
      try {
        setLoading(true);
        const data = await fetchTournamentRanking(tournamentId);
        setRanking(data);
      } catch (e) {
        console.error("Failed to fetch ranking:", e);
      } finally {
        setLoading(false);
      }
    }
    loadRanking();
  }, [tournamentId]);

  if (loading) return <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Computing Points Table...</div>;

  // Function to map form character to icon/style
  const renderForm = (form) => {
    const classMap = {
      'W': 'form-win',
      'L': 'form-loss',
      'NR': 'form-nr',
    };
    const iconMap = {
      'W': <Check size={14} />,
      'L': <X size={14} />,
      'NR': <Minus size={14} />,
    };

    return (
      <div className="flex space-x-1">
        {form.map((f, i) => (
          <span 
            key={i} 
            title={f === 'W' ? 'Win' : f === 'L' ? 'Loss' : 'No Result'}
            className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold border ${classMap[f]}`}
          >
            {iconMap[f]}
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
        <Table className="mr-2 text-blue-600" size={24} />
        Tournament Points Table
      </h2>
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">#</th>
              <th className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Team</th>
              {['P', 'W', 'L', 'NR', 'Pts', 'NRR', 'Form'].map((header) => (
                <th key={header} className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {ranking.map((team, index) => (
              <tr key={team.teamName} className="hover:bg-blue-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-extrabold text-blue-600">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">{team.teamName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{team.played}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-green-600 font-medium">{team.won}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-red-600 font-medium">{team.loss}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-600">{team.nr}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-extrabold text-blue-600">{team.pts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-mono">{team.nrr}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm">
                  {renderForm(team.form)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
