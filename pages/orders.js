import React, { useEffect } from 'react';
import axios from "axios"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"

const Orders = () => {
    const { accessToken, userInfo, isAuthenticate } = useSelector(state => state.authReducer)

    // state
    const [orders, setOrders] = React.useState([])

    // next router
    const router = useRouter()

    // get my orders
    useEffect(() => {
        const getMyOrders = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_BASE_URL}/api/order/getMyOrders?email=${userInfo.email}`)
            setOrders(res.data.myOrders);
        }
        getMyOrders();
    }, [userInfo])
    return (
        <div className="w-10/12 mx-auto my-20 min-h-[60vh]">
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
                            orders.map(order => {
                                return (
                                    <>
                                        <tr className="hover">
                                            <td>{order._id}</td>
                                            <td>{Object.keys(order.products).length} item</td>
                                            <td>${order.amount}</td>
                                            <td>
                                                {
                                                    order?.payment_status ?
                                                        <>
                                                            <span className="bg-primary text-sm px-7 py-1 inline-block rounded-2xl font-semibold text-white">
                                                                Paid
                                                            </span>
                                                        </>
                                                        :
                                                        <span className="px-5 text-sm py-1 rounded-2xl bg-red-400 font-semibold text-white">
                                                            Unpaid
                                                        </span>
                                                }
                                            </td>
                                            <td>
                                                {/* <a href={`/order/${order._id}`} className="text-sm text-blue-500 hover:text-blue-700"> */}
                                                <button onClick={() => router.push(`payment/${order._id}`)} className="style_btn bg-primary px-5 rounded-md text-white font-bold flex justify-center items-center">
                                                    Pay Now
                                                </button>
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