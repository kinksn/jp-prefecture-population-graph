import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import { POPULATION_CATEGORIES } from '@/lib/constants';
import { PopulationCategory } from '@/lib/types';

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
