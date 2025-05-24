import '@testing-library/jest-dom';
import { vi } from 'vitest';

// CSS.supportsのモック
Object.defineProperty(window, 'CSS', {
  value: {
    supports: vi.fn().mockReturnValue(true),
  },
});
