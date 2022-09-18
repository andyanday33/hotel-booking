import { GetStaticPropsContext } from "next";
import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import React from "react";
import Layout from "../../../components/layout/Layout";
import RoomForm from "../../../components/RoomForm";
import { trpc } from "../../../utils/trpc";

type PageProps = {
  id: string | undefined | null;
};

type RoomProps = {
  id: number;
  router?: NextRouter;
};

const RoomProvider = ({ id, router }: RoomProps) => {
  const { data: room, error } = trpc.useQuery([
    "room.get.getSingleRoom",
    { id },
  ]);
  const mutation = trpc.useMutation(["room.post.updateRoom"]);

  if (!room) return <div className="text-white">loading</div>;
  if (error) return <div className="text-white">error</div>;
  return (
    <RoomForm
      id={id}
      mutation={mutation}
      initialValues={room}
      router={router}
    />
  );
};

const Edit = ({ id }: PageProps) => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/auth/signin");
    },
  });

  //TODO: check whether the user is the creator of the room

  return (
    <Layout>
      <h1 className="text-gray-300 text-3xl m-5 text-center">
        Edit Room Details
      </h1>
      {id && <RoomProvider router={router} id={+id} />}
    </Layout>
  );
};

export async function getServerSideProps(context: GetStaticPropsContext) {
  return {
    props: {
      id: context.params?.id,
    }, // will be passed to the page component as props
  };
}

export default Edit;
