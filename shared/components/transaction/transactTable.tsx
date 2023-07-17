import React, {FC, useMemo } from 'react'
import Table from '../UI/table';
import { FormatStatus } from '@/shared/utils/format';
import Initials from '@/shared/utils/initials';
import { BiTransfer } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';

interface Props {
    users: any;
    status?: string;
}
const TransactionTable:FC<Props> = ({status, users}) => {

    if (status) {
        users = users.filter((where:any) => where.status === status);
      }
  
    const columns = useMemo(
        () => [
          {
            Header: " ",
            accessor: (row: any, index: number) => <div className='grid place-content-center bg-[#F2F2F2] w-8 h-8 rounded'><BiTransfer className='text-xl'/></div>
          },
          {
            Header: "Name",
            accessor: "name",
            Cell: (Props:any) => <div className='flex items-center gap-x-2'><Initials name={Props.value} size={34} text='14'/>{Props.value}</div>
          },
          {
            Header: "Date of Transaction",
            accessor: "date",
          },
          {
            Header: "Amount",
            accessor: "amount",
          },
          {
            Header: "Status",
            accessor: "status",
            Cell: (props: any) =>
              FormatStatus[props.value as keyof typeof FormatStatus],
          },
          {
            Header: "Transaction ID",
            accessor: "id",
          },
          {
            Header: " ",
            accessor: "status",
            id: "ids",
            Cell: (props: any) =>
              <div className='flex items-center'>
                <BsThreeDotsVertical/>
              </div>
          },
        ], // eslint-disable-next-line
        []
      );
    
      const list = useMemo(() => users, [users]);
      return (
        <>
          <div className='mt-6'>
            {users && !!users?.length && <div className="lg:p-4 w-full">
            <Table columns={columns} data={list} />
          </div>}
          </div>
        </>
      );
}

export default TransactionTable