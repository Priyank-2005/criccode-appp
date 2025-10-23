// src/tournaments/[tournamentId]/squads/page.js
'use client';
import { useEffect, useState } from 'react';
import { fetchTournamentById } from '../../../../lib/api';
import TeamCard from '../../../../components/TeamCard';
import { Users, Loader2 } from 'lucide-react';

export default function TournamentSquadsPage({ params }) {
  const { tournamentId } = params;
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the tournament to get the populated list of teams/squads
    async function loadSquads() {
      try {
        setLoading(true);
        const tournament = await fetchTournamentById(tournamentId);
        setTeams(tournament.teams); // Assumes teams are fully populated in the tournament fetch
      } catch (e) {
        console.error("Failed to fetch squads:", e);
      } finally {
        setLoading(false);
      }
    }
    loadSquads();
  }, [tournamentId]);

  if (loading) return <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Loading Squads...</div>;

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <Users className="mr-2 text-blue-600" size={24} />
        Tournament Squads
      </h2>

      {teams.length === 0 ? (
        <p className="text-gray-500 p-4 bg-white rounded-lg border shadow-sm">No teams registered for this tournament.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teams.map(team => (
            <TeamCard key={team._id} team={team} />
          ))}
        </div>
      )}
    </div>
  );
}
