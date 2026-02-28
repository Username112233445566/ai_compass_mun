'use client';

import { motion } from 'framer-motion';
import { Users, Sparkles, Award, Gift, Calendar } from 'lucide-react';
import Image from 'next/image';


<Image
  src="/logo.png"
  alt="AI compass MUN"
  width={120}
  height={120}
  className="mx-auto mb-6"
/>

export default function Hero() {
  const perks = [
    { icon: Users, text: 'Нетворкинг с участниками' },
    { icon: Sparkles, text: 'Образовательная программа' },
    { icon: Award, text: 'Официальные сертификаты' },
    { icon: Gift, text: 'Ценные подарки' },
    { icon: Calendar, text: '22 марта 2026' },
  ];

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Фоновый градиент */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F1F5F9] to-white" />
      
      {/* Элегантный паттерн (лёгкие линии) */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 20 L50 20 L38 30 L43 45 L30 36 L17 45 L22 30 L10 20 L25 20 Z' fill='%23B8914A'/%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
      }} />

      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
            <span className="text-[#0B1E33]">Модель ООН</span>{' '}
            <span className="text-[#B8914A]">| AI compass</span>
          </h1>
          <p className="text-2xl md:text-3xl text-[#2B4B3B] font-light mb-8">
            22 марта 2026
          </p>
        </motion.div>

        {/* Список преимуществ (иконки + текст) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10"
        >
          {perks.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-white/30"
            >
              <div className="w-8 h-8 rounded-full bg-[#B8914A]/10 flex items-center justify-center">
                <item.icon size={16} className="text-[#B8914A]" />
              </div>
              <span className="text-sm font-medium text-[#0B1E33]">{item.text}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
        >
          <a
            href="#register"
            className="gold-gradient text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-lg hover:shadow-xl hover:scale-105 transform"
          >
            Зарегистрироваться
          </a>
          <a
            href="#about"
            className="bg-white border border-[#B8914A] text-[#B8914A] hover:bg-[#B8914A] hover:text-white font-bold py-3 px-8 rounded-full text-lg transition shadow-md"
          >
            Узнать больше
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm text-gray-500"
        >
          Дедлайн регистрации: <span className="font-semibold text-[#0B1E33]">12 марта 2026</span>
        </motion.p>
      </div>
    </section>
  );
}