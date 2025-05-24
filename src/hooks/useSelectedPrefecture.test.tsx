import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSelectedPrefecture } from './useSelectedPrefecture';
import { SelectedPrefecturesContext } from '@/providers/selectedPrefectures/selectedPrefecturesContext';

describe('useSelectedPrefecture', () => {
  it('React Contextから正しい値を取得できること', () => {
    const mockContext = {
      selectedPrefectures: [1, 2, 3],
      togglePrefecture: vi.fn(),
      setSelectedPrefectures: vi.fn(),
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SelectedPrefecturesContext.Provider value={mockContext}>
        {children}
      </SelectedPrefecturesContext.Provider>
    );
    const { result } = renderHook(() => useSelectedPrefecture(), { wrapper });

    expect(result.current.selectedPrefectures).toEqual([1, 2, 3]);
    expect(result.current.setSelectedPrefectures).toBeDefined();
  });

  it('React Contextが存在しない場合はエラーを投げること', () => {
    expect(() => {
      renderHook(() => useSelectedPrefecture());
    }).toThrow(
      'useSelectedPrefecture must be used within a SelectedPrefectureProvider',
    );
  });
});
