import Link from 'next/link';
import { MapPin, Phone } from 'lucide-react';
import { publicNav } from '@/lib/content';

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05070d] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <div>
          <p className="text-xl font-semibold">BS ARENA</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-neutral-300">
            Спортивный комплекс и фитнес зал в Актау для тренировок, футбола, единоборств, аренды и мероприятий.
          </p>
        </div>
        <div>
          <p className="font-semibold text-arena-amber">Навигация</p>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-neutral-300">
            {publicNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-3 text-sm text-neutral-300">
          <p className="font-semibold text-arena-amber">Контакты</p>
          <p className="flex items-center gap-2">
            <Phone size={16} aria-hidden />
            +7 700 000 00 00
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} aria-hidden />
            Актау, Казахстан
          </p>
        </div>
      </div>
    </footer>
  );
}
