import {
  saveInitailMsg,
  saveMessages,
} from "@/shared/redux/reducers/ChatSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";
import {
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Button,
} from "../../UI/dropdown";
import React, { FC, useRef, useEffect, useState } from "react";
import { BiTime } from "react-icons/bi";
import { BsCheck2All, BsCheckAll } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FcCancel } from "react-icons/fc";
import { formatFile, isImage, isLink, parseData } from "@/shared/utils/format";
import Image from "next/image";
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
  socket: any;
}
const ChatDisplay: FC<Props> = ({ socket }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useAppDispatch();
  const [reply, setReply] = useState(false);
  const [replyItem, setReplyItem] = useState<any>();
  const savedMsg = useAppSelector((state) => state.chat.messages);
  // Runs whenever a socket event is recieved from the server
  const getMessages = () => {
    socket.on("chatroom_messages", (data: any) => {
      if (data.msgs) {
        console.log(data);

        const needed = data?.msgs.map(
          ({ sender, owner, message, createdAt, id, files }: any) => ({
            sender,
            owner: owner.fullname,
            message,
            createdAt,
            id,
            files,
          })
        );
        dispatch(saveInitailMsg(needed));
      } else {
        const add = [
          {
            sender: data.msg.sender,
            owner: data.msg.owner.fullname,
            message: data.msg.message,
            createdAt: data.msg.createdAt,
            id: data.msg.id,
            files: data.msg.files,
          },
        ];
        dispatch(saveMessages(add));
      }
    });

    // Remove event listener on component unmount
    return () => socket.off("chatroom_listen");
  };
  useEffect(() => {
    getMessages();
  }, [socket]);

  const id = useAppSelector((state) => state.user.user.id);
  const myMsg = useAppSelector((state) => state.chat.messages);
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
    closeReply();
  }, [myMsg]);

  const replyMessage = (item: any) => {
    setReplyItem(item);
    setReply(true);
  };
  const closeReply = () => {
    setReplyItem("");
    setReply(false);
  };

  return (
    <>
      <div className="h-[500px] relative bg-gray-100 grid content-end">
        <div
          className="bg-gray-100 py-5 px-5 grid-container chat"
          ref={scrollRef}
        >
          {msg &&
            msg.reverse().map((item: any, index: number) => (
              <div
                key={index}
                className={`flex h-auto ${item.sender === id && "justify-end"}`}
              >
                <div
                  className={`mt-2 p-4 pt-3 ${
                    item.sender === id
                      ? "bg-primary text-white rounded-l-[10px] rounded-b-[10px]"
                      : "bg-blue-100 rounded-b-[10px] rounded-r-[10px]"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className="fw-600 fs-300 mb-1">{item.owner}</p>
                    <div>
                      <Menu>
                        <MenuHandler>
                          <Button className="p-0 bg-transparent !shadow-none">
                            <RiArrowDropDownLine className="cursor-pointer text-gray-600 text-3xl" />
                          </Button>
                        </MenuHandler>
                        <MenuList className="p-2">
                          <MenuItem onClick={() => replyMessage(item)}>
                            Reply
                          </MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                  </div>
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
        {reply && (
          <div className="absolute bottom-0 left-0 w-full px-3">
            <div className="bg-white p-4 shadow relative rounded-t-[8px]">
              <p className="text-left">{replyItem?.message}</p>
              <FcCancel
                className="absolute top-2 right-5 curpointer text-2xl"
                onClick={closeReply}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatDisplay;
