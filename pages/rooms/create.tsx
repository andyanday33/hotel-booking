import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import { Prisma } from "@prisma/client";
import Layout from "../../components/layout/Layout";

type Props = {};

const Create = (props: Props) => {
  const initialValues: Prisma.RoomCreateInput = {
    name: "",
    description: "",
    address: "",
    guestCapacity: 0,
    numOfBeds: 0,
    category: "SINGLE",
    pricePerNight: 0,
    breakfast: false,
    internet: false,
    petsAllowed: false,
    roomCleaning: false,
    airconditioned: false,
    images: {},
  };
  return (
    <Layout>
      <h1 className="text-white text-center my-8 text-3xl">
        Create new room posting
      </h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        <Form className="border border-gray-500 text-xs sm:text-sm text-white p-8 rounded-xl grid grid-cols-6 items-center mx-[10%] md:mx-[15%] lg:mx-[20%] xl:mx-[25%] gap-4">
          <label htmlFor="name" className="col-span-2 sm:col-span-1">
            Posting title:
          </label>
          <Field
            id="name"
            name="name"
            placeholder="Room Title"
            className="flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-5"
          />

          <label htmlFor="description" className="col-span-2 sm:col-span-1">
            Description:
          </label>
          <Field
            as="textarea"
            id="description"
            name="description"
            placeholder="Description"
            className="flex-1 textarea input-xs sm:input-md text-gray-800 h-32 col-span-4 sm:col-span-5"
          />

          <label htmlFor="address" className="col-span-2 sm:col-span-1">
            Address:
          </label>
          <Field
            id="address"
            name="address"
            placeholder="Address"
            className="flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-5"
          />

          <label htmlFor="guestCapacity" className="col-span-2 sm:col-span-1">
            Guest Capacity:
          </label>
          <Field
            id="guestCapacity"
            type="number"
            name="guestCapacity"
            placeholder="Guest Capacity"
            className="flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-2"
          />
          <label htmlFor="numOfBeds" className="col-span-2 sm:col-span-1">
            Beds:
          </label>
          <Field
            id="numOfBeds"
            type="number"
            name="numOfBeds"
            placeholder="Number of Beds"
            className="flex-1 input input-xs sm:input-md text-gray-800 col-span-4 sm:col-span-2"
          />
          <label htmlFor="pricePerNight" className="col-span-2 sm:col-span-1">
            Price Per Night:
          </label>
          <Field
            id="pricePerNight"
            type="number"
            name="pricePerNight"
            placeholder="Number of Beds"
            className="flex-1 input input-xs sm:input-md text-gray-800 col-span-3 sm:col-span-4"
          />
          <p className="text-xl sm:text-2xl">£</p>
          <label htmlFor="petsAllowed" className="col-span-2 sm:col-span-1">
            Pets Allowed:
          </label>
          <Field
            as="select"
            id="petsAllowed"
            name="petsAllowed"
            className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </Field>
          <label htmlFor="airconditioned" className="col-span-2 sm:col-span-1">
            Air Conditioning:
          </label>
          <Field
            as="select"
            id="airconditioned"
            name="airconditioned"
            className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
          >
            <option value="true">Exists</option>
            <option value="false">Doesn't Exist</option>
          </Field>
          <label htmlFor="breakfast" className="col-span-2 sm:col-span-1">
            Breakfast:
          </label>
          <Field
            as="select"
            id="breakfast"
            name="breakfast"
            className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
          >
            <option value="true">Exists</option>
            <option value="false">Doesn't Exist</option>
          </Field>
          <label htmlFor="roomCleaning" className="col-span-2 sm:col-span-1">
            Room Cleaning:
          </label>
          <Field
            as="select"
            id="roomCleaning"
            name="roomCleaning"
            className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
          >
            <option value="true">Exists</option>
            <option value="false">Doesn't Exist</option>
          </Field>
          <label htmlFor="internet" className="col-span-2 sm:col-span-1">
            Internet:
          </label>
          <Field
            as="select"
            id="internet"
            name="internet"
            className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
          >
            <option value="true">Exists</option>
            <option value="false">Doesn't Exist</option>
          </Field>
          <label htmlFor="category" className="col-span-2 sm:col-span-1">
            Bed Category:
          </label>
          <Field
            as="select"
            id="category"
            name="category"
            className="flex-1 select select-xs sm:select-md select-bordered text-gray-800 col-span-4 sm:col-span-2"
          >
            <option value="SINGLE">Single</option>
            <option value="TWINS">Twins</option>
            <option value="KING">King</option>
          </Field>
          <button type="submit" className="btn btn-secondary col-span-6">
            Submit
          </button>
        </Form>
      </Formik>
    </Layout>
  );
};

export default Create;
