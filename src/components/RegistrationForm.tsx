'use client';

import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const committees = ['Кыргызский', 'English', 'Русский', 'Другой'] as const;

type FormData = {
  fullName: string;
  age: number;
  committee: (typeof committees)[number];
  experience: number;
  wishes?: string;
};

const formSchema = z.object({
  fullName: z.string().min(3, 'ФИО должно содержать минимум 3 символа'),

  age: z.coerce
    .number()
    .refine((val) => !Number.isNaN(val), { message: 'Введите число' })
    .refine((val) => val >= 11, { message: 'Минимальный возраст — 11 лет' })
    .refine((val) => val <= 25, { message: 'Максимальный возраст — 25 лет' }),

  committee: z.enum(committees, { message: 'Выберите комитет' }),

  experience: z.coerce
    .number()
    .refine((val) => !Number.isNaN(val), { message: 'Введите число' })
    .refine((val) => val >= 0, { message: 'Не может быть отрицательным' })
    .refine((val) => Number.isInteger(val), { message: 'Должно быть целым числом' }),

  wishes: z.string().optional(),
});

// ВАЖНО: фиксируем тип resolver вручную (обходит конфликт типов RHF/Resolvers)
const resolver: Resolver<FormData> = zodResolver(formSchema) as unknown as Resolver<FormData>;

export default function RegistrationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver,
    defaultValues: {
      fullName: '',
      age: 11,
      committee: 'Кыргызский',
      experience: 0,
      wishes: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setStatus('loading');
    try {
      const res = await fetch('/api/send-to-tg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.error || 'Ошибка отправки');
      }

      setStatus('success');
      reset();
      setTimeout(() => setStatus('idle'), 5000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="register" className="py-20 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#0B1E33]">Регистрация</h2>

        {status === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <CheckCircle size={20} />
            <span>Заявка успешно отправлена! Мы свяжемся с вами.</span>
          </div>
        )}

        {status === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 flex items-center gap-2">
            <AlertCircle size={20} />
            <span>Ошибка. Попробуйте позже или напишите @sucr4e.</span>
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#F8FAFC] rounded-xl soft-shadow p-6 md:p-8 space-y-5 border border-white/50"
        >
          {/* ФИО */}
          <div>
            <label className="block mb-1 font-medium text-[#0B1E33]">ФИО *</label>
            <input
              {...register('fullName')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8914A]"
            />
            {errors.fullName && <p className="text-red-600 text-sm mt-1">{errors.fullName.message}</p>}
          </div>

          {/* Возраст */}
          <div>
            <label className="block mb-1 font-medium text-[#0B1E33]">Возраст * (11–25)</label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8914A]"
            />
            {errors.age && <p className="text-red-600 text-sm mt-1">{errors.age.message}</p>}
          </div>

          {/* Комитет */}
          <div>
            <label className="block mb-1 font-medium text-[#0B1E33]">Комитет *</label>
            <select
              {...register('committee')}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8914A]"
            >
              <option value="" disabled>
                Выберите комитет
              </option>
              <option value="Кыргызский">🇰🇬 Кыргызский</option>
              <option value="English">🇬🇧 English</option>
              <option value="Русский">🇷🇺 Русский</option>
              <option value="Другой">🌐 Другой</option>
            </select>
            {errors.committee && <p className="text-red-600 text-sm mt-1">{errors.committee.message}</p>}
          </div>

          {/* Опыт */}
          <div>
            <label className="block mb-1 font-medium text-[#0B1E33]">Количество посещённых MUN *</label>
            <input
              type="number"
              {...register('experience', { valueAsNumber: true })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8914A]"
            />
            {errors.experience && <p className="text-red-600 text-sm mt-1">{errors.experience.message}</p>}
          </div>

          {/* Пожелания */}
          <div>
            <label className="block mb-1 font-medium text-[#0B1E33]">Пожелания (необязательно)</label>
            <textarea
              {...register('wishes')}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B8914A]"
              placeholder="Любые вопросы или пожелания..."
            />
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full gold-gradient text-white font-bold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}