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
  const formatBgColor = {
    "Basic Plan": "bg-[#E4E9F7]",
    "Premium Plan": "bg-[#E3FBE5]",
    "Platinum Plan": "bg-[#E8F3F4]",
    "Gold Plan": "bg-[#FAF6D3]",
  };
  const formatAvatar = {
    "Basic Plan":
      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340787/globfolio/Group_48426_imjly7.png",
    "Premium Plan":
      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48427_mraxjd.png",
    "Platinum Plan":
      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48428_btwyxy.png",
    "Gold Plan":
      "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48429_ngpka9.png",
  };
  return (
    <>
      <div>
        <div className="grid lg:grid-cols-4 gap-6">
          {sub &&
            !!sub.data.length &&
            sub.data.map((item: any, index: number) => (
              <div
                className={`flex items-center justify-between p-5 rounded-[8px] ${
                  formatBgColor[item.name as keyof typeof formatBgColor]
                }`}
              >
                <div>
                  <p className="fs-400 fw-500">{item.name}</p>
                  <p className="mt-3 text-xl fw-600">
                    {item?.subscriptions?.length} Users
                  </p>
                </div>
                <div>
                  <Image
                    src={formatAvatar[item.name as keyof typeof formatAvatar]}
                    alt="basic"
                    width={70}
                    height={40}
                    className="w-16"
                  />
                </div>
              </div>
            ))}
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
