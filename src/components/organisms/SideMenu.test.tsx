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

  it('サイドメニューが閉じている場合は何も表示されない', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: mockToggleSideMenu,
    });

    const { container } = render(
      <SideMenu headerLabel="テストメニュー">コンテンツ</SideMenu>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('サイドメニューが開いている場合は正しく表示される', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(<SideMenu headerLabel="テストメニュー">コンテンツ</SideMenu>);
    expect(screen.getByText('テストメニュー')).toBeInTheDocument();
    expect(screen.getByText('コンテンツ')).toBeInTheDocument();
  });

  it('オーバーレイをクリックするとtoggleSideMenuが呼ばれる', async () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(<SideMenu headerLabel="テストメニュー">コンテンツ</SideMenu>);
    const overlay = screen.getByText('', { selector: 'span.bg-overlay' });
    await userEvent.click(overlay);
    expect(mockToggleSideMenu).toHaveBeenCalledTimes(1);
  });

  it('カスタムクラスが適用される', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: mockToggleSideMenu,
    });

    render(
      <SideMenu headerLabel="テストメニュー" className="custom-class">
        コンテンツ
      </SideMenu>,
    );
    expect(screen.getByTestId('content-base')).toHaveClass('custom-class');
  });
});
