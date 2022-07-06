import React from 'react';
import Image from "next/image"
import { useRouter } from "next/router"
import CartIcon, { InfoIcon } from '../shared/Icon';
import { useDispatch } from "react-redux"


const ProductCard = ({ colors, product }) => {
    // redux
    const dispatch = useDispatch()

    // next router
    const router = useRouter()

    // Add Item To the cart
    const addToCart = () => {
        dispatch({ type: 'addToCart', payload: { name: product.name, img: product.img, price: product.price, qty: 1, productId: product._id, size: product['size'][0], variant: product["color"][0] } })
    }

    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img src={product["img"]} alt="Shoes" className="rounded-xl h-32" />
                </figure>
                <div className="text-center m-5">
                    {/* <small className="">food category</small> */}
                    <small className="text-slate-500">{product["category"]}</small>
                    <h2 className="text-xl font-bold text-secondary">{product["name"].slice(0, 16)}...</h2>
                    <p className="text-primary font-semibold text-lg mt-2">${product["price"]}</p>
                    <div className="card-actions justify-end grid grid-cols-2 mt-4">
                        <button onClick={() => router.push(`/product/${product["_id"]}`)} className="style_btn bg-slate-600 px-3 rounded-md text-white font-bold flex justify-center items-center">
                            Details <InfoIcon iconClass="w-8 h-8 text-white" />
                        </button>
                        <button disabled={product?.availableQty < 1} onClick={addToCart} className="disabled:cursor-not-allowed disabled:bg-emerald-200 style_btn bg-primary px-5 rounded-md text-white font-bold flex justify-center items-center">
                            Cart <CartIcon iconClass="w-8 h-8 text-white" />
                        </button>
                    </div>
                </div>
                {
                    product["size"][0] !== "" &&
                    <p className="mx-auto">
                        {
                            product["size"].map(item => <span className="mx-1 px-1 border text-secondary border-slate-300" key={item}>{item}</span>)
                        }
                    </p>
                }

                <div className="mx-auto py-3">
                    {colors.includes('white') && <button className="border-2 border-gray-300 ml-1 bg-white rounded-full w-5 h-5 focus:outline-none"></button>}
                    {colors.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                    {colors.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                    {colors.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                    {colors.includes('orange') && <button className="border-2 border-gray-300 ml-1 bg-orange-500 rounded-full w-5 h-5 focus:outline-none"></button>}
                    {colors.includes('black') && <button className="border-2 border-gray-300 ml-1 bg-slate-800 rounded-full w-5 h-5 focus:outline-none"></button>}
                </div>
            </div>
        </>
    );
};

export default ProductCard;