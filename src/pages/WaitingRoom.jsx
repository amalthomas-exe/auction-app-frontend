import React, { useState, useContext, useEffect } from 'react'
import userContext from '../context/users/userContext'
import Navbar from '../components/Navbar'
import { useLocation, useParams ,useNavigate} from 'react-router-dom'


const WaitingRoom = () => {

    const { id } = useParams()
    const { user, socketInstance, bidders } = useContext(userContext)
    const navigate = useNavigate()
    const { state } = useLocation()

    console.log(state)

    useEffect(()=>{
        socketInstance.on('bidding-started', (data) => {
            navigate(`/auction/stage/${id}`,{state:state})
        })
    })


    const handleJoinOrStartAuction = () => {
        if (user.userID === state.userID) {
            socketInstance.emit('start-bidding', { auctionID: id })
        }
        else {
            console.log("Joining auction")
            socketInstance.emit('bidder-join-auction', { auctionID: id, userID: user.userID })
        }
    }

    const checkIfUserIDAlreadyInRoom = (userID) => {
        for (let i = 0; i < bidders.length; i++) {
            if (bidders[i].userID === userID) {
                return true
            }
        }
        return false
    }

    return (
        <div className='bg-gray w-full min-h-screen'>
            <Navbar />
            <div className="px-5">
                <div className="text-2xl font-semibold text-slate-900">
                    Online bidders ({bidders.length})
                </div>
                <div className="bg-gray-100 flex flex-row flex-wrap w-100 h-full p-5 mt-5 rounded-lg">
                    {
                        bidders.length == 0 ? <div className="w-full h-full flex flex-row items-center justify-center text-slate-600 font-xl">Waiting for bidders...</div>
                            : bidders.map((bidder, index) => {
                                return (
                                    <div key={index} className=" w-fit mr-5 h-fit rounded-full p-0.5 bg-white">
                                        <img src={bidder.avatarURL} alt="avatar" className="w-20 h-20 rounded-full" />
                                    </div>
                                )
                            })
                    }
                </div>
                <div className="mt-5">
                    {
                        checkIfUserIDAlreadyInRoom(user.userID) ? <div onClick={handleJoinOrStartAuction} className="bg-orange opacity-45 float-right text-white py-2 px-5 rounded-md font-semibold">Waiting for host to start...</div> :
                            <button onClick={handleJoinOrStartAuction} className="bg-orange float-right text-white py-2 px-5 rounded-md font-semibold">{`${user.userID === state.userID ? "Start" : "Join"} auction`}</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default WaitingRoom