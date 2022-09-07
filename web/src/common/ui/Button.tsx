import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { cls } from "../utils/cls";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "outline" | "filled";
  children?: ReactNode;
};

export const Button = ({ variant = "filled", children }: ButtonProps) => {
  return (
    <button
      className={cls(
        "transition ease-in-out duration-150 p-2",
        variant === "filled" &&
          "bg-black text-white hover:bg-gray-800 active:bg-gray-600",
        variant === "outline" &&
          "border-[1px] border-gray-400 hover:bg-gray-100 active:bg-gray-200"
      )}
    >
      {children}
    </button>
  );
};
