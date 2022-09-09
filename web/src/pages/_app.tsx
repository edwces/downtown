import "../styles/globals.css";
import type { AppType } from "next/dist/shared/lib/utils";
import { QueryClientProvider } from "react-query";
import { queryClient } from "../config/react-query.config";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />;
    </QueryClientProvider>
  );
};

export default MyApp;
