import { NextResponse } from 'next/server';
import { z } from 'zod';

const committees = [
  'ЭКОСОК (кырг)',
  'Генеральная Ассамблея (английский)',
  'Международный Суд (русский)',
  'ФАО (русский)',
  'ЮНЕСКО (русский)',
] as const;

const formSchema = z.object({
  fullName: z.string().min(3),
  age: z.coerce.number().min(11).max(25),
  committee: z.enum(committees),
  telegram: z
    .string()
    .min(3)
    .regex(/^@?[a-zA-Z0-9_]+$/, 'Invalid Telegram username'),
  phone: z
    .string()
    .min(6)
    .regex(/^[0-9+\-\s()]+$/, 'Invalid phone number'),
  experience: z.coerce.number().min(0).int(),
  wishes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = formSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.format() }, { status: 400 });
    }

    const { fullName, age, committee, telegram, phone, experience, wishes } = parsed.data;

    // Нормализуем telegram чтобы всегда был с @
    const tg = telegram.startsWith('@') ? telegram : `@${telegram}`;

    const message = `
<b>📩 Новая заявка на AI compass MUN</b>
━━━━━━━━━━━━━━━━━━━━━
<b>👤 ФИО:</b> ${fullName}
<b>🎂 Возраст:</b> ${age}
<b>🏛 Комитет:</b> ${committee}
<b>📲 Telegram:</b> ${tg}
<b>📞 Телефон:</b> ${phone}
<b>🌍 Опыт MUN:</b> ${experience} конференций
<b>📝 Пожелания:</b> ${wishes?.trim() ? wishes : '—'}
━━━━━━━━━━━━━━━━━━━━━
<i>Заявка отправлена через сайт</i>
    `.trim();

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      return NextResponse.json(
        { error: 'Telegram credentials not configured' },
        { status: 500 }
      );
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        { error: errorData?.description || 'Failed to send message' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}