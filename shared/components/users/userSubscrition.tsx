import React, { FC, useState } from "react";
import { SingleUserDataResult, UserProfile } from "@/shared/types";
import Initials from "@/shared/utils/initials";
import Button from "../UI/Button";
import Image from "next/image";
import { useGetOneUsersQuery } from "@/services/api/userSlice";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { useGetSubscriptionQuery, useLazyUpdateSubDurationQuery, useLazyUpdateSubscriptionQuery } from "@/services/api/subscriptionSlice";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  item: UserProfile;
  refetchMain: () => void
}
const ViewSubscriptionProfile: FC<Props> = ({ item, refetchMain }) => {
  const { data, isLoading, refetch } = useGetOneUsersQuery<any>(item.id);
  const { data: subs } = useGetSubscriptionQuery();
  const [increase] = useLazyUpdateSubDurationQuery() 
  const [update] = useLazyUpdateSubscriptionQuery() 
  const [isBusy, setIsBusy] = useState(false);
  const [isBusys, setIsBusys] = useState(false);
  const [editPlan, setEditPlan] = useState(false);
  const [editDuration, setEditDuration] = useState(false);
  const [subValue, setSubValue] = useState("");
  const [endDate, setEndDate] = useState(
    dayjs(data?.message?.subscription?.expiredAt).format("YYYY-MM-DD")
  );
  const changePlan = () => {
    setIsBusys(true)
    const payload = {
        newPlanId: subValue,
        // exisitingSubscriptionId: data?.message.subscription?.id? data?.message.subscription?.id : data?.message.user?.planId,
        userId: data?.message.user.id
    }
    update(payload)
    .then((res:any) => {
        if(res.isSuccess){
            toast.success(res.data.message)
            refetch()
            setSubValue('')
            setIsBusys(false)
            refetchMain()
        }else{
            toast.error(res.data.message)
            setIsBusys(false)
        }
    })
    .catch((err) => {})
  };
  const changeDuration = () => {
    setIsBusy(true)
    const payload = {
        expiredAt: dayjs(endDate).toISOString(),
        subscriptionId: data?.message.subscription?.id,
        userId: data?.message.user.id
    }
    increase(payload)
    .then((res:any) => {
        if(res.isSuccess){
            toast.success(res.data.message)
            refetch()
            setIsBusy(false)
            refetchMain()
        }else{
            toast.error(res.data.message)
            setIsBusy(false)
        }
    })
    .catch((err) => {})
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
                    name={data?.message.user.fullname}
                    size={60}
                    text="20px"
                  />
                )}
                <div className="">
                  <p className="fs-700 fw-600">{data?.message.user.fullname}</p>
                  <p>{item.email}</p>
                </div>
              </>
            </div>
            <div className="mt-3 border-b border-gray-500 pb-2">
              <div>
                <p className="fw-600">
                  Subscribed to{" "}
                  <span className="text-xl text-green-400">
                    {data?.message.subscription?.subscriptionPlan?.name}
                  </span>
                </p>
                <p
                  className="mt-1 underline cursor-pointer fw-500"
                  onClick={() => setEditPlan(!editPlan)}
                >
                  change plan
                </p>
                {editPlan && (
                  <div className="flex items-center gap-x-3 mt-2">
                    <div className="w-8/12">
                      <select
                        value={subValue}
                        onChange={(e) => setSubValue(e.target.value)}
                        className="w-full rounded p-2 border border-gray-400"
                      >
                        <option value="" disabled>
                          Select an Option
                        </option>
                        {subs &&
                          subs?.data
                            .filter(
                              (where: any) =>
                                where.name !==
                                data?.message.subscription?.subscriptionPlan?.name
                            )
                            .map((item: any, i: number) => (
                              <option value={item.id} key={i}>
                                {item.name}
                              </option>
                            ))}
                      </select>
                    </div>
                    <div className="w-4/12">
                      <Button
                      onClick={changePlan}
                        altClassName="py-2 bg-primary text-white fw-500 px-5 rounded-lg"
                        title={
                          isBusys ? (
                            <BeatLoader size={14} color="white" />
                          ) : (
                            "Change"
                          )
                        }
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            {data?.message.subscription?.subscriptionPlan && <div className="mt-2">
              <div>
                <p className="fw-600">Subscription Duration</p>
                {data?.message.subscription?.subscriptionPlan.name !== "Free Plan" && <div className=" fw-500 mt-2 bg-green-100 py-1 px-2">
                  <div className="flex gap-x-2 items-center">
                    <p>
                      {dayjs(data?.message?.subscription?.createdAt).format(
                        "DD-MMM-YYYY"
                      )}
                    </p>
                    -
                    <p>
                      {dayjs(data?.message?.subscription?.expiredAt).format(
                        "DD-MMM-YYYY"
                      )}
                    </p>
                  </div>
                  <span className="text-sm fw-600 text-gray-600">
                    Expires in{" "}
                    {dayjs(data?.message.subscription?.expiredAt).fromNow(true)}
                  </span>
                </div>}
                <p
                  className="mt-1 underline cursor-pointer fw-500"
                  onClick={() => setEditDuration(!editDuration)}
                >
                  change Duration
                </p>
              </div>
              {editDuration && (
                <div className="mt-4">
                  <div className="flex gap-x-2">
                    <input
                      type="date"
                      value={dayjs(data?.message?.subscription?.createdAt).format(
                        "YYYY-MM-DD"
                      )}
                      disabled
                      className="w-full rounded p-2 border border-gray-400"
                    />
                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full rounded p-2 border border-gray-400"
                    />
                  </div>
                  <div className="mt-3">
                    <Button
                    onClick={changeDuration}
                      altClassName="py-2 w-full bg-primary text-white fw-500 px-5 rounded-lg"
                      title={
                        isBusy ? (
                          <BeatLoader size={14} color="white" />
                        ) : (
                          "Extend"
                        )
                      }
                    />
                  </div>
                </div>
              )}
            </div>}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewSubscriptionProfile;
