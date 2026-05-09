import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';

export const metadata = {
  title: 'О комплексе'
};

export default function AboutPage() {
  return (
    <PublicFrame>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow="О комплексе"
            title="BS ARENA - спортивная точка притяжения в Актау"
            description="Мы создали пространство для регулярных тренировок, футбола, единоборств, детского спорта и мероприятий. Здесь удобно заниматься самому, собрать команду или провести турнир."
            tone="dark"
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ['7 дней', 'Работаем всю неделю'],
              ['6 зон', 'Фитнес, арена, секции'],
              ['Актау', 'Удобная локация в городе']
            ].map(([value, label]) => (
              <div key={value} className="rounded-lg border border-white/10 bg-[#08111f] p-5 shadow-panel">
                <p className="text-2xl font-semibold text-arena-amber">{value}</p>
                <p className="mt-1 text-sm text-neutral-300">{label}</p>
              </div>
            ))}
          </div>
        </div>
        <img
          src="https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1200&q=80"
          alt="Спортивный зал"
          className="h-full min-h-96 w-full rounded-lg object-cover shadow-panel"
        />
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
          {[
            ['Сильная инфраструктура', 'Площадки и зоны рассчитаны на тренировки, аренду, групповые занятия и спортивные события.'],
            ['Тренерский подход', 'Тренировки строятся вокруг техники, безопасности, дисциплины и понятного прогресса.'],
            ['Готовность к событиям', 'Арена подходит для турниров, корпоративных игр, открытых дней и клубных мероприятий.']
          ].map(([title, body]) => (
            <article key={title} className="rounded-lg border border-neutral-200 p-5">
              <h2 className="text-xl font-semibold">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-neutral-700">{body}</p>
            </article>
          ))}
        </div>
      </section>
    </PublicFrame>
  );
}
