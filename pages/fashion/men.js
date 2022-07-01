import { useEffect } from "react";
import ProductCard from "../../components/Products/ProductCard";
import axios from "axios"

const MenFashion = ({ products }) => {


    return (
        <>
            <div className="my-14 w-11/12 m-auto">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Mens Fashion
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        Object.keys(products).map((elem, index) => {
                            products[elem]
                            return <ProductCard
                                key={index}
                                product={products[elem]}
                                colors={products[elem].color}
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

    const products = await axios('http://localhost:3000/api/product/getMenFashion')


    // Pass data to the page via props
    return { props: { products: products.data.tshirts } }
}


export default MenFashion;