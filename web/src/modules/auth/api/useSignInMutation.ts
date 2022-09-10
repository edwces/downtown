import { useMutation } from "react-query";
import { http } from "../../../config/http.config";
import { SignInRequestDTO } from "../request.schemas";

const signIn = (data: SignInRequestDTO) => {
  return http.post("auth/sign-in", data).then((response) => response.data);
};

export const useSignInMutation = () => {
  return useMutation((data: SignInRequestDTO) => signIn(data));
};
