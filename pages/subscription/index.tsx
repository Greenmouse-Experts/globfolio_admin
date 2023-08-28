import React from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import Image from "next/image";
import EditSubComponent from "@/shared/components/subscription/EditSubComp";
import {
  useGetSubUserQuery,
  useGetSubscriptionQuery,
} from "@/services/api/subscriptionSlice";

const SubscriptionPage: AppPage = () => {
  const { data, refetch } = useGetSubscriptionQuery();
  const { data: sub, isLoading } = useGetSubUserQuery();
  
  const colors: string[] = [
    "bg-[#E4E9F7]",
    "bg-[#E3FBE5]",
    "bg-[#E8F3F4]",
    "bg-[#FAF6D3]",
  ];
  const avatar: string[] = [
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340787/globfolio/Group_48426_imjly7.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48427_mraxjd.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48428_btwyxy.png",
    "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48429_ngpka9.png",
  ];
  return (
    <>
      <div>
        <div className="grid lg:grid-cols-4 gap-6">
          {sub &&
            !!sub.data.length &&
            sub.data.map((item: any, index: number) => {
            const colorIndex = index % colors.length;
                const color = colors[colorIndex];
                const imgIndex = index % colors.length;
                const img = avatar[imgIndex];
            return (
              <div
                className={`flex items-center justify-between p-5 rounded-[8px] ${
                  color
                }`}
                key={index}
              >
                <div>
                  <p className="fs-400 fw-500">{item.plan}</p>
                  <p className="mt-3 text-xl fw-600">
                    {item?.users} <span>User(s)</span>
                  </p>
                </div>
                <div>
                  <Image
                    src={img}
                    alt="basic"
                    width={70}
                    height={40}
                    className="w-16"
                  />
                </div>
              </div>
            )})}
        </div>
        <div className="mt-12">
          {data && <EditSubComponent data={data} refetch={refetch} />}
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
SubscriptionPage.Layout = "Dashboard";
