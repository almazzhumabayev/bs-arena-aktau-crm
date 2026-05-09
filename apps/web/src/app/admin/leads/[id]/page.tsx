'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, Mail, Phone } from 'lucide-react';
import { AdminGuard } from '@/components/admin/admin-guard';
import { CommentForm } from '@/components/admin/comment-form';
import { StatusSelect } from '@/components/admin/status-select';
import { authFetch } from '@/lib/api';
import { formatSource } from '@/lib/admin-labels';
import type { Lead, LeadComment } from '@/lib/types';

function formatDate(value: string) {
  return new Date(value).toLocaleString('ru-RU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function LeadDetailsPage() {
  const params = useParams<{ id: string }>();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('bs-arena-token');
    if (!token) {
      return;
    }

    authFetch<Lead>(`/leads/${params.id}`, token)
      .then(setLead)
      .finally(() => setLoading(false));
  }, [params.id]);

  function addComment(comment: LeadComment) {
    setLead((current) => (current ? { ...current, comments: [comment, ...current.comments] } : current));
  }

  return (
    <AdminGuard>
      <Link href="/admin/leads" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-arena-clay">
        <ArrowLeft size={16} aria-hidden />
        Вернуться к заявкам
      </Link>

      {loading ? <p className="mt-8 text-neutral-600">Загружаем заявку...</p> : null}

      {!loading && lead ? (
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-lg border border-neutral-200 bg-white p-6 shadow-panel">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase text-arena-clay">Детали заявки</p>
                <h1 className="mt-2 text-3xl font-semibold">{lead.name}</h1>
              </div>
              <StatusSelect lead={lead} onUpdated={setLead} />
            </div>
            <div className="mt-6 grid gap-4 text-sm">
              <p className="flex items-center gap-2">
                <Phone size={16} aria-hidden />
                {lead.phone}
              </p>
              {lead.email ? (
                <p className="flex items-center gap-2">
                  <Mail size={16} aria-hidden />
                  {lead.email}
                </p>
              ) : null}
              <p>
                <span className="font-semibold">Интерес:</span> {lead.interest ?? '-'}
              </p>
              <p>
                <span className="font-semibold">Источник:</span> {formatSource(lead.source)}
              </p>
              <p>
                <span className="font-semibold">Создана:</span> {formatDate(lead.createdAt)}
              </p>
            </div>
            {lead.message ? <p className="mt-6 rounded-lg bg-neutral-50 p-4 text-sm leading-6 text-neutral-700">{lead.message}</p> : null}
          </section>

          <section className="grid gap-4">
            <CommentForm leadId={lead.id} onCreated={addComment} />
            <div className="rounded-lg border border-neutral-200 bg-white p-5 shadow-panel">
              <h2 className="text-xl font-semibold">Комментарии</h2>
              <div className="mt-4 grid gap-3">
                {lead.comments.length === 0 ? <p className="text-sm text-neutral-500">Комментариев пока нет.</p> : null}
                {lead.comments.map((comment) => (
                  <article key={comment.id} className="rounded-lg border border-neutral-200 p-4">
                    <p className="text-sm leading-6 text-neutral-700">{comment.body}</p>
                    <p className="mt-3 text-xs text-neutral-500">
                      {comment.user.name} - {formatDate(comment.createdAt)}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      ) : null}

      {!loading && !lead ? <p className="mt-8 text-neutral-600">Заявка не найдена.</p> : null}
    </AdminGuard>
  );
}
