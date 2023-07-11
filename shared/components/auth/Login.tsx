import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
// import TextInput, { InputType } from "../Ui/TextInput";
import Button from "../UI/Button";
import Link from "next/link";
import { toast } from "react-toastify";
// import { useLazyLoginQuery } from "@/services/api/authSlice";
import { useAppDispatch } from "@/shared/redux/store";
import { saveUser } from "@/shared/redux/reducers/userSlice";
import {  storeLocalToken } from "@/services/helpers";
import { useRouter } from "next/router";
import { Url } from "next/dist/shared/lib/router/router";
import TextInput, { InputType } from "../UI/TextInput";
import { AiOutlineMail } from "react-icons/ai";
import { VscLock } from 'react-icons/vsc'
import { ScaleSpinner } from "../UI/Loading";
// import { ScaleSpinner } from "../Ui/Loaders";

const LoginForm = () => {
  const [isBusy, setIsBusy] = useState(false);
  // const [login] = useLazyLoginQuery()
  const dispatch = useAppDispatch()
  const router = useRouter()
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

  // const onSubmit = async (data:any) => {
  //   setIsBusy(true);
  //   await login(data)
  //     .then((res:any) => {
  //       if (res.isSuccess) {
  //         dispatch(
  //           saveUser({
  //               token: res.data.data.token,
  //               firstname: res.data.data.user.firstname,
  //               lastname: res.data.data.user.lastname,
  //               id: res.data.data.user.id,
  //               email: res.data.data.user.email,
  //               phone: res.data.data.user.phone
  //         }))
  //         storeLocalToken("token", res.data.data.token) 
  //         toast.success(res.data.message)
  //         router.push(extractCallBackRoute(router.asPath) as Url);
  //       }else {
  //         toast.error(res.error.data.message);
  //         setIsBusy(false);
  //       }
  //     })
  //     .catch((err) => {
  //       toast.error(err?.error?.data?.message);
  //       setIsBusy(false);
  //     });
  // };
  return (
    <div>
      <form className="" >
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
          {/* <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Login"} disabled={!isValid} /> */}
          <Link href='/dashboard' className="btn-like block text-center w-full lg:py-3">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
