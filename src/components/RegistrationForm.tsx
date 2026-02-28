'use client';

import { useState } from 'react';
import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const committees = [
  'ЭКОСОК (кырг)',
  'Генеральная Ассамблея (английский)',
  'Международный Суд (русский)',
  'ФАО (русский)',
] as const;

type FormData = {
  fullName: string;
  age: number;
  committee: (typeof committees)[number];
  experience: number;
  telegram: string;
  phone: string;
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

  telegram: z
    .string()
    .min(3, 'Введите никнейм')
    .regex(/^@?[a-zA-Z0-9_]+$/, 'Некорректный Telegram ник'),

  phone: z
    .string()
    .min(6, 'Введите номер телефона')
    .regex(/^[0-9+\-\s()]+$/, 'Некорректный номер телефона'),

  wishes: z.string().optional(),
});

const resolver: Resolver<FormData> =
  zodResolver(formSchema) as unknown as Resolver<FormData>;

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
      committee: undefined as unknown as FormData['committee'],
      experience: 0,
      telegram: '',
      phone: '',
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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-[#0B1E33]">
          Регистрация
        </h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#F8FAFC] rounded-xl soft-shadow p-6 md:p-8 space-y-5 border border-white/50"
        >
          {/* ФИО */}
          <div>
            <label className="block mb-1 font-medium">ФИО *</label>
            <input {...register('fullName')} className="input" />
            {errors.fullName && <p className="error">{errors.fullName.message}</p>}
          </div>

          {/* Возраст */}
          <div>
            <label className="block mb-1 font-medium">Возраст (11–25) *</label>
            <input type="number" {...register('age', { valueAsNumber: true })} className="input" />
            {errors.age && <p className="error">{errors.age.message}</p>}
          </div>

          {/* Комитет */}
          <div>
            <label className="block mb-1 font-medium">Комитет *</label>
            <select {...register('committee')} defaultValue="" className="input">
              <option value="" disabled>
                Выберите комитет
              </option>
              <option value="ЭКОСОК (кырг)">ЭКОСОК (кырг)</option>
              <option value="Генеральная Ассамблея (английский)">
                Генеральная Ассамблея (английский)
              </option>
              <option value="Международный Суд (русский)">
                Международный Суд (русский)
              </option>
              <option value="ФАО (русский)">ФАО (русский)</option>
            </select>
            {errors.committee && <p className="error">{errors.committee.message}</p>}
          </div>

          {/* Telegram */}
          <div>
            <label className="block mb-1 font-medium">
              Ваш никнейм в Telegram *
            </label>
            <input
              placeholder="@username"
              {...register('telegram')}
              className="input"
            />
            {errors.telegram && <p className="error">{errors.telegram.message}</p>}
          </div>

          {/* Телефон */}
          <div>
            <label className="block mb-1 font-medium">
              Ваш номер телефона *
            </label>
            <input
              placeholder="+996 700 000 000"
              {...register('phone')}
              className="input"
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
          </div>

          {/* Опыт */}
          <div>
            <label className="block mb-1 font-medium">
              Количество посещённых MUN *
            </label>
            <input
              type="number"
              {...register('experience', { valueAsNumber: true })}
              className="input"
            />
            {errors.experience && <p className="error">{errors.experience.message}</p>}
          </div>

          {/* Пожелания */}
          <div>
            <label className="block mb-1 font-medium">
              Пожелания (необязательно)
            </label>
            <textarea {...register('wishes')} rows={4} className="input" />
          </div>

          <button type="submit" className="submit-btn">
            {status === 'loading' ? 'Отправка...' : 'Отправить заявку'}
            <Send size={18} />
          </button>
        </form>
      </div>
    </section>
  );
}