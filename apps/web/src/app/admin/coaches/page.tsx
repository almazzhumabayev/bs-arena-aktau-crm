'use client';

import { AdminContentManager, type ContentColumn, type ContentField } from '@/components/admin/content-manager';
import type { Coach } from '@/lib/types';

const fields: ContentField<Coach>[] = [
  { name: 'name', label: 'Имя', type: 'text', required: true, placeholder: 'Арман Садыков' },
  { name: 'role', label: 'Роль', type: 'text', required: true, placeholder: 'Тренер по футболу' },
  { name: 'bio', label: 'Описание', type: 'textarea', required: true },
  { name: 'avatarUrl', label: 'URL фото', type: 'text' },
  { name: 'specialities', label: 'Специализации', type: 'array', required: true, placeholder: 'Каждая специализация с новой строки' },
  { name: 'sortOrder', label: 'Порядок сортировки', type: 'number', defaultValue: 0 }
];

const columns: ContentColumn<Coach>[] = [
  { header: 'Имя', render: (item) => <span className="font-semibold">{item.name}</span> },
  { header: 'Роль', render: (item) => item.role },
  { header: 'Специализации', render: (item) => item.specialities.join(', ') || '-' }
];

export default function AdminCoachesPage() {
  return (
    <AdminContentManager<Coach>
      title="Тренеры"
      description="Управление тренерами и специализациями на публичном сайте."
      endpoint="/coaches"
      createLabel="Добавить тренера"
      emptyText="Тренеров пока нет."
      fields={fields}
      columns={columns}
    />
  );
}
