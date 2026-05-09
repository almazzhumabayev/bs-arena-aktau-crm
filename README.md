# BS ARENA Aktau CRM

Веб-сайт и CRM для спортивного комплекса BS ARENA в Актау.

Проект включает публичный сайт на русском языке, административную CRM, NestJS API, PostgreSQL, Prisma ORM и Docker Compose для локальной разработки.

## Требования

- Node.js 20+
- npm
- Docker Desktop
- Git

## Структура проекта

```text
apps/
  api/      NestJS API, Prisma schema, migrations, seed data
  web/      Next.js App Router, публичный сайт и CRM
docs/       статус проекта и заметки по деплою
docker-compose.yml
package.json
```

## Быстрый старт локально

1. Скопируйте переменные окружения:

```bash
cp .env.example .env
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local
```

На Windows PowerShell можно использовать:

```powershell
Copy-Item .env.example .env
Copy-Item apps/api/.env.example apps/api/.env
Copy-Item apps/web/.env.example apps/web/.env.local
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите Docker Compose:

```bash
docker compose up --build -d
```

4. Выполните миграции Prisma:

```bash
docker compose exec -T api npx prisma migrate deploy
```

Для разработки, если нужно создать/применить dev-миграцию:

```bash
docker compose exec -T api npx prisma migrate dev
```

5. Заполните базу начальными русскими данными:

```bash
docker compose exec -T api npx prisma db seed
```

## Локальные URL

- Сайт: `http://localhost:3000`
- CRM: `http://localhost:3000/admin/login`
- API docs / Swagger: `http://localhost:4000/docs`
- Health check: `http://localhost:4000/api/health`
- API base URL: `http://localhost:4000/api`

## Доступ администратора по умолчанию

```text
Email: admin@bsarena.local
Password: Admin123!
```

После переноса на production пароль администратора нужно обязательно заменить.

## Основные команды

```bash
npm run dev
npm run dev:web
npm run dev:api
npm run db:migrate
npm run db:seed
npm run typecheck
```

## Основные возможности

- Публичный сайт BS ARENA на русском языке
- Форма заявки на сайте
- CRM вход по JWT
- Управление заявками, статусами и комментариями
- Управление услугами, абонементами, тренерами, расписанием и мероприятиями
- Swagger документация API
- PostgreSQL через Docker Compose
- Prisma migrations и seed data

## Документация

- [Статус проекта](docs/PROJECT_STATUS.md)
- [Заметки по деплою](docs/DEPLOYMENT_NOTES.md)
