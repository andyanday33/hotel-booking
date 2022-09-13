import React from "react";
import { useSession } from "next-auth/react";
import Layout from "../../components/layout/Layout";
import { HashLoader } from "react-spinners";
import router from "next/router";
import Link from "next/link";

type Props = {};

const index = (props: Props) => {
  const { data: session, status } = useSession();
  console.log(session);
  if (status === "loading") {
    <Layout>
      <div className="min-w-screen min-h-screen flex">
        <HashLoader color="#fffffff" className="my-auto mx-auto" />
      </div>
    </Layout>;
  }

  if (status === "unauthenticated") {
    router.push("/auth/signin");
    return (
      <Layout>
        <h1>Not signed in</h1>
        <p>Redirecting...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="profile my-4 py-4 border-2 grid grid-cols-4 border-gray-300 mx-[10%] divide-x">
        <section className="profile-navigation grid content-center">
          <ul className="divide-y divide-gray-300">
            <li className="text-gray-300 flex hover:bg-gray-700 transition-colors duration-500">
              <Link href="/profile">
                <a className="mx-auto py-2">My Profile</a>
              </Link>
            </li>
            <li className="text-gray-300 flex hover:bg-gray-700 transition-colors duration-500">
              <Link href="/profile/postings">
                <a className="mx-auto py-2">My Postings</a>
              </Link>
            </li>
          </ul>
        </section>
        <section className="profile-details col-span-3 grid text-gray-300">
          <h1 className="text-gray-300 text-2xl text-center">Profile</h1>
          {!session && <HashLoader color="#fffffff" className="my-8 mx-auto" />}
          {session && (
            <div className="flex flex-col gap-4 ml-4 my-4">
              <p>User name: {session.user!.name}</p>
              <p>E-mail: {session.user!.email}</p>
            </div>
          )}
        </section>
      </section>
    </Layout>
  );
};

export default index;
