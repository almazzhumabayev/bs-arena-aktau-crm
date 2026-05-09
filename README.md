# BS ARENA

Full-stack starter for a sports complex website and lead-management admin panel.

## Stack

- Next.js App Router, TypeScript, Tailwind CSS
- NestJS API with modular feature modules
- PostgreSQL, Prisma ORM, Prisma migrations
- JWT auth, ADMIN and MANAGER role-based access control
- Swagger documentation at `http://localhost:4000/api/docs`
- Docker Compose for local development

## Project Structure

```text
apps/
  api/      NestJS backend, Prisma schema, migrations, seed data
  web/      Next.js public website and admin panel
docker-compose.yml
package.json
```

## Local Setup

1. Copy the environment template:

```bash
cp .env.example .env
```

2. Start Postgres:

```bash
docker compose up -d postgres
```

3. Run migrations and seed data:

```bash
docker compose run --rm api npm run prisma:migrate
docker compose run --rm api npm run prisma:seed
```

4. Start the app:

```bash
docker compose up --build
```

## URLs

- Public website: `http://localhost:3000`
- Admin login: `http://localhost:3000/admin/login`
- API: `http://localhost:4000/api`
- Swagger: `http://localhost:4000/api/docs`
- PostgreSQL: `localhost:5432`

## Seed Users

```text
admin@bsarena.local / Admin123!      ADMIN
manager@bsarena.local / Manager123!  MANAGER
```

## Main API Endpoints

- `POST /api/auth/login`
- `POST /api/leads`
- `GET /api/leads`
- `GET /api/leads/:id`
- `PATCH /api/leads/:id/status`
- `POST /api/leads/:id/comments`
- `GET /api/services`
- `GET /api/coaches`
- `GET /api/memberships`
- `GET /api/schedule`
- `GET /api/events`

Protected endpoints require `Authorization: Bearer <token>`.

## Development Without Docker

Install dependencies from the repo root, then run each app:

```bash
npm install
npm run dev:api
npm run dev:web
```

Use `apps/api/.env.example` and `apps/web/.env.example` if you prefer app-local env files.
