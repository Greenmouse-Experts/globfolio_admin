import React from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import Tabs from '@/shared/components/UI/Tabs'
import UserInfoTable from '@/shared/components/users/usersTable'
import { useGetUsersQuery } from '@/services/api/userSlice'
import { InfinityLoader } from '@/shared/components/UI/Loading'


const UsersPage:AppPage = () => {
    const {data, isLoading, refetch} = useGetUsersQuery()
    const tab = [
        {
            title: <p>All Users</p>,
            content: <UserInfoTable users={data?.data} refetch={refetch}/>
        },
        {
            title: <p>Active Subscribers</p>,
            content: <UserInfoTable status='active'  users={data?.data} refetch={refetch}/>
        },
        {
            title: <p>Non-Active Users</p>,
            content: <UserInfoTable status='inactive'  users={data?.data} refetch={refetch}/>
        },
    ]
  return (
    <>
        <div className='mt-5 lg:mx-6'>
            <div className='bg-white p-5 rounded-[10px]'>
            {isLoading && <div className='py-6 flex justify-center'><InfinityLoader size='300'/></div>}
                {data && <Tabs tabs={tab} users/>}
            </div>
        </div>
    </>
  )
}

export default UsersPage
UsersPage.Layout = 'Dashboard'