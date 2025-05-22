import { cn } from '@/lib/utils';
import { ContentBase } from '@/components/templates/ContentBase';
import { useSideMenu } from '@/hooks/useSideMenu';

type SideMenuProps = {
  className?: string;
  headerLabel: string;
  children: React.ReactNode;
};

export const SideMenu = ({
  className,
  headerLabel,
  children,
}: SideMenuProps) => {
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();

  if (!isSideMenuOpen) return null;

  return (
    <div className={cn('max-sm:h-full max-sm:w-full', className)}>
      <span
        className="bg-overlay top-o fixed left-0 hidden h-full w-full max-lg:block"
        onClick={toggleSideMenu}
      />
      <ContentBase
        className={cn(
          `grid h-full w-[var(--sidemenu-width)] content-baseline gap-5 rounded-r-none px-5 py-8`,
          className,
        )}
      >
        <h3 className="flex h-11 items-center leading-none">{headerLabel}</h3>
        {children}
      </ContentBase>
    </div>
  );
};
