'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { clientApiUrl } from '@/lib/api';
import type { AuthResponse } from '@/lib/types';

type LoginState = 'idle' | 'submitting' | 'error';

export default function AdminLoginPage() {
  const router = useRouter();
  const [state, setState] = useState<LoginState>('idle');

  useEffect(() => {
    if (localStorage.getItem('bs-arena-token')) {
      router.replace('/admin/dashboard');
    }
  }, [router]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setState('submitting');

    try {
      const response = await fetch(clientApiUrl('/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: String(form.get('email') ?? ''),
          password: String(form.get('password') ?? '')
        })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = (await response.json()) as AuthResponse;
      localStorage.setItem('bs-arena-token', data.accessToken);
      localStorage.setItem('bs-arena-user', JSON.stringify(data.user));
      router.push('/admin/dashboard');
    } catch {
      setState('error');
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-arena-ink px-4">
      <section className="w-full max-w-md rounded-lg bg-white p-6 shadow-panel">
        <p className="text-sm font-semibold uppercase text-arena-clay">CRM</p>
        <h1 className="mt-2 text-3xl font-semibold">Вход в BS ARENA</h1>
        <form onSubmit={onSubmit} className="mt-6 grid gap-4">
          <label className="grid gap-2 text-sm font-medium">
            Электронная почта
            <input
              required
              type="email"
              name="email"
              defaultValue="admin@bsarena.local"
              className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-arena-teal"
            />
          </label>
          <label className="grid gap-2 text-sm font-medium">
            Пароль
            <input
              required
              type="password"
              name="password"
              defaultValue="Admin123!"
              className="rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-arena-teal"
            />
          </label>
          <button
            type="submit"
            disabled={state === 'submitting'}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-arena-amber px-4 py-2 font-semibold text-arena-ink disabled:opacity-70"
          >
            <LogIn size={18} aria-hidden />
            {state === 'submitting' ? 'Входим' : 'Войти'}
          </button>
          {state === 'error' ? <p className="text-sm font-medium text-arena-clay">Неверный email или пароль.</p> : null}
        </form>
      </section>
    </main>
  );
}
