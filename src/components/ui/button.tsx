import { LucideIcon } from 'lucide-react'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import { cn } from '@/utils/cn'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'orange'
  size?: 'sm' | 'md' | 'lg'
  icon?: LucideIcon | any
  iconPosition?: 'left' | 'right'
  children: React.ReactNode
  className?: string
  responsiveIcon?: 1 | 2 
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'ghost',
      size = 'md',
      icon: Icon,
      iconPosition = 'left',
      children,
      className,
      responsiveIcon = 1, 
      ...props
    },
    ref
  ) => {
    const baseStyles = 'inline-flex items-center justify-center gap-1.5 font-medium transition-colors'

    const variants = {
      primary: 'bg-blue-600 text-white rounded-md sketch',
      ghost: 'text-black bg-white simple rounded-md border border-gray-200 drop-shadow-sm',
      orange: 'text-black bg-[#FFCE22] simple rounded-md border-none font-normal text-sm hover:bg-opacity-90'
    }

    const sizes = {
      sm: 'text-xs px-2.5 py-1.5',
      md: 'text-sm px-3 py-2',
      lg: 'text-base px-4 py-2.5'
    }

    const iconSizes = {
      sm: 'h-3 w-3',
      md: 'h-3.5 w-3.5',
      lg: 'h-5 w-5'
    }

    const textVisibilityClass = responsiveIcon === 2 ? 'hidden sm:inline ' : ''

    return (
      <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
      >
      {Icon && iconPosition === 'left' && (
        <Icon className={`${iconSizes[size]} min-h-5`} aria-hidden="true" />
      )}
      <span className={textVisibilityClass}>{children}</span>
      {Icon && iconPosition === 'right' && (
        <Icon className={`${iconSizes[size]} min-h-5`} aria-hidden="true" />
      )}
    </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }