import React, { FC, useState, useEffect } from "react";
import useModal from "@/hooks/useModal";
import { VscDiffAdded } from "react-icons/vsc";
import AddRoom from "./AddRoom";
import { useGetRoomQuery } from "@/services/api/chatSlice";
import Image from "next/image";
import { formatName } from "@/shared/utils/format";

interface Props {
  select: (value: any) => void;
  selected: any;
  refetch: () => void
  room: any
}
const RoomList: FC<Props> = ({ select, selected, room, refetch }) => {
  const { Modal, setShowModal } = useModal();
  // const { data: room, isLoading, refetch } = useGetRoomQuery();
  const [showRoom, setShowRoom] = useState<any[]>();
  const [searchQuery, setSearchQuery] = useState();
  const filterRoom = (event: any) => {
    const value = event.target.value;
    setSearchQuery(event.target.value);
    // Filter data based on the search query
    const filteredItems = room?.data.filter((item: any) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setShowRoom(filteredItems);
  };
  useEffect(() => {
    setShowRoom(room?.data);
  }, [room]);
  return (
    <>
      <div className="text-white mt-3">
        <div className="flex items-center gap-x-2">
          <div className="w-10/12">
            <div>
              <input
                type="text"
                placeholder="search"
                value={searchQuery}
                className="bg-[#1F2937] p-2 rounded-lg"
                onChange={filterRoom}
              />
            </div>
          </div>
          <VscDiffAdded
            className="text-3xl cursor-pointer"
            onClick={() => setShowModal(true)}
          />
        </div>
        <div className="text-white mt-6  h-[450px] overflow-y-auto scroll-pro">
          <ul>
            {room &&
              !!showRoom?.length &&
              showRoom.map((item: any, index: number) => (
                <li
                  className={`flex gap-x-2 mb-2 cursor-pointer rounded-lg hover:bg-[#1F2937] p-2 ${
                    item.id === selected?.id && `bg-[#1F2937]`
                  }`}
                  onClick={() => select(item)}
                  key={index}
                >
                  {item.banner ? (
                    <Image
                      src={item.banner}
                      alt="profile"
                      width={80}
                      height={80}
                      className="w-10 h-10 circle"
                    />
                  ) : (
                    <Image
                      src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1693229127/globfolio/Group_48368_1_y0m8ah.png'
                      alt="profile"
                      width={80}
                      height={80}
                      className="w-10 h-10 circle"
                    />
                  )}
                  <div>
                    <p className="text-white fw-500 fs-300">{item.title}</p>
                    <p className="text-gray-500 fs-300">{item?.description? formatName(item?.description, 20) : ''}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <Modal title="Add Chat Room">
        <AddRoom refetch={refetch} close={() => setShowModal(false)} />
      </Modal>
    </>
  );
};

export default RoomList;
