import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPopulation } from './getPopulation';
import * as apiClient from './client';

describe('getPopulation - 人口データ1件取得', () => {
  const mockPopulationData = {
    message: null,
    result: {
      boundaryYear: 2020,
      data: [
        {
          label: '総人口',
          data: [
            { year: 2015, value: 5000 },
            { year: 2020, value: 4800 },
          ],
        },
      ],
    },
  };

  it('正しい人口データを返すこと', async () => {
    const prefCode = 1;
    vi.spyOn(apiClient, 'apiFetch').mockResolvedValue(mockPopulationData);

    const populationData = await getPopulation(prefCode);

    expect(populationData).toEqual(mockPopulationData.result.data);
    expect(apiClient.apiFetch).toHaveBeenCalledWith(
      `/population/composition/perYear?prefCode=${prefCode}`,
    );
    vi.restoreAllMocks();
  });
});

describe('getPopulation - 人口データ複数件取得', () => {
  beforeEach(() => {
    // 各テスト前にキャッシュをクリア
    vi.resetModules();
  });

  afterEach(() => {
    // テスト後にモックをリセット
    vi.clearAllMocks();
    vi.resetModules();
    vi.restoreAllMocks();
  });

  it('異なるprefCodeに対しては個別にAPIを呼び出すこと', async () => {
    const apiFetchMock = vi.fn().mockImplementation(() =>
      Promise.resolve({
        message: null,
        result: {
          boundaryYear: 2020,
          data: [{ label: '総人口', data: [{ year: 2015, value: 1000 }] }],
        },
      }),
    );

    // クライアントモジュールをモック
    vi.doMock('./client', () => ({
      apiFetch: apiFetchMock,
    }));

    const { getPopulation } = await import('./getPopulation');

    await getPopulation(1);
    await getPopulation(2);

    expect(apiFetchMock).toHaveBeenCalledTimes(2);
    expect(apiFetchMock).toHaveBeenNthCalledWith(
      1,
      '/population/composition/perYear?prefCode=1',
    );
    expect(apiFetchMock).toHaveBeenNthCalledWith(
      2,
      '/population/composition/perYear?prefCode=2',
    );
  });
});
