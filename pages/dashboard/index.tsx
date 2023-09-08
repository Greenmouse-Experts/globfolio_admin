import React from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import MarketOverviewChart from "@/shared/components/dashboard/marketComp";
import { DashboardAlert, TopAnalysisDetails } from "@/shared/components/dashboard/dashMinComp";
import TodaysPickComp from "@/shared/components/dashboard/todaysPick";
import MoneyIncomeChart from "@/shared/components/dashboard/moneyGenerated";
import SubscriberMiniTable from "@/shared/components/dashboard/subcriberMiniTable";
import { useGetDashboardQuery } from "@/services/api/routineSlice";

const DashboardHome: AppPage = () => {
  const {data, isLoading} = useGetDashboardQuery()
  return (
    <>
      <div>
        <TopAnalysisDetails data={data?.data?.count}/>
      </div>
      <div className="mt-6 lg:mt-12 lg:grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <div className="lg:p-6 p-3 py-5 bg-white rounded-[10px] w-full overflow-x-auto">
          <SubscriberMiniTable users={data?.data?.subscribers}/>
          </div>
          <div className="p-6 bg-white rounded-[10px] mt-6 lg:mt-8">
            <MarketOverviewChart/>
          </div>
        </div>
        <div className="col-span-4">
          <div className="p-6 bg-white rounded mt-6 lg:mt-0">
            <TodaysPickComp/>
          </div>
          <div className="p-6 bg-white rounded mt-6 lg:mt-8">
            <DashboardAlert/>
          </div>
          {/* <div className="p-6 bg-primary rounded mt-6 lg:mt-8">
            <MoneyIncomeChart/>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
DashboardHome.Layout = "Dashboard";
