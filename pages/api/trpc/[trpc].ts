import getAllRooms from "../../../controllers/getAllRooms";
import postNewRoom from "../../../controllers/postNewRoom";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";

const createRouter = () => {
  return trpc.router();
};

const appRouter = createRouter()
  .merge("rooms.", getAllRooms)
  .merge("rooms.", postNewRoom);

// export type definition of API
export type AppRouter = typeof appRouter;

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
