import { Dispatch, SetStateAction, useCallback } from "react";
import { SearchParamsType } from "../pages/rooms";

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
    console.log(page);
    setPage((prev) => {
      return { ...prev, page: prev.page! - 1 };
    });
  }, []);
  const handleNextPage = useCallback(() => {
    setPage((prev) => {
      return { ...prev, page: prev.page ? prev.page + 1 : 2 };
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

export default Pagination;
