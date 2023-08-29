import { useAppSelector } from '@/shared/redux/store'
import React, {FC, useRef, useEffect} from 'react'
import { BiTime } from 'react-icons/bi'
import { BsCheck2All, BsCheckAll } from 'react-icons/bs'
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props{
    messages: any
    comp: any
}
const ChatDisplay:FC<Props> = ({messages, comp}) => {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        if (scrollRef.current) {
            console.log('im scrolling');
            scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }, [messages ]);
    //   console.log(messages);
    //   console.log(comp);
      
    const id = useAppSelector((state) => state.user.user.id)
    // const myMsg = useAppSelector((state) => state.chat.messages)
   const msg = messages.sort((first:any, second:any) => second.createdAt.localeCompare(first.createdAt, undefined, { numeric: true }));
   
  return (
    <>
    <div className='h-[500px] bg-gray-100 grid content-end' >
            <div className='bg-gray-100 py-5 px-5 grid-container chat'  ref={scrollRef}>
                {
                    msg && msg.reverse().map((item:any, index:number) => (
                        <div key={index} className={`flex h-auto ${item.sender === id && 'justify-end'}`}>
                            <div className={`mt-2 p-4 pt-3 rounded-lg ${item.sender === id? 'bg-primary text-white' : 'bg-blue-100'}`}>
                                <p className='fw-600 fs-300 mb-1'>{item.owner.fullname}</p>
                            <p className='fs-500'>{item.message}</p>
                            <div className='flex justify-between items-center mt-2'>
                            <div className='flex items-center gap-x-1'>
                                <BiTime className={`text-sm ${item.from === "user"? '' : 'text-gray-500'}`}/>
                            <p className='italic text-xs'>{dayjs(item.createdAt).fromNow()}</p>
                            </div>
                            <div>
                                {
                                    item.status === "delivered"?  <BsCheck2All className={`text-xl ${item.from === "user"? '' : 'text-gray-500'}`}/> : <BsCheckAll className={`text-xl ${item.from === "user"? '' : 'text-gray-500'}`}/>
                                }
                            </div>
                            </div>
                        </div>
                        </div>
                    ))
                }
            </div>
            </div>
    </>
  )
}

export default ChatDisplay
const dummyMsg = [
    {
        chat: "Hello, What is the issue with my product",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "Hello, We are working on resolving the issue",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    },
    {
        chat: "How long will this take",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "I need to complete this project on time",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "We're on it, you will get it before the day is over",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    },
    {
        chat: "Hello, We are working on resolving the issue",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    },
    {
        chat: "How long will this take",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "I need to complete this project on time",
        status: "delivered",
        from: "user",
        time: "2 hours ago"
    },
    {
        chat: "We're on it, you will get it before the day is over",
        status: "delivered",
        from: "admin",
        time: "2 hours ago"
    }
]