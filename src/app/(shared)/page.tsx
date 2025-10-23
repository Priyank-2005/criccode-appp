// src/app/page.tsx
'use client';
import { useEffect, useState } from 'react';
import { fetchMatches } from '../../lib/api'; 
import MatchCard from '../../components/MatchCard';
import { Loader2, Zap, Calendar, ArrowRightCircle, CheckCircle } from 'lucide-react'; 

// Helper function to group matches by status
const groupMatches = (matches) => {
  const now = new Date();
  const groups = { live: [], upcoming: [], finished: [] };

  matches.forEach(match => {
    const matchDate = new Date(match.date);
    const scorecardLength = match.scorecard ? match.scorecard.length : 0; // Use real scorecard length

    if (scorecardLength > 0 && scorecardLength < 120) { // Simple "live" threshold
      groups.live.push(match);
    } else if (matchDate > now) {
      groups.upcoming.push(match);
    } else {
      groups.finished.push(match);
    }
  });

  return groups;
};


export default function Home() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMatches() {
      try {
        setLoading(true);
        const data = await fetchMatches();
        setMatches(data);
      } catch (e) {
        console.error("Failed to fetch matches for dashboard:", e);
      } finally {
        setLoading(false);
      }
    }
    loadMatches();
  }, []);

  const groupedMatches = groupMatches(matches);

  const MatchSection = ({ title, matches, Icon, badgeColor, badgeText }) => (
    <section className="mb-10">
      <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-800">
        <Icon className="mr-3 text-blue-600" size={24} />
        {title}
        <span className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full ${badgeColor} text-white`}>
            {badgeText} ({matches.length})
        </span>
      </h2>
      {matches.length === 0 ? (
        <p className="text-gray-500 p-4 bg-white rounded-lg border">No matches currently in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(match => <MatchCard key={match._id} match={match} />)}
        </div>
      )}
    </section>
  );

  if (loading) {
    return (
        <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="mt-2 text-gray-600">Loading live fixtures and results...</p>
        </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900 border-b pb-3">
        Cricket Tournament Live Hub
      </h1>

      <MatchSection 
        title="Live Matches" 
        matches={groupedMatches.live} 
        Icon={Zap} 
        badgeColor="bg-red-600" 
        badgeText="LIVE" 
      />

      <MatchSection 
        title="Upcoming Matches" 
        matches={groupedMatches.upcoming} 
        Icon={Calendar} 
        badgeColor="bg-orange-600" 
        badgeText="FIXTURES" 
      />
      
      <MatchSection 
        title="Finished Matches" 
        matches={groupedMatches.finished} 
        Icon={CheckCircle} 
        badgeColor="bg-gray-600" 
        badgeText="RESULT" 
      />
    </div>
  );
}
