import React, { FC, useState } from "react";
import { SingleUserDataResult, UserProfile } from "@/shared/types";
import Initials from "@/shared/utils/initials";
import { BsTelephone } from "react-icons/bs";
import dayjs from "dayjs";
import { PiUserCirclePlus } from "react-icons/pi";
import Button from "../UI/Button";
import Image from "next/image";
import {
  useGetOneUsersQuery,
  useLazySuspendUserQuery,
  useLazyUnsuspendUserQuery,
} from "@/services/api/userSlice";
import { toast } from "react-toastify";
import { ScaleSpinner } from "../UI/Loading";

interface Props {
  item: UserProfile;
}
const ViewUserProfile: FC<Props> = ({ item }) => {
  const { data, isLoading, refetch } = useGetOneUsersQuery<any>(item.id);
  const [suspend] = useLazySuspendUserQuery();
  const [unsuspend] = useLazyUnsuspendUserQuery();
  const [isBusy, setIsBusy] = useState(false);

  const suspendUser = async (id: string) => {
    setIsBusy(true);
    const payload = {
      userId: id,
    };
    await suspend(payload)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res?.data.message);
          setIsBusy(false);
          refetch();
        } else {
          toast.error(res.error.data.message);
          setIsBusy(false);
        }
      })
      .catch((err) => {});
  };
  const unsuspendUser = async (id: string) => {
    setIsBusy(true);
    const payload = {
      userId: id,
    };
    await unsuspend(payload)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res?.data.message);
          setIsBusy(false);
          refetch();
        } else {
          toast.error(res.error.data.message);
          setIsBusy(false);
        }
      })
      .catch((err) => {});
  };
  return (
    <>
      <div>
        {isLoading && "Loading..."}
        {data && (
          <div>
            <div className="relative flex gap-x-2 border-b pb-3">
              <>
                {data?.message?.user?.picture ? (
                  <Image
                    src={data.message.user.picture.secure_url}
                    alt="sub"
                    width={70}
                    height={70}
                    className="w-16 h-16"
                  />
                ) : (
                  <Initials
                    name={data?.message?.user?.fullname}
                    size={60}
                    text="20px"
                  />
                )}
                <div className="">
                  <p className="fs-700 fw-600">{data?.message?.user?.fullname}</p>
                  <p>{item?.email}</p>
                </div>
              </>
              {data.message.subscription && (
                <div className="absolute right-0 -top-7">
                  <Image
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689834080/globfolio/3974366_iboyrd.png"
                    alt="sub"
                    width={70}
                    height={70}
                    className="w-8 mx-auto"
                  />
                  <p className="fs-200 fw-600 italic">
                    {data?.message?.subscription?.subscriptionPlan?.name}
                  </p>
                </div>
              )}
            </div>
            <div className="mt-3">
              <div className="flex items-center gap-x-2">
                <BsTelephone className="text-xl" />
                <p>{data?.message?.user.phone_no}</p>
              </div>
              <div className="flex items-center gap-x-2 mt-3">
                <PiUserCirclePlus className="text-2xl" />
                <p>joined {dayjs(item.createdAt).format("DD-MMMM-YYYY")}</p>
              </div>
            </div>
            <div className="mt-8">
              {data?.message.user.isSuspended ? (
                <Button
                  title={
                    isBusy ? (
                      <ScaleSpinner size={14} color="white" />
                    ) : (
                      "Unsuspend User"
                    )
                  }
                  altClassName="w-full rounded-lg py-3 btn-like"
                  onClick={() => unsuspendUser(item.id)}
                />
              ) : (
                <Button
                  title={
                    isBusy ? (
                      <ScaleSpinner size={14} color="white" />
                    ) : (
                      "Suspend User"
                    )
                  }
                  altClassName="w-full rounded-lg py-3 fw-600 text-white bg-red-600"
                  onClick={() => suspendUser(item.id)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewUserProfile;
