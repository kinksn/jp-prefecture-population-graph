type PopulationCategorySelector = {
  value: string;
  onChange: (c: string) => void;
  options: string[];
};

export const PopulationCategorySelector = ({
  value,
  onChange,
  options,
}: PopulationCategorySelector) => (
  <fieldset>
    <legend className="mb-2 font-bold">人口区分</legend>
    <div className="flex flex-wrap gap-4 text-sm">
      {options.map((option) => (
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
