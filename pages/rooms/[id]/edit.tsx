import { GetStaticPropsContext } from "next";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { NextRouter, useRouter } from "next/router";
import React, { useEffect } from "react";
import { HashLoader } from "react-spinners";
import Layout from "../../../components/layout/Layout";
import RoomForm from "../../../components/RoomForm";
import { trpc } from "../../../utils/trpc";

type PageProps = {
  id: string | undefined | null;
};

type RoomProps = {
  id: number;
  router: NextRouter;
  session: Session | null;
};

const RoomProvider = ({ id, router, session }: RoomProps) => {
  const { data: room, error } = trpc.useQuery([
    "room.get.getSingleRoom",
    { id },
  ]);

  // Redirect user if not the creator of the room
  useEffect(() => {
    if (room?.creator?.email !== session?.user?.email) {
      router.push("/");
    }
  }, [room?.creatorId]);

  const mutation = trpc.useMutation(["room.post.updateRoom"]);

  if (!room)
    return (
      <div className="text-white flex justify-center mt-16">
        <HashLoader color="#ffffff" />
      </div>
    );
  if (error) return <div className="text-white">error: {error.message}</div>;
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

  return (
    <Layout>
      <h1 className="text-gray-300 text-3xl m-5 text-center">
        Edit Room Details
      </h1>
      {id && <RoomProvider session={session} router={router} id={+id} />}
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
