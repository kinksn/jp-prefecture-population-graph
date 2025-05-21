import { useState } from 'react';
import { usePrefectures } from '@/hooks/usePrefectures';
import { usePopulations } from '@/hooks/usePopulations';
import { PrefectureSelector } from '@/features/population/PrefectureSelector';
import { PopulationChart } from '@/features/population/PopulationChart';
import { Prefecture } from '@/api/prefectures';
import { Header } from '@/components/organisms/Header';
import { SideMenu } from '@/components/organisms/SideMenu';
import { ContentBase } from '@/components/templates/ContentBase';
import { useSideMenu } from '@/hooks/useSideMenu';

function App() {
  const { data: prefecturesData = [], isLoading: isLoadingPrefectures } =
    usePrefectures();
  const [selectedPrefectures, setSelectedPrefectures] = useState<
    Prefecture['prefCode'][]
  >([]);
  const { data: populationsData, isLoading: isLoadingPopulation } =
    usePopulations(selectedPrefectures);

  const { isSideMenuOpen } = useSideMenu();

  const togglePrefecture = (prefCode: Prefecture['prefCode']) =>
    setSelectedPrefectures((prev) =>
      prev.includes(prefCode)
        ? prev.filter((prevPrefCode) => prevPrefCode !== prefCode)
        : [...prev, prefCode],
    );

  return (
    <div className="relative h-svh">
      <main
        className={`h-full ${isSideMenuOpen ? 'pr-[calc(var(--sidemenu-width)+20px)]' : 'pr-5'} pb-10 pl-5 transition`}
      >
        <Header />
        <ContentBase className="h-[calc(100%-var(--header-height))] p-10">
          {selectedPrefectures.length === 0 ? (
            <p>都道府県を選択してください</p>
          ) : (
            <PopulationChart
              value={populationsData}
              selectedPrefectures={selectedPrefectures}
              prefectures={prefecturesData}
              isLoadingPopulation={isLoadingPopulation}
            />
          )}
        </ContentBase>
      </main>
      <SideMenu className="absolute top-0 right-0" headerLabel="都道府県を選択">
        <PrefectureSelector
          value={prefecturesData}
          selectedPrefectures={selectedPrefectures}
          togglePrefecture={togglePrefecture}
          isLoadingPrefectures={isLoadingPrefectures}
        />
      </SideMenu>
    </div>
  );
}

export default App;
