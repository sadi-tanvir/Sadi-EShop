import React, { useEffect } from 'react';
import ProductCard from "../../components/Products/ProductCard";
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import jwt from "jsonwebtoken"
import { useRouter } from 'next/router'

const WomenFashion = ({ products }) => {
    // redux
    const dispatch = useDispatch();
    const { accessToken, userInfo,isAuthenticate } = useSelector(state => state.authReducer)

    // next router
    const router = useRouter()


    // reload data
    useEffect(() => {
        if (localStorage.getItem('userInfo') && localStorage.getItem('accessToken')) {
            dispatch({ type: 'userInfo', payload: JSON.parse(localStorage.getItem("userInfo")) })
            dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem("accessToken")) })
        }
    }, [dispatch])

    // check authentication
    useEffect(() => {
        const decoded = jwt.decode(accessToken, { complete: true })
        if (decoded?.payload.email === userInfo.email) {
            dispatch({ type: 'loginUser' })
        } else {
            dispatch({ type: 'logOutUser' })
            // localStorage.removeItem('userInfo')
            router.push('/login')
        }

        if (!localStorage.getItem('userInfo') && !localStorage.getItem('accessToken') && isAuthenticate) {
            router.push('/login')
        }
    }, [accessToken, userInfo.email, router, isAuthenticate, dispatch])
    return (
        <>
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

    const products = await axios('http://localhost:3000/api/product/getWomenFashion')


    // Pass data to the page via props
    return { props: { products: products.data.tshirts } }
}

export default WomenFashion;