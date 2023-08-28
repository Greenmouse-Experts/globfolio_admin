import React, { FC, useState, useEffect } from "react";
import useModal from "@/hooks/useModal";
import { VscDiffAdded } from "react-icons/vsc";
import AddRoom from "./AddRoom";
import { useGetRoomQuery } from "@/services/api/chatSlice";
import Image from "next/image";

interface Props {
  select: (value: any) => void;
  selected: any;
}
const RoomList: FC<Props> = ({ select, selected }) => {
  const { Modal, setShowModal } = useModal();
  const { data: room, isLoading, refetch } = useGetRoomQuery();
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
    setShowRoom(room?.data)
  }, [room])
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
                  <Image
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1692619891/globfolio/Ellipse_1366_rimyab.png"
                    alt="profile"
                    width={80}
                    height={80}
                    className="w-10"
                  />
                  <div>
                    <p className="text-white fw-500 fs-300">{item.title}</p>
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
