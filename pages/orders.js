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
            const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/getMyOrders?email=${userInfo.email}`, {
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

            <div className={`flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded`}>
                <div className="rounded-t mb-0 px-4 py-3 border-0">
                    <div className="flex flex-wrap items-center">
                        <div className="w-full px-4 max-w-full flex-grow flex-1">
                            <h3 className={`font-bold text-2xl text-secondary pl-12`} >
                                My Orders
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="px-20">
                    <div className="block w-full overflow-x-auto">
                        {/* Projects table */}
                        <table className="items-center w-full bg-transparent border-collapse">
                            <thead>
                                <tr>
                                    <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                        Order Id
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                        Order Item Qty
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                        Total Amount
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
                                        Payment Status
                                    </th>
                                    <th className={"px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100"}>
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
                                                        <span className={`ml-3 font-bold`}>
                                                            {order._id}
                                                        </span>
                                                    </th>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {Object.keys(order.products).length} pcs
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        ${order.amount} USD
                                                    </td>
                                                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                        {
                                                            order?.payment_status ?
                                                                <>
                                                                    <i className="fas fa-circle text-primary mr-2"></i>
                                                                    <span>
                                                                        paid
                                                                    </span>
                                                                </>
                                                                :
                                                                <>
                                                                    <i className="fas fa-circle text-accent mr-2"></i>
                                                                    <span>
                                                                        pending
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
