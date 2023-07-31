import React, {useState} from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import Tabs from '@/shared/components/UI/Tabs'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useGetNotifyQuery } from '@/services/api/routineSlice'
import { NotifyItem } from '@/shared/types/routine'
import Initials from '@/shared/utils/initials'
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const NotificationPage:AppPage = () => {
  const {data, isLoading} = useGetNotifyQuery()
  const [limit, setLimit] = useState(10)
  const unread = data?.data?.filter((where:any) => where.isRead === true)
  const NotifyItems = ({item, index}: {item:NotifyItem, index:number}) => {
    return(
        <div className={`bg-[#F6F7FB] rounded-xl p-2 lg:p-4 mt-4 flex justify-between items-center ${item.isRead && "border border-l-[5px] border-orange-600"}`} key={index}>
          <div className='flex gap-x-3'>
          <div className='mt-1'>
          <Initials name={"Super Admin"} size={40} text="12"/>
          </div>
          <div>
            <p className='pr-2'>{item.message}</p>
            <p className='italic fs-300 mt-1'>{dayjs(item.createdAt).fromNow()}</p>
          </div>
          </div>
          <div>
            <BsThreeDotsVertical className='cursor-pointer'/>
          </div>
        </div>
    )
  }
  const tab = [
    {
      title: <p className='flex items-center gap-x-4'>All <span className='block grid place-content-center h-6 w-6 fw-500 bg-[#F2F2F2]'>{data?.data && data?.data.length}</span></p>,
      content: 
      <div>
          {
            data && !!data?.data?.length && data?.data?.slice(0,limit).map((item:NotifyItem, index:number) => <NotifyItems item={item} index={index} key={index}/>)
          }
      </div>
    },
    {
      title: <p className='flex items-center gap-x-4'>Unread <span className='block grid place-content-center h-6 w-6 fw-500 bg-[#F2F2F2]'>{unread?.length}</span></p>,
      content: 
      <div>
          {
            data && !!data?.data?.length && data?.data?.slice(0,limit).map((item:NotifyItem, index:number) => <NotifyItems item={item} index={index} key={index}/>)
          }
      </div>
    }
  ]
  return (
    <>
        <div>
            <div className='mt-3 lg:mt-8 lg:w-9/12 xl:w-8/12 mx-auto bg-white p-5 min-h-[400px] rounded-[20px]'>
              <Tabs tabs={tab}/>
            </div>
        </div>
    </>
  )
}

export default NotificationPage
NotificationPage.Layout = 'Dashboard'