import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../../components/admin/Sidebar/SidebarLayout';
import { UploadIcon } from '../../../components/shared/Icon';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from 'next/router';
import Breadcrumbs from '../../../components/Breadcrumbs';
import HeadInfo from '../../../components/HeadInfo';

const EditProduct = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    const productState = useSelector(state => state.productUpdateReducer)

    // state
    const [picture, setPicture] = useState("")
    const [loading, setLoading] = useState(false)
    

    // next/router
    const router = useRouter()
    const { editProduct } = router.query

    // color's object
    const colors = { white: 'bg-white', black: 'bg-gray-700', blue: 'bg-blue-700', red: 'bg-red-700', orange: 'bg-orange-700', gray: 'bg-gray-400' }

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


    // handle Update Product
    const handleUpdateProduct = async (e) => {
        e.preventDefault()
        try {
            const { name, price, category, size, color, availableQty, description, img } = productState;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/admin/products/editProduct?id=${editProduct}`, {
                name,
                price,
                category,
                size,
                color,
                availableQty,
                description,
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

    // get product information
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_PORT}/api/admin/products/getSingleProduct?id=${editProduct}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            dispatch({
                type: 'updateProduct', payload: {
                    name: res.data?.product?.name,
                    price: res.data?.product?.price,
                    category: res.data?.product?.category,
                    size: res.data?.product?.size,
                    color: res.data?.product?.color,
                    availableQty: res.data?.product?.availableQty,
                    description: res.data?.product?.description,
                    img: res.data?.product?.img
                }
            })
        }
        getProduct()
    }, [accessToken, editProduct, dispatch])

    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin/products/products" secondName="Products" current="Update Product" />
            <HeadInfo title="Add Product - Sadi EShop" />

            <SidebarLayout>
                <div>
                    <h2 className="text-secondary font-bold text-2xl mb-10 md:ml-32">Edit Product</h2>
                    <div className="md:mx-32  shadow-xl">

                        <div className="mt-5 md:mt-0 md:col-span-2">
                            <div className="shadow sm:rounded-md sm:overflow-hidden">
                                <form onSubmit={handleUpdateProduct}>
                                    <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                                        <div className="flex flex-wrap">
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                        placeholder='product name'
                                                        onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, name: e.target.value } })}
                                                        value={productState.name}
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
                                                        onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, price: e.target.value } })}
                                                        value={productState.price}
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
                                                        onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, category: e.target.value } })}
                                                        value={productState.category}
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
                                                        onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, availableQty: e.target.value } })}
                                                        value={productState.availableQty}
                                                    />
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <select onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, size: e.target.value } })} className="select select-bordered w-full max-w-xs">
                                                        <option disabled selected>Select Size</option>
                                                        {
                                                            Object.keys(sizes).map((size) => {
                                                                return <option value={size} key={size}>{size}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="w-full lg:w-6/12 px-4">
                                                <div className="relative w-full mb-3">
                                                    <select onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, color: e.target.value } })} className="select select-bordered w-full max-w-xs">
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
                                            <input
                                                type="text"
                                                name="img"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder='Image URL'
                                                onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, img: e.target.value } })}
                                                value={productState.img}
                                            />
                                        </div>
                                        <div className="w-full px-4 mb-3">
                                            <textarea
                                                name="description"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder='description'
                                                onChange={(e) => dispatch({ type: 'updateProduct', payload: { ...productState, description: e.target.value } })}
                                                value={productState.description}
                                            ></textarea>
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
                                        <button disabled={loading ? true : false} type="submit" className="disabled:cursor-not-allowed inline-flex w-full md:w-4/12 justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">Update Product</button>
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

export default EditProduct;