'use client';

import { useState } from 'react';
import { authFetch } from '@/lib/api';
import { statusLabels } from '@/lib/admin-labels';
import type { Lead, LeadStatus } from '@/lib/types';

const statuses: LeadStatus[] = ['NEW', 'CONTACTED', 'IN_PROGRESS', 'WON', 'LOST'];

type StatusSelectProps = {
  lead: Lead;
  onUpdated?: (lead: Lead) => void;
};

export function StatusSelect({ lead, onUpdated }: StatusSelectProps) {
  const [status, setStatus] = useState<LeadStatus>(lead.status);
  const [saving, setSaving] = useState(false);

  async function updateStatus(nextStatus: LeadStatus) {
    const token = localStorage.getItem('bs-arena-token');
    if (!token) {
      return;
    }

    setStatus(nextStatus);
    setSaving(true);

    try {
      const updated = await authFetch<Lead>(`/leads/${lead.id}/status`, token, {
        method: 'PATCH',
        body: JSON.stringify({ status: nextStatus })
      });
      onUpdated?.(updated);
    } finally {
      setSaving(false);
    }
  }

  return (
    <select
      value={status}
      disabled={saving}
      onChange={(event) => updateStatus(event.target.value as LeadStatus)}
      className="rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm font-medium"
    >
      {statuses.map((item) => (
        <option key={item} value={item}>
          {statusLabels[item]}
        </option>
      ))}
    </select>
  );
}
