import React, { useState } from "react";
import SubItemComp from "./SubItem";

const EditSubComponent = () => {
  const [open, setOpen] = useState(1);

  const handleOpen = (value: number) => {
    setOpen(open === value ? value : value);
  };
  const inactive = {
    background: "#A4A4A4"
  }
  const activeStyle = {
    background: "#2C445A",
    fontWeight: 500,
    transition: "0.6s",
  };
  return (
    <>
      <div>
        <div className="mb-6">
          <p className="text-lg">Plans and Pricing</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="w-full">
            <ul className="flex gap-x-5 text-white">
              <li
                className="nav-item py-2 px-6 rounded-lg cursor-pointer fs-600 mb-2"
                style={open === 1 ? activeStyle : inactive}
                onClick={() => handleOpen(1)}
              >
                <span className="">Basic Plan</span>
              </li>
              <li
                className="nav-item py-2 px-6 rounded-lg cursor-pointer fs-600 mb-2"
                style={open === 2 ? activeStyle : inactive}
                onClick={() => handleOpen(2)}
              >
                <span className="">Standard Plan</span>
              </li>
              <li
                className="nav-item py-2 px-6 rounded-lg cursor-pointer fs-600 mb-2"
                style={open === 3 ? activeStyle : inactive}
                onClick={() => handleOpen(3)}
              >
                <span className="">Premium Plan</span>
              </li>
            </ul>
          </div>
          <div className="mt-8">
            <SubItemComp/>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditSubComponent;
