import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: 'bg-[#572D15] text-[#FCF8EF] hover:bg-[#2B160C]',
        destructive:
          'bg-[#AA2D25] text-[#FCF8EF] hover:bg-[#AA2D25]/90 focus-visible:ring-[#AA2D25]/20 dark:focus-visible:ring-[#AA2D25]/40 dark:bg-[#AA2D25]/60',
        outline:
          'border border-[#C8982C] bg-[#FCF8EF] shadow-xs hover:bg-[#EABC3D] hover:text-[#572D15] dark:bg-[#2B160C]/30 dark:border-[#C8982C] dark:hover:bg-[#EABC3D]/50',
        secondary:
          'bg-[#EABC3D] text-[#572D15] hover:bg-[#C8982C]',
        ghost:
          'hover:bg-[#EABC3D] hover:text-[#572D15] dark:hover:bg-[#EABC3D]/50',
        link: 'text-[#572D15] underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
