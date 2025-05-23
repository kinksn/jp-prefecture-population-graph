import { Prefecture } from '@/api/getPrefectures';
import { type ClassValue, clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';
import { REGION_MAP } from './constants';
import { RegionGroup } from './types';

const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        'text-typography-lg',
        'text-typography-md',
        'text-typography-sm',
        'text-typography-xs',
        'text-typography-xxs',
      ],
    },
  },
});
export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}

export function groupPrefecturesByRegion(
  prefectures: Prefecture[],
): RegionGroup[] {
  return REGION_MAP.map((region) => ({
    region: region.region,
    prefs: prefectures.filter((pref) =>
      region.prefCodes.includes(pref.prefCode),
    ),
  }));
}
