import React, {FC, useEffect, useState} from 'react'
import Image from 'next/image'
import { useGetPreviousQuery, useLazyGetUserQueryQuery } from '@/services/api/chatSlice'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/shared/redux/store'
import { formatFile, parseData } from '@/shared/utils/format'

interface Props {
    select: (value:any) => void
    selected: any
    socket:any
  }
const UsersList:FC<Props> = ({select, selected, socket}) => {
        
    const [myUsers, setMyUsers] = useState<any[]>()
    const {data:last, isLoading} = useGetPreviousQuery()
    const [searchQuery, setSearchQuery] = useState('');
    const [getUser] = useLazyGetUserQueryQuery()
    const id = useAppSelector((state) => state.user.user.id)
    const searchUser = async(e: { target: { value: string; }; }) => {
        setSearchQuery(e.target.value)
        await getUser(e.target.value)
        .then((res:any) => {
            if(res.isSuccess){
                setMyUsers(res.data.data)
            }else{
                toast.error('Unable to get users')
            }
        })
        .catch(() => {})
    }
    useEffect(() => {
        socket.emit("chatroom_listen", id);
  }, []);
  useEffect(() => {
    socket.on(id, (data: any) => {
        console.log(data);
    })
  }, [socket])
    // const recent = last?.data?.filter((where:any) => where.afrom)
//     console.log(recent);
    
//    const formatSender = (item:any) => {
//     if(item.afrom.id === id){
//         return item.ato
//     }else return item.afrom
//    }
    
  return (
    <>
        <div className='text-white mt-3'>
            <div>
            <div>
                <input type='search' value={searchQuery} placeholder='search' onChange={searchUser} className='bg-[#1F2937] p-2 rounded-lg'/>
            </div>
            </div>
            <div className='text-white mt-6 h-[450px] overflow-y-auto scroll-pro'>
                {(searchQuery === "") && <ul>
                    {
                        last && !!last.data.length && last.data.map((item:any, i:number) => (
                            <li key={i} className={`flex gap-x-2 mb-2 cursor-pointer rounded-lg hover:bg-[#1F2937] p-2 ${item.name === item.scontact.fullname && `bg-[#1F2937]`}`} onClick={ () => select({fullname: item.scontact.fullname, id:item.scontact.id})}>
                                <Image src={item.scontact.picture? item.scontact.picture : 'https://res.cloudinary.com/greenmouse-tech/image/upload/v1693229127/globfolio/Group_48368_1_y0m8ah.png'} alt='profile' width={80} height={80} className='w-10 h-10 circle'/>
                                <div>
                                    <p className='text-white fw-500 fs-300'>{item.scontact.fullname}</p> 
                                    <p className='whitespace-nowrap fs-200 text-gray-400'>{item.lastMessage}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>}
                {
                    (!!myUsers?.length && searchQuery !== "") && <ul>
                    {
                        myUsers.map((item) => (
                            <li key={item.id} className={`flex gap-x-2 mb-2 cursor-pointer rounded-lg hover:bg-[#1F2937] p-2 ${item.fullname === selected?.fullname && `bg-[#1F2937]`}`} onClick={ () => select(item)}>
                                <Image src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1692619891/globfolio/Ellipse_1366_rimyab.png' alt='profile' width={80} height={80} className='w-10'/>
                                <div>
                                    <p className='text-white fw-500 fs-300'>{item.fullname}</p>
                                </div>
                            </li>
                        ))
                    }
                </ul>
                }
            </div>
        </div>
    </>
  )
}

export default UsersList
const dummyUsers = [
    {
        name: "Jessica Anwa",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1692619891/globfolio/Ellipse_1366_rimyab.png"
    },
    {
        name: "Nimbod Hiner",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1692619891/globfolio/Ellipse_1367_sgasi7.png"
    },
    {
        name: "Kilet Burner",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1692619891/globfolio/Ellipse_1370_bgvzy9.png"
    },
    {
        name: "Milet Turner",
        img: "https://res.cloudinary.com/greenmouse-tech/image/upload/v1689167035/globfolio/Group_48399_mxhgen.png"
    },
]