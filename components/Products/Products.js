import React from 'react';
import ProductCard from './ProductCard';

const Products = () => {
    return (
        <>
            <div className="w-full flex flex-row justify-center items-center my-10">
                <div className="w-11/12 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {
                        [...Array(9)].map((elem, index) => <ProductCard key={index} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Products;