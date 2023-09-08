'use client'
import React, {FC} from "react";
import Tabs from "../UI/Tabs";
import UsersList from "./UsersList";
import RoomList from "./RoomList";

interface Props {
  select: (value:any) => void
  selected: any
  socket: any
  room: any
  refetch: () => void
}
const ChatSidebar:FC<Props> = ({select, selected, socket, room, refetch}) => {
  const tab = [
    {
      title: <p>Inbox</p>,
      content: <UsersList select={select} selected={selected} socket={socket}/>,
    },
    {
      title: <p>Chat Room</p>,
      content: <RoomList select={select} selected={selected} room={room} refetch={refetch}/>,
    },
  ];
  return (
    <>
      <div className="p-5">
        <Tabs tabs={tab} chat/>
      </div>
    </>
  );
};

export default ChatSidebar;
