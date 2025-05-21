import { useQuery } from '@tanstack/react-query';
import { getPrefectures, Prefecture } from '@/api/prefectures';
import { groupPrefecturesByRegion, RegionGroup } from '@/lib/utils';

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
