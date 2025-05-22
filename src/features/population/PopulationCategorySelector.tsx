import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import { PopulationCategory } from '@/lib/types';

const POPULATION_CATEGORIES: PopulationCategory[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

type PopulationCategorySelector = {
  value: PopulationCategory;
  className?: string;
  onChange: (populationCategory: PopulationCategory) => void;
};

export const PopulationCategorySelector = ({
  value,
  className,
  onChange,
}: PopulationCategorySelector) => (
  <fieldset className={className}>
    <legend className="sr-only mb-2 font-bold">人口区分</legend>
    <SegmentedControl<PopulationCategory>
      options={POPULATION_CATEGORIES}
      value={value}
      onChange={onChange}
    />
  </fieldset>
);
