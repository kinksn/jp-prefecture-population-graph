import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollLock } from '@/features/scrollLock/ScrollLock';
import { SideMenuProvider } from '@/providers/sideMenu/SideMenuProvider';
import { SelectedPrefecturesProvider } from '@/providers/selectedPrefectures/SelectedPrefecturesProvider';

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SideMenuProvider>
        <ScrollLock />
        <SelectedPrefecturesProvider>{children}</SelectedPrefecturesProvider>
      </SideMenuProvider>
    </QueryClientProvider>
  );
};
