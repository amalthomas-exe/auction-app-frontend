import React,{useContext} from 'react'
import logo from '../assets/logo.png'
import { Link,useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { API_URL_USER } from '../constants'
import axios from 'axios'
import userContext from '../context/users/userContext'


const Login = () => {
  const {setLoginState,setAuthToken} = useContext(userContext)
  const navigate = useNavigate()
  const schema = z.object({
    email: z.string().email({ message: 'Invalid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  })

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) })

  const onSubmit = (data) => {
    console.log(data)
    axios.post(`${API_URL_USER}/login`, data)
      .then((res) => {
        console.log(res)
        if(res.data.status==200){
          localStorage.setItem('bidGenieToken', res.data.auth_token)
          setLoginState(true)
          setAuthToken(res.data.auth_token)
          navigate('/dashboard')
        }
        else{
          alert(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className='p-4 bg-gray w-full h-screen'>
      <Link to={"/"}>
        <div className="flex flex-row items-center">
          <img src={logo} className='h-15 w-12' alt="" srcset="" />
          <div className="ml-4 flex flex-row items-center">
            <h1 className='text-3xl'>Bid</h1>
            <h1 className='text-3xl text-orange font-bold'>Genie</h1>
          </div>
        </div>
      </Link>
      <div className="flex flex-row w-full h-full items-center justify-center">
        <div className="flex flex-row w-3/5 h-3/4 bg-gray-50  rounded-lg  overflow-hidden drop-shadow-lg">
          <div className="w-5/12 bg-orange">
          </div>
          <div className="w-7/12 py-4 px-6 box-border flex flex-col">
            <div className="mt-5 text-black text-3xl font-semibold">Welcome back</div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mt-10 text-black text-lg">Email</div>
              <input type="text" className="w-full py-2 px-4 mt-2 bg-gray-100 rounded-md border-none" {...register('email')}/>
              {errors.email && <div className="text-red-500 text-sm mt-1">{errors.email?.message}</div>}

              <div className="mt-5 text-black text-lg">Password</div>
              <input type="password" className="w-full py-2 px-4 mt-2 bg-gray-100 rounded-md border-none" {...register('password')} />
              {errors.password && <div className="text-red-500 text-sm mt-1">{errors.password?.message}</div>}

              <div className="text-orange mt-1 text-sm font-semibold">Forgot password ?</div>

              <div className="flex flex-row-reverse">
                <button type="submit" className="drop-shadow-md py-2 px-8 flex flex-row items-center text-lg justify-center font-bold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                  Login
                </button>
              </div>
            </form>
            <div className="mt-16 flex flex-row items-center justify-center float-end">
              <div className="text-black text-sm">Don't have an account?</div>
              <Link to={"/signup"}>
                <div className="text-orange font-semibold ml-1 text-sm">Create account</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login