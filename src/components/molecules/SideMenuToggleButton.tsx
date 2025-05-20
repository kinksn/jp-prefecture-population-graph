import { Button } from '@/components/atoms/Button';
import ColumnIcon from '@/components/assets/icons/column.svg?react';

type SideMenuToggleButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isOpen: boolean;
  };

export const SideMenuToggleButton = ({
  isOpen = false,
  ...props
}: SideMenuToggleButtonProps) => {
  return (
    <Button {...props}>
      <ColumnIcon
        className={`size-6 ${isOpen ? 'text-primary' : 'text-inactive'}`}
      />
    </Button>
  );
};
