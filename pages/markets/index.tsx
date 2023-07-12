import React from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import { market, stock } from '@/shared/utils/dummyData'
import MarketOverviewChart from '@/shared/components/dashboard/marketComp'
import Image from 'next/image'
import { IoAddCircle } from 'react-icons/io5'
import TopValuelistTable from '@/shared/components/market/ValueListTable'


const MarketsPage: AppPage = () => {
  return (
    <>
        <div>
            <div className='bg-primary rounded-xl grid grid-cols-6 px-6 py-2 lg:py-6'>
                {
                  market && !!market.length && market.map((item, index) => (
                    <div className='flex gap-x-5 text-white' key={index}>
                        <div>
                          <p className='fw-500'>{item.name}</p>
                          <p className='fs-500 mt-1'>{item.price}</p>
                        </div>
                        <div>
                          <p>{item.percent}</p>
                          <p className='text-green-600'>_________</p>
                        </div>
                    </div>
                  ))
                }
            </div>
            <div className="mt-6 lg:mt-10 p-6 bg-white rounded-[10px]">
            <MarketOverviewChart/>
          </div>
          <div className='grid lg:grid-cols-12 gap-12 mt-6 lg:mt-10'>
                <div className='col-span-7 bg-white rounded-[10px]'>
                <p className='p-6 border-b text-xl fw-600'>Latest Stock Rates</p>
                  <div className='p-6'>
                  <TopValuelistTable/>
                  </div>
                </div>
                <div className='col-span-5 bg-white rounded-[10px]'>
                    <p className='p-6 border-b text-xl fw-600'>Top Value List</p>
                    <div className='p-6 my-2'>
                      {
                        stock && !!stock.length && stock.map((item, index) => (
                          <div className='grid grid-cols-3 items-center mb-6' key={index}>
                              <div className='flex gap-x-3 items-center'>
                                <Image src={item.image} alt='image' width={100} height={100} className='w-12 h-12'/>
                                <p className='fw-500'>{item.name}</p>
                              </div>
                              <div>
                                <p>{item.amount}</p>
                              </div>
                              <div className='flex items-center gap-x-2 text-green-600 fw-500'>
                                <IoAddCircle className='text-xl text-green-600'/>
                                <p>{item.add}</p>
                              </div>
                          </div>
                        ))
                      }
                    </div>
                </div>
          </div>
        </div>
    </>
  )
}

export default MarketsPage
MarketsPage.Layout = 'Dashboard'