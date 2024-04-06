import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate,useLocation } from 'react-router-dom'


const CreateAuctionPrice = () => {
    const navigate = useNavigate();
    const {state} = useLocation()

    const schema = z.object({
        // Define your schema properties here
        startingPrice: z.string().min(1,{message:"Starting price is required"}),
        increment: z.string().min(1, { message: "Price increment is required" })
    }).refine(data => data.startingPrice/2 >= data.increment, {
        message: 'Increment cannot be more than half of the staring price of the product.',
        path: ['increment'],
      })

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

    const onSubmit = (data) => {
        console.log({...state,...data})
        navigate("/create/schedule", {
            state: {...state,...data}
        })
    }

    return (
        <div className='w-full min-h-screen bg-gray'>
            <Navbar />
            <div className="flex flex-col mt-10 mb-10 w-full h-full items-center">
                <div className="flex flex-row w-3/5 bg-gray-50  rounded-lg  overflow-hidden drop-shadow-lg">
                    <div className="w-5/12 bg-orange">
                    </div>
                    <div className="w-7/12 py-4 px-6 box-border flex flex-col">
                        <div className="mt-5 text-black text-3xl font-semibold">Price Details</div>
                        <div className="text-sm mt-1 text-black">
                            Enter the required details
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mt-5 text-black text-sm">Starting price <span className='text-red-600'>*</span></div>
                            <input type="number" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none"  {...register('startingPrice')} />
                            {errors.startingPrice && <div className="text-red-500 text-sm mt-1">{errors.startingPrice?.message}</div>}

                            <div className="mt-5 text-black text-sm">Increment <span className='text-red-600'>*</span></div>
                            <input type='number' className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('increment',)} />
                            {errors.increment && <div className="text-red-500 text-sm mt-1">{errors.increment?.message}</div>}

                            <div className="flex flex-row-reverse mt-5 mb-10">
                                <button type='submit' className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                                    Next
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAuctionPrice