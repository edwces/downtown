import { useMutation } from "react-query";

const signUp = () => {
  return Promise.resolve();
};

export const useSignUpMutation = () => {
  return useMutation(() => signUp());
};
