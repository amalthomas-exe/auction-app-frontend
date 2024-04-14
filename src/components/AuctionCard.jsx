import React from 'react'
import clock from '../assets/clock.png'
import cash from '../assets/cash.png'
import schedule from '../assets/schedule.png'
import people from '../assets/people.png'
import { Link } from 'react-router-dom'

const AuctionCard = (props) => {
    const {name, time, price, peopleCount,coverURL,id} = props
    return (
        <Link to={`/auction/${id}`} className="rounded-xl drop-shadow-xl bg-bluegreen w-1/4 h-80 flex flex-col overflow-hidden mr-7 hover:drop-shadow-2xl cursor-pointer">
            <div className="overflow-hidden w-full h-3/4">
                <img src={coverURL} className='w-full h-full' alt="product" />
            </div>
            <div className="flex flex-row p-3 justify-between">
                <div className="flex flex-col">
                    <div className="text-xl font-bold text-white">{name}</div>
                    <div className="flex flex-row items-center mt-2">
                        <img src={schedule} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white text-sm">{time}</div>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <img src={cash} className='w-4 h-4' alt="cash" />
                        <div className="ml-2 text-white text-sm">{price}</div>
                    </div>
                </div>
                <div className="flex flex-col ml-3">
                    <div className="flex flex-row items-center">
                        <img src={clock} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white">{time}</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <img src={people} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white">{peopleCount}</div>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default AuctionCard