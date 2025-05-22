import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/atoms/Button';
import '@testing-library/jest-dom';

describe('Button', () => {
  it('子要素が正しく表示される', () => {
    render(<Button>テストボタン</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('テストボタン');
  });

  it('クリックイベントが発火する', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>クリック</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('カスタムクラスが適用される', () => {
    render(<Button className="custom-class">ボタン</Button>);
    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('disabled属性が正しく機能する', () => {
    render(<Button disabled>ボタン</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
