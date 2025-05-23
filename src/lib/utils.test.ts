import { describe, it, expect } from 'vitest';
import { groupPrefecturesByRegion } from './utils';
import { Prefecture } from '@/api/getPrefectures';
import { REGION_MAP } from './constants';

describe('groupPrefecturesByRegion', () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
    { prefCode: 3, prefName: '岩手県' },
    { prefCode: 13, prefName: '東京都' },
    { prefCode: 14, prefName: '神奈川県' },
    { prefCode: 27, prefName: '大阪府' },
    { prefCode: 40, prefName: '福岡県' },
  ];

  it('都道府県を地域ごとに正しくグループ化すること', () => {
    const result = groupPrefecturesByRegion(mockPrefectures);
    expect(result).toHaveLength(REGION_MAP.length);

    const hokkaidoTohokuRegion = result.find(
      (group) => group.region === '北海道・東北',
    );
    expect(hokkaidoTohokuRegion?.prefs).toEqual([
      { prefCode: 1, prefName: '北海道' },
      { prefCode: 2, prefName: '青森県' },
      { prefCode: 3, prefName: '岩手県' },
    ]);

    const kantoRegion = result.find((group) => group.region === '関東');
    expect(kantoRegion?.prefs).toEqual([
      { prefCode: 13, prefName: '東京都' },
      { prefCode: 14, prefName: '神奈川県' },
    ]);
  });

  it('都道府県が存在しない地域は空の配列を返すこと', () => {
    const result = groupPrefecturesByRegion(mockPrefectures);
    const chubuRegion = result.find((group) => group.region === '中部');

    expect(chubuRegion?.prefs).toEqual([]);
  });

  it('空の都道府県リストを渡した場合、全ての地域が空の配列を返すこと', () => {
    const result = groupPrefecturesByRegion([]);

    result.forEach((group) => {
      expect(group.prefs).toEqual([]);
    });
  });
});
