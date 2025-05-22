import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SegmentedControl } from '@/components/atoms/SegmentedControl';
import '@testing-library/jest-dom';

describe('SegmentedControl', () => {
  const options = ['オプション1', 'オプション2', 'オプション3'];
  const defaultProps = {
    options,
    value: 'オプション1' as const,
    onChange: vi.fn(),
  };

  it('全てのオプションが表示される', () => {
    render(<SegmentedControl {...defaultProps} />);
    options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it('選択されたオプションが正しく表示される', () => {
    render(<SegmentedControl {...defaultProps} value="オプション2" />);
    const selectedOption = screen.getByText('オプション2').closest('label');
    expect(selectedOption).toHaveClass('bg-content-base', 'shadow-content');
  });

  it('オプションをクリックするとonChangeが呼ばれる', async () => {
    const onChange = vi.fn();
    render(<SegmentedControl {...defaultProps} onChange={onChange} />);
    await userEvent.click(screen.getByText('オプション2'));
    expect(onChange).toHaveBeenCalledWith('オプション2');
  });

  it('選択されていないオプションにホバー時のスタイルが適用される', () => {
    render(<SegmentedControl {...defaultProps} />);
    const unselectedOption = screen.getByText('オプション2').closest('label');
    expect(unselectedOption).toHaveClass('text-paragraph-weak');
  });
});
