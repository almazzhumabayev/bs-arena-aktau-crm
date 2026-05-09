import { Mail, MapPin, Phone } from 'lucide-react';
import { LeadForm } from '@/components/public/lead-form';
import { PublicFrame } from '@/components/public/public-frame';
import { SectionHeading } from '@/components/public/section-heading';

export const metadata = {
  title: 'Контакты'
};

export default function ContactsPage() {
  return (
    <PublicFrame>
      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.85fr_1.15fr] lg:px-8">
        <div>
          <SectionHeading
            eyebrow="Контакты"
            title="Свяжитесь с BS ARENA"
            description="Напишите нам, чтобы записаться в фитнес зал, уточнить детские секции, забронировать арену или обсудить мероприятие."
            tone="dark"
          />
          <div className="mt-8 grid gap-4 text-sm">
            <p className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08111f] p-4 text-white">
              <Phone size={18} className="text-arena-amber" aria-hidden />
              +7 700 000 00 00
            </p>
            <p className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08111f] p-4 text-white">
              <Mail size={18} className="text-arena-amber" aria-hidden />
              hello@bsarena.local
            </p>
            <p className="flex items-center gap-3 rounded-lg border border-white/10 bg-[#08111f] p-4 text-white">
              <MapPin size={18} className="text-arena-amber" aria-hidden />
              Актау, Казахстан
            </p>
          </div>
        </div>
        <LeadForm source="Страница контактов" />
      </section>
    </PublicFrame>
  );
}
