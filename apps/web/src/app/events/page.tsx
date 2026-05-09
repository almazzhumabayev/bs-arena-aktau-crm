import { CalendarDays, MapPin } from 'lucide-react';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';
import { fetchPublic } from '@/lib/api';
import { fallbackEvents, getPublicEvents } from '@/lib/content';
import type { Event } from '@/lib/types';

export const metadata = {
  title: 'Мероприятия'
};

function formatDate(value: string) {
  return new Date(value).toLocaleDateString('ru-RU', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export default async function EventsPage() {
  const events = getPublicEvents(await fetchPublic<Event[]>('/events', fallbackEvents));

  return (
    <PublicFrame>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Мероприятия"
          title="Турниры, открытые тренировки и спортивные дни"
          description="BS ARENA принимает любительские турниры, корпоративные игры, клубные встречи и детские спортивные события."
          tone="dark"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {events.map((event) => (
            <article key={event.id} className="overflow-hidden rounded-lg border border-white/10 bg-white shadow-panel">
              {event.imageUrl ? <img src={event.imageUrl} alt={event.title} className="h-64 w-full object-cover" /> : null}
              <div className="p-5">
                <h2 className="text-2xl font-semibold">{event.title}</h2>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{event.description}</p>
                <div className="mt-5 flex flex-wrap gap-4 text-sm text-neutral-700">
                  <span className="inline-flex items-center gap-2">
                    <CalendarDays size={16} aria-hidden />
                    {formatDate(event.startsAt)}
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <MapPin size={16} aria-hidden />
                    {event.location}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}
