import Login from "@/components/Login/Login";
import React from "react";
import Head from "next/head";  // Import Head from next/head

type Props = {
  children: React.ReactNode;
};

const LoginPage = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Modal University College</title>
      </Head>
      <Login />
    </>
  );
};

export default LoginPage;
