// src/tournaments/page.js
'use client';
import { useEffect, useState } from 'react';
import { fetchTournaments } from '../lib/api';
import Link from 'next/link';
import { Trophy, Calendar, Loader2 } from 'lucide-react';

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTournaments = async () => {
      try {
        setLoading(true);
        const data = await fetchTournaments();
        setTournaments(data);
      } catch (e) {
        console.error("Failed to fetch tournaments:", e);
      } finally {
        setLoading(false);
      }
    };
    loadTournaments();
  }, []);

  if (loading) return <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Loading Tournaments...</div>;
  if (tournaments.length === 0) return <div className="text-center py-10 text-gray-500 p-8 bg-white rounded-lg shadow-lg">No active tournaments found.</div>;

  return (
    <div className="py-4">
      <h1 className="text-3xl font-bold mb-8 border-b pb-2 text-gray-800">All Cricket Tournaments</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tournaments.map((tournament) => (
          <div key={tournament._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg hover:shadow-xl transition">
            <Trophy className="text-blue-600 mb-3" size={32} />
            <h2 className="text-2xl font-bold mb-2 text-gray-900">{tournament.name}</h2>
            <p className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
            </p>
            <p className="mt-3 text-sm font-medium text-gray-700">Teams: <span className="font-semibold">{tournament.teams.length}</span></p>

            <Link href={`/tournaments/${tournament._id}`}>
              <button className="mt-5 w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                View Tournament Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
