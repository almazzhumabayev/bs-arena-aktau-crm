'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  CalendarDays,
  CreditCard,
  Dumbbell,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Trophy,
  UsersRound,
  type LucideIcon
} from 'lucide-react';
import { roleLabels } from '@/lib/admin-labels';
import type { User } from '@/lib/types';

const navLinks: Array<{ href: string; label: string; icon: LucideIcon }> = [
  { href: '/admin/dashboard', label: 'Главная', icon: LayoutDashboard },
  { href: '/admin/leads', label: 'Заявки', icon: MessageSquare },
  { href: '/admin/services', label: 'Услуги', icon: Dumbbell },
  { href: '/admin/memberships', label: 'Абонементы', icon: CreditCard },
  { href: '/admin/coaches', label: 'Тренеры', icon: UsersRound },
  { href: '/admin/schedule', label: 'Расписание', icon: CalendarDays },
  { href: '/admin/events', label: 'Мероприятия', icon: Trophy }
];

type AdminShellProps = {
  user: User;
  children: React.ReactNode;
};

export function AdminShell({ user, children }: AdminShellProps) {
  const router = useRouter();

  function logout() {
    localStorage.removeItem('bs-arena-token');
    localStorage.removeItem('bs-arena-user');
    router.push('/admin/login');
  }

  return (
    <div className="min-h-screen bg-neutral-100">
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-neutral-200 bg-white p-5 md:flex">
        <Link href="/admin/dashboard" className="text-xl font-semibold text-arena-ink">
          BS ARENA CRM
        </Link>
        <nav className="mt-8 grid gap-2 text-sm font-medium">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex items-center gap-2 rounded-md px-3 py-2 text-neutral-700 hover:bg-neutral-100">
                <Icon size={18} aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-6">
          <p className="text-sm font-semibold">{user.name}</p>
          <p className="text-xs text-neutral-500">{roleLabels[user.role]}</p>
          <button
            onClick={logout}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-neutral-300 px-3 py-2 text-sm font-semibold hover:bg-neutral-50"
          >
            <LogOut size={16} aria-hidden />
            Выйти
          </button>
        </div>
      </aside>
      <div className="md:pl-64">
        <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-4 py-4 md:hidden">
          <Link href="/admin/dashboard" className="font-semibold">
            BS ARENA CRM
          </Link>
          <button onClick={logout} className="rounded-md border border-neutral-300 px-3 py-2 text-sm">
            Выйти
          </button>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
