import React, {FC, useState} from 'react'
import { EmptyState1 } from '@/shared/utils/emptyState';
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Menu, MenuHandler, MenuItem, MenuList, Button } from "../UI/dropdown";
import { Advisory } from '@/shared/types/stocks';
import { formatName } from '@/shared/utils/format';
import useModal from '@/hooks/useModal';
import { useLazyDeleteAdvisoryQuery } from '@/services/api/stockSlice';
import { toast } from 'react-toastify';
import ReusableModal from '../UI/ReusableModal';
import ViewPicks from './viewPicks';
// dayjs time format
const dayjs = require("dayjs");
const relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

interface Props {
    data: Advisory[]
    refetch: () => void
}
const LivePicks:FC<Props> = ({data, refetch}) => {
    const { Modal: Delete, setShowModal: setShowDelete } = useModal();
    const { Modal: Edit, setShowModal: setShowEdit } = useModal();
  const [delAd] = useLazyDeleteAdvisoryQuery();
  const [selectedItem, setSelectedItem] = useState<any>();
  const openDelete = (id: string) => {
    setSelectedItem(id);
    setShowDelete(true);
  };
  const openEdit = (item:Advisory) => {
    setSelectedItem(item);
    setShowEdit(true);
  };
  const deleteAdvisory = async (id: string) => {
    await delAd(id)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res.data.message);
          refetch()
          setShowDelete(false)
        } else {
          toast.error(res.error.data.message);
        }
      })
      .catch((err) => {});
  };
  return (
    <>
        <div>
        {data && !data?.length && <EmptyState1 message="Draft is empty"/>}
        {data &&
          !!data?.length &&
          data?.map((item: Advisory, index: number) => (
            <div
              className="p-4 py-2 bg-[#F2F2F2] mb-3 rounded-lg flex justify-between items-center"
              key={index}
            >
              <div className="w-10/12">
                <p className="fw-500 fs-500">{formatName(item.intro, 28)}</p>
                <div className="flex gap-x-3 mt-2">
                  <p className="text-green-600 fw-500 capitalize fs-400">{item.industry}</p>
                  <p className="fs-300 text-gray-600">{formatName(dayjs(item.createdAt).fromNow(), 15)}</p>
                </div>
              </div>
              <div>
                <Menu placement="bottom-end">
                  <MenuHandler>
                    <Button className="p-3 bg-transparent !shadow-none">
                      <BsThreeDotsVertical className="cursor-pointer text-black" />
                    </Button>
                  </MenuHandler>
                  <MenuList className="p-2">
                    <MenuItem onClick={() => openEdit(item)}>View</MenuItem>
                    <MenuItem className="bg-red-400 text-white" onClick={() => openDelete(item.id)}>
                      Delete
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          ))}
      </div>
      <Delete title="" noHead>
        <ReusableModal
          title="Are you sure you want to delete this advisory"
          cancelTitle="No, Back"
          actionTitle="Yes, Delete"
          action={() => deleteAdvisory(selectedItem)}
          closeModal={() => setShowDelete(false)}
        />
      </Delete>
      <Edit title='Edit Advisory' wide>
            <ViewPicks close={() => setShowEdit(false)} refetch={refetch} item={selectedItem}/>
      </Edit>
    </>
  )
}

export default LivePicks