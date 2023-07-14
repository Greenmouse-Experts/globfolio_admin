import React from 'react'
import Tabs from '@/shared/components/UI/Tabs'
import { AppPage } from '@/shared/components/layouts/Types'
import { FaPlus } from 'react-icons/fa'
import WatchlistTable from '@/shared/components/top-gainer/watchlistTable'


const TopGainersPage:AppPage = () => {
    const tab = [
        {
            title: <p>My List #1</p>,
            content: <WatchlistTable/>
        },
    ]
  return (
    <>
        <div className='mt-5 lg:mx-6'>
            <div className='bg-white p-5 rounded-[10px] relative'>
                <Tabs tabs={tab} users/>
                <p className='hidden lg:block absolute text-[#5F5F5F] top-8 right-6 fs-300'>52 items; Updated 06/07/2023 at 2:30 PM.</p>
            </div>
        </div>
    </>
  )
}

export default TopGainersPage
TopGainersPage.Layout = 'Dashboard'