import React, { useState } from 'react'
import logo from '../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { API_URL_USER } from '../constants'
import axios from 'axios'

const SignUpBasic = () => {

  const navigate = useNavigate()

  const schema = z.object({
    fullName: z.string().min(1, { message: 'Full name is required' }),
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    axios.post(`${API_URL_USER}/checkEmail`, {email:data.email}).then(res => {
      if (res.data.status == 200) {
        navigate('/signup/address', {
          state: data
        })
      }else{
        alert('Email already exists')
      }
    }
    ).catch(err => {
      console.log(err)
    })
  }

  return (
      <div className='p-4 bg-gray w-full h-full'>
        <Link to={"/"}>
          <div className="flex flex-row items-center">
            <img src={logo} className='h-15 w-12' alt="" srcset="" />
            <div className="ml-4 flex flex-row items-center">
              <h1 className='text-3xl'>Bid</h1>
              <h1 className='text-3xl text-orange font-bold'>Genie</h1>
            </div>
          </div>
        </Link>
        <div className="flex flex-col mt-10 w-full h-full items-center">
          <div className="flex flex-row w-3/5 bg-gray-50  rounded-lg  overflow-hidden drop-shadow-lg">
            <div className="w-5/12 bg-orange">
            </div>
            <div className="w-7/12 py-4 px-6 box-border flex flex-col">
              <div className="mt-5 text-black text-3xl font-semibold">Welcome</div>
              <div className="text-sm mt-1 text-black">
                Enter the required details to create your account
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5 text-black text-sm">Full name</div>
                <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none"  {...register('fullName')} />
                {errors.fullName && <div className="text-red-500 text-sm mt-1">{errors.fullName?.message}</div>}

                <div className="mt-5 text-black text-sm">Email</div>
                <input type="email" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('email')} />
                {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email?.message}</div>}

                <div className="mt-5 text-black text-sm">Password</div>
                <input type="password" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('password')} />
                {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password?.message}</div>}

                <div className="mt-5 text-black text-sm">Confirm password</div>
                <input type="password" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('confirmPassword')} />
                {errors.confirmPassword && <div className="text-red-500 text-sm mt-1">{errors.confirmPassword?.message}</div>}

                <div className="flex flex-row-reverse mt-5">
                  <button type='submit' className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                    Next
                  </button>
                </div>
                <div className="mt-6 flex flex-row items-center justify-center float-end">
                  <div className="text-black text-sm">Already have an account?</div>
                  <Link to={"/login"}>
                    <div className="text-orange text-sm font-semibold ml-1">Login</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

  export default SignUpBasic