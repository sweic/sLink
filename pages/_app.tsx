import { AppRouter } from "@backend/utils/router";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { withTRPC } from "@trpc/next";
import { NextPage } from "next";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode } from "react";
import { AuthProvider } from "shared/state/auth.reducer";
import { DataProvider } from "shared/state/data.reducer";
import "../styles/fontStyles.css";
import GlobalStyles from "../styles/GlobalStyles";
export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <SessionProvider session={session} refetchOnWindowFocus={false}>
      <MantineProvider
        theme={{
          radius: {
            xl: 48,
          },
          primaryColor: "pink",
        }}
      >
        <NotificationsProvider>
          <GlobalStyles />
          <AuthProvider>
            <DataProvider>
              {getLayout(<Component {...pageProps} />)}
            </DataProvider>
          </AuthProvider>
        </NotificationsProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
function getBaseUrl() {
  if (process.browser) return "";
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

  return `http://localhost:${process.env.PORT ?? 3000}`;
}
export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = `${getBaseUrl()}/api/trpc`;
    return {
      url,
    };
  },
  ssr: true,
})(MyApp);
