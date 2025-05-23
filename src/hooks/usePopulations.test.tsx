import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePopulations } from './usePopulations';
import { getPopulation } from '@/api/getPopulation';

vi.mock('@/api/getPopulation', () => ({
  getPopulation: vi.fn(),
}));

describe('usePopulations', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it('複数の都道府県のデータを取得できること', async () => {
    const mockPopulations = [
      {
        prefCode: 1,
        data: [
          {
            label: '総人口',
            data: [
              { year: 2020, value: 1000 },
              { year: 2021, value: 1100 },
            ],
          },
        ],
      },
      {
        prefCode: 2,
        data: [
          {
            label: '総人口',
            data: [
              { year: 2020, value: 2000 },
              { year: 2021, value: 2100 },
            ],
          },
        ],
      },
    ];
    vi.mocked(getPopulation).mockImplementation((prefCode) => {
      const data =
        mockPopulations.find((p) => p.prefCode === prefCode)?.data ?? [];
      return Promise.resolve(data);
    });
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => usePopulations([1, 2]), { wrapper });
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.data).toHaveLength(2);
    expect(result.current.data[0]).toEqual(mockPopulations[0].data);
    expect(result.current.data[1]).toEqual(mockPopulations[1].data);
  });

  it('選択された都道府県がない場合は空配列を返すこと', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    const { result } = renderHook(() => usePopulations([]), { wrapper });

    expect(result.current.data).toEqual([]);
    expect(result.current.isLoading).toBe(false);
  });
});
