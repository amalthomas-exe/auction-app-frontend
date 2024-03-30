import React, { useEffect,useContext } from 'react'
import Navbar from '../components/Navbar'
import AuctionCard from '../components/AuctionCard'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/users/userContext'

const Dashboard = () => {

  const {loginState} = useContext(userContext)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('bidGenieToken')){
      navigate('/login')
    }
  },[])

  return (
    <div className='bg-gray w-full min-h-full'>
      <Navbar />
      <div className="mt-3 px-5 py-5">
        <h1 className="text-xl text-slate-800 font-semibold">Trending auctions 🔥:</h1>
        <section>
          <div className='flex flex-row flex-wrap mt-5 space-y-4'>
            {
              [1, 2, 3,4,5,6].map((item, index) => <AuctionCard key={index} />)
            }
          </div>
        </section>
      </div>

      <div className="mt-3 px-5 py-5">
        <h1 className="text-xl text-slate-800 font-semibold">Your auctions:</h1>
        <section>
          <div className='flex flex-row mt-5'>
            {
              [1, 2, 3].map((item, index) => <AuctionCard key={index} />)
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard