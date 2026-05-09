import { Building2, CalendarCheck, ShieldCheck, type LucideIcon } from 'lucide-react';
import { LeadForm } from '@/components/public/lead-form';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';

export const metadata = {
  title: 'Аренда'
};

const rentalOptions: Array<{ icon: LucideIcon; title: string; body: string }> = [
  { icon: Building2, title: 'Футбольная арена', body: 'Матчи, тренировки, корпоративные игры и регулярные командные слоты.' },
  { icon: CalendarCheck, title: 'Постоянная аренда', body: 'Фиксированное время для школ, клубов, компаний и любительских команд.' },
  { icon: ShieldCheck, title: 'Мероприятия под ключ', body: 'Поможем с форматом турнира, расписанием, встречей гостей и площадкой.' }
];

export default function RentalPage() {
  return (
    <PublicFrame>
      <section
        className="bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(5,7,13,0.9), rgba(5,7,13,0.62), rgba(5,7,13,0.25)), url('https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&w=1800&q=85')"
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 text-white sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase text-arena-amber">Аренда зала</p>
          <h1 className="mt-3 max-w-3xl text-5xl font-semibold">Арендуйте площадку BS ARENA в Актау</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-100">
            Забронируйте футбольную арену, зал для тренировок или площадку для турнира, корпоративного матча и спортивного события.
          </p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div>
          <SectionHeading
            title="Форматы аренды"
            description="Укажите вид спорта, количество участников, дату и время. Мы проверим свободные окна и предложим удобный вариант."
            tone="dark"
          />
          <div className="mt-8 grid gap-4">
            {rentalOptions.map((item) => {
              const Icon = item.icon;
              return (
                <article key={item.title} className="flex gap-4 rounded-lg border border-white/10 bg-[#08111f] p-5 text-white">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-arena-amber text-[#05070d]">
                    <Icon size={20} aria-hidden />
                  </span>
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="mt-1 text-sm leading-6 text-neutral-300">{item.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <LeadForm source="Страница аренды" />
      </section>
    </PublicFrame>
  );
}
