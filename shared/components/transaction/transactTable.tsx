import React, {FC, useMemo } from 'react'
import Table from '../UI/table';
import { FormatStatus, formatAsNgnMoney } from '@/shared/utils/format';
import Initials from '@/shared/utils/initials';
import { BiTransfer } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import dayjs from 'dayjs';

interface Props {
    transact: any;
    status?: string;
}
const TransactionTable:FC<Props> = ({status, transact}) => {

    if (status) {
        transact = transact.filter((where:any) => where.status === status);
      }
  
    const columns = useMemo(
        () => [
          {
            Header: " ",
            accessor: (row: any, index: number) => <div className='grid place-content-center bg-[#F2F2F2] w-8 h-8 rounded'><BiTransfer className='text-xl'/></div>
          },
          {
            Header: "Name",
            accessor: "user.fullname",
            Cell: (Props:any) => <div className='flex items-center gap-x-2'><Initials name={Props.value} size={34} text='14'/>{Props.value}</div>
          },
          {
            Header: "Email",
            accessor: "user.email",
          },
          {
            Header: "Date of Transaction",
            accessor: "createdAt",
            Cell: (props: any) => dayjs(props.value).format('DD-MMM-YYYY')
          },
          {
            Header: "Amount",
            accessor: "amount",
            Cell: (props: any) => formatAsNgnMoney(props.value)
          },
          {
            Header: "Description",
            accessor: "description",
          },
          {
            Header: "Status",
            accessor: "status",
            Cell: (props: any) =>
              FormatStatus[props.value as keyof typeof FormatStatus],
          },
          {
            Header: "Transaction ID",
            accessor: "TransactionId",
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
    
      const list = useMemo(() => transact, [transact]);
      return (
        <>
          <div className='mt-6 lg:w-[70vw] overflow-x-auto'>
            {transact && !!transact?.length && <div className="lg:p-4 w-full">
            <Table columns={columns} data={list} />
          </div>}
          </div>
        </>
      );
}

export default TransactionTable