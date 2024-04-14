import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/users/userContext'
import axios from 'axios'
import { API_URL_AUCTION } from '../constants'

const AuctionDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { loginState, checkIfProperLoggedIn } = useContext(userContext)
    const [auction, setAuction] = useState({})

    useEffect(() => {
        if (!checkIfProperLoggedIn()) {
            navigate('/login')
            return
        }

        axios.get(`${API_URL_AUCTION}/get-auction-by-id?auctionID=${id}`).then((res) => {
            console.log("Success")
            console.log(res)
            setAuction(res.data.auction)
        }).catch((err) => {
            console.log("Error")
            console.log(err)
        })
    }, [])
    return (
        <div className='bg-gray w-full min-h-full'>
            <Navbar />

            <div className="mt-3 px-5 py-5 w-full h-full">
                <h1 className="text-4xl text-slate-900 font-semibold">{auction.name}</h1>
                <div className="text-xl text-slate-500 font-semibold mt-4">Click on <span className="text-orange">Create Auction</span> to get the best deals for your product. </div>
            </div>
        </div>
    )
}

export default AuctionDetails