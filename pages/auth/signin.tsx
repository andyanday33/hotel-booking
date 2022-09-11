import React from "react";
import { signIn, useSession } from "next-auth/react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";

type Props = {};

const Signin = (props: Props) => {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
    return (
      <Layout>
        <h1>Already signed in</h1>
        <p>Redirecting...</p>
      </Layout>
    );
  }

  if (status === "loading") {
    // TODO: Add loading spinner
    return (
      <Layout>
        <h1 className="text-white">Loading...</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-200 flex flex-col mx-[10%] mt-[5%] sm:mx-[25%] md:mx-[30%] xl:mx-[35%] rounded-lg px-8 gap-2 py-4">
        <h2 className="text-center font-bold text-xl">Sign in to Book-it</h2>
        <section className="sign-in align-stretch flex flex-col py-5 gap-4">
          <input
            type="text"
            className="input"
            placeholder="Please enter e-mail..."
          />
          <input
            type="password"
            className="input"
            placeholder="Please enter password"
          />
          <button className="btn btn-primary">Sign in</button>
          <button className="btn btn-outline">Sign Up</button>
          <div className="divider">
            <p>or</p>
          </div>
          <button className="btn btn-gray-700" onClick={() => signIn("github")}>
            Sign in with Github
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default Signin;
