import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSignInMutation } from "../../modules/auth/api/useSignInMutation";
import { AuthLayout } from "../../modules/auth/AuthLayout";
import { SignInForm } from "../../modules/auth/SignInForm";

const SignIn: NextPage = () => {
  const router = useRouter();
  const signIn = useSignInMutation();

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <AuthLayout>
        <div className="w-[28rem]">
          <h1 className=" text-5xl mb-8 font-extrabold text-center">Sign In</h1>
          <SignInForm
            onSubmit={(data) =>
              signIn.mutate(undefined, { onSuccess: () => router.push("/") })
            }
          />
        </div>
      </AuthLayout>
    </>
  );
};

export default SignIn;
