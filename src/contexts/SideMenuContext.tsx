import { useEffect, useState } from 'react';
import { SideMenuContext } from './sideMenuContextDefinition';

const LOCAL_STORAGE_KEY = 'sideMenuState';

export const SideMenuProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getInitialState = () => {
    const savedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedState !== null) {
      return savedState === 'true';
    }

    return true;
  };

  const [isSideMenuOpen, setIsSideMenuOpen] = useState(getInitialState);

  const toggleSideMenu = () => {
    setIsSideMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(isSideMenuOpen));
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
