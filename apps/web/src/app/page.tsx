import Link from 'next/link';
import { CalendarDays, Trophy, Users, type LucideIcon } from 'lucide-react';
import { LeadForm } from '@/components/public/lead-form';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';
import { ServiceCard } from '@/components/public/service-card';
import { fallbackServices, getPublicServices } from '@/lib/content';
import { fetchPublic } from '@/lib/api';
import type { Service } from '@/lib/types';

const stats: Array<{ icon: LucideIcon; label: string; value: string }> = [
  { icon: Trophy, label: 'Турниры и матчи', value: 'Арена для командных событий' },
  { icon: Users, label: 'Для взрослых и детей', value: 'Фитнес, футбол, секции' },
  { icon: CalendarDays, label: 'Удобная запись', value: 'Тренировки и аренда по расписанию' }
];

export default async function HomePage() {
  const services = getPublicServices(await fetchPublic<Service[]>('/services', fallbackServices));

  return (
    <PublicFrame>
      <section
        className="relative flex min-h-[78vh] items-center bg-cover bg-center text-white"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,7,13,0.92), rgba(5,7,13,0.68) 48%, rgba(5,7,13,0.28)), url('https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1800&q=85')"
        }}
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-arena-amber">Спортивный комплекс в Актау</p>
            <h1 className="mt-4 text-5xl font-semibold md:text-7xl">BS ARENA</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-100">
              Фитнес зал, футбольная арена, единоборства, детские секции и аренда площадки для тех, кто выбирает сильный ритм.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/contacts" className="rounded-md bg-arena-amber px-5 py-3 text-sm font-semibold text-[#05070d] hover:bg-yellow-300">
                Записаться на тренировку
              </Link>
              <Link href="/rental" className="rounded-md border border-white px-5 py-3 text-sm font-semibold hover:bg-white hover:text-[#05070d]">
                Арендовать зал
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#08111f] text-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 sm:px-6 md:grid-cols-3 lg:px-8">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-md bg-arena-amber text-[#05070d]">
                  <Icon size={20} aria-hidden />
                </span>
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-sm text-neutral-300">{item.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Направления"
          title="Все для спорта, формы и командной игры"
          description="BS ARENA объединяет тренажерный зал, футбольную арену, зал единоборств, детские секции и аренду площадки в одном месте."
          tone="dark"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <SectionHeading
              eyebrow="Заявка"
              title="Хотите тренироваться или арендовать зал?"
              description="Оставьте контакты, и администратор BS ARENA подберет формат, время и стоимость под вашу задачу."
            />
          </div>
          <LeadForm source="Главная страница" />
        </div>
      </section>
    </PublicFrame>
  );
}
