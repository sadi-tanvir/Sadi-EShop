import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from "react-redux";
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from "next/router"
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import PaymentDetails from '../../components/payment/PaymentDetails';
import PaymentForm from '../../components/payment/PaymentForm';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';

const stripePromise = loadStripe('pk_test_51L4MS4Cqaut6bPICBKVF9ezBxrYxlN6EbsJzTnART0PnxiNUR1J1PPt4rF8kjMzW4kOKyDHdlsD65BOlFLOK5qXB00QiQnDUqn');



const Payment = () => {
    // redux
    const { accessToken } = useSelector(state => state.authReducer)

    // state
    const [product, setProduct] = useState({})

    // router
    const router = useRouter()
    const { payment } = router.query
    console.log(payment);

    // get product by id
    useEffect(() => {
        const getProduct = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/getSingleOrder?id=${payment}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            setProduct(res.data.order);
            console.log(res.data);
        }
        getProduct()
    }, [payment])

    return (
        <>
            {/* Breadcrumbs  & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/orders" secondName="orders" current="payment" />
            <HeadInfo title="Payment - Sadi EShop" />

            <div classNameName="w-full flex flex-col justify-center items-center">
                <div classNameName="w-10/12">
                    <div className="hero min-h-screen">
                        <div className="hero-content grid grid-cols-1 md:grid-cols-2 md:gap-x-10">
                            <PaymentDetails product={product} />

                            <div>
                                <Elements stripe={stripePromise}>
                                    <PaymentForm product={product} />
                                </Elements>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Payment;