import { Prefecture } from '@/api/getPrefectures';

export type PopulationCategory =
  | '総人口'
  | '年少人口'
  | '生産年齢人口'
  | '老年人口';

export type RegionGroup = {
  region: string;
  prefs: Prefecture[];
};
