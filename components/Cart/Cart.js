import React, { useEffect, useState } from 'react';
import CartIcon, { DeleteIcon, InfoIcon } from '../shared/Icon';
import { useSelector, useDispatch } from "react-redux"
import CartItem from './CartItem';
import { useRouter } from 'next/router';
import { toast } from "react-toastify"

const Cart = () => {
    // redux
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.productsReducer)
    // next router
    const router = useRouter()

    // total cart's product price
    const sub = Object.keys(cart).map(k => {
        return cart[k].qty * cart[k].price
    })
    const totalPrice = sub.reduce((pre, curr) => pre + curr, 0)


    // check out order
    const checkOutOrder = () => {
        if (Object.keys(cart).length === 0) {
            return toast.error("Your cart is empty")
        }
        router.push("/checkout")
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex="0">
                    <div className="indicator mr-5 md:mr-0">
                        <span className="indicator-item badge badge-secondary text-white font-bold">{Object.keys(cart).length}</span>
                        <CartIcon iconClass="w-8 h-8 text-primary" />
                    </div>
                </label>
                <ul tabIndex="0" className="menu dropdown-content p-2 bg-base-100 w-[330px] mt-4 shadow-2xl rounded-lg">
                    <div className="h-[80vh] overflow-auto">
                        <div className="flex flex-col justify-center items-start mb-32">
                            {
                                Object.keys(cart).length !== 0 ?
                                    Object.keys(cart).map(productKey => <CartItem key={productKey} productKey={productKey} />)
                                    :
                                    <div className="flex justify-between items-center px-10 pb-2  pt-3">
                                        <h1 className="text-xl font-bold text-secondary">Cart is empty, please! add some product to checkout</h1>
                                    </div>
                            }
                        </div>

                        <div className="w-[95%] absolute bottom-2 bg-white pt-3">
                            <div className="flex justify-between items-center px-10 pb-2  pt-3">
                                <h1 className="text-xl font-bold text-secondary">Order Total</h1>
                                <h1 className="text-xl font-bold text-primary">${parseFloat(totalPrice).toFixed(2)}</h1>
                            </div>
                            <div className="card-actions justify-end grid grid-cols-2 px-3 pb-4">
                                <button disabled={Object.keys(cart).length === 0} onClick={() => dispatch({ type: 'clearCart' })} className="disabled:cursor-not-allowed disabled:bg-red-300 style_btn py-1 bg-accent px-4 rounded-md text-white font-bold flex justify-center items-center">
                                    Clear Cart <DeleteIcon iconClass="w-7 h-7 text-white" />
                                </button>
                                <button disabled={Object.keys(cart).length === 0} onClick={checkOutOrder} className="disabled:cursor-not-allowed disabled:bg-gray-400 style_btn px-5 py-1 bg-primary rounded-md text-white font-bold flex justify-center items-center">
                                    Checkout <CartIcon iconClass="w-7 h-7 text-white" />
                                </button>
                            </div>
                        </div>
                    </div>
                </ul>
            </div>
        </>
    );
};

export default Cart;