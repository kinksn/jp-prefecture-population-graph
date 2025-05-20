import { cn } from '@/lib/utils';
import { ContentBase } from '@/components/templates/ContentBase';

export const SIDEMENU_WIDTH = 348;

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
  return (
    <aside>
      <ContentBase
        className={cn('h-full rounded-r-none px-5 py-8 transition', className)}
        style={{ width: `${SIDEMENU_WIDTH}px` }}
      >
        <h3 className="mb-5 flex h-11 items-center leading-none">
          {headerLabel}
        </h3>
        {children}
      </ContentBase>
    </aside>
  );
};
