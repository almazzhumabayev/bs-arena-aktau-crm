import { Clock, MapPin, Users } from 'lucide-react';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';
import { fetchPublic } from '@/lib/api';
import { dayNames, fallbackSchedule, getPublicSchedule } from '@/lib/content';
import type { ScheduleItem } from '@/lib/types';

export const metadata = {
  title: 'Расписание'
};

export default async function SchedulePage() {
  const schedule = getPublicSchedule(await fetchPublic<ScheduleItem[]>('/schedule', fallbackSchedule));
  const grouped = dayNames.map((day, index) => ({
    day,
    items: schedule.filter((item) => item.dayOfWeek === index)
  }));

  return (
    <PublicFrame>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Расписание"
          title="Тренировки и занятия на неделю"
          description="Планируйте тренировки заранее. Точное время аренды и свободные окна администратор подтвердит после заявки."
          tone="dark"
        />
        <div className="mt-8 grid gap-5">
          {grouped.map((group) =>
            group.items.length ? (
              <section key={group.day} className="rounded-lg border border-white/10 bg-white p-5 shadow-panel">
                <h2 className="text-xl font-semibold">{group.day}</h2>
                <div className="mt-4 grid gap-3">
                  {group.items.map((item) => (
                    <article key={item.id} className="grid gap-3 rounded-lg border border-neutral-200 p-4 md:grid-cols-[1fr_auto]">
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-neutral-600">{item.coach?.name ?? 'Тренер BS ARENA'}</p>
                      </div>
                      <div className="flex flex-wrap gap-3 text-sm text-neutral-700">
                        <span className="inline-flex items-center gap-1">
                          <Clock size={16} aria-hidden />
                          {item.startTime}-{item.endTime}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin size={16} aria-hidden />
                          {item.area}
                        </span>
                        {item.capacity ? (
                          <span className="inline-flex items-center gap-1">
                            <Users size={16} aria-hidden />
                            {item.capacity}
                          </span>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ) : null
          )}
        </div>
      </section>
    </PublicFrame>
  );
}
