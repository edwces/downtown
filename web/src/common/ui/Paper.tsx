import { DetailedHTMLProps, HTMLAttributes } from "react";
import { cls } from "../utils/cls";

type PaperProps = DetailedHTMLProps<
  HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export const Paper = ({ children, className, ...props }: PaperProps) => {
  return (
    <div
      className={cls("border-[1px] border-gray-400 rounded-lg", className)}
      {...props}
    >
      {children}
    </div>
  );
};
