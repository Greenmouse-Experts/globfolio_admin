import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import TextInput, { InputType } from "../Ui/TextInput";
import Button from "../UI/Button";
import Link from "next/link";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/shared/redux/store";
import { saveUser } from "@/shared/redux/reducers/userSlice";
import {  storeLocalToken } from "@/services/helpers";
import { useRouter } from "next/router";
import TextInput, { InputType } from "../UI/TextInput";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from 'react-icons/vsc'
import { ScaleSpinner } from "../UI/Loading";
import { useLazyAdminLoginQuery } from "@/services/api/authSlice";

const LoginForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  const dispatch = useAppDispatch()
  const router = useRouter()
  const [login] = useLazyAdminLoginQuery()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data:any) => {
    setIsBusy(true);
    await login(data)
      .then((res:any) => {
        if (res.isSuccess) {
          dispatch(
            saveUser({
                token: res.data.data.access_token,
                fullname: res.data.data.fullname,
                id: res.data.data.id,
                email: res.data.data.email,
                phone: res.data.data.phone_no,
                country: res.data.data.country,
                avatar: res.data?.data?.avatar,
                userType: res.data.data.userType
          }))
          storeLocalToken("token", res.data.data.access_token) 
          toast.success(res.data.message)
          router.push('/dashboard');
        }else {
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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter your email",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Email"
                labelClassName="text-[#000000B2] fw-500"
                icon={<AiOutlineMail className="text-2xl mx-2 lg:mx-4"/>}
                placeholder="victorchigozie@gmail.com"
                error={errors.email?.message}
                type={InputType.email}
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-6">
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Password is required",
              },
              minLength: {
                value: 6,
                message: "Password is too short",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Password"
                labelClassName="text-[#000000B2] fw-500"
                icon={<VscLock className="text-2xl mx-2 lg:mx-4"/>}
                placeholder="*********"
                error={errors.password?.message}
                type={InputType.password}
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-12">
          <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Login"} disabled={!isValid} />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
