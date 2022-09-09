import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSignUpMutation } from "../../modules/auth/api/useSignUpMutation";
import { AuthLayout } from "../../modules/auth/AuthLayout";
import { SignUpForm } from "../../modules/auth/SignUpForm";

const SignUp: NextPage = () => {
  const router = useRouter();
  const signUp = useSignUpMutation();

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AuthLayout>
        <div className="w-[28rem]">
          <h1 className=" text-5xl mb-8 font-extrabold text-center">Sign Up</h1>
          <SignUpForm
            onSubmit={(data) =>
              signUp.mutate(undefined, {
                onSuccess: () => router.push("/account/sign-in"),
              })
            }
          />
        </div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
