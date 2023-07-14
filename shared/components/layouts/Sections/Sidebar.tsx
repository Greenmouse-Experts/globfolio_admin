import React, {FC} from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import {  BsArrowsAngleContract, BsFillGrid1X2Fill, BsGear } from 'react-icons/bs'
import { MdOutlineInsertChartOutlined } from 'react-icons/md'
import { TfiShiftLeft } from 'react-icons/tfi'
import { FaUsersViewfinder } from 'react-icons/fa6';
import { IoNotificationsOutline } from 'react-icons/io5';
import {  AiOutlineUnorderedList } from 'react-icons/ai';
import useModal from '@/hooks/useModal';
import LogoutModal from '../../auth/Logout';
import { usePathname } from 'next/navigation'
import  logo  from '../../../../public/logo.svg'
import { RiFileCopy2Line } from 'react-icons/ri';
import { FaRegCreditCard } from 'react-icons/fa';

interface Props {
  setToggled: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  toggled:boolean,
}
const SidebarLayout:FC<Props>  = ({setToggled, toggled}) => {

  const {Modal, setShowModal} = useModal()
  const path = usePathname()
  return (
    <div className="left-0 top-0 fixed index-30 h-screen bg-[#0B1B2B]">
      <Sidebar
        customBreakPoint="960px"
        className="h-screen overflow-y-auto w-64 fs-700 fw-500 text-white px-6"
        onClick={() => setToggled(false)} 
        toggled={toggled}
        backgroundColor="linear-gradient(90deg, #6B5AED 0%, #8D7EFF 100%)"
      >
        <div className="mb-6 border-b">
          <Link href="/">
            <Image
              src={logo}
              alt="logo"
              width={300}
              height={100}
              className="w-32"
            />
          </Link>
        </div>
        <Menu
          transitionDuration={600}
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: active ? "#ffff" : "#7D7D7D",
                  marginTop: "6px",
                  padding: "3px 10px !important ",
                  textAlign: "left",
                  borderRadius: "10px !important",
                  backgroundColor: active ? "#1F2937 !important" : undefined,
                  "&:hover": {
                    backgroundColor: "#1F2937 !important",
                    borderRadius: "5px !important",
                  },
                };
            },
          }}
        >
          <MenuItem
            component={<Link href="/dashboard" />}
            icon={<BsFillGrid1X2Fill className='text-lg'/>}
            active={path === "/dashboard" && true}
          >
           <p className='fs-400'>Dashboard</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/users" />}
            icon={<FaUsersViewfinder  className='text-xl' />}
            active={path === "/users" && true}
          >
            <p className='fs-400'>Users</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/subscription" />}
            icon={<FaRegCreditCard className='' />}
            active={path === "/subscription" && true}
          >
            <p className='fs-400'>Subscriptions</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/top-gainer" />}
            icon={<AiOutlineUnorderedList className='text-xl'/>}
            active={path === "/top-gainer" && true}
          >
            <p className='fs-400'>Top Gainers</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/markets" />}
            icon={<MdOutlineInsertChartOutlined className='text-xl' />}
            active={path === "/markets" && true}
          >
            <p className='fs-400'>Markets</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/analyst-picks" />}
            icon={<RiFileCopy2Line className='text-lg' />}
            active={path === "/analyst-picks" && true}
          >
            <p className='fs-400'>Analyst Picks</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/notification" />}
            icon={<IoNotificationsOutline className='text-xl' />}
            active={path === "/notification" && true}
          >
            <p className='fs-400'>Notifications</p>
          </MenuItem>
          <MenuItem
            component={<Link href="/transaction" />}
            icon={<BsArrowsAngleContract className='text-xl' />}
            active={path === "/transaction" && true}
          >
            <p className='fs-400'>Transactions</p>
          </MenuItem>
          <MenuItem
          className="mt-16"
            component={<Link href="/settings" />}
            icon={<BsGear className='text-lg' />}
            active={path === "/settings" && true}
          >
            <p className='fs-400'>Settings</p>
          </MenuItem>
          <MenuItem
            icon={<TfiShiftLeft className='text-lg' />}
            onClick={() => setShowModal(true)}
            className="mb-4"
          >
            <p className='fs-400'>Logout</p>
          </MenuItem>
        </Menu>
      </Sidebar>
      <Modal title="" noHead>
        <LogoutModal CloseModal={() => setShowModal(false)} />
      </Modal>
    </div>
  )
}

export default SidebarLayout