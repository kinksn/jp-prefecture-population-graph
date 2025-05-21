const BASE_URL =
  'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1';
const API_KEY = import.meta.env.VITE_RESAS_API_KEY;

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly body: unknown,
  ) {
    super(`API Error: ${status}`);
  }
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'X-API-KEY': API_KEY,
      ...init?.headers,
    },
    ...init,
  });

  if (!res.ok) {
    throw new ApiError(res.status, await res.json().catch(() => null));
  }
  return res.json() as Promise<T>;
}
