// src/players/page.js
'use client';
import { useEffect, useState } from 'react';
import { fetchPlayers } from '../lib/api';
import { User, Loader2, Bat, Ball } from 'lucide-react';

export default function PlayersPage() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getPlayers() {
      try {
        setLoading(true);
        const data = await fetchPlayers();
        setPlayers(data);
      } catch (e) {
        console.error("Failed to fetch players:", e);
      } finally {
        setLoading(false);
      }
    }
    getPlayers();
  }, []);

  if (loading) return <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Loading Players...</div>;

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-800">All Registered Players</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {players.map(player => (
          <div key={player._id} className="border rounded-xl p-5 shadow bg-white hover:shadow-lg transition">
            <div className="flex items-center mb-3">
                <User className="text-blue-600 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-gray-900">{player.name}</h2>
            </div>
            
            <p className="text-blue-600 font-medium text-sm border-b pb-2 mb-2">{player.role}</p>
            <p className="text-sm text-gray-500 mt-2 font-medium">Team: <span className='text-gray-700'>{player.team?.name || 'N/A'}</span></p>
            
            <div className="mt-3 text-xs space-y-1">
                <p className='flex items-center text-gray-600'><Bat size={14} className="mr-2 text-gray-400" /> Batting: <span className="font-medium ml-1">{player.battingStyle}</span></p>
                <p className='flex items-center text-gray-600'><Ball size={14} className="mr-2 text-gray-400" /> Bowling: <span className="font-medium ml-1">{player.bowlingStyle || 'N/A'}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
