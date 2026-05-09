import { LeadForm } from '@/components/public/lead-form';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';
import { ServiceCard } from '@/components/public/service-card';
import { fetchPublic } from '@/lib/api';
import { fallbackServices, getPublicServices } from '@/lib/content';
import type { Service } from '@/lib/types';

export const metadata = {
  title: 'Услуги'
};

export default async function ServicesPage() {
  const services = getPublicServices(await fetchPublic<Service[]>('/services', fallbackServices));

  return (
    <PublicFrame>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Услуги"
          title="Фитнес, футбол, единоборства и аренда в одном комплексе"
          description="Выберите формат под свою цель: персональные тренировки, командная игра, детская секция, аренда зала или мероприятие."
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
          <SectionHeading title="Подберем формат под вас" description="Оставьте заявку, и администратор подскажет свободное время, условия и подходящий зал." />
          <LeadForm source="Страница услуг" />
        </div>
      </section>
    </PublicFrame>
  );
}
