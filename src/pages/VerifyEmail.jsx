import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import logo from '../assets/logo.png'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { API_URL_USER } from '../constants'
import axios from 'axios'


const VerifyEmail = () => {
    const { state } = useLocation()
    const navigate = useNavigate()
    delete state.confirmPassword
    console.log(state)

    const schema = z.object({
        otp: z.string().length(6, { message: 'Invalid OTP' }),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    })

    const onSubmit = () => {
        //OTP Verification
        console.log(state)
        axios.post(`${API_URL_USER}/signup`, state)
            .then(res => {
                console.log(res)
                if(res.data.status === 200){
                    navigate('/login')
                }
                else{
                    console.log(res.data.message)
                    navigate('/login')
                }
            })
            .catch(err => {
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
            <div className="flex flex-col mt-10 w-full min-h-screen items-center">
                <div className="flex flex-row w-3/5  bg-gray-50  rounded-lg  overflow-hidden drop-shadow-lg">
                    <div className="w-5/12 bg-orange">
                    </div>
                    <div className="w-7/12 py-4 px-6 box-border flex flex-col">
                        <div className="mt-5 text-black text-3xl font-semibold">Email verification</div>
                        <div className="text-sm mt-1 text-black">
                            Enter the 6 digit OTP sent to your mailbox.
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input placeholder='* * * * * *' type="text" className="text-2xl w-full py-2 px-4 mt-5 bg-gray-100 rounded-md border-none" {...register('otp')} />
                            {errors.otp && <div className="text-red-500 text-sm mt-1">{errors.otp?.message}</div>}
                            <div className="flex flex-row-reverse mt-60">
                                <button type='submit' className="drop-shadow-md py-1 px-8 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                                    Verify email
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmail