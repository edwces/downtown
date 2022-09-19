import { useRouter } from "next/router";
import { Button } from "../../common/ui/Button";
import { useSignOutMutation } from "../auth/api/useSignOutMutation";

export const AuthenticatedAccountPopover = () => {
  const router = useRouter();
  const signOut = useSignOutMutation();

  return (
    <Button
      variant="outline"
      onClick={() =>
        signOut.mutate(undefined, { onSuccess: () => router.push("/") })
      }
    >
      Sign out
    </Button>
  );
};
