import React from 'react';
import ProductCard from '../../components/Products/ProductCard';

const Fruits = () => {
    return (
        <>
            <div className="my-14 w-11/12 m-auto">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-primary uppercase">
                        Fresh Fruits
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        [...Array(9)].map((elem, index) => <ProductCard key={index} />)
                    }
                </div>
            </div>
        </>
    );
};

export default Fruits;