import { useState } from 'react';
import { usePrefectures } from '@/hooks/usePrefectures';
import { usePopulations } from '@/hooks/usePopulations';
import { PrefectureSelector } from '@/features/population/PrefectureSelector';
import { PopulationCategorySelector } from '@/features/population/PopulationCategorySelector';
import { PopulationChart } from '@/features/population/PopulationChart';
import { PopulationCategory } from '@/lib/type';
import { Prefecture } from '@/api/prefectures';

const POPULATION_CATEGORIES: PopulationCategory[] = [
  '総人口',
  '年少人口',
  '生産年齢人口',
  '老年人口',
];

const INIT_POPULATION_CATEGOTY: PopulationCategory = '総人口';

function App() {
  const { data: prefecturesData = [], isLoading: isLoadingPrefectures } =
    usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    Prefecture['prefCode'][]
  >([]);
  const { data: populationsData, isLoading: isLoadingPopulation } =
    usePopulations(selectedPrefectures);
  const [populationCategory, setPopulationCategory] =
    useState<PopulationCategory>(INIT_POPULATION_CATEGOTY);

  const togglePrefecture = (prefCode: Prefecture['prefCode']) =>
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode)
        ? prev.filter((prevPrefCode) => prevPrefCode !== prefCode)
        : [...prev, prefCode],
    );

  if (isLoadingPrefectures) return <p>Loading prefectures…</p>;

  return (
    <div className="space-y-8 p-8">
      <PrefectureSelector
        value={prefecturesData}
        selectedPrefectures={selectedPrefectures}
        togglePrefecture={togglePrefecture}
      />
      <PopulationCategorySelector
        value={populationCategory}
        onChange={(populationCategory) =>
          setPopulationCategory(populationCategory)
        }
        options={POPULATION_CATEGORIES}
      />
      {selectedPrefectures.length === 0 ? (
        <p className="text-gray-500">都道府県を選択してください</p>
      ) : isLoadingPopulation ? (
        <p>Loading chart…</p>
      ) : (
        <PopulationChart
          value={populationsData}
          selectedPrefectures={selectedPrefectures}
          prefectures={prefecturesData}
          populationCategory={populationCategory}
        />
      )}
    </div>
  );
}

export default App;
