import { Prefecture } from '@/api/prefectures';

type PrefectureSelectorProps = {
  value: Prefecture[];
  selectedPrefectures: Prefecture['prefCode'][];
  isLoadingPrefectures: boolean;
  togglePrefecture: (prefCode: Prefecture['prefCode']) => void;
};

export const PrefectureSelector = ({
  value,
  selectedPrefectures,
  isLoadingPrefectures,
  togglePrefecture,
}: PrefectureSelectorProps) => (
  <div>
    {isLoadingPrefectures ? (
      <p>Loading prefectures…</p>
    ) : (
      <fieldset>
        <legend className="sr-only">都道府県</legend>
        <div className="grid grid-cols-4 gap-2 text-sm">
          {value.map((prefecture) => (
            <label
              key={prefecture.prefCode}
              className="flex items-center gap-1"
            >
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
    )}
  </div>
);
