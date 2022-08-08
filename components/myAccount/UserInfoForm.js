import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from 'next/router';
import { UploadIcon } from '../shared/Icon';

const UserInfoForm = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [picture, setPicture] = useState("")
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        name: userInfo?.name,
        email: userInfo?.email,
        phone: userInfo?.phone,
        address: userInfo?.address,
    })

    // next router
    const router = useRouter()

    // upload picture
    const postPicture = (pic) => {
        setLoading(true)
        if (pic === undefined) {
            toast.error('file upload failed');
            return;
        }

        if (pic.type === "image/jpeg" || pic.type === "image/png" || pic.type === "image/jpg") {
            const data = new FormData()
            data.append("file", pic)
            data.append("upload_preset", "Sadi-Eshop")
            data.append("cloud_name", "dhiatzlib")
            fetch('https://api.cloudinary.com/v1_1/dhiatzlib/image/upload', {
                method: 'POST',
                body: data
            }).then(res => res.json())
                .then(data => {
                    setPicture(data.url.toString())
                    setLoading(false)
                })
        } else {
            toast.error('file type not supported');
            setLoading(false)
            return;
        }
    }

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { name, email, phone, address } = user;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/user/updateUser`, {
                name,
                email,
                phone,
                address,
                img: picture || userInfo?.img,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })

            if (res.data.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user))
                dispatch({ type: 'userInfo', payload: JSON.parse(localStorage.getItem("userInfo")) })
                toast.success(res.data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <div>
                <h6 className="text-secondary text-xl mt-3 mb-6 font-bold uppercase">
                    User Information
                </h6>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap">
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder='name'
                                    onChange={handleChange}
                                    value={user.name}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <input
                                    type="email"
                                    name="email"
                                    readOnly
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder='email'
                                    onChange={handleChange}
                                    value={user.email}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <input
                                    type="text"
                                    name="phone"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder='phone'
                                    onChange={handleChange}
                                    value={user.phone}
                                />
                            </div>
                        </div>
                        <div className="w-full lg:w-6/12 px-4">
                            <div className="relative w-full mb-3">
                                <input
                                    type="text"
                                    name="address"
                                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                    placeholder='address'
                                    onChange={handleChange}
                                    value={user.address}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center mt-4">
                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div className="flex flex-col items-center justify-center pt-3 pb-2">
                                <UploadIcon />
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                            </div>
                            <input onChange={(e) => postPicture(e.target.files[0])} id="dropzone-file" type="file" className="hidden" />
                        </label>
                    </div>
                    <button disabled={loading ? true : false} type="submit" className="disabled:cursor-not-allowed  block w-full md:w-4/12 mx-auto bg-primary mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                        Update
                    </button>
                </form>
            </div>
        </>
    );
};


export default UserInfoForm;