import { useContext } from 'react';
import {
  SideMenuContext,
  SideMenuContextType,
} from '@/providers/sideMenu/sideMenuContext';

export const useSideMenu = (): SideMenuContextType => {
  const context = useContext(SideMenuContext);
  if (context === undefined) {
    throw new Error('useSideMenu must be used within a SideMenuProvider');
  }
  return context;
};
