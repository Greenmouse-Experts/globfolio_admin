import React, {FC, useState} from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";
import { getData } from "country-list";
import SearchComponent from "../UI/Search";
import { MdOutlineCancel } from "react-icons/md";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiDeleteBin2Line } from "react-icons/ri";
import Button from "../UI/Button";
import { toast } from "react-toastify";
import { ScaleSpinner } from "../UI/Loading";
import { SubscriptionPlan } from "@/shared/types/subscription";
import { useLazyEditSubscriptionQuery } from "@/services/api/subscriptionSlice";

interface Props {
  close: Function
  refetch: Function
  plan: SubscriptionPlan | undefined
}
const EditPlan:FC<Props> = ({close, refetch, plan}) => { 
  const country = getData();
  const [edit] = useLazyEditSubscriptionQuery();
  const [isBusy, setIsBusy] = useState(false)

  const [showPickCountry, setShowPickCountry] = useState(false)
  const [pickCountry, setPickCountry] = useState<string[]>(plan?.analystPickAccess? plan?.analystPickAccess : [])
  const [showChatCountry, setShowChatCountry] = useState(false)
  const [chatCountry, setChatCountry] = useState<string[]>(plan?.chatAccess? plan?.chatAccess : [])
  const addCountry = (value:any) => {
    if(pickCountry.includes(value)){
        setPickCountry([...pickCountry])
    }else{
        setPickCountry([...pickCountry,value ])
    }
  }
  const removeCountry = (value:any) => {
    if(pickCountry.includes(value)){
       const filtered = pickCountry.filter((where) => where !== value)
       setPickCountry(filtered)
    }
  }
  const addChatCountry = (value:any) => {
    if(chatCountry.includes(value)){
        setChatCountry([...chatCountry])
    }else{
        setChatCountry([...chatCountry,value ])
    }
  }
  const removeChatCountry = (value:any) => {
    if(chatCountry.includes(value)){
       const filtered = chatCountry.filter((where) => where !== value)
       setChatCountry(filtered)
    }
  }
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: plan?.name || "",
      amount: plan?.amount || "",
      duration: plan?.duration || "",
      privateMessaging: "",
      googleId: plan?.googleId || "",
      appleId: plan?.appleId || "",
    },
  });

  const onSubmit = async (data:any) => {
    setIsBusy(true);
    const payload = {
        ...data,
        planId: plan?.id,
        privateMessaging: data.privateMessaging === "true"? true : false,
        analystPickAccess: pickCountry,
        chatAccess: chatCountry,
        benefits: plan?.benefits
    }
    await edit(payload)
      .then((res:any) => {
        if (res.isSuccess) {
          toast.success(res.data.message)
          setIsBusy(false);
          refetch()
          close()
        }else {
          toast.error(res.error.data.message);
          setIsBusy(false);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data?.message);
        setIsBusy(false);
      });
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid lg:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto scroll-pro">
          <Controller
            name="name"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter plan name",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Plan Name"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.name?.message}
                type={InputType.text}
                {...field}
              />
            )}
          />
          <Controller
            name="duration"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter plan duration",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Plan Duration (Months)"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.name?.message}
                type={InputType.number}
                {...field}
              />
            )}
          />
          <Controller
            name="amount"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter plan pricing",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Plan Pricing"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.amount?.message}
                type={InputType.number}
                {...field}
              />
            )}
          />
          <div className="lg:mt-3 relative">
            <label className="text-[#000000B2] fw-500">
              Analytic Picks Access
            </label>
            <p className="flex relative gap-x-2 overflow-x-auto scroll-pro pr-6 mt-1 border border-gray-400 min-h-[42px] rounded p-2">
                {
                    !!pickCountry.length && pickCountry.map((item, index) => <span className="block relative whitespace-nowrap rounded bg-light px-2 flex items-center gap-x-2" key={index}>{item}<MdOutlineCancel onClick={() => removeCountry(item)}/></span>)
                }
            </p>
            <div className="absolute right-[2px] top-9 bg-white z-10" onClick={() => setShowPickCountry(!showPickCountry)}>
                    {showPickCountry? <RiArrowDropDownLine className="text-2xl"/> : <RiArrowDropUpLine className="text-2xl"/>}
                </div>
            {
                showPickCountry && <div className="absolute w-full overflow-x-auto p-5 bg-white shadow">
                <SearchComponent data={country} addCountry={addCountry}/>
              </div>
            }
          </div>
          <div className=" relative lg:mt-2">
            <label className="text-[#000000B2] fw-500">
              Chat Room Access
            </label>
            <p className="flex relative gap-x-2 overflow-x-auto scroll-pro pr-6 mt-1 border border-gray-400 min-h-[42px] rounded p-2">
                {
                    !!chatCountry.length && chatCountry.map((item, index) => <span className="block relative whitespace-nowrap rounded bg-light px-2 flex items-center gap-x-2" key={index}>{item}<MdOutlineCancel onClick={() => removeChatCountry(item)}/></span>)
                }
            </p>
            <div className="absolute right-[2px] top-9 bg-white z-10" onClick={() => setShowChatCountry(!showChatCountry)}>
                    {showChatCountry? <RiArrowDropDownLine className="text-2xl"/> : <RiArrowDropUpLine className="text-2xl"/>}
                </div>
            {
                showChatCountry && <div className="absolute w-full overflow-x-auto p-5 bg-white shadow">
                <SearchComponent data={country} addCountry={addChatCountry}/>
              </div>
            }
          </div>
          <div className="lg:mt-2">
            <label className="text-[#000000B2] fw-500">Private Messaging</label>
              <Controller
                name="privateMessaging"
                control={control}
                rules={{
                  required: {
                    value: false,
                    message: "Please select a value",
                  },
                }}
                render={({ field }) => (
                  <select className="w-full rounded p-2 border border-gray-400 mt-1 min-h-[42px]" {...field}>
                    <option value="">Select an Option</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                )}
              />
            </div>
            <Controller
            name="googleId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter a google plan id",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Google Plan Id"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.googleId?.message}
                type={InputType.text}
                {...field}
              />
            )}
          />
          <Controller
            name="appleId"
            control={control}
            rules={{
              required: {
                value: true,
                message: "Please enter a apple plan id",
              },
            }}
            render={({ field }) => (
              <TextInput
                label="Apple Plan Id"
                labelClassName="text-[#000000B2] fw-500"
                error={errors.appleId?.message}
                type={InputType.text}
                {...field}
              />
            )}
          />
        </div>
        <div className="mt-12">
            <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Edit Plan"} disabled={!isValid}/>
        </div>
      </form>
    </>
  );
};

export default EditPlan;
