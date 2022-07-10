import { registerUserSchema } from "@backend/schema/auth.schema";
import { TRPCError } from "@trpc/server";
import argon2 from "argon2";
import { prisma } from "shared/db/client";
import { createRouter } from "../utils/router";
export const authRouter = createRouter()
  .mutation("registerUser", {
    input: registerUserSchema,
    resolve: async ({ input, ctx }) => {
      const { username, password, email } = input;
      const check = await prisma.user.findFirst({
        where: {
          OR: [{ username }, { email }],
        },
      });

      if (check) {
        if (check.username === username)
          throw new TRPCError({ code: "CONFLICT", message: "Username" });
        throw new TRPCError({ code: "CONFLICT", message: "Email" });
      }
      const hash = await argon2.hash(password);
      const res = await prisma.user.create({
        data: {
          username,
          password: hash,
          email,
          version: 0,
          basicInfo: {
            create: {
              username,
              nodes: [],
              title: `@${username}`,
              description: "This is my sLink! Check out my links below!",
              imageURL: "",
            },
          },
        },
      });
      if (!res) throw new TRPCError({ code: "BAD_REQUEST" });
      return res.username;
    },
  })
  .mutation("clear", {
    resolve: async ({ ctx }) => {
      const cookiePrefix =
        process.env.NODE_ENV === "production" ? "__Secure-" : "";
      const expiry = new Date(Date.now());
      const cookies = [
        `${cookiePrefix}next-auth.session-token=; Expires=${expiry}`,
        `${cookiePrefix}next-auth.csrf-token=; Expires=${expiry}`,
      ];
      ctx.res.setHeader("Set-Cookie", cookies);
      return;
    },
  });
