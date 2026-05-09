'use client';

import { AdminContentManager, type ContentColumn, type ContentField } from '@/components/admin/content-manager';
import { dayNames } from '@/lib/content';
import type { ScheduleItem } from '@/lib/types';

const dayOptions = dayNames.map((day, index) => ({ label: day, value: index }));

const fields: ContentField<ScheduleItem>[] = [
  { name: 'title', label: 'Название занятия', type: 'text', required: true, placeholder: 'Детская футбольная секция' },
  { name: 'area', label: 'Зона / зал', type: 'text', required: true, placeholder: 'Футбольная арена' },
  { name: 'dayOfWeek', label: 'День недели', type: 'select', required: true, options: dayOptions, defaultValue: 1 },
  { name: 'startTime', label: 'Начало', type: 'text', required: true, placeholder: '18:00' },
  { name: 'endTime', label: 'Окончание', type: 'text', required: true, placeholder: '19:30' },
  { name: 'capacity', label: 'Лимит мест', type: 'number', placeholder: '24' },
  { name: 'coachId', label: 'ID тренера', type: 'number', placeholder: '1' },
  { name: 'serviceId', label: 'ID услуги', type: 'number', placeholder: '1' }
];

const columns: ContentColumn<ScheduleItem>[] = [
  { header: 'Занятие', render: (item) => <span className="font-semibold">{item.title}</span> },
  { header: 'День', render: (item) => dayNames[item.dayOfWeek] ?? item.dayOfWeek },
  { header: 'Время', render: (item) => `${item.startTime}-${item.endTime}` },
  { header: 'Зал', render: (item) => item.area },
  { header: 'Тренер', render: (item) => item.coach?.name ?? '-' }
];

export default function AdminSchedulePage() {
  return (
    <AdminContentManager<ScheduleItem>
      title="Расписание"
      description="Управление занятиями, днями недели, временем, тренерами и залами."
      endpoint="/schedule"
      createLabel="Добавить занятие"
      emptyText="Расписание пока пустое."
      fields={fields}
      columns={columns}
    />
  );
}
