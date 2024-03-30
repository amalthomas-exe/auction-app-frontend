import React from 'react'
import logo from '../assets/logo.png'
import { Link,useNavigate ,useLocation} from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const SignUpAddress = () => {

  const navigate = useNavigate()
  
  const {state} = useLocation()
  console.log(state)
  
  const schema = z.object({
    addressLineOne: z.string().min(1,{message:'Address line 1 is required'}),
    addressLineTwo: z.string().min(1,{message:'Address line 2 is required'}),
    city: z.string().min(1,{message:'City is required'}),
    state: z.string().min(1,{message:'State is required'}),
    country: z.string().min(1,{message:'Country is required'}),
    postalCode: z.string().min(1,{message:'Zip code is required'})
  })

  const { register, handleSubmit, formState: { errors,isDirty,isValid } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    navigate('/signup/verify-email',{
      state:{...state,...data}
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
              <div className="mt-5 text-black text-sm">Address line 1</div>
              <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('addressLineOne')} />
              {errors.addressLineOne && <div className="text-red-500 text-sm mt-1">{errors.addressLineOne?.message}</div>}

              <div className="mt-4 text-black text-sm">Address line 2</div>
              <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('addressLineTwo')} />
              {errors.addressLineTwo && <div className="text-red-500 text-sm mt-1">{errors.addressLineTwo?.message}</div>}

              <div className="mt-4 text-black text-sm">City</div>
              <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('city')} />
              {errors.city && <div className="text-red-500 text-sm mt-1">{errors.city?.message}</div>}

              <div className="mt-4 text-black text-sm">State</div>
              <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register("state")} />
              {errors.state && <div className="text-red-500 text-sm mt-1">{errors.state?.message}</div>}

              <div className="mt-4 text-black text-sm">Country</div>
              <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('country')}/>
              {errors.country && <div className="text-red-500 text-sm mt-1">{errors.country?.message}</div>}

              <div className="mt-4 text-black text-sm">Zip code</div>
              <input type="text" className="w-full py-2 px-4 mt-1 bg-gray-100 rounded-md border-none" {...register('postalCode')} />
              {errors.postalCode && <div className="text-red-500 text-sm mt-1">{errors.postalCode?.message}</div>}

              <div className="flex flex-row-reverse mt-2">
                <button type='submit' className={`drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  ${!isDirty || !isValid ? "bg-gray-100":"bg-orange"} rounded-md mt-4 box-border`}>
                  Next
                </button>
              </div>
            </form>
            <div className="mt-6 flex flex-row items-center justify-center float-end">
              <div className="text-black text-sm">Already have an account?</div>
              <Link to={"/login"}>
                <div className="text-orange text-sm font-semibold ml-1">Login</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpAddress