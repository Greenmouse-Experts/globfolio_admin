import React, { FC, useState } from "react";
import { useLazyUpdateProfileQuery } from "@/services/api/authSlice";
import { saveUser } from "@/shared/redux/reducers/userSlice";
import { useAppDispatch, useAppSelector } from "@/shared/redux/store";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextInput, { InputType } from "../UI/TextInput";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";
import Button from "../UI/Button";
import { ScaleSpinner } from "../UI/Loading";

interface Props {
  close: () => void;
}
const EditProfile: FC<Props> = ({ close }) => {
  const [isBusy, setIsBusy] = useState(false);
  const dispatch = useAppDispatch();
  const [update] = useLazyUpdateProfileQuery();
  const user = useAppSelector((state) => state.user.user);
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullname: user.fullname,
      gender: user.gender,
      phone_no: user.phone,
      country: user.country,
    },
  });
  const onSubmit = async (data: any) => {
    setIsBusy(true);
    await update(data)
      .then((res: any) => {
        if (res.isSuccess) {
          dispatch(
            saveUser({
              ...user,
              fullname: data.fullname,
              phone: data.phone_no,
              country: data.country,
              gender: data?.gender,
            })
          );
          toast.success(res.data.message);
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
            name="fullname"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your fullname",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Full Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.fullname?.message}
                type={InputType.text}
                {...field}
              />
            )}
          />
        </div>
        <div className="">
          <label className="mb-2 mt-2 block ">Phone Number</label>
          <PhoneInputWithCountry
            international
            defaultCountry="NG"
            name="phone_no"
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^(\+?234|0)?[789]\d{9}$/,
                message: "Please Enter A Valid Number",
              },
            }}
            className="border lg:p-2 p-2 border-gray-400 rounded outline-none"
          />
          {errors.phone_no && (
            <p className="error text-red-500 fw-500">Invalid Phone Number</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="mb-2 block mt-2">Gender</label>
            <Controller
              name="gender"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please select an option",
                },
              }}
              render={({ field }) => (
                <select
                  {...field}
                  className="w-full border border-gray-400 rounded h-[42px]"
                >
                  <option value="" disabled>
                    Select Option
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </select>
              )}
            />
            {errors?.gender?.message}
          </div>
          <div>
            <Controller
              name="country"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter your country",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Country"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.country?.message}
                  type={InputType.text}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="mt-12">
          <Button
            title={isBusy ? <ScaleSpinner size={14} color="white" /> : "Update"}
            disabled={!isValid}
          />
        </div>
      </form>
    </>
  );
};

export default EditProfile;
