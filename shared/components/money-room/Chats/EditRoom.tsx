import React, { useState, FC } from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../../UI/TextInput";
import { useLazyEditRoomQuery } from "@/services/api/chatSlice";
import { toast } from "react-toastify";
import Button from "../../UI/Button";
import { ScaleSpinner } from "../../UI/Loading";

interface Props {
    data: any
    refetch: () => void
    close: () => void
}
const EditRoom:FC<Props> = ({data, refetch, close}) => {
  const [isBusy, setIsBusy] = useState(false);
  const [edit] = useLazyEditRoomQuery()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      id: data.id
    },
  });
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    await edit(data)
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
        </div>
        <div className="mt-12">
          <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Update"} disabled={!isValid} />
        </div>
      </form>
    </>
  );
};

export default EditRoom;
