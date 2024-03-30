import React from 'react'
import clock from '../assets/clock.png'
import cash from '../assets/cash.png'
import schedule from '../assets/schedule.png'
import people from '../assets/people.png'

const AuctionCard = (props) => {
    const {name, time, price, peopleCount} = props
    return (
        <div className="rounded-xl drop-shadow-xl bg-bluegreen w-1/4 flex flex-col overflow-hidden mr-7">
            <div className="overflow-hidden w-full">
                <img src="https://via.placeholder.com/150" className='w-full h-full' alt="product" />
            </div>
            <div className="flex flex-row p-3 justify-between">
                <div className="flex flex-col">
                    <div className="text-xl font-bold text-white">Name</div>
                    <div className="flex flex-row items-center mt-2">
                        <img src={schedule} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white text-sm">27 March 2024 - 10:30 AM</div>
                    </div>
                    <div className="flex flex-row items-center mt-2">
                        <img src={cash} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white text-sm">$ 200</div>
                    </div>
                </div>
                <div className="flex flex-col ml-3">
                    <div className="flex flex-row items-center">
                        <img src={clock} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white">Time</div>
                    </div>
                    <div className="flex flex-row items-center">
                        <img src={people} className='w-4 h-4' alt="" />
                        <div className="ml-2 text-white">123</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AuctionCard