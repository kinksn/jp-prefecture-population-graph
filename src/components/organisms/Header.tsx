import { SideMenuToggleButton } from '@/components/molecules/SideMenuToggleButton';
import { cn } from '@/lib/utils';

type HeaderProps = {
  className?: string;
};

export const Header = ({ className }: HeaderProps) => {
  return (
    <header
      className={cn('flex h-[var(--header-height)] items-center', className)}
    >
      <h1 className="text-heading text-[28px] leading-none font-bold">
        日本の人口推移
      </h1>
      <SideMenuToggleButton className="fixed top-8 right-5 z-10" />
    </header>
  );
};
