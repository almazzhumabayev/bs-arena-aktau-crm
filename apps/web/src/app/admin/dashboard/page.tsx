'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Inbox, MessageSquare, Trophy, Users, type LucideIcon } from 'lucide-react';
import { AdminGuard } from '@/components/admin/admin-guard';
import { authFetch } from '@/lib/api';
import { statusLabels } from '@/lib/admin-labels';
import type { Lead, LeadStatus } from '@/lib/types';

const statuses: LeadStatus[] = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST'];
const featureCards: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Users, title: 'Заявки с сайта', body: 'Все обращения из публичных форм попадают в CRM.' },
  { icon: MessageSquare, title: 'Комментарии команды', body: 'Менеджеры фиксируют звонки, договоренности и следующие шаги.' },
  { icon: Trophy, title: 'Воронка статусов', body: 'Отслеживайте путь заявки от новой до продажи или отказа.' }
];

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bs-arena-token');
    if (!token) {
      return;
    }

    authFetch<Lead[]>('/leads', token)
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  const metrics = useMemo(
    () =>
      statuses.map((status) => ({
        status,
        count: leads.filter((lead) => lead.status === status).length
      })),
    [leads]
  );

  return (
    <AdminGuard>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-arena-clay">Панель управления</p>
          <h1 className="mt-2 text-3xl font-semibold">Обзор заявок</h1>
        </div>
        <Link href="/admin/leads" className="inline-flex items-center gap-2 rounded-md bg-arena-ink px-4 py-2 text-sm font-semibold text-white">
          <Inbox size={16} aria-hidden />
          Открыть заявки
        </Link>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-5">
        {metrics.map((metric) => (
          <article key={metric.status} className="rounded-lg border border-neutral-200 bg-white p-5">
            <p className="text-sm text-neutral-500">{statusLabels[metric.status]}</p>
            <p className="mt-2 text-3xl font-semibold">{loading ? '-' : metric.count}</p>
          </article>
        ))}
      </div>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <article key={card.title} className="rounded-lg border border-neutral-200 bg-white p-5">
              <Icon size={22} className="text-arena-teal" aria-hidden />
              <h2 className="mt-4 font-semibold">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-neutral-600">{card.body}</p>
            </article>
          );
        })}
      </section>
    </AdminGuard>
  );
}
