import React, { FC, useEffect, useState } from "react";
import SubItemComp from "./SubItem";
import { SubscriptionPlan, SubscriptionPlanResult } from "@/shared/types/subscription";
import useModal from "@/hooks/useModal";
import CreateNewPlan from "./NewPlan";


interface Props{
  data: SubscriptionPlanResult
  refetch: () => void
  count: () => void
}
const EditSubComponent:FC<Props> = ({data, refetch, count}) => {
  const [open, setOpen] = useState("");
  const {Modal, setShowModal} = useModal()

  const handleOpen = (value: any) => {
    setOpen(value.id)
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
        <div className="mb-6 flex items-center justify-between">
          <p className="text-lg fw-600">Plans and Pricing</p>
          <p className="fw-600 border-b border-gray-600 cursor-pointer" onClick={() => setShowModal(true)}>Add New Plan</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="w-full overflow-x-auto scroll-pro">
            <ul className="flex w-[550px] lg:w-auto gap-x-5 text-white">
              {
                data.data.map((item:SubscriptionPlan, index:number) => (
                  <li
                className="nav-item py-2 lg:px-6 px-2 rounded-lg cursor-pointer fs-500 lg:fs-600 mb-2"
                style={open === item.id ? activeStyle : inactive}
                onClick={() => handleOpen(item)}
                key={index}
              >
                <span className="">{item.name}</span>
              </li>
                ))
              }
            </ul>
          </div>
          <div className="mt-8">
            <div>{open && <SubItemComp data={data.data} tab={open} change={handleOpen} refetch={refetch}/>}</div>
          </div>
        </div>
      </div>
      <Modal title="Create a new subscription plan" wide>
              <CreateNewPlan close={() => setShowModal(false)} refetch={refetch} count={count}/>
      </Modal>
    </>
  );
};

export default EditSubComponent;
