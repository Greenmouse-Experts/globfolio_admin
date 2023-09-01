import React, { FC, useState, useEffect } from "react";
import ChatDisplay from "./Chats/ChatDisplay";
import ChatInput from "./Chats/ChatInput";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";
import { InfinityLoader } from "../UI/Loading";
import { saveMessages } from "@/shared/redux/reducers/ChatSlice";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuHandler, MenuItem, MenuList, Button } from "../UI/dropdown";
import useModal from "@/hooks/useModal";
import GroupUsers from "./GroupUsers";
import PrivateChatDisplay from "./Chats/PrivateChatDisplay";
import RoomFilesList from "./RoomFilesList";

interface Props {
  item: any;
  socket: any;
  select: (value:any) => void
}
const ChatSection: FC<Props> = ({ item, socket, select }) => {
  const {Modal:ViewUser, setShowModal:setViewUser} = useModal()
  const {Modal:ViewFiles, setShowModal:setViewFiles} = useModal()
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false);
  const id = useAppSelector((state) => state.user.user.id);
  const followUp = () => {
    socket.on('private_messages', (data: any) => {
    const add = [{
      sender: data.msg.afrom.id,
      owner: data.msg.afrom.fullname,
      message: data.msg.message,
      createdAt: data.msg.createdAt,
      id: data.msg.id,
      files: data.msg.files
    }];
    dispatch(saveMessages(add));
  })
  }
  const selectConnect = () => {
    setLoading(true)
    if(item.userId){
      const data = {
        chatroomId: item.id,
        userId: id,
        reload_messages: true,
      };
      if (data.userId !== "" && data.chatroomId !== "") {
        socket.emit("chatroom_listen", data);
        setLoading(false);
      }
    }else{
      const data = {
        to : item.id,
        from: id,
        reload_messages: true,
      };
      if (data.to !== "" && data.from !== "") {
        socket.emit("chatroom_listen", data);
        setLoading(false);
      }
    }
  }
  
  useEffect(() => {
    selectConnect()
  }, [item]);
  

  return (
    <>
      <div>
        <div className="px-6 py-2 bg-white flex justify-between">
          <div className="flex gap-x-2 items-center">
            <Image
              src={
                item.img
                  ? item.img
                  : "https://res.cloudinary.com/greenmouse-tech/image/upload/v1693229127/globfolio/Group_48368_1_y0m8ah.png"
              }
              alt="profile"
              width={80}
              height={80}
              className="w-12"
            />
            <div>
              <p className="fw-600 fs-500">
                {item?.name
                  ? item.name
                  : item.fullname
                  ? item.fullname
                  : item.title
                  ? item.title
                  : ""}
              </p>
            </div>
          </div>
          <Menu placement="bottom-end">
                  <MenuHandler>
                    <Button className="p-3 bg-transparent !shadow-none">
                      <BsThreeDotsVertical className="cursor-pointer text-black" />
                    </Button>
                  </MenuHandler>
                  <MenuList className="p-2">
                    <MenuItem onClick={() => setViewUser(true)}>View Users</MenuItem>
                    <MenuItem onClick={() => setViewFiles(true)}>View Files</MenuItem>
                    <MenuItem
                      className="bg-red-400 text-white"
                      // onClick={() => openDelete(item.id)}
                    >
                      Delete Room
                    </MenuItem>
                  </MenuList>
                </Menu>
        </div>
        {loading && (
          <div className="h-[500px] place-center">
            <InfinityLoader size="200" />
          </div>
        )}
        {!loading && (
          item.userId? 
          <ChatDisplay socket={socket} />
          :
          <PrivateChatDisplay socket={socket}/>
        )}
        <ChatInput socket={socket} item={item} followPrivate={followUp} />
      </div>
      <ViewUser title="Group Users">
          <GroupUsers item={item} close={() => setViewUser(false)} select={select}/>
      </ViewUser>
      <ViewFiles title="View Sent Files" wide>
          <RoomFilesList item={item} close={() => setViewFiles(false)}/>
      </ViewFiles>
    </>
  );
};

export default ChatSection;
