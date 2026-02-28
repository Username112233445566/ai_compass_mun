import Image from 'next/image';
import { Send } from 'lucide-react';

export default function Contacts() {
  return (
    <section className="py-20 px-4 bg-[#F1F5F9]">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#0B1E33]">
        Организаторы
      </h2>

      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Генеральный секретарь */}
        <div className="text-center p-6 bg-white rounded-xl soft-shadow border border-white/50">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#B8914A]/30 shadow-sm">
            <Image
              src="/organizers/nurel.jpg"
              alt="Шабданов Нурэл"
              width={96}
              height={96}
              className="w-full h-full object-cover"
              priority
            />
          </div>

          <p className="font-bold text-lg text-[#0B1E33]">Генеральный секретарь</p>
          <p className="text-gray-700">Шабданов Нурэл</p>
          <a
            href="https://t.me/Upamecano0"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-[#B8914A] hover:underline mt-2"
          >
            <Send size={16} /> @Upamecano0
          </a>
        </div>

        {/* Координатор */}
        <div className="text-center p-6 bg-white rounded-xl soft-shadow border border-white/50">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-[#2B4B3B]/25 shadow-sm">
            <Image
              src="/organizers/alisher.jpg"
              alt="Белеков Алишер"
              width={96}
              height={96}
              className="w-full h-full object-cover"
            />
          </div>

          <p className="font-bold text-lg text-[#0B1E33]">Координатор</p>
          <p className="text-gray-700">Белеков Алишер</p>
          <a
            href="https://t.me/fuxtii"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-[#B8914A] hover:underline mt-2"
          >
            <Send size={16} /> @fuxtii
          </a>
        </div>

        {/* Зам. секретаря (без фото пока) */}
        <div className="text-center p-6 bg-white rounded-xl soft-shadow border border-white/50">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-[#0B1E33] flex items-center justify-center text-3xl text-white shadow-sm">
            👤
          </div>

          <p className="font-bold text-lg text-[#0B1E33]">Зам. секретаря</p>
          <p className="text-gray-700">Уларбекова Даткайым</p>
          <p className="text-sm text-gray-500 mt-2">По всем вопросам:</p>
          <a
            href="https://t.me/sucr4e"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-1 text-[#B8914A] hover:underline"
          >
            <Send size={16} /> @sucr4e
          </a>
        </div>
      </div>
    </section>
  );
}