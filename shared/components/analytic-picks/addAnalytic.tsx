import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";
import Button from "../UI/Button";

const AddAnalyticPicksForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const {
    control,
    handleSubmit,
    setError,
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
  return (
    <>
      <div>
        <form>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
            <label className="text-[#000000B2] fw-500">Industry</label>
              <Controller
                name="intro"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                }}
                render={({ field }) => (
                  <select className="w-full rounded p-2 border border-gray-400 mt-2" {...field}>
                    <option>Business</option>
                  </select>
                )}
              />
            </div>
            <div>
            <label className="text-[#000000B2] fw-500">Country</label>
              <Controller
                name="intro"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter your email",
                  },
                }}
                render={({ field }) => (
                  <select className="w-full rounded p-2 border border-gray-400 mt-2" {...field}>
                    <option>Nigeria</option>
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
                    message: "Please enter your email",
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    label="Intro"
                    labelClassName="text-[#000000B2] fw-500"
                    error={errors.intro?.message}
                    type={InputType.email}
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
                <input type="file" className="absolute opacity-0 w-full h-full cursor-pointer"/>
                <p className="fw-600 text-center cursor-pointer">Choose File</p>
            </div>
            <div className="bg-[#F2F2F2] px-6 py-2 rounded cursor-pointer hover:shadow-md">
                <p className="text-[#7D7D7D]">Save as draft</p>
            </div>
          </div>
          <div className="mt-12 mb-2">
          <Button title='Publish'/>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddAnalyticPicksForm;
