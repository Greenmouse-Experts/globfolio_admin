import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiArrowUpSFill } from "react-icons/ri";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "../../components/UI/dropdown";
import { useRouter } from "next/navigation";
import { useGetAdvisoryQuery } from "@/services/api/stockSlice";
import { Advisory } from "@/shared/types/stocks";
import { formatName } from "@/shared/utils/format";
import { EmptyState1 } from "@/shared/utils/emptyState";

const TodaysPickComp = () => {
  const route = useRouter();
  const {
    data: live,
    isLoading: liveLoading,
    refetch: liveRefetch,
  } = useGetAdvisoryQuery();
  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="flex justify-between items-center border-b border-gray-600">
          <p className="fw-600 fs-700">Top Picks</p>
          <Menu placement="bottom-end">
            <MenuHandler>
              <Button className="p-3 bg-transparent !shadow-none">
                <BsThreeDotsVertical className="cursor-pointer text-black" />
              </Button>
            </MenuHandler>
            <MenuList className="p-2">
              <MenuItem onClick={() => route.push("/analyst-picks")}>
                Goto Picks
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
        <div className="mt-6">
        {
         live && !live?.data.length && <div><EmptyState1 message="No Live Analytic Pick yet"/></div>
      }
          {live &&
            !!live.data.length &&
            live.data.slice(0, 5).map((item: Advisory, i: number) => (
              <div key={i} className="p-2 border shadow rounded-[8px] mb-2 hover:scale-105 duration-100">
                <p className="fw-500 fs-500">{formatName(item.intro, 28)}</p>
                <div className="flex gap-x-3 mt-2">
                  <p className="text-green-600 fw-500 capitalize fs-400">
                    {item.industry}
                  </p>
                  {/* <p className="fs-300 text-gray-600">{formatName(dayjs(item.createdAt).fromNow(), 15)}</p> */}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default TodaysPickComp;
