'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from './admin-shell';
import type { User } from '@/lib/types';

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('bs-arena-token');
    const storedUser = localStorage.getItem('bs-arena-user');

    if (!token || !storedUser) {
      router.replace('/admin/login');
      return;
    }

    setUser(JSON.parse(storedUser) as User);
    setReady(true);
  }, [router]);

  if (!ready || !user) {
    return <div className="min-h-screen bg-neutral-100 p-8 text-neutral-600">Загружаем CRM...</div>;
  }

  return <AdminShell user={user}>{children}</AdminShell>;
}
