/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinusIcon, PlusIcon } from '../shared/Icon';
import classes from "../../styles/Cart.module.css"

const CartItem = ({ productKey }) => {
    const { cart } = useSelector(state => state.productsReducer)
    const { productId, name, img, qty, price, size, variant } = cart[productKey]

    // redux
    const dispatch = useDispatch()

    return (
        <>
            <div className={`${classes.cartItem} flex mx-auto mt-3 py-1 px-5 shadow`}>
                <div>
                    <img
                        className="w-16 h-full rounded-lg"
                        src={img}
                        alt=""
                    />
                </div>
                <div className="ml-3">
                    <h2 className="text-sm font-bold text-secondary">{name.slice(0, 8)}...</h2>
                    <p className="text-secondary font-semibold text-md">color: {variant}</p>
                    <p className="text-secondary font-semibold text-md">size: {size}</p>
                    <p className="text-primary font-semibold text-md">${price}</p>
                </div>
                <div className="flex justify-center my-auto ml-auto items-center">
                    <button onClick={() => dispatch({ type: 'removeFromCart', payload: { productId: productId } })} className="">
                        <MinusIcon iconClass="w-7 h-7 text-accent style_btn" />
                    </button>
                    <p className="text-white px-3 font-bold rounded bg-secondary">{qty < 10 ? `0${qty}` : qty}</p>
                    <button onClick={() => dispatch({ type: 'addToCart', payload: cart[productKey] })} className="">
                        <PlusIcon iconClass="w-7 h-7 text-primary style_btn" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartItem;