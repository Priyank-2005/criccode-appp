// src/tournaments/[tournamentId]/venues/page.js
'use client';
import { useEffect, useState } from 'react';
import { fetchTournamentVenues } from '../../../../lib/api';
import { MapPin, CalendarCheck, Loader2 } from 'lucide-react';

export default function TournamentVenuesPage({ params }) {
  const { tournamentId } = params;
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadVenues() {
      try {
        setLoading(true);
        const data = await fetchTournamentVenues(tournamentId);
        setVenues(data);
      } catch (e) {
        console.error("Failed to fetch venues:", e);
      } finally {
        setLoading(false);
      }
    }
    loadVenues();
  }, [tournamentId]);

  if (loading) return <div className="text-center py-10"><Loader2 className="w-6 h-6 animate-spin mx-auto text-blue-600" />Loading Venues...</div>;
  if (venues.length === 0) return <div className="text-center py-10 text-gray-500 p-4 bg-white rounded-lg border shadow-sm">No venues defined for this tournament.</div>;

  return (
    <div className="py-2">
      <h2 className="text-2xl font-semibold mb-6 flex items-center text-gray-800">
        <MapPin className="mr-2 text-blue-600" size={24} />
        Tournament Venues
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {venues.map((venue) => (
          <div key={venue.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{venue.name}</h3>
            <p className="text-gray-600 font-medium mb-3">City: {venue.city}</p>
            <p className="flex items-center text-sm text-gray-500">
              <CalendarCheck size={16} className="mr-1" />
              Matches Scheduled: <span className="font-semibold ml-1 text-gray-700">{venue.matches}</span>
            </p>
            <button 
                onClick={() => console.log(`Viewing details for ${venue.name}`)}
                className="mt-4 text-blue-600 text-sm font-semibold hover:underline flex items-center space-x-1"
            >
                <span>View Details</span>
                <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
