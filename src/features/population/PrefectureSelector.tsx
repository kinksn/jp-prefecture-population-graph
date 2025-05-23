import { Prefecture } from '@/api/getPrefectures';
import { Checkbox } from '@/components/atoms/Checkbox';
import { useSelectedPrefecture } from '@/hooks/useSelectedPrefecture';
import { RegionGroup } from '@/lib/types';

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

  const toggleRegionPrefectures = (
    regionPrefs: Prefecture[],
    isChecked: boolean,
  ) => {
    if (isChecked) {
      setSelectedPrefectures((prev) => [
        ...new Set([...prev, ...regionPrefs.map((pref) => pref.prefCode)]),
      ]);
    } else {
      setSelectedPrefectures((prev) =>
        prev.filter(
          (prefCode) =>
            !regionPrefs.map((pref) => pref.prefCode).includes(prefCode),
        ),
      );
    }
  };

  return (
    <div className="overflow-y-scroll">
      {isLoadingPrefectures ? (
        <SkeletonScreen />
      ) : (
        <div>
          {value.map((region) => {
            const allRegionPrefecturesSelected = region.prefs.every((pref) =>
              selectedPrefectures.includes(pref.prefCode),
            );

            return (
              <fieldset key={region.region} className="mb-7">
                <legend className="text-label bg-base mb-4 flex w-full items-center justify-between rounded-lg p-4 leading-none font-bold">
                  <span>{region.region}</span>
                  <Checkbox
                    checked={allRegionPrefecturesSelected}
                    onChange={(e) =>
                      toggleRegionPrefectures(region.prefs, e.target.checked)
                    }
                  />
                </legend>
                <div className="flex cursor-pointer flex-wrap gap-3 text-sm">
                  {region.prefs.map((prefecture) => (
                    <Checkbox
                      key={prefecture.prefCode}
                      label={prefecture.prefName}
                      checked={selectedPrefectures.includes(
                        prefecture.prefCode,
                      )}
                      onChange={() => togglePrefecture(prefecture.prefCode)}
                    />
                  ))}
                </div>
              </fieldset>
            );
          })}
        </div>
      )}
    </div>
  );
};

const SkeletonScreen = () => (
  <div className="w-full animate-pulse">
    <div className="bg-base mb-4 h-13 rounded-lg" />
    <div className="flex cursor-pointer flex-wrap gap-3 text-sm">
      <div className="flex items-center gap-1">
        <div className="bg-segmentedControl-bg size-5 rounded-lg" />
        <div className="bg-segmentedControl-bg h-2 w-10 rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-segmentedControl-bg size-5 rounded-lg" />
        <div className="bg-segmentedControl-bg h-2 w-10 rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-segmentedControl-bg size-5 rounded-lg" />
        <div className="bg-segmentedControl-bg h-2 w-10 rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-segmentedControl-bg size-5 rounded-lg" />
        <div className="bg-segmentedControl-bg h-2 w-10 rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-segmentedControl-bg size-5 rounded-lg" />
        <div className="bg-segmentedControl-bg h-2 w-10 rounded-full" />
      </div>
      <div className="flex items-center gap-1">
        <div className="bg-segmentedControl-bg size-5 rounded-lg" />
        <div className="bg-segmentedControl-bg h-2 w-10 rounded-full" />
      </div>
    </div>
  </div>
);
