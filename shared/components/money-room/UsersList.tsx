import React, {FC, useEffect, useState} from 'react'
import Image from 'next/image'
import { useLazyGetUserQueryQuery } from '@/services/api/chatSlice'
import { toast } from 'react-toastify'
import { useAppSelector } from '@/shared/redux/store'

interface Props {
    select: (value:any) => void
    selected: any
    socket:any
  }
const UsersList:FC<Props> = ({select, selected, socket}) => {
    const [myUsers, setMyUsers] = useState<any[]>()
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
                    {/* {
                        dummyUsers.map((item) => (
                            <li key={item.name} className={`flex gap-x-2 mb-2 cursor-pointer rounded-lg hover:bg-[#1F2937] p-2 ${item.name === selected?.name && `bg-[#1F2937]`}`} onClick={ () => toast.info('User not active')}>
                                <Image src={item.img} alt='profile' width={80} height={80} className='w-10'/>
                                <div>
                                    <p className='text-white fw-500 fs-300'>{item.name}</p>
                                </div>
                            </li>
                        ))
                    } */}
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