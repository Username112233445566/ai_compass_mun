import { NextResponse } from 'next/server';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(3),
  age: z.coerce.number().min(11).max(25),
  committee: z.enum(['Кыргызский', 'English', 'Русский', 'Другой']),
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

    const { fullName, age, committee, experience, wishes } = parsed.data;

    // Красивое сообщение с HTML-разметкой
    const message = `
<b>📩 Новая заявка на AI compass MUN</b>
━━━━━━━━━━━━━━━━━━━━━
<b>👤 ФИО:</b> ${fullName}
<b>🎂 Возраст:</b> ${age}
<b>🏛 Комитет:</b> ${committee}
<b>🌍 Опыт MUN:</b> ${experience} конференций
<b>📝 Пожелания:</b> ${wishes || '—'}
━━━━━━━━━━━━━━━━━━━━━
<i>Заявка отправлена через сайт</i>
    `;

    const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      throw new Error('Telegram credentials not configured');
    }

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Failed to send message');
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