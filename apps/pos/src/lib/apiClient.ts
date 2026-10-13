import type { ApiError } from '@noname/types';
import { HttpMethod } from '@/types/HttpMethod';

export class ApiRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

const request = async <T>(method: HttpMethod, path: string, body?: unknown): Promise<T> => {
  const response = await fetch(`/api${path}`, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
    credentials: 'same-origin',
  });
  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as ApiError | null;
    throw new ApiRequestError(payload?.error.message ?? `La solicitud falló (${response.status})`, response.status);
  }
  return (await response.json()) as T;
};

export const apiClient = {
  get: <T>(path: string) => request<T>(HttpMethod.Get, path),
  post: <T>(path: string, body?: unknown) => request<T>(HttpMethod.Post, path, body ?? {}),
  put: <T>(path: string, body: unknown) => request<T>(HttpMethod.Put, path, body),
  patch: <T>(path: string, body: unknown) => request<T>(HttpMethod.Patch, path, body),
};

export const toQueryString = (params: Record<string, string | number | undefined>) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      search.set(key, String(value));
    }
  });
  const query = search.toString();
  return query ? `?${query}` : '';
};
