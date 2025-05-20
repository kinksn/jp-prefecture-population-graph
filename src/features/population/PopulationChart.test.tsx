import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PopulationChart } from './PopulationChart';
import { PopulationSeries } from '@/api/population';
import { Prefecture } from '@/api/prefectures';
import { PopulationCategory } from '@/lib/type';

// highchartsのモック
vi.mock('highcharts-react-official', () => ({
  default: vi.fn().mockImplementation(({ options }) => (
    <div data-testid="highcharts">
      <div data-testid="chart-title">{options.title.text}</div>
      <div data-testid="chart-series">
        {JSON.stringify(
          options.series.map((option: { name: string }) => option.name),
        )}
      </div>
    </div>
  )),
}));

describe('PopulationChart', () => {
  const mockPopulations: PopulationSeries[][] = [
    [
      {
        label: '総人口',
        data: [
          { year: 2015, value: 5000 },
          { year: 2020, value: 4800 },
        ],
      },
      {
        label: '年少人口',
        data: [
          { year: 2015, value: 800 },
          { year: 2020, value: 750 },
        ],
      },
    ],
    [
      {
        label: '総人口',
        data: [
          { year: 2015, value: 3000 },
          { year: 2020, value: 2900 },
        ],
      },
      {
        label: '年少人口',
        data: [
          { year: 2015, value: 500 },
          { year: 2020, value: 480 },
        ],
      },
    ],
  ];

  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
  ];

  const mockSelectedPrefectures = [1, 2];

  const mockCategory: PopulationCategory = '総人口';

  it('チャートが正しくレンダリングされること', () => {
    render(
      <PopulationChart
        value={mockPopulations}
        selectedPrefectures={mockSelectedPrefectures}
        prefectures={mockPrefectures}
        isLoadingPopulation={false}
      />,
    );

    expect(screen.getByTestId('highcharts')).toBeDefined();
    expect(screen.getByTestId('chart-title').textContent).toBe(mockCategory);
    expect(screen.getByTestId('chart-series').textContent).includes('北海道');
    expect(screen.getByTestId('chart-series').textContent).includes('青森県');
  });

  it('データが空の場合、何もレンダリングされないこと', () => {
    const { container } = render(
      <PopulationChart
        value={[]}
        selectedPrefectures={mockSelectedPrefectures}
        prefectures={mockPrefectures}
        isLoadingPopulation={true}
      />,
    );

    expect(container.firstChild).toBeNull();
  });

  it('指定されたカテゴリのデータが存在しない場合、何もレンダリングされないこと', () => {
    const { container } = render(
      <PopulationChart
        value={[
          [
            {
              label: '存在しないカテゴリ',
              data: [
                { year: 2015, value: 1000 },
                { year: 2020, value: 900 },
              ],
            },
          ],
        ]}
        selectedPrefectures={mockSelectedPrefectures}
        prefectures={mockPrefectures}
        isLoadingPopulation={true}
      />,
    );

    expect(container.firstChild).toBeNull();
  });
});
