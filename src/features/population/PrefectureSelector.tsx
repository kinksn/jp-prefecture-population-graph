type PrefectureSelectorProps = {
  prefectures: { prefCode: number; prefName: string }[];
  selected: number[];
  togglePrefecture: (prefCode: number) => void;
};

export const PrefectureSelector = ({
  prefectures,
  selected,
  togglePrefecture,
}: PrefectureSelectorProps) => (
  <fieldset>
    <legend className="mb-2 font-bold">都道府県</legend>
    <div className="grid grid-cols-4 gap-2 text-sm">
      {prefectures.map((prefecture) => (
        <label key={prefecture.prefCode} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selected.includes(prefecture.prefCode)}
            onChange={() => togglePrefecture(prefecture.prefCode)}
          />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  </fieldset>
);
