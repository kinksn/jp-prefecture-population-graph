import { Button } from '@/components/atoms/Button';
import ColumnIcon from '@/components/assets/icons/column.svg?react';
import { useSideMenu } from '@/hooks/useSideMenu';

type SideMenuToggleButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const SideMenuToggleButton = ({
  ...props
}: SideMenuToggleButtonProps) => {
  const { isSideMenuOpen, toggleSideMenu } = useSideMenu();

  return (
    <Button
      onClick={toggleSideMenu}
      icon={
        <ColumnIcon
          className={`size-6 ${isSideMenuOpen ? 'text-primary' : 'text-inactive'}`}
        />
      }
      {...props}
    />
  );
};
