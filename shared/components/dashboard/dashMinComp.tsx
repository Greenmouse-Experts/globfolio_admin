import React, {FC} from "react";
import { FiTrendingUp } from "react-icons/fi";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import { HiOutlineUsers } from "react-icons/hi";
import { MdOutlineEventNote } from "react-icons/md";
import { LuBookCopy } from "react-icons/lu";
import { BiCandles } from "react-icons/bi";
import { formatAsNgnMoney } from "@/shared/utils/format";
import { useGetTransactQuery } from "@/services/api/routineSlice";

interface Props{
  data: any
}
export const TopAnalysisDetails:FC<Props> = ({data}) => {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        <div className="bg-[#E4E9F7] p-5 rounded-[10px]">
          <div className="flex justify-between items-center">
          <p className="fw-500 fs-500">Total Subscribers</p>
          <HiOutlineUsers/>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">{data?.subscribers}</p>
            <div className="flex items-center gap-x-2">
              {/* <p className="fw-500 fs-300">+13%</p> */}
              <FiTrendingUp />
            </div>
          </div>
        </div>
        <div className="bg-[#E3FBE5] p-5 rounded-[10px]">
          <div className="flex justify-between items-center">
          <p className="fw-500 fs-500">Total Platform Users</p>
          <MdOutlineEventNote/>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">{data?.users}</p>
            <div className="flex items-center gap-x-2">
              {/* <p className="fw-500 fs-300">+40%</p> */}
              <FiTrendingUp />
            </div>
          </div>
        </div>
        <div className="bg-[#E8F3F4] p-5 rounded-[10px]">
          <div className="flex justify-between items-center">
          <p className="fw-500 fs-500">Total Transactions</p>
          <LuBookCopy/>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">{formatAsNgnMoney(data?.transactions)}</p>
            <div className="flex items-center gap-x-2">
              {/* <p className="fw-500 fs-300">+22%</p> */}
              <FiTrendingUp />
            </div>
          </div>
        </div>
        <div className="bg-[#FAF6D3] p-5 rounded-[10px]">
          <div className="flex justify-between items-center">
          <p className="fw-500 fs-500">Today's Pick</p>
          <BiCandles className="text-xl"/>
          </div>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">{data?.todays_pick}</p>
            <div className="flex items-center gap-x-2">
              {/* <p className="fw-500 fs-300">+17%</p> */}
              <FiTrendingUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

interface AlertProps{
  alert: any
}
export const DashboardAlert:FC<AlertProps> = ({alert}) => {
  return (
    <div>
      <p className="fw-600">Alerts !</p>
      {
        alert && !!alert.length && alert.map((item:any, i:number) => (
          <div className="flex items-center justify-between mt-4" key={i}>
          <p className="fs-300">{item?.description} <span className="fw-600 fs-300 text-green-800">{item?.user?.fullname}</span></p>
          <PiDotsThreeCircleVertical className="text-gray-600 text-xl"/>
        </div>
        ))
      }
    </div>
  )
}
