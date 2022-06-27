import React from 'react';
import { useSelector } from 'react-redux';
import CheckoutForm from '../components/Cart/CheckoutForm';
import Summary from '../components/Cart/summary';

const Checkout = () => {
    // redux
    const { cart } = useSelector(state => state.productsReducer)
    
    // total cart's product price
    const sub = Object.keys(cart).map(k => {
        return cart[k].qty * cart[k].price
    })
    const totalPrice = sub.reduce((pre, curr) => pre + curr, 0)
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