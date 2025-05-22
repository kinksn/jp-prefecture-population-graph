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

  // テスト全体で一度だけモックを設定
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

  it('二回目以降の呼び出しではキャッシュを使用すること', async () => {
    // キャッシュをクリアする代わりに、直接テスト
    vi.clearAllMocks(); // カウンタのみリセット

    // 1回目の呼び出し
    await getPrefectures();
    // 2回目の呼び出し
    await getPrefectures();

    // apiFetchは1回しか呼ばれないはず（既にキャッシュされているため）
    expect(apiClient.apiFetch).toHaveBeenCalledTimes(0);
  });
});
