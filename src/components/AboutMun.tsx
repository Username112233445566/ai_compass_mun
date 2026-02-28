'use client';

import { motion } from 'framer-motion';
import { Globe, Mic, Users, FileText } from 'lucide-react';

export default function AboutMun() {
  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-6 text-[#0B1E33]"
        >
          Что такое <span className="text-[#B8914A]">Модель ООН</span>?
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="prose prose-lg mx-auto text-gray-700 space-y-4"
        >
          <p className="text-lg leading-relaxed">
            <span className="font-bold text-[#B8914A]">Модель ООН</span> — это образовательный проект, воссоздающий работу Организации Объединённых Наций. Участники становятся делегатами разных стран, изучают их позицию и обсуждают реальные международные проблемы.
          </p>

          <p className="text-lg leading-relaxed font-medium italic border-l-4 border-[#B8914A] pl-4 py-2 bg-[#B8914A]/5">
            «Модель ООН — это больше, чем игра. Это возможность почувствовать себя дипломатом и стать частью глобального диалога 🌍»
          </p>

          <p className="text-lg leading-relaxed">
            Здесь звучат официальные речи, проходят переговоры, создаются резолюции — всё по правилам настоящей дипломатии.
          </p>
        </motion.div>

        {/* Ключевые особенности */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
          {[
            { icon: Mic, text: 'учатся говорить уверенно и аргументированно' },
            { icon: Users, text: 'развивают лидерские качества' },
            { icon: Globe, text: 'учатся слышать и понимать другие точки зрения' },
            { icon: FileText, text: 'находят единомышленников со всего мира' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 p-4 bg-[#F1F5F9] rounded-lg border border-white/50"
            >
              <div className="w-10 h-10 bg-[#B8914A]/10 rounded-full flex items-center justify-center flex-shrink-0">
                <item.icon size={20} className="text-[#B8914A]" />
              </div>
              <span className="text-[#0B1E33]">{item.text}</span>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-lg font-semibold mt-10 text-[#2B4B3B]"
        >
          Модель ООН — место, где формируются будущие лидеры, дипломаты и просто неравнодушные люди.
          <br />
          <span className="text-[#B8914A]">Это шанс выйти за рамки учебника и попробовать изменить мир.</span>
        </motion.p>
      </div>
    </section>
  );
}