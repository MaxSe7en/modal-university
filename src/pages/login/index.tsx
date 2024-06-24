import Login from "@/components/Login/Login";
import React from "react";

type Props = {
  children: React.ReactNode; // Update the type definition for children
};

const LoginPage = ({ children }: Props) => {
  return <Login/>
};

export default LoginPage;
