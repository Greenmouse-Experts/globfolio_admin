import React, { FC, useMemo, useState } from "react";
import Table from "../UI/table";
import { FormatStatus } from "@/shared/utils/format";
import Initials from "@/shared/utils/initials";
import { AiOutlineSetting } from "react-icons/ai";
import { TiDelete } from "react-icons/ti";
import dayjs from "dayjs";
import useModal from "@/hooks/useModal";
import { UserProfile } from "@/shared/types";
import ViewUserProfile from "./userProfile";
import { EmptyState2 } from "@/shared/utils/emptyState";

interface Props {
  users: UserProfile[];
  status?: string;
}
const UserInfoTable: FC<Props> = ({ status, users }) => {
  const {Modal, setShowModal} = useModal()
  const [selectedItem, setSelectedItem] = useState<UserProfile>()
  const openProfile = (item:UserProfile) => {
    setSelectedItem(item)
    setShowModal(true)
  }
  if (status) {
    users = users?.filter(
      (where: any) => where.hasActiveSubscription === status
    );
  }

  const columns = useMemo(
    () => [
      {
        Header: "S/N",
        accessor: (row: any, index: number) => index + 1, //RDT provides index by default
      },
      {
        Header: "Name",
        accessor: "fullname",
        Cell: (Props: any) => (
          <div className="flex items-center gap-x-2">
            <Initials name={Props.value} size={34} text="14" />
            {Props.value}
          </div>
        ),
      },
      {
        Header: "Date Joined",
        accessor: "createdAt",
        Cell: (props: any) => dayjs(props.value).format("DD-MMM-YYYY"),
      },
      {
        Header: "Email Address",
        accessor: "email",
      },
      {
        Header: "Subscription Status",
        accessor: "hasActiveSubscription",
        Cell: (props: any) =>
          props.value ? FormatStatus["active"] : FormatStatus["inactive"],
      },
      {
        Header: "Action",
        accessor: "status",
        id: "id",
        Cell: (row: any) => (
          <div className="flex items-center gap-x-2">
            <AiOutlineSetting className="text-xl cursor-pointer" onClick={() => openProfile(row.row.original)}/>
            {/* <TiDelete className="text-2xl text-red-600 cursor-pointer" /> */}
          </div>
        ),
      },
    ], // eslint-disable-next-line
    []
  );

  const list = useMemo(() => users, [users]);
  return (
    <>
      <div className="mt-6">
        {
          users && !users?.length && <div className="py-6 flex justify-center"><EmptyState2 message="No Users Data Avaivable Yet"/></div>
        }
        {users && !!users?.length && (
          <div className="lg:p-4 w-full">
            <Table columns={columns} data={list} />
          </div>
        )}
      </div>
      {
        selectedItem && <Modal title="User Profile">
        <ViewUserProfile item={selectedItem}/>
    </Modal>
      }
    </>
  );
};

export default UserInfoTable;
