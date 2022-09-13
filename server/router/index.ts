import { createRouter } from "./context";
import { getRoomsRouter } from "./getRooms";

export const appRouter = createRouter().merge("room.", getRoomsRouter);

export type AppRouter = typeof appRouter;
