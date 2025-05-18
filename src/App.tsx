import { useState } from 'react';
import { usePrefectures } from './hooks/usePrefectures';
import { usePopulations } from './hooks/usePopulations';
import { PrefectureSelector } from './features/population/PrefectureSelector';
import { PopulationCategorySelector } from './features/population/PopulationCategorySelector';
import { PopulationChart } from './features/population/PopulationChart';
import { PopulationType } from './lib/type';

const POPULATION_TYPES: PopulationType[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

const INIT_POPULATION: PopulationType = '総人口';

function App() {
  const { data: prefecturesData = [], isLoading: isLoadingPrefectures } =
    usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<number[]>([]);
  const { data: populationsData, isLoading: isLoadingPopulation } =
    usePopulations(selectedPrefectures);
  const [populationCategory, setPopulationCategory] =
    useState<PopulationType>(INIT_POPULATION);

  const togglePrefecture = (prefCode: number) =>
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode)
        ? prev.filter((prevPrefCode) => prevPrefCode !== prefCode)
        : [...prev, prefCode],
    );

  if (isLoadingPrefectures) return <p>Loading prefectures…</p>;

  return (
    <div className="space-y-8 p-8">
      <PrefectureSelector
        prefectures={prefecturesData}
        selected={selectedPrefectures}
        togglePrefecture={togglePrefecture}
      />
      <PopulationCategorySelector
        value={populationCategory}
        // TODO：アサーションを使わず渡せるようにする
        onChange={(category: string) =>
          setPopulationCategory(category as PopulationType)
        }
        options={POPULATION_TYPES as unknown as string[]}
      />
      {selectedPrefectures.length === 0 ? (
        <p className="text-gray-500">都道府県を選択してください</p>
      ) : isLoadingPopulation ? (
        <p>Loading chart…</p>
      ) : (
        <PopulationChart
          populations={populationsData}
          selectedPrefectures={selectedPrefectures}
          prefectures={prefecturesData}
          populationCategory={populationCategory}
        />
      )}
    </div>
  );
}

export default App;
