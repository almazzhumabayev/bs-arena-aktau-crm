import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';
import { fetchPublic } from '@/lib/api';
import { fallbackCoaches, getPublicCoaches } from '@/lib/content';
import type { Coach } from '@/lib/types';

export const metadata = {
  title: 'Тренеры'
};

export default async function CoachesPage() {
  const coaches = getPublicCoaches(await fetchPublic<Coach[]>('/coaches', fallbackCoaches));

  return (
    <PublicFrame>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Тренеры"
          title="Команда, которая ведет к результату"
          description="Тренеры BS ARENA помогают выстроить технику, нагрузку и регулярность для взрослых, детей и команд."
          tone="dark"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {coaches.map((coach) => (
            <article key={coach.id} className="overflow-hidden rounded-lg border border-white/10 bg-white shadow-panel">
              {coach.avatarUrl ? <img src={coach.avatarUrl} alt={coach.name} className="h-64 w-full object-cover" /> : null}
              <div className="p-5">
                <h2 className="text-xl font-semibold">{coach.name}</h2>
                <p className="mt-1 text-sm font-semibold text-arena-amber">{coach.role}</p>
                <p className="mt-3 text-sm leading-6 text-neutral-700">{coach.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {coach.specialities.map((item) => (
                    <span key={item} className="rounded-md bg-[#08111f] px-3 py-1 text-xs font-semibold text-white">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}
