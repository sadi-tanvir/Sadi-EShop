import React from 'react';
import { RightArrowIcon, VerifyIcon } from '../shared/Icon';
import { useRouter } from "next/router"

const PaymentDetails = ({ product }) => {
    // next router
    const router = useRouter()

    return (
        <>
            <div className="flex flex-wrap">
                <div className="p-4 w-full">
                    <div className="h-full p-6 rounded-lg border-2 border-gray-300 flex flex-col relative overflow-hidden">
                        <h2 className="text-sm tracking-widest title-font mb-1 font-medium text-secondary">To Pay</h2>
                        <h1 className="text-3xl text-secondary pb-4 mb-4 border-b border-gray-200 leading-none font-bold">${product?.amount}</h1>
                        <span className="text-md text-secondary font-semibold">Order Id :</span>
                        <h2 className="text-2xl text-secondary font-semibold">{product?._id}</h2>
                        {product?.products !== undefined &&
                            <h2 className="text-xl text-secondary font-semibold mb-4">{Object.keys(product?.products).length}Item</h2>
                        }

                        <p className="flex items-center text-gray-600 mb-2">
                            <span className={`${product?._id ? "bg-[#34d399]" : 'bg-gray-400'} w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0`}>
                                <VerifyIcon />
                            </span>order placed
                        </p>
                        <p className="flex items-center text-gray-600 mb-2">
                            <span className={`${product?.payment_status ? "bg-[#34d399]" : 'bg-gray-400'} w-4 h-4 mr-2 inline-flex items-center justify-center text-white rounded-full flex-shrink-0`}>
                                <VerifyIcon />
                            </span>payment status
                        </p>
                        <button onClick={() => router.push('/orders')} className="flex items-center mt-3 text-white bg-primary font-bold border-0 py-2 px-4 w-full focus:outline-none hover:bg-gray-500 rounded">
                            Back To Orders page
                            <RightArrowIcon />
                        </button>
                        <p className="text-xs text-gray-500 mt-3">Literally you probably have not heard of them jean shorts.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentDetails;