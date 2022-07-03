import ProductSlider from "../ProductSlider";
import { useEffect, useState } from 'react';
import axios from "axios"

const WomenFashion = () => {
    // state
    const [products, setProducts] = useState({});

    useEffect(() => {
        const getData = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/getWomenFashion`)
            setProducts(res.data.tshirts);
        }
        getData()
    }, [])

    return (
        <>
            <div className="my-10">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Women&rsquo;s Fashion
                    </h1>
                </div>

                <ProductSlider products={products}></ProductSlider>
            </div>
        </>
    );
};

export default WomenFashion