import { useAppSelector } from "@/shared/redux/store";
import React, { FC, useState, useEffect } from "react";
import { RiAttachment2, RiSendPlane2Fill } from "react-icons/ri";
import { BiSolidImageAdd } from "react-icons/bi";
import useModal from "@/hooks/useModal";
import Image from "next/image";
import PreviewModal from "./PreviewModal";
import { AiOutlineFileText } from "react-icons/ai";

interface Props {
  socket: any;
  item: any;
  followPrivate: () => void;
  response: any
}
const ChatInput: FC<Props> = ({ socket, item, followPrivate, response }) => {
  const [message, setMessage] = useState("");
  // const [photoMessage, setPhotoMessage] = useState("");
  const [sendFile, setSendFile] = useState<any>();
  const { Modal, setShowModal } = useModal();
  const [inputImage, setInputImage] = useState<any>();
  const [showAttach, setShowAttach] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const id = useAppSelector((state) => state.user.user.id);

  const handleFileInput = (e: any) => {
    e.preventDefault();
    setShowModal(true);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const imageUrl = URL.createObjectURL(selectedFile);
    setInputImage(selectedFile);
      setSelectedImage(imageUrl);
      covertFile(selectedFile)
      setShowAttach(false)
    }
  };
  const sendMessage = (e: any) => {
    e.preventDefault();
    setMessage(e.target.value);
    if (message !== "") {
      if (item.userId) {
        socket.emit("chatroom_listen", {
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${message}`,
        });
      } else {
        socket.emit("chatroom_listen", {
          to: item.id,
          from: id,
          reload_messages: false,
          message: `${message}`,
        });
        followPrivate();
      }
    }
    setMessage("");
  };
  const sendFiles = (val:string) => {
    if (sendFile) {
      if (item.userId) {
        console.log({
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${val}`,
          files: [sendFile],
        });
        
        socket.emit("chatroom_listen", {
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${val}`,
          files: [sendFile],
        });
      } else {
        socket.emit("chatroom_listen", {
          to: item.id,
          from: id,
          reload_messages: false,
          message: `${val}`,
          files: [sendFile],
        });
        followPrivate();
      }
    }
    setShowModal(false)
  };
  const covertFile = (item:any) => {
    const reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onload = () => {
      const base64 = reader.result;
      setSendFile(base64);
    };
  }
  const ProceedToUpload = async(item:string) => {
    sendFiles(item)
  }
  const ReplyMessage = (e:any) => {
    e.preventDefault();
    setMessage(e.target.value);
    if (message !== "") {
      if (item.userId) {
        socket.emit("chatroom_listen", {
          chatroomId: item.id,
          userId: id,
          reload_messages: false,
          message: `${message}`,
          replyTo: response?.id
        });
      } else {
        socket.emit("chatroom_listen", {
          to: item.id,
          from: id,
          reload_messages: false,
          message: `${message}`,
          replyTo: response?.id
        });
        followPrivate();
      }
    }
    setMessage("");
  }
  return (
    <>
      <div className="px-4 pt-2">
        <div className="border border-gray-600 bg-white flex gap-x-2 p-2 items-center rounded-lg">
          <input
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            placeholder="Enter Your Message..."
            className="w-full outline-none"
          />
          <RiSendPlane2Fill
            className="text-2xl text-primary"
            onClick={response?.message? ReplyMessage : sendMessage}
          />
          <div className="relative">
            {showAttach && (
              <div className="absolute -top-[108px] -left-[125px] bg-white p-6 w-40 rounded-xl shadow-lg">
                <div>
                  <p className="relative flex gap-x-1 cursor-pointer hover:text-gray-600 items-center text-black fw-500">
                    <BiSolidImageAdd className="text-2xl" />
                    Image
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute w-full h-full z-10 opacity-0"
                      onChange={handleFileInput}
                    />
                  </p>
                  <p className="relative text-orange-800 cursor-pointer flex mt-2 gap-x-1 items-center text-black fw-500">
                    <AiOutlineFileText className="text-2xl" />
                    File
                    <input
                      type="file"
                      // accept="image/*"
                      className="absolute w-full h-full z-10 opacity-0"
                      onChange={handleFileInput}
                    />
                  </p>
                </div>
              </div>
            )}
            <RiAttachment2 className="text-2xl text-primary" onClick={() => setShowAttach(!showAttach)}/>
          </div>
        </div>
      </div>
      <Modal title="Selected File">
        <PreviewModal image={selectedImage} proceed={ProceedToUpload} close={() => setShowModal(false)}/>
      </Modal>
    </>
  );
};

export default ChatInput;
