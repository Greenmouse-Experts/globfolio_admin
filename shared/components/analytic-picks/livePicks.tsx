import { picks } from '@/shared/utils/dummyData'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'

const LivePicks = () => {
  return (
    <>
        <div>
            {
                picks && !!picks.length && picks.map((item, index) => (
                    <div className='bg-[#F2F2F2] rounded-[15px] p-4 py-2 flex justify-between items-center mb-5' key={index}>
                        <div className='w-10/12'>
                            <p className='fw-500 fs-500'>{item.name}</p>
                            <div className='flex gap-x-3 mt-2'>
                                <p className='text-green-600 fs-400'>{item.topic}</p>
                                <p className='fs-300'>{item.time}</p>
                            </div>
                        </div>
                        <div>
                            <BsThreeDotsVertical className='cursor-pointer'/>
                        </div>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default LivePicks