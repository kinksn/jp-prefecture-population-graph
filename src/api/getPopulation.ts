import { z } from 'zod';
import { apiFetch } from '@/api/client';

const PopulationItem = z.object({
  year: z.number(),
  value: z.number(),
  rate: z.number().optional(),
});
const PoplationSeries = z.object({
  label: z.string(),
  data: z.array(PopulationItem),
});
const PopulationResponse = z.object({
  message: z.null(),
  result: z.object({
    boundaryYear: z.number(),
    data: z.array(PoplationSeries),
  }),
});
export type PopulationSeries = z.infer<typeof PoplationSeries>;

const popCache = new Map<number, Promise<PopulationSeries[]>>();

/** 指定都道府県の人口推移を取得・キャッシュ */
export function getPopulation(prefCode: number): Promise<PopulationSeries[]> {
  if (!popCache.has(prefCode)) {
    popCache.set(
      prefCode,
      apiFetch<z.infer<typeof PopulationResponse>>(
        `/population/composition/perYear?prefCode=${prefCode}`,
      ).then((d) => PopulationResponse.parse(d).result.data),
    );
  }
  return popCache.get(prefCode)!;
}
