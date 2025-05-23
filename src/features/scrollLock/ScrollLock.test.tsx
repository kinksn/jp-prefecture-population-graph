import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ScrollLock } from './ScrollLock';
import { useSideMenu } from '@/hooks/useSideMenu';

// useSideMenuフックのモック
vi.mock('@/hooks/useSideMenu', () => ({
  useSideMenu: vi.fn(),
}));

// window.matchMediaのモック
const mockMatchMedia = vi.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

describe('ScrollLock', () => {
  const originalBodyStyle = document.body.style.cssText;
  let scrollY = 0;

  // window.scrollYのモック
  Object.defineProperty(window, 'scrollY', {
    get: () => scrollY,
    configurable: true,
  });

  // window.scrollToのモック
  const originalScrollTo = window.scrollTo;
  window.scrollTo = vi
    .fn()
    .mockImplementation((x: number | ScrollToOptions, y?: number) => {
      if (typeof x === 'number' && typeof y === 'number') {
        scrollY = y;
      }
    });

  beforeEach(() => {
    vi.clearAllMocks();
    scrollY = 0;
    document.body.style.cssText = originalBodyStyle;

    // 小さいPC表示（1024px以下）をモック
    mockMatchMedia.mockReturnValue({
      matches: true,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
  });

  afterAll(() => {
    window.scrollTo = originalScrollTo;
  });

  it('小さいPC表示（1024px以下）でサイドメニューが開いた時にスクロールをロックすること', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: vi.fn(),
    });
    window.scrollTo(0, 100);
    render(<ScrollLock />);

    expect(document.body.style.position).toBe('fixed');
    expect(document.body.style.width).toBe('100%');
    expect(document.body.style.top).toBe('-100px');
  });

  it('小さいPC表示（1024px以下）でサイドメニューが閉じた時にスクロールロックを解除すること', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: vi.fn(),
    });
    window.scrollTo(0, 100);
    const { rerender } = render(<ScrollLock />);
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: false,
      toggleSideMenu: vi.fn(),
    });
    rerender(<ScrollLock />);

    expect(document.body.style.position).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.top).toBe('');
    expect(window.scrollY).toBe(100);
  });

  it('デスクトップ表示ではスクロールロックが適用されないこと', () => {
    // デスクトップ表示をモック
    mockMatchMedia.mockReturnValue({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    });
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: vi.fn(),
    });
    window.scrollTo(0, 100);
    render(<ScrollLock />);

    expect(document.body.style.position).toBe('');
    expect(document.body.style.width).toBe('');
    expect(document.body.style.top).toBe('');
  });

  it('コンポーネントは何もレンダリングしないこと', () => {
    vi.mocked(useSideMenu).mockReturnValue({
      isSideMenuOpen: true,
      toggleSideMenu: vi.fn(),
    });
    const { container } = render(<ScrollLock />);

    expect(container).toBeEmptyDOMElement();
  });
});
