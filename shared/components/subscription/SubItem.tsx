import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { MdCheckCircle, MdDeleteForever } from "react-icons/md";
import Button from "../UI/Button";
import { SubscriptionPlan } from "@/shared/types/subscription";
import { Controller, useForm } from "react-hook-form";
import { useLazyDeleteSubscriptionQuery, useLazyEditSubscriptionQuery } from "@/services/api/subscriptionSlice";
import { toast } from "react-toastify";
import { formatAsNgnMoney } from "@/shared/utils/format";
import { BiAddToQueue } from "react-icons/bi";
import { ScaleSpinner } from "../UI/Loading";
import { RiDeleteBin5Fill } from "react-icons/ri";
import useModal from "@/hooks/useModal";
import EditPlan from "./EditPlan";

interface Props {
  data: SubscriptionPlan[];
  refetch: () => void;
  tab: string;
  change: Function;
}
const SubItemComp: FC<Props> = ({ data, refetch, tab, change }) => {

  const [plan, setPlan] = useState<SubscriptionPlan>();
  const {Modal:EditModal, setShowModal:ShowEdit} = useModal()

  useEffect(() => {
    const plans = data.filter((where) => where.id === tab);
    setPlan(plans[0]);
    setBenefits(plans[0]?.benefits);
    reset({
      name: plans[0]?.name,
      amount: plans[0]?.amount,
      duration: plans[0]?.duration,
    });
  }, [change]);

  const [benefits, setBenefits] = useState<any[]>(plan?.benefits || []);
  const [benefit, setBenefit] = useState("");
  const [isBusy, setIsBusy] = useState(false);
  const [edit] = useLazyEditSubscriptionQuery();
  const [deleting, setDeleting] = useState(false)
  const [deletes] = useLazyDeleteSubscriptionQuery();
  const handleBenefit = (e: any) => {
    setBenefit(e.target.value);
  };
  const addToBenefits = () => {
    const newBenefits = [...benefits];
    const addBenefit = { benefit: benefit };
    setBenefits([...newBenefits, addBenefit]);
    setBenefit("");
  };
  const removeBenefits = (name: any) => {
    const updatedArray = benefits.filter((object) => object.benefit !== name);
    setBenefits(updatedArray);
  };
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
      planId: plan?.id || "",
      amount: plan?.amount || 0,
      duration: plan?.duration || 0,
    },
  });

  const onSubmit = async (data: any) => {
    const payload = {
      ...data,
      privateMessaging: plan?.privateMessaging,
      googleId: plan?.googleId,
      appleId: plan?.appleId,
      analystPickAccess: plan?.analystPickAccess,
      chatAccess: plan?.chatAccess,
      benefits: benefits,
    };
    setIsBusy(true);
    await edit(payload)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res.data.message);
          setIsBusy(false);
          refetch();
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

  const deletePlan = async () => {
    setDeleting(true)
    await deletes(plan?.id)
      .then((res: any) => {
        if (res.isSuccess) {
          toast.success(res.data.message);
          setDeleting(false);
          refetch();
        } else {
          toast.error(res.error.data.message);
          setDeleting(false);
        }
      })
      .catch((err) => {
        toast.error(err?.error?.data?.message);
        setDeleting(false);
      });
  }

  return (
    <>
      <div className="lg:flex gap-x-8">
        <div className="lg:w-8/12">
          <div className="">
           <div className="flex justify-between">
           <p className="fw-600">Subscription</p>
           {deleting && <p className="fw-500 text-red-500">Deleting...</p>}
           { !deleting && <p className="flex items-center text-red-600 border-b border-red-600 fw-500 cursor-pointer" onClick={deletePlan}><RiDeleteBin5Fill className=""/>Delete Plan</p>}
           </div>
            <div className="border-2 border-[#E8EAED] rounded-[15px] flex p-2 mt-4 px-6">
              {/*  */}
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
                  <input
                    type="text"
                    placeholder="Premium Plan"
                    className="border-0 w-full outline-none bg-white"
                    disabled
                    {...field}
                  />
                )}
              />
              <div className="flex gap-x-2 items-center p-1 px-2 cursor-pointer rounded-[15px] border border-[#5F5F5F]" onClick={() => ShowEdit(true)}>
                <p>Edit</p>
                <AiOutlineEdit />
              </div>
            </div>
          </div>
          <div className="mt-8">
            <p className="fw-600">Pricing</p>
            <div className="border-2 border-[#E8EAED] rounded-[15px] flex p-2 mt-4 px-6">
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Please enter an amount",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    disabled
                    className="border-0 w-full outline-none bg-white"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-8">
            <p className="fw-600">Plan Duration (months)</p>
            <div className="border-2 border-[#E8EAED] rounded-[15px] flex p-2 mt-4 px-6">
              <Controller
                name="duration"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    disabled
                    className="border-0 w-full outline-none bg-white"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="mt-8">
            <p className="fw-600">Feautures</p>
            <div className="border-2 border-[#E8EAED] rounded-[15px] p-6 mt-4">
              <div className="flex rounded-[15px]">
                <input
                  type="text"
                  value={benefit}
                  placeholder="Add Benefits"
                  onChange={handleBenefit}
                  className="border-0 w-full outline-none"
                />
                {benefit && (
                  <div
                    className="flex items-center p-1 bg-primary text-white px-2 rounded-[20px] gap-1"
                    onClick={addToBenefits}
                  >
                    <p>Add</p>
                    <BiAddToQueue />
                  </div>
                )}
                {!benefit && (
                  <div className="flex p-1 px-2 rounded-[20px] border border-[#5F5F5F]">
                    <p>Edit</p>
                    <AiOutlineEdit />
                  </div>
                )}
              </div>
              {benefits &&
                !!benefits.length &&
                benefits.map((item, index) => (
                  <div className="py-5 relative" key={index}>
                    <p className="text-[#5F5F5F] fw-500">{item.benefit}</p>
                    <MdDeleteForever
                      className="text-xl text-red-600 hover:scale-[1.3] duration-100 absolute right-4 top-4"
                      onClick={() => removeBenefits(item.benefit)}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="lg:border-l lg:w-4/12">
          <div className="w-10/12 mx-auto mt-12 rounded-[12px] border">
            <div className="rounded-t-[12px] pb-6 bg-primary ">
              <div className="w-24 h-24 bg-white mx-auto place-center circle relative -top-10 shadow-lg">
                <Image
                  src="https://res.cloudinary.com/greenmouse-tech/image/upload/v1689345898/globfolio/Rectangle_20881_twaxan.png"
                  alt="logo"
                  width={100}
                  height={100}
                  className="w-10"
                />
              </div>
              <div className="text-center text-white">
                <p>{watch("name")}</p>
                <p className="mt-4 fw-600 text-lg">
                  {formatAsNgnMoney(watch("amount"))} / Annual
                </p>
              </div>
            </div>
            <div className="p-4 mt-5 rounded-b-[12px]">
              <ul className="text-[#11182799]">
                {benefits &&
                  !!benefits.length &&
                  benefits.map((item, index) => (
                    <li
                      key={index}
                      className="mb-4 flex justify-between items-center gap-x-4 fw-500"
                    >
                      <span className="fs-400">{item.benefit}</span>
                      <MdCheckCircle className="text-green-600 text-2xl w-8" />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="my-8 px-6 mx-auto">
              <Button
                title="Get Plan"
                altClassName="py-2 w-full bg-primary rounded text-white fw-600"
              />
            </div>
          </div>
          <div className="w-10/12 mx-auto mt-12">
            <Button
              title={
                isBusy ? <ScaleSpinner size={14} color="white" /> : "Publish"
              }
              onClick={handleSubmit(onSubmit)}
            />
          </div>
        </div>
      </div>
      <EditModal title="Edit Plan" wide>
        <EditPlan close={() => ShowEdit(false)} refetch={refetch} plan={plan}/>
      </EditModal>
    </>
  );
};

export default SubItemComp;
