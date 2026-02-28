import { Instagram, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1E33] text-white py-8 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-300">
          © {new Date().getFullYear()} AI compass MUN. Все права защищены.
        </p>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/ai.compass_mun?igsh=MTkwY2Uwc2JyZWwydA=="
            target="_blank"
            rel="noopener"
            className="hover:text-[#B8914A] transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://t.me/sucr4e"
            target="_blank"
            rel="noopener"
            className="hover:text-[#B8914A] transition"
          >
            <Send size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}