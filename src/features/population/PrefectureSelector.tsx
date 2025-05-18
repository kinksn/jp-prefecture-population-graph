import { Prefecture } from '@/api/prefectures';

type PrefectureSelectorProps = {
  value: Prefecture[];
  selectedPrefectures: Prefecture['prefCode'][];
  togglePrefecture: (prefCode: Prefecture['prefCode']) => void;
};

export const PrefectureSelector = ({
  value,
  selectedPrefectures,
  togglePrefecture,
}: PrefectureSelectorProps) => (
  <fieldset>
    <legend className="mb-2 font-bold">都道府県</legend>
    <div className="grid grid-cols-4 gap-2 text-sm">
      {value.map((prefecture) => (
        <label key={prefecture.prefCode} className="flex items-center gap-1">
          <input
            type="checkbox"
            checked={selectedPrefectures.includes(prefecture.prefCode)}
            onChange={() => togglePrefecture(prefecture.prefCode)}
          />
          {prefecture.prefName}
        </label>
      ))}
    </div>
  </fieldset>
);
