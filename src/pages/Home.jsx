import React from 'react'
import Navbar from '../components/Navbar'
import AuctionCard from '../components/AuctionCard'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='bg-gray w-full h-screen flex flex-col'>
      <Navbar />
      <div className=' p-10 w-3/6 mt-28 box-border'>
        <h1 className='text-4xl'>Your one-stop solution for selling stuff online. </h1>

        <Link to="/dashboard" className=" drop-shadow-md py-2 px-6 flex flex-row items-center text-xl justify-center font-bold w-fit  text-white  bg-orange rounded-md mt-12 box-border">
          Get started
        </Link>
      </div>
      <section className='p-4 w-full bg-orange'>
        <div className='text-lg text-white font-bold'>Top autions now</div>
        <div className='flex flex-row mt-5'>
          {
            [1, 2, 3].map((item, index) => <AuctionCard key={index} />)
          }
        </div>
      </section>
    </div>
  )
}

export default Home