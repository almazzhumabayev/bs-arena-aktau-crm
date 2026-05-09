'use client';

import { AdminContentManager, type ContentColumn, type ContentField } from '@/components/admin/content-manager';
import type { Event } from '@/lib/types';

const fields: ContentField<Event>[] = [
  { name: 'title', label: 'Название', type: 'text', required: true, placeholder: 'Кубок BS ARENA' },
  { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'bs-arena-cup' },
  { name: 'description', label: 'Описание', type: 'textarea', required: true },
  { name: 'startsAt', label: 'Дата и время начала', type: 'datetime', required: true },
  { name: 'endsAt', label: 'Дата и время окончания', type: 'datetime' },
  { name: 'location', label: 'Локация', type: 'text', required: true, placeholder: 'Футбольная арена' },
  { name: 'imageUrl', label: 'URL изображения', type: 'text' }
];

function formatDate(value: string) {
  return new Date(value).toLocaleString('ru-RU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const columns: ContentColumn<Event>[] = [
  { header: 'Название', render: (item) => <span className="font-semibold">{item.title}</span> },
  { header: 'Дата', render: (item) => formatDate(item.startsAt) },
  { header: 'Локация', render: (item) => item.location },
  { header: 'Slug', render: (item) => <span className="text-neutral-600">{item.slug}</span> }
];

export default function AdminEventsPage() {
  return (
    <AdminContentManager<Event>
      title="Мероприятия"
      description="Управление турнирами, событиями и спортивными мероприятиями BS ARENA."
      endpoint="/events"
      createLabel="Добавить мероприятие"
      emptyText="Мероприятий пока нет."
      fields={fields}
      columns={columns}
    />
  );
}
