import create from "zustand";

interface CartDrawerState {
  isOpen: boolean;
}

interface CartDrawerActions {
  toggle: () => void;
}

type CartDrawerStore = CartDrawerState & CartDrawerActions;

export const useCartDrawer = create<CartDrawerStore>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ ...state, isOpen: !state.isOpen })),
}));
