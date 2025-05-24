import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useSideMenu } from './useSideMenu';
import { SideMenuContext } from '@/providers/sideMenu/sideMenuContext';

describe('useSideMenu', () => {
  it('React Contextから正しい値を取得できること', () => {
    const mockContext = {
      isSideMenuOpen: true,
      toggleSideMenu: vi.fn(),
    };
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <SideMenuContext.Provider value={mockContext}>
        {children}
      </SideMenuContext.Provider>
    );
    const { result } = renderHook(() => useSideMenu(), { wrapper });

    expect(result.current.isSideMenuOpen).toBe(true);
    expect(result.current.toggleSideMenu).toBeDefined();
  });

  it('React Contextが存在しない場合はエラーを投げること', () => {
    expect(() => {
      renderHook(() => useSideMenu());
    }).toThrow('useSideMenu must be used within a SideMenuProvider');
  });
});
