import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CheckoutForm from '../components/Cart/CheckoutForm';
import Summary from '../components/Cart/summary';
import jwt from "jsonwebtoken"
import { useRouter } from 'next/router'



const Checkout = () => {
    // redux
    const dispatch = useDispatch();
    const { cart } = useSelector(state => state.productsReducer)
    const { accessToken, userInfo, isAuthenticate } = useSelector(state => state.authReducer)

    // next router
    const router = useRouter()

    // total cart's product price
    const sub = Object.keys(cart).map(k => {
        return cart[k].qty * cart[k].price
    })
    const totalPrice = sub.reduce((pre, curr) => pre + curr, 0)

    // check authentication
    useEffect(() => {
        const decoded = jwt.decode(accessToken, { complete: true })
        if (decoded?.payload.email === userInfo.email) {
            dispatch({ type: 'loginUser' })
        } else {
            dispatch({ type: 'logOutUser' })
            router.push('/login')
        }

        if (!localStorage.getItem('userInfo') || !localStorage.getItem('accessToken')) {
            dispatch({ type: 'logOutUser' })
            if (!isAuthenticate) {
                router.push('/login')
            }
        }
    }, [accessToken, userInfo.email, router, isAuthenticate, dispatch])
    return (
        <div className="grid grid-cols-1">
            {/* order summary */}
            <Summary totalPrice={totalPrice} />

            {/* checkout form */}
            <CheckoutForm />
        </div>
    );
};

export default Checkout;