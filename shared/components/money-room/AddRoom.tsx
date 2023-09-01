import React, { FC, useState } from "react";
import TextInput, { InputType } from "../UI/TextInput";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useLazyCreateChatRoomQuery } from "@/services/api/chatSlice";
import Button from "../UI/Button";
import { ScaleSpinner } from "../UI/Loading";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import SearchComponent from "../UI/Search";
import { MdOutlineCancel } from "react-icons/md";
import { getData } from "country-list";

interface Props {
  refetch: () => void;
  close: () => void;
}
const AddRoom: FC<Props> = ({ refetch, close }) => {
  const country = getData();
  const [isBusy, setIsBusy] = useState(false);
  const [showRoomCountry, setShowRoomCountry] = useState(false);
  const [roomCountry, setRoomCountry] = useState<string[]>([]);
  const [sendFile, setSendFile] = useState<any>()
  const [add] = useLazyCreateChatRoomQuery();
  const addCountry = (value: any) => {
    if (roomCountry.includes(value)) {
      setRoomCountry([...roomCountry]);
    } else {
      setRoomCountry([...roomCountry, value]);
    }
  };
  const removeCountry = (value: any) => {
    if (roomCountry.includes(value)) {
      const filtered = roomCountry.filter((where) => where !== value);
      setRoomCountry(filtered);
    }
  };
  const handleFileUpload = (e:any) => {
    e.preventDefault();
  const selectedFile = e.target.files[0];
  if (selectedFile) {
    const reader = new FileReader();
  reader.readAsDataURL(selectedFile);
  reader.onload = () => {
    const base64 = reader.result;
    setSendFile(base64);
  };
  }
}
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsBusy(true);
    const payload = {
      ...data,
      access: roomCountry,
      image: sendFile
    }
    await add(payload)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res.data.message);
          setIsBusy(false);
          refetch();
          close();
        } else {
          toast.error(res.error.data.message);
          setIsBusy(false);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data?.message);
        setIsBusy(false);
      });
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Room Title"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.title?.message}
                  type={InputType.text}
                  {...field}
                />
              )}
            />
            <Controller
              name="description"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Room Description"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.description?.message}
                  type={InputType.textarea}
                  {...field}
                />
              )}
            />
            <div className="mt-3 relative">
              <label className="text-[#000000B2] fw-500">
                  Accessible Countries
              </label>
              <p className="flex relative gap-x-2 overflow-x-auto scroll-pro pr-6 mt-1 border border-gray-400 min-h-[42px] rounded p-2">
                {!!roomCountry.length &&
                  roomCountry.map((item, index) => (
                    <span
                      className="block relative whitespace-nowrap rounded bg-light px-2 flex items-center gap-x-2"
                      key={index}
                    >
                      {item}
                      <MdOutlineCancel onClick={() => removeCountry(item)} />
                    </span>
                  ))}
              </p>
              <div
                className="absolute right-[2px] top-9 bg-white z-10"
                onClick={() => setShowRoomCountry(!showRoomCountry)}
              >
                {showRoomCountry ? (
                  <RiArrowDropDownLine className="text-2xl" />
                ) : (
                  <RiArrowDropUpLine className="text-2xl" />
                )}
              </div>
              {showRoomCountry && (
                <div className="absolute w-full overflow-x-auto p-5 bg-white shadow">
                  <SearchComponent data={country} addCountry={addCountry} />
                </div>
              )}
            </div>
            <div className="mt-3">
            <label className="text-[#000000B2] fw-500">
                  Cover Photo
              </label>
              <input type="file" name="cover" id="cover" onChange={(e:any) => handleFileUpload(e)} className="mt-1 border border-gray-400 rounded p-2" />
            </div>
          </div>
          <div className="mt-12">
            <Button
              title={isBusy ? <ScaleSpinner size={14} color="white" /> : "Add"}
              disabled={!isValid}
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
