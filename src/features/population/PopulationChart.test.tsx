import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PopulationChart } from './PopulationChart';
import { PopulationSeries } from '@/api/getPopulation';
import { SelectedPrefecturesContext } from '@/providers/selectedPrefectures/selectedPrefecturesContext';
import { SideMenuProvider } from '@/providers/sideMenu/SideMenuProvider';
import { useSideMenu } from '@/hooks/useSideMenu';

// SVG画像をモック
vi.mock('@/components/assets/images/empty-state.svg?react', () => ({
  default: () => <div data-testid="empty-state-svg">Empty State SVG</div>, // mock-svgからempty-state-svgに変更
}));

// ColumnIconのモック
vi.mock('@/components/assets/icons/column.svg?react', () => ({
  default: () => <div data-testid="column-icon">Column Icon</div>,
}));

// useSideMenuのモック
vi.mock('@/hooks/useSideMenu', () => ({
  useSideMenu: vi.fn().mockReturnValue({
    isSideMenuOpen: false,
    toggleSideMenu: vi.fn(),
  }),
}));

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

const mockSelectedPrefectures = [1, 2];
const renderWithProvider = (ui: React.ReactElement) => {
  return render(
    <SideMenuProvider>
      <SelectedPrefecturesContext.Provider
        value={{
          selectedPrefectures: mockSelectedPrefectures,
          setSelectedPrefectures: vi.fn(),
        }}
      >
        {ui}
      </SelectedPrefecturesContext.Provider>
    </SideMenuProvider>,
  );
};

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
      <PopulationChart value={mockPopulations} prefectures={mockPrefectures} />,
    );

    expect(screen.getByTestId('highcharts')).toBeDefined();
    expect(screen.getByTestId('chart-series').textContent).includes('北海道');
    expect(screen.getByTestId('chart-series').textContent).includes('青森県');
  });

  describe('エンプティーステートの表示', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });

    it('データが空の場合、エンプティーステートが表示されること', () => {
      renderWithProvider(
        <PopulationChart value={[]} prefectures={mockPrefectures} />,
      );

      expect(screen.getByTestId('empty-state-svg')).toBeInTheDocument();
      expect(
        screen.getByText('都道府県を選択してください'),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '選択パネルを開く' }),
      ).toBeInTheDocument();
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
        />,
      );

      expect(screen.getByTestId('empty-state-svg')).toBeInTheDocument();
      expect(
        screen.getByText('都道府県を選択してください'),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: '選択パネルを開く' }),
      ).toBeInTheDocument();
    });

    it('サイドメニューが開いている場合、エンプティーステート最下部の選択パネルを開くボタンが表示されないこと', () => {
      vi.mocked(useSideMenu).mockReturnValueOnce({
        isSideMenuOpen: true,
        toggleSideMenu: vi.fn(),
      });

      renderWithProvider(
        <PopulationChart value={[]} prefectures={mockPrefectures} />,
      );

      expect(screen.getByTestId('empty-state-svg')).toBeInTheDocument();
      expect(
        screen.getByText('都道府県を選択してください'),
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: '選択パネルを開く' }),
      ).not.toBeInTheDocument();
    });
  });
});
