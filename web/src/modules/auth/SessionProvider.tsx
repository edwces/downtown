import { ReactNode, useEffect } from "react";
import { http } from "../../config/http.config";
import { SignInResponseDTO } from "./response/sign-in.response.dto";
import { useSession } from "./store/useSession";

interface SessionProviderProps {
  children: ReactNode;
}

const refreshToken = ({ signal }: { signal?: AbortSignal }) => {
  return http
    .post<SignInResponseDTO>("/auth/refresh", undefined, {
      signal,
      withCredentials: true,
    })
    .then((response) => response.data);
};

export function SessionProvider({ children }: SessionProviderProps) {
  const { setSignedIn, setSignedOut } = useSession();

  useEffect(() => {
    const controller = new AbortController();

    refreshToken({ signal: controller.signal })
      .then((data) => {
        console.log("Signed");

        setSignedIn(data.customer, data.token);
      })
      .catch((error) => {
        if (error.response) {
          console.log("NOT signed");

          setSignedOut();
        }
      });

    return () => controller.abort();
  }, [setSignedIn, setSignedOut]);

  return <>{children}</>;
}
