import React from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import { transaction } from '@/shared/utils/dummyData'
import TransactionTable from '@/shared/components/transaction/transactTable'
import Tabs from '@/shared/components/UI/Tabs'


const TransactionsPage: AppPage = () => {
  const tab = [
    {
        title: <p>All Users</p>,
        content: <TransactionTable users={transaction}/>
    },
    {
        title: <p>Successful</p>,
        content: <TransactionTable status = 'paid'  users={transaction}/>
    },
    {
        title: <p>Declined</p>,
        content: <TransactionTable  status='declined'  users={transaction}/>
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

export default TransactionsPage
TransactionsPage.Layout = 'Dashboard'