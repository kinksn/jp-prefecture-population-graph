// src/components/organisms/__tests__/SideMenu.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { SideMenu } from './SideMenu';
import { useSideMenu } from '@/hooks/useSideMenu';

// useSideMenuフックのモック
vi.mock('@/hooks/useSideMenu', () => ({
  useSideMenu: vi.fn(),
}));

// ContentBaseのモック
vi.mock('@/components/templates/ContentBase', () => ({
  ContentBase: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="content-base" className={className}>
      {children}
    </div>
  ),
}));

describe('SideMenu', () => {
  const mockToggleSideMenu = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('サイドメニューが閉じている場合は何も表示されないこと', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: mockToggleSideMenu,
    });
    const { container } = render(
      <SideMenu headerLabel="メニュー">コンテンツ</SideMenu>,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('サイドメニューが開いている場合は表示されること', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });
    render(<SideMenu headerLabel="メニュー">コンテンツ</SideMenu>);

    expect(screen.getByText('メニュー')).toBeInTheDocument();
    expect(screen.getByText('コンテンツ')).toBeInTheDocument();
  });

  it('オーバーレイをクリックするとサイドメニューが閉じること', async () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });
    const { rerender } = render(
      <SideMenu headerLabel="メニュー">コンテンツ</SideMenu>,
    );

    expect(screen.getByText('メニュー')).toBeInTheDocument();

    const overlay = screen.getByText('', { selector: 'span.bg-overlay' });
    await userEvent.click(overlay);

    expect(mockToggleSideMenu).toHaveBeenCalledTimes(1);

    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: mockToggleSideMenu,
    });
    rerender(<SideMenu headerLabel="メニュー">コンテンツ</SideMenu>);

    expect(screen.queryByText('メニュー')).not.toBeInTheDocument();
  });

  it('クラス指定が適用されること', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });
    render(
      <SideMenu headerLabel="メニュー" className="custom-class">
        コンテンツ
      </SideMenu>,
    );

    expect(screen.getByTestId('content-base')).toHaveClass('custom-class');
  });
});
