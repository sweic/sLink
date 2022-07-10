import * as trpc from "@trpc/server";
import { Context } from "./context";
import { inferProcedureOutput } from "@trpc/server";
import { authRouter } from "../controllers/auth.router";
import { dataRouter } from "@backend/controllers/data.router";
export function createRouter() {
  return trpc.router<Context>();
}

export const appRouter = createRouter()
  .merge("auth.", authRouter)
  .merge("data.", dataRouter);

export type AppRouter = typeof appRouter;
export type TQuery = keyof AppRouter["_def"]["queries"];
export type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter["_def"]["queries"][TRouteKey]
>;
