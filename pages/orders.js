import React, { useEffect } from 'react';
import TableDropdown from "../components/Table/TableDropdown";
import axios from "axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import Breadcrumbs from '../components/Breadcrumbs';
import HeadInfo from '../components/HeadInfo';


const Orders = () => {
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [orders, setOrders] = React.useState([])

    // next router
    const router = useRouter()

    // get my orders
    useEffect(() => {
        const getMyOrders = async () => {
            const res = await axios.get(`${process.env.NEXT_PUBLIC_PORT}/api/order/getMyOrders?email=${userInfo.email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }

            })
            setOrders(res.data.myOrders);
        }
        getMyOrders();
    }, [userInfo, accessToken])
    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" current="orders" />
            <HeadInfo title="Orders - Sadi EShop" />

            <div className={`px-5 min-h-screen md:px-20 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded`}>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={`font-bold text-2xl text-secondary`} >
                                My Orders
                            </h3>
                        </div>
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
                                        Order Item Qty
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                        Total Amount
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                        Payment Status
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
                                                            {order._id}
                                                        </span>
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <span className="badge badge-primary text-white font-bold">
                                                            {Object.keys(order.products).length} pcs
                                                        </span>
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        <span className="badge badge-accent text-white font-bold">
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

                                                    <td className="border-t-0 px-6 align-top border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                        <TableDropdown order={order} />
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
        </>
    );
}

export default Orders
