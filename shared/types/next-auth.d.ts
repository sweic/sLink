import NextAuth, { Session } from "next-auth";
import { JWT } from "next-auth/jwt";
interface Token {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  refreshTokenExpires: number;
  error?: boolean;
}
declare module "next-auth/jwt" {
  interface JWT {
    user: {
      name: string | null | undefined;
      email: string | null | undefined;
      image: string | null | undefined;
      version: number;
      username: string;
    };
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    refreshTokenExpires: number;
    error?: boolean;
  }
}

declare module "next-auth" {
  interface Session {
    accessToken: string;
    username: string;
    error?: boolean;
    version: number;
  }

  interface User {
    name: string;
    email: string | null | undefined;
    image: string | null | undefined;
    version: number;
    username: string;
  }
}
