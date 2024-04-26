import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import AuctionCard from '../components/AuctionCard'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import axios from 'axios'
import { API_URL_AUCTION } from '../constants'

const Home = () => {

  const [allAuctions, setAllAuctions] = useState([])
  const [loading, isLoading] = useState(true)
  useEffect(() => {
    axios.get(`${API_URL_AUCTION}/get-all-auctions`).then((res) => {
      console.log(res)
      setAllAuctions(res.data.auctions)


      isLoading(false)
    }).catch((err) => {
      console.log(err)
    })

  }, [])
  return (
    <div className='bg-gray w-full h-screen flex flex-col'>
      <Navbar />{loading ? <Loading /> : <>
        <div className=' p-10 w-3/6 mt-28 box-border'>
          <h1 className='text-4xl'>Your one-stop solution for selling stuff online. </h1>

          <Link to="/dashboard" className=" drop-shadow-md py-2 px-6 flex flex-row items-center text-xl justify-center font-bold w-fit  text-white  bg-orange rounded-md mt-12 box-border">
            Get started
          </Link>
        </div>
        <section className='p-4 w-full bg-orange'>
          <div className='text-lg text-white font-bold'>Top autions now</div>
          <div className='flex flex-row mt-5 flex-wrap gap-5'>
            {
              allAuctions.map((auction, index) => <AuctionCard key={index} id={auction.auctionID} name={auction.name} time={auction.datetime} price={auction.startingPrice} peopleCount={123} coverURL={auction.coverImage} />)
            }
          </div>
        </section>
      </>}
    </div>
  )
}

export default Home