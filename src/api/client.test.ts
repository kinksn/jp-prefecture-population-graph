import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiFetch, ApiError } from './client';

describe('apiFetch', () => {
  const mockResponse = { message: null, result: 'test-data' };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let fetchMock: any;

  beforeEach(() => {
    // fetchのモック
    fetchMock = vi
      .spyOn(global, 'fetch')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation((_input: RequestInfo | URL, _init?: RequestInit) =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockResponse),
        } as Response),
      );
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('正しいURLとヘッダーでリクエストを行うこと', async () => {
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
  });

  it('レスポンスが正常な場合、JSONデータを返すこと', async () => {
    const result = await apiFetch('/test-path');
    expect(result).toEqual(mockResponse);
  });

  it('レスポンスがエラーの場合、ApiErrorをスローすること', async () => {
    // 両方のテストケースでエラーを返すようにする
    fetchMock.mockImplementation(() =>
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
  });
});
