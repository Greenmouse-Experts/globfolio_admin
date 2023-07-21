import React from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import { MdOutlineAddBox } from "react-icons/md";
import AddAnalyticPicksForm from "@/shared/components/analytic-picks/addAnalytic";
import LivePicks from "@/shared/components/analytic-picks/livePicks";
import { BiEdit } from "react-icons/bi";
import DraftPicks from "@/shared/components/analytic-picks/draftPicks";
import { useGetAdvisoryQuery, useGetDraftAdvisoryQuery } from "@/services/api/stockSlice";

const StocksPage: AppPage = () => {
  const {data:live, isLoading:liveLoading, refetch:liveRefetch} = useGetAdvisoryQuery()
  const {data:draft, isLoading:draftLoading, refetch:draftRefetch} = useGetDraftAdvisoryQuery()
  return (
    <>
      <div className="lg:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="flex gap-x-2 items-center mb-3">
              <p className="fw-500">Create New</p>
              <MdOutlineAddBox />
            </div>
            <div className="bg-white rounded-[17px] p-6">
              <AddAnalyticPicksForm refetchLive={liveRefetch} refetchDraft={draftRefetch}/>
            </div>
          </div>
          <div className="col-span-4">
            <div>
              <p className="mb-3 fw-500">Live Picks</p>
              <div className="h-[300px] bg-white rounded-[17px] p-5">
                <div className="overflow-y-scroll scroll-pro h-full">
                <LivePicks data={live?.data} refetch={liveRefetch}/>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="flex mb-3  gap-x-2 items-center">
                <p className="fw-500">Drafts</p>
                <BiEdit/>
              </div>
              <div className="h-[300px] bg-white rounded-[17px] p-5">
              <div className="overflow-y-scroll scroll-pro h-full">
                <DraftPicks data={draft?.data} refetch={draftRefetch} liveRefetch={liveRefetch}/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StocksPage;
StocksPage.Layout = "Dashboard";
