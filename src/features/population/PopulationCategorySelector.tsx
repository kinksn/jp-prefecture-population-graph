import { PopulationCategory } from '@/lib/type';

const POPULATION_CATEGORIES: PopulationCategory[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

type PopulationCategorySelector = {
  value: PopulationCategory;
  onChange: (populationCategory: PopulationCategory) => void;
};

export const PopulationCategorySelector = ({
  value,
  onChange,
}: PopulationCategorySelector) => (
  <fieldset>
    <legend className="sr-only mb-2 font-bold">人口区分</legend>
    <div className="flex flex-wrap gap-4 text-sm">
      {POPULATION_CATEGORIES.map((option) => (
        <label key={option} className="flex items-center gap-1">
          <input
            type="radio"
            name="population-category"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  </fieldset>
);
