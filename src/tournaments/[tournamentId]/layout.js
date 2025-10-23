'use client';
import { useEffect, useState } from 'react';
import { fetchTournamentById } from '../../../lib/api';
import TournamentNav from '../../../components/TournamentNav';
import { Loader2 } from 'lucide-react';

export default function TournamentDetailLayout({ children, params }) {
  const { tournamentId } = params;
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTournament = async () => {
      try {
        setLoading(true);
        const data = await fetchTournamentById(tournamentId);
        setTournament(data);
      } catch (e) {
        console.error(`Failed to fetch tournament ${tournamentId}:`, e);
      } finally {
        setLoading(false);
      }
    };
    loadTournament();
  }, [tournamentId]);

  if (loading) {
    return (
      <div className="text-center py-20">
        <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
        <p className="mt-2 text-gray-600">Loading tournament: {tournamentId}</p>
      </div>
    );
  }

  if (!tournament) return <div className="text-center py-10 text-red-500 p-8 bg-white rounded-lg shadow-lg">Tournament not found.</div>;

  return (
    <div className="min-h-screen">
      <h1 className="text-4xl font-extrabold mb-4 text-gray-900">{tournament.name}</h1>
      
      {/* Secondary Navigation */}
      <TournamentNav tournamentId={tournamentId} />

      {/* Nested Content (Matches, Table, Squads, etc.) */}
      <div className="py-4">{children}</div>
    </div>
  );
}
