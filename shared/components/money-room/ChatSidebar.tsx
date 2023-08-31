'use client'
import React, {FC} from "react";
import Tabs from "../UI/Tabs";
import UsersList from "./UsersList";
import RoomList from "./RoomList";

interface Props {
  select: (value:any) => void
  selected: any
  socket: any
}
const ChatSidebar:FC<Props> = ({select, selected, socket}) => {
  const tab = [
    {
      title: <p>Inbox</p>,
      content: <UsersList select={select} selected={selected} socket={socket}/>,
    },
    {
      title: <p>Chat Room</p>,
      content: <RoomList select={select} selected={selected}/>,
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
