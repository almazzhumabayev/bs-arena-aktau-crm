import { Check } from 'lucide-react';
import { LeadForm } from '@/components/public/lead-form';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';
import { fetchPublic } from '@/lib/api';
import { fallbackMemberships, getPublicMemberships } from '@/lib/content';
import type { Membership } from '@/lib/types';

export const metadata = {
  title: 'Абонементы'
};

function formatPrice(price: number | string) {
  return Number(price).toLocaleString('ru-RU');
}

export default async function MembershipsPage() {
  const memberships = getPublicMemberships(await fetchPublic<Membership[]>('/memberships', fallbackMemberships));

  return (
    <PublicFrame>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Абонементы"
          title="Форматы для первого визита, регулярного фитнеса и команд"
          description="Выберите удобный вариант: разовое посещение, месячный абонемент или фиксированные часы для команды."
          tone="dark"
        />
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {memberships.map((membership, index) => (
            <article
              key={membership.id}
              className={`rounded-lg border p-6 shadow-panel ${
                index === 1 ? 'border-arena-amber bg-[#08111f] text-white' : 'border-white/10 bg-white'
              }`}
            >
              <h2 className="text-2xl font-semibold">{membership.title}</h2>
              <p className={`mt-2 text-sm leading-6 ${index === 1 ? 'text-neutral-300' : 'text-neutral-600'}`}>{membership.description}</p>
              <p className="mt-6 text-3xl font-semibold text-arena-amber">{formatPrice(membership.price)} ₸</p>
              <p className={`text-sm ${index === 1 ? 'text-neutral-400' : 'text-neutral-500'}`}>за {membership.period}</p>
              <ul className={`mt-6 grid gap-3 text-sm ${index === 1 ? 'text-neutral-200' : 'text-neutral-700'}`}>
                {membership.benefits.map((benefit) => (
                  <li key={benefit} className="flex gap-2">
                    <Check size={18} className="mt-0.5 text-arena-amber" aria-hidden />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <SectionHeading title="Готовы начать?" description="Оставьте контакты, и мы поможем выбрать абонемент или забронировать первый визит." />
          <LeadForm source="Страница абонементов" />
        </div>
      </section>
    </PublicFrame>
  );
}
