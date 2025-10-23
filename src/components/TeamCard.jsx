// src/components/TeamCard.jsx
import { Users, User, ChevronRight } from 'lucide-react';

export default function TeamCard({ team }) {
  // Mock data if players are not fully populated or missing
  const players = team.players && team.players.length > 0
    ? team.players
    : [
        { _id: 'mock1', name: 'Mock Player 1', role: 'Batsman' },
        { _id: 'mock2', name: 'Mock Player 2', role: 'Bowler' },
        { _id: 'mock3', name: 'Mock Player 3', role: 'Allrounder' },
        { _id: 'mock4', name: 'Mock Player 4', role: 'Wicketkeeper' },
      ];
  
  // Display only top 5 players for a summary view
  const playerList = players.slice(0, 5);
  const remainingPlayers = players.length - playerList.length;

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
      <div className="flex items-center mb-4 border-b pb-2">
        <Users className="text-green-600 mr-2" size={20} />
        <h2 className="text-xl font-bold text-gray-900">{team.name}</h2>
      </div>

      <p className="text-sm font-semibold text-gray-700 mb-2">Squad ({players.length} Players):</p>
      <ul className="space-y-1">
        {playerList.map(p => (
          <li key={p._id} className="flex items-center text-sm text-gray-600 p-1 rounded">
            <User size={14} className="mr-2 text-gray-400" />
            <span className="font-medium">{p.name}</span>
            <span className="ml-auto text-xs italic text-blue-500">({p.role || 'N/A'})</span>
          </li>
        ))}
        {remainingPlayers > 0 && (
             <li className="text-center text-xs text-gray-500 pt-2 font-medium">
                {remainingPlayers} more players listed below...
            </li>
        )}
      </ul>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <p className="text-xs font-semibold text-gray-700">Coaches:</p>
        <div className="text-xs text-gray-600 mt-1 space-y-0.5">
          <p>Head Coach: {team.coaches?.head || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}
