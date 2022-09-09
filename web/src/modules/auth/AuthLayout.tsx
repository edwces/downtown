import { ReactNode } from "react";
import { BrandLogo } from "../main/BrandLogo";

type AuthLayoutProps = { children: ReactNode };

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-5 ">
        <BrandLogo />
      </header>
      <main className="flex flex-grow justify-center items-center">
        {children}
      </main>
    </div>
  );
};
