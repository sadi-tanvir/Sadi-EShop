import React, { useEffect, useState } from 'react';
import CartIcon, { DeleteIcon, InfoIcon } from '../shared/Icon';
import { useSelector, useDispatch } from "react-redux"
import CartItem from './CartItem';
import { useRouter } from 'next/router';

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




    // re set cart data to redux store
    useEffect(() => {
        dispatch({ type: 'reloadCart', payload: JSON.parse(localStorage.getItem('cart')) })
    }, [])

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex="0">
                    <div className="indicator ml-5">
                        <span className="indicator-item badge badge-secondary text-white font-bold">{Object.keys(cart).length}</span>
                        <CartIcon iconClass="w-8 h-8 text-primary" />
                    </div>
                </label>
                <ul tabIndex="0" className="menu dropdown-content p-2 bg-base-100 w-[330px] mt-4 shadow-2xl rounded-lg">
                    <div className="h-[80vh] overflow-auto">
                        <div className="flex flex-col justify-center items-start mb-32">
                            {
                                Object.keys(cart).map(productKey => <CartItem key={productKey} productKey={productKey} />)
                            }
                        </div>

                        <div className="w-[95%] absolute bottom-2 bg-white pt-3">
                            <div className="flex justify-between items-center px-10 pb-2  pt-3">
                                <h1 className="text-xl font-bold text-secondary">Order Total</h1>
                                <h1 className="text-xl font-bold text-primary">${parseFloat(totalPrice).toFixed(2)}</h1>
                            </div>
                            <div className="card-actions justify-end grid grid-cols-2 px-3 pb-4">
                                <button onClick={() => dispatch({ type: 'clearCart' })} className="style_btn py-1 bg-accent px-4 rounded-md text-white font-bold flex justify-center items-center">
                                    Clear Cart <DeleteIcon iconClass="w-7 h-7 text-white" />
                                </button>
                                <button onClick={() => router.push('/checkout')} className="style_btn px-5 py-1 bg-primary rounded-md text-white font-bold flex justify-center items-center">
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


{/* <select className="select select-bordered ml-2">
                                        <option disabled selected>1</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select> */}