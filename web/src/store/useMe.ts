// create store of user info with zustand
// store jwt, user info, and auth functions
// DON'T use any side effect like fetch inside store
import create from 'zustand';

interface MeStoreType {
  token: string | null;
  status: 'signIn' | 'signOut' | 'idle';
  login: (token: string) => void;
  logout: () => void;
}

const useMe = create<MeStoreType>((set) => ({
  token: null,
  status: 'idle',
  login: (token) => {
    set({ status: 'signIn', token });
  },
  logout: () => {
    set({ status: 'signOut', token: null });
  },
}));

export default useMe;
