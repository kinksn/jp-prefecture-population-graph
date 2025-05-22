import { cn } from '@/lib/utils';
// import { cva, type VariantProps } from 'class-variance-authority';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(
        'shadow-basic hover:bg-hover rounded-20 border-line-basic cursor-pointer border bg-white p-[10px] transition',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
