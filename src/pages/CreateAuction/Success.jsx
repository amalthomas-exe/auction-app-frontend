import React from 'react'
import Navbar from '../../components/Navbar'

const Success = () => {
  return (
    <div className='w-full min-h-screen bg-gray'>
        <Navbar />
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-3/5 p-4 rounded-lg drop-shadow-xl bg-orange">
                <div className="text-slate-900 font-semibold text-2xl">That's it 🙌</div>
                <div className="text-white font-semibold text-lg mt-4">Your auction has been created successfully</div>
            </div>
        </div>
    </div>
  )
}

export default Success