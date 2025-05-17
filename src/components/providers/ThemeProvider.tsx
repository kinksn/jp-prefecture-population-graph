import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return <Theme>{children}</Theme>;
};
