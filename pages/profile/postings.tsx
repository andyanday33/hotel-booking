import { NextPage } from "next";
import { useSession } from "next-auth/react";
import router from "next/router";
import React, { useState } from "react";
import { HashLoader } from "react-spinners";
import Layout from "../../components/layout/Layout";
import PostingGrid from "../../components/PostingGrid";
import { trpc } from "../../utils/trpc";
import { SearchParamsType } from "../rooms";

type Props = {
  email: string;
};

const Rooms = ({ email }: Props) => {
  const { data: rooms, error } = trpc.useQuery([
    "room.get.getAllRooms",
    { creatorEmail: email },
  ]);
  const [searchParams, setSearchParams] = useState<SearchParamsType>({
    page: 1,
  });
  console.log(rooms);
  return (
    <>
      {rooms && (
        <PostingGrid
          data={rooms}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}{" "}
    </>
  );
};

const Postings: NextPage = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

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
      <h3 className="text-gray-300 text-center text-3xl my-6">My Postings</h3>
      <Rooms email={session.user!.email as string} />
    </Layout>
  );
};

export default Postings;
