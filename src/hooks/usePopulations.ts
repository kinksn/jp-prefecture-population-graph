import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getPopulation, PopulationSeries } from '@/api/getPopulation';
import { Prefecture } from '@/api/getPrefectures';

export function usePopulations(prefCodes: Prefecture['prefCode'][]) {
  const queryDefs = useMemo(
    () =>
      prefCodes.map((prefCode) => ({
        queryKey: ['population', prefCode],
        queryFn: () => getPopulation(prefCode),
        staleTime: 1000 * 60 * 60, // 1時間
        cacheTime: 1000 * 60 * 60, // 1時間
        retry: 2,
      })),
    [prefCodes],
  );

  const queries = useQueries({ queries: queryDefs });

  const data: PopulationSeries[][] = queries.map((query) => query.data ?? []);
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error ?? null;

  return { data, isLoading, error };
}
