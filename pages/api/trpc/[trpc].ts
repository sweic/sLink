import * as trpcNext from "@trpc/server/adapters/next";
import { createContext } from "@backend/utils/context";
import { appRouter } from "@backend/utils/router";

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
});
