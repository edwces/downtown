import { useMutation } from "react-query";
import { http } from "../../../config/http.config";
import { SignUpRequestDTO } from "../request.schemas";

const signUp = (data: SignUpRequestDTO) => {
  return http.post<void>("auth/sign-up", data);
};

export const useSignUpMutation = () => {
  return useMutation((data: SignUpRequestDTO) => signUp(data));
};
