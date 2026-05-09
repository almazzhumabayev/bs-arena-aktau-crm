'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';
import { clientApiUrl } from '@/lib/api';

const interests = ['Фитнес зал', 'Футбольная арена', 'Единоборства', 'Детские секции', 'Аренда зала', 'Турниры и мероприятия'];

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function LeadForm({ source = 'Сайт' }: { source?: string }) {
  const [state, setState] = useState<SubmitState>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState('submitting');

    const payload = {
      name: String(form.get('name') ?? ''),
      phone: String(form.get('phone') ?? ''),
      email: String(form.get('email') ?? '') || undefined,
      interest: String(form.get('interest') ?? '') || undefined,
      message: String(form.get('message') ?? '') || undefined,
      source
    };

    try {
      const response = await fetch(clientApiUrl('/leads'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Unable to submit lead');
      }

      event.currentTarget.reset();
      setState('success');
    } catch {
      setState('error');
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-white/10 bg-white p-5 shadow-panel">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-neutral-800">
          Имя
          <input
            required
            name="name"
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-arena-amber"
            placeholder="Ваше имя"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-neutral-800">
          Телефон
          <input
            required
            name="phone"
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-arena-amber"
            placeholder="+7"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-neutral-800">
          Email
          <input
            name="email"
            type="email"
            className="rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-arena-amber"
            placeholder="you@example.com"
          />
        </label>
        <label className="grid gap-2 text-sm font-medium text-neutral-800">
          Интерес
          <select name="interest" className="rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-arena-amber">
            {interests.map((interest) => (
              <option key={interest}>{interest}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="mt-4 grid gap-2 text-sm font-medium text-neutral-800">
        Сообщение
        <textarea
          name="message"
          rows={4}
          className="resize-none rounded-md border border-neutral-300 bg-white px-3 py-2 outline-none focus:border-arena-amber"
          placeholder="Напишите, что хотите забронировать или уточнить"
        />
      </label>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          disabled={state === 'submitting'}
          className="inline-flex items-center gap-2 rounded-md bg-[#05070d] px-4 py-2 text-sm font-semibold text-white hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send size={16} aria-hidden />
          {state === 'submitting' ? 'Отправляем' : 'Оставить заявку'}
        </button>
        {state === 'success' ? <p className="text-sm font-medium text-emerald-700">Заявка отправлена. Мы скоро свяжемся с вами.</p> : null}
        {state === 'error' ? <p className="text-sm font-medium text-red-700">Не удалось отправить заявку. Попробуйте еще раз.</p> : null}
      </div>
    </form>
  );
}
