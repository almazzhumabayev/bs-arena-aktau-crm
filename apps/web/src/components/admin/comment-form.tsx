'use client';

import { FormEvent, useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { authFetch } from '@/lib/api';
import type { LeadComment } from '@/lib/types';

type CommentFormProps = {
  leadId: number;
  onCreated: (comment: LeadComment) => void;
};

export function CommentForm({ leadId, onCreated }: CommentFormProps) {
  const [saving, setSaving] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const body = String(form.get('body') ?? '').trim();
    const token = localStorage.getItem('bs-arena-token');

    if (!body || !token) {
      return;
    }

    setSaving(true);
    try {
      const comment = await authFetch<LeadComment>(`/leads/${leadId}/comments`, token, {
        method: 'POST',
        body: JSON.stringify({ body })
      });
      event.currentTarget.reset();
      onCreated(comment);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-neutral-200 bg-white p-4">
      <label className="grid gap-2 text-sm font-medium">
        Комментарий
        <textarea name="body" rows={4} className="resize-none rounded-md border border-neutral-300 px-3 py-2 outline-none focus:border-arena-teal" />
      </label>
      <button
        type="submit"
        disabled={saving}
        className="mt-3 inline-flex items-center gap-2 rounded-md bg-arena-ink px-4 py-2 text-sm font-semibold text-white disabled:opacity-70"
      >
        <MessageSquare size={16} aria-hidden />
        {saving ? 'Сохраняем' : 'Добавить комментарий'}
      </button>
    </form>
  );
}
