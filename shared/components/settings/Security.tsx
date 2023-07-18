import React, { useState } from "react";
import Button from "../UI/Button";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";
import { ScaleSpinner } from "../UI/Loading";
import { useLazyChangePasswordQuery } from "@/services/api/authSlice";
import { toast } from "react-toastify";

const SecurityPass = () => {
  const [isBusy, setIsBusy] = useState(false);
  const [update] = useLazyChangePasswordQuery();
  const {
    control,
    handleSubmit,
    reset,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (data: any) => {
    setIsBusy(true);
    await update(data)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res.data.message);
          setIsBusy(false);
          reset();
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
        <p className="fw-600 pb-2 px-2 border-b-2 border-[#E8EAED]">Password</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="py-12 border-b lg:pl-12">
              <div className="lg:flex items-center">
                <p className="lg:w-3/12">Current password</p>
                <div className="lg:w-7/12">
                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        label=""
                        labelClassName="hidden text-[#000000B2] fw-500"
                        placeholder="*********"
                        error={errors.password?.message}
                        type={InputType.password}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="py-12 border-b lg:pl-12">
              <div className="flex items-center">
                <p className="w-3/12">New password</p>
                <div className="lg:w-7/12">
                  <div>
                    <Controller
                      name="new_password"
                      control={control}
                      rules={{
                        required: {
                          value: true,
                          message: "New Password is required",
                        },
                        minLength: {
                          value: 6,
                          message: "Password is too short",
                        },
                      }}
                      render={({ field }) => (
                        <TextInput
                          label=""
                          labelClassName="hidden text-[#000000B2] fw-500"
                          error={errors.new_password?.message}
                          type={InputType.password}
                          {...field}
                        />
                      )}
                    />
                  </div>
                  <p className="mt-2 fs-200 text-[#5F5F5F] fw-500">
                    Your password must be more than 8 characters
                  </p>
                </div>
              </div>
            </div>
            <div className="py-12 border-b lg:pl-12">
              <div className="flex items-center">
                <p className="w-3/12">Confirm password</p>
                <div className="lg:w-7/12">
                  <Controller
                    name="confirm_password"
                    control={control}
                    rules={{
                      required: {
                        value: true,
                        message: "Password is required",
                      },
                      validate: (val) => {
                        if (watch("new_password") !== val) {
                          return "Your passwords do no match";
                        }
                      },
                    }}
                    render={({ field }) => (
                      <TextInput
                        label=""
                        labelClassName="hidden text-[#000000B2] fw-500"
                        error={errors.confirm_password?.message}
                        type={InputType.password}
                        {...field}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-12">
            <Button
              title={
                isBusy ? (
                  <ScaleSpinner size={14} color="white" />
                ) : (
                  "Update Password"
                )
              }
              disabled={!isValid}
              altClassName="py-2 bg-primary flex justify-center lg:w-56 rounded-lg text-white fw-500"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default SecurityPass;
