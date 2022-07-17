import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import HeadInfo from '../../../components/HeadInfo';
import TableDropdown from "../../../components/admin/products/TableDropdown"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import Pagination from '../../../components/admin/Pagination';
import Swal from 'sweetalert2';

const Products = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    const [count, setCount] = useState(0)
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(0)


    // state
    const [products, setProducts] = useState([])
    const [isChanged, setIsChanged] = useState(false)


    // handle Delete Product
    const handleDeleteProduct = async (orderId) => {
        try {
            Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, cancel it!' }).then((result) => {
                if (result.isConfirmed) {
                    const deleteData = async () => {
                        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/products/deleteProduct?id=${orderId}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                authentication: accessToken
                            }
                        })

                        if (res.data.message) {
                            toast.success(res.data?.message)
                            setIsChanged(!isChanged)
                        }
                    }
                    deleteData()
                }
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message)
        }
    }


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
                            <div className="mb-4 md:mb-0 w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className={`font-bold text-2xl text-secondary`} >
                                    Products Management
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
                                                                <span title={product.name} className="block mb-2">
                                                                    {product.name.length >= 18 ? `${product.name.slice(0, 18)}...` : product.name}
                                                                </span>
                                                            </span>
                                                        </th>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-primary text-white font-bold shadow-md">
                                                                {product.category}
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-accent text-white font-bold shadow-md">
                                                                ${product.price} USD
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-primary text-white font-bold shadow-md">
                                                                {product.availableQty} PCS
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-accent text-white font-bold shadow-md lowercase">
                                                                {product.color} / {product.size}
                                                            </span>
                                                        </td>

                                                        <td className="border-t-0 px-6 align-top border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                            <TableDropdown
                                                                product={product}
                                                                handleDeleteProduct={handleDeleteProduct}
                                                            />
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