import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/atoms/Button';
import ColumnIcon from '@/components/assets/icons/column.svg?react';
import '@testing-library/jest-dom';

// SVG画像のモック
vi.mock('@/components/assets/icons/column.svg?react', () => ({
  default: ({ className }: { className?: string }) => (
    <div data-testid="column-icon" className={className} />
  ),
}));

describe('Button', () => {
  it('ボタンのラベルが正しく表示されること', () => {
    render(<Button label="ラベル" />);

    expect(screen.getByRole('button')).toHaveTextContent('ラベル');
  });

  it('アイコンが正しく表示されること', () => {
    render(<Button icon={<ColumnIcon />} />);

    expect(screen.getByTestId('column-icon')).toBeInTheDocument();
  });

  it('ラベルとアイコンが正しく表示されること', () => {
    render(<Button icon={<ColumnIcon />} label="ラベル" />);

    expect(screen.getByTestId('column-icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('ラベル');
  });

  it('クリックイベントが発火すること', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick} label="クリック" />);
    await userEvent.click(screen.getByRole('button'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('クラス指定が適用されること', () => {
    render(<Button className="custom-class" label="ボタン" />);

    expect(screen.getByRole('button')).toHaveClass('custom-class');
  });

  it('disabled属性が正しく機能すること', () => {
    render(<Button disabled label="ボタン" />);

    expect(screen.getByRole('button')).toBeDisabled();
  });
});
