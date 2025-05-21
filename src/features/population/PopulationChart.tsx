import { PopulationSeries } from '@/api/population';
import { Prefecture } from '@/api/prefectures';
import { PopulationCategory } from '@/lib/types';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PopulationCategorySelector } from './PopulationCategorySelector';
import { useState } from 'react';
import { RegionGroup } from '@/lib/utils';

const INIT_POPULATION_CATEGOTY: PopulationCategory = '総人口';

type PopulationChartProps = {
  value: PopulationSeries[][];
  selectedPrefectures: Prefecture['prefCode'][];
  prefectures: RegionGroup[];
  isLoadingPopulation: boolean;
};

export const PopulationChart = ({
  value,
  selectedPrefectures,
  prefectures,
  isLoadingPopulation,
}: PopulationChartProps) => {
  const [populationCategory, setPopulationCategory] =
    useState<PopulationCategory>(INIT_POPULATION_CATEGOTY);

  if (!value.length) return null;

  const firstSeries = value[0].find((s) => s.label === populationCategory);
  if (!firstSeries) return null;

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
    title: { text: populationCategory },
    xAxis: { categories: populationType, title: { text: '年度' } },
    yAxis: { title: { text: '人口数' } },
    series,
  };

  return (
    <>
      <PopulationCategorySelector
        onChange={setPopulationCategory}
        value={populationCategory}
      />
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
