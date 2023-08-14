import React, { FC, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";
import Button from "../UI/Button";
import { useLazyCreateAdvisoryQuery, useLazyDraftAdvisoryQuery } from "@/services/api/stockSlice";
import { toast } from "react-toastify";
import { ScaleSpinner } from "../UI/Loading";
import { formatName } from "@/shared/utils/format";
import { BeatLoader } from "react-spinners";
import {getName, getData} from 'country-list'
import { AiOutlinePlusSquare } from "react-icons/ai";
import useModal from "@/hooks/useModal";
import AddSector from "./addSector";
import { useGetSectorQuery } from "@/services/api/routineSlice";

interface Props {
  refetchLive: () => void
  refetchDraft: () => void
}
const AddAnalyticPicksForm:FC<Props> = ({refetchDraft, refetchLive}) => {
  const {data:sector, refetch:refetchSector} = useGetSectorQuery()
  const [isBusy, setIsBusy] = useState(false);
  const {Modal, setShowModal} = useModal()
  const [isPosting, setIsPosting] = useState(false);
  const [image, setImage] = useState<any>()
  const [create] = useLazyCreateAdvisoryQuery()
  const [draft] = useLazyDraftAdvisoryQuery()
  const handleFileUpload = (e:any) => {
    setImage(e.target.files[0])
}

  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      industry: "",
      country: "",
      intro: "",
      description: ""
    },
  });

  const onSubmit = async(data:any) => {
    setIsBusy(true)
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    formData.append("image", image);
    await create(formData)
      .then((res:any) => {
        if (res.data.success) {
          toast.success(res.data.message)
          toast.success('Published Successfully')
          reset()
          refetchLive()
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
  const onDraft = async(data:any) => {
    setIsPosting(true)
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    formData.append("image", image);
    await draft(formData)
      .then((res:any) => {
        if (res.data.success) {
          toast.success(res.data.message)
          toast.success('Published Successfully')
          reset()
          refetchDraft()
          setIsPosting(false);
        }else {
          toast.error(res.error.data.message)
          setIsPosting(false);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data.message);
        setIsPosting(false);
      });
  }
  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-2 gap-4 mt-4">
            <div>
            <label className="text-[#000000B2] fw-500 flex items-center gap-x-2">Sector <AiOutlinePlusSquare className="cursor-pointer" onClick={() => setShowModal(true)}/></label>
              <Controller
                name="industry"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please select a value",
                  },
                }}
                render={({ field }) => (
                  <select className="w-full rounded p-2 border border-gray-400 mt-2" {...field}>
                    <option value="" disabled>Select an Option</option>
                    {
                      sector && sector?.data.map((item:any, i:number) => (
                        <option value={item.name} key={i}>{item.name}</option>
                      ))
                    }
                  </select>
                )}
              />
            </div>
            <div>
            <label className="text-[#000000B2] fw-500">Country</label>
              <Controller
                name="country"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter country",
                  },
                }}
                render={({ field }) => (
                  <select className="w-full !max-h-[300px] rounded p-2 border border-gray-400 mt-2" {...field}>
                    <option value="" disabled>Select an Option</option>
                    <option value="Nigeria">Nigeria</option>
                    {
                      getData().map((item:any) => (
                        <option value={item.name} key={item.code}>{item.name}</option>
                      ))
                    }
                  </select>
                )}
              />
            </div>
          </div>
          <div className="mt-6">
              <Controller
                name="intro"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter a value",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Subject"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.intro?.message}
                    type={InputType.text}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mt-6">
              <Controller
                name="description"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter a body",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Body"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.description?.message}
                    type={InputType.textarea}
                    altClassName="h-48 rounded w-full p-2"
                    {...field}
                  />
                )}
              />
            </div>
          <div className="mt-8 lg:flex justify-between items-center">
            <div className="bg-[#F6F7FB] relative rounded w-44 px-6 py-[9px] cursor-pointer border border-gray-600 border-dashed">
                <input type="file" className="absolute opacity-0 w-full h-full cursor-pointer" onChange={(e:any) => handleFileUpload(e)}/>
                <p className="fw-600 text-center cursor-pointer">{image? formatName(image.name, 8) : "Choose File"}</p>
            </div>
            <div className="bg-[#F2F2F2] mt-6 lg:mt-0 w-6/12 lg:w-auto px-6 py-2 rounded cursor-pointer hover:shadow-md" onClick={handleSubmit(onDraft)}>
                {isPosting? <BeatLoader size={14} color="black" /> : <p className={`${isValid? "text-black fw-600" : "text-[#7D7D7D]"}`}>Save as draft</p>}
            </div>
          </div>
          <div className="mt-12 mb-2">
          <Button
            title={isBusy ? <ScaleSpinner size={14} color="white" /> : "Publish"}
            disabled={!isValid}
          />
          </div>
        </form>
      </div>
      <Modal title="Add Sector">
          <AddSector refetch={refetchSector}/>
      </Modal>
    </>
  );
};

export default AddAnalyticPicksForm;
