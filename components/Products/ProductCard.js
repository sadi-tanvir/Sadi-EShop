import React from 'react';
import Image from "next/image"
import CartIcon, { InfoIcon } from '../shared/Icon';

const ProductCard = ({img}) => {
    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-5 pt-5">
                    <img src={img} alt="Shoes" className="rounded-xl h-32" />
                </figure>
                <div className="text-center m-5">
                    {/* <small className="">food category</small> */}
                    <small className="text-slate-500">Fresh Fruits</small>
                    <h2 className="text-xl font-bold text-secondary">Vegitables Tomato</h2>
                    <p className="text-primary font-semibold text-lg mt-2">$550</p>
                    <div className="card-actions justify-end grid grid-cols-2 mt-4">
                        <button className="style_btn bg-slate-600 px-3 rounded-md text-white font-bold flex justify-center items-center">
                            Details <InfoIcon iconClass="w-8 h-8 text-white" />
                        </button>
                        <button className="style_btn bg-primary px-5 rounded-md text-white font-bold flex justify-center items-center">
                            Cart <CartIcon iconClass="w-8 h-8 text-white" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;