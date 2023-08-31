import { useGetRoomUsersQuery } from "@/services/api/chatSlice";
import Initials from "@/shared/utils/initials";
import React, { FC } from "react";
import { InfinityLoader } from "../UI/Loading";
interface Props {
  item: any;
  close: () => void;
  select: (value: any) => void;
}
const GroupUsers: FC<Props> = ({ item, close, select }) => {
  const { data, isLoading } = useGetRoomUsersQuery(item.id);
  const chatUser = (item:any) => {
    select(item)
    close()
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
          <div className="flex items-center gap-x-2 mb-2 pb-2 border-b" key={i} onClick={() => chatUser(item.user)}>
            <Initials name={item.user.fullname} size={44} text="14" />
            <div>
              <p className="fs-400 fw-600">{item.user.fullname}</p>
              <p className="fw-600 fs-300 text-gray-600">{item.user.email}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default GroupUsers;
