// src/match/[matchId]/page.js
'use client';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { fetchMatchById } from '../../lib/api'; 
import Scorecard from '../Scorecard';
import { Loader2, Zap, Calendar, MapPin } from 'lucide-react';

let socket;

export default function LiveMatch({ params }) {
  const id = params.matchId;

  const [match, setMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [latestBall, setLatestBall] = useState(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);

  // Helper function to calculate current score
  const calculateScore = (scorecard = []) => {
    const totalRuns = scorecard.reduce((acc, ball) => acc + ball.runs, 0);
    const totalWickets = scorecard.filter(b => b.wicket).length;
    
    const lastBall = scorecard[scorecard.length - 1];
    const totalOvers = lastBall ? `${lastBall.over}.${lastBall.ball}` : '0.0';
    
    return { totalRuns, totalWickets, totalOvers };
  };

  // 1. Initial Data Fetch
  useEffect(() => {
    if (!id) return;

    const loadMatch = async () => {
      try {
        setLoading(true);
        // Uses mock data in lib/api.js since backend isn't ready
        const data = await fetchMatchById(id);
        setMatch(data);
        if (data.scorecard.length > 0) {
            setLatestBall(data.scorecard[data.scorecard.length - 1]);
        }
      } catch (e) {
        console.error("Failed to fetch match:", e);
      } finally {
        setLoading(false);
      }
    };
    loadMatch();
  }, [id]);

  // 2. Socket.IO Connection (MOCKED)
  useEffect(() => {
    // In a real application, you would connect to the backend here.
    // We are mocking the Socket.IO client since the server is not running.
    
    if (!id || loading) return; 

    // MOCK SOCKET.IO BEHAVIOR
    console.log("Mocking Socket.IO connection for live updates...");
    setIsSocketConnected(true);

    const interval = setInterval(() => {
        // Mock a new ball update every 3 seconds
        setMatch(prev => {
            if (!prev) return null;
            
            const newBall = {
                over: Math.floor(prev.scorecard.length / 6),
                ball: (prev.scorecard.length % 6) + 1,
                batsman: prev.teamA.players[0], // Simplified assumption
                bowler: prev.teamB.players[0], // Simplified assumption
                runs: [0, 1, 2, 3, 4, 6, 0, 0][Math.floor(Math.random() * 8)],
                wicket: Math.random() < 0.1 // 10% chance of a wicket
            };

            // This simulates data coming from a 'match_update' socket event
            setLatestBall(newBall);
            
            return {
                ...prev,
                scorecard: [...prev.scorecard, newBall]
            };
        });
    }, 3000); // Update every 3 seconds

    return () => {
        // In a real app: socket.disconnect();
        clearInterval(interval);
        setIsSocketConnected(false);
    };
  }, [id, loading]); // Connect once ID is available and initial data is loaded

  if (loading) {
    return (
        <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="mt-2 text-gray-600">Loading Live Match Data...</p>
        </div>
    );
  }

  if (!match) return <div className="text-center py-10 text-red-500 p-8 bg-white rounded-lg shadow-lg">Match not found.</div>;

  const { totalRuns, totalWickets, totalOvers } = calculateScore(match.scorecard);

  return (
    <div className="p-4 bg-white min-h-screen rounded-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2 border-b pb-2">
        {match.teamA.name} vs {match.teamB.name}
      </h1>
      
      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
        <p className="flex items-center"><MapPin size={16} className="mr-1" /> Venue: {match.venue}</p>
        <p className="flex items-center"><Calendar size={16} className="mr-1" /> Date: {new Date(match.date).toLocaleDateString()}</p>
      </div>

      <div className="bg-blue-600 text-white p-6 rounded-lg shadow-xl mb-6 flex justify-between items-center">
        <div>
            <h2 className="text-5xl font-extrabold">
              {totalRuns} / {totalWickets}
            </h2>
            <p className="text-lg mt-1 font-medium">Overs: {totalOvers}</p>
        </div>
        <div className="text-right">
            <span className={`inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full ${isSocketConnected ? 'bg-green-400 text-green-900' : 'bg-red-400 text-red-900'}`}>
                <Zap size={16} className={`mr-2 ${isSocketConnected ? 'animate-pulse' : ''}`} />
                {isSocketConnected ? 'Live Updates ON (Mock)' : 'Connection Offline'}
            </span>
        </div>
      </div>

      {latestBall && (
        <div className="p-4 bg-green-50 text-green-800 border-l-4 border-green-600 mb-6 rounded-lg">
          <p className="font-semibold text-lg">
            Ball {latestBall.over}.{latestBall.ball}:
            <span className={`font-extrabold ml-2 ${latestBall.wicket ? 'text-red-700' : 'text-blue-700'}`}>
              {latestBall.runs} {latestBall.runs === 1 ? 'Run' : 'Runs'} {latestBall.wicket ? ' | WICKET!' : ''}
            </span>
          </p>
          <p className="text-sm text-gray-600 mt-1">
            <span className="font-medium">{latestBall.batsman?.name || 'N/A'}</span> vs <span className="font-medium">{latestBall.bowler?.name || 'N/A'}</span>
          </p>
        </div>
      )}

      <h3 className="mt-8 text-2xl font-semibold mb-4 border-b pb-2 text-gray-800">Ball-by-Ball Scorecard (Live)</h3>
      <Scorecard scorecard={match.scorecard} />
    </div>
  );
}
