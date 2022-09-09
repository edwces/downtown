import { DetailedHTMLProps, forwardRef, InputHTMLAttributes } from "react";
import { cls } from "../utils/cls";

type InputProps = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, forwardedRef) => {
    return (
      <input
        ref={forwardedRef}
        className={cls(
          "rounded-xl outline-1 outline outline-primary-400 py-2 px-4 focus:outline-2 focus:outline-primary-800",
          className
        )}
        {...props}
      />
    );
  }
);
