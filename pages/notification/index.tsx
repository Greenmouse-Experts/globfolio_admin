import React from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import { notify } from '@/shared/utils/dummyData'
import Tabs from '@/shared/components/UI/Tabs'
import Initials from '@/shared/utils/initials'
import { BsThreeDotsVertical } from 'react-icons/bs'

const NotificationPage:AppPage = () => {
  const unread = notify.filter((where:any) => where.status === "unread")
  const NotifyItem = ({item, index}: {item:any, index:number}) => {
    return(
        <div className={`bg-[#F6F7FB] rounded-xl p-2 lg:p-4 mt-4 flex justify-between items-center ${item.status === 'unread'? "border border-l-[5px] border-orange-600" : ""}`} key={index}>
          <div className='flex gap-x-3 items-center'>
          <Initials name={item.name} size={45} text='15'/>
          <div>
            <p>{item.message}</p>
            <p className='italic fs-300 mt-1'>{item.time}</p>
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
      title: <p className='flex items-center gap-x-4'>All <span className='block grid place-content-center h-6 w-6 fw-500 bg-[#F2F2F2]'>6</span></p>,
      content: 
      <div>
          {
            notify && !!notify.length && notify.map((item, index) => <NotifyItem item={item} index={index} key={index}/>)
          }
      </div>
    },
    {
      title: <p className='flex items-center gap-x-4'>Unread <span className='block grid place-content-center h-6 w-6 fw-500 bg-[#F2F2F2]'>3</span></p>,
      content: 
      <div>
          {
            unread && !!unread.length && unread.map((item, index) => <NotifyItem item={item} index={index} key={index}/>)
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