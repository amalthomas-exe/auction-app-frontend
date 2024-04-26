import React, { useState } from 'react'
import Navbar from '../../components/Navbar'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'


const CreateAuctionBasic = () => {
  const navigate = useNavigate();
  const [progress, setprogress] = useState(0)

  const schema = z.object({
    // Define your schema properties here
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(10, { message: "Description too short" })
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const [descLength, setDescLength] = useState(0);

  const onSubmit = (data) => {
    setprogress(100)
    console.log(data)
    navigate("/create/price-details", {
      state: data
    })
  }

  return (
    <>
      <div className='w-full min-h-screen bg-gray'>
        <Navbar />

        <LoadingBar color='#f11946' progress={0} onLoaderFinished={() => { setprogress(0) }} />
        <div className="flex flex-col mt-10 mb-10 w-full h-full items-center">
          <div className="flex flex-row w-3/5 bg-gray-50  rounded-lg  overflow-hidden drop-shadow-lg">
            <div className="w-5/12 bg-orange">
            </div>
            <div className="w-7/12 py-4 px-6 box-border flex flex-col">
              <div className="mt-5 text-black text-3xl font-semibold">Basic Details</div>
              <div className="text-sm mt-1 text-black">
                Enter the required details
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-5 text-black text-sm">Product name <span className='text-red-600'>*</span></div>
                <input type="text" className={`border w-full py-2 px-4 mt-1 bg-gray-100 ${errors.name ? 'border-red-500' : "border-gray-100"} rounded-md `}  {...register('name')} />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name?.message}</div>}

                <div className="mt-5 text-black text-sm">Description <span className='text-red-600'>*</span></div>
                <textarea className={`border w-full h-1/3 py-2 px-4 mt-1 bg-gray-100 rounded-md ${errors.description ? 'border-red-500' : "border-gray-100"} rounded-md focus:border-blue-600`} {...register('description', {
                  onChange: (e) => {
                    setDescLength(e.target.value.trim().length)
                  }
                })} />
                <div className="w-full flex flex-row text-slate-700 justify-end text-sm">{descLength} /10 characters </div>
                {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description?.message}</div>}

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
    </>
  )
}

export default CreateAuctionBasic