import React, { useState } from 'react';
import DashboardIcon, { DeliverablesIcon, InventoryIcon, InvoicesIcon, OrdersIcon, ProductIcon, ProductsIcon, SettingsIcon } from '../../shared/DashboardIcon';
import Link from "next/link"
import { useRouter } from "next/router"


const LargeSideBar = ({ menuItemText }) => {

    // next router
    const router = useRouter()
    return (
        <>
            <div style={{ minHeight: "716px" }} className="w-64 absolute sm:relative bg-gray-800 shadow md:min-h-screen flex-col justify-between hidden sm:flex">
                <div className="px-8">
                    <div className="h-16 w-full flex items-center">
                        <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg1.svg" alt="Logo" />
                    </div>
                    <ul className="mt-12">
                        {
                            menuItemText.map((elem, index) => {
                                return (
                                    <>
                                        <Link href={elem.pathname}>
                                            <li className="flex w-full justify-between text-gray-300 hover:text-gray-500 cursor-pointer items-center mb-6">
                                                <a href="javascript:void(0)" className="flex items-center focus:outline-none focus:ring-2 focus:ring-white">
                                                    {/* <DashboardIcon iconClass={`${router.pathname == '/admin' ? 'text-primary' : 'text-white'}`} /> */}
                                                    {elem.icon}
                                                    <span className={`${router.pathname == elem.pathname ? 'text-primary font-bold' : 'text-white'} text-sm ml-2`}>
                                                        {elem.pageName}
                                                    </span>
                                                </a>
                                                <div className="py-1 px-3 bg-gray-600 rounded text-gray-300 flex items-center justify-center text-xs">5</div>
                                            </li>
                                        </Link>
                                    </>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="px-8 border-t border-gray-700">
                    <ul className="w-full flex items-center justify-between bg-gray-800">
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            <button aria-label="show notifications" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg3.svg" alt="notifications" />
                            </button>
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            <button aria-label="open chats" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg4.svg" alt="chat" />
                            </button>
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            <button aria-label="open settings" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg5.svg" alt="settings" />
                            </button>
                        </li>
                        <li className="cursor-pointer text-white pt-5 pb-3">
                            <button aria-label="open logs" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-300">
                                <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg6.svg" alt="drawer" />
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default LargeSideBar;