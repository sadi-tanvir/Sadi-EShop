import React from 'react';
import Link from "next/link"
import { useSelector } from "react-redux"
import { useRouter } from "next/router"
import DashboardIcon, { HomeIcon, InventoryIcon, MobileIcon, MonitorIcon } from '../shared/DashboardIcon';



const SmallSizeMenu = () => {
    // redux
    const { menuDropDown } = useSelector(state => state.globalReducer)
    const { userInfo } = useSelector(state => state.authReducer)

    // router
    const router = useRouter()

    return (
        <>
            <div className={`${menuDropDown ? "" : "hidden"} bg-gray-100 w-full flex-grow lg:flex lg:items-center lg:w-auto block lg:hidden mt-2 lg:mt-0 z-20`} id="nav-content">
                <ul className="list-reset px-5 py-2">
                    <Link href="/">
                        <li className={`${router.pathname == '/' ? 'bg-primary rounded-md text-white font-bold shadow-md' : 'shadow text-secondary'} mt-2 py-2 px-2 cursor-pointer flex items-center`}>
                            <HomeIcon iconClass={`${router.pathname == '/' ? 'text-white' : 'text-secondary'}`} />
                            <a className="font-bold ml-2">Home</a>
                        </li>
                    </Link>
                    {
                        userInfo.role === 'admin' &&
                        <Link href="/admin/users/users">
                            <li className={`${router.pathname == '/admin/users/users' ? 'bg-primary rounded-md text-white font-bold shadow-md' : 'shadow text-secondary'} mt-2 py-2 px-2 cursor-pointer flex items-center`}>
                                <DashboardIcon iconClass={`${router.pathname == '/admin/users/users' ? 'text-white' : 'text-secondary'}`} />
                                <a className="font-bold ml-2">Dashboard</a>
                            </li>
                        </Link>
                    }
                    <Link href="/fashion/men">
                        <li className={`${router.pathname == '/fashion/men' ? 'bg-primary rounded-md text-white font-bold shadow-md' : 'shadow text-secondary'} mt-2 py-2 px-2  cursor-pointer flex items-center`}>
                            <InventoryIcon iconClass={`${router.pathname == '/fashion/men' ? 'text-white' : 'text-secondary'}`} />
                            <a className="font-bold ml-2">Men Fashion</a>
                        </li>
                    </Link>
                    <Link href="/fashion/women">
                        <li className={`${router.pathname == '/fashion/women' ? 'bg-primary rounded-md text-white font-bold shadow-md' : 'shadow text-secondary'} mt-2 py-2 px-2  cursor-pointer flex items-center`}>
                            <InventoryIcon iconClass={`${router.pathname == '/fashion/women' ? 'text-white' : 'text-secondary'}`} />
                            <a className="font-bold ml-2">Women Fashion</a>
                        </li>
                    </Link>
                    <Link href="/electronics/mobiles">
                        <li className={`${router.pathname == '/electronics/mobiles' ? 'bg-primary rounded-md text-white font-bold shadow-md' : 'shadow text-secondary'} mt-2 py-2 px-2  cursor-pointer flex items-center`}>
                            <MobileIcon iconClass={`${router.pathname == '/electronics/mobiles' ? 'text-white' : 'text-secondary'}`} />
                            <a className="font-bold ml-2">Mobiles</a>
                        </li>
                    </Link>
                    <Link href="/electronics/monitors">
                        <li className={`${router.pathname == '/electronics/monitors' ? 'bg-primary rounded-md text-white font-bold shadow-md' : 'shadow text-secondary'} mt-2 py-2 px-2  cursor-pointer flex items-center`}>
                            <MonitorIcon iconClass={`${router.pathname == '/electronics/monitors' ? 'text-white' : 'text-secondary'}`} />
                            <a className="font-bold ml-2">Monitors</a>
                        </li>
                    </Link>
                </ul>
            </div>
        </>
    );
};

export default SmallSizeMenu;