import * as React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-dm-sans font-semibold transition-colors focus:outline-none focus:ring-4 focus:ring-mata-alta/25 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-cerrado-profundo text-buriti-vivo hover:bg-cerrado-profundo/90':
              variant === 'primary',
            'border border-gray-200 bg-white text-cerrado-profundo hover:bg-gray-50':
              variant === 'secondary',
            'bg-[#EAF3DE] text-[#3B6D11] hover:bg-[#EAF3DE]/80': variant === 'ghost',
            'bg-[#FDECEA] text-[#A32D2D] hover:bg-[#FDECEA]/80': variant === 'danger',
            'h-9 px-3 text-sm': size === 'sm',
            'h-11 px-5 text-base': size === 'md',
            'h-14 px-8 text-lg': size === 'lg',
          },
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button };
