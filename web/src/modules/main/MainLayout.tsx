import { ReactNode } from "react";
import { MainFooter } from "./MainFooter";
import { MainHeader } from "./MainHeader";

type MainLayoutProps = { children: ReactNode };

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow p-10">{children}</main>
      <MainFooter />
    </div>
  );
};
