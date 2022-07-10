import { AppRouter } from "@backend/utils/router";
import { createReactQueryHooks } from "@trpc/react";

export const trpc = createReactQueryHooks<AppRouter>();
