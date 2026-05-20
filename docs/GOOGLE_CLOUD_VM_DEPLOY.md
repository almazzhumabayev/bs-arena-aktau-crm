# Деплой BS ARENA на Google Cloud VM

Инструкция описывает demo/production-like запуск на одной VM. Клиент открывает один адрес:

```text
http://SERVER_IP
```

Маршрутизация через Nginx:

| URL | Куда идет запрос |
| --- | --- |
| `/` | Next.js frontend `web:3000` |
| `/admin/*` | Next.js CRM `web:3000` |
| `/api/*` | NestJS API `api:4000/api/*` |
| `/docs` | Swagger UI `api:4000/docs` |
| `/docs-json` | Swagger JSON `api:4000/docs-json` |

На уровне Docker наружу публикуется только порт `80` контейнера `nginx`. Контейнеры `web:3000`, `api:4000` и `postgres:5432` доступны только внутри Docker-сети.

## 1. Создать VM в Google Cloud

Рекомендуемая минимальная VM для демо:

| Параметр | Значение |
| --- | --- |
| OS | Ubuntu 24.04 LTS |
| Machine type | `e2-medium` или выше |
| Boot disk | 30 GB SSD или больше |
| Firewall | разрешить HTTP `tcp:80` |

Вариант через `gcloud`:

```bash
gcloud compute instances create bs-arena-demo \
  --zone=asia-southeast1-b \
  --machine-type=e2-medium \
  --image-family=ubuntu-2404-lts-amd64 \
  --image-project=ubuntu-os-cloud \
  --boot-disk-size=30GB \
  --tags=http-server
```

Если в проекте еще нет правила для HTTP, создать его:

```bash
gcloud compute firewall-rules create allow-http-bs-arena \
  --allow=tcp:80 \
  --direction=INGRESS \
  --source-ranges=0.0.0.0/0 \
  --target-tags=http-server
```

Важно: не создавайте firewall rules для `3000`, `4000` и `5432`.

## 2. Подключиться к VM

```bash
gcloud compute ssh bs-arena-demo --zone=asia-southeast1-b
```

Дальше все команды выполняются внутри VM.

## 3. Установить Docker Engine и Docker Compose plugin

```bash
sudo apt update
sudo apt install -y ca-certificates curl git
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
sudo tee /etc/apt/sources.list.d/docker.sources > /dev/null <<EOF
Types: deb
URIs: https://download.docker.com/linux/ubuntu
Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
Components: stable
Architectures: $(dpkg --print-architecture)
Signed-By: /etc/apt/keyrings/docker.asc
EOF
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo docker run hello-world
```

## 4. Загрузить проект на сервер

Замените `REPOSITORY_URL` на реальный URL GitHub-репозитория:

```bash
git clone REPOSITORY_URL bs-arena
cd bs-arena
```

Если репозиторий уже загружен:

```bash
cd bs-arena
git pull
```

## 5. Создать `.env` для серверного демо

```bash
SERVER_IP=$(curl -s -H "Metadata-Flavor: Google" \
  http://metadata.google.internal/computeMetadata/v1/instance/network-interfaces/0/access-configs/0/external-ip)
POSTGRES_PASSWORD=$(openssl rand -hex 24)
JWT_SECRET=$(openssl rand -hex 32)

cat > .env <<EOF
POSTGRES_DB=bs_arena
POSTGRES_USER=bs_arena
POSTGRES_PASSWORD=$POSTGRES_PASSWORD
JWT_SECRET=$JWT_SECRET
JWT_EXPIRES_IN=1d
WEB_ORIGIN=http://$SERVER_IP
NEXT_PUBLIC_API_URL=/api
INTERNAL_API_URL=http://api:4000/api
API_URL=http://api:4000/api
EOF
```

Проверить файл:

```bash
grep -E "WEB_ORIGIN|NEXT_PUBLIC_API_URL|INTERNAL_API_URL|API_URL" .env
```

Ожидаемые значения:

```text
WEB_ORIGIN=http://SERVER_IP
NEXT_PUBLIC_API_URL=/api
INTERNAL_API_URL=http://api:4000/api
API_URL=http://api:4000/api
```

## 6. Запустить серверный compose

```bash
sudo docker compose -f docker-compose.server.yml up -d --build
```

Проверить контейнеры:

```bash
sudo docker compose -f docker-compose.server.yml ps
```

Ожидаемо запущены:

- `nginx`
- `web`
- `api`
- `postgres`

## 7. Один раз заполнить демо-данные

После первого запуска выполнить seed:

```bash
sudo docker compose -f docker-compose.server.yml exec api npm run prisma:seed
```

Это создаст демо-администратора, менеджера и тестовый контент.

Демо-доступ:

```text
admin@bsarena.local / Admin123!
manager@bsarena.local / Manager123!
```

Для реального production пароль администратора нужно заменить после первого входа или через отдельный безопасный backend-скрипт.

## 8. Проверить маршруты на VM

```bash
curl -I http://localhost
curl http://localhost/api/health
curl -I http://localhost/docs
curl -I http://localhost/docs-json
```

Потом открыть в браузере:

```text
http://SERVER_IP
http://SERVER_IP/admin/login
http://SERVER_IP/api/health
http://SERVER_IP/docs
http://SERVER_IP/docs-json
```

## 9. Проверить, что лишние порты не опубликованы

На VM:

```bash
sudo docker compose -f docker-compose.server.yml port nginx 80
sudo docker compose -f docker-compose.server.yml port web 3000
sudo docker compose -f docker-compose.server.yml port api 4000
sudo docker compose -f docker-compose.server.yml port postgres 5432
```

Ожидаемый результат:

- для `nginx 80` есть опубликованный порт `0.0.0.0:80`;
- для `web 3000`, `api 4000`, `postgres 5432` публичных портов нет.

Также на уровне Google Cloud firewall должен быть открыт только HTTP `tcp:80` для сайта. SSH-доступ администрируется отдельно через Google Cloud SSH/IAP.

## 10. Обновление после новых изменений

```bash
cd bs-arena
git pull
sudo docker compose -f docker-compose.server.yml up -d --build
```

Если появились новые Prisma migrations:

```bash
sudo docker compose -f docker-compose.server.yml exec api npm run prisma:deploy
```

## 11. Логи и перезапуск

Посмотреть логи:

```bash
sudo docker compose -f docker-compose.server.yml logs -f nginx
sudo docker compose -f docker-compose.server.yml logs -f web
sudo docker compose -f docker-compose.server.yml logs -f api
```

Перезапустить:

```bash
sudo docker compose -f docker-compose.server.yml restart
```

Остановить:

```bash
sudo docker compose -f docker-compose.server.yml down
```

Важно: команда выше не удаляет volume PostgreSQL. Не используйте `down -v`, если нужно сохранить данные.

## 12. Локальная разработка остается прежней

Для локальной разработки используется обычный compose:

```bash
docker compose up --build
```

Локальные адреса не меняются:

```text
http://localhost:3000
http://localhost:4000/docs
http://localhost:4000/api/health
```

## Полезные официальные ссылки

- Google Cloud: создание Linux VM в Compute Engine - https://cloud.google.com/compute/docs/create-linux-vm-instance
- Google Cloud: Ubuntu image families - https://cloud.google.com/compute/docs/images/os-details
- Google Cloud: firewall rules - https://cloud.google.com/firewall/docs/using-firewalls
- Docker: установка Docker Engine на Ubuntu - https://docs.docker.com/engine/install/ubuntu/
