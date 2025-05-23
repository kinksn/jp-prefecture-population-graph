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

export function getPrefectures(): Promise<Prefecture[]> {
  return apiFetch<z.infer<typeof PrefectureListResponse>>('/prefectures').then(
    (d) => PrefectureListResponse.parse(d).result,
  );
}
