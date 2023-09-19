import {
  saveInitailMsg,
  saveMessages,
} from "@/shared/redux/reducers/ChatSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";
import { ChatData } from "@/shared/types/routine";
import { EmptyState2 } from "@/shared/utils/emptyState";
import { isFile, isImage, isLink } from "@/shared/utils/format";
import Image from "next/image";
import React, { FC, useRef, useEffect } from "react";
import { AiOutlineFileText } from "react-icons/ai";
import { BiTime } from "react-icons/bi";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  socket: any;
  roomId: any
}
const PrivateChatDisplay: FC<Props> = ({ socket, roomId }) => {
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
          ({ afrom, message, createdAt, id, files, areplyTo }: any) => ({
            sender: afrom.id,
            owner: afrom.fullname,
            message,
            createdAt,
            id,
            files,
            reply: areplyTo
          })
        );
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
  const viewRef = useRef<HTMLDivElement | null>(null);
  const goToView = (id:any) => {
    const container = document.getElementById(id);
    container?.scrollIntoView({ behavior: 'smooth' });
};
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
                    ref={viewRef}
                  id={item.id}
                  >
                    <p className="fw-600 fs-300 mb-1">{item.owner}</p>
                    <div>
                    {item?.reply?.id ? (
                    item.sender === id ? (
                      <div className="bg-gray-800 mb-2" onClick={() => goToView(item.reply.id)}>
                        <div className="fs-500 border-l-2 p-2">
                          {!!item?.reply?.files?.length && isImage(item.reply.files[0]) && (
                      <div>
                        <Image
                          src={item.reply.files[0]}
                          alt="msg"
                          width={300}
                          height={400}
                          className="w-6 circle"
                        />
                      </div>)}
                          {item?.reply.message}
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-100 mb-2" onClick={() => goToView(item.reply.id)}>
                        <div className="fs-500 border-l-[3px] border-blue-500 p-2">
                        {!!item?.reply?.files?.length && isImage(item.reply.files[0]) && (
                      <div>
                        <Image
                          src={item.reply.files[0]}
                          alt="msg"
                          width={300}
                          height={400}
                          className="w-6 circle"
                        />
                      </div>)}
                          {item?.reply.message}
                        </div>
                      </div>
                    )
                  ) : (
                    ""
                  )}
                     <div>
                    {!!item?.files?.length && isImage(item.files[0]) ? (
                      <div>
                        <Image
                          src={item.files[0]}
                          alt="msg"
                          width={300}
                          height={400}
                          className="w-48"
                        />
                      </div>
                    ) : isFile(item.files[0]) ? (
                      <a
                        href={item.files[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="my-2"
                      >
                        <AiOutlineFileText className="text-7xl mx-auto opacity-70" />
                      </a>
                    ) : (
                      ""
                    )}
                  </div>
                  <p className="fs-500">
                    {isLink(item.message) ? (
                      <a
                        href={item.message}
                        target="_blank"
                        className="fw-500 text-blue-700"
                        rel="noopener noreferrer"
                      >
                        {item.message}
                      </a>
                    ) : (
                      item.message
                    )}
                  </p>
                  </div>
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
