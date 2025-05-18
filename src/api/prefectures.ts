import { z } from 'zod';
import { apiFetch } from '@/api/client';

const PrefListResponse = z.object({
  message: z.null(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    })
  ),
});
export type Prefecture = z.infer<typeof PrefListResponse>['result'][number];


let prefecturesCache: Promise<Prefecture[]> | null = null;

export function getPrefectures(): Promise<Prefecture[]> {
  if (!prefecturesCache) {
    prefecturesCache = apiFetch<z.infer<typeof PrefListResponse>>(
      '/prefectures'
    ).then((d) => PrefListResponse.parse(d).result);
  }
  return prefecturesCache;
}
