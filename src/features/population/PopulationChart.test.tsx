import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PopulationChart } from './PopulationChart';
import { PopulationSeries } from '@/api/getPopulation';
import { SelectedPrefecturesContext } from '@/contexts/selectedPrefectures/selectedPrefecturesContext';

const mockSelectedPrefectures = [1, 2];

const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <SelectedPrefecturesContext.Provider
      value={{
        selectedPrefectures: mockSelectedPrefectures,
        setSelectedPrefectures: vi.fn(),
      }}
    >
      {ui}
    </SelectedPrefecturesContext.Provider>,
  );
};

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

  const mockPrefectures = [
    {
      region: '北海道・東北',
      prefs: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ],
    },
  ];

  it('チャートが正しくレンダリングされること', () => {
    renderWithProvider(
      <PopulationChart
        value={mockPopulations}
        prefectures={mockPrefectures}
        isLoadingPopulation={false}
      />,
    );

    expect(screen.getByTestId('highcharts')).toBeDefined();
    expect(screen.getByTestId('chart-series').textContent).includes('北海道');
    expect(screen.getByTestId('chart-series').textContent).includes('青森県');
  });

  it('データが空の場合、エンプティーステートが表示されること', () => {
    renderWithProvider(
      <PopulationChart
        value={[]}
        prefectures={mockPrefectures}
        isLoadingPopulation={true}
      />,
    );

    expect(screen.getByText('都道府県を選択してください')).toBeDefined();
  });

  it('指定されたカテゴリのデータが存在しない場合、エンプティーステートが表示されること', () => {
    renderWithProvider(
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
        prefectures={mockPrefectures}
        isLoadingPopulation={true}
      />,
    );

    expect(screen.getByText('都道府県を選択してください')).toBeDefined();
  });
});
