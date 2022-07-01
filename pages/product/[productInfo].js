/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from "next/router"
import CartIcon, { DownArrowIcon, FacebookIcon, HeartIcon, MessageIcon, StarHalfIcon, StarIcon, TwitterIcon } from '../../components/shared/Icon';
import { useDispatch } from "react-redux"
import Product from "../../model/Product";
import { ToastContainer, toast } from "react-toastify"
const ProductInfo = ({ product, variant }) => {
    // redux
    const dispatch = useDispatch()

    // state
    const [sizes, setSizes] = useState({})
    const [currentProduct, setCurrentProduct] = useState({})
    const [currentColor, setCurrentColor] = useState("")

    // router
    const router = useRouter()
    const { productInfo } = router.query


    // Add Item To the cart
    const addToCart = () => {
        dispatch({ type: 'addToCart', payload: { name: currentProduct.name, img: currentProduct.img, price: currentProduct.price, qty: 1, productId: currentProduct._id, size: currentProduct.size, variant: currentProduct.color } })
    }

    // Buy Now
    const buyNow = () => {
        dispatch({ type: 'clearCart' })
        dispatch({ type: 'addToCart', payload: { name: currentProduct.name, img: currentProduct.img, price: currentProduct.price, qty: 1, productId: currentProduct._id, size: currentProduct.size, variant: currentProduct.color } })
        router.push('/checkout')
    }


    const getSize = (color, size) => {
        setSizes(size)
        setCurrentColor(color)
    }

    useEffect(() => {
        const findCurrentProduct = product.find(pro => {
            return pro._id === productInfo
        })
        setCurrentProduct(findCurrentProduct);
        setCurrentColor(currentProduct.color)
    }, [])




    // color's object
    const colors = {
        white: 'bg-white',
        black: 'bg-gray-700',
        blue: 'bg-blue-700',
        red: 'bg-red-700',
        orange: 'bg-orange-700'
    }

    // redirect to selected size product
    const refreshVariant = (newColor, newSize) => {
        let url = `http://localhost:3000/product/${variant[newColor][newSize]['id']}`
        console.log(url);
        window.location = url
    }


    return (
        <>
            <section className="text-gray-600 body-font overflow-hidden">

                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        {/* product image */}
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded hover:scale-150 transition ease-in-out duration-300"
                            src={currentProduct['img']}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">PRODUCT NAME</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{currentProduct?.name}</h1>

                            <div className="flex mb-4">
                                {/* rating */}
                                <span className="flex items-center">
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarIcon />
                                    <StarHalfIcon />
                                    <span className="text-gray-600 ml-3">4 Reviews</span>
                                </span>

                                {/* social icon */}
                                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                                    <a className="text-gray-500">
                                        <FacebookIcon />
                                    </a>
                                    <a className="text-gray-500">
                                        <TwitterIcon />
                                    </a>
                                    <a className="text-gray-500">
                                        <MessageIcon />
                                    </a>
                                </span>
                            </div>

                            <p className="leading-relaxed">{currentProduct?.description}</p>

                            {/* color & size area */}
                            {
                                Object.keys(variant)[0] &&
                                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                                    {/* color area */}
                                    <div className="flex">
                                        <span className="mr-3">Color</span>
                                        {
                                            Object.keys(variant).map(color => <button key={color} onClick={() => getSize(color, variant[color])} className={`${colors[color]} border-2 ${currentColor === color ? 'border-gray-700 w-7 h-7' : 'border-gray-300 w-6 h-6'}  ml-1 rounded-full focus:outline-none`}></button>)
                                        }
                                    </div>

                                    {/* product size */}
                                    <div className="flex ml-6 items-center">
                                        <span className="mr-3">Size</span>
                                        <div className="relative">
                                            <select onChange={(e) => refreshVariant(currentColor, e.target.value)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 text-base pl-3 pr-10">
                                                <option value={""} selected>Size</option>
                                                {
                                                    Object.keys(sizes).map(size => <option key={size} value={size} >{size}</option>)
                                                }
                                            </select>
                                            <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                                                <DownArrowIcon />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            }

                            <div className="flex flex-col">
                                <div className="flex justify-start items-center">
                                    {/* price */}
                                    <span className="text-2xl text-secondary font-bold">${parseFloat(currentProduct["price"]).toFixed(2)}</span>

                                    <button className="rounded-full ml-32 w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500">
                                        <HeartIcon />
                                    </button>
                                </div>

                                {/* buy & cart add button */}
                                <div className="flex justify-start items-center mt-10">
                                    <button onClick={buyNow} className="flex text-white bg-secondary border-0 py-2 px-6 focus:outline-none hover:bg-primary style_btn rounded">
                                        Buy Now
                                    </button>
                                    <button onClick={addToCart} className="flex ml-10 text-white bg-primary border-0 py-2 px-6 focus:outline-none hover:bg-primary style_btn rounded">
                                        Add To Cart
                                        <CartIcon iconClass="h-7 w-7" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};


// This gets called on every request
export async function getServerSideProps(context) {
    const product = await Product.findOne({ _id: context.query.productInfo });
    const variants = await Product.find({ name: product.name })

    let colorSizeInfo = {}

    for (let item of variants) {
        if (Object.keys(colorSizeInfo).includes(item.color)) {
            colorSizeInfo[item.color][item.size] = { id: item._id }
        } else {
            colorSizeInfo[item.color] = {}
            colorSizeInfo[item.color][item.size] = { id: item._id }
        }
    }


    // Pass data to the page via props
    return { props: { product: JSON.parse(JSON.stringify(variants)), variant: JSON.parse(JSON.stringify(colorSizeInfo)) } }
}

export default ProductInfo;



{/* {Object.keys(variant).includes('white') && <button onClick={() => getSize(variant['white'])} className="border-2 border-gray-300 ml-1 bg-white rounded-full w-6 h-6 focus:outline-none"></button>} */ }
{/* {Object.keys(variant).includes('black') && <button onClick={() => getSize(variant['black'])} className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>} */ }
{/* {Object.keys(variant).includes('blue') && <button onClick={() => getSize(variant['blue'])} className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>} */ }
{/* {Object.keys(variant).includes('red') && <button onClick={() => getSize(variant['red'])} className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>} */ }
{/* {Object.keys(variant).includes('orange') && <button onClick={() => getSize(variant['orange'])} className="border-2 border-gray-300 ml-1 bg-orange-700 rounded-full w-6 h-6 focus:outline-none"></button>} */ }