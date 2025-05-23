import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollLock } from './ScrollLock';
import { SideMenuProvider } from '@/components/providers/sideMenu/SideMenuProvider';
import { SelectedPrefecturesProvider } from './selectedPrefectures/SelectedPrefecturesProvider';

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
