import React, { FC, useState, useEffect } from "react";
import ChatDisplay from "./Chats/ChatDisplay";
import ChatInput from "./Chats/ChatInput";
import Image from "next/image";
import { useAppSelector } from "@/shared/redux/store";

interface Props {
  item: any;
  socket: any
}
const ChatSection: FC<Props> = ({ item, socket }) => {
  const [messagesRecieved, setMessagesReceived] = useState<any[]>([]);
  const id = useAppSelector((state) => state.user.user.id)
  useEffect(() => {
    const data = {
      chatroomId: item.id,
      userId: id,
      reload_messages: true
    }
    if (data.userId !== '' && data.chatroomId !== '') {
      console.log(data);
      socket.emit('chatroom_listen', data);
    }
  }, [item])
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('chatroom_messages', (data:any) => {
      setMessagesReceived((state:any[]) => [
        ...data?.msgs
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  return (
    <>
      <div>
        <div className="px-6 py-2 bg-white flex">
          <div className="flex gap-x-2 items-center">
            <Image
              src={item.img? item.img : 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1693229127/globfolio/Group_48368_1_y0m8ah.png'}
              alt="profile"
              width={80}
              height={80}
              className="w-12"
            />
            <div>
              <p className="fw-600 fs-500">{item?.name? item.name : item.fullname?  item.fullname :  item.title? item.title : ""}</p>
            </div>
          </div>
        </div>
        <ChatDisplay messages={messagesRecieved}/>
        <ChatInput socket={socket}/>
      </div>
    </>
  );
};

export default ChatSection;
