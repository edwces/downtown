import { ReactNode } from "react";
import { X } from "react-feather";
import { cls } from "../utils/cls";
import { Button } from "./Button";
import { AnimatePresence, motion } from "framer-motion";

interface DrawerProps {
  isOpen: boolean;
  onClose?: () => void;
  size?: "sm" | "md" | "lg" | "xl";
  children?: ReactNode;
}

const sizeToStyle = {
  sm: 224,
  md: 256,
  lg: 288,
  xl: 320,
};

export const Drawer = ({
  size = "md",
  isOpen,
  onClose,
  children,
}: DrawerProps) => {
  return (
    <aside>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ left: "100vw", top: 0, width: sizeToStyle[size] }}
            animate={{ x: -sizeToStyle[size] }}
            transition={{ ease: "easeIn", duration: 0.5 }}
            exit={{ x: sizeToStyle[size] }}
            className={cls(`fixed p-2 bg-slate-200 h-screen max-w-full`)}
          >
            <Button
              className="float-right"
              onClick={onClose}
              variant="unstyled"
            >
              <X />
            </Button>
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};
