// src/components/TournamentNav.jsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ListChecks, Table, Users, BarChart3, MapPin } from 'lucide-react';

export default function TournamentNav({ tournamentId }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Matches', href: `/tournaments/${tournamentId}`, icon: ListChecks }, // Root tournament path
    { name: 'Table', href: `/tournaments/${tournamentId}/ranking`, icon: Table },
    { name: 'Squads', href: `/tournaments/${tournamentId}/squads`, icon: Users },
    { name: 'Stats', href: `/tournaments/${tournamentId}/stats`, icon: BarChart3 },
    { name: 'Venues', href: `/tournaments/${tournamentId}/venues`, icon: MapPin },
  ];

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="overflow-x-auto whitespace-nowrap">
          <div className="flex space-x-6 h-12">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/tournaments/${tournamentId}`);

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-2 text-sm font-semibold border-b-2 transition duration-150 ease-in-out 
                    ${isActive 
                      ? 'text-blue-600 border-blue-600' 
                      : 'text-gray-600 border-transparent hover:text-blue-500 hover:border-blue-300'
                    }`}
                >
                  <item.icon size={16} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
