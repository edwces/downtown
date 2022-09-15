import create from "zustand";
import { Customer } from "../customer.model";

type Nullable<T> = { [K in keyof T]: T | null };

interface SessionStoreState {
  customer: Nullable<Customer> | Customer;
  status: "idle" | "signIn" | "signOut";
  token: string | null;
}

interface SessionStoreActions {
  setSignedIn: (data: Customer, token: string) => void;
  setSignedOut: () => void;
}

export type SessionStore = SessionStoreState & SessionStoreActions;

export const useSession = create<SessionStore>((set) => ({
  customer: {
    id: null,
    email: null,
    name: null,
    surname: null,
  },

  status: "idle",
  token: null,
  setSignedIn: (data, token) =>
    set({ status: "signIn", customer: data, token }),
  setSignedOut: () =>
    set({
      customer: { id: null, email: null, name: null, surname: null },
      status: "signOut",
      token: null,
    }),
}));
