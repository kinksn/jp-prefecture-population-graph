import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PopulationCategorySelector } from '@/features/population/PopulationCategorySelector';
import { PopulationCategory } from '@/lib/types';

describe('PopulationCategorySelector', () => {
  const mockOptions: PopulationCategory[] = [
    '総人口',
    '年少人口',
    '生産年齢人口',
    '老年人口',
  ];
  const mockOnChange = vi.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('正しく表示されること', () => {
    render(
      <PopulationCategorySelector
        value={mockOptions[0]}
        onChange={mockOnChange}
      />,
    );

    expect(screen.getByText('人口区分')).toBeDefined();
    mockOptions.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeDefined();
    });
  });

  it('選択されたオプションがチェックされていること', () => {
    render(
      <PopulationCategorySelector
        value={mockOptions[1]}
        onChange={mockOnChange}
      />,
    );

    const checkedInput: HTMLInputElement = screen.getByLabelText(
      mockOptions[1],
    );

    expect(checkedInput.checked).toBe(true);
    mockOptions
      .filter((option) => option !== mockOptions[1])
      .forEach((option) => {
        const input: HTMLInputElement = screen.getByLabelText(option);
        expect(input.checked).toBe(false);
      });
  });

  it('オプションがクリックされたとき、onChangeが正しく呼ばれること', () => {
    render(
      <PopulationCategorySelector
        value={mockOptions[0]}
        onChange={mockOnChange}
      />,
    );
    const secondOption = screen.getByLabelText(mockOptions[1]);
    fireEvent.click(secondOption);

    expect(mockOnChange).toHaveBeenCalledTimes(1);
    expect(mockOnChange).toHaveBeenCalledWith(mockOptions[1]);
  });
});
