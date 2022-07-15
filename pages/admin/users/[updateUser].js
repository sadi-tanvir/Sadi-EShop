import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../../components/admin/Sidebar/SidebarLayout';
import { UploadIcon } from '../../../components/shared/Icon';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from 'next/router';
import Breadcrumbs from '../../../components/Breadcrumbs';
import HeadInfo from '../../../components/HeadInfo';



const EditUser = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    const userState = useSelector(state => state.userUpdateReducer)

    // state
    const [picture, setPicture] = useState("")
    const [loading, setLoading] = useState(false)

    // next/router
    const router = useRouter()
    const { updateUser } = router.query


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

    // // handle input change
    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setProduct({ ...product, [name]: value })
    // }


    // handle Update user information
    const handleUpdateUser = async (e) => {
        e.preventDefault()
        try {
            const { name, email, phone, role, isActive, address, img } = userState;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/updateUser?id=${updateUser}`, {
                name,
                email,
                phone,
                role,
                isActive:JSON.parse(isActive),
                address,
                img: picture || img,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })

            if (res.data.message) {
                toast.success(res.data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }



    // get user information
    useEffect(() => {
        const getUser = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/getSingleUser?id=${updateUser}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            dispatch({
                type: 'updateUser', payload: {
                    name: res.data?.user?.name,
                    email: res.data?.user?.email,
                    phone: res.data?.user?.phone,
                    role: res.data?.user?.role,
                    isActive: JSON.parse(JSON.stringify(res.data?.user?.isActive || "")),
                    address: res.data?.user?.address,
                    img: res.data?.user?.img
                }
            })
        }
        getUser()
    }, [accessToken, updateUser, dispatch])

    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin/users/users" secondName="users" current="Update User" />
            <HeadInfo title="Update User - Sadi EShop" />

            <SidebarLayout>
                <div>
                    <h2 className="text-secondary font-bold text-2xl mb-10 md:ml-32">Update User</h2>
                    <div className="md:mx-32  shadow-xl">

                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <form onSubmit={handleUpdateUser}>
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='name'
                                                        onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, name: e.target.value } })}
                                                        value={userState.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="email"
                                                        name="email"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='email'
                                                        onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, email: e.target.value } })}
                                                        value={userState.email}
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
                                                        onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, phone: e.target.value } })}
                                                        value={userState.phone}
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
                                                        onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, address: e.target.value } })}
                                                        value={userState.address}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <select onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, role: e.target.value } })} className="select select-bordered w-full max-w-xs">
                                                        <option disabled selected>User Type</option>
                                                        <option value="user">user</option>
                                                        <option value="admin">admin</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <select onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, isActive: e.target.value } })} className="select select-bordered w-full max-w-xs">
                                                        <option disabled selected>Account Status</option>
                                                        <option value={true}>active</option>
                                                        <option value={false}>deactivated</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-full px-4 mb-3">
                                            <input
                                                type="text"
                                                name="img"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder='image'
                                                onChange={(e) => dispatch({ type: 'updateUser', payload: { ...userState, img: e.target.value } })}
                                                value={userState.img}
                                            />
                                        </div>


                                        {/* upload image */}
                                        <div className="flex items-center justify-center mt-4">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-3 pb-2">
                                                    <UploadIcon />
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to new upload</span></p>
                                                </div>
                                                <input onChange={(e) => postPicture(e.target.files[0])} id="dropzone-file" type="file" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 pb-10">
                                        <button disabled={loading ? true : false} type="submit" className="disabled:cursor-not-allowed inline-flex w-full md:w-4/12 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Add Product</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </SidebarLayout>
        </>
    );
};

export default EditUser;