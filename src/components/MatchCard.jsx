// src/components/MatchCard.jsx
import Link from 'next/link';
import { Clock, MapPin, ExternalLink, Activity } from 'lucide-react';

const formatMatchStatus = (scorecardLength) => {
    // This logic needs refinement based on real API data, but mocks status based on scorecard length
    if (scorecardLength === 0) {
        return { status: 'Upcoming', color: 'text-orange-500', button: 'View Fixture' };
    } else if (scorecardLength > 50) {
        return { status: 'Finished', color: 'text-red-500', button: 'View Scorecard' };
    } else {
        return { status: 'Live', color: 'text-green-500 animate-pulse', button: 'Go Live' };
    }
}

const getMatchScore = (match) => {
    if (!match.scorecard) return { runs: 0, wickets: 0, overs: '0.0' };
    
    const runs = match.scorecard.reduce((acc, b) => acc + b.runs, 0);
    const wickets = match.scorecard.filter(b => b.wicket).length;
    const lastBall = match.scorecard[match.scorecard.length - 1];
    const overs = lastBall ? `${lastBall.over}.${lastBall.ball}` : '0.0';

    return { runs, wickets, overs };
};

export default function MatchCard({ match }) {
    // Check if teamA and teamB are populated (from API)
    const teamAName = match.teamA?.name || 'Team A';
    const teamBName = match.teamB?.name || 'Team B';
    const matchId = match._id || match.id; // Use dynamic matchId

    // Mock scorecard length if not available from data
    const scorecardLength = match.scorecard ? match.scorecard.length : Math.floor(Math.random() * 80);
    const status = formatMatchStatus(scorecardLength);
    const score = getMatchScore(match);
    
    const dateOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const matchTime = new Date(match.date).toLocaleString('en-US', dateOptions);

    return (
        <div className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden">
            <div className={`p-3 text-center text-sm font-semibold flex justify-center items-center space-x-2 
                ${status.status === 'Live' ? 'bg-green-100' : 'bg-gray-100'}`}>
                <Activity size={16} className={status.color} />
                <span className={status.color}>{status.status}</span>
            </div>
            
            <div className="p-5">
                <div className="flex justify-between items-center mb-4 text-sm text-gray-500 border-b pb-3">
                    <p className="flex items-center">
                        <MapPin size={14} className="mr-1" />
                        {match.venue || 'Unknown Venue'}
                    </p>
                    <p className="flex items-center">
                        <Clock size={14} className="mr-1" />
                        {matchTime}
                    </p>
                </div>

                {/* Score Summary */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center text-xl font-bold">
                        <span className="text-gray-800">{teamAName}</span>
                        <span className="text-blue-600">
                            {scorecardLength > 0 ? `${score.runs}/${score.wickets} (${score.overs} Ov)` : 'Yet to Play'}
                        </span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold opacity-70">
                        <span className="text-gray-800">{teamBName}</span>
                        <span className="text-blue-600">
                            {scorecardLength > 0 ? `TBD` : 'Yet to Play'}
                        </span>
                    </div>
                </div>

                <p className="text-xs text-center text-gray-500 italic mt-4">
                    {status.status === 'Upcoming' 
                        ? 'Match scheduled for this time.' 
                        : status.status === 'Live' 
                        ? 'In Progress...' 
                        : 'Match Result: Team A won by 10 runs.'}
                </p>

                <Link href={`/match/${matchId}`} className="mt-5 block">
                    <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
                        <ExternalLink size={18} />
                        <span>{status.button}</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
