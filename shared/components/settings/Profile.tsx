import useModal from "@/hooks/useModal";
import { useAppSelector } from "@/shared/redux/store";
import Initials from "@/shared/utils/initials";
import Image from "next/image";
import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import EditProfile from "./EditProfile";

const ProfileSettings = () => {
  const user = useAppSelector((state) => state.user.user)
  const {Modal, setShowModal} = useModal()
  const fname = user?.fullname?.split(' ')[0]
  const lname = user?.fullname?.split(' ').length > 0 && user?.fullname?.split(' ')[1]
  return (
    <>
      <div className="border border-[#E8EAED] rounded-[15px] p-6 flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          {/* <Image
            src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689167035/globfolio/Group_48399_mxhgen.png"
            alt="profile"
            width={150}
            height={150}
            className="w-16 h-16"
          /> */}
          <Initials name={user.fullname} size={55} text="18"/>
          <div>
            <p className="fw-600 fs-500 capitalize">{user.fullname}</p>
            <p className="fs-300 mt-1">Super admin, Nigeria.</p>
          </div>
        </div>
        <div className="flex gap-x-2 items-center p-1 px-2 rounded-[15px] border border-[#5F5F5F]" onClick={() => setShowModal(true)}>
          <p>Edit</p>
          <AiOutlineEdit />
        </div>
      </div>
      <div className="border border-[#E8EAED] rounded-[15px] p-6 mt-6">
        <p className="fw-600">Personal Information</p>
        <div className="grid lg:grid-cols-2 lg:w-10/12 gap-6 mt-6">
            <div className="">
                <p className="text-[#5F5F5F] fw-500 fs-400">First Name</p>
                <p className="mt-2 fw-500 capitalize">{fname}</p>
            </div>
            <div className="">
                <p className="text-[#5F5F5F] fw-500 fs-400">Last Name</p>
                <p className="mt-2 fw-500 capitalize">{lname}</p>
            </div>
            <div className="">
                <p className="text-[#5F5F5F] fw-500 fs-400">Email address</p>
                <p className="mt-2 fw-500">{user.email}</p>
            </div>
            <div className="">
                <p className="text-[#5F5F5F] fw-500 fs-400">Phone</p>
                <p className="mt-2 fw-500">{user.phone}</p>
            </div>
        </div>
      </div>
      <div className="border border-[#E8EAED] rounded-[15px] p-6 mt-6">
        <p className="fw-600">Address</p>
        <div className="grid lg:grid-cols-2 lg:w-10/12 gap-6 mt-6">
            <div className="">
                <p className="text-[#5F5F5F] fw-500 fs-400">Country</p>
                <p className="mt-2 fw-500">{user.country}</p>
            </div>
            <div className="">
                <p className="text-[#5F5F5F] fw-500 fs-400">City/State</p>
                <p className="mt-2 fw-500">Nill</p>
            </div>
        </div>
      </div>
      <Modal title="Update Admin Profile">
          <EditProfile close={() => setShowModal(false)}/>
      </Modal>
    </>
  );
};

export default ProfileSettings;
