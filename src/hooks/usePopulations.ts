import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { getPopulation, PopulationSeries } from '@/api/population';

/**
 * 都道府県コード配列を受け取り、同順序で人口推移データを返すフック
 *
 * - Hook を常に同じ順序で呼び出すため、`useQueries` は必ず実行
 * - `prefCodes` が空でも問題なく動き、ESLint (`react-hooks/rules-of-hooks`) にも抵触しない
 */
export function usePopulations(prefCodes: number[]) {
  /** クエリ定義をメモ化（join で依存を安定化） */
  const queryDefs = useMemo(
    () =>
      prefCodes.map((code) => ({
        queryKey: ['population', code],
        queryFn: () => getPopulation(code),
        staleTime: 1000 * 60 * 60, // 1h
        retry: 2,
      })),
    [prefCodes.join(',')],
  );

  /** useQueries は prefCodes が空でも必ず呼ばれる */
  const queries = useQueries({ queries: queryDefs });

  /** 返り値を整形 */
  const data: PopulationSeries[][] = queries.map((q) => q.data ?? []);
  const isLoading = queries.some((q) => q.isLoading);
  const error = queries.find((q) => q.error)?.error ?? null;

  return { data, isLoading, error };
}
