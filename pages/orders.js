import React, { useEffect } from 'react';
import axios from "axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import { TbListDetails } from 'react-icons/tb';
import { FaCcAmazonPay } from 'react-icons/fa';


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
        <div className="w-10/12 mx-auto my-20 min-h-[60vh] shadow-lg">
            <h1 className="font-bold text-2xl uppercase my-5">My Orders</h1>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th>Order Id</th>
                            <th>Order Item Qty</th>
                            <th>Total Amount</th>
                            <th>Payment Status</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders?.map(order => {
                                return (
                                    <>
                                        <tr className="hover">
                                            <td>{order._id}</td>
                                            <td>{Object.keys(order.products).length} item</td>
                                            <td>${order.amount}</td>
                                            <td>
                                                {
                                                    order?.payment_status ?
                                                        <img draggable={false} src="/assets/paid-icon.png" className="w-[50px]  " alt="paid" />
                                                        :
                                                        <img draggable={false} src="/assets/unpaid-icon.png" className="w-14  " alt="unpaid" />
                                                }
                                            </td>
                                            <td className="flex">
                                                {
                                                    order?.payment_status ||
                                                    <FaCcAmazonPay onClick={() => router.push(`payment/${order._id}`)} title="pay" className="mr-2 text-3xl text-accent cursor-pointer style_btn" />
                                                }
                                                <TbListDetails title="details" onClick={() => router.push(`order/${order._id}`)} className="text-3xl text-primary cursor-pointer style_btn" />
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
    );
};

export default Orders;