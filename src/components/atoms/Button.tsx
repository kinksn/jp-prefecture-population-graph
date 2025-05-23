import { cn } from '@/lib/utils';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label?: string;
  icon?: React.ReactNode;
};

export const Button = ({ className, label, icon, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'shadow-basic hover:bg-hover rounded-20 border-line-basic flex cursor-pointer items-center gap-1 border bg-white p-[10px] transition',
        className,
      )}
      aria-label={label}
      {...props}
    >
      {icon}
      {label}
    </button>
  );
};
