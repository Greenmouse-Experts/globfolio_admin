import React, {FC,useState} from 'react'
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextInput, { InputType } from '../UI/TextInput';
import Button from '../UI/Button';
import { ScaleSpinner } from '../UI/Loading';

interface Props {
    refetch: Function
}
const AddSector:FC<Props> = ({refetch}) => {
    const [isBusy, setIsBusy] = useState(false);
    // const [login] = useLazyAdminLoginQuery()
    const {
      control,
      handleSubmit,
      setError,
      formState: { errors, isValid },
    } = useForm({
      mode: "onChange",
      defaultValues: {
        name: "",
      },
    });
  
    const onSubmit = async (data:any) => {
    //   setIsBusy(true);
    //   await login(data)
    //     .then((res:any) => {
    //       if (res.isSuccess) {
    //         toast.success(res.data.message)
    //         setIsBusy(false)
    //         close()
    //       }else {
    //         toast.error(res.error.data.message);
    //         setIsBusy(false);
    //       }
    //     })
    //     .catch((err) => {
    //       toast.error(err?.error?.data?.message);
    //       setIsBusy(false);
    //     });
    };
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div>
            <Controller
              name="name"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "Please enter the name",
                },
              }}
              render={({ field }) => (
                <TextInput
                  label="Sector Name"
                  labelClassName="text-[#000000B2] fw-500"
                  error={errors.name?.message}
                  type={InputType.text}
                  {...field}
                />
              )}
            />
          </div>
          <div className="mt-12">
            <Button title={isBusy ? <ScaleSpinner size={14} color="white"/> : "Add"} disabled={!isValid} />
          </div>
        </form>
      </div>
    );
}

export default AddSector