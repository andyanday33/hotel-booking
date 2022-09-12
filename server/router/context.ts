import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  async function getSessionFromHeader() {
    // TODO: get users from database, make available in context
    if (opts?.req.cookies) {
      const session = await unstable_getServerSession(
        opts.req,
        opts.res,
        authOptions
      );
      return session;
    }
    return null;
  }
  const session = await getSessionFromHeader();

  return {
    session,
  };
}
type Context = trpc.inferAsyncReturnType<typeof createContext>;

// Helper function to create a router with your app's context
export function createRouter() {
  return trpc.router<Context>();
}
