import React, { FC } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";

interface Props {
  postsPerPage: number;
  totalPosts: number;
  paginate: (message: number) => void;
  nextPage: (event: React.MouseEvent<HTMLElement>) => void;
  previousPage: (event: React.MouseEvent<HTMLElement>) => void;
  currentPage: number;
}

const Paginate: FC<Props> = ({
  postsPerPage,
  totalPosts,
  paginate,
  previousPage,
  nextPage,
  currentPage,
}) => {
  const pageNumbers: any = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className=" mt-12 flex justify-center">
      <ul className="pagination flex gap-x-2 lg:gap-x-6 justify-center items-center">
        <li
          onClick={previousPage}
          className="cursor-pointer flex items-center gap-x-2 lg:gap-x-4 fw-500"
        >
          <RiArrowLeftSLine />
          Prev
        </li>
        <li className="border-2 rounded">
          <ul className="flex gap-x-1 w-auto max-w-[180px] md:w-auto md:max-w-[400px]  lg:max-w-[700px] overflow-x-auto scroll-pro fw-500">
            {pageNumbers.map((number: any) => (
              <li
                key={number}
                onClick={() => paginate(number)}
                className={
                  number === currentPage
                    ? "bg-light px-3 lg:px-5 py-2 rounded cursor-pointer"
                    : "px-3 lg:px-4 py-2 text-gray-400 cursor-pointer"
                }
              >
                {number}
              </li>
            ))}
          </ul>
        </li>
        <li
          onClick={nextPage}
          className="flex gap-x-2 lg:gap-x-4 items-center fw-500 cursor-pointer"
        >
          Next
          <RiArrowRightSLine />
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
