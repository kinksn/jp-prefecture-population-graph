import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getPopulation } from './population';
import * as apiClient from './client';

// 個別のテスト環境で実行
describe('getPopulation - basic', () => {
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

// キャッシュテスト用
describe('getPopulation - cache behavior', () => {
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

  it('同じprefCodeに対する二回目以降の呼び出しではキャッシュを使用すること', async () => {
    const prefCode = 1;
    const spy = vi
      .spyOn(apiClient, 'apiFetch')
      .mockResolvedValue(mockPopulationData);

    // 1回目の呼び出し
    await getPopulation(prefCode);
    // 呼び出し回数をリセット
    spy.mockClear();

    // 2回目の呼び出し
    await getPopulation(prefCode);

    // 2回目はキャッシュを使うので、APIは呼ばれないはず
    expect(spy).not.toHaveBeenCalled();
    vi.restoreAllMocks();
  });
});

// 異なるprefCodeテスト用
describe('getPopulation - different prefCodes', () => {
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
    // 新しいモックを作成
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

    // モック適用後にモジュールをインポート
    const { getPopulation } = await import('./population');

    // 異なる県コードでAPIを呼び出す
    await getPopulation(1);
    await getPopulation(2);

    // 期待：異なるprefCodeで2回呼ばれる
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
