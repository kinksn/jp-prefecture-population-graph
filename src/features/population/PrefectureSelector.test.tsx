import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { PrefectureSelector } from './PrefectureSelector';
import { SelectedPrefecturesContext } from '@/contexts/selectedPrefectures/selectedPrefecturesContext';

// チェックアイコン（SVG画像）のモック
vi.mock('@/components/assets/icons/check.svg?react', () => ({
  default: () => null,
}));

const mockSelectedPrefectures = [1, 3];
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

describe('PrefectureSelector', () => {
  const mockPrefectures = [
    {
      region: '北海道・東北',
      prefs: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ],
    },
  ];

  it('正しくレンダリングされること', () => {
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

  it('選択されている都道府県にチェックが入っていること', () => {
    renderWithProvider(
      <PrefectureSelector
        value={mockPrefectures}
        isLoadingPrefectures={false}
      />,
    );

    mockPrefectures.forEach((region) => {
      region.prefs.forEach((prefecture) => {
        const checkbox = screen.getByLabelText(prefecture.prefName, {
          selector: 'input',
        }) as HTMLInputElement;
        expect(checkbox.checked).toBe(
          mockSelectedPrefectures.includes(prefecture.prefCode),
        );
      });
    });
  });
});
