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

export function getPopulation(prefCode: number): Promise<PopulationSeries[]> {
  return apiFetch<z.infer<typeof PopulationResponse>>(
    `/population/composition/perYear?prefCode=${prefCode}`,
  ).then((d) => PopulationResponse.parse(d).result.data);
}
