import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  forwardRef,
  ReactNode,
} from "react";
import { cls } from "../utils/cls";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "outline" | "filled" | "unstyled";
  children?: ReactNode;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "filled", children, className, ...props }, forwardedRef) => {
    return (
      <button
        className={cls(
          "transition ease-in-out duration-150 p-2",
          variant === "filled" &&
            "bg-primary text-white hover:bg-primary-800 active:bg-primary-600",
          variant === "outline" &&
            "border-[1px] border-primary-300 hover:bg-primary-100 active:bg-primary-200",
          className
        )}
        ref={forwardedRef}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
