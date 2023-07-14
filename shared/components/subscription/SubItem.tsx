import Image from 'next/image'
import React from 'react'
import { AiOutlineEdit } from 'react-icons/ai'
import { MdCheckCircle } from 'react-icons/md'
import Button from '../UI/Button'

const SubItemComp = () => {
  return (
    <>
        <div className='flex gap-x-8'>
            <div className='w-8/12'>
                <div className=''>
                    <p className='fw-600'>Subscription</p>
                    <div className='border-2 border-[#E8EAED] rounded-[15px] flex p-2 mt-4 px-6'>
                        <input type='text' placeholder='Premium Plan' className='border-0 w-full outline-none'/>
                        <div className='flex gap-x-2 items-center p-1 px-2 rounded-[15px] border border-[#5F5F5F]'>
                            <p>Edit</p>
                            <AiOutlineEdit/>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <p className='fw-600'>Price / month</p>
                    <div className='border-2 border-[#E8EAED] rounded-[15px] flex p-2 mt-4 px-6'>
                        <input type='text' placeholder='Premium Plan' className='border-0 w-full outline-none'/>
                        <div className='flex gap-x-2 items-center p-1 px-2 rounded-[15px] border border-[#5F5F5F]'>
                            <p>Edit</p>
                            <AiOutlineEdit/>
                        </div>
                    </div>
                </div>
                <div className='mt-8'>
                    <p className='fw-600'>Feautures</p>
                    <div className='border-2 border-[#E8EAED] rounded-[15px] p-6 mt-4'>
                        <div className='flex rounded-[15px]'>
                        <input type='text' placeholder='Premium Plan' className='border-0 w-full outline-none'/>
                        <div className='flex p-1 px-2 rounded-[20px] border border-[#5F5F5F]'>
                            <p>Edit</p>
                            <AiOutlineEdit/>
                        </div>
                        </div>
                        <div className='py-5'>
                            <p className='text-[#5F5F5F] fw-500'>Premium access to advisory</p>
                        </div>
                        <div className='py-5'>
                            <p className='text-[#5F5F5F] fw-500'>Premium Bonuses</p>
                        </div>
                        <div className='py-5'>
                            <p className='text-[#5F5F5F] fw-500'>Analyzed stock data</p>
                        </div>
                        <div className='py-5'>
                            <p className='text-[#5F5F5F] fw-500'>Referral Bonuses</p>
                        </div>
                        <div className='py-5'>
                            <p className='text-[#5F5F5F] fw-500'>Premium Bonuses</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='border-l w-4/12'>
                <div className='w-10/12 mx-auto mt-12 rounded-[12px] border'>
                    <div className='rounded-t-[12px] pb-6 bg-primary '>
                        <div className='w-24 h-24 bg-white mx-auto place-center circle relative -top-10 shadow-lg'>
                        <Image src='https://res.cloudinary.com/greenmouse-tech/image/upload/v1689345898/globfolio/Rectangle_20881_twaxan.png' alt='logo' width={100} height={100} className='w-10'/>
                        </div>
                        <div className='text-center text-white'>
                            <p>PREMIUM</p>
                            <p className='mt-4 fw-600 text-lg'>₦6,000 / Month</p>
                        </div>
                    </div>
                    <div className='p-4 mt-5 rounded-b-[12px]'>
                        <ul className='text-[#11182799]'>
                            <li className='flex justify-between items-center gap-x-4 fw-500'><span>Unlimited App usage</span><MdCheckCircle className='text-green-600 text-2xl'/></li>
                            <li className='flex justify-between items-center gap-x-4 fw-500 mt-4'><span>Premium access to advisory</span><MdCheckCircle className='text-green-600 text-2xl'/></li>
                            <li className='flex justify-between items-center gap-x-4 fw-500 mt-4'><span>Premium Bonuses</span><MdCheckCircle className='text-green-600 text-2xl'/></li>
                            <li className='flex justify-between items-center gap-x-4 fw-500 mt-4'><span>Analyzed stock data</span><MdCheckCircle className='text-green-600 text-2xl'/></li>
                            <li className='flex justify-between items-center gap-x-4 fw-500 mt-4'><span>Referral Bonuses</span><MdCheckCircle className='text-green-600 text-2xl'/></li>
                        </ul>
                    </div>
                    <div className='my-8 px-6 mx-auto'>
                        <Button title='Get Plan' altClassName='py-2 w-full bg-primary rounded text-white fw-600'/>
                    </div>
                </div>
                <div className='w-10/12 mx-auto mt-12'>
                    <Button title='Publish'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default SubItemComp