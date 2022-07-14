import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';
import TableDropdown from "../../components/admin/products/TableDropdown"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import Pagination from '../../components/admin/Pagination';

const Products = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    const [count, setCount] = useState(0)
    const [size, setSize] = useState(10)
    const [page, setPage] = useState(0)


    // state
    const [products, setProducts] = useState([])
    const [isChanged, setIsChanged] = useState(false)

    // get count products
    useEffect(() => {
        const countProducts = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/productsCount`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            const count = res.data.productsCount
            const dividedCount = Math.ceil(count / size)
            setCount(dividedCount)
        }
        countProducts()
    }, [accessToken, size])

    // get all products
    useEffect(() => {
        const getProducts = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/getProducts?page=${page}&size=${size}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            setProducts(res.data.products)
        }
        getProducts()
    }, [isChanged, accessToken, size, page])
    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin" secondName="Dashboard" current="Products" />
            <HeadInfo title="Products - Sadi EShop" />

            <SidebarLayout>
                <div className={`px-5 flex flex-col min-w-0 break-words w-full shadow-lg rounded`}>
                    <div className="rounded-t mb-0 px-4 pt-3 border-0">
                        <div className="flex flex-wrap items-center mb-3">
                            <div className="w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className={`font-bold text-2xl text-secondary`} >
                                    Customer&rsquo;s Order
                                </h3>
                            </div>
                            
                            {/* pagination */}
                            <Pagination
                                count={count}
                                page={page}
                                setPage={setPage}
                                setSize={setSize}
                            />
                        </div>
                    </div>
                    <div className="">
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}
                            <table className="items-center w-full bg-gray-50 border-collapse">
                                <thead>
                                    <tr className="">
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            name
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            category
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            price
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            available Qty
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            size & color
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map(product => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                            <span className={`ml-3 inline-block text-secondary font-bold text-md`}>
                                                                <span className="block mb-2">
                                                                    {product.name.slice(0, 20)}
                                                                </span>
                                                            </span>
                                                        </th>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-primary text-white font-bold">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-accent text-white font-bold">
                                                                ${product.price} USD
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {product.availableQty}
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {product.color} / {product.size}
                                                        </td>

                                                        <td className="border-t-0 px-6 align-top border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                            <TableDropdown />
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </SidebarLayout>
        </>
    );
};

export default Products;