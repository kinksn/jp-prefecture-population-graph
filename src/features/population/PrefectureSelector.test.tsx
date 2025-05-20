import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrefectureSelector } from './PrefectureSelector';
import { Prefecture } from '@/api/prefectures';

describe('PrefectureSelector', () => {
  const mockPrefectures: Prefecture[] = [
    { prefCode: 1, prefName: '北海道' },
    { prefCode: 2, prefName: '青森県' },
    { prefCode: 3, prefName: '岩手県' },
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

    expect(screen.getByText('都道府県')).toBeDefined();

    mockPrefectures.forEach((prefecture) => {
      expect(screen.getByLabelText(prefecture.prefName)).toBeDefined();
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

    mockPrefectures.forEach((prefecture) => {
      const input = screen.getByLabelText(
        prefecture.prefName,
      ) as HTMLInputElement;
      expect(input.checked).toBe(
        mockSelectedPrefectures.includes(prefecture.prefCode),
      );
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

    const secondPref = screen.getByLabelText(mockPrefectures[1].prefName);
    fireEvent.click(secondPref);

    expect(mockToggle).toHaveBeenCalledTimes(1);
    expect(mockToggle).toHaveBeenCalledWith(mockPrefectures[1].prefCode);
  });
});
