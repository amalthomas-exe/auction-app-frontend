import React, { useEffect, useContext,useState } from 'react'
import Navbar from '../components/Navbar'
import AuctionCard from '../components/AuctionCard'
import { useNavigate,Link } from 'react-router-dom'
import userContext from '../context/users/userContext'
import axios from 'axios'
import { API_URL_AUCTION } from '../constants'


const Dashboard = () => {

  const { loginState, checkIfValidAuthToken } = useContext(userContext)
  const [auctions, setAuctions] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('bidGenieToken')) {
      navigate('/login')
      return
    }

    axios.get(`${API_URL_AUCTION}/get-user-auctions`, {
      headers: {
        'auth-token': `${localStorage.getItem('bidGenieToken')}`
      }
    }).then((res) => {
      console.log(res)
      setAuctions(res.data.auctions)
    }).catch((err) => {
      console.log(err)
    })
    }, [])



  return (
    <div className='bg-gray w-full min-h-full'>
      <Navbar />

      <div className="mt-3 px-5 py-5 w-full h-full">
        <h1 className="text-4xl text-slate-900 font-semibold">Got something to sell?</h1>
        <div className="text-xl text-slate-500 font-semibold mt-4">Click on <span className="text-orange">Create Auction</span> to get the best deals for your product. </div>

        <Link to="/create" className=" drop-shadow-md py-2 px-6 flex flex-row items-center text-xl justify-center font-bold w-fit  text-white  bg-orange rounded-md mt-12 box-border">
          Create Auction
        </Link>


      </div>
      <div className="mt-3 px-5 py-5  bg-gray-50">
        <h1 className="text-xl text-slate-800 font-semibold">Trending auctions 🔥:</h1>
        <section>
          <div className='flex flex-row flex-wrap mt-5 gap-y-5'>
            {
              [1, 2, 3, 4, 5, 6].map((item, index) => <AuctionCard key={index} />)
            }
          </div>
        </section>
      </div>

      <div className="mt-3 px-5 py-5 bg-gray-50">
        <h1 className="text-xl text-slate-800 font-semibold">Your auctions:</h1>
        <section>
          <div className='flex flex-row mt-5s'>
            {
              auctions.map((auction, index) => <AuctionCard key={index} id={auction.auctionID} name={auction.name} time={auction.datetime} price={auction.startingPrice} peopleCount = {123} coverURL={auction.images[1]}/>)
            }
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard