import { PopulationSeries } from '@/api/population';
import { Prefecture } from '@/api/prefectures';
import { PopulationCategory } from '@/lib/type';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type PopulationChartProps = {
  value: PopulationSeries[][];
  selectedPrefectures: Prefecture['prefCode'][];
  prefectures: Prefecture[];
  populationCategory: PopulationCategory;
};

export const PopulationChart = ({
  value,
  selectedPrefectures,
  prefectures,
  populationCategory,
}: PopulationChartProps) => {
  if (!value.length) return null;

  const firstSeries = value[0].find((s) => s.label === populationCategory);
  if (!firstSeries) return null;

  const populationType = firstSeries.data.map((d) => d.year.toString());

  const series = value.map((populationData, id) => {
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
