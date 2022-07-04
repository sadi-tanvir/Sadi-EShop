import React from 'react';
import ProductCard from "../../components/Products/ProductCard";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/router'
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';

const WomenFashion = ({ products }) => {

    return (
        <>
            {/* Breadcrumbs  & header */}
            <Breadcrumbs firstPath="/" firstName="Home" current="fashion/women" />
            <HeadInfo title="Women's Fashion - Sadi EShop" />

            <div className="my-14 w-11/12 m-auto">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Womens Fashion
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        Object.keys(products).map((elem, index) => {
                            // console.log(products[elem].color);
                            return <ProductCard
                                product={products[elem]}
                                colors={products[elem].color}
                                key={index}
                            />
                        })
                    }
                </div>
            </div>
        </>
    );
};

// This gets called on every request
export async function getServerSideProps() {

    const products = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/getWomenFashion`)


    // Pass data to the page via props
    return { props: { products: products.data.tshirts } }
}

export default WomenFashion;