import {
  fetchDataSchema,
  updateInfoSchema,
  updateNodesSchema,
} from "@backend/schema/data.schema";
import { createRouter } from "@backend/utils/router";
import { TRPCError } from "@trpc/server";
import { prisma } from "shared/db/client";

export const dataRouter = createRouter()
  .query("fetch", {
    input: fetchDataSchema,
    resolve: async ({ input, ctx }) => {
      const res = await prisma.user.findFirst({
        where: {
          username: input.username,
          version: input.version,
        },
        select: {
          username: true,
          basicInfo: {},
        },
      });
      if (res === null) throw new TRPCError({ code: "NOT_FOUND" });
      return res;
    },
  })
  .mutation("updateNodes", {
    input: updateNodesSchema,
    resolve: async ({ input }) => {
      const isLatestVersion = await prisma.user.findFirst({
        where: {
          username: input.username,
          version: input.version,
        },
      });
      if (!isLatestVersion) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await prisma.basicInfo.update({
        where: {
          username: input.username,
        },
        data: {
          nodes: {
            set: input.nodes,
          },
        },
      });
    },
  })
  .mutation("updateInfo", {
    input: updateInfoSchema,
    resolve: async ({ input }) => {
      const isLatestVersion = await prisma.user.findFirst({
        where: {
          username: input.username,
          version: input.version,
        },
      });
      if (!isLatestVersion) throw new TRPCError({ code: "UNAUTHORIZED" });
      return await prisma.basicInfo.update({
        where: {
          username: input.username,
        },
        data: {
          description: {
            set: input.description,
          },
          title: {
            set: input.title,
          },
          imageURL: {
            set: input.imageURL,
          },
        },
      });
    },
  });
