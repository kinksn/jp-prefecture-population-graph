import { createContext } from 'react';

export type SideMenuContextType = {
  isSideMenuOpen: boolean;
  toggleSideMenu: () => void;
};

export const SideMenuContext = createContext<SideMenuContextType | undefined>(
  undefined,
);
