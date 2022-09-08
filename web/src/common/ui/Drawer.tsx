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
  sm: 264,
  md: 296,
  lg: 358,
  xl: 410,
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
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed w-screen left-0 top-0 h-screen bg-black bg-opacity-30 z-10"
              onClick={onClose}
            />
            <motion.div
              initial={{ left: "100vw", top: 0, width: sizeToStyle[size] }}
              animate={{ x: -sizeToStyle[size] }}
              transition={{ ease: "easeIn", duration: 0.5 }}
              exit={{ x: sizeToStyle[size] }}
              className={cls(`fixed p-2 bg-white h-screen max-w-full z-20`)}
            >
              <div className="flex justify-end mb-2">
                <Button onClick={onClose} variant="unstyled">
                  <X />
                </Button>
              </div>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </aside>
  );
};
