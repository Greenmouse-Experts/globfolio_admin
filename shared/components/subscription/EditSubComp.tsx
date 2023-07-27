import React, { FC, useState } from "react";
import SubItemComp from "./SubItem";
import { SubscriptionPlanResult } from "@/shared/types/subscription";

interface Props{
  data: SubscriptionPlanResult
  refetch: () => void
}
const EditSubComponent:FC<Props> = ({data, refetch}) => {
  const [open, setOpen] = useState(1);
  const basic = data.data.filter((where) => where.name.indexOf("Basic") > -1)
  const premium = data.data.filter((where) => where.name.indexOf("Premium") > -1)
  const platinum = data.data.filter((where) => where.name.indexOf("Platinum") > -1)
  const gold = data.data.filter((where) => where.name.indexOf("Gold") > -1)

  const handleOpen = (value: number) => {
    setOpen(open === value ? value : value);
  };
  const inactive = {
    background: "#A4A4A4"
  }
  const activeStyle = {
    background: "#2C445A",
    fontWeight: 500,
    transition: "0.6s",
  };
  return (
    <>
      <div>
        <div className="mb-6">
          <p className="text-lg fw-600">Plans and Pricing</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="w-full overflow-x-auto scroll-pro">
            <ul className="flex w-[550px] lg:w-auto gap-x-5 text-white">
              <li
                className="nav-item py-2 lg:px-6 px-2 rounded-lg cursor-pointer fs-500 lg:fs-600 mb-2"
                style={open === 1 ? activeStyle : inactive}
                onClick={() => handleOpen(1)}
              >
                <span className="">Basic Plan</span>
              </li>
              <li
                className="nav-item py-2 lg:px-6 px-2 rounded-lg cursor-pointer fs-500 lg:fs-600 mb-2"
                style={open === 2 ? activeStyle : inactive}
                onClick={() => handleOpen(2)}
              >
                <span className="">Premium Plan</span>
              </li>
              <li
                className="nav-item py-2 lg:px-6 px-2 rounded-lg cursor-pointer fs-500 lg:fs-600 mb-2"
                style={open === 3 ? activeStyle : inactive}
                onClick={() => handleOpen(3)}
              >
                <span className="">Platinum Plan</span>
              </li>
              <li
                className="nav-item py-2 lg:px-6 px-2 rounded-lg cursor-pointer fs-500 lg:fs-600 mb-2"
                style={open === 4 ? activeStyle : inactive}
                onClick={() => handleOpen(4)}
              >
                <span className="">Gold Plan</span>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            {open === 1 ? <SubItemComp data={basic} refetch={refetch}/> : ""}
            {open === 2 ? <SubItemComp data={premium} refetch={refetch}/> : ""}
            {open === 3 ? <SubItemComp data={platinum} refetch={refetch}/> : ""}
            {open === 4 ? <SubItemComp data={gold} refetch={refetch}/> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubComponent;
