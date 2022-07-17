import React, { useState } from 'react';
import SidebarLayout from '../../components/admin/Sidebar/SidebarLayout';
import { UploadIcon } from '../../components/shared/Icon';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from 'next/router';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';

const AddProduct = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [picture, setPicture] = useState("")
    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState({
        name: "",
        price: "",
        category: "",
        size: "",
        color: "",
        availableQty: "",
        description: "",
        imgUrl: ""
    })

    // color's object
    const colors = { white: 'bg-white', black: 'bg-gray-700', blue: 'bg-blue-700', red: 'bg-red-700', green: 'bg-green-700', orange: 'bg-orange-700', gray: 'bg-gray-400' }

    // sizes object
    const sizes = { S: 'S', M: 'M', L: 'L', XL: 'XL', XXL: 'XXL' }

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
        setProduct({ ...product, [name]: value })
    }


    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { name, price, category, size, color, availableQty, description, imgUrl } = product;
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/addproduct`, {
                name,
                price,
                category,
                size,
                color,
                availableQty,
                description,
                img: picture || imgUrl || "https://i.ibb.co/g7dG1WK/images.png",
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

    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin" secondName="Dashboard" current="Add Product" />
            <HeadInfo title="Add Product - Sadi EShop" />

            <SidebarLayout>
                <div>
                    <h2 className="text-secondary font-bold text-2xl mb-10 md:ml-32">Add Product</h2>
                    <div className="md:mx-32  shadow-xl">

                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <form onSubmit={handleSubmit}>
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='product name'
                                                        onChange={handleChange}
                                                        value={product.name}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="number"
                                                        name="price"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='price'
                                                        onChange={handleChange}
                                                        value={product.price}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="text"
                                                        name="category"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='category'
                                                        onChange={handleChange}
                                                        value={product.category}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="number"
                                                        name="availableQty"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='available Quantity'
                                                        onChange={handleChange}
                                                        value={product.availableQty}
                                                    />
                                                </div>
                                            </div>
                                            <div className="form-control w-full lg:w-6/12 px-4">
                                                <div className="relative input-group w-full mb-3">
                                                    <select onChange={(e) => setProduct({ ...product, size: e.target.value })} className="select select-bordered w-5/12 max-w-xs">
                                                        <option disabled selected>Size</option>
                                                        {
                                                            Object.keys(sizes).map((size) => {
                                                                return <option value={size} key={size}>{size}</option>
                                                            })
                                                        }
                                                    </select>
                                                    <input
                                                        type="text"
                                                        name="size"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='select or write'
                                                        onChange={handleChange}
                                                        value={product.size}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <select onChange={(e) => setProduct({ ...product, color: e.target.value })} className="select select-bordered w-full max-w-xs">
                                                        <option disabled selected>Select Color</option>
                                                        {
                                                            Object.keys(colors).map((color) => {
                                                                return <option value={color} key={color}>{color}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>

                                        </div>
                                        <div className="w-full px-4 mb-3">
                                            <textarea
                                                name="description"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder='description'
                                                onChange={handleChange}
                                                value={product.description}
                                            ></textarea>
                                        </div>
                                        <div className="w-full px-4 mb-3">
                                            <input
                                                type="text"
                                                name="imgUrl"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder='Give Image Url Or Click Below to new upload'
                                                onChange={handleChange}
                                                value={product.imgUrl}
                                            />
                                        </div>


                                        {/* upload image */}
                                        <div className="flex items-center justify-center mt-4">
                                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                <div className="flex flex-col items-center justify-center pt-3 pb-2">
                                                    <UploadIcon />
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
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

export default AddProduct;