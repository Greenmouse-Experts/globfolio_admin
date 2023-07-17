import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import Button from "../UI/Button";
import { resetStateAction } from "@/shared/redux/actions/resetState";
import { deleteFromLocalStorage } from "@/services/helpers";

interface Props {
  CloseModal: () => void;
}

const LogoutModal: FC<Props> = ({ CloseModal }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(resetStateAction());
    deleteFromLocalStorage("token")
    router.push("/");
  };
  return (
    <div>
      <p>Are you sure you want to log out</p>
      <div className="flex justify-between mt-10">
        <Button
          title="Cancel"
          onClick={CloseModal}
          altClassName="px-6 py-2 border rounded text-primary"
        />
        <Button
          title="Logout"
          altClassName="px-6 w-24 py-2 btn-like"
          onClick={logoutUser}
        />
      </div>
    </div>
  );
};

export default LogoutModal;
