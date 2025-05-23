import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, act } from '@testing-library/react';
import { SideMenuProvider } from './SideMenuProvider';
import { useSideMenu } from '@/hooks/useSideMenu';

describe('SideMenuProvider', () => {
  const LOCAL_STORAGE_KEY = 'sideMenuState';
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
    const { isSideMenuOpen, toggleSideMenu } = useSideMenu();
    return (
      <div>
        <div data-testid="menu-state">{String(isSideMenuOpen)}</div>
        <button onClick={toggleSideMenu}>Toggle</button>
      </div>
    );
  };

  it('初期状態がfalseであること', () => {
    mockLocalStorage.getItem.mockReturnValue(null);
    const { getByTestId } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );

    expect(getByTestId('menu-state').textContent).toBe('false');
  });

  it('localStorageから保存された状態を復元できること', () => {
    mockLocalStorage.getItem.mockReturnValue('true');
    const { getByTestId } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );

    expect(getByTestId('menu-state').textContent).toBe('true');
  });

  it('toggleSideMenuで状態が切り替わること', async () => {
    mockLocalStorage.getItem.mockReturnValue('false');
    const { getByTestId, getByRole } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );

    expect(getByTestId('menu-state').textContent).toBe('false');

    await act(async () => {
      getByRole('button').click();
    });

    expect(getByTestId('menu-state').textContent).toBe('true');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      'true',
    );
  });

  it('localStorageへの保存が行われること', async () => {
    mockLocalStorage.getItem.mockReturnValue('false');
    const { getByRole } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );
    await act(async () => {
      getByRole('button').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      LOCAL_STORAGE_KEY,
      'true',
    );
  });

  it('localStorageの値が不正な場合はfalseを返すこと', () => {
    mockLocalStorage.getItem.mockReturnValue('invalid-value');
    const { getByTestId } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );

    expect(getByTestId('menu-state').textContent).toBe('false');
  });

  it('localStorageの取得に失敗した場合はfalseを返すこと', () => {
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    const { getByTestId } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );

    expect(getByTestId('menu-state').textContent).toBe('false');
  });

  it('localStorageへの保存に失敗した場合もエラーを投げないこと', async () => {
    mockLocalStorage.getItem.mockReturnValue('false');
    mockLocalStorage.setItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    const { getByRole } = render(
      <SideMenuProvider>
        <TestComponent />
      </SideMenuProvider>,
    );
    await act(async () => {
      getByRole('button').click();
    });

    expect(mockLocalStorage.setItem).toHaveBeenCalled();
  });
});
