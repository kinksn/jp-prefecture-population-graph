import { PopulationSeries } from '@/api/population';
import { Prefecture } from '@/api/prefectures';
import { PopulationType } from '@/lib/type';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type PopulationChartProps = {
  populations: PopulationSeries[][];
  selectedPrefectures: number[];
  prefectures: Prefecture[];
  populationCategory: PopulationType;
};

export const PopulationChart = ({
  populations,
  selectedPrefectures,
  prefectures,
  populationCategory,
}: PopulationChartProps) => {
  if (!populations.length) return null;

  const firstSeries = populations[0].find(
    (s) => s.label === populationCategory,
  );
  if (!firstSeries) return null;

  const populationType = firstSeries.data.map((d) => d.year.toString());

  const series = populations.map((populationData, id) => {
    const target = populationData.find(
      (population) => population.label === populationCategory,
    );
    const code = selectedPrefectures[id];
    const prefectureName =
      prefectures.find((p) => p.prefCode === code)?.prefName ?? '';
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

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
