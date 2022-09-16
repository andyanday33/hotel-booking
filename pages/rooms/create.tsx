import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { trpc } from "../../utils/trpc";
import { string } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import ButtonWithLoadingState from "../../components/ButtonWithLoadingState";
import { router } from "next/client";

type Props = {};

type ImageType = {
  url: string;
  publicId: string;
};

type Inputs = {
  name: string;
  description: string;
  address: string;
  guestCapacity: number;
  numOfBeds: number;
  category: "SINGLE" | "TWINS" | "KING";
  pricePerNight: number;
  breakfast: string;
  internet: string;
  petsAllowed: string;
  roomCleaning: string;
  airconditioned: string;
  images: ImageType[];
};

const Create = (props: Props) => {
  const mutation = trpc.useMutation(["room.post.postNewRoom"]);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const newData = {
      ...data,
      breakfast: data.breakfast === "true" ? true : false,
      internet: data.internet === "true" ? true : false,
      petsAllowed: data.petsAllowed === "true" ? true : false,
      roomCleaning: data.roomCleaning === "true" ? true : false,
      airconditioned: data.airconditioned === "true" ? true : false,
      pricePerNight: +data.pricePerNight,
      numOfBeds: +data.numOfBeds,
      guestCapacity: +data.guestCapacity,
      images: [],
    };

    mutation.mutate(newData);
  };

  useEffect(() => {
    if (mutation.data) {
      router.push("/rooms/" + mutation.data.id);
    }
  }, [mutation.data]);

  const errorsExist =
    errors.name ||
    errors.description ||
    errors.address ||
    errors.guestCapacity ||
    errors.numOfBeds ||
    errors.category ||
    errors.pricePerNight;

  return (
    <Layout>
      <h1 className="text-white text-center my-8 text-3xl">
        Create new room posting
      </h1>
      {errorsExist && (
        <p className="text-error text-center mb-4">
          Some of the required fields are missing
        </p>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-500 text-xs sm:text-sm text-white p-8 rounded-xl grid grid-cols-6 items-center mx-[10%] md:mx-[15%] lg:mx-[20%] xl:mx-[25%] gap-4"
      >
        <label htmlFor="name" className="col-span-2 sm:col-span-1">
          Posting title:
        </label>
        <input
          id="name"
          {...register("name", { required: true })}
          placeholder="Room Title"
          className={`flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-5 ${
            errors.name && "input-bordered input-error border-2"
          }`}
        />
        <label htmlFor="description" className="col-span-2 sm:col-span-1">
          Description:
        </label>
        <input
          type="textArea"
          id="description"
          {...register("description", { required: true })}
          placeholder="Description"
          className={`flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-5 ${
            errors.description && "input-bordered input-error border-2"
          }`}
        />
        <label htmlFor="address" className="col-span-2 sm:col-span-1">
          Address:
        </label>
        <input
          id="address"
          {...register("address", { required: true })}
          placeholder="Address"
          className={`flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-5 ${
            errors.address && "input-bordered input-error border-2"
          }`}
        />
        <label htmlFor="guestCapacity" className="col-span-2 sm:col-span-1">
          Guest Capacity:
        </label>
        <input
          id="guestCapacity"
          type="number"
          {...register("guestCapacity", { required: true, min: 0 })}
          placeholder="Guest Capacity"
          className={`flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-2 ${
            errors.guestCapacity && "input-bordered input-error border-2"
          }`}
        />
        <label htmlFor="numOfBeds" className="col-span-2 sm:col-span-1">
          Beds:
        </label>
        <input
          id="numOfBeds"
          type="number"
          {...register("numOfBeds", { required: true, min: 0 })}
          placeholder="Number of Beds"
          className={`flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-2 ${
            errors.numOfBeds && "input-bordered input-error border-2"
          }`}
        />
        <label htmlFor="pricePerNight" className="col-span-2 sm:col-span-1">
          Price Per Night:
        </label>
        <input
          id="pricePerNight"
          type="number"
          {...register("pricePerNight", { required: true, min: 0 })}
          placeholder="Price Per Night"
          className={`flex-1 input input-xs sm:input-md text-gray-800 col-span-3 sm:col-span-4 ${
            errors.pricePerNight && "input-bordered input-error border-2"
          }`}
        />
        <p className="text-xl sm:text-2xl">£</p>
        <label htmlFor="petsAllowed" className="col-span-2 sm:col-span-1">
          Pets Allowed:
        </label>
        <select
          id="petsAllowed"
          {...register("petsAllowed", { required: true })}
          className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <label htmlFor="airconditioned" className="col-span-2 sm:col-span-1">
          Air Conditioning:
        </label>
        <select
          id="airconditioned"
          {...register("airconditioned", { required: true })}
          className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
        >
          <option value="true">Exists</option>
          <option value="false">Doesn't Exist</option>
        </select>
        <label htmlFor="breakfast" className="col-span-2 sm:col-span-1">
          Breakfast:
        </label>
        <select
          id="breakfast"
          {...register("breakfast", { required: true })}
          className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
        >
          <option value="true">Exists</option>
          <option value="false">Doesn't Exist</option>
        </select>
        <label htmlFor="roomCleaning" className="col-span-2 sm:col-span-1">
          Room Cleaning:
        </label>
        <select
          id="roomCleaning"
          {...register("roomCleaning", { required: true })}
          className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
        >
          <option value="true">Exists</option>
          <option value="false">Doesn't Exist</option>
        </select>
        <label htmlFor="internet" className="col-span-2 sm:col-span-1">
          Internet:
        </label>
        <select
          id="internet"
          {...register("internet", { required: true })}
          className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
        >
          <option value="true">Exists</option>
          <option value="false">Doesn't Exist</option>
        </select>
        <label htmlFor="category" className="col-span-2 sm:col-span-1">
          Bed Category:
        </label>
        <select
          id="category"
          {...register("category", { required: true })}
          className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
        >
          <option value="SINGLE">Single</option>
          <option value="TWINS">Twins</option>
          <option value="KING">King</option>
        </select>
        <ButtonWithLoadingState
          text="Submit"
          className="btn btn-secondary col-span-6"
          error={errorsExist}
        ></ButtonWithLoadingState>
      </form>
    </Layout>
  );
};

export default Create;
