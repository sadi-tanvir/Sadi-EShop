import React, { useEffect, useState } from 'react';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';
import { useSelector } from "react-redux";



const PaymentForm = ({ product }) => {
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState("")
    const [success, setSuccess] = useState({
        message: '',
        trx: ''
    })
    const [clientSecret, setClientSecret] = useState("")

    console.log(`this is client secret`, clientSecret);

     // redux
     const { accessToken } = useSelector(state => state.authReducer)

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_PORT}/api/payment/createPaymentIntent?price=${product?.amount}`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authentication: accessToken
            },
            // body: JSON.stringify({ price: product?.amount })
        })
            .then(res => res.json())
            .then(data => {
                if (data?.clientSecret) {
                    setClientSecret(data.clientSecret)
                }
            })
    }, [product, product?.amount])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });


        // if any error
        if (error) {
            setCardError(error.message)
        } else {
            setCardError("")
            setSuccess({ message: '', trx: '' })
        }

        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: product?.userEmail,
                        address: product?.address
                    },
                },
            },
        );

        if (intentError) {
            setCardError(intentError.message)
            setSuccess({ message: '', trx: '' })
        } else {
            setCardError("")
            setSuccess({
                message: "Congrats! your payment has been completed.",
                trx: paymentIntent?.id
            })
            fetch(`${process.env.NEXT_PUBLIC_PORT}/api/order/updatePaymentStatus`, {
                method: 'PATCH',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ trxId: paymentIntent?.id, id: product?._id })
            })
                .then(res => res.json())
            // .then(data => console.log(data))
        }

    }

    // showing success & error message
    useEffect(() => {
        if (success.message) {
            // success alert
            Swal.fire({
                title: success.message,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            })
        }
        if (cardError) {
            Swal.fire({
                title: cardError,
                showClass: { popup: 'animate__animated animate__fadeInDown' },
                hideClass: { popup: 'animate__animated animate__fadeOutUp' }
            })
        }
    }, [success.message, cardError])
    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-0 mt-10 capitalize text-xl ml-auto block px-10" type="submit" disabled={!stripe || !clientSecret}>
                    Please Pay
                </button>
            </form>
        </>
    );
};

export default PaymentForm;