import React, { useState } from "react";
import { AppPage } from "@/shared/components/layouts/Types";
import ProfileSettings from "@/shared/components/settings/Profile";
import SecurityPass from "@/shared/components/settings/Security";

const SettingsPage: AppPage = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? value : value);
  };
  const activeStyle = {
    background: "#F3F8FF",
    fontWeight: 500,
    transition: "0.6s",
  };
  return (
    <>
      <div>
        <p className="mb-8">Account Setting</p>
        <div className="rounded-[17px] bg-white p-6 py-12 flex">
          <div className="w-2/12 border-r">
            <ul className="text-black w-10/12">
              <li
                className="nav-item py-2 px-6 rounded-lg cursor-pointer fs-400 mb-2"
                style={open === 1 ? activeStyle : undefined}
                onClick={() => handleOpen(1)}
              >
                <span className="fs-400">My Profile</span>
              </li>
              <li
                className="nav-item py-2 px-6 rounded-lg cursor-pointer fs-400 mb-2"
                style={open === 2 ? activeStyle : undefined}
                onClick={() => handleOpen(2)}
              >
                <span className="fs-400">Security</span>
              </li>
            </ul>
          </div>
          <div className="w-10/12  lg:pl-12">
          {open === 1 ? <ProfileSettings/> : ""}
          {open === 2 ? <SecurityPass/> : ""}
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;
SettingsPage.Layout = "Dashboard";
