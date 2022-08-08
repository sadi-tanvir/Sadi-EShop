import React, { useEffect, useState } from 'react';
import { OrdersIcon, UsersIcon } from '../../shared/DashboardIcon';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';

const DashboardCard = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [orders, setOrders] = useState([])
    const [users, setUsers] = useState([])
    const [pendingOrders, setPendingOrders] = useState([])

    // users calculate
    const adminUser = users?.filter(user => {
        return user.role === 'admin'
    })
    const normalUser = users?.filter(user => {
        return user.role !== 'admin'
    })


    // orders calculate
    const totalPendingOrders = orders?.filter((order) => {
        return order.shipping === false
    })
    const paidPendingOrders = orders?.filter((order) => {
        return order.shipping === false && order.payment_status === true
    })
    const unpaidPendingOrders = orders?.filter((order) => {
        return order.shipping === false && order.payment_status === false
    })


    // get all orders
    useEffect(() => {
        const getOrders = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_PORT}/api/admin/orders/getOrders`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            setOrders(res.data.orders)
        }
        getOrders()
    }, [accessToken])

    // get all Users
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_PORT}/api/admin/users/getUsers`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            setUsers(res.data.users)
        }
        getUsers()
    }, [accessToken])

    const cardData = [
        {
            divColor: 'bg-gradient-to-bl from-teal-100 via-teal-300 to-teal-400',
            title: `Pending Order - ${totalPendingOrders.length}`,
            icon: <OrdersIcon iconClass="text-secondary w-8" />,
            info_1: `Paid Order - ${paidPendingOrders.length}`,
            info_2: `Unpaid Order - ${unpaidPendingOrders.length}`,
        },
        {
            divColor: 'bg-gradient-to-bl from-emerald-100 via-emerald-300 to-emerald-400',
            title: `Total Users - ${users.length}`,
            icon: <UsersIcon iconClass="text-secondary w-8" />,
            info_1: `admin - ${adminUser.length}`,
            info_2: `user - ${normalUser.length}`,
        }
    ]

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">


                {
                    cardData.map((card, index) => {
                        return (
                            <>
                                <div className="w-full p-2">
                                    <div
                                        className={`${card.divColor} flex flex-col px-6 py-2 overflow-hidden  rounded-xl shadow-lg duration-300 hover:shadow-2xl group`}>
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="inline-flex text-sm text-gray-600 group-hover:text-gray-200 sm:text-base">
                                                <h1 className="text-2xl sm:text-3xl xl:text-5xl font-bold text-secondary group-hover:text-gray-50">
                                                    {card.title}
                                                </h1>
                                            </div>
                                            <div className="px-4 py-4 bg-gray-400  rounded-xl bg-opacity-30">
                                                {card.icon}
                                            </div>
                                        </div>
                                        <div className="flex flex-col group-hover:text-gray-200">

                                            <div className="flex flex-col justify-start w-6/12 py-[2px] mt-2 px-3 rounded-xl bg-secondary">
                                                <p className="text-xs text-white font-bold">
                                                    {card.info_1}
                                                </p>
                                            </div>
                                            <div className="flex flex-col justify-start w-6/12 py-[2px] mt-2 px-3 rounded-xl bg-secondary">
                                                <p className="text-xs text-white font-bold">
                                                    {card.info_2}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )
                    })
                }


            </div>
        </>
    );
};


export default DashboardCard;