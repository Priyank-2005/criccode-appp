// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 text-center mt-auto shadow-inner">
      <p>&copy; {new Date().getFullYear()} Cricket Management System. All rights reserved.</p>
    </footer>
  );
}
