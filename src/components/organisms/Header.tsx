import { SideMenuToggleButton } from '@/components/molecules/SideMenuToggleButton';

export const HEADER_HEIGHT = 108;

export const Header = () => {
  return (
    <header
      className="flex items-center"
      style={{ height: `${HEADER_HEIGHT}px` }}
    >
      <h1 className="text-heading text-[28px] leading-none font-bold">
        日本の人口推移
      </h1>
      <SideMenuToggleButton
        className="fixed top-8 right-5 z-10"
        isOpen={false}
      />
    </header>
  );
};
