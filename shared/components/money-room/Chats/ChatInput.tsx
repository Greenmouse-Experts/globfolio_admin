import { useAppSelector } from "@/shared/redux/store";
import React, { FC, useState, useEffect } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";

interface Props{
  socket: any
  item: any
}
const ChatInput:FC<Props> = ({socket, item}) => {
  const [message, setMessage] = useState('')
  const id = useAppSelector((state) => state.user.user.id)

  const sendMessage = (e:any) => {
    e.preventDefault();
    setMessage(e.target.value)
    if (message !== '') {
      console.log({
        chatroomId: item.id,
        userId: id,
        reload_messages: false,
        message: `${message}`
      });
      
      socket.emit('chatroom_listen', {
        chatroomId: item.id,
        userId: id,
        reload_messages: false,
        message: `${message}`
      });
    }
    setMessage('');
  };

  // const sendMessage = () => {
  //   if (message !== '') {
  //     const __createdtime__ = Date.now();
  //     // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
  //   //   socket.emit('send_message', { user, message, __createdtime__ });
  //     setMessage('');
  //   }
  // };
  return (
    <>
      <div className="px-4 pt-2">
      <div className="border border-gray-600 bg-white flex p-2 items-center rounded-lg">
        <input
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          placeholder="Enter Your Message..."
          className="w-full outline-none"
        />
        <RiSendPlane2Fill
          className="text-2xl text-primary"
          onClick={sendMessage}
        />
      </div>
      </div>
    </>
  );
};

export default ChatInput;
