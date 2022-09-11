import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

// The app's context - is generated for each incoming request
export async function createContext(opts?: trpcNext.CreateNextContextOptions) {
  // Create your context based on the request object
  // Will be available as `ctx` in all your resolvers

  // This is just an example of something you'd might want to do in your ctx fn
  async function getSessionFromHeader() {
    // const user = await decodeJwtToken(req.headers.authorization.split(' ')[1])
    if (opts?.req.cookies) {
      console.log("req alo", opts?.req.headers);
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
