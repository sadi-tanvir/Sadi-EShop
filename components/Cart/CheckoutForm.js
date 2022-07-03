import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"

const CheckoutForm = () => {
    // redux
    const { accessToken, userInfo, isAuthenticate } = useSelector(state => state.authReducer)
    const { cart } = useSelector(state => state.productsReducer)

    // state
    const [shipping, setShipping] = useState({
        name: userInfo?.name,
        email: userInfo?.email,
        phone: '',
        address: '',
        zipCode: '',
    })

    // total cart's product price
    const sub = Object.keys(cart).map(k => {
        return cart[k].qty * cart[k].price
    })
    const totalPrice = sub.reduce((pre, curr) => pre + curr, 0)

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })
    }

    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, phone, address, zipCode } = shipping;
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/createOrder`, {
                userEmail: email,
                products: cart,
                phone: phone,
                address: `${address}, ${zipCode}-bangladesh`,
                amount: parseInt(totalPrice)
            })

            console.log(res.data);
            if(res.data.message){
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            {/* shipping information */}
            <div className="max-w-md py-12 mx-auto bg-white rounded-lg md:max-w-xl">
                <div className="md:flex ">
                    <div className="w-full p-4 px-5 py-5">

                        <h1 className="font-bold text-secondary">Shipping Address</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="grid md:grid-cols-2 md:gap-2">
                                <input onChange={handleChange} type="text" readOnly name="name" value={shipping.name} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Name" />
                                <input onChange={handleChange} type="text" readOnly name="email" value={shipping.email} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Email" />
                            </div>
                            <input onChange={handleChange} type="number" name="phone" value={shipping.phone} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Phone Number" />
                            <input onChange={handleChange} type="text" name="address" value={shipping.address} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Address*" />
                            <input onChange={handleChange} type="text" name="zipCode" value={shipping.zipCode} className="border rounded h-10 w-full focus:outline-none focus:border-primary px-2 mt-2 text-sm" placeholder="Zipcode" />
                            <button type="submit" className="bg-primary style_btn mt-5 h-12 w-full rounded font-medium text-xs text-white">
                                Continue to Shipping
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};


export default CheckoutForm;