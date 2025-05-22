import { PopulationSeries } from '@/api/getPopulation';
import { PopulationCategory } from '@/lib/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationCategorySelector } from './PopulationCategorySelector';
import { useState } from 'react';
import { RegionGroup } from '@/lib/utils';
import { useSelectedPrefecture } from '@/hooks/useSelectedPrefecture';

const INIT_POPULATION_CATEGOTY: PopulationCategory = '総人口';

type PopulationChartProps = {
  value: PopulationSeries[][];
  prefectures: RegionGroup[];
  isLoadingPopulation: boolean;
};

export const PopulationChart = ({
  value,
  prefectures,
  isLoadingPopulation,
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
        {isLoadingPopulation ? (
          <p>Loading chart…</p>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </div>
    </>
  );
};

const ChartEmptyState = () => <p>都道府県を選択してください</p>;
