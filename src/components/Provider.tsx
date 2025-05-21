import { SideMenuProvider } from '@/contexts/SideMenuContext';
import { Theme } from '@radix-ui/themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SideMenuProvider>
        <Theme>{children}</Theme>
      </SideMenuProvider>
    </QueryClientProvider>
  );
};
