import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import { getPrefectures } from './getPrefectures';
import * as apiClient from './client';

describe('getPrefectures', () => {
  const mockPrefecturesData = {
    message: null,
    result: [
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
      { prefCode: 3, prefName: '岩手県' },
    ],
  };

  beforeAll(() => {
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(mockPrefecturesData);
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  it('正しい都道府県データを返すこと', async () => {
    const prefectures = await getPrefectures();

    expect(prefectures).toEqual(mockPrefecturesData.result);
    expect(apiClient.apiFetch).toHaveBeenCalledWith('/prefectures');
  });

  it('APIエラー時に適切なエラーをスローすること', async () => {
    const errorResponse = new apiClient.ApiError(404, { message: 'Not Found' });
    vi.spyOn(apiClient, 'apiFetch').mockRejectedValue(errorResponse);

    await expect(getPrefectures()).rejects.toThrow(apiClient.ApiError);
    await expect(getPrefectures()).rejects.toMatchObject({
      status: 404,
      body: { message: 'Not Found' },
    });
  });

  it('都道府県リストが空の場合、空のデータを返すこと', async () => {
    const emptyResponse = {
      message: null,
      result: [],
    };
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(emptyResponse);

    const prefectures = await getPrefectures();
    expect(prefectures).toEqual([]);
    expect(prefectures).toHaveLength(0);
  });
});
