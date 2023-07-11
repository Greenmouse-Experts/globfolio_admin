import React, {FC, useState} from 'react'
import { useLazyLogoutQuery } from '@/services/api/authSlice';
import { resetUser } from '@/shared/redux/reducers/userSlice';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { FadeSpinner } from '../UI/Loading';
import Button from '../UI/Button'
// import { FadeSpinner} from '@/shared/components/Ui/Loaders';

interface Props {
    CloseModal: () => void;
  }

const LogoutModal:FC<Props> = ({CloseModal}) => {
    const [isBusy, setIsBusy] = useState<boolean>()
    const [ logout ] = useLazyLogoutQuery() 
    const router = useRouter()
    const dispatch = useDispatch();

    const logoutUser = async() => {
        setIsBusy(true)
        await logout()
            .then((res:any) => {
                if(res.isSuccess){
                    dispatch(resetUser())
                    toast.success(res.data.message)
                    router.push('/')
                }
            })
            .catch(() => {})
        setIsBusy(false)
    }
  return (
    <div>
        <p>Are you sure you want to log out</p>
        <div className='flex justify-between mt-10'>
            <Button title='Cancel' onClick={CloseModal} altClassName='px-6 py-2 border rounded text-primary'/>
            <Button title={isBusy ? <FadeSpinner size={4} color="white"/> : "Logout"} altClassName='px-6 w-24 py-2 btn-like' onClick={logoutUser}/>
        </div>
    </div>
  )
}

export default LogoutModal