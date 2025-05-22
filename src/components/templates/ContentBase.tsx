import { cn } from '@/lib/utils';

type ContentBaseProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const ContentBase = ({
  className,
  children,
  ...props
}: ContentBaseProps) => {
  return (
    <section
      className={cn('bg-content-base shadow-content rounded-20', className)}
      {...props}
    >
      {children}
    </section>
  );
};
