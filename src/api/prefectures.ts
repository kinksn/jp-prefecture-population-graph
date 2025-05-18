import { z } from 'zod';
import { apiFetch } from '@/api/client';

const PrefectureListResponse = z.object({
  message: z.null(),
  result: z.array(
    z.object({
      prefCode: z.number(),
      prefName: z.string(),
    }),
  ),
});
export type Prefecture = z.infer<
  typeof PrefectureListResponse
>['result'][number];

let prefecturesCache: Promise<Prefecture[]> | null = null;

export function getPrefectures(): Promise<Prefecture[]> {
  if (!prefecturesCache) {
    prefecturesCache = apiFetch<z.infer<typeof PrefectureListResponse>>(
      '/prefectures',
    ).then((d) => PrefectureListResponse.parse(d).result);
  }
  return prefecturesCache;
}
