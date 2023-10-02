import React, { useState } from "react";
import { useGetSectorQuery } from "@/services/api/routineSlice";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Button from "../UI/Button";
import { BeatLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useLazyDeleteSectorQuery, useLazyEditSectorQuery } from "@/services/api/stockSlice";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";

const ListCategory = () => {
  const { data: sector, refetch: refetchSector } = useGetSectorQuery();
  const [showEdit, setShowEdit] = useState("");
  const [isBusy, setIsBusy] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [edit] = useLazyEditSectorQuery()
  const [delSec] = useLazyDeleteSectorQuery()
  const [selectedId, setSelectedId] = useState('')
  const {
    control,
    reset,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
    },
  });
  const handleShowEdit = (id:string) => {
    reset()
    if(showEdit === ""){
        setShowEdit(id)
    }else if (showEdit === id){
        setShowEdit("")
    }else {
        setShowEdit(id)
    }
  }
  const editSector = async() => {
    setIsBusy(true)
    const payload = {
        name: getValues('name'),
        id: showEdit
    }
   await edit(payload)
   .then((res:any) => {
    if (res.data.success) {
      toast.success(res.data.message)
      refetchSector()
      setIsBusy(false);
    }else {
      toast.error(res.error.data.message)
      setIsBusy(false);
    }
  })
  .catch((err) => {
    toast.error(err?.error?.data.message);
    setIsBusy(false);
  });
  }
  const delSector = async(id:any) => {
    setSelectedId(id)
    setIsDeleting(true)
   await delSec(id)
   .then((res:any) => {
    if (res.data.success) {
      toast.success(res.data.message)
      refetchSector()
      setIsDeleting(false);
    }else {
      toast.error(res.error.data.message)
      setIsDeleting(false);
    }
  })
  .catch((err) => {
    toast.error(err?.error?.data.message);
    setIsDeleting(false);
  });
  }
  
  return (
    <>
      <div>
        {sector &&
          !!sector?.data?.length &&
          sector.data.map((item: any, i: number) => (
            <div key={i} className="">
              <div className="shadow p-2 rounded mb-2 flex items-center justify-between hover:scale-x-105 duration-100">
                <p>{item.name}</p>
                {(isDeleting && item.id === selectedId)? <BeatLoader size={12} color="black" /> : <div className="flex gap-x-2">
                  <BiEdit className="" onClick={() => handleShowEdit(item.id)}/>
                  <RiDeleteBin6Line className="text-red-500" onClick={() => delSector(item.id)} />
                </div>}
              </div>
              {showEdit === item.id && (
                <div className="flex gap-x-2 items-center mb-3">
                    <div className="w-9/12">
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label=""
                  error={''}
                  type={InputType.text}
                  altClassName="w-full px-2 py-1 rounded-lg"
                  {...field}
                />
              )}
            />
          </div>
                  {/* <input type="text" name="sector" id="sector" value={naming} onClick={(e:any) => setNaming(e.target.value)} className="w-full rounded-lg border border-gray-400 px-2 p-1" /> */}
                 <div className="w-3/12 mt-3">
                 <Button title={isBusy? <BeatLoader size={12} color="white" /> : "Edit"} onClick={editSector} altClassName="py-1 px-2 bg-primary rounded text-white w-full"/>
                 </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default ListCategory;
