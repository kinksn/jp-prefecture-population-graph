import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PrefectureSelector } from './PrefectureSelector';
import { SelectedPrefecturesContext } from '@/components/providers/selectedPrefectures/selectedPrefecturesContext';

// SVG画像のモック
vi.mock('@/components/assets/icons/check.svg?react', () => ({
  default: () => null,
}));

describe('PrefectureSelector', () => {
  const mockPrefectures = [
    {
      region: '北海道・東北',
      prefs: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ],
    },
    {
      region: '関東',
      prefs: [
        { prefCode: 13, prefName: '東京都' },
        { prefCode: 14, prefName: '神奈川県' },
      ],
    },
  ];

  const mockSetSelectedPrefectures = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const mockSelectedPrefectures = [1, 3];

  const renderWithProvider = (ui: React.ReactElement) => {
    return render(
      <SelectedPrefecturesContext.Provider
        value={{
          selectedPrefectures: mockSelectedPrefectures,
          setSelectedPrefectures: mockSetSelectedPrefectures,
        }}
      >
        {ui}
      </SelectedPrefecturesContext.Provider>,
    );
  };

  it('正しく表示されること', () => {
    renderWithProvider(
      <PrefectureSelector
        value={mockPrefectures}
        isLoadingPrefectures={false}
      />,
    );

    mockPrefectures.forEach((region) => {
      region.prefs.forEach((prefecture) => {
        expect(
          screen.getByLabelText(prefecture.prefName, { selector: 'input' }),
        ).toBeDefined();
      });
    });
  });

  describe('都道府県選択チェックボックス', () => {
    it('チェックボックスをクリックすると都道府県の選択状態が切り替わること', () => {
      renderWithProvider(
        <PrefectureSelector
          value={mockPrefectures}
          isLoadingPrefectures={false}
        />,
      );
      const checkbox = screen.getByLabelText('青森県', { selector: 'input' });
      fireEvent.click(checkbox);

      expect(mockSetSelectedPrefectures).toHaveBeenCalledWith(
        expect.any(Function),
      );

      const updateFn = mockSetSelectedPrefectures.mock.calls[0][0];
      const newState = updateFn(mockSelectedPrefectures);
      expect(newState).toEqual([1, 3, 2]); // 2（青森県）が追加される
    });

    it('選択済みの都道府県をクリックすると選択が解除されること', () => {
      renderWithProvider(
        <PrefectureSelector
          value={mockPrefectures}
          isLoadingPrefectures={false}
        />,
      );
      const checkbox = screen.getByLabelText('北海道', { selector: 'input' });
      fireEvent.click(checkbox);

      expect(mockSetSelectedPrefectures).toHaveBeenCalledWith(
        expect.any(Function),
      );

      const updateFn = mockSetSelectedPrefectures.mock.calls[0][0];
      const newState = updateFn(mockSelectedPrefectures);

      expect(newState).toEqual([3]);
    });
  });

  describe('地域全選択チェックボックス', () => {
    it('地域のチェックボックスをオンにすると、その地域の全都道府県が選択されること', () => {
      renderWithProvider(
        <PrefectureSelector
          value={mockPrefectures}
          isLoadingPrefectures={false}
        />,
      );

      const regionFieldset = screen
        .getByText('北海道・東北')
        .closest('fieldset');
      const regionCheckbox = regionFieldset?.querySelector(
        'input[type="checkbox"]',
      );
      if (!regionCheckbox)
        throw new Error('地域のチェックボックスが見つかりません');
      fireEvent.click(regionCheckbox);

      expect(mockSetSelectedPrefectures).toHaveBeenCalledWith(
        expect.any(Function),
      );

      const updateFn = mockSetSelectedPrefectures.mock.calls[0][0];
      const newState = updateFn(mockSelectedPrefectures);

      expect(newState).toEqual([1, 3, 2]);
    });

    it('地域のチェックボックスをオフにすると、その地域の全都道府県の選択が解除されること', () => {
      const initialSelectedPrefectures = [1, 2, 3];
      renderWithProvider(
        <SelectedPrefecturesContext.Provider
          value={{
            selectedPrefectures: initialSelectedPrefectures,
            setSelectedPrefectures: mockSetSelectedPrefectures,
          }}
        >
          <PrefectureSelector
            value={mockPrefectures}
            isLoadingPrefectures={false}
          />
        </SelectedPrefecturesContext.Provider>,
      );
      const regionFieldset = screen
        .getByText('北海道・東北')
        .closest('fieldset');
      const regionCheckbox = regionFieldset?.querySelector(
        'input[type="checkbox"]',
      );
      if (!regionCheckbox)
        throw new Error('地域のチェックボックスが見つかりません');
      fireEvent.click(regionCheckbox);

      expect(mockSetSelectedPrefectures).toHaveBeenCalledWith(
        expect.any(Function),
      );

      const updateFn = mockSetSelectedPrefectures.mock.calls[0][0];
      const newState = updateFn(initialSelectedPrefectures);
      expect(newState).toEqual([3]);
    });
  });

  describe('スケルトンスクリーン', () => {
    it('isLoadingPrefecturesがtrueの場合、都道府県の選択UIが表示されないこと', () => {
      renderWithProvider(
        <PrefectureSelector
          value={mockPrefectures}
          isLoadingPrefectures={true}
        />,
      );

      expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
      expect(screen.queryByText('北海道・東北')).not.toBeInTheDocument();
      expect(screen.queryByText('青森県')).not.toBeInTheDocument();
    });

    it('isLoadingPrefecturesがfalseの場合、都道府県の選択UIが表示されること', () => {
      renderWithProvider(
        <PrefectureSelector
          value={mockPrefectures}
          isLoadingPrefectures={false}
        />,
      );

      expect(screen.getByText('北海道・東北')).toBeInTheDocument();
      expect(screen.getByText('青森県')).toBeInTheDocument();

      const totalCheckboxes = mockPrefectures.reduce(
        (acc, region) => acc + region.prefs.length + 1,
        0,
      );

      expect(screen.getAllByRole('checkbox')).toHaveLength(totalCheckboxes);
    });
  });
});
