import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-white text-black shadow-lg shadow-white/10 hover:bg-white/90 hover:-translate-y-0.5 active:translate-y-0",
        outline:
          "border border-white/15 bg-white/5 text-white hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0",
        ghost:
          "text-white/80 hover:text-white hover:bg-white/8 hover:-translate-y-0.5 active:translate-y-0",
        link: "text-white/80 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-10 px-4",
        lg: "h-12 px-7",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn("group", buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        <span className="relative inline-flex items-center justify-center">
          <span className="pointer-events-none absolute -inset-8 -z-10 rounded-[2rem] opacity-0 blur-2xl transition group-hover:opacity-100 bg-[radial-gradient(circle,rgba(255,255,255,.20),transparent_60%)]" />
          {children}
        </span>
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
