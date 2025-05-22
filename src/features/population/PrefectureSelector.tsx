import { Prefecture } from '@/api/getPrefectures';
import { Checkbox } from '@/components/atoms/Checkbox';
import { useSelectedPrefecture } from '@/hooks/useSelectedPrefecture';
import { RegionGroup } from '@/lib/utils';

type PrefectureSelectorProps = {
  value: RegionGroup[];
  isLoadingPrefectures: boolean;
};

export const PrefectureSelector = ({
  value,
  isLoadingPrefectures,
}: PrefectureSelectorProps) => {
  const { selectedPrefectures, setSelectedPrefectures } =
    useSelectedPrefecture();

  const togglePrefecture = (prefCode: Prefecture['prefCode']) =>
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode)
        ? prev.filter((prevPrefCode) => prevPrefCode !== prefCode)
        : [...prev, prefCode],
    );

  return (
    <div className="overflow-y-scroll">
      {isLoadingPrefectures ? (
        <p>Loading prefectures…</p>
      ) : (
        <div>
          {value.map((region) => (
            <fieldset key={region.region} className="mb-7">
              <legend className="text-label bg-base mb-4 flex w-full rounded-lg p-4 leading-none font-bold">
                {region.region}
              </legend>
              <div className="flex cursor-pointer flex-wrap gap-3 text-sm">
                {region.prefs.map((prefecture) => (
                  <Checkbox
                    key={prefecture.prefCode}
                    label={prefecture.prefName}
                    checked={selectedPrefectures.includes(prefecture.prefCode)}
                    onChange={() => togglePrefecture(prefecture.prefCode)}
                  />
                ))}
              </div>
            </fieldset>
          ))}
        </div>
      )}
    </div>
  );
};
