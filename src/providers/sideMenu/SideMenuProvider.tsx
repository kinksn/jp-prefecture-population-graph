import { useEffect, useState } from 'react';
import { SideMenuContext } from './sideMenuContext';

const LOCAL_STORAGE_KEY = 'sideMenuState';

export const SideMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getInitialState = () => {
    try {
      const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedState !== null) {
        return savedState === 'true';
      }
    } catch (error) {
      console.error('Failed to get side menu state from localStorage:', error);
    }

    return false;
  };

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(getInitialState);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, String(isSideMenuOpen));
    } catch (error) {
      console.error('Failed to save side menu state to localStorage:', error);
    }
  }, [isSideMenuOpen]);

  const value = {
    isSideMenuOpen,
    toggleSideMenu,
  };

  return (
    <SideMenuContext.Provider value={value}>
      {children}
    </SideMenuContext.Provider>
  );
};
