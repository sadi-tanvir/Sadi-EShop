import React, { useEffect } from 'react';
import ProductCard from '../../components/Products/ProductCard';
import mongoose from "mongoose"
import Product from "../../model/Product";

const Fruits = ({ products }) => {

    console.log(`getserver side props`, products);

    return (
        <>
            <div className="my-14 w-11/12 m-auto">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Fresh Fruits
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        [...Array(9)].map((elem, index) => <ProductCard key={index} img="https://chaldn.com/_mpimage/komola-orange-imported-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D64292&q=low&v=1&m=400&webp=1" />)
                    }
                </div>
            </div>
        </>
    );
};


// This gets called on every request
export async function getServerSideProps() {
    // if (!mongoose.connections[0].readyState) {
    //     await mongoose.connect(process.env.MONGO_URI)
    // }

    const products = await Product.find({});

    // Pass data to the page via props
    return { props: { products: JSON.parse(JSON.stringify(products)) } }
}

export default Fruits;
