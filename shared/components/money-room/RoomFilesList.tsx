import React, {FC} from 'react'
import { useGetRoomFilesQuery } from '@/services/api/chatSlice'
import Image from 'next/image'
import { InfinityLoader } from '../UI/Loading'


interface Props {
    item: any
    close: () => void
}
const RoomFilesList:FC<Props> = ({item, close}) => {
    const {data, isLoading} = useGetRoomFilesQuery(item.id)
  return (
    <>
    <div className="h-[450px] overflow-y-auto">
    {isLoading && (
        <div className="h-full place-center">
          <InfinityLoader size="200" />
        </div>
      )}
        <div className='grid grid-cols-4 gap-4 max-h-[500px] overflow-y-auto scroll-pro'>
            {
                data && !!data.data.length && data.data.map((item:any, i:number) => (
                    <div className='rounded-xl h-28 overflow-hidden shadow' key={i}>
                        <Image src={item} alt='file' width={200} height={200} className='w-full h-full object-cover'/>
                    </div>
                ))
            }
        </div>
    </div>
    </>
  )
}

export default RoomFilesList