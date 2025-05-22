// src/components/molecules/__tests__/SideMenuToggleButton.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SideMenuToggleButton } from '@/components/molecules/SideMenuToggleButton';
import { useSideMenu } from '@/hooks/useSideMenu';

// SVG画像のモック
vi.mock('@/components/assets/icons/column.svg?react', () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="column-icon" className={className} />
  ),
}));

// useSideMenuフックのモック
vi.mock('@/hooks/useSideMenu', () => ({
  useSideMenu: vi.fn(),
}));

describe('SideMenuToggleButton', () => {
  const mockToggleSideMenu = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('サイドメニューが閉じている状態で正しく表示される', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(<SideMenuToggleButton />);
    const icon = screen.getByTestId('column-icon');
    expect(icon).toHaveClass('text-inactive');
  });

  it('サイドメニューが開いている状態で正しく表示される', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(<SideMenuToggleButton />);
    const icon = screen.getByTestId('column-icon');
    expect(icon).toHaveClass('text-primary');
  });

  it('クリック時にtoggleSideMenuが呼ばれる', async () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(<SideMenuToggleButton />);
    await userEvent.click(screen.getByRole('button'));
    expect(mockToggleSideMenu).toHaveBeenCalledTimes(1);
  });

  it('カスタムクラスが適用される', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(<SideMenuToggleButton className="custom-class" />);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });
});
