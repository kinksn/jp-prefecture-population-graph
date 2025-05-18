import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getPopulation, PopulationSeries } from '@/api/population';
import { Prefecture } from '@/api/prefectures';

export function usePopulations(prefCodes: Prefecture['prefCode'][]) {
  const queryDefs = useMemo(
    () =>
      prefCodes.map((prefCode) => ({
        queryKey: ['population', prefCode],
        queryFn: () => getPopulation(prefCode),
        staleTime: 1000 * 60 * 60, // 1h
        retry: 2,
      })),
    [prefCodes.join(',')],
  );

  const queries = useQueries({ queries: queryDefs });

  const data: PopulationSeries[][] = queries.map((query) => query.data ?? []);
  const isLoading = queries.some((query) => query.isLoading);
  const error = queries.find((query) => query.error)?.error ?? null;

  return { data, isLoading, error };
}
