import React from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import Tabs from '@/shared/components/UI/Tabs'
import UserInfoTable from '@/shared/components/users/usersTable'
import { users } from '@/shared/utils/dummyData'
import { useGetUsersQuery } from '@/services/api/userSlice'


const UsersPage:AppPage = () => {
    const {data} = useGetUsersQuery()
    const tab = [
        {
            title: <p>All Users</p>,
            content: <UserInfoTable users={users}/>
        },
        {
            title: <p>Active Subscribers</p>,
            content: <UserInfoTable status = 'active'  users={users}/>
        },
        {
            title: <p>Non-Active Users</p>,
            content: <UserInfoTable  status='inactive'  users={users}/>
        },
    ]
  return (
    <>
        <div className='mt-5 lg:mx-6'>
            <div className='bg-white p-5 rounded-[10px]'>
                <Tabs tabs={tab} users/>
            </div>
        </div>
    </>
  )
}

export default UsersPage
UsersPage.Layout = 'Dashboard'