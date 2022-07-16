import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../components/Breadcrumbs';
import HeadInfo from '../../components/HeadInfo';
import TableDropdown from "../../components/admin/orders/TableDropdown"
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../components/admin/Pagination';
import Swal from 'sweetalert2';


const Orders = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [orders, setOrders] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    const [count, setCount] = useState(0)
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(0)

    // handle Confirm Payment
    const handleConfirmPayment = async (orderId) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/confirmPayment`, {
                _id: orderId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            // console.log(`from table drop....`, res.data)
            if (res.data.message) {
                toast.success(res.data?.message)
                setIsChanged(!isChanged)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message)
        }
    }

    // handle Confirm Delivery
    const handleConfirmDelivery = async (orderId) => {
        try {
            const res = await axios.put(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/confirmDelivery`, {
                _id: orderId,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })

            if (res.data.message) {
                toast.success(res.data?.message)
                setIsChanged(!isChanged)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message)
        }
    }

    // handle Delete Order
    const handleDeleteOrder = async (orderId) => {
        try {

            Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, cancel it!' }).then((result) => {
                if (result.isConfirmed) {
                    const deleteData = async () => {
                        const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/deleteOrder?id=${orderId}`, {
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
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/ordersCount`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            const count = res.data.ordersCount
            const dividedCount = Math.ceil(count / size)
            setCount(dividedCount)
        }
        countProducts()
    }, [accessToken, size])

    // get all orders
    useEffect(() => {
        const getOrders = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/orders/getOrders?page=${page}&size=${size}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            setOrders(res.data.orders)
        }
        getOrders()
    }, [isChanged, accessToken, size, page])


    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin" secondName="Dashboard" current="Orders" />
            <HeadInfo title="All Orders - Sadi EShop" />

            <SidebarLayout>
                <div className={`px-5 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded`}>
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="w-full px-4 max-w-full flex-grow flex-1 mb-5 md:mb-0">
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
                                            Order Id
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            Qty
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            Amount
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            Payment
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            shipping
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        orders?.map(order => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                            <span className={`ml-3 inline-block text-secondary font-bold text-md`}>
                                                                <span className="block mb-2">
                                                                    {order.userEmail.slice(0, 20)}
                                                                </span>
                                                                <span className="block">
                                                                    {order._id}
                                                                </span>
                                                            </span>
                                                        </th>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-primary text-white font-bold  shadow-md">
                                                                {Object.keys(order.products).length} pcs
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-accent text-white font-bold  shadow-md">
                                                                ${order.amount} USD
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {
                                                                order?.payment_status ?
                                                                    <>
                                                                        <i className="fas fa-circle text-primary mr-2"></i>
                                                                        <span className='text-secondary font-bold'>
                                                                            Paid
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <i className="fas fa-circle text-accent mr-2"></i>
                                                                        <span className='text-secondary font-bold'>
                                                                            Pending
                                                                        </span>
                                                                    </>
                                                            }
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {
                                                                order?.shipping ?
                                                                    <>
                                                                        <i className="fas fa-circle text-primary mr-2"></i>
                                                                        <span className='text-primary font-bold'>
                                                                            delivered
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <i className="fas fa-circle text-accent mr-2"></i>
                                                                        <span className='text-accent font-bold'>
                                                                            pending
                                                                        </span>
                                                                    </>
                                                            }
                                                        </td>

                                                        <td className="border-t-0 px-6 align-top border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                            <TableDropdown
                                                                handleConfirmPayment={handleConfirmPayment}
                                                                handleConfirmDelivery={handleConfirmDelivery}
                                                                handleDeleteOrder={handleDeleteOrder}
                                                                order={order}
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


export default Orders;