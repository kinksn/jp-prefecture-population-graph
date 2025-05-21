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
  const { isSideMenuOpen } = useSideMenu();

  if (!isSideMenuOpen) return null;

  return (
    <aside>
      <ContentBase
        className={cn(
          `h-full w-[var(--sidemenu-width)] rounded-r-none px-5 py-8`,
          className,
        )}
      >
        <h3 className="mb-5 flex h-11 items-center leading-none">
          {headerLabel}
        </h3>
        {children}
      </ContentBase>
    </aside>
  );
};
