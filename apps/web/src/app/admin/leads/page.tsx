'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { AdminGuard } from '@/components/admin/admin-guard';
import { StatusSelect } from '@/components/admin/status-select';
import { authFetch } from '@/lib/api';
import { formatSource } from '@/lib/admin-labels';
import type { Lead } from '@/lib/types';

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default function AdminLeadsPage() {
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

  function updateLead(updated: Lead) {
    setLeads((current) => current.map((lead) => (lead.id === updated.id ? updated : lead)));
  }

  return (
    <AdminGuard>
      <div>
        <p className="text-sm font-semibold uppercase text-arena-clay">CRM</p>
        <h1 className="mt-2 text-3xl font-semibold">Заявки</h1>
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-panel">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-neutral-50 text-neutral-600">
              <tr>
                <th className="px-4 py-3 font-semibold">Клиент</th>
                <th className="px-4 py-3 font-semibold">Контакты</th>
                <th className="px-4 py-3 font-semibold">Интерес</th>
                <th className="px-4 py-3 font-semibold">Статус</th>
                <th className="px-4 py-3 font-semibold">Создана</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {loading ? (
                <tr>
                  <td className="px-4 py-5 text-neutral-500" colSpan={5}>
                    Загружаем заявки...
                  </td>
                </tr>
              ) : null}
              {!loading && leads.length === 0 ? (
                <tr>
                  <td className="px-4 py-5 text-neutral-500" colSpan={5}>
                    Заявок пока нет.
                  </td>
                </tr>
              ) : null}
              {leads.map((lead) => (
                <tr key={lead.id} className="align-top">
                  <td className="px-4 py-4">
                    <Link href={`/admin/leads/${lead.id}`} className="font-semibold text-arena-ink hover:text-arena-clay">
                      {lead.name}
                    </Link>
                    <p className="mt-1 text-xs text-neutral-500">{formatSource(lead.source)}</p>
                  </td>
                  <td className="px-4 py-4">
                    <p className="flex items-center gap-2">
                      <Phone size={14} aria-hidden />
                      {lead.phone}
                    </p>
                    {lead.email ? (
                      <p className="mt-1 flex items-center gap-2 text-neutral-600">
                        <Mail size={14} aria-hidden />
                        {lead.email}
                      </p>
                    ) : null}
                  </td>
                  <td className="px-4 py-4">{lead.interest ?? '-'}</td>
                  <td className="px-4 py-4">
                    <StatusSelect lead={lead} onUpdated={updateLead} />
                  </td>
                  <td className="px-4 py-4 text-neutral-600">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AdminGuard>
  );
}
