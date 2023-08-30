import React, { FC, useState, useEffect } from "react";
import ChatDisplay from "./Chats/ChatDisplay";
import ChatInput from "./Chats/ChatInput";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";
import { InfinityLoader } from "../UI/Loading";
import { saveInitailMsg, saveMessages } from "@/shared/redux/reducers/ChatSlice";
import { ChatData } from "@/shared/types/routine";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Menu, MenuHandler, MenuItem, MenuList, Button } from "../UI/dropdown";
import useModal from "@/hooks/useModal";
import GroupUsers from "./GroupUsers";

interface Props {
  item: any;
  socket: any;
}
const ChatSection: FC<Props> = ({ item, socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState<any[]>([]);
  const {Modal:ViewUser, setShowModal:setViewUser} = useModal()
  const dispatch = useAppDispatch();
  const savedMsg = useAppSelector((state) => state.chat.messages);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const id = useAppSelector((state) => state.user.user.id);
  console.log(messagesRecieved);
  
  useEffect(() => {
    setLoading(true);
    const data = {
      chatroomId: item.id,
      userId: id,
      reload_messages: true,
    };
    if (data.userId !== "" && data.chatroomId !== "") {
      socket.emit("chatroom_listen", data);
      setLoading(false);
    }
  }, [item]);
  // Runs whenever a socket event is recieved from the server
  const getMessages = () => {
    setLoading(true);
    socket.on("chatroom_messages", (data: any) => {
      if (data.msgs) {
        setMessagesReceived([...data?.msgs]);
        const needed = data?.msgs.map(
          ({ sender, owner, message, createdAt, id }: any) => ({
            sender,
            owner: owner.fullname,
            message,
            createdAt,
            id,
          })
        );
        dispatch(saveInitailMsg(needed));
        setLoading(false);
      } else {
        const add = [{
          sender: data.msg.sender,
          owner: data.msg.owner.fullname,
          message: data.msg.message,
          createdAt: data.msg.createdAt,
          id: data.msg.id,
        }];
        setMessagesReceived(add);
        console.log(add);
        dispatch(saveMessages(add));
        console.log(savedMsg);
        setLoading(false);
      }
    });

    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };
  useEffect(() => {
    getMessages();
    // setMessages([...messagesRecieved]);
  }, [socket]);

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
          <ChatDisplay messages={messagesRecieved} comp={messages} />
        )}
        <ChatInput socket={socket} item={item} />
      </div>
      <ViewUser title="Group Users">
          <GroupUsers item={item} close={() => setViewUser(false)}/>
      </ViewUser>
    </>
  );
};

export default ChatSection;
