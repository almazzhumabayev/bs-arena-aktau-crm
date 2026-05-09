'use client';

import { AdminContentManager, type ContentColumn, type ContentField } from '@/components/admin/content-manager';
import type { Membership } from '@/lib/types';

const fields: ContentField<Membership>[] = [
  { name: 'title', label: 'Название', type: 'text', required: true, placeholder: 'BS Фитнес' },
  { name: 'price', label: 'Цена, ₸', type: 'number', required: true, placeholder: '25000' },
  { name: 'period', label: 'Период', type: 'text', required: true, placeholder: 'месяц' },
  { name: 'description', label: 'Описание', type: 'textarea', required: true },
  { name: 'benefits', label: 'Преимущества', type: 'array', required: true, placeholder: 'Каждое преимущество с новой строки' },
  { name: 'sortOrder', label: 'Порядок сортировки', type: 'number', defaultValue: 0 }
];

const columns: ContentColumn<Membership>[] = [
  { header: 'Название', render: (item) => <span className="font-semibold">{item.title}</span> },
  { header: 'Цена', render: (item) => `${Number(item.price).toLocaleString('ru-RU')} ₸` },
  { header: 'Период', render: (item) => item.period },
  { header: 'Преимущества', render: (item) => `${item.benefits.length} пункт(а)` }
];

export default function AdminMembershipsPage() {
  return (
    <AdminContentManager<Membership>
      title="Абонементы"
      description="Создание и обновление тарифов, которые отображаются на сайте BS ARENA."
      endpoint="/memberships"
      createLabel="Добавить абонемент"
      emptyText="Абонементов пока нет."
      fields={fields}
      columns={columns}
    />
  );
}
