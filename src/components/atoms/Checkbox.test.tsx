import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/atoms/Checkbox';
import '@testing-library/jest-dom';

describe('Checkbox', () => {
  it('ラベルが正しく表示されること', () => {
    render(<Checkbox label="ラベル" />);

    expect(screen.getByLabelText('ラベル')).toBeInTheDocument();
  });

  it('チェック状態が正しく切り替わること', async () => {
    render(<Checkbox label="ラベル" />);
    const checkbox = screen.getByRole('checkbox');

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('クラス指定が適用されること', () => {
    render(<Checkbox className="custom-class" label="ラベル" />);

    expect(screen.getByRole('checkbox')).toHaveClass('custom-class');
  });

  it('ラベル非表示の設定を有効にした場合、ラベルが非表示になること', () => {
    render(<Checkbox label="非表示ラベル" isLabelHidden />);

    expect(screen.queryByText('非表示ラベル')).not.toBeInTheDocument();
  });
});
