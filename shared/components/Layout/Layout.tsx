import Head from "next/head";
import React from "react";

function Layout({
  children,
  title,
}: {
  children: JSX.Element;
  title: React.ReactNode;
}) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </>
  );
}

export default Layout;
