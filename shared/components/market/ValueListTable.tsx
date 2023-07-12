import React, {FC, useMemo } from 'react'
import Table from '../UI/table';
import { watchlist } from '@/shared/utils/dummyData';
import { BsThreeDotsVertical } from 'react-icons/bs';

const TopValuelistTable = () => {

  const value = watchlist.slice(0,4)
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
              <BsThreeDotsVertical/>
          },
        ], // eslint-disable-next-line
        []
      );
    
      const list = useMemo(() => value, [value]);
      return (
        <>
          <div>
          {value && !!value?.length && (
          <div className="w-full">
            <div className="mt-2 flex flex-col">
              <div className="-my-2 overflow-x-auto ">
                <div className="py-2 align-middle inline-block min-w-full ">
                  <div className="overflow-hidden  sm:rounded-lg">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr className='bg-[#F4F5F7]'>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Symbol
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Name
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Price
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            %Change
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            Industry
                          </th>
                          <th className="px-2 pl-3 text-black align-middle border-b border-solid border-gray-200 py-3 fs-500 whitespace-nowrap text-left">
                            
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {value.map((item, index) => (
                          <tr className="" key={index}>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {item.symbol}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {item.name}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {item.price}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              <span className='fw-500 fs-500 bg-green-100 px-3 py-1 rounded text-green-700'>{`+${item.change}`}</span>
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              {item.industry}
                            </td>
                            <td className="border-b border-gray-200 align-middle fs-500 whitespace-nowrap px-2 py-4 text-left">
                              <BsThreeDotsVertical/>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
          </div>
        </>
      );
}

export default TopValuelistTable