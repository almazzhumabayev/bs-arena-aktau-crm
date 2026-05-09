import type { Coach, Event, Membership, ScheduleItem, Service } from './types';

export const publicNav = [
  { href: '/', label: 'Главная' },
  { href: '/about', label: 'О комплексе' },
  { href: '/services', label: 'Услуги' },
  { href: '/memberships', label: 'Абонементы' },
  { href: '/schedule', label: 'Расписание' },
  { href: '/coaches', label: 'Тренеры' },
  { href: '/events', label: 'Мероприятия' },
  { href: '/rental', label: 'Аренда' },
  { href: '/contacts', label: 'Контакты' }
];

export const fallbackServices: Service[] = [
  {
    id: 1,
    title: 'Фитнес зал',
    slug: 'fitness-gym',
    description: 'Современный тренажерный зал в Актау: силовая зона, кардио, свободные веса и персональные тренировки.',
    priceLabel: 'от 25 000 ₸ / месяц',
    durationMinutes: 90,
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 2,
    title: 'Футбольная арена',
    slug: 'football-arena',
    description: 'Крытая футбольная арена для тренировок, матчей, корпоративных игр и регулярной аренды.',
    priceLabel: 'от 18 000 ₸ / час',
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 3,
    title: 'Единоборства',
    slug: 'martial-arts',
    description: 'Зал единоборств для бокса, грэпплинга, функциональной подготовки и занятий с тренером.',
    priceLabel: 'от 20 000 ₸ / месяц',
    durationMinutes: 75,
    imageUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 4,
    title: 'Детские секции',
    slug: 'kids-sections',
    description: 'Футбол, ОФП и единоборства для детей: дисциплина, координация, командная игра и безопасная нагрузка.',
    priceLabel: 'группы по возрасту',
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 5,
    title: 'Аренда зала',
    slug: 'hall-rental',
    description: 'Аренда площадки для тренировок, матчей, съемок, спортивных дней и закрытых мероприятий.',
    priceLabel: 'по запросу',
    durationMinutes: 60,
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80'
  },
  {
    id: 6,
    title: 'Турниры и мероприятия',
    slug: 'events-tournaments',
    description: 'Организуем турниры, клубные встречи, корпоративные соревнования и спортивные события в Актау.',
    priceLabel: 'под ключ',
    durationMinutes: null,
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const fallbackCoaches: Coach[] = [
  {
    id: 1,
    name: 'Арман Садыков',
    role: 'Главный тренер по футболу',
    bio: 'Готовит команды и детские группы с акцентом на технику, скорость мышления и игровую дисциплину.',
    specialities: ['Футбол', 'Детская академия', 'Турнирная подготовка'],
    avatarUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 2,
    name: 'Дана Ибраева',
    role: 'Тренер тренажерного зала',
    bio: 'Собирает понятные программы для набора формы, снижения веса, силовой подготовки и возврата к тренировкам.',
    specialities: ['Сила', 'Функциональная подготовка', 'Мобилити'],
    avatarUrl: 'https://images.unsplash.com/photo-1609899464726-209befaac5af?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 3,
    name: 'Тимур Ахметов',
    role: 'Тренер по единоборствам',
    bio: 'Ведет занятия по ударной технике и борьбе, сохраняя высокий стандарт безопасности и прогресса.',
    specialities: ['Бокс', 'Грэпплинг', 'Детские группы'],
    avatarUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80'
  }
];

export const fallbackMemberships: Membership[] = [
  {
    id: 1,
    title: 'Разовое посещение',
    price: 3500,
    period: 'день',
    description: 'Удобный формат для первой тренировки или гостевого визита.',
    benefits: ['Доступ в фитнес зал', 'Раздевалки и душевые', 'Свободные часы посещения']
  },
  {
    id: 2,
    title: 'BS Фитнес',
    price: 25000,
    period: 'месяц',
    description: 'Оптимальный абонемент для регулярных тренировок в зале.',
    benefits: ['Безлимитный фитнес зал', 'Кардио и силовая зона', 'Приоритетная запись к тренеру']
  },
  {
    id: 3,
    title: 'Командный пакет',
    price: 160000,
    period: 'месяц',
    description: 'Фиксированные часы для команд, школ, клубов и корпоративных групп.',
    benefits: ['Еженедельная аренда арены', 'Согласование с тренером', 'Поддержка турниров и матчей']
  }
];

export const fallbackSchedule: ScheduleItem[] = [
  {
    id: 1,
    title: 'Утренняя силовая',
    area: 'Фитнес зал',
    dayOfWeek: 1,
    startTime: '07:30',
    endTime: '08:30',
    capacity: 16,
    coach: fallbackCoaches[1],
    service: fallbackServices[0]
  },
  {
    id: 2,
    title: 'Детская футбольная секция',
    area: 'Футбольная арена',
    dayOfWeek: 2,
    startTime: '18:00',
    endTime: '19:30',
    capacity: 24,
    coach: fallbackCoaches[0],
    service: fallbackServices[1]
  },
  {
    id: 3,
    title: 'Бокс: техника',
    area: 'Зал единоборств',
    dayOfWeek: 4,
    startTime: '19:00',
    endTime: '20:15',
    capacity: 18,
    coach: fallbackCoaches[2],
    service: fallbackServices[2]
  }
];

export const fallbackEvents: Event[] = [
  {
    id: 1,
    title: 'Кубок BS ARENA',
    slug: 'spring-cup',
    description: 'Футбольный турнир выходного дня для любительских команд, школ и клубов Актау.',
    startsAt: '2026-06-13T10:00:00.000Z',
    endsAt: '2026-06-14T18:00:00.000Z',
    location: 'Футбольная арена',
    imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
  }
];

export const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

const serviceCopyBySlug = new Map(fallbackServices.map((service) => [service.slug, service]));
const membershipCopyByTitle = new Map([
  ['Day Pass', fallbackMemberships[0]],
  ['Arena Member', fallbackMemberships[1]],
  ['Team Package', fallbackMemberships[2]]
]);
const coachCopyByName = new Map([
  ['Arman Sadykov', fallbackCoaches[0]],
  ['Dana Ibrayeva', fallbackCoaches[1]],
  ['Timur Akhmetov', fallbackCoaches[2]]
]);
const scheduleTitleCopy = new Map([
  ['Morning Strength', { title: 'Утренняя силовая', area: 'Фитнес зал' }],
  ['Football Academy', { title: 'Детская футбольная секция', area: 'Футбольная арена' }],
  ['Boxing Technique', { title: 'Бокс: техника', area: 'Зал единоборств' }]
]);
const eventCopyBySlug = new Map(fallbackEvents.map((event) => [event.slug, event]));

export function getPublicServices(services: Service[]) {
  const apiBySlug = new Map(services.map((service) => [service.slug, service]));

  return fallbackServices.map((fallback) => {
    const apiService = apiBySlug.get(fallback.slug);
    return apiService ? { ...apiService, ...fallback, id: apiService.id } : fallback;
  });
}

export function getPublicMemberships(memberships: Membership[]) {
  if (!memberships.length) {
    return fallbackMemberships;
  }

  return memberships.slice(0, 3).map((membership, index) => {
    const fallback = membershipCopyByTitle.get(membership.title) ?? fallbackMemberships[index] ?? membership;
    return { ...membership, ...fallback, id: membership.id };
  });
}

export function getPublicCoaches(coaches: Coach[]) {
  if (!coaches.length) {
    return fallbackCoaches;
  }

  return coaches.map((coach, index) => {
    const fallback = coachCopyByName.get(coach.name) ?? fallbackCoaches[index] ?? coach;
    return { ...coach, ...fallback, id: coach.id };
  });
}

export function getPublicSchedule(schedule: ScheduleItem[]) {
  if (!schedule.length) {
    return fallbackSchedule;
  }

  return schedule.map((item) => {
    const copy = scheduleTitleCopy.get(item.title);
    return {
      ...item,
      title: copy?.title ?? item.title,
      area: copy?.area ?? item.area,
      coach: item.coach ? getPublicCoaches([item.coach])[0] : item.coach,
      service: item.service ? serviceCopyBySlug.get(item.service.slug) ?? item.service : item.service
    };
  });
}

export function getPublicEvents(events: Event[]) {
  if (!events.length) {
    return fallbackEvents;
  }

  return events.map((event, index) => {
    const fallback = eventCopyBySlug.get(event.slug) ?? fallbackEvents[index] ?? event;
    return { ...event, ...fallback, id: event.id, startsAt: event.startsAt, endsAt: event.endsAt };
  });
}
