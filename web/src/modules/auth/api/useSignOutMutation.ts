import { useMutation } from "react-query";
import { http } from "../../../config/http.config";
import { useSession } from "../store/useSession";

const signOut = () => {
  return http.post<void>("auth/sign-out", undefined, { withCredentials: true });
};

export const useSignOutMutation = () => {
  const setSignedOut = useSession((state) => state.setSignedOut);
  return useMutation(() => signOut(), {
    onSuccess: () => setSignedOut(),
  });
};
