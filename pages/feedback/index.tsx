import React, { useEffect, useState } from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import { useGetFeedQuery } from "@/services/api/routineSlice";
import Initials from "@/shared/utils/initials";
import { formatRating } from "@/shared/utils/format";
import { FeedbackItem } from "@/shared/types/routine";
import dayjs from "dayjs";
import Paginate from "@/shared/components/UI/Paginate";

const FeedbackPage: AppPage = () => {
  const { data:feeds } = useGetFeedQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(8);
  const [data, setData] = useState<FeedbackItem[] | any>();
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = data?.slice(indexOfFirstPost, indexOfLastPost);
  useEffect(() => {
    setData(feeds?.feedbacks)
  }, [feeds])
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({
      top: 10,
      behavior: "smooth",
    });
  };
  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(data?.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <>
      <div>
        <p className="text-xl fw-600">User Feedback / Complaints</p>
        <div className="mt-8 bg-white p-6">
          <div className="flex justify-between fw-600">
            <p className="lg:w-4/12 pl-3 lg:text-lg">User</p>
            <p className="lg:w-5/12 pl-3 lg:text-lg">Feedback</p>
            <p className="lg:w-3/12 pl-3 lg:text-lg">Rating</p>
          </div>
          
          {
            data && !!data.length && currentPosts.map((item:FeedbackItem, index:number) => (
                <div className="mt-7 relative flex justify-between w-full border-b-2 pb-2" key={index}>
            <div className="flex gap-x-3 w-4/12">
              {item?.user?.fullname && <Initials size={75} name={item?.user?.fullname} text="20px" />}
              <div>
                <p className="text-lg mt-1 fw-500 capitalize">{item?.user?.fullname}</p>
                <p className="fs-500">{item?.user?.email}</p>
                <p className="fs-500">Joined {dayjs(item?.user?.createdAt).format('DD-MMM-YYYY')}</p>
              </div>
            </div>
            <div className="lg:w-5/12">
              <p>
                {item.message}
              </p>
            </div>
            <div className="w-3/12">
                <div>{formatRating(item.rating, "29px")}</div>
            </div>
            <p className="absolute right-4 bottom-0 fw-600">{dayjs(item.createdAt).format('DD-MMM-YYYY')}</p>
          </div>
            ))
          }
          <Paginate
            postsPerPage={postsPerPage}
            totalPosts={data?.length}
            paginate={paginate}
            previousPage={previousPage}
            nextPage={nextPage}
            currentPage={currentPage}
          />
        </div>
      </div>
    </>
  );
};

export default FeedbackPage;
FeedbackPage.Layout = "Dashboard";
