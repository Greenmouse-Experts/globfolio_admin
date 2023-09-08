import React from 'react'
import { AppPage } from '@/shared/components/layouts/Types'
import { transaction } from '@/shared/utils/dummyData'
import TransactionTable from '@/shared/components/transaction/transactTable'
import Tabs from '@/shared/components/UI/Tabs'
import { useGetTransactQuery } from '@/services/api/routineSlice'
import { EmptyState2 } from '@/shared/utils/emptyState'
import { InfinityLoader } from '@/shared/components/UI/Loading'


const TransactionsPage: AppPage = () => {
  const {data, isLoading} = useGetTransactQuery()
  const tab = [
    {
        title: <p>All Transactions</p>,
        content: <div>{data && !data?.data?.length && <EmptyState2 message='No Transaction made yet'/>}{data && !!data?.data?.length && <TransactionTable transact={data?.data}/>}</div>
    },
    {
        title: <p>Successful</p>,
        content: <div>{data && !data?.data?.length && <EmptyState2 message='No Successful Transaction yet'/>}{data && !!data?.data?.length && <TransactionTable status = 'PAID'  transact={data?.data}/>}</div>
    },
    {
        title: <p>Pending</p>,
        content:  <div>{data && !data?.data?.length && <EmptyState2 message='No Declined Transaction yet'/>}{data && !!data?.data?.length && <TransactionTable  status='PENDING'  transact={data?.data}/>}</div>
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

export default TransactionsPage
TransactionsPage.Layout = 'Dashboard'