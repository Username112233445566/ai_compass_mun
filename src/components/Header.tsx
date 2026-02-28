'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import Countdown from './Countdown';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 glass border-b border-white/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Логотип */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 gold-gradient rounded-full flex items-center justify-center text-2xl shadow-lg">
              🧭
            </div>
            <span className="font-bold text-lg text-[#0B1E33]">AI compass MUN</span>
          </div>

          {/* Десктопная навигация */}
          <nav className="hidden md:flex items-center gap-6">
            <Countdown />
            <a
              href="#register"
              className="bg-[#B8914A] hover:bg-[#D4AF37] text-white px-5 py-2 rounded-md transition text-sm font-medium shadow-md"
            >
              Регистрация
            </a>
          </nav>

          {/* Мобильное меню */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-white/50"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} className="text-[#0B1E33]" />
          </button>
        </div>

        {/* Мобильное выпадающее меню */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-white/30 glass animate-fadeIn">
            <div className="flex flex-col items-center gap-4">
              <Countdown />
              <a
                href="#register"
                className="bg-[#B8914A] hover:bg-[#D4AF37] text-white px-6 py-2 rounded-md transition text-sm font-medium w-full text-center"
                onClick={() => setMenuOpen(false)}
              >
                Регистрация
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}