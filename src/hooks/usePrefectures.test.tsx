import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePrefectures } from './usePrefectures';
import { getPrefectures } from '@/api/getPrefectures';
import { REGION_MAP } from '@/lib/constants';

vi.mock('@/api/getPrefectures', () => ({
  getPrefectures: vi.fn(),
}));

describe('usePrefectures', () => {
  const mockPrefectures = [
    { prefCode: 1, prefName: '北海道', region: '北海道' },
    { prefCode: 2, prefName: '青森県', region: '東北' },
  ];

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
    vi.mocked(getPrefectures).mockResolvedValue(mockPrefectures);
  });

  const renderHookWithProvider = () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
    return renderHook(() => usePrefectures(), { wrapper });
  };

  describe('データ取得', () => {
    it('ローディング状態が正しく遷移すること', async () => {
      const { result } = renderHookWithProvider();

      expect(result.current.isLoading).toBe(true);
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
    });

    it('全ての地域グループが含まれていること', async () => {
      const { result } = renderHookWithProvider();
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.data).toHaveLength(REGION_MAP.length);
    });

    it('北海道・東北地域のデータが正しくグループ化されていること', async () => {
      const { result } = renderHookWithProvider();
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      const hokkaidoTohokuRegion = result.current.data?.find(
        (group) => group.region === '北海道・東北',
      );

      expect(hokkaidoTohokuRegion).toEqual({
        region: '北海道・東北',
        prefs: [
          { prefCode: 1, prefName: '北海道', region: '北海道' },
          { prefCode: 2, prefName: '青森県', region: '東北' },
        ],
      });
    });

    it('他の地域は空配列であること', async () => {
      const { result } = renderHookWithProvider();
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });
      const otherRegions = result.current.data?.filter(
        (group) => group.region !== '北海道・東北',
      );

      otherRegions?.forEach((group) => {
        expect(group.prefs).toEqual([]);
      });
    });
  });

  it('エラー時にエラーを返すこと', async () => {
    vi.mocked(getPrefectures).mockRejectedValue(new Error('API Error'));
    const { result } = renderHookWithProvider();
    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeDefined();
  });
});
