import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { trpc } from "../../utils/trpc";
import { string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonWithLoadingState from "../../components/ButtonWithLoadingState";
import { useRouter } from "next/router";
import RoomForm from "../../components/RoomForm";

type Props = {};

const Create = (props: Props) => {
  const mutation = trpc.useMutation(["room.post.postNewRoom"]);
  const router = useRouter();
  return (
    <Layout>
      <h1 className="text-white text-center my-8 text-3xl">
        Create new room posting
      </h1>
      <RoomForm mutation={mutation} router={router} />
    </Layout>
  );
};

export default Create;
