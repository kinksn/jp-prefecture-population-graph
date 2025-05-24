import { useEffect, useRef } from 'react';
import { useSideMenu } from '@/hooks/useSideMenu';

export const ScrollLock = () => {
  const { isSideMenuOpen } = useSideMenu();
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    const isSmallPC = window.matchMedia('(max-width: 1024px)').matches;
    if (isSmallPC) {
      if (isSideMenuOpen) {
        scrollPositionRef.current = window.scrollY;
        document.body.style.position = 'fixed';
        document.body.style.width = '100%';
        document.body.style.top = `-${scrollPositionRef.current}px`;
      } else {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.width = '';
        document.body.style.top = '';
        if (scrollY) {
          window.scrollTo(0, scrollPositionRef.current);
        }
      }
    }
  }, [isSideMenuOpen]);

  return null;
};
