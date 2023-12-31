import React, { PropsWithChildren } from "react";
import SidebarLayout from "./Sections/Sidebar";
import Image from "next/image";
import Link from "next/link";
import { RiMenu3Line } from "react-icons/ri";
import AddAuth from "./addAuth";
import { BsBell } from "react-icons/bs";
import { Menu, MenuHandler, MenuItem, MenuList, Button } from "../UI/dropdown";
import Initials from "@/shared/utils/initials";
import { useAppSelector } from "@/shared/redux/store";
import { useGetNotifyQuery } from "@/services/api/routineSlice";
import { NotifyItem } from "@/shared/types/routine";
import { formatName } from "@/shared/utils/format";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const DashboardLayout = ({ children }: PropsWithChildren) => {
  const { data, isLoading, refetch } = useGetNotifyQuery();
  const unread = data?.data?.filter((where: any) => !where.isRead);
  const user = useAppSelector((state) => state.user.user);
  const [toggled, setToggled] = React.useState(false);
  let today = new Date();
  return (
    <div className="flex ">
      <div className="lg:w-[300px]">
        <SidebarLayout setToggled={setToggled} toggled={toggled} />
      </div>
      <div className="relative w-full">
        <div className="lg:hidden px-3 py-5 flex justify-between">
          <Link href="/">
            <Image
              src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689001814/globfolio/Group_48319_zrfe2h.png"
              alt="logo"
              width={150}
              height={60}
              className="w-28"
            />
          </Link>
          <RiMenu3Line
            className="text-2xl"
            onClick={() => setToggled(!toggled)}
          />
        </div>
        <div className="bg-[#F6F7FB] relative">
          {/* header */}
          <div className="fixed hidden lg:flex index-30 justify-between bg-white p-5 py-1 right-0 top-0 w-full lg:w-[calc(100%_-_250px)]">
            <div className="flex items-center gap-x-8">
              <RiMenu3Line
                className="text-2xl"
                onClick={() => setToggled(!toggled)}
              />
              <div>
                <p className="fs-700 fw-600">Hello Super Admin</p>
                <p className="fw-500 mt-1 fs-400">
                  {dayjs(today).format("DD MMM, YYYY")}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-3">
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Button className="p-3 bg-transparent !shadow-none">
                    <div className="bg-[#F4F5F7] px-2 rounded-lg py-2 relative">
                      <BsBell className="lg:text-xl text-lg text-primary" />
                      <p className="absolute index-30 -top-2 left-3/4 border circle px-1 text-white text-xs bg-primary">
                        {unread &&
                      unread.length}
                      </p>
                    </div>
                  </Button>
                </MenuHandler>
                <MenuList className="p-0">
                  <MenuItem className="p-0 pb-4 w-64 lg:w-72">
                    <p className="mb-3 text-white bg-primary py-2 pl-3 text-lg fw-600">
                      Notifications
                    </p>
                    {unread &&
                      !!unread.length &&
                      unread
                        .slice(0, 5)
                        .map((item: NotifyItem, index: number) => (
                          <div className="border-b border-gray-700 pb-2 px-4 mb-2">
                            <p className="pr-2 fs-300 fw-500">{formatName(item.message, 43)}</p>
                            <p className="italic fs-300 mt-1">
                              {dayjs(item.createdAt).fromNow()}
                            </p>
                          </div>
                        ))}
                    <Link href="/notification">
                      <p className="text-center hover:text-orange-500">
                        View All
                      </p>
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
              <div>
                <Initials name={user.fullname} size={40} text="12" />
              </div>
            </div>
          </div>
          <div className="pt-10 lg:pt-24 min-h-screen px-3 lg:px-5 pb-16">
            {children}
          </div>
          <div className="text-center pb-4">
            <p className="fw-500 fs-400">
              Copyright © 2023 Globfolio | All Right Reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAuth(DashboardLayout);
