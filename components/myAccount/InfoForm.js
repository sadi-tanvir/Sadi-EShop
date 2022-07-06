import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from 'next/router';
import { UploadIcon } from '../shared/Icon';

const InfoForm = () => {
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
        oldPassword: "",
        newPassword: "",
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
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/updateUser`, {
                name,
                email,
                phone,
                address,
                img: picture,
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
            toast.success(error.response.data.message)
        }
    }

    return (
        <>
            {/* shipping information */}
            <div className="max-w-md mx-auto bg-white rounded-lg md:max-w-xl">
                <div className="">
                    <div className="w-full p-4 px-5 pb-5">
                        <h1 className="font-bold text-secondary">Shipping Address</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 md:gap-2">
                                <input onChange={handleChange} type="text" name="name" value={user.name} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Name" />
                                <input onChange={handleChange} type="text" readOnly name="email" value={user.email} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Email" />
                            </div>
                            <input onChange={handleChange} type="number" name="phone" value={user.phone} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Phone Number" />
                            <input onChange={handleChange} type="text" name="address" value={user.address} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Address*" />

                            <div className="flex items-center justify-center mt-4">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-3 pb-2">
                                        <UploadIcon />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                    </div>
                                    <input onChange={(e) => postPicture(e.target.files[0])} id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            <button type="submit" className="disabled:cursor-not-allowed disabled:bg-gray-400 bg-primary style_btn mt-5 h-12 w-full rounded font-medium text-xs text-white">
                                Update Account
                            </button>
                        </form>
                    </div>

                    <div className="w-full p-4 px-5 pb-5">
                        <h1 className="font-bold text-secondary">Update Password</h1>
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="number" name="oldPassword" value={user.oldPassword} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Phone Number" />
                            <input onChange={handleChange} type="text" name="newPassword" value={user.newPassword} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="New Password" />
                            <button disabled={loading ? true : false} type="submit" className="disabled:cursor-not-allowed disabled:bg-gray-400 bg-primary style_btn mt-5 h-12 w-full rounded font-medium text-xs text-white">
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default InfoForm;