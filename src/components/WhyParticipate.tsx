'use client';

import { motion } from 'framer-motion';
import { Handshake, Presentation, ScrollText, Gift, Wallet, Sparkles } from 'lucide-react';

const reasons = [
  {
    icon: Handshake,
    title: 'Нетворкинг',
    description: 'Знакомства с участниками из разных стран и регионов',
  },
  {
    icon: Presentation,
    title: 'Образовательная программа',
    description: 'Мастер-классы, лекции и тренинги от экспертов',
  },
  {
    icon: ScrollText,
    title: 'Официальные сертификаты',
    description: 'Подтверждение участия для портфолио',
  },
  {
    icon: Gift,
    title: 'Ценные подарки',
    description: 'Призы для самых активных делегатов',
  },
  {
    icon: Wallet,
    title: 'Минимальный взнос',
    description: 'Доступное участие при высоком качестве',
  },
  {
    icon: Sparkles,
    title: 'Яркие впечатления',
    description: 'Незабываемая атмосфера и новые друзья',
  },
];

export default function WhyParticipate() {
  return (
    <section className="py-20 px-4 bg-[#F1F5F9]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#0B1E33]"
        >
          Почему стоит участвовать?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-[#2B4B3B] mb-12 max-w-2xl mx-auto"
        >
          Если ты чувствуешь, что готов выйти за рамки обычного, это твой знак
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 soft-shadow hover:shadow-xl transition border border-white/50"
            >
              <div className="flex items-center gap-4 mb-3">
                <div className="p-3 bg-[#B8914A]/10 rounded-full">
                  <reason.icon size={24} className="text-[#B8914A]" />
                </div>
                <h3 className="font-bold text-lg text-[#0B1E33]">{reason.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}