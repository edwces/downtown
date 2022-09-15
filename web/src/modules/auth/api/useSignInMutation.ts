import { useMutation } from "react-query";
import { http } from "../../../config/http.config";
import { SignInRequestDTO } from "../request.schemas";
import { SignInResponseDTO } from "../response/sign-in.response.dto";
import { useSession } from "../store/useSession";

const signIn = (data: SignInRequestDTO) => {
  return http
    .post<SignInResponseDTO>("auth/sign-in", data, { withCredentials: true })
    .then((response) => response.data);
};

export const useSignInMutation = () => {
  const setSignedIn = useSession((state) => state.setSignedIn);
  return useMutation((data: SignInRequestDTO) => signIn(data), {
    onSuccess: (data) => setSignedIn(data.customer, data.token),
  });
};
