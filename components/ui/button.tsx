import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold transition-all duration-300 bg-glass shadow-lg border border-[var(--glass-border)] text-[var(--gray-900)] px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--uss-primary)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-glass text-[var(--gray-900)] shadow-lg border border-[var(--glass-border)] hover:bg-[var(--glass-bg)] hover:shadow-xl",
        destructive:
          "bg-[var(--uss-error)] text-white shadow-lg border border-[var(--glass-border)] hover:bg-[var(--uss-error)]/90",
        outline:
          "border border-[var(--glass-border)] bg-transparent shadow-lg hover:bg-[var(--glass-bg)] hover:text-[var(--gray-900)]",
        secondary:
          "bg-[var(--uss-secondary)] text-white shadow-lg border border-[var(--glass-border)] hover:bg-[var(--uss-secondary)]/80",
        ghost:
          "bg-transparent hover:bg-[var(--glass-bg)] hover:text-[var(--gray-900)]",
        link: "text-[var(--uss-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3 has-[>svg]:px-5",
        sm: "h-8 rounded-lg gap-1.5 px-4 py-2 has-[>svg]:px-3",
        lg: "h-12 rounded-2xl px-8 py-4 has-[>svg]:px-6",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
