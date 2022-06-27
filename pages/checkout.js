import React from 'react';
import CheckoutForm from '../components/Cart/CheckoutForm';
import Summary from '../components/Cart/summary';

const Checkout = () => {
    return (
        <div className="grid grid-cols-1">
            {/* order summary */}
            <Summary />

            {/* checkout form */}
            <CheckoutForm />
        </div>
    );
};

export default Checkout;