import React from 'react';
import Image from "next/image"

const ProductCard = () => {
    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img src="https://i.ibb.co/tZWkP0S/guava.png" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end grid grid-cols-2">
                        <button className="bg-slate-600 px-3 py-1 rounded-md text-white font-bold">Details</button>
                        <button className="bg-primary px-5 py-1 rounded-md text-white font-bold">Cart</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;