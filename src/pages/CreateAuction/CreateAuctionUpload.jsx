import React, { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 } from 'uuid'


const CreateAuctionUpload = () => {


    const navigate = useNavigate();
    const { state } = useLocation()
    const [images, setImages] = useState([])
    const urlArray = []
    const [imageURLS, setImageURLS] = useState([])


    const uploadImage = () => {
        if (images.length === 0) {
            return
        }
        if (images.length > 5) {
            alert('You can only upload upto 5 images')
            return
        }
        images.map((image) => {
            const id = v4()
            const storageRef = ref(storage, `images/${image.name + id}`)
            const uploadTask = uploadBytesResumable(storageRef, image)
            uploadTask.on('state_changed',
                (snapshot) => {
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
                    console.log(error)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        urlArray.push(downloadURL)
                    });
                    if(urlArray.length === images.length - 1){
                        console.log("all sone")
                        console.log(state)
                        navigate('/create/confirm', {
                            state: {
                                ...state,
                                images: urlArray
                            }
                        })
                    }
                }
            );
        })
    }


    return (
        <div className='w-full min-h-screen bg-gray'>
            <Navbar />
            <div className="flex flex-col mt-10 mb-10 w-full h-full items-center">
                <div className="flex flex-row w-3/5 bg-gray-50  rounded-lg drop-shadow-lg">
                    <div className="w-full py-4 px-6 box-border flex flex-col">
                        <div className="mt-5 text-black text-3xl font-semibold">Images/Video upload</div>
                        <div className="text-sm mt-1 text-black">
                            Upload upto 5 images and/or videos of the product you want to auction
                        </div>

                        <div className="bg-gray-100 w-full h-56 mt-5 rounded-lg flex flex-col items-center justify-center">
                            <div className="text-lg font-slate-600">
                                Drag and drop files here
                            </div>

                            <div className="text-sm font-slate-400 mt-2">
                                or
                            </div>

                            <div className="flex flex-row items-center justify-center mt-2">
                                <label className="drop-shadow-md py-1 px-6 flex flex-row items-center text-lg justify-center font-semibold w-fit  text-orange  bg-transparent border-orange border-solid border-2 rounded-md mt-4 box-border hover:cursor-pointer">
                                    Browse
                                    <input type="file" accept="video/mp4,video/x-m4v,video/*,image/*" multiple className="hidden" onChange={(e) => {
                                        setImages([...images, ...e.target.files])
                                    }} />
                                </label>
                            </div>

                        </div>
                        {(images.length > 0) ?
                            <div>
                                <div className="flex flex-row flex-wrap gap-5 items-center mt-5 ">
                                    {images.map((image) => {
                                        return <img className='w-32 h-32 mr-5 rounded-lg place-items-center border-gray-100 border-solid border-4 box-border' src={URL.createObjectURL(image)} alt={image.name} />
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