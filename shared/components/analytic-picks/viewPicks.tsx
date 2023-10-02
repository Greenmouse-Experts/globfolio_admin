import React, { FC, useState } from "react";
import { Advisory } from "@/shared/types/stocks";
import { Controller, useForm } from "react-hook-form";
import { useLazyEditAdvisoryQuery } from "@/services/api/stockSlice";
import { toast } from "react-toastify";
import TextInput, { InputType } from "../UI/TextInput";
import Button from "../UI/Button";
import { ScaleSpinner } from "../UI/Loading";
import { formatName } from "@/shared/utils/format";
import Image from "next/image";
import {getName, getData} from 'country-list'
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";

const ReactQuill = dynamic(import('react-quill'), { ssr: false })

interface Props {
  item: Advisory;
  close: () => void;
}
const ViewPicks: FC<Props> = ({ item }) => {
  const [isBusy, setIsBusy] = useState(false);
  const [image, setImage] = useState<any>();
  const [edit] = useLazyEditAdvisoryQuery();
  const [body, setBody] = useState<string>(item.description)
  const handleFileUpload = (e: any) => {
    setImage(e.target.files[0]);
  };
  const {
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      industry: item.industry || "",
      country: item.country || "",
      intro: item.intro || "",
      // description: item.description || "",
    },
  });

  const onSubmit = async (data: any) => { 
    setIsBusy(true);
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value as any);
    });
    formData.append("description", body);
    if(image){
        formData.append("image", image);
    }
    await edit(formData)
      .then((res: any) => {
        if (res.data.success) {
          toast.success(res.data.message);
          toast.success("Editted Successfully");
          reset();
          //   refetchLive()
          setIsBusy(false);
        } else {
          toast.error(res.error.data.message);
          setIsBusy(false);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data.message);
        setIsBusy(false);
      });
  };
  return (
    <>
      <div>
        <div className="max-h-[70vh] overflow-y-auto pr-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-[#000000B2] fw-500">Industry</label>
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
                    <select
                      className="w-full rounded p-2 border border-gray-400 mt-2"
                      {...field}
                    >
                      <option value="" disabled>
                        Select an Option
                      </option>
                      <option value="Business">Business</option>
                      <option value="Tech">Tech</option>
                      <option value="Crypto">Crypto</option>
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
                    label="Intro"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.intro?.message}
                    type={InputType.text}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="mt-6">
               <div className="mt-3">
            <label className="block mb-2 fw-500">Body</label>
            <ReactQuill theme="snow" value={body} onChange={setBody} className="h-48 mb-16" />
        </div>
              {/* <Controller
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
              /> */}
            </div>
            <div className="mt-8 flex justify-between items-center">
              <div className="bg-[#F6F7FB] relative rounded w-44 px-6 py-[9px] cursor-pointer border border-gray-600 border-dashed">
                <input
                  type="file"
                  className="absolute opacity-0 w-full h-full cursor-pointer"
                  onChange={(e: any) => handleFileUpload(e)}
                />
                <p className="fw-600 text-center cursor-pointer">
                  {image ? formatName(image.name, 8) : "Choose File"}
                </p>
              </div>
              <div>
                {item?.image && <a href={item?.image} target="_blank" className="">
                  <Image
                    src={item?.image}
                    alt="image"
                    width={130}
                    height={130}
                    className=""
                  />
                </a>}
              </div>
            </div>
            <div className="mt-12 mb-2">
              <Button
                title={
                  isBusy ? <ScaleSpinner size={14} color="white" /> : "Update"
                }
                disabled={!isValid}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ViewPicks;
