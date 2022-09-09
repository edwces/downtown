import { NextPage } from "next";
import Head from "next/head";
import { AuthLayout } from "../../modules/auth/AuthLayout";
import { SignInForm } from "../../modules/auth/SignInForm";

const SignIn: NextPage = () => {
  const handleSubmit = (data: any) => console.log(data);

  return (
    <>
      <Head>
        <title>Sign in</title>
      </Head>
      <AuthLayout>
        <div className="w-[28rem]">
          <h1 className=" text-5xl mb-8 font-extrabold text-center">Sign In</h1>
          <SignInForm onSubmit={handleSubmit} />
        </div>
      </AuthLayout>
    </>
  );
};

export default SignIn;
