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
import ReusableModal from "../UI/ReusableModal";
import { useLazyDeleteChatRoomQuery, useLazySuspendChatRoomQuery } from "@/services/api/chatSlice";
import { toast } from "react-toastify";

interface Props {
  item: any;
  socket: any;
  select: (value:any) => void
  refetchRoom: () => void
}
const ChatSection: FC<Props> = ({ item, socket, select, refetchRoom }) => {
  const {Modal:ViewUser, setShowModal:setViewUser} = useModal()
  const {Modal:ViewFiles, setShowModal:setViewFiles} = useModal()
  const {Modal:Suspend, setShowModal:setShowSuspend} = useModal()
  const {Modal:Delete, setShowModal:setShowDelete} = useModal()
  const [isBusy, setIsBusy] = useState(false)
  const dispatch = useAppDispatch()
  const [suspend] = useLazySuspendChatRoomQuery()
  const [delRoom] = useLazyDeleteChatRoomQuery()
  const [reply, setReply] = useState<any>()
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
  
  // suspend chat room
  const SuspendChatroom = async(item:any) => {
    setIsBusy(true)
    const payload = {
      id: item,
      status: false
    }
    await suspend(payload)
    .then((res:any) => {
      if(res.isSuccess){
        toast.success(res.data.message)
        setShowSuspend(false)
      }else{
        toast.error(res.data.message)
      }
    })
    .catch((err) => {})
  }
  // delete charoom function
  const DeleteChatroom = async(item:any) => {
    setIsBusy(true)
    await delRoom(item)
    .then((res:any) => {
      if(res.isSuccess){
        toast.success(res.data.message)
        setShowDelete(false)
        setIsBusy(false)
        select('')
        refetchRoom()
      }else{
        toast.error(res.data.message)
        setIsBusy(false)
      }
    })
    .catch((err) => {})
  }
  useEffect(() => {
    selectConnect()
  }, [item]);
  console.log(reply);

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
                      className="bg-orange-400 text-white"
                      onClick={() => setShowSuspend(true)}
                    >
                      Suspend Room
                    </MenuItem>
                    <MenuItem
                      className="bg-red-400 text-white mt-2"
                      onClick={() => setShowDelete(true)}
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
          <ChatDisplay socket={socket} roomId={item.id} respond={setReply}/>
          :
          <PrivateChatDisplay socket={socket} roomId={item.id}/>
        )}
        <ChatInput socket={socket} item={item} followPrivate={followUp} response={reply} />
      </div>
      <ViewUser title="Group Users">
          <GroupUsers item={item} close={() => setViewUser(false)} select={select}/>
      </ViewUser>
      <ViewFiles title="View Sent Files" wide>
          <RoomFilesList item={item} close={() => setViewFiles(false)}/>
      </ViewFiles>
      <Suspend title="" noHead>
        <ReusableModal
          title="Are you sure you want to Suspend this Chat room"
          cancelTitle="No, Back"
          actionTitle="Yes, Suspend"
          action={() => SuspendChatroom(item.id)}
          closeModal={() => setShowSuspend(false)}
          isBusy={isBusy}
        />
      </Suspend>
      <Delete title="" noHead>
        <ReusableModal
          title="Are you sure you want to Delete this Chat room"
          cancelTitle="No, Back"
          actionTitle="Yes, Delete"
          action={() => DeleteChatroom(item.id)}
          closeModal={() => setShowDelete(false)}
          isBusy={isBusy}
        />
      </Delete>
    </>
  );
};

export default ChatSection;
