const serverApiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
const browserApiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';

function joinUrl(baseUrl: string, path: string) {
  const cleanBase = baseUrl.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
}

export function clientApiUrl(path: string) {
  return joinUrl(browserApiUrl, path);
}

export async function fetchPublic<T>(path: string, fallback: T): Promise<T> {
  try {
    const response = await fetch(joinUrl(serverApiUrl, path), {
      next: { revalidate: 60 }
    });

    if (!response.ok) {
      return fallback;
    }

    return (await response.json()) as T;
  } catch {
    return fallback;
  }
}

export async function authFetch<T>(path: string, token: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  headers.set('Content-Type', 'application/json');
  headers.set('Authorization', `Bearer ${token}`);

  const response = await fetch(clientApiUrl(path), {
    ...init,
    headers
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || 'API request failed');
  }

  return (await response.json()) as T;
}
