import React, { useEffect,useContext } from 'react'
import Navbar from '../components/Navbar'
import AuctionCard from '../components/AuctionCard'
import { useNavigate } from 'react-router-dom'
import userContext from '../context/users/userContext'

const Dashboard = () => {

  const {loginState} = useContext(userContext)
  const navigate = useNavigate()

  useEffect(()=>{
    console.log(loginState)
    if(!loginState){
      navigate('/login')
    }
  },[])

  return (
    <div className='bg-gray w-full h-screen'>
      <Navbar />
      <div className="mt-3 px-5 py-5">
        <h1 className="text-xl text-slate-800 font-semibold">Trending auctions 🔥:</h1>
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