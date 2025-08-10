import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transform hover:-translate-y-0.5",
  {
    variants: {
      variant: {
        default:
          "bg-uss-primary text-white shadow-md hover:bg-uss-primary-dark hover:shadow-lg focus-visible:ring-uss-primary/20",
        destructive:
          "bg-uss-error text-white shadow-md hover:bg-red-700 hover:shadow-lg focus-visible:ring-red-500/20",
        outline:
          "border-2 border-uss-primary text-uss-primary hover:bg-uss-primary hover:text-white focus-visible:ring-uss-primary/20",
        secondary:
          "bg-uss-secondary text-white shadow-md hover:bg-uss-secondary-dark hover:shadow-lg focus-visible:ring-uss-secondary/20",
        ghost:
          "text-uss-primary hover:bg-uss-primary/10 focus-visible:ring-uss-primary/20",
        link: "text-uss-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 py-3",
        sm: "h-8 px-3 py-1.5 text-sm",
        lg: "h-12 px-8 py-4 text-lg",
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
