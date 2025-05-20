import { cn } from '@/lib/utils';
// import { cva, type VariantProps } from 'class-variance-authority';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const baseStyle =
  'transition shadow-basic bg-white hover:bg-hover p-[10px] rounded-20 border border-line-basic';

export const Button = ({ className, children, ...props }: ButtonProps) => {
  return (
    <button className={cn(baseStyle, className)} {...props}>
      {children}
    </button>
  );
};
