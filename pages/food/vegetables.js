import React from 'react';
import ProductCard from '../../components/Products/ProductCard';

const Vegetables = () => {
    return (
        <>
            <div className="my-14 w-11/12 m-auto">
                {/* <div className='w-11/12 m-auto'> */}

                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Fresh Vegetables
                    </h1>
                </div>
                {/* </div> */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        [...Array(9)].map((elem, index) => <ProductCard key={index} img="https://chaldn.com/_mpimage/coriander-leaves-dhonia-pata-10-gm-100-gm?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D28562&q=low&v=1&m=400&webp=1" />)
                    }
                </div>
            </div>
        </>
    );
};

export default Vegetables;