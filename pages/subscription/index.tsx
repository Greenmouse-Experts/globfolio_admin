import React from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import Image from "next/image";
import EditSubComponent from "@/shared/components/subscription/EditSubComp";
import { useGetSubscriptionQuery } from "@/services/api/subscriptionSlice";

const SubscriptionPage: AppPage = () => {
  const {data} = useGetSubscriptionQuery()
  return (
    <>
      <div>
        <div className="grid grid-cols-4 gap-6">
          <div className="flex items-center justify-between p-5 rounded-[8px] bg-[#E4E9F7]">
            <div>
              <p className="fs-400 fw-500">Basic Plan</p>
              <p className="mt-3 text-xl fw-600">235 Users</p>
            </div>
            <div>
              <Image
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340787/globfolio/Group_48426_imjly7.png"
                alt="basic"
                width={70}
                height={40}
                className="w-16"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-5 rounded-[8px] bg-[#E3FBE5]">
            <div>
              <p className="fs-400 fw-500">Standard Plan</p>
              <p className="mt-3 text-xl fw-600">430 Users</p>
            </div>
            <div>
              <Image
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48427_mraxjd.png"
                alt="basic"
                width={70}
                height={40}
                className="w-[70px]"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-5 rounded-[8px] bg-[#E8F3F4]">
            <div>
              <p className="fs-400 fw-500">Premium Plan</p>
              <p className="mt-3 text-xl fw-600">235 Users</p>
            </div>
            <div>
              <Image
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48428_btwyxy.png"
                alt="basic"
                width={70}
                height={40}
                className="w-16"
              />
            </div>
          </div>
          <div className="flex items-center justify-between p-5 rounded-[8px] bg-[#FAF6D3]">
            <div>
              <p className="fs-400 fw-500">Unsubscribed</p>
              <p className="mt-3 text-xl fw-600">140 Users</p>
            </div>
            <div>
              <Image
                src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689340786/globfolio/Group_48429_ngpka9.png"
                alt="basic"
                width={70}
                height={40}
                className="w-16"
              />
            </div>
          </div>
        </div>
        <div className="mt-12">
          {data && <EditSubComponent data={data}/>}
        </div>
      </div>
    </>
  );
};

export default SubscriptionPage;
SubscriptionPage.Layout = "Dashboard";
