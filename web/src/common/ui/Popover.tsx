import { useFloating, autoUpdate } from "@floating-ui/react-dom";
import { ReactNode, cloneElement, ReactElement } from "react";
import { cls } from "../utils/cls";

interface PopoverProps {
  target: ReactElement;
  children?: ReactNode;
  isOpen?: boolean;
}

export const Popover = ({ target, children, isOpen = true }: PopoverProps) => {
  const { x, y, floating, reference, strategy } = useFloating({
    whileElementsMounted: autoUpdate,
  });

  return (
    <>
      {cloneElement(target, { ref: reference })}
      {isOpen && (
        <div
          ref={floating}
          className={cls("p-5 shadow-xl")}
          style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
        >
          {children}
        </div>
      )}
    </>
  );
};
