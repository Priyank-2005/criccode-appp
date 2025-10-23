// src/components/Navbar.jsx
import Link from 'next/link';
import { Trophy, Users, BarChart3, Home, Team } from 'lucide-react';

export default function Navbar() {
  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Tournaments', href: '/tournaments', icon: Trophy },
    { name: 'Players', href: '/players', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ];

  return (
    <nav className="sticky-navbar bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link - Left Side */}
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-900 hover:text-blue-600 transition">
            <span className="text-3xl text-blue-600 font-extrabold">CTS</span>
          </Link>

          {/* Navigation Links - Right Side */}
          <div className="hidden sm:flex space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100 hover:text-blue-600 transition"
              >
                <link.icon size={18} />
                <span>{link.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button (omitted for brevity) */}
        </div>
      </div>
    </nav>
  );
}
