import { useEffect, useState } from 'react';
import axios from "axios"
import ProductCard from '../ProductCard';


const MobilesElectronics = () => {
    // state
    const [products, setProducts] = useState({});

    useEffect(() => {
        const getData = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/product/getElectronicsMobile`)
            setProducts(res.data.mobiles);
        }
        getData()
    }, [])

    return (
        <>
            <div className="my-10">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Mobiles
                    </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 px-5">
                    {
                        Object.keys(products).splice(0,4).map((elem, index) => {
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


export default MobilesElectronics