import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

type MembershipSeed = {
  title: string;
  price: string;
  period: string;
  description: string;
  benefits: string[];
  sortOrder: number;
  active?: boolean;
};

type CoachSeed = {
  name: string;
  role: string;
  bio: string;
  specialities: string[];
  sortOrder: number;
  avatarUrl?: string;
  active?: boolean;
};

async function upsertMembership(oldTitles: string[], data: MembershipSeed) {
  const existingByNewTitle = await prisma.membership.findUnique({
    where: { title: data.title }
  });

  if (existingByNewTitle) {
    await prisma.membership.updateMany({
      where: {
        title: { in: oldTitles },
        id: { not: existingByNewTitle.id }
      },
      data: { active: false }
    });

    return prisma.membership.update({
      where: { id: existingByNewTitle.id },
      data
    });
  }

  const existingByOldTitle = await prisma.membership.findFirst({
    where: { title: { in: oldTitles } }
  });

  if (existingByOldTitle) {
    return prisma.membership.update({
      where: { id: existingByOldTitle.id },
      data
    });
  }

  return prisma.membership.create({ data });
}

async function upsertCoach(oldNames: string[], data: CoachSeed) {
  const existingByNewName = await prisma.coach.findUnique({
    where: { name: data.name }
  });

  if (existingByNewName) {
    await prisma.coach.updateMany({
      where: {
        name: { in: oldNames },
        id: { not: existingByNewName.id }
      },
      data: { active: false }
    });

    return prisma.coach.update({
      where: { id: existingByNewName.id },
      data
    });
  }

  const existingByOldName = await prisma.coach.findFirst({
    where: { name: { in: oldNames } }
  });

  if (existingByOldName) {
    return prisma.coach.update({
      where: { id: existingByOldName.id },
      data
    });
  }

  return prisma.coach.create({ data });
}

