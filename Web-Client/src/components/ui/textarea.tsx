import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "lib/utils"

const textareaVariants = cva(
  "w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default: "border-border focus:ring-primary",
        error: "border-destructive focus:ring-destructive",
        subtle: "border-transparent bg-gray-100 focus:ring-primary",
      },
      size: {
        default: "h-24",
        sm: "h-20",
        lg: "h-32",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type TextareaProps = React.ComponentProps<"textarea"> &
  VariantProps<typeof textareaVariants> & {
    asChild?: boolean
  }

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "textarea"
    return (
      <Comp
        ref={ref}
        className={cn(textareaVariants({ variant, size, className }))}
        {...props}
      />
    )
  }
)

Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
