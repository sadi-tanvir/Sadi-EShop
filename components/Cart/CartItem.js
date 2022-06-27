import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MinusIcon, PlusIcon } from '../shared/Icon';
import classes from "../../styles/Cart.module.css"

const CartItem = ({ productKey }) => {
    const { cart } = useSelector(state => state.productsReducer)
    const { name, qty, price } = cart[productKey]

    // redux
    const dispatch = useDispatch()

    return (
        <>
            <div className={`${classes.cartItem} flex mx-auto mt-3 py-1 px-5 shadow`}>
                <div>
                    <img className="w-16 h-16 rounded-lg" src="https://static-01.daraz.com.bd/p/8f4c8716c7aee87af057f6b643ee806d.jpg" alt="" />
                </div>
                <div className="ml-3">
                    <h2 className="text-sm font-bold text-secondary">{name}</h2>
                    <p className="text-primary font-semibold text-md">${price}</p>
                </div>
                <div className="flex justify-center my-auto ml-auto items-center">
                    <button onClick={() => dispatch({ type: 'removeFromCart', payload: { productId: 4, qty: 1 } })} className="">
                        <MinusIcon iconClass="w-7 h-7 text-accent style_btn" />
                    </button>
                    <p className="text-white px-3 font-bold rounded bg-secondary">{qty < 10 ? `0${qty}` : qty}</p>
                    <button onClick={() => dispatch({ type: 'addToCart', payload: { name: 'Sound Box', price: 600, qty: 1, productId: 4, size: "xxxl", variant: "red" } })} className="">
                        <PlusIcon iconClass="w-7 h-7 text-primary style_btn" />
                    </button>
                </div>
            </div>
        </>
    );
};

export default CartItem;