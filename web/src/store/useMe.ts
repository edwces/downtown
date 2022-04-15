// create store of user info with zustand
// store jwt, user info, and auth functions
// DON'T use any side effect like fetch inside store
import create from 'zustand';

export interface UserContext {
  email: string;
  name: string;
  id: number;
}

interface MeStoreType {
  token: string | null;
  status: 'signIn' | 'signOut' | 'idle';
  user: UserContext | null;
  login: (token: string, user: UserContext) => void;
  logout: () => void;
}

const useMe = create<MeStoreType>((set) => ({
  token: null,
  status: 'idle',
  user: null,
  login: (token, user) => {
    set({ status: 'signIn', token, user });
  },
  logout: () => {
    set({ status: 'signOut', token: null });
  },
}));

export default useMe;
