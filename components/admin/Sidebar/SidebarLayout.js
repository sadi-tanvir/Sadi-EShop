import React, { useState } from 'react';
import DashboardIcon, { DeliverablesIcon, InventoryIcon, InvoicesIcon, OrdersIcon, ProductIcon, ProductsIcon, SettingsIcon } from '../../shared/DashboardIcon';
import { useRouter } from "next/router"
import SmallSideBar from './SmallSideBar';
import LargeSideBar from './LargeSideBar';


const SidebarLayout = ({ children }) => {

    const [sideBar, setSideBar] = useState(false)

    const sidebarHandler = () => {
        setSideBar(!sideBar)
    }

    // next router
    const router = useRouter()

    const menuItemText = [
        {
            pathname: '/admin',
            pageName: 'Dashboard',
            icon: <DashboardIcon iconClass={`${router.pathname == '/admin' ? 'text-primary' : 'text-white'}`} />,
        },
        {
            pathname: '/admin/addProduct',
            pageName: 'Add Product',
            icon: <ProductIcon iconClass={`${router.pathname == '/admin/addProduct' ? 'text-primary' : 'text-white'}`} />,
        },
        {
            pathname: '/admin/products',
            pageName: 'Products',
            icon: <InventoryIcon iconClass={`${router.pathname == '/admin/products' ? 'text-primary' : 'text-white'}`} />,
        },
        {
            pathname: '/admin/orders',
            pageName: 'Orders',
            icon: <OrdersIcon iconClass={`${router.pathname == '/admin/orders' ? 'text-primary' : 'text-white'}`} />,
        },
    ]

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