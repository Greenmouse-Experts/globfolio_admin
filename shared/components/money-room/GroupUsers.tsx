import { useGetRoomUsersQuery, useLazyAssignUserQuery, useLazyBanMemberQuery } from "@/services/api/chatSlice";
import Initials from "@/shared/utils/initials";
import React, { FC } from "react";
import { InfinityLoader } from "../UI/Loading";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "../../../shared/components/UI/dropdown";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toast } from "react-toastify";
import Image from "next/image";
interface Props {
  item: any;
  close: () => void;
  select: (value: any) => void;
}
const GroupUsers: FC<Props> = ({ item, close, select }) => {
  const [assign] = useLazyAssignUserQuery()
  const [ban] = useLazyBanMemberQuery()
  const { data, isLoading, refetch } = useGetRoomUsersQuery(item.id);
  const chatUser = (item:any) => {
    select(item)
    close()
  }
  const banUser = async (id:string, status:boolean) => {
    const payload = {
      memberId: id,
      chatroomId: item.id,
      status: status
    }
    await ban(payload)
    .then((res:any) => {
      if(res.isSuccess){
        toast.success(res.data.message)
        refetch()
      }else{
        toast.error(res.data.message)
      }
    })
    .catch((err) => {})
  }
  const makeAdmin = async (id:string, status:boolean) => {
    const payload = {
      memberId: id,
      chatroomId: item.id,
      status: status
    }
    await assign(payload)
    .then((res:any) => {
      if(res.isSuccess){
        toast.success(res.data.message)
        refetch()
      }else{
        toast.error(res.data.message)
      }
    })
    .catch((err) => {})
  }
  return (
    <div className="h-[400px] overflow-y-auto">
      {isLoading && (
        <div className="h-full place-center">
          <InfinityLoader size="200" />
        </div>
      )}
      {data &&
        !!data?.data?.length &&
        data.data.map((item: any, i: number) => (
          <div className="flex items-center justify-between  gap-x-2 mb-2 pb-2 border-b" key={i}>
            <div className="flex gap-x-2" onClick={() => chatUser(item.user)}>
              {
                item.user.picture?
                <Image src={item.user.picture.secure_url} alt="avatar" width={60} height={60} className="w-12 h-12 circle"/>
                :
            <Initials name={item.user.fullname} size={44} text="14" />
              }
            <div>
              <p className="fs-400 fw-600">{item.user.fullname} {item.ismoderator && <span className="bg-green-700 text-white px-2 text-xs fw-600">moderator</span>} {item.isbanned && <span className="bg-red-500 text-white px-2 text-xs fw-600">banned</span>}</p>
              <p className="fw-600 fs-300 text-gray-600">{item.user.email}</p>
            </div>
            </div>
            <Menu placement="bottom-end">
            <MenuHandler>
              <Button className="p-3 bg-transparent !shadow-none">
                <BsThreeDotsVertical className="cursor-pointer text-black" />
              </Button>
            </MenuHandler>
            <MenuList className="p-2 index-30">
              {
                item.ismoderator?
                <MenuItem className="bg-red-500 text-white"
              onClick={() => makeAdmin(item.user.id, false)}>
                 Remove Role
              </MenuItem>
              :
              <MenuItem className="bg-green-700 text-white"
              onClick={() => makeAdmin(item.user.id, true)}>
                Make Admin
              </MenuItem>
              }
              {
                item.isbanned? 
                <MenuItem
                className="bg-green-700 text-white mt-[4px]"
                onClick={() => banUser(item.user.id, false)}
              >
                Permit
              </MenuItem>
              :
                <MenuItem
                className="bg-red-500 text-white mt-[4px]"
                onClick={() => banUser(item.user.id, true)}
              >
                Kick Out
              </MenuItem>}
            </MenuList>
          </Menu>
          </div>
        ))}
    </div>
  );
};

export default GroupUsers;
