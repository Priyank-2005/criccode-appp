// src/tournaments/[tournamentId]/page.js (Matches Overview)
'use client';
import { useEffect, useState } from 'react';
import { fetchMatches } from '../../../lib/api';
import MatchCard from '../../../components/MatchCard';
import { ListChecks, Loader2 } from 'lucide-react';

export default function TournamentMatchesPage({ params }) {
  const { tournamentId } = params;
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, the backend would provide an endpoint to fetch 
    // matches specifically for this tournament ID. We simulate it here.
    async function loadMatches() {
      try {
        setLoading(true);
        const allMatches = await fetchMatches();
        // Filter by the mock 'tournament' field which should hold the ID
        const tournamentMatches = allMatches.filter(match => match.tournament === tournamentId);
        setMatches(tournamentMatches);
      } catch (e) {
        console.error("Failed to fetch matches for tournament:", e);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, [tournamentId]);

  if (loading) return <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Loading Matches...</div>;

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-4 flex items-center text-gray-800">
        <ListChecks className="mr-2 text-blue-600" size={24} />
        All Matches
      </h2>
      
      {matches.length === 0 ? (
        <p className="text-gray-500 p-4 bg-white rounded-lg border shadow-sm">No matches scheduled for this tournament yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(match => <MatchCard key={match._id} match={match} />)}
        </div>
      )}
    </div>
  );
}