async function main() {
  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const managerPassword = await bcrypt.hash('Manager123!', 10);

  await prisma.user.upsert({
    where: { email: 'admin@bsarena.local' },
    update: {
      name: 'Администратор BS ARENA',
      role: Role.ADMIN
    },
    create: {
      email: 'admin@bsarena.local',
      name: 'Администратор BS ARENA',
      passwordHash: adminPassword,
      role: Role.ADMIN
    }
  });

  await prisma.user.upsert({
    where: { email: 'manager@bsarena.local' },
    update: {
      name: 'Менеджер ресепшена',
      role: Role.MANAGER
    },
    create: {
      email: 'manager@bsarena.local',
      name: 'Менеджер ресепшена',
      passwordHash: managerPassword,
      role: Role.MANAGER
    }
  });

  const services = await Promise.all([
    prisma.service.upsert({
      where: { slug: 'fitness-gym' },
      update: {
        title: 'Фитнес зал',
        description: 'Современный тренажерный зал в Актау: силовая зона, кардио, свободные веса и персональные тренировки.',
        priceLabel: 'от 25 000 ₸ / месяц',
        durationMinutes: 90,
        sortOrder: 1,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
      },
      create: {
        title: 'Фитнес зал',
        slug: 'fitness-gym',
        description: 'Современный тренажерный зал в Актау: силовая зона, кардио, свободные веса и персональные тренировки.',
        priceLabel: 'от 25 000 ₸ / месяц',
        durationMinutes: 90,
        sortOrder: 1,
        imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
      }
    }),
    prisma.service.upsert({
      where: { slug: 'football-arena' },
      update: {
        title: 'Футбольная арена',
        description: 'Крытая футбольная арена для тренировок, матчей, корпоративных игр и регулярной аренды.',
        priceLabel: 'от 18 000 ₸ / час',
        durationMinutes: 60,
        sortOrder: 2,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80'
      },
      create: {
        title: 'Футбольная арена',
        slug: 'football-arena',
        description: 'Крытая футбольная арена для тренировок, матчей, корпоративных игр и регулярной аренды.',
        priceLabel: 'от 18 000 ₸ / час',
        durationMinutes: 60,
        sortOrder: 2,
        imageUrl: 'https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&w=1200&q=80'
      }
    }),
    prisma.service.upsert({
      where: { slug: 'martial-arts' },
      update: {
        title: 'Единоборства',
        description: 'Зал единоборств для бокса, грэпплинга, функциональной подготовки и занятий с тренером.',
        priceLabel: 'от 20 000 ₸ / месяц',
        durationMinutes: 75,
        sortOrder: 3,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80'
      },
      create: {
        title: 'Единоборства',
        slug: 'martial-arts',
        description: 'Зал единоборств для бокса, грэпплинга, функциональной подготовки и занятий с тренером.',
        priceLabel: 'от 20 000 ₸ / месяц',
        durationMinutes: 75,
        sortOrder: 3,
        imageUrl: 'https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=1200&q=80'
      }
    }),
    prisma.service.upsert({
      where: { slug: 'kids-sections' },
      update: {
        title: 'Детские секции',
        description: 'Футбол, ОФП и единоборства для детей: дисциплина, координация, командная игра и безопасная нагрузка.',
        priceLabel: 'группы по возрасту',
        durationMinutes: 60,
        sortOrder: 4,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80'
      },
      create: {
        title: 'Детские секции',
        slug: 'kids-sections',
        description: 'Футбол, ОФП и единоборства для детей: дисциплина, координация, командная игра и безопасная нагрузка.',
        priceLabel: 'группы по возрасту',
        durationMinutes: 60,
        sortOrder: 4,
        imageUrl: 'https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1200&q=80'
      }
    }),
    prisma.service.upsert({
      where: { slug: 'hall-rental' },
      update: {
        title: 'Аренда зала',
        description: 'Аренда площадки для тренировок, матчей, съемок, спортивных дней и закрытых мероприятий.',
        priceLabel: 'по запросу',
        durationMinutes: 60,
        sortOrder: 5,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80'
      },
      create: {
        title: 'Аренда зала',
        slug: 'hall-rental',
        description: 'Аренда площадки для тренировок, матчей, съемок, спортивных дней и закрытых мероприятий.',
        priceLabel: 'по запросу',
        durationMinutes: 60,
        sortOrder: 5,
        imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=1200&q=80'
      }
    }),
    prisma.service.upsert({
      where: { slug: 'events-tournaments' },
      update: {
        title: 'Турниры и мероприятия',
        description: 'Организуем турниры, клубные встречи, корпоративные соревнования и спортивные события в Актау.',
        priceLabel: 'под ключ',
        durationMinutes: null,
        sortOrder: 6,
        active: true,
        imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
      },
      create: {
        title: 'Турниры и мероприятия',
        slug: 'events-tournaments',
        description: 'Организуем турниры, клубные встречи, корпоративные соревнования и спортивные события в Актау.',
        priceLabel: 'под ключ',
        durationMinutes: null,
        sortOrder: 6,
        imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
      }
    })
  ]);

  const coaches = await Promise.all([
    upsertCoach(['Arman Sadykov'], {
      name: 'Арман Садыков',
      role: 'Главный тренер по футболу',
      bio: 'Готовит взрослые команды и детские группы с акцентом на технику, игровое мышление и дисциплину.',
      specialities: ['Футбол', 'Детская академия', 'Турнирная подготовка'],
      sortOrder: 1,
      active: true,
      avatarUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&q=80'
    }),
    upsertCoach(['Dana Ibrayeva'], {
      name: 'Дана Ибраева',
      role: 'Тренер тренажерного зала',
      bio: 'Помогает выстроить программу для набора формы, снижения веса, силовой подготовки и возвращения к тренировкам.',
      specialities: ['Силовые тренировки', 'Функциональная подготовка', 'Мобилити'],
      sortOrder: 2,
      active: true,
      avatarUrl: 'https://images.unsplash.com/photo-1609899464726-209befaac5af?auto=format&fit=crop&w=900&q=80'
    }),
    upsertCoach(['Timur Akhmetov'], {
      name: 'Тимур Ахметов',
      role: 'Тренер по единоборствам',
      bio: 'Ведет занятия по боксу и грэпплингу, следит за техникой, безопасностью и устойчивым прогрессом.',
      specialities: ['Бокс', 'Грэпплинг', 'Детские группы'],
      sortOrder: 3,
      active: true,
      avatarUrl: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80'
    })
  ]);

  await Promise.all([
    upsertMembership(['Day Pass'], {
      title: 'Разовое посещение',
      price: '3500.00',
      period: 'день',
      description: 'Удобный формат для первой тренировки или гостевого визита в BS ARENA.',
      benefits: ['Доступ в фитнес зал', 'Раздевалки и душевые', 'Свободные часы посещения'],
      sortOrder: 1,
      active: true
    }),
    upsertMembership(['Arena Member'], {
      title: 'Месячный абонемент',
      price: '25000.00',
      period: 'месяц',
      description: 'Оптимальный абонемент для регулярных тренировок в фитнес зале.',
      benefits: ['Безлимитный фитнес зал', 'Кардио и силовая зона', 'Приоритетная запись к тренеру'],
      sortOrder: 2,
      active: true
    }),
    upsertMembership(['Team Package'], {
      title: 'Командный пакет',
      price: '160000.00',
      period: 'месяц',
      description: 'Фиксированные часы для команд, школ, клубов и корпоративных групп.',
      benefits: ['Еженедельная аренда арены', 'Согласование с тренером', 'Поддержка турниров и матчей'],
      sortOrder: 3,
      active: true
    })
  ]);

  await prisma.scheduleItem.deleteMany();
  await prisma.scheduleItem.createMany({
    data: [
      {
        title: 'Утренняя силовая',
        area: 'Фитнес зал',
        dayOfWeek: 1,
        startTime: '07:30',
        endTime: '08:30',
        capacity: 16,
        coachId: coaches[1].id,
        serviceId: services[0].id
      },
      {
        title: 'Детская футбольная секция',
        area: 'Футбольная арена',
        dayOfWeek: 2,
        startTime: '18:00',
        endTime: '19:30',
        capacity: 24,
        coachId: coaches[0].id,
        serviceId: services[1].id
      },
      {
        title: 'Бокс: техника и спарринг',
        area: 'Зал единоборств',
        dayOfWeek: 4,
        startTime: '19:00',
        endTime: '20:15',
        capacity: 18,
        coachId: coaches[2].id,
        serviceId: services[2].id
      },
      {
        title: 'ОФП для детей',
        area: 'Детская зона',
        dayOfWeek: 6,
        startTime: '11:00',
        endTime: '12:00',
        capacity: 20,
        coachId: coaches[1].id,
        serviceId: services[3].id
      },
      {
        title: 'Командная аренда',
        area: 'Футбольная арена',
        dayOfWeek: 5,
        startTime: '20:00',
        endTime: '21:30',
        capacity: 30,
        coachId: coaches[0].id,
        serviceId: services[4].id
      }
    ]
  });

  await prisma.event.upsert({
    where: { slug: 'aktau-arena-cup' },
    update: {
      title: 'Кубок BS ARENA Актау',
      description: 'Футбольный турнир выходного дня для любительских команд, школ и корпоративных сборных Актау.',
      startsAt: new Date('2026-06-13T10:00:00.000Z'),
      endsAt: new Date('2026-06-14T18:00:00.000Z'),
      location: 'Футбольная арена',
      active: true,
      imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
    },
    create: {
      title: 'Кубок BS ARENA Актау',
      slug: 'aktau-arena-cup',
      description: 'Футбольный турнир выходного дня для любительских команд, школ и корпоративных сборных Актау.',
      startsAt: new Date('2026-06-13T10:00:00.000Z'),
      endsAt: new Date('2026-06-14T18:00:00.000Z'),
      location: 'Футбольная арена',
      imageUrl: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1200&q=80'
    }
  });

  await prisma.event.updateMany({
    where: { slug: 'spring-cup' },
    data: { active: false }
  });

  const sampleLead = await prisma.lead.findFirst({
    where: { email: 'captain@example.com' }
  });

  if (sampleLead) {
    await prisma.lead.update({
      where: { id: sampleLead.id },
      data: {
        name: 'Капитан команды',
        phone: '+7 700 000 00 00',
        interest: 'Командный пакет',
        source: 'Seed',
        message: 'Интересует еженедельная аренда футбольной арены для корпоративной команды.'
      }
    });
  } else {
    await prisma.lead.create({
      data: {
        name: 'Капитан команды',
        phone: '+7 700 000 00 00',
        email: 'captain@example.com',
        interest: 'Командный пакет',
        source: 'Seed',
        message: 'Интересует еженедельная аренда футбольной арены для корпоративной команды.'
      }
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
