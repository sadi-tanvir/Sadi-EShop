import React from 'react';

const ProductCard = () => {
    return (
        <>
            <div className="card bg-base-100 shadow-xl">
                <figure className="px-10 pt-1">
                    <img src="https://api.lorem.space/image/shoes?w=400&h=225" alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">Shoes!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Accept</button>
                        <button className="btn btn-ghost">Deny</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductCard;