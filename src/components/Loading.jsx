import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-screen'>
        <div className='flex justify-center items-center w-full h-full'>
            <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'>
            </div>
        </div>

    </div>
  )
}

export default Loading