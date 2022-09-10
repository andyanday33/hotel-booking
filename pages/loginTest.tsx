import { useSession, signIn, signOut } from "next-auth/react";
import Layout from "../components/layout/Layout";
export default function Component() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Layout>
          <div className="text-gray-300">
            Signed in as {session.user?.email} <br />
            <button onClick={() => signOut()}>Sign out</button>
          </div>
        </Layout>
      </>
    );
  }
  return (
    <>
      <Layout>
        <div className="text-gray-300">
          Not signed in <br />
          <button onClick={() => signIn()}>Sign in</button>
        </div>
      </Layout>
    </>
  );
}
