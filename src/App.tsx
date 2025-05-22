import { usePrefectures } from '@/hooks/usePrefectures';
import { usePopulations } from '@/hooks/usePopulations';
import { PrefectureSelector } from '@/features/population/PrefectureSelector';
import { PopulationChart } from '@/features/population/PopulationChart';
import { Header } from '@/components/organisms/Header';
import { SideMenu } from '@/components/organisms/SideMenu';
import { ContentBase } from '@/components/templates/ContentBase';
import { useSideMenu } from '@/hooks/useSideMenu';
import { useSelectedPrefecture } from './hooks/useSelectedPrefecture';

function App() {
  const { data: prefecturesData = [], isLoading: isLoadingPrefectures } =
    usePrefectures();
  const { selectedPrefectures } = useSelectedPrefecture();
  const { data: populationsData, isLoading: isLoadingPopulation } =
    usePopulations(selectedPrefectures);

  const { isSideMenuOpen } = useSideMenu();

  return (
    <div className="h-svh">
      <main
        className={`h-full px-5 max-sm:px-0 ${isSideMenuOpen && 'lg:pr-[calc(var(--sidemenu-width)+20px)]'} transition md:pb-10`}
      >
        <Header className="max-sm:pl-5" />
        <ContentBase className="min-h-[calc(100%-var(--header-height))] p-10 max-sm:rounded-b-none">
          <PopulationChart
            value={populationsData}
            prefectures={prefecturesData}
            isLoadingPopulation={isLoadingPopulation}
          />
        </ContentBase>
      </main>
      <SideMenu className="fixed top-0 right-0" headerLabel="都道府県を選択">
        <PrefectureSelector
          value={prefecturesData}
          isLoadingPrefectures={isLoadingPrefectures}
        />
      </SideMenu>
    </div>
  );
}

export default App;
