import React, { FC } from "react";
import { useGetRoomFilesQuery } from "@/services/api/chatSlice";
import Image from "next/image";
import { InfinityLoader } from "../UI/Loading";
import { isImage } from "@/shared/utils/format";

interface Props {
  item: any;
  close: () => void;
}
const RoomFilesList: FC<Props> = ({ item, close }) => {
  const { data, isLoading } = useGetRoomFilesQuery(item.id);
  return (
    <>
      <div className="h-[450px] overflow-y-auto">
        {isLoading && (
          <div className="h-full place-center">
            <InfinityLoader size="200" />
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 max-h-[500px] overflow-y-auto scroll-pro">
          {data &&
            !!data.data.length &&
            data.data.map((item: any, i: number) => (
              <div className="rounded-xl h-28 overflow-hidden shadow" key={i}>
                {isImage(item) ? (
                  <a href={item} target="_blank" rel="noopener noreferrer">
                    <Image
                      src={item}
                      alt="file"
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </a>
                ) : (
                  <a href={item} target="_blank" rel="noopener noreferrer">
                  <Image
                    src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1693837622/globfolio/file-removebg-preview_stj9w1.png"
                    alt="file"
                    width={200}
                    height={200}
                    className="w-6/12 mx-auto"
                  />
                  </a>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default RoomFilesList;
