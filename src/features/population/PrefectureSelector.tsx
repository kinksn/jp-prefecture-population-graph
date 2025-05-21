import { Prefecture } from '@/api/prefectures';
import { RegionGroup } from '@/lib/utils';

type PrefectureSelectorProps = {
  value: RegionGroup[];
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
      <div>
        {value.map((region) => (
          <fieldset key={region.region} className="mb-4">
            <legend className="mb-2 font-bold">{region.region}</legend>
            <div className="grid grid-cols-4 gap-2 text-sm">
              {region.prefs.map((prefecture) => (
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
        ))}
      </div>
    )}
  </div>
);
