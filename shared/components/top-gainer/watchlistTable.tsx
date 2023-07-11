import React, {FC, useMemo } from 'react'
import Table from '../UI/table';
import { AiOutlineSetting } from 'react-icons/ai';
import { TiDelete } from 'react-icons/ti'
import { watchlist } from '@/shared/utils/dummyData';

const WatchlistTable = () => {

  
    const columns = useMemo(
        () => [
          {
            Header: "Symbol",
            accessor: "symbol",
          },
          {
            Header: "Name",
            accessor: "name",
          },
          {
            Header: "Price",
            accessor: "price",
          },
          {
            Header: "%Change",
            accessor: "change",
            Cell: (props: any) => <span className='fw-500 fs-500 bg-green-100 px-3 py-1 rounded text-green-700'>{`+${props.value}`}</span>,
          },
          {
            Header: "Industry",
            accessor: "industry",
          },
          {
            Header: "Action",
            accessor: "status",
            id: "id",
            Cell: (props: any) =>
              <div className='flex items-center gap-x-2'>
                <AiOutlineSetting className='text-xl cursor-pointer'/>
                <TiDelete className='text-2xl text-red-600 cursor-pointer'/>
              </div>
          },
        ], // eslint-disable-next-line
        []
      );
    
      const list = useMemo(() => watchlist, [watchlist]);
      return (
        <>
          <div className='mt-6'>
          {watchlist && !!watchlist?.length && <div className="lg:p-4 w-full">
            <Table columns={columns} data={list} />
          </div>}
          </div>
        </>
      );
}

export default WatchlistTable