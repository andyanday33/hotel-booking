import React, { CSSProperties, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import { HashLoader } from "react-spinners";

type Props = {};

type ButtonProps = {
  providerText: string;
  provider: string;
};

const ButtonWithLoadingState: React.FC<ButtonProps> = ({
  providerText,
  provider,
}) => {
  const [loading, setLoading] = useState(false);
  return (
    <button
      className={`btn btn-gray-700 ${loading && "loading"}`}
      onClick={() => {
        setLoading(true);
        signIn(provider);
      }}
    >
      Sign in with {providerText}
    </button>
  );
};

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
          <ButtonWithLoadingState providerText="GitHub" provider="github" />
        </section>
      </div>
    </Layout>
  );
};

export default Signin;
