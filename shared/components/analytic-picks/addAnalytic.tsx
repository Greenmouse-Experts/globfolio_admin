import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";
import Button from "../UI/Button";
import { useLazyCreateAdvisoryQuery } from "@/services/api/stockSlice";
import { toast } from "react-toastify";
import { ScaleSpinner } from "../UI/Loading";

const AddAnalyticPicksForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [image, setImage] = useState<any>()
  const [create] = useLazyCreateAdvisoryQuery()
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
      body: "",
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
  return (
    <>
      <div>
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
                  <select className="w-full rounded p-2 border border-gray-400 mt-2" {...field}>
                    <option value="" disabled>Select an Option</option>
                    <option value="Business">Business</option>
                    <option value="Tech">Tech</option>
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
                  <select className="w-full rounded p-2 border border-gray-400 mt-2" {...field}>
                    <option value="" disabled>Select an Option</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Canada">Canada</option>
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
              <Controller
                name="body"
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
                    error={errors.body?.message}
                    type={InputType.textarea}
                    altClassName="h-48 rounded w-full p-2"
                    {...field}
                  />
                )}
              />
            </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="bg-[#F6F7FB] relative rounded w-44 px-6 py-[9px] cursor-pointer border border-gray-600 border-dashed">
                <input type="file" className="absolute opacity-0 w-full h-full cursor-pointer" onChange={(e:any) => handleFileUpload(e)}/>
                <p className="fw-600 text-center cursor-pointer">Choose File</p>
            </div>
            <div className="bg-[#F2F2F2] px-6 py-2 rounded cursor-pointer hover:shadow-md">
                <p className="text-[#7D7D7D]">Save as draft</p>
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
    </>
  );
};

export default AddAnalyticPicksForm;
