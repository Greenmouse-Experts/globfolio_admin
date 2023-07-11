import React from "react";
import { FiTrendingUp } from "react-icons/fi";
import { PiDotsThreeCircleVertical } from "react-icons/pi";

export const TopAnalysisDetails = () => {
  return (
    <>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
        <div className="bg-[#E4E9F7] p-5 rounded-[10px]">
          <p className="fw-500">Total Subscribers</p>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">571</p>
            <div className="flex items-center gap-x-2">
              <p className="fw-500 fs-300">+13%</p>
              <FiTrendingUp />
            </div>
          </div>
        </div>
        <div className="bg-[#E3FBE5] p-5 rounded-[10px]">
          <p className="fw-500">Total Platform Users</p>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">943</p>
            <div className="flex items-center gap-x-2">
              <p className="fw-500 fs-300">+40%</p>
              <FiTrendingUp />
            </div>
          </div>
        </div>
        <div className="bg-[#E8F3F4] p-5 rounded-[10px]">
          <p className="fw-500">Total Transactions</p>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">₦719,000</p>
            <div className="flex items-center gap-x-2">
              <p className="fw-500 fs-300">+22%</p>
              <FiTrendingUp />
            </div>
          </div>
        </div>
        <div className="bg-[#FAF6D3] p-5 rounded-[10px]">
          <p className="fw-500">Today's Pick</p>
          <div className="flex justify-between mt-3">
            <p className="text-lg fw-600">14</p>
            <div className="flex items-center gap-x-2">
              <p className="fw-500 fs-300">+17%</p>
              <FiTrendingUp />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const DashboardAlert = () => {
  return (
    <div>
      <p className="fw-600">Alerts !</p>
      <div className="mt-5">
        <div className="flex items-center justify-between">
          <p className="fs-500">New payment alert from <span className="fw-500 fs-500">OHITEMEH IJEZI</span></p>
          <PiDotsThreeCircleVertical className="text-gray-600 text-xl"/>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="fs-500">Subscription renewal from <span className="fw-500 fs-500">JESSICA ANWA</span></p>
          <PiDotsThreeCircleVertical className="text-gray-600 text-xl"/>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="fs-500">New referral from <span className="fw-500 fs-500">VICTOR CHIGO</span></p>
          <PiDotsThreeCircleVertical className="text-gray-600 text-xl"/>
        </div>
        <div className="flex items-center justify-between mt-4">
          <p className="fs-500">Subscription renewal from <span className="fw-500 fs-500">JESSICA ANWA</span></p>
          <PiDotsThreeCircleVertical className="text-gray-600 text-xl"/>
        </div>
      </div>
    </div>
  )
}
