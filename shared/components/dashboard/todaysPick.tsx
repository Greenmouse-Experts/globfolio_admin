import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { RiArrowUpSFill } from 'react-icons/ri'

const TodaysPickComp = () => {
  return (
    <>
        <div>
            <div className='flex justify-between items-center'>
            <p className='fw-600 fs-700'>Today&apos;s Pick</p>
            <BsThreeDotsVertical/>
            </div>
            <div className='mt-6'>
                <div className='grid grid-cols-3'>
                    <p className='fw-500'>Apple</p>
                    <div>

                    </div>
                    <div className='text-end'>
                        <p className='fw-500 fs-700'>$30,345.21</p>
                        <div className='flex items-center justify-end text-green-600 gap-x-2 mt-2'>
                            <RiArrowUpSFill/>
                            <p>+4.27%</p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-3'>
                    <p className='fw-500'>Apple</p>
                    <div>
                    </div>
                    <div className='text-end'>
                        <p className='fw-500 fs-700'>$30,345.21</p>
                        <div className='flex items-center justify-end text-green-600 gap-x-2 mt-2'>
                            <RiArrowUpSFill/>
                            <p>+4.27%</p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-3'>
                    <p className='fw-500'>Telsa</p>
                    <div>
                    </div>
                    <div className='text-end'>
                        <p className='fw-500 fs-700'>$7,345.21</p>
                        <div className='flex items-center justify-end text-green-600 gap-x-2 mt-2'>
                            <RiArrowUpSFill/>
                            <p>+4.27%</p>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-3 mt-3'>
                    <p className='fw-500'>Netflix</p>
                    <div>
                    </div>
                    <div className='text-end'>
                        <p className='fw-500 fs-700'>$5,345.21</p>
                        <div className='flex items-center justify-end gap-x-2 mt-2 text-red-600'>
                            <RiArrowUpSFill/>
                            <p>+4.27%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default TodaysPickComp