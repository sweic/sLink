import argon2 from "argon2";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { signOut } from "next-auth/react";
import { prisma } from "shared/db/client";
import { v4 as uuidv4 } from "uuid";
dotenv.config();
export default NextAuth({
  logger: {
    error(code, metadata) {
      signOut({ callbackUrl: "/" });
    },
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials, req) => {
        const findUser = await prisma.user.findFirst({
          where: {
            username: credentials?.username,
          },
        });

        if (!findUser) return null;
        if (await argon2.verify(findUser.password, credentials?.password!)) {
          return {
            username: credentials?.username,
            version: findUser.version,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      try {
        if (user && account) {
          return {
            ...token,
            accessToken: generateToken(),
            refreshToken: generateToken(),
            accessTokenExpires: Date.now() + 1000 * 60 * 30,
            refreshTokenExpires: Date.now() + 1000 * 60 * 60 * 24 * 30,
            user,
          };
        }
        if (Date.now() < token.accessTokenExpires) return token;
        if (Date.now() > token.refreshTokenExpires) {
          signOut({ callbackUrl: "/" });
          return {
            ...token,
            error: true,
          };
        }
        return updateToken(token.user.username, token);
      } catch {
        signOut({ callbackUrl: "/" });
        return {
          ...token,
          error: true,
        };
      }
    },
    session: async ({ session, token }) => {
      try {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.username = token.user.username;
        session.error = token.error;
        session.version = token.user.version;
        return session;
      } catch {
        signOut({ callbackUrl: "/" });
        return session;
      }
    },
  },
  secret: process.env.JWT_SECRET,
});

const updateToken = async (username: string, token: JWT): Promise<JWT> => {
  try {
    const currentUser = await prisma.user.update({
      where: {
        username,
      },
      data: {
        version: {
          increment: 1,
        },
      },
    });
    if (!currentUser)
      return {
        ...token,
        error: true,
      };
    return {
      ...token,
      accessToken: generateToken(),
      refreshToken: generateToken(),
      accessTokenExpires: Date.now() + 1000 * 60 * 30,
      refreshTokenExpires: Date.now() + 1000 * 60 * 60 * 24 * 30,
      user: {
        ...token.user,
        version: currentUser.version,
      },
    };
  } catch {
    return {
      ...token,
      version: token.user.version + 1,
    };
  }
};

const generateToken = () => {
  return jwt.sign(uuidv4(), process.env.JWT_SECRET as jwt.Secret);
};
