import next, { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Layout from "../../components/layout/Layout";
import PostingCard from "../../components/PostingCard";
import {
  Dispatch,
  FormEventHandler,
  HTMLInputTypeAttribute,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import Modal from "../../components/Modal";
import TagInput from "../../components/TagInput";
import { Tag } from "react-tag-input";

type PaginationProps = {
  roomCount: number;
  roomsPerPage: number;
  page: number;
  setPage: Dispatch<SetStateAction<SearchParamsType>>;
  className: string;
};

const Pagination: React.FC<PaginationProps> = ({
  roomCount,
  roomsPerPage,
  page = 1,
  setPage,
  className,
}) => {
  const handlePrevPage = useCallback(() => {
    setPage((prev) => {
      return { ...prev, page: page - 1 };
    });
  }, []);
  const handleNextPage = useCallback(() => {
    setPage((prev) => {
      return { ...prev, page: page + 1 };
    });
  }, []);
  const nextPageExists = roomCount - roomsPerPage * page > 0;
  return (
    <div className={`btn-group ${className}`}>
      <button
        className="btn btn-outline btn-secondary"
        onClick={handlePrevPage}
        disabled={page <= 1}
      >
        «
      </button>
      <button className="btn btn-secondary">{page}</button>
      <button
        className="btn btn-outline btn-secondary"
        onClick={handleNextPage}
        disabled={!nextPageExists}
      >
        »
      </button>
    </div>
  );
};

type InputProps = {
  labelText: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  textAfter?: string;
  id?: string;
};

const InputGroup: React.FC<InputProps> = ({
  labelText,
  type,
  placeholder,
  textAfter,
  id,
}) => (
  <div className="form-control my-2">
    <label className="input-group">
      <span>{labelText}</span>
      <input
        type={type || "text"}
        placeholder={placeholder}
        className="input input-bordered"
        id={id}
      />
      {textAfter && <span>{textAfter}</span>}
    </label>
  </div>
);

type SelectionProps = {
  id?: string;
};

const Selection: React.FC<PropsWithChildren<SelectionProps>> = ({
  children,
  id,
}) => (
  <div className="form-control my-2">
    <div className="input-group">
      <span>Room Category</span>
      <select className="select select-bordered" id={id}>
        {children}
      </select>
    </div>
  </div>
);

type CategoryType = "" | "TWINS" | "KING" | "SINGLE";

type SearchParamsType = {
  name?: string;
  address?: string;
  minPrice?: number;
  maxPrice?: number;
  beds?: number;
  guests?: number;
  rating?: number;
  category?: CategoryType;
  features?: string[];
  page?: number;
};

type AdvancedSearchProps = {
  setSearchParams: Dispatch<SetStateAction<SearchParamsType>>;
};

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ setSearchParams }) => {
  const [tags, setTags] = useState<Tag[]>([]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    // Create search params for querying db
    const features = tags.map((tag) => tag.text);
    const searchParams: SearchParamsType = {
      name: (document.getElementById("name-input") as HTMLInputElement).value,
      address: (document.getElementById("address-input") as HTMLInputElement)
        .value,
      minPrice: +(
        document.getElementById("min-price-input") as HTMLInputElement
      ).value,
      maxPrice: +(
        document.getElementById("max-price-input") as HTMLInputElement
      ).value,
      beds: +(document.getElementById("bed-input") as HTMLInputElement).value,
      guests: +(document.getElementById("guest-input") as HTMLInputElement)
        .value,
      rating: +(document.getElementById("rating-input") as HTMLInputElement)
        .value,
      category: (
        document.getElementById("category-selection") as HTMLSelectElement
      ).value as CategoryType,
      features: features,
    };
    setSearchParams(searchParams);

    // Reset modal state
    (document.getElementById("name-input") as HTMLInputElement).value = "";
    (document.getElementById("address-input") as HTMLInputElement).value = "";
    (document.getElementById("min-price-input") as HTMLInputElement).value = "";
    (document.getElementById("max-price-input") as HTMLInputElement).value = "";
    (document.getElementById("bed-input") as HTMLInputElement).value = "";
    (document.getElementById("guest-input") as HTMLInputElement).value = "";
    (document.getElementById("rating-input") as HTMLInputElement).value = "";
    (document.getElementById("category-selection") as HTMLSelectElement).value =
      "";
    setTags([]);
  };

  return (
    <Modal text="Advanced Search">
      <h3 className="text-xl">Advanced Search</h3>
      <form className="mt-4 grid" onSubmit={handleSubmit}>
        <InputGroup
          labelText="Room Name"
          placeholder="Enter Room Name..."
          id="name-input"
        />
        <InputGroup
          labelText="Address"
          placeholder="Enter Adress..."
          id="address-input"
        />
        <InputGroup
          labelText="Minimum Price"
          placeholder="Enter Price..."
          type="number"
          textAfter="£"
          id="min-price-input"
        />
        <InputGroup
          labelText="Maximum Price"
          placeholder="Enter Price..."
          type="number"
          textAfter="£"
          id="max-price-input"
        />
        <InputGroup
          labelText="Beds"
          placeholder="Enter Number of Beds..."
          type="number"
          id="bed-input"
        />
        <InputGroup
          labelText="Guests"
          placeholder="Enter number of guests..."
          type="number"
          id="guest-input"
        />
        <InputGroup
          labelText="Minimum Rating"
          placeholder="Enter Minimum Rating..."
          type="number"
          id="rating-input"
        />
        <Selection id="category-selection">
          <option value="" defaultChecked>
            Any
          </option>
          <option value="TWINS">Twins</option>
          <option value="KING">King</option>
          <option value="SINGLE">Single</option>
        </Selection>
        <TagInput
          values={[
            "breakfast",
            "internet",
            "air conditioning",
            "room cleaning",
            "pets allowed",
          ]}
          placeholder="Room Features (internet, breakfast, etc.)"
          tags={tags}
          setTags={setTags}
        />
        <button className="w-full">
          <label htmlFor="my-modal-4" className="btn btn-secondary w-full">
            Submit
          </label>
        </button>
      </form>
    </Modal>
  );
};

const Rooms: NextPage = (props) => {
  const [searchParams, setSearchParams] = useState<SearchParamsType>({});
  const { data, error } = trpc.useQuery(["room.getAllRooms", searchParams]);

  return (
    <Layout>
      <h2 className="text-center text-gray-300 xs:text-start my-14 mx-[5%] text-4xl">
        All Stays
      </h2>
      <div className="flex mb-8 flex-col mx-[10%] xs:mx-[5%] xs:flex-row gap-2">
        <input
          type="text"
          placeholder="Search stays..."
          className="input input-bordered input-secondary rounded-lg"
        />
        <button className="btn btn-secondary">Search</button>
        <AdvancedSearch setSearchParams={setSearchParams} />
      </div>

      <section className="mb-16 mx-[10%] grid grid-cols-1 gap-6 xs:mx-[5%] xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* TODO: add a spinner here */}
        {!data && !error && <p>Loading</p>}
        {!data && error && <p>Error: {error.message}</p>}
        {data &&
          data[1].map((room) => <PostingCard key={room.id} room={room} />)}
      </section>
      <div className="flex mb-8">
        {data && (
          <Pagination
            roomCount={data[0]}
            roomsPerPage={5}
            page={searchParams.page || 1}
            setPage={setSearchParams}
            className="mx-auto"
          />
        )}
      </div>
    </Layout>
  );
};

export default Rooms;
