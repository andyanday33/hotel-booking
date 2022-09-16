import React, { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { HashLoader } from "react-spinners";
import ButtonWithLoadingState from "../../components/ButtonWithLoadingState";

type Props = {};

const Signin = (props: Props) => {
  const { data, status } = useSession();
  const router = useRouter();
  console.log(data);

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
    return (
      <Layout>
        <div className="min-w-screen min-h-screen flex">
          <HashLoader color="#fffffff" className="my-auto mx-auto" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-200 flex flex-col mx-[10%] mt-[5%] sm:mx-[25%] md:mx-[30%] xl:mx-[35%] rounded-lg px-8 gap-2 py-4">
        <h2 className="text-center font-bold text-xl">Sign in to Book-it</h2>
        <section className="sign-in align-stretch flex flex-col py-5 gap-4">
          <ButtonWithLoadingState
            text="Sign In with GitHub"
            onClick={() => signIn("github")}
          />
          <ButtonWithLoadingState
            text="Sign In with Discord"
            onClick={() => signIn("discord")}
            className="btn-primary"
          />
        </section>
      </div>
    </Layout>
  );
};

export default Signin;
