import {
  saveInitailMsg,
  saveMessages,
} from "@/shared/redux/reducers/ChatSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";
import { ChatData } from "@/shared/types/routine";
import { EmptyState2 } from "@/shared/utils/emptyState";
import React, { FC, useRef, useEffect } from "react";
import { BiTime } from "react-icons/bi";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  socket: any;
}
const PrivateChatDisplay: FC<Props> = ({ socket }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const id = useAppSelector((state) => state.user.user.id);
  const myMsg = useAppSelector((state) => state.chat.messages);
  // Runs whenever a socket event is recieved from the server
  const getMessages = () => {
    socket.on(id, (data: any) => {
      if (data.msgs) {
        // setMessagesReceived([...data?.msgs]);
        const needed = data?.msgs.map(
          ({ afrom, message, createdAt, id }: any) => ({
            sender: afrom.id,
            owner: afrom.fullname,
            message,
            createdAt,
            id,
          })
        );
        console.log(needed);

        dispatch(saveInitailMsg(needed));
      }
    });

    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };
  useEffect(() => {
    getMessages();
  }, [socket]);
  useEffect(() => {
    if (scrollRef.current) {
      console.log("im scrolling");
      scrollRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [socket]);

  const showMsg = [...myMsg];

  const msg = showMsg.sort((first: any, second: any) =>
    second.createdAt.localeCompare(first.createdAt, undefined, {
      numeric: true,
    })
  );
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [myMsg]);

  return (
    <>
      <div className="h-[500px] bg-gray-100 grid content-end">
        {!msg.length && (
          <div className="w-full h-[500px] place-center">
            <EmptyState2 message="No message yet" />
          </div>
        )}
        {!!msg.length && (
          <div
            className="bg-gray-100 py-5 px-5 grid-container chat"
            ref={scrollRef}
          >
            {msg &&
              msg.reverse().map((item: any, index: number) => (
                <div
                  key={index}
                  className={`flex h-auto ${
                    item.sender === id && "justify-end"
                  }`}
                >
                  <div
                    className={`mt-2 p-4 pt-3 rounded-lg ${
                      item.sender === id
                        ? "bg-primary text-white"
                        : "bg-blue-100"
                    }`}
                  >
                    <p className="fw-600 fs-300 mb-1">{item.owner}</p>
                    <p className="fs-500">{item.message}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-x-1">
                        <BiTime
                          className={`text-sm ${
                            item.from === "user" ? "" : "text-gray-500"
                          }`}
                        />
                        <p className="italic text-xs">
                          {dayjs(item.createdAt).fromNow()}
                        </p>
                      </div>
                      <div>
                        {item.status === "delivered" ? (
                          <BsCheck2All
                            className={`text-xl ${
                              item.from === "user" ? "" : "text-gray-500"
                            }`}
                          />
                        ) : (
                          <BsCheckAll
                            className={`text-xl ${
                              item.from === "user" ? "" : "text-gray-500"
                            }`}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
};

export default PrivateChatDisplay;
