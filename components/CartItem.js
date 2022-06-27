import React from 'react';
import CartIcon, { DeleteIcon, InfoIcon } from './shared/Icon';
import { useSelector, useDispatch } from "react-redux"

const CartItem = () => {
    // redux
    const dispatch = useDispatch()
    const { cart } = useSelector(state => state.productsReducer)


    const handleClear = () => {
        dispatch({ type: 'clearCart' })
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <label tabIndex="0">
                    <div className="indicator ml-5">
                        <span className="indicator-item badge badge-secondary text-white font-bold">2</span>
                        <CartIcon iconClass="w-8 h-8 text-primary" />
                    </div>
                </label>
                <ul tabIndex="0" className="menu dropdown-content p-2 shadow bg-base-100 w-[330px] mt-4 shadow-2xl rounded-lg">
                    <div className="min-h-[500px]">
                        <div className="flex flex-col justify-center items-start">
                            <div className="flex mx-auto mt-3 py-1 px-5 shadow">
                                <div>
                                    <img className="w-16 h-16 rounded-lg" src="https://static-01.daraz.com.bd/p/8f4c8716c7aee87af057f6b643ee806d.jpg" alt="" />
                                </div>
                                <div className="ml-3">
                                    <h2 className="text-sm font-bold text-secondary">Vegitables Tomato</h2>
                                    {/* <div className="flex justify-start items-center mt-2"> */}
                                    <p className="text-sm text-bold">Qty: 5pcs</p>
                                    <p className="text-primary font-semibold text-md">$550</p>
                                    {/* </div> */}
                                </div>
                                <div className="mt-5 ml-5">
                                    {/* <select className="select select-bordered ml-2">
                                        <option disabled selected>1</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </select> */}
                                    <DeleteIcon iconClass="w-7 h-7 text-accent style_btn" />
                                </div>
                            </div>
                        </div>

                        <div className="w-full absolute bottom-2">
                            <div className="flex justify-between items-center px-10 pb-2">
                                <h1 className="text-xl font-semibold text-secondary">Order Total</h1>
                                <h1 className="text-xl font-semibold text-primary">$500</h1>
                            </div>
                            <div className="card-actions justify-end grid grid-cols-2 mt-4 pr-4">
                                <button onClick={handleClear} className="style_btn py-1 bg-accent px-6 rounded-md text-white font-bold flex justify-center items-center">
                                    Clear Cart <DeleteIcon iconClass="w-7 h-7 text-white" />
                                </button>
                                <button className="style_btn px-6 py-1 bg-primary rounded-md text-white font-bold flex justify-center items-center">
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

export default CartItem;