import React, { useEffect, useState, useContext } from 'react'
import logo from '../assets/logo.png'
import { Link } from 'react-router-dom'
import userContext from '../context/users/userContext.jsx'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu.tsx"

import { User,Settings,LogOut } from 'lucide-react'

const Navbar = () => {

  const { loginState, user } = useContext(userContext)

  return (
    <div className='p-4 flex flex-row items-center justify-between box-border'>
      <Link to="/" >
        <div className="flex flex-row items-center">
          <img src={logo} className='h-15 w-12' alt="" srcset="" />
          <div className="ml-4 flex flex-row items-center">
            <h1 className='text-3xl'>Bid</h1>
            <h1 className='text-3xl text-orange font-bold'>Genie</h1>
          </div>
        </div>
      </Link>

      {!loginState ? <Link to={"/login"} className="drop-shadow-md py-2 px-7 flex flex-row items-center justify-center font-bold text-white  bg-orange rounded-lg">
        Login
      </Link> :
        <DropdownMenu>
          <DropdownMenuTrigger className="drop-shadow-md w-14 h-14 rounded-full flex flex-row items-center justify-center border-orange border-solid border-2">
            <img src={user.avatarURL} className='w-12 h-12' alt="profile picture" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>{user.fullName}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-slate-400" />
            <DropdownMenuItem>
            <User size={15} className='mr-2 text-slate-800'/> Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
             <Settings size={15} className='mr-2 text-slate-800' /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem>
            <LogOut size={15} className='mr-2 text-slate-800' /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>}
    </div>
  )
}

export default Navbar