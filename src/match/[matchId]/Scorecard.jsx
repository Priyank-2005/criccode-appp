// src/match/Scorecard.jsx
import React from 'react';

/**
 * Renders the ball-by-ball scorecard.
 */
export default function Scorecard({ scorecard = [] }) {
  if (scorecard.length === 0) {
    return <p className="text-gray-500 italic p-4 bg-white rounded-lg border shadow-sm">No balls bowled yet.</p>;
  }

  // Reverse the scorecard so the latest ball is at the top
  const reversedScorecard = [...scorecard].reverse();

  return (
    <div className="max-h-96 overflow-y-auto bg-white rounded-xl shadow-md border border-gray-100">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Over.Ball</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Batsman</th>
            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Bowler</th>
            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Runs</th>
            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider">Wicket</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {reversedScorecard.map((ball, idx) => (
            <tr key={idx} className={ball.wicket ? 'bg-red-50' : (ball.runs > 3 ? 'bg-green-50' : 'hover:bg-gray-50')}>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{ball.over}.{ball.ball}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm">{ball.batsman?.name || 'N/A'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">{ball.bowler?.name || 'N/A'}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm font-bold text-center">{ball.runs}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-center">
                {ball.wicket ? <span className="text-red-600 font-semibold">OUT!</span> : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
