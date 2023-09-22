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
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "../../../shared/components/UI/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import ViewSubscriptionProfile from "./userSubscrition";
import ReusableModal from "../UI/ReusableModal";
import { useLazyDeleteUserQuery } from "@/services/api/userSlice";
import { toast } from "react-toastify";

interface Props {
  users: UserProfile[];
  status?: string;
  refetch: () => void
}
const UserInfoTable: FC<Props> = ({ status, users, refetch }) => {
  const { Modal, setShowModal } = useModal();
  const { Modal: Subscribe, setShowModal: showSubscribe } = useModal();
  const { Modal: Delete, setShowModal: showDelete } = useModal();
  const [selectedItem, setSelectedItem] = useState<UserProfile>();
  const [del] = useLazyDeleteUserQuery()
  const openProfile = (item: UserProfile) => {
    setSelectedItem(item);
    setShowModal(true);
  };
  const openSubscrition = (item: UserProfile) => {
    setSelectedItem(item);
    showSubscribe(true);
  };
  const openDelete = (item: UserProfile) => {
    setSelectedItem(item);
    showDelete(true);
  };
  const deleteUser = async(item:any) => {
    await del(item.id)
    .then((res: any) => {
      if (res.isSuccess) {
        toast.success(res.data.message);
        refetch()
        showDelete(false)
      } else {
        toast.error(res.error.data.message);
      }
    })
    .catch((err) => {});
  }
  if (status) {
    if (status === "active") {
      users = users?.filter((where: any) => where.hasActiveSubscription);
    } else users = users?.filter((where: any) => !where.hasActiveSubscription);
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
            <Menu placement="bottom-end">
              <MenuHandler>
                <Button className="p-3 bg-transparent !shadow-none">
                  <BsThreeDotsVertical className="cursor-pointer text-black" />
                </Button>
              </MenuHandler>
              <MenuList className="p-2">
                <MenuItem onClick={() => openProfile(row.row.original)}>
                  User Profile
                </MenuItem>
                <MenuItem onClick={() => openSubscrition(row.row.original)}>
                  User Subscription
                </MenuItem>
                <MenuItem onClick={() => openDelete(row.row.original)}>
                  Delete User
                </MenuItem>
              </MenuList>
            </Menu>
            {/* <AiOutlineSetting className="text-xl cursor-pointer" onClick={() => openProfile(row.row.original)}/> */}
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
      <div className="mt-6 lg:w-[70vw] 2xl:w-[75vw]">
        {users && !users?.length && (
          <div className="py-6 flex justify-center">
            <EmptyState2 message="No Users Data Avaivable Yet" />
          </div>
        )}
        {users && !!users?.length && (
          <div className="lg:p-4 w-full">
            <Table columns={columns} data={list} />
          </div>
        )}
      </div>
      {selectedItem && (
        <Modal title="User Profile">
          <ViewUserProfile item={selectedItem} />
        </Modal>
      )}
      {selectedItem && (
        <Subscribe title="User Subscription">
          <ViewSubscriptionProfile item={selectedItem} />
        </Subscribe>
      )}
      <Delete title="Delete User">
        <ReusableModal
        title="Are you sure you want to delete this user"
        cancelTitle="No, Back"
        actionTitle="Yes, Delete"
        action={() => deleteUser(selectedItem)}
        closeModal={() => showDelete(false)}/>
      </Delete>
    </>
  );
};

export default UserInfoTable;
