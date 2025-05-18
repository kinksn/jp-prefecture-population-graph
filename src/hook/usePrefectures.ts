import { useQuery } from '@tanstack/react-query';
import { getPrefectures } from '@/api/prefectures';

export function usePrefectures() {
  return useQuery({
    queryKey: ['prefectures'],
    queryFn : getPrefectures,
    staleTime: Infinity,
  });
}
