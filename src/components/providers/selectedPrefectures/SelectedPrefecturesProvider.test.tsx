import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { SelectedPrefecturesProvider } from './SelectedPrefecturesProvider';
import { useSelectedPrefecture } from '@/hooks/useSelectedPrefecture';

describe('SelectedPrefecturesProvider', () => {
  const LOCAL_STORAGE_KEY = 'selectedPrefecturesState';
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
  };

  beforeEach(() => {
    vi.stubGlobal('localStorage', mockLocalStorage);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  const TestComponent = () => {
    const { selectedPrefectures, setSelectedPrefectures } =
      useSelectedPrefecture();
    return (
      <div>
        <div data-testid="prefectures">
          {JSON.stringify(selectedPrefectures)}
        </div>
        <button onClick={() => setSelectedPrefectures([1, 2, 3])}>
          Update
        </button>
      </div>
    );
  };

  it('初期状態が空配列であること', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { getByTestId } = render(
      <SelectedPrefecturesProvider>
        <TestComponent />
      </SelectedPrefecturesProvider>,
    );

    expect(getByTestId('prefectures').textContent).toBe('[]');
  });

  it('localStorageから保存された状態を復元できること', () => {
    const savedState = [1, 2, 3];
    mockLocalStorage.getItem.mockReturnValue(JSON.stringify(savedState));
    const { getByTestId } = render(
      <SelectedPrefecturesProvider>
        <TestComponent />
      </SelectedPrefecturesProvider>,
    );

    expect(getByTestId('prefectures').textContent).toBe(
      JSON.stringify(savedState),
    );
  });

  it('状態が更新されたときにlocalStorageに保存されること', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { getByRole } = render(
      <SelectedPrefecturesProvider>
        <TestComponent />
      </SelectedPrefecturesProvider>,
    );
    await act(async () => {
      getByRole('button').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      JSON.stringify([1, 2, 3]),
    );
  });

  it('localStorageの解析に失敗した場合は空配列を返すこと', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-json');
    const { getByTestId } = render(
      <SelectedPrefecturesProvider>
        <TestComponent />
      </SelectedPrefecturesProvider>,
    );

    expect(getByTestId('prefectures').textContent).toBe('[]');
  });

  it('localStorageへの保存に失敗した場合もエラーを投げないこと', async () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    const { getByRole } = render(
      <SelectedPrefecturesProvider>
        <TestComponent />
      </SelectedPrefecturesProvider>,
    );
    await act(async () => {
      getByRole('button').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });
});
