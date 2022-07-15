import React, { useState } from 'react';
import DashboardIcon, { DeliverablesIcon, InventoryIcon, InvoicesIcon, OrdersIcon, ProductIcon, ProductsIcon, SettingsIcon } from '../../shared/DashboardIcon';
import Link from "next/link"
import { useRouter } from "next/router"


const LargeSideBar = ({ menuItemText }) => {

    // next router
    const router = useRouter()
    return (
        <>
            <div style={{ minHeight: "716px", minWidth: '256px' }} className="absolute sm:relative bg-gray-100 shadow-2xl md:min-h-screen flex-col justify-between hidden sm:flex">
                <div className="px-8">
                    <div className="h-16 w-full flex items-center mt-3">
                        <img src="/assets/logo.png" className="w-[90px]" alt="Logo" />
                    </div>
                    <ul className="mt-5">
                        {
                            menuItemText.map((elem, index) => {
                                return (
                                    <>
                                        <Link href={elem.pathname}>
                                            <li className={`${router.pathname == elem.pathname ? "bg-primary shadow-md" : ""} py-2 px-2 rounded-md flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6`}>
                                                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                                    {/* <DashboardIcon iconClass={`${router.pathname == '/admin' ? 'text-primary' : 'text-white'}`} /> */}
                                                    {elem.icon}
                                                    <span className={`${router.pathname == elem.pathname ? 'text-white' : 'text-secondary'} font-bold text-sm ml-2`}>
                                                        {elem.pageName}
                                                    </span>
                                                </a>
                                                <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">{index+1}</div>
                                            </li>
                                        </Link>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
                {/* <div className="px-8 border-t border-gray-200">
                    <ul className="w-full flex items-center justify-between bg-gray-100">
                        <li className="cursor-pointer text-secondary pt-5 pb-3">
                            <button aria-label="show notifications" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg3.svg" alt="notifications" />
                            </button>
                        </li>
                    </ul>
                </div> */}
            </div>
        </>
    );
};

export default LargeSideBar;