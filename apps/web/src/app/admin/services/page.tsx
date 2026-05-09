'use client';

import { AdminContentManager, type ContentColumn, type ContentField } from '@/components/admin/content-manager';
import type { Service } from '@/lib/types';

const fields: ContentField<Service>[] = [
  { name: 'title', label: 'Название', type: 'text', required: true, placeholder: 'Фитнес зал' },
  { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'fitness-gym' },
  { name: 'description', label: 'Описание', type: 'textarea', required: true },
  { name: 'priceLabel', label: 'Цена / подпись', type: 'text', placeholder: 'от 25 000 ₸ / месяц' },
  { name: 'durationMinutes', label: 'Длительность, мин', type: 'number', placeholder: '60' },
  { name: 'imageUrl', label: 'URL изображения', type: 'text' },
  { name: 'sortOrder', label: 'Порядок сортировки', type: 'number', defaultValue: 0 }
];

const columns: ContentColumn<Service>[] = [
  { header: 'Название', render: (item) => <span className="font-semibold">{item.title}</span> },
  { header: 'Slug', render: (item) => <span className="text-neutral-600">{item.slug}</span> },
  { header: 'Цена', render: (item) => item.priceLabel ?? '-' },
  { header: 'Длительность', render: (item) => (item.durationMinutes ? `${item.durationMinutes} мин` : '-') }
];

export default function AdminServicesPage() {
  return (
    <AdminContentManager<Service>
      title="Услуги"
      description="Управление направлениями публичного сайта: фитнес, футбол, единоборства, аренда и мероприятия."
      endpoint="/services"
      createLabel="Добавить услугу"
      emptyText="Услуг пока нет."
      fields={fields}
      columns={columns}
    />
  );
}
