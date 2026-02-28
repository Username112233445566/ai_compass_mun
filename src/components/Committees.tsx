'use client';

import { motion } from 'framer-motion';

const committees = [
  {
    title: 'Кыргызский комитет',
    committee: 'ЭКОСОК',
    theme: 'Латын Америкасындагы инклюзивдүү өнүгүү: Туруктуу өнүгүү максаттарына жетүүнүн жолдору',
    description: 'Обсуждение инклюзивного развития в Латинской Америке и достижения Целей устойчивого развития.',
    icon: '🇰🇬',
  },
  {
    title: 'English Committee',
    committee: 'General Assembly',
    theme: 'Comprehensive international response to combat contemporary forms of slavery and human trafficking',
    description: 'Debating global measures to fight modern slavery and human trafficking.',
    icon: '🇺🇳',
  },
  {
    title: 'Русский комитет (ФАО)',
    committee: 'ФАО',
    theme: 'Банановый вирус: возможное исчезновение ключевых фермерских культурных угодий',
    description: 'Анализ угрозы продовольственной безопасности из-за распространения бананового вируса.',
    icon: '🍌',
  },
  {
    title: 'Русский комитет (Международный Суд)',
    committee: 'Международный Суд',
    theme: 'Признание Косово как суверенное государство',
    description: 'Рассмотрение правовых аспектов одностороннего провозглашения независимости Косово.',
    icon: '⚖️',
  },
];

export default function Committees() {
  return (
    <section id="committees" className="py-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0B1E33]">Комитеты</h2>
      <p className="text-center text-[#2B4B3B] mb-12 max-w-2xl mx-auto">
        Выбери направление, которое тебе ближе
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {committees.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 soft-shadow hover:shadow-xl transition border border-white/50 hover:border-[#B8914A] hover:border-t-4"
          >
            <div className="text-4xl mb-3">{c.icon}</div>
            <h3 className="text-xl font-bold mb-1 text-[#0B1E33]">{c.title}</h3>
            <p className="text-sm font-semibold text-[#B8914A] mb-2">{c.committee}</p>
            <p className="text-sm font-medium text-gray-700 mb-3 line-clamp-2">{c.theme}</p>
            <p className="text-gray-600 text-xs">{c.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}