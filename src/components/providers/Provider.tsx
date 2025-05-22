import { SelectedPrefecturesProvider } from '@/contexts/selectedPrefectures/SelectedPrefecturesProvider';
import { SideMenuProvider } from '@/contexts/sideMenu/SideMenuProvider';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ScrollLock } from './ScrollLock';

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SideMenuProvider>
        <ScrollLock />
        <SelectedPrefecturesProvider>
          <Theme>{children}</Theme>
        </SelectedPrefecturesProvider>
      </SideMenuProvider>
    </QueryClientProvider>
  );
};
