import { PopulationSeries } from '@/api/getPopulation';
import { PopulationCategory } from '@/lib/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationCategorySelector } from './PopulationCategorySelector';
import { useState } from 'react';
import { RegionGroup } from '@/lib/types';
import { useSelectedPrefecture } from '@/hooks/useSelectedPrefecture';
import EmptyStateImage from '@/components/assets/images/empty-state.svg?react';
import ColumnIcon from '@/components/assets/icons/column.svg?react';
import { Button } from '@/components/atoms/Button';
import { useSideMenu } from '@/hooks/useSideMenu';

const INIT_POPULATION_CATEGOTY: PopulationCategory = '総人口';

type PopulationChartProps = {
  value: PopulationSeries[][];
  prefectures: RegionGroup[];
};

export const PopulationChart = ({
  value,
  prefectures,
}: PopulationChartProps) => {
  const { selectedPrefectures } = useSelectedPrefecture();
  const [populationCategory, setPopulationCategory] =
    useState<PopulationCategory>(INIT_POPULATION_CATEGOTY);

  if (!value.length) return <ChartEmptyState />;

  const firstSeries = value[0].find((s) => s.label === populationCategory);
  if (!firstSeries) return <ChartEmptyState />;

  const populationType = firstSeries.data.map((d) => d.year.toString());

  const series = value.map((populationData, id) => {
    const target = populationData.find(
      (population) => population.label === populationCategory,
    );
    const code = selectedPrefectures[id];
    const allPrefectures = prefectures.flatMap((region) => region.prefs);
    const prefectureName =
      allPrefectures.find((p) => p.prefCode === code)?.prefName ?? '';
    return {
      type: 'line' as const,
      name: prefectureName,
      data: target?.data.map((d) => d.value) ?? [],
    };
  });

  const options: Highcharts.Options = {
    title: { text: '' },
    xAxis: { categories: populationType, title: { text: '年度' } },
    yAxis: { title: { text: '人口数' } },
    series,
  };

  return (
    <>
      <div className="mb-10 flex items-center justify-between max-sm:flex-col-reverse max-sm:gap-5">
        <h2>{populationCategory}の推移</h2>
        <PopulationCategorySelector
          onChange={setPopulationCategory}
          value={populationCategory}
        />
      </div>
      <div className="mix-blend-darken">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

const ChartEmptyState = () => {
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 lg:mt-20">
      <EmptyStateImage />
      <div className="flex flex-col items-center justify-center gap-5">
        <p className="text-heading pl-[7px] text-xl font-bold">
          都道府県を選択してください
        </p>
        {!isSideMenuOpen && (
          <Button
            onClick={toggleSideMenu}
            label="選択パネルを開く"
            icon={<ColumnIcon className="text-inactive size-6" />}
            className="ml-2"
          />
        )}
      </div>
    </div>
  );
};
