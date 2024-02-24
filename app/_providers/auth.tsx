"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

interface IAuthProvider {
  children: ReactNode;
}

const AuthProvider = ({ children }: IAuthProvider) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
