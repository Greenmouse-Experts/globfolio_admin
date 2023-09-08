'Use Client'
import React, {useState} from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import ChatSidebar from '@/shared/components/money-room/ChatSidebar'
import ChatCover from '@/shared/components/money-room/ChatCover'
import ChatSection from '@/shared/components/money-room/ChatSection'
import io from 'socket.io-client';
import { useAppDispatch } from '@/shared/redux/store'
import { resetMessages } from '@/shared/redux/reducers/ChatSlice'
import { useGetRoomQuery } from '@/services/api/chatSlice'

const socket = io('https://globfolio-8eb57b28054d.herokuapp.com/');
const MoneyRoomPage:AppPage = () => {
  const [showChat, setShowChat] = useState(false)
  const { data: room, isLoading, refetch:refetchRoom } = useGetRoomQuery();
  const [activeChat, setActiveChat] = useState<any>()
  const dispatch = useAppDispatch()
  const selectActive = (item:any) => {
    setShowChat(true)
    setActiveChat(item)
    dispatch(resetMessages())
  }
  return (
    <>
        <div className='w-[98%] mx-auto flex p-2 h-[640px] rounded-[15px]'>
            <div className='w-[250px] bg-primary  rounded-l-[15px]'>
                <ChatSidebar select={selectActive} selected={activeChat} socket={socket} room={room} refetch={refetchRoom}/>
            </div>
            <div className='w-[calc(100%_-_250px)] bg-light rounded-r-[15px]'>
              {
                  !showChat && <ChatCover/>
              }
              {
                  showChat && <ChatSection select={selectActive} item={activeChat} socket={socket} refetchRoom={refetchRoom}/>
              }
            </div>
        </div>
    </>
  )
}

export default MoneyRoomPage
MoneyRoomPage.Layout = 'Dashboard'