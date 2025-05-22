type SegmentedControlProps<T> = {
  options: T[];
  value: T;
  onChange: (value: T) => void;
};

export const SegmentedControl = <T extends string>({
  options,
  value,
  onChange,
}: SegmentedControlProps<T>) => {
  return (
    <div className="segmentedControl-bg bg-segmentedControl-bg shadow-inset flex w-fit gap-1 rounded-2xl p-1 font-bold whitespace-nowrap max-sm:gap-0">
      {options.map((option) => (
        <label
          key={option}
          className={`flex cursor-pointer rounded-[14px] px-3 py-2 text-center text-sm transition-colors duration-200 ease-in-out ${
            value === option
              ? 'bg-content-base shadow-content'
              : 'hover:bg-hover text-paragraph-weak'
          }`}
        >
          <input
            type="radio"
            name="segmented-control"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
            className="sr-only"
          />
          {option}
        </label>
      ))}
    </div>
  );
};
