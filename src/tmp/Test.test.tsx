import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
import { Test } from './Test';

// Highcharts 本体を空オブジェクトでモック
vi.mock('highcharts', () => ({ __esModule: true, default: {} }));

// React ラッパーもダミーコンポーネントに置き換え
vi.mock('highcharts-react-official', () => ({
  __esModule: true,
  default: () => <div data-testid="chart" />, 
}));

describe('Test component', () => {
  it('「Click me」ボタンが描画される', () => {
    render(<Test />);
    // ボタンが存在するか確認
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });
});
