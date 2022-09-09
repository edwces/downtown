import { useMutation } from "react-query";

const signIn = () => {
  return Promise.resolve();
};

export const useSignInMutation = () => {
  return useMutation(() => signIn());
};
