import { PopulationCategory } from './types';

export const POPULATION_CATEGORIES: PopulationCategory[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

export const REGION_MAP: { region: string; prefCodes: number[] }[] = [
  { region: '北海道・東北', prefCodes: [1, 2, 3, 4, 5, 6, 7] },
  { region: '関東', prefCodes: [8, 9, 10, 11, 12, 13, 14] },
  { region: '中部', prefCodes: [15, 16, 17, 18, 19, 20, 21, 22, 23] },
  { region: '近畿', prefCodes: [24, 25, 26, 27, 28, 29, 30] },
  { region: '中国・四国', prefCodes: [31, 32, 33, 34, 35, 36, 37, 38, 39] },
  { region: '九州・沖縄', prefCodes: [40, 41, 42, 43, 44, 45, 46, 47] },
];
