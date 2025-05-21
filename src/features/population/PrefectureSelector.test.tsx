import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrefectureSelector } from './PrefectureSelector';

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
  const mockSelectedPrefectures = [1, 3];
  const mockToggle = vi.fn();

  beforeEach(() => {
    mockToggle.mockClear();
  });

  it('正しくレンダリングされること', () => {
    render(
      <PrefectureSelector
        value={mockPrefectures}
        selectedPrefectures={mockSelectedPrefectures}
        togglePrefecture={mockToggle}
        isLoadingPrefectures={false}
      />,
    );

    mockPrefectures.forEach((region) => {
      region.prefs.forEach((prefecture) => {
        expect(screen.getByLabelText(prefecture.prefName)).toBeDefined();
      });
    });
  });

  it('選択されている都道府県にチェックが入っていること', () => {
    render(
      <PrefectureSelector
        value={mockPrefectures}
        selectedPrefectures={mockSelectedPrefectures}
        togglePrefecture={mockToggle}
        isLoadingPrefectures={false}
      />,
    );

    mockPrefectures.forEach((region) => {
      region.prefs.forEach((prefecture) => {
        const input = screen.getByLabelText(
          prefecture.prefName,
        ) as HTMLInputElement;
        expect(input.checked).toBe(
          mockSelectedPrefectures.includes(prefecture.prefCode),
        );
      });
    });
  });

  it('都道府県がクリックされたとき、togglePrefectureが正しく呼ばれること', () => {
    render(
      <PrefectureSelector
        value={mockPrefectures}
        selectedPrefectures={mockSelectedPrefectures}
        togglePrefecture={mockToggle}
        isLoadingPrefectures={false}
      />,
    );

    const targetPref = mockPrefectures[0].prefs[1];
    const input = screen.getByLabelText(targetPref.prefName);
    fireEvent.click(input);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(targetPref.prefCode);
  });
});
