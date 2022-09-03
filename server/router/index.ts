import { createRouter } from "./context";
import { roomRouter } from "./rooms";

export const appRouter = createRouter().merge("room.", roomRouter);

export type AppRouter = typeof appRouter;
