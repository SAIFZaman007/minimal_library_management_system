import { BookOpen, Moon, Sun } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onBorrowSummaryClick: () => void;
}

export default function Navbar({ onBorrowSummaryClick }: NavbarProps) {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <nav className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" />
            <span className="text-2xl font-bold text-white">MLMS</span>
          </div>


          <div className="flex items-center gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 text-gray-300 underline hover:text-cyan-800 transition font-medium"
            >
              Books
            </button>
            <button
              onClick={onBorrowSummaryClick}
              className="px-6 py-2 text-gray-300 underline hover:text-cyan-800 transition font-medium"
            >
              Borrow Summary
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}