import { createRouter } from "./context";
import { getRoomsRouter } from "./getRooms";
import { postRoomsRouter } from "./protected/postRooms";

export const appRouter = createRouter()
  .merge("room.get.", getRoomsRouter)
  .merge("room.post.", postRoomsRouter);

export type AppRouter = typeof appRouter;
