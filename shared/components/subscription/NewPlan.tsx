import React, {FC, useState} from "react";
import { Controller, useForm } from "react-hook-form";
import TextInput, { InputType } from "../UI/TextInput";
import { getData } from "country-list";
import SearchComponent from "../UI/Search";
import { MdOutlineCancel } from "react-icons/md";
import { RiArrowDropDownLine, RiArrowDropUpLine, RiDeleteBin2Line } from "react-icons/ri";
import Button from "../UI/Button";
import { toast } from "react-toastify";
import { BiSolidSend } from "react-icons/bi";
import { useLazyCreateSubscriptionQuery } from "@/services/api/subscriptionSlice";
import { ScaleSpinner } from "../UI/Loading";

interface Props {
  close: Function
  refetch: Function
  count: () => void
}
const CreateNewPlan:FC<Props> = ({close, refetch, count}) => {
  const country = getData();
  const [create] = useLazyCreateSubscriptionQuery();
  const [isBusy, setIsBusy] = useState(false)
  // benefits
  const [benefitIn, setBenefitIn] = useState('')
  const [benefitVal, setBenefitVal] = useState<string[]>([]);
  const addBenefit = () => {
    if(!!benefitIn.length){
      setBenefitVal([...benefitVal, benefitIn])
      setBenefitIn('')
    }
  }
  const removeField = (item:any) => {
    // const updatedArr = [...benefitVal]
    const updatedArr = benefitVal.filter((where) => where !== item)
    setBenefitVal(updatedArr)
  };

  const [showPickCountry, setShowPickCountry] = useState(false)
  const [pickCountry, setPickCountry] = useState<string[]>([])
  const [showChatCountry, setShowChatCountry] = useState(false)
  const [chatCountry, setChatCountry] = useState<string[]>([])
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
      name: "",
      amount: "",
      duration: "",
      privateMessaging: "",
      googleId: "",
      appleId: "",
    },
  });

  const onSubmit = async (data:any) => {
    setIsBusy(true);
    const benefitValues = Object.keys(benefitVal).map((key: string) => ({
      benefit: benefitVal[key as keyof typeof benefitVal],
    }));
    const payload = {
        ...data,
        privateMessaging: data.privateMessaging === "true"? true : false,
        analystPickAccess: pickCountry,
        chatAccess: chatCountry,
        benefits: benefitValues
    }
    await create(payload)
      .then((res:any) => {
        if (res.isSuccess) {
          toast.success(res.data.message)
          setIsBusy(false);
          refetch()
          count()
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
          <div className="mt-3 col-span-2 ">
            <p>Add Benefits</p>
          <div className="border border-gray-500 rounded">
              <div className="flex items-center mt-1 w-full ">
              <input type="text" value={benefitIn} onChange={(e) => setBenefitIn(e.target.value)} className="w-full p-2 rounded outline-none"/>
              <BiSolidSend className="text-3xl mx-3" onClick={addBenefit}/>
              </div>
          </div>
          <div className="mt-4"> 
                {benefitVal && !benefitVal.length && "No Benefits Added Yet"}
                <ul className="list-disc">
                  {
                  benefitVal && !!benefitVal.length && benefitVal.map((item, index) => (
                    <li key={index} className="flex gap-x-4 items-center fw-500 mt-1">
                      <span>{index + 1}.</span>
                      {item}
                      <RiDeleteBin2Line className="text-red-500" onClick={() => removeField(item)}/>
                    </li>
                  ))
                }
                </ul>
              </div>
          </div>
        </div>
        <div className="mt-12">
            <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Create Plan"} disabled={!isValid}/>
        </div>
      </form>
    </>
  );
};

export default CreateNewPlan;
