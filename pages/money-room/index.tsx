'Use Client'
import React, {useState} from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import ChatSidebar from '@/shared/components/money-room/ChatSidebar'
import ChatCover from '@/shared/components/money-room/ChatCover'
import ChatSection from '@/shared/components/money-room/ChatSection'
import io from 'socket.io-client';

const socket = io('https://globfolio-8eb57b28054d.herokuapp.com/');
const MoneyRoomPage:AppPage = () => {
  const [showChat, setShowChat] = useState(false)
  const [activeChat, setActiveChat] = useState<any>()
  const selectActive = (item:any) => {
    setShowChat(true)
    setActiveChat(item)
  }
  return (
    <>
        <div className='w-[98%] mx-auto flex p-2 h-[640px] rounded-[15px]'>
            <div className='w-[250px] bg-primary  rounded-l-[15px]'>
                <ChatSidebar select={selectActive} selected={activeChat}/>
            </div>
            <div className='w-[calc(100%_-_250px)] bg-light rounded-r-[15px]'>
              {
                  !showChat && <ChatCover/>
              }
              {
                  showChat && <ChatSection item={activeChat} socket={socket}/>
              }
            </div>
        </div>
    </>
  )
}

export default MoneyRoomPage
MoneyRoomPage.Layout = 'Dashboard'