// src/analytics/page.js
'use client';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BarChart3, Loader2 } from 'lucide-react';

// Mock Data for Analytics
const mockAnalyticsData = [
  { name: 'Pant', runs: 780, wickets: 0 },
  { name: 'Kohli', runs: 850, wickets: 2 },
  { name: 'Bumrah', runs: 12, wickets: 32 },
  { name: 'Gill', runs: 690, wickets: 10 },
  { name: 'Chahal', runs: 50, wickets: 28 },
];

export default function AnalyticsDashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setData(mockAnalyticsData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
        <div className="text-center py-20">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
            <p className="mt-2 text-gray-600">Generating analytics reports...</p>
        </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-6 flex items-center text-gray-800 border-b pb-2">
        <BarChart3 className="mr-2 text-blue-600" size={28} />
        Tournament Analytics Dashboard
      </h1>

      <div className='space-y-10'>
        {/* Player Runs Chart */}
        <section>
            <h2 className="text-xl font-semibold mt-4 mb-4 text-gray-700">Top Player Runs</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner border">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                  <Legend />
                  <Bar dataKey="runs" fill="#3b82f6" name="Total Runs" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </section>

        {/* Player Wickets Chart */}
        <section>
            <h2 className="text-xl font-semibold mt-4 mb-4 text-gray-700">Top Player Wickets</h2>
            <div className="bg-gray-50 p-4 rounded-lg shadow-inner border">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis dataKey="name" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                  <Legend />
                  <Bar dataKey="wickets" fill="#10b981" name="Total Wickets" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </section>
      </div>
    </div>
  );
}
