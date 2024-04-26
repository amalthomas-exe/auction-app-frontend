import React, { useState, useContext, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/users/userContext'


const AuctionReport = () => {

    const { state } = useLocation()
    const { id } = useParams()
    const { user,socketInstance } = useContext(userContext)
    const navigate = useNavigate()

    useEffect(()=>{
        socketInstance.on("transaction-confirmed",(data)=>{
            console.log(data)
            navigate('/dashboard')
        })
    
    })

    const convertToDate = (dateTime) => {
        let date = new Date(dateTime);
        let day = String(date.getDate()).padStart(2, '0');
        let month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based in JavaScript
        let year = String(date.getFullYear()); // Get last 2 digits of year
        return `${day}-${month}-${year}`;
    }

    const convertToAMPM = (dateTime) => {
        let date = new Date(dateTime);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }

    const handleConfirm = ()=>{
        socketInstance.emit('confirm-transaction',{
            "auctionID":id,
            "winnerID":state.winningBid.userID,
            "hostID":user.userID,
            "amount":state.winningBid.bidAmount,
        })
    }

    const handleCancel = ()=>{
        navigate('/dashboard')
    }

    return (
        <div className='bg-gray w-full min-h-screen p-5'>
            <Navbar />
            {
                (state.winningBid.userID === user.userID) ?
                    <div className="flex flex-col w-full justify-center items-center mt-10">
                        <div className="font-semibold text-2xl text-slate-700">Congratulations! You have won the auction 🍾</div>
                    </div>
                    :
                    <div className="flex flex-col w-full justify-center items-center mt-10">
                        <div className="font-semibold text-2xl text-slate-700">Auction concluded</div>
                    </div>
            }
            <div className="w-full h-full flex flex-col justify-center items-center mt-10">
                <div className="w-2/5 p-4 bg-gray-50 rounded-lg drop-shadow-xl flex flex-col">
                    <div className="text-orange font-semibold text-lg mt-4">Basic details</div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Product name</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.auctionDetails.name}</div>
                        </div>
                        <div className='ml-24'>
                            <div className="text-slate-500 font-semibold text-base">Description</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.auctionDetails.description}</div>
                        </div>
                    </div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Starting price</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.auctionDetails.startingPrice}</div>
                        </div>
                        <div className='ml-24'>
                            <div className="text-slate-500 font-semibold text-base">Bid increment</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.auctionDetails.increment}</div>
                        </div>
                    </div>

                    <div className="text-orange font-semibold text-lg mt-6">Date and time</div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Date</div>
                            <div className="text-slate-900 font-semibold text-xl">{convertToDate(state.auctionDetails.dateTime)}</div>
                        </div>
                        <div className='ml-24'>
                            <div className="text-slate-500 font-semibold text-base">Time</div>
                            <div className="text-slate-900 font-semibold text-xl">{convertToAMPM(state.auctionDetails.dateTime)}</div>
                        </div>
                    </div>

                    <div className="text-orange font-semibold text-lg mt-6">Auction details</div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Bidder count</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.peopleCount}</div>
                        </div>
                        <div className='ml-24'>
                            <div className="text-slate-500 font-semibold text-base">No. of bids placed</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.bidsCount}</div>
                        </div>
                    </div>

                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base mt-2">Participants</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.bidders.map((bidder) => {
                                return <div className="flex flex-row p-3">
                                    <img src={bidder.avatarURL} alt="" className='w-10 h-10 rounded-full ' />
                                    <div className="ml-2">{bidder.fullName}</div>
                                </div>
                            })}</div>
                        </div>
                    </div>

                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base mt-2">Winner</div>
                            <div className="text-slate-900 font-semibold text-xl"><div className="flex flex-row p-3">
                                <img src={state.winningBid.avatarURL} alt="" className='w-10 h-10 rounded-full ' />
                                <div className="ml-2">{state.winningBid.fullName}</div>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base mt-2">Final Amount</div>
                            <div className="text-slate-900 font-semibold text-xl">
                                {state.winningBid.bidAmount}
                            </div>
                        </div>
                    </div>

                    {state.auctionDetails.userID === user.userID ?
                        <div className="flex w-full flex-row-reverse mt-5 mb-5">
                            <button onClick={handleConfirm} className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                                Confirm
                            </button>

                            <button onClick={handleCancel} className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  bg-transparent border-red-500 border-solid border-2 text-red-500 rounded-md mt-4 box-border mr-5">
                                Cancel
                            </button>
                        </div> :
                        <div className="flex w-full flex-row-reverse mt-5 mb-5">
                          <span class="inline-block animate-pulse rounded-full p-2 bg-red-400 text-white text-sm"></span>Waiting for the auctioneer to confirm   
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default AuctionReport