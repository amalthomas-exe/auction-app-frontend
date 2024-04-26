import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'
import LoadingBar from 'react-top-loading-bar'


const CreateAuctionUpload = () => {
    const [progress, setprogress] = useState(0)
    const navigate = useNavigate();
    const { state } = useLocation()
    const [coverImage, setCoverImage] = useState([])


    const uploadImage = () => {
        setprogress(20)
        if (coverImage.length === 0) {
            return
        }
        if(coverImage.length > 1){
            console.log("Multiple files not supported")
            return
        }
        coverImage.map((image) => {
            setprogress(50)
            const id = v4()
            const storageRef = ref(storage, `images/${image.name + id}`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on('state_changed',
                (snapshot) => {
                    console.log(snapshot)
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                    }
                },
                (error) => {
                    setprogress(0)
                    console.log(error)
                },
                () => {
                    setprogress(70)
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        console.log('File available at', downloadURL);
                        console.log("all sone")
                        console.log(state)
                        setprogress(100)
                        navigate('/create/upload', {
                            state: {
                                ...state,
                                coverImage: downloadURL
                            }
                        })
                    });
                }
            );
        })
    }


    return (
        <div className='w-full min-h-screen bg-gray'>
            <Navbar />
            <LoadingBar color='#f11946' progress={progress} onLoaderFinished={() => { setprogress(0) }} />
            <div className="flex flex-col mt-10 mb-10 w-full h-full items-center">
                <div className="flex flex-row w-3/5 bg-gray-50  rounded-lg drop-shadow-lg">
                    <div className="w-full py-4 px-6 box-border flex flex-col">
                        <div className="mt-5 text-black text-3xl font-semibold">Cover image upload</div>
                        <div className="text-sm mt-1 text-black">
                            Upload the cover image for your auction
                        </div>

                        <div className="bg-gray-100 w-full h-56 mt-5 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-lg font-slate-600">
                                Drag and drop file here
                            </div>

                            <div className="text-sm font-slate-400 mt-2">
                                or 
                            </div>

                            <div className="flex flex-row items-center justify-center mt-2">
                                <label className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-orange  bg-transparent border-orange border-solid border-2 rounded-md mt-4 box-border hover:cursor-pointer">
                                    Browse
                                    <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                        setCoverImage([...coverImage, ...e.target.files])
                                    }} />
                                </label>
                            </div>

                        </div>
                        {(coverImage.length > 0) ?
                            <div>
                                <div className="flex flex-row flex-wrap gap-5 items-center justify-center mt-5 ">
                                    {coverImage.map((image) => {
                                        return <img className='w-72 h-72 mr-5 rounded-lg place-items-center border-gray-100 border-solid border-4 box-border' src={URL.createObjectURL(image)} alt={image.name} />
                                    })}
                                </div>

                                <div className="flex flex-row w-full items-center justify-center mt-5 mb-5">
                                    <button onClick={uploadImage} className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-white  bg-orange rounded-md mt-4 box-border">
                                        Upload
                                    </button>
                                </div>
                            </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateAuctionUpload