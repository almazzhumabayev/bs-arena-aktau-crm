import Link from 'next/link';
import { Dumbbell } from 'lucide-react';
import { publicNav } from '@/lib/content';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#05070d]/95 text-white backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-arena-amber text-[#05070d]">
            <Dumbbell size={20} aria-hidden />
          </span>
          <span className="text-white">BS ARENA</span>
        </Link>
        <nav className="hidden flex-wrap items-center justify-end gap-x-5 gap-y-2 text-sm font-medium text-neutral-300 lg:flex">
          {publicNav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-arena-amber">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contacts"
          className="inline-flex items-center rounded-md bg-arena-amber px-4 py-2 text-sm font-semibold text-[#05070d] hover:bg-yellow-300"
        >
          Записаться
        </Link>
      </div>
    </header>
  );
}
