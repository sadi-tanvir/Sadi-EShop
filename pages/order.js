import React from 'react';
import { useSelector } from 'react-redux';

const Order = () => {
    // redux
    const { cart } = useSelector(state => state.productsReducer)
    
    // total cart's product price
    const sub = Object.keys(cart).map(k => {
        return cart[k].qty * cart[k].price
    })
    const totalPrice = sub.reduce((pre, curr) => pre + curr, 0)

    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Sadi EShop</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium ">Your Order ID #55568</h1>
                            <small className="mb-4 inline-block">your order has been  placed successfully</small>
                            <div className="flex mb-4">
                                <a className="flex-grow text-secondary border-b-2 border-gray-300 py-2 text-lg px-1">Product Name</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                                <a className="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Price</a>
                            </div>
                            {
                                Object.keys(cart).map(productKey => {
                                    const { name, qty, price } = cart[productKey]
                                    const subTotal = qty * price
                                    return (
                                        <>
                                            <div className="flex border-b border-gray-200 py-2">
                                                <span className="text-gray-500">{name}</span>
                                                <span className="ml-auto text-gray-900">{qty}</span>
                                                <span className="ml-auto text-gray-900">${subTotal}</span>
                                            </div>
                                        </>
                                    )
                                })
                            }


                            <div className="flex flex-col">
                                <span className="title-font font-medium text-2xl text-gray-900 mt-5">${totalPrice}</span>
                                <button className="mr-auto mt-5 flex style_btn text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-secondary rounded font-bold">Track Order</button>
                            </div>
                        </div>
                        <img
                            draggable={false}
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                            src="https://thumbs.dreamstime.com/b/courier-delivered-your-order-package-courier-delivered-your-order-package-fast-quality-home-delivery-flat-187396699.jpg" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default Order;