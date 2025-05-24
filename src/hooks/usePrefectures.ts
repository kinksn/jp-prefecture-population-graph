import { useQuery } from '@tanstack/react-query';
import { getPrefectures, Prefecture } from '@/api/getPrefectures';
import { groupPrefecturesByRegion } from '@/lib/utils';
import { RegionGroup } from '@/lib/types';

export function usePrefectures() {
  return useQuery<RegionGroup[]>({
    queryKey: ['prefectures'],
    queryFn: async () => {
      const prefectures: Prefecture[] = await getPrefectures();
      return groupPrefecturesByRegion(prefectures);
    },
    staleTime: Infinity,
  });
}
