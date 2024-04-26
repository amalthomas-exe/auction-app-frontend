import React, { useContext, useEffect, useState, useCallback } from 'react'
import Navbar from '../../components/Navbar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import userContext from '../../context/users/userContext'
import axios from 'axios'
import ImageViewer from "react-simple-image-viewer";
import { API_URL_AUCTION } from '../../constants'
import './AuctionDetails.css'
import clock from '../../assets/clock.png'
import cash from '../../assets/cash.png'
import schedule from '../../assets/schedule.png'
import people from '../../assets/people.png'
import Loading from '../../components/Loading'
import { io } from 'socket.io-client'

const AuctionDetails = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { user,handleConnect ,socketInstance} = useContext(userContext)
    const [auction, setAuction] = useState({})
    const [loading, isLoading] = useState(true)

    const [currentImage, setCurrentImage] = useState(0);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const images = auction.images;

    const openImageViewer = useCallback((index) => {
        setCurrentImage(index);
        setIsViewerOpen(true);
    }, []);

    const closeImageViewer = () => {
        setCurrentImage(0);
        setIsViewerOpen(false);
    };

    useEffect(() => {
        console.log("Auction Details")
        axios.get(`${API_URL_AUCTION}/get-auction-by-id?auctionID=${id}`).then((res) => {
            console.log("Success")
            console.log(res)
            setAuction(res.data.auction)
            isLoading(false)
        }).catch((err) => {
            console.log("Error")
            console.log(err)
        })

        handleConnect(id)
    }, [])



    

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

    const handleStartAuction = () => {
        socketInstance.emit("start-auction",{auctionID:id})
        navigate(`/auction/waiting-room/${id}`,{
            state:auction
        })
    }

    return (
        <div className='bg-gray w-full min-h-full'>
            <Navbar />
            {loading ? <div><Loading /></div> : <div>
                <section className="w-full min-h-screen">
                    <div className="w-full h-full bg-red-50">
                        <div style={{ "backgroundImage": `url(${auction.coverImage})` }} id="coverImg">
                            <div id="filter"></div>
                            <div id="content">
                                <div className="text-white text-7xl">{auction.name}</div>

                                <div className="mt-7">
                                    <div className="flex flex-row items-center ">
                                        <img src={schedule} className="w-6 h-6" alt="calender" />
                                        <div className="text-white text-xl ml-3">{convertToDate(auction.dateTime)}</div>
                                    </div>
                                    <div className="flex flex-row items-center mt-2 ">
                                        <img src={clock} className="w-6 h-6" alt="calender" />
                                        <div className="text-white text-xl ml-3">{convertToAMPM(auction.dateTime)}</div>
                                    </div>
                                </div>

                                <div to={`/auction/waiting-room/${id}`} className="mt-7">
                                    <div className="w-fit px-4 py-2 rounded-md bg-orange text-white font-semibold text-xl" onClick={handleStartAuction}>{`${user.userID === auction.userID ? "Start" : "Join"} auction`}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
                <section className='bg-gray p-5 w-full min-h-full'>
                    <div className="mt-5">
                        <div className="mt-3 text-xl font-semibold text-slate-900">{auction.description}</div>
                    </div>
                    <div className="mt-5 flex flex-row items-center jus">
                        <img src={cash} className='w-6 h-6' alt="" />
                        <div className="font-semibold text-slate-900 ml-5">$ {auction.startingPrice}</div>
                    </div>
                    <div className="mt-5">
                        <div className="text-xl font-bold">Images</div>
                        <div className="mt-3 flex flex-row">{images.map((image, index) => {
                            return <img src={image} className="w-60 h-60 m-2  hover:cursor-pointer" alt="image" onClick={() => openImageViewer(index)} key={index} />
                        })}</div>
                        {
                            isViewerOpen && (
                                <ImageViewer
                                    src={images}
                                    currentIndex={currentImage}
                                    onClose={closeImageViewer}
                                />
                            )
                        }
                    </div>
                </section>
            </div>}
        </div>
    )
}

export default AuctionDetails