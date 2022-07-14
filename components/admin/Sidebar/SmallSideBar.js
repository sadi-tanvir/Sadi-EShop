import React, { useState } from 'react';
import DashboardIcon, { DeliverablesIcon, InventoryIcon, InvoicesIcon, OrdersIcon, ProductIcon, ProductsIcon, SettingsIcon } from '../../shared/DashboardIcon';
import Link from "next/link"
import { useRouter } from "next/router"


const SmallSideBar = ({ sidebarHandler, sideBar, menuItemText }) => {

    // next router
    const router = useRouter()

    return (
        <>
            <div className={`${sideBar ? " translate-x-0" : " -translate-x-64"} min-h-screen w-64 z-40 absolute bg-gray-800 shadow md:h-full flex-col justify-between sm:hidden transition duration-150 ease-in-out`} id="mobile-nav">
                <button aria-label="toggle sidebar" id="openSideBar" className={`${sideBar ? "hidden" : ""} h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 rounded focus:ring-gray-800`} onClick={sidebarHandler}>
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg7.svg" alt="toggler" />
                </button>
                <button aria-label="Close sidebar" id="closeSideBar" className={`${sideBar ? "" : "hidden"} h-10 w-10 bg-gray-800 absolute right-0 mt-16 -mr-10 flex items-center shadow rounded-tr rounded-br justify-center cursor-pointer text-white`} onClick={sidebarHandler}>
                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/light_with_icons_at_bottom-svg8.svg" alt="cross" />
                </button>
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
                <div className="absolute bottom-0 w-full px-8 border-t border-gray-700">
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

export default SmallSideBar;