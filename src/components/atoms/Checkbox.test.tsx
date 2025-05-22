import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from '@/components/atoms/Checkbox';
import '@testing-library/jest-dom';

describe('Checkbox', () => {
  it('ラベルが正しく表示される', () => {
    render(<Checkbox label="テストチェックボックス" />);
    expect(screen.getByLabelText('テストチェックボックス')).toBeInTheDocument();
  });

  it('チェック状態が正しく切り替わる', async () => {
    render(<Checkbox label="チェックボックス" />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it('isLabelHiddenがtrueの場合、ラベルが非表示になる', () => {
    render(<Checkbox label="非表示ラベル" isLabelHidden />);
    expect(screen.queryByText('非表示ラベル')).not.toBeInTheDocument();
  });

  it('disabled属性が正しく機能する', () => {
    render(<Checkbox label="無効化チェックボックス" disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });
});
