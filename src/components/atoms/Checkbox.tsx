import { cn } from '@/lib/utils';
import CheckIcon from '@/components/assets/icons/check.svg?react';

type ButtonProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  isLabelHidden?: boolean;
};

export const Checkbox = ({
  label,
  isLabelHidden = false,
  className,
  checked,
  ...props
}: ButtonProps) => {
  return (
    <label className="flex items-center gap-1 whitespace-nowrap">
      <div className="relative cursor-pointer">
        {checked && (
          <CheckIcon className="pointer-events-none absolute top-1/2 left-1/2 w-3 -translate-x-1/2 -translate-y-1/2 text-white" />
        )}
        <input
          type="checkbox"
          checked={checked}
          aria-checked={checked}
          aria-label={label}
          className={cn(
            'border-line-basic box-border block size-5 appearance-none rounded-lg border bg-white',
            'checked:border-primary checked:bg-primary',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'cursor-pointer',
            `${!checked && 'hover:bg-hover'} transition`,
            className,
          )}
          {...props}
        />
      </div>
      {!isLabelHidden && (
        <span className="cursor-pointer leading-none">{label}</span>
      )}
    </label>
  );
};
