# Deployment Notes

План будущего production-деплоя BS ARENA.

## Целевая схема

- VPS сервер на Linux.
- Домен: `bs-arena.kz`.
- Docker Compose для запуска сервисов.
- Отдельные контейнеры:
  - `web` - Next.js frontend.
  - `api` - NestJS backend.
  - `postgres` - PostgreSQL.
  - `nginx` или другой reverse proxy.

## VPS

Минимальная рекомендуемая конфигурация для старта:

- 2 CPU
- 2-4 GB RAM
- 40+ GB SSD
- Ubuntu LTS
- Docker и Docker Compose plugin

Перед деплоем нужно создать отдельного пользователя, настроить SSH-ключи и закрыть парольный SSH-доступ.

## Домен bs-arena.kz

План DNS:

- `bs-arena.kz` -> IP VPS
- `www.bs-arena.kz` -> IP VPS
- при необходимости `api.bs-arena.kz` -> IP VPS

Можно держать frontend и API на одном домене через reverse proxy:

- сайт: `https://bs-arena.kz`
- API: `https://bs-arena.kz/api`
- Swagger: `https://bs-arena.kz/docs`

## Docker Compose

Для production желательно сделать отдельный compose-файл или override:

- выключить dev watch режимы;
- собирать production build для Next.js;
- запускать NestJS из `dist`;
- не монтировать исходники как volumes;
- использовать restart policy;
- ограничить наружу доступ к PostgreSQL.

## PostgreSQL persistence

Данные PostgreSQL должны храниться в Docker volume или отдельной директории на сервере:

```yaml
volumes:
  postgres-data:
```

Важно не удалять volume при обновлениях. Перед любыми изменениями схемы или деплоем новой версии делать backup.

## Reverse proxy / Nginx

Nginx должен принимать HTTP/HTTPS трафик и проксировать:

- `/` на web container;
- `/api` на api container;
- `/docs` на api container.

Также нужно настроить:

- gzip/brotli при необходимости;
- лимит размера request body;
- корректные headers `X-Forwarded-For`, `X-Forwarded-Proto`, `Host`;
- redirect с HTTP на HTTPS.

## SSL certificate

Рекомендуемый вариант:

- Let's Encrypt
- Certbot или nginx-proxy/acme companion
- автоматическое обновление сертификатов

Проверить, что `https://bs-arena.kz`, `https://www.bs-arena.kz`, `/api/health` и `/docs` открываются по HTTPS.

## Environment variables

Production `.env` должен быть создан отдельно и не попадать в Git.

Ключевые переменные:

```text
POSTGRES_DB=
POSTGRES_USER=
POSTGRES_PASSWORD=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRES_IN=
WEB_ORIGIN=
NEXT_PUBLIC_API_URL=
API_URL=
```

Для production обязательно:

- заменить `JWT_SECRET` на длинное случайное значение;
- использовать сильный `POSTGRES_PASSWORD`;
- указать `WEB_ORIGIN=https://bs-arena.kz`;
- указать production API URL для frontend.

## Production admin password

Seed создает демо-администратора:

```text
admin@bsarena.local / Admin123!
```

После production-деплоя нужно:

1. Войти в систему или обновить пользователя через безопасный backend/admin script.
2. Заменить пароль администратора.
3. При необходимости заменить email на рабочий адрес BS ARENA.
4. Не использовать демо-пароль в production.

## Backups

Нужно настроить регулярные бэкапы:

- PostgreSQL dump каждый день.
- Хранение минимум 7-14 последних копий.
- Отдельное хранение вне VPS: облако, S3-compatible storage или другой сервер.
- Ручной backup перед каждым деплоем.

Пример команды:

```bash
docker compose exec -T postgres pg_dump -U bs_arena bs_arena > backups/bs_arena_$(date +%F).sql
```

Также нужно хранить копии production `.env` в безопасном менеджере секретов.

## Рекомендуемый порядок production-деплоя

1. Подготовить VPS и установить Docker.
2. Настроить DNS для `bs-arena.kz`.
3. Скопировать репозиторий на сервер.
4. Создать production `.env`.
5. Собрать и запустить Docker Compose.
6. Выполнить Prisma migrations.
7. Выполнить seed только при первом запуске или при необходимости обновить справочники.
8. Настроить Nginx reverse proxy.
9. Выпустить SSL сертификат.
10. Проверить сайт, CRM, API, Swagger и health endpoint.
11. Сменить production admin password.
12. Настроить регулярные бэкапы.
