import React from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const MoneyIncomeChart = () => {
  const options = {
    colors: ["#41D87D", "#00DF53"],
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    yaxis: {
      show: false,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    stroke: {
      show: true,
      curve: "smooth",
      lineCap: "butt",
      colors: undefined,
      width: 4,
      dashArray: 0,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      show: false,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
  } as ApexCharts.ApexOptions;
  const series = [
    {
      name: "Active",
      data: [5000, 20000, 15000, 11000],
    },
  ];

  return (
    <>
      <div className="text-white">
        <div className="mb-6">
          <p className="fw-600 text-2xl">N24,000,000</p>
          <p className="mt-2 fw-500">Generated in the last 6 months</p>
        </div>
        {typeof window !== "undefined" && (
          <Chart
            options={options}
            series={series}
            type="line"
            width="100%"
            height="250px"
          />
        )}
      </div>
    </>
  );
};

export default MoneyIncomeChart;
