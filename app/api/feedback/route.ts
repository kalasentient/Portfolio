import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const { rating, text, email } = await request.json();

  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid rating' }, { status: 400 });
  }

  const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);

  await resend.emails.send({
    from: 'Portfolio Feedback <onboarding@resend.dev>',
    to: 'asakalageraghty@gmail.com',
    subject: `AI Match Feedback — ${stars} (${rating}/5)`,
    text: [
      `Rating: ${stars} (${rating}/5)`,
      text ? `Feedback: ${text}` : 'Feedback: (none)',
      email ? `Respondent email: ${email}` : 'Respondent email: (not provided)',
    ].join('\n\n'),
  });

  return NextResponse.json({ ok: true });
}
