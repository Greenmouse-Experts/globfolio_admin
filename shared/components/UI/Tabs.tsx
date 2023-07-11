import React, { FC, useState } from "react";
import { classNames } from "@/shared/utils/format";

interface Props {
  tabs: {
    title: JSX.Element;
    content: JSX.Element;
  }[];
  broadcastCurrentIndex?: (index: number) => void;
  users?: boolean;
  isFixed?: boolean;
}

const Tabs: FC<Props> = ({ tabs, broadcastCurrentIndex, users, isFixed }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div>
      <div className="">
        <div className="">
          <nav
            className={
              users
                ? "-mb-px tab-bar flex lg:space-x-8 space-x-2 overflow-x-auto border-b-2"
                : isFixed
                ? "-mb-px tab-bar flex lg:space-x-8 space-x-4 overflow-x-auto fixed lg:relative top-0 pt-3 lg:pt-0 bg-pri lg:bg-transparent w-full z-10 left-0"
                : "-mb-px tab-bar flex lg:space-x-8 space-x-2 overflow-x-auto"
            }
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <div
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  broadcastCurrentIndex && broadcastCurrentIndex(index);
                }}
                className={classNames(
                  index === currentIndex
                    ? "border-tertial  text-tertial"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                  "whitespace-nowrap cursor-pointer border-b-2 py-1 px-3 lg:px-4 font-medium lg:text-lg"
                )}
              >
                {tab.title}
              </div>
            ))}
          </nav>
          <div className="pt-2">{tabs[currentIndex].content}</div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;