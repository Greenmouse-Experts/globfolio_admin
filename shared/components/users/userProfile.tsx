import React, { FC, useState } from "react";
import { UserProfile } from "@/shared/types";
import Initials from "@/shared/utils/initials";
import { BsTelephone } from "react-icons/bs";
import dayjs from "dayjs";
import { PiUserCirclePlus } from "react-icons/pi";
import Button from "../UI/Button";
import Image from "next/image";
import { useGetOneUsersQuery, useLazySuspendUserQuery } from "@/services/api/userSlice";
import { toast } from "react-toastify";

interface Props {
  item: UserProfile;
}
const ViewUserProfile: FC<Props> = ({ item }) => {
    const {data, isLoading, refetch} = useGetOneUsersQuery(item.id)
    const [suspend] = useLazySuspendUserQuery()

    const suspendUser = async(id:string) => {
        const payload = {
            userId: id
        }
        await suspend(payload)
        .then((res:any) => {
            if(res.isSuccess){
                toast.success(res?.data.message)
            }else {
                toast.error(res.error.data.message)
            }
        })
        .catch((err) => {})
    }
  return (
    <>
      <div>
        <div className="relative flex gap-x-4 border-b pb-3">
          <Initials name={item?.fullname} size={60} text="28" />
          <div className="">
            <p className="fs-700 fw-600">{item.fullname}</p>
            <p>{item.email}</p>
          </div>
          <div className="absolute right-0 -top-7">
            <Image
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689834080/globfolio/3974366_iboyrd.png"
              alt="sub"
              width={70}
              height={70}
              className="w-8 mx-auto"
            />
            <p className="fs-200 fw-600 italic">Basic</p>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center gap-x-2">
            <BsTelephone className="text-xl" />
            <p>{item.phone_no}</p>
          </div>
          <div className="flex items-center gap-x-2 mt-3">
            <PiUserCirclePlus className="text-2xl" />
            <p>joined {dayjs(item.createdAt).format("DD-MMMM-YYYY")}</p>
          </div>
        </div>
        <div className="mt-8">
          {
            item.isSuspended?
            <Button
            title="Unuspend User"
            altClassName="w-full rounded-lg py-3 btn-like"
          />
          : 
          <Button
            title="Suspend User"
            altClassName="w-full rounded-lg py-3 fw-600 text-white bg-red-600"
            onClick={() => suspendUser(item.id)}
          />
          }
        </div>
      </div>
    </>
  );
};

export default ViewUserProfile;
