import type { LeadStatus, Role } from './types';

export const statusLabels: Record<LeadStatus, string> = {
  NEW: 'Новая',
  CONTACTED: 'Связались',
  IN_PROGRESS: 'В работе',
  WON: 'Продано',
  LOST: 'Потеряно'
};

export const roleLabels: Record<Role, string> = {
  ADMIN: 'Администратор',
  MANAGER: 'Менеджер'
};

const sourceLabels: Record<string, string> = {
  Website: 'Сайт',
  'Home page': 'Главная страница',
  'Services page': 'Страница услуг',
  'Memberships page': 'Страница абонементов',
  'Rental page': 'Страница аренды',
  'Contacts page': 'Страница контактов',
  Seed: 'Тестовая заявка'
};

export function formatSource(source?: string | null) {
  if (!source) {
    return 'Сайт';
  }

  return sourceLabels[source] ?? source;
}
