import { z } from 'zod';
import { apiFetch } from '@/api/client';

const PopItem = z.object({
  year: z.number(),
  value: z.number(),
  rate: z.number().optional(),
});
const PopSeries = z.object({
  label: z.string(),
  data: z.array(PopItem),
});
const PopulationResponse = z.object({
  message: z.null(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(PopSeries),
  }),
});
export type PopulationSeries = z.infer<typeof PopSeries>;

const popCache = new Map<number, Promise<PopulationSeries[]>>();

/** 指定都道府県の人口推移を取得・キャッシュ */
export function getPopulation(prefCode: number): Promise<PopulationSeries[]> {
  if (!popCache.has(prefCode)) {
    popCache.set(
      prefCode,
      apiFetch<z.infer<typeof PopulationResponse>>(
        `/population/composition/perYear?prefCode=${prefCode}`
      ).then((d) => PopulationResponse.parse(d).result.data)
    );
  }
  return popCache.get(prefCode)!;
}

/** キャッシュクリア（任意タイミングで失効させる用） */
export function clearPopulationCache(prefCode?: number) {
  if (prefCode !== undefined) popCache.delete(prefCode);
  else popCache.clear();
}
