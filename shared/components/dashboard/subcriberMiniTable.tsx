import React, { FC } from "react";
import { subscribers } from "../../utils/dummyData";
import Link from "next/link";
import { UserData } from "@/shared/types/auth";
import dayjs from "dayjs";
import { formatAsNgnMoney } from "@/shared/utils/format";

interface Props{
  users: any[]
}
const SubscriberMiniTable:FC<Props> = ({users}) => {
  return (
    <>
      <div className="">
        <div className="mb-4 flex justify-between">
          <p className="fw-600 fs-700">List of Subscribers</p>
          <Link href='/subscription' className="fs-500 fw-600 underline">View All</Link>
        </div>
        {users && !!users?.length && (
          <div className="lg:p-4 w-full">
            <div className="mt-2 flex flex-col">
              <div className="-my-2 overflow-x-auto ">
                <div className="py-2 align-middle inline-block min-w-full ">
                  <div className="overflow-hidden  sm:rounded-lg">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            S/N
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Name
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Plan
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Date
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Estimate
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((item, index) => (
                          <tr className="" key={index}>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {index + 1}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {item.fullname}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {item.plan.name}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {dayjs(item.subscription.createdAt).format('DD-MMM-YYYY')}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {formatAsNgnMoney(item.plan.amount)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SubscriberMiniTable;
