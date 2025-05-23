import '@testing-library/jest-dom';

// CSS.supportsのモック
Object.defineProperty(window, 'CSS', {
  value: {
    supports: vi.fn().mockReturnValue(true),
  },
});
