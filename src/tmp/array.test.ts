// @vitest-environment node

import { describe, it, expect } from 'vitest';

describe('Array utilities (node env)', () => {
  it('map() で各要素を 2 倍にできる', () => {
    const nums = [1, 2, 3];
    const doubled = nums.map(n => n * 2);
    expect(doubled).toEqual([2, 4, 6]);
  });

  it('reduce() で合計が求まる', () => {
    const sum = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);
    expect(sum).toBe(10);
  });
});
