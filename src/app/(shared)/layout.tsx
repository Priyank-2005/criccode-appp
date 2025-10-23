// src/app/(shared)/layout.tsx
import '../globals.css'; // FIX: Corrected relative path as globals.css is now in the same folder
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

export const metadata = {
  title: 'CTS | Cricket Tournament Manager',
  description: 'Live scores, stats, tables, and fixtures for your cricket tournament.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        {/* Main content area: center content and ensure full width */}
        <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
            {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
