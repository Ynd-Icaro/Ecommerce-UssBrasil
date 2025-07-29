import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border border-[var(--glass-border)] px-3 py-1 text-xs font-semibold w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--uss-primary)] focus-visible:ring-offset-2 transition-all duration-300 bg-glass shadow-md overflow-hidden backdrop-blur-md",
  {
    variants: {
      variant: {
        default:
          "bg-glass text-[var(--gray-900)] border-[var(--glass-border)] shadow-md hover:bg-[var(--glass-bg)] hover:shadow-lg",
        secondary:
          "bg-[var(--uss-secondary)] text-white border-[var(--glass-border)] shadow-md hover:bg-[var(--uss-secondary)]/80",
        destructive:
          "bg-[var(--uss-error)] text-white border-[var(--glass-border)] shadow-md hover:bg-[var(--uss-error)]/90",
        outline:
          "bg-transparent text-[var(--gray-900)] border-[var(--glass-border)] shadow-md hover:bg-[var(--glass-bg)] hover:text-[var(--gray-900)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
