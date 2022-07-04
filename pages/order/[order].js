import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HeadInfo from '../../components/HeadInfo';
import { useRouter } from "next/router"
import axios from 'axios';

const Order = () => {
    // state
    const [product, setProduct] = useState({})

    // router
    const router = useRouter()
    const { order } = router.query


    // get product by id
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/getSingleOrder?id=${order}`)
            setProduct(res.data.order);
        }
        getProduct()
    }, [order])

    return (
        <>
            <HeadInfo title="Order - Sadi EShop" />
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 mt-10 mx-auto">
                    <h1 className="text-secondary text-xl title-font font-semibold ">Order ID: {product?._id}</h1>
                </div>
                <div className="container px-5 py-16 mx-auto">
                    <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0 col-span-2">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Sadi EShop</h2>
                            <div className=" flex">
                                {
                                    product?.payment_status ?
                                        <>
                                            <h1 className="text-secondary text-xl title-font font-semibold">Trx ID: {product?.trxId}</h1>
                                            <img draggable={false} src="/assets/paid-icon.png" className="w-[50px]  " alt="paid" />
                                        </>
                                        :
                                        <img draggable={false} src="/assets/unpaid-icon.png" className="w-14  " alt="unpaid" />
                                }
                            </div>
                            <small className="mb-4 inline-block">your order has been  placed successfully</small>
                            <div className="flex mb-4">
                                <a className="flex-grow text-secondary border-b-2 border-gray-300 py-2 text-lg px-1">Product Name</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-9"></a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Price</a>
                            </div>
                            {
                                product?.products &&
                                Object.keys(product?.products).map(productKey => {
                                    const { name, qty, price } = product.products[productKey]
                                    const subTotal = qty * price
                                    return (
                                        <>
                                            <div className="flex border-b border-gray-200 py-2">
                                                <span title={name} className="text-gray-500">{name.slice(0, 25)}...</span>
                                                <span className="ml-auto text-gray-900">{qty}</span>
                                                <span className="ml-auto text-gray-900">${subTotal}</span>
                                            </div>
                                        </>
                                    )
                                })
                            }


                            <div className="flex flex-col">
                                <span className="title-font font-bold text-2xl text-secondary mt-5">${product?.amount}</span>
                                <button className="mr-auto mt-5 flex style_btn text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded font-bold">Track Order</button>
                            </div>
                        </div>

                        <div className="bg-red-400  col-span-1 my-auto">
                            <img
                                draggable={false}
                                alt="ecommerce"
                                className="w-full object-cover object-center rounded"
                                src="https://thumbs.dreamstime.com/b/courier-delivered-your-order-package-courier-delivered-your-order-package-fast-quality-home-delivery-flat-187396699.jpg"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;