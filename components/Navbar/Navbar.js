import { useEffect } from "react";
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import CartItem from "../Cart/Cart";
import { MdAccountCircle } from 'react-icons/md';
import jwt from "jsonwebtoken"
import DropdownMenuAccount from "../shared/DropdownMenuAccount";
import DropdownMenu from "../shared/DropdownMenu";

const Navbar = () => {
    // redux
    const dispatch = useDispatch();
    const { accessToken, userInfo, isAuthenticate } = useSelector(state => state.authReducer)

    // router
    const router = useRouter()

    const dropdownActivePath = (path) => {
        return router.pathname == path ? 'bg-primary rounded-md text-white font-bold' : ''
    }

    const navActivePath = (path) => {
        return router.pathname == path ? 'text-primary border-b-4 border-primary' : 'text-secondary'
    }


    // handle logout user
    const handleLogOut = () => {
        dispatch({ type: 'logOutUser' })
        localStorage.removeItem('userInfo')
        localStorage.removeItem('accessToken')
        router.push('/login')
    }

    return (
        <>
            <nav className="navbar bg-base-100 flex justify-center items-center">
                <div className="w-10/12 flex justify-between items-center">
                    <div className="">
                        <Link href="/">
                            <a className="btn btn-ghost normal-case text-2xl font-bold text-primary">Sadi Eshop</a>
                        </Link>
                    </div>
                    <div className="flex-none">
                        <Link href="/">
                            <a className={`${navActivePath('/')} font-bold  px-4 py-2`}>
                                Home
                            </a>
                        </Link>
                        <DropdownMenu name="Fashion">
                            <ul tabIndex="0" className="menu dropdown-content p-2 shadow bg-base-100 w-52 mt-4">
                                <Link href="/fashion/men">
                                    <li className={`${dropdownActivePath('/fashion/men')}`}>
                                        <a className="">Mens Fashion</a>
                                    </li>
                                </Link>
                                <Link href="/fashion/women">
                                    <li className={`${dropdownActivePath('/fashion/women')}`}>
                                        <a>Womens Fashion</a>
                                    </li>
                                </Link>
                            </ul>
                        </DropdownMenu>
                        <a className="text-secondary font-bold">About</a>
                        <a className="text-secondary font-bold ml-5">Contact</a>
                    </div>
                </div>


                <div className="ml-5">
                    {
                        isAuthenticate ?
                            <DropdownMenuAccount>
                                <ul className="mr-52 absolute hidden z-10 text-gray-700 group-hover:block w-[150px] bg-slate-200 px-1 py-1 rounded-md">
                                    <Link href="/myaccount">
                                        <li className={`${dropdownActivePath('/myaccount')} py-2 px-2 cursor-pointer`}>
                                            <a className="font-bold">My Account</a>
                                        </li>
                                    </Link>
                                    <Link href="/orders">
                                        <li className={`${dropdownActivePath('/orders')} py-2 px-2  cursor-pointer`}>
                                            <a className="font-bold">Orders</a>
                                        </li>
                                    </Link>
                                    <li onClick={handleLogOut} className={`py-2 px-2 cursor-pointer bg-accent text-white font-bold text-center mt-2 rounded-md`}>
                                        <a>Logout</a>
                                    </li>
                                </ul>
                            </DropdownMenuAccount>
                            :
                            // login icon
                            <MdAccountCircle onClick={() => router.push('/login')} className="text-3xl text-slate-500 cursor-pointer style_btn" />
                    }
                </div>



                {/* cart items */}
                <CartItem />
            </nav>
        </>
    );
};

export default Navbar;