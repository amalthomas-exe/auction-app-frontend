import React,{useContext,useState} from 'react'
import Navbar from '../../components/Navbar'
import { useLocation,useNavigate } from 'react-router-dom'
import userContext from '../../context/users/userContext'
import axios from 'axios'
import { API_URL_AUCTION } from '../../constants'
import LoadingBar from 'react-top-loading-bar'

const ConfirmDetails = () => {

    const {user,auth_token} = useContext(userContext)
    const navigate = useNavigate()
    const [progress, setProgress] = useState(0)

    const { state } = useLocation()
    console.log(state)

    //code to convert date and time to ISO format
    const convertDateTimeToUTC = (dateTime) => {
        console.log(dateTime)
        let date = new Date(dateTime).toISOString()
        return date
    }

    const handleConfirm = ()=>{
        setProgress(50)
        let dateTime = convertDateTimeToUTC(state.date+" "+state.time)
        delete state.date
        delete state.time
        state.dateTime = dateTime
        state.userID = user.userID
        console.log(state)
        axios(`${API_URL_AUCTION}/create`,{
            method:'POST',
            headers:{
                "auth-token":auth_token
            },
            data:state
            }).then(res=>{
                setProgress(70)
                console.log(res)
                if(res.data.status==200){
                    setProgress(100)
                    navigate("/create/success",{
                        state:state
                    })
                    setTimeout(()=>{
                        navigate("/dashboard")
                    },3000)
                }
            }).catch(err=>{
                console.log(err)
            }
        )
    }

    return (
        <div className='w-full min-h-screen bg-gray'>
            <Navbar />
            <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => { setProgress(0) }} />
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-3/5 p-4 bg-gray-50 rounded-lg drop-shadow-xl">
                    <div className="text-slate-900 font-semibold text-2xl">Confirm details</div>
                    <div className="text-orange font-semibold text-lg mt-4">Basic details</div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Product name</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.name}</div>
                        </div>
                        <div className='ml-10'>
                            <div className="text-slate-500 font-semibold text-base">Description</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.description}</div>
                        </div>
                    </div>

                    <div className="text-orange font-semibold text-lg mt-6">Pricing</div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Starting price</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.startingPrice}</div>
                        </div>
                        <div className='ml-10'>
                            <div className="text-slate-500 font-semibold text-base">Increment</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.increment}</div>
                        </div>
                    </div>

                    <div className="text-orange font-semibold text-lg mt-6">Date and time</div>
                    <div className="flex flex-row w-100 mt-1">
                        <div>
                            <div className="text-slate-500 font-semibold text-base">Date</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.date}</div>
                        </div>
                        <div className='ml-10'>
                            <div className="text-slate-500 font-semibold text-base">Time</div>
                            <div className="text-slate-900 font-semibold text-xl">{state.time}</div>
                        </div>
                    </div>

                    <div className="text-orange font-semibold text-lg mt-6">Cover Image</div>
                    <div className="flex flex-row w-100 mt-1">
                            <div>
                                <img className='w-32 h-32 mr-5 rounded-lg place-items-center border-gray-100 border-solid border-4 box-border' src={state.coverImage} alt={state.name} />
                            </div>
                    </div>

                    <div className="text-orange font-semibold text-lg mt-6">Images</div>
                    <div className="flex flex-row w-100 mt-1">
                        {state.images.map((image, index) => (
                            <div key={index}>
                                <img className='w-32 h-32 mr-5 rounded-lg place-items-center border-gray-100 border-solid border-4 box-border' src={image} alt={image.name} />
                            </div>
                        ))}
                    </div>

                    <div className="flex w-full flex-row-reverse mt-5 mb-5">
                        <button onClick={handleConfirm} className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                            Confirm
                        </button>

                        <button className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  bg-transparent border-red-500 border-solid border-2 text-red-500 rounded-md mt-4 box-border mr-5">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDetails