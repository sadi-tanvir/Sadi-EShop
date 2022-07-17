import React, { useEffect, useState } from 'react';
import DashboardIcon, { DeliverablesIcon, InventoryIcon, InvoicesIcon, OrdersIcon, ProductIcon, ProductsIcon, SettingsIcon, UsersIcon } from '../../shared/DashboardIcon';
import { useRouter } from "next/router"
import SmallSideBar from './SmallSideBar';
import LargeSideBar from './LargeSideBar';
import jwt from "jsonwebtoken"
import { useSelector, useDispatch } from 'react-redux';


const SidebarLayout = ({ children }) => {
    // redux
    const dispatch = useDispatch();
    const { accessToken, userInfo, isAuthenticate } = useSelector(state => state.authReducer)

    const [sideBar, setSideBar] = useState(false)

    const sidebarHandler = () => {
        setSideBar(!sideBar)
    }

    // next router
    const router = useRouter()

    const menuItemText = [
        // {
        //     pathname: '/admin',
        //     pageName: 'Dashboard',
        //     icon: <DashboardIcon iconClass={`${router.pathname == '/admin' ? 'text-white' : 'text-secondary'}`} />,
        // },
        {
            pathname: '/admin/users/users',
            pageName: 'Users',
            icon: <UsersIcon iconClass={`${router.pathname == '/admin/users' ? 'text-white' : 'text-secondary'}`} />,
        },
        {
            pathname: '/admin/orders',
            pageName: 'Orders',
            icon: <OrdersIcon iconClass={`${router.pathname == '/admin/orders' ? 'text-white' : 'text-secondary'}`} />,
        },
        {
            pathname: '/admin/products/products',
            pageName: 'Products',
            icon: <InventoryIcon iconClass={`${router.pathname == '/admin/product/products' ? 'text-white' : 'text-secondary'}`} />,
        },
        {
            pathname: '/admin/addProduct',
            pageName: 'Add Product',
            icon: <ProductIcon iconClass={`${router.pathname == '/admin/addProduct' ? 'text-white' : 'text-secondary'}`} />,
        }
    ]

    // check authentication
    useEffect(() => {
        const decoded = jwt.decode(accessToken, { complete: true })
        if (decoded?.payload.email === userInfo.email) {
            dispatch({ type: 'loginUser' })
            if (decoded?.payload.role !== 'admin') {
                router.push('/')
            }
        } else {
            dispatch({ type: 'logOutUser' })
            router.push('/login')
        }

        if (!localStorage.getItem('userInfo') || !localStorage.getItem('accessToken')) {
            dispatch({ type: 'logOutUser' })
            if (!isAuthenticate) {
                router.push('/login')
            }
        }
    }, [accessToken, userInfo.email, router, isAuthenticate, dispatch])

    return (
        <>
            <div className="flex flex-no-wrap">
                {/* large size screen */}
                <LargeSideBar
                    menuItemText={menuItemText}
                />


                {/* small size screen */}
                <SmallSideBar
                    sideBar={sideBar}
                    sidebarHandler={sidebarHandler}
                    menuItemText={menuItemText}
                />

                {/* page content */}
                <div className="container mx-auto py-10 md:w-4/5 w-11/12 px-6">
                    <div className="w-full h-full">
                        {children}
                    </div>
                </div>
            </div>

            {/* remove footer from admin pages */}
            <style jsx global>
                {`
                    footer {
                        display: none !important;
                    }
                `}
            </style>
        </>
    );
};

export default SidebarLayout;