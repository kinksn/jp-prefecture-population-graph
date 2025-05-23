import { describe, it, expect, vi } from 'vitest';
import { apiFetch, ApiError } from './client';

describe('apiFetch', () => {
  const mockResponse = { message: null, result: 'test-data' };

  it('正しいURLとヘッダーでリクエストを行うこと', async () => {
    const fetchMock = vi
      .spyOn(global, 'fetch')
      .mockImplementation((_input: RequestInfo | URL, _init?: RequestInit) =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response),
      );

    const path = '/test-path';
    await apiFetch(path);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      'https://yumemi-frontend-engineer-codecheck-api.vercel.app/api/v1/test-path',
      expect.objectContaining({
        headers: expect.objectContaining({
          'Content-Type': 'application/json; charset=UTF-8',
          'X-API-KEY': expect.any(String),
        }),
      }),
    );

    fetchMock.mockRestore();
  });

  it('レスポンスが正常な場合、JSONデータを返すこと', async () => {
    const fetchMock = vi
      .spyOn(global, 'fetch')
      .mockImplementation((_input: RequestInfo | URL, _init?: RequestInit) =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response),
      );

    const result = await apiFetch('/test-path');
    expect(result).toEqual(mockResponse);

    fetchMock.mockRestore();
  });

  it('レスポンスがエラーの場合、ApiErrorをスローすること', async () => {
    const fetchMock = vi.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        json: () => Promise.resolve({ error: 'Not found' }),
      } as Response),
    );

    await expect(apiFetch('/not-found')).rejects.toThrow(ApiError);
    await expect(apiFetch('/not-found')).rejects.toMatchObject({
      status: 404,
    });

    fetchMock.mockRestore();
  });
});
