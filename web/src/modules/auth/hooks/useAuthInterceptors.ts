import { AxiosError, AxiosRequestConfig } from "axios";
import { useRouter } from "next/router";
import { useLayoutEffect } from "react";
import { http } from "../../../config/http.config";
import { useSignOutMutation } from "../api/useSignOutMutation";
import { useSession } from "../store/useSession";

export const useAuthInterceptors = () => {
  const router = useRouter();
  const token = useSession((state) => state.token);
  const signOut = useSignOutMutation();

  const attachAuthHeader = async (config: AxiosRequestConfig) => {
    config.headers!.Authorization = `Bearer ${token}`;
    return config;
  };

  // TODO: Refresh token
  const signOutOnError = async (error: AxiosError) => {
    if (error.response) {
      const statusCode = error.response?.status;
      const requestUrl = error.config.url;

      // if Refresh Token is invalid
      // Logout and redirect to signIn screen
      if (statusCode === 401 && !requestUrl!.includes("/auth")) {
        signOut.mutate(undefined, {
          onSuccess: () => router.push("/account/sign-in"),
        });
      }
    }
    return Promise.reject(error);
  };

  useLayoutEffect(() => {
    const requestId = http.interceptors.request.use(attachAuthHeader);
    const responseId = http.interceptors.response.use(
      (response) => response,
      signOutOnError
    );

    return () => {
      http.interceptors.request.eject(requestId);
      http.interceptors.response.eject(responseId);
    };
  }, [token]);
};
