import React from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import MarketOverviewChart from "@/shared/components/dashboard/marketComp";
import { DashboardAlert, TopAnalysisDetails } from "@/shared/components/dashboard/dashMinComp";
import TodaysPickComp from "@/shared/components/dashboard/todaysPick";
import MoneyIncomeChart from "@/shared/components/dashboard/moneyGenerated";
import SubscriberMiniTable from "@/shared/components/dashboard/subcriberMiniTable";

const DashboardHome: AppPage = () => {
  return (
    <>
      <div>
        <TopAnalysisDetails />
      </div>
      <div className="mt-6 lg:mt-12 grid lg:grid-cols-12 gap-8">
        <div className="col-span-8">
          <div className="p-6 bg-white rounded-[10px]">
            <MarketOverviewChart/>
          </div>
          <div className="p-6 bg-white rounded-[10px] mt-6 lg:mt-8">
            <SubscriberMiniTable/>
          </div>
        </div>
        <div className="col-span-4">
          <div className="p-6 bg-white rounded">
            <TodaysPickComp/>
          </div>
          <div className="p-6 bg-white rounded mt-6 lg:mt-8">
            <DashboardAlert/>
          </div>
          <div className="p-6 bg-primary rounded mt-6 lg:mt-8">
            <MoneyIncomeChart/>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
DashboardHome.Layout = "Dashboard";
