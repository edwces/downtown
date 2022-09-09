import { NextPage } from "next";
import Head from "next/head";
import { AuthLayout } from "../../modules/auth/AuthLayout";
import { SignUpForm } from "../../modules/auth/SignUpForm";

const SignUp: NextPage = () => {
  const handleSubmit = (data: any) => console.log(data);

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <AuthLayout>
        <div className="w-[28rem]">
          <h1 className=" text-5xl mb-8 font-extrabold text-center">Sign Up</h1>
          <SignUpForm onSubmit={handleSubmit} />
        </div>
      </AuthLayout>
    </>
  );
};

export default SignUp;
