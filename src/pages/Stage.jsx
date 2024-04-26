import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocation,useNavigate, useParams } from 'react-router-dom'
import userContext from '../context/users/userContext'


const Stage = () => {

    const { state } = useLocation()
    const navigate = useNavigate()
    const { id } = useParams()

    const [bids, setBids] = useState([])
    const [progress, setProgress] = useState(null)

    const { user, socketInstance,bidders } = useContext(userContext)

    useEffect(() => {
        socketInstance.on('new-bid', (data) => {
            console.log(data)
            setBids(data.bids[id])
            setProgress(0)
        })

        socketInstance.on("auction-concluded",(data)=>{
            console.log("Auction concluded")
            navigate(`/auction/report/${id}`,{
                state:{
                    "winningBid":bids[bids.length-1],
                    "auctionDetails":state,
                    "peopleCount":bidders.length,
                    "bidsCount":bids.length,
                    "bidders":bidders
                }
            })
        })
    })

    const handlePlaceBid = () => {
        socketInstance.emit('new-bid', {
            auctionID: id,
            userID: user.userID,
            bidAmount: bids.length == 0 ? Number(state.startingPrice) + Number(state.increment) : bids[bids.length - 1].bidAmount + Number(state.increment)
        })
    }

    const handleConcludeAuction = () => {
        socketInstance.emit('conclude-auction', {
            auctionID: id
        })
    }

    console.log(state)
    return (
        <div className='bg-gray w-full min-h-screen'>
            <Navbar />
            <div className="flex flex-row w-full justify-between p-5 mt-5">
                <div className="flex flex-col w-fit h-fit p-5 border-2 border-gray-100 rounded-lg">
                    <div className='font-semibold text-slate-700 text-xl'>Auction details</div>

                    <div className="flex flex-row w-full mt-5">
                        <div className="flex flex-col w-fit">
                            <div className="font-semibold text-orange text-lg">Name</div>
                            <div className="font-normal text-slate-500 text-md">{state.name}</div>
                        </div>
                        <div className="flex flex-col w-fit ml-10">
                            <div className="font-semibold text-orange text-lg">Starting price</div>
                            <div className="font-normal text-slate-500 text-md">{state.startingPrice}</div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full mt-5">
                        <div className="flex flex-col w-fit">
                            <div className="font-semibold text-orange text-lg">Current bidding price</div>
                            <div className="font-normal text-slate-500 text-md">{bids.length == 0 ? "No bids placed" : bids[bids.length - 1].bidAmount}</div>
                        </div>
                    </div>

                    <div className="flex flex-row w-full mt-5">
                        <div className="flex flex-col w-fit">
                            <div className="font-semibold text-orange text-lg">Highest Bidder</div>
                            <div className="font-normal text-slate-500 text-md">{bids.length == 0 ? "No bids placed" : bids[bids.length - 1].fullName}</div>
                        </div>
                    </div>
                </div>

                <div className="w-2/3">

                    <div className="flex flex-col p-5 w-fit">
                        <div className='font-semibold text-slate-700 text-2xl'>Live Bids <span class="inline-block animate-pulse rounded-full p-2 bg-red-400 text-white text-sm"></span></div>
                        <div className="flex flex-row">
                            <div className="flex flex-col bg-gray-100 min-w-2.5 p-5 rounded-md mt-4">
                                <div className="font-semibold text-slate-800 text-xl">Current contender 👑</div>

                                {bids.length == 0 ? <div className="font-semibold text-slate-700 mt-4 text-2xl">No bids placed</div> :
                                    <div className="flex flex-row mt-7 items-center">
                                        <img src={bids[bids.length - 1].avatarURL} alt="pic" className='border-2 border-white w-32 h-32 rounded-full mr-8' />
                                        <div className="flex flex-col">
                                            <div className="font-semibold text-slate-700 text-4xl">{bids[bids.length - 1].fullName}</div>
                                            <div className="font-semibold text-green-600 text-6xl">{bids[bids.length - 1].bidAmount}</div>
                                        </div>
                                    </div>}
                            </div>

                            <div className="flex flex-col mt-7 ml-10">
                                <div className="font-semibold text-slate-800 text-xl">Total no of bids</div>
                                <div className='font-semibold text-5xl'>
                                    {bids.length}
                                </div>

                                <div className="font-semibold text-slate-800 text-xl mt-4">No. of bidders</div>
                                <div className='font-semibold text-5xl'>
                                    {bidders.length}
                                </div>
                            </div>
                        </div>


                    </div>
                    <div className="w-full flex flex-row">
                        {
                            (user.userID === state.userID) ?
                                <div className="flex flex-col p-5 w-full mt-10">
                                    <div className="flex mt-2 flex-row-reverse">
                                        <button onClick={handleConcludeAuction} className="px-4 py-2 rounded-md text-xl font-semibold text-white bg-orange ">Conclude auction</button>
                                    </div>
                                </div> :
                                <div className="flex flex-row justify-between w-full">

                                    <div className="flex flex-col p-5 w-fit">
                                        <div className='font-semibold text-slate-700 text-2xl mt-20'>Bid Now</div>
                                        <button disabled={(bids.length==0)?false:(bids[bids.length - 1].userID === user.userID)} onClick={handlePlaceBid} className={`flex flex-col p-5 border-2 rounded-md drop-shadow-lg mt-4 ${(bids.length==0)?"border-green-600":(bids[bids.length - 1].userID === user.userID)?"border-slate-400":"border-green-600"} text-5xl font-semibold ${(bids.length==0)?"text-green-600":(bids[bids.length - 1].userID === user.userID)?"text-slate-400":"text-green-600"}`}>
                                            {bids.length == 0 ? Number(state.startingPrice) + Number(state.increment) : bids[bids.length - 1].bidAmount + Number(state.increment)}
                                        </button>
                                    </div>

                                    <div className="flex flex-col p-5 w-fit mt-20 ml-10">
                                        <div className="flex flex-col px-4 py-2 rounded-md drop-shadow-lg mt-4 bg-orange text-xl font-semibold text-white">
                                            Leave Auction
                                        </div>
                                    </div>
                                </div>

                        }
                    </div>
                </div>

                <div className="flex flex-col w-fit h-96 p-5 border-2 border-gray-100 rounded-lg overflow-y-scroll">
                    <div className='font-semibold text-slate-700 text-xl'>Bids history</div>

                    <div className="flex flex-col-reverse">
                        {
                            bids.length == 0 ?
                                <div className="flex flex-col w-full px-2 mt-5">
                                    <div className="font-semibold text-orange text-lg">No bids placed yet</div>
                                </div> :
                                bids.map((bid, index) => {
                                    return (
                                        <div className="flex flex-col bg-gray-100 p-5 rounded-md mt-4">

                                            {bids.length == 0 ? <div className="font-semibold text-slate-700 mt-4 text-2xl">No bids placed</div> :
                                                <div className="flex flex-row items-center">
                                                    <img src={bid.avatarURL} alt="pic" className='w-10 h-10 rounded-full mr-5' />
                                                    <div className="flex flex-col">
                                                        <div className="font-semibold text-slate-700 text-xl">{bid.fullName}</div>
                                                        <div className="font-semibold text-green-600 text-2xl">{bid.bidAmount}</div>
                                                    </div>
                                                </div>}
                                        </div>
                                    )
                                })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stage