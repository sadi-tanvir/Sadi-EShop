import { useEffect } from "react";
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import CartItem from "../Cart/Cart";
import { MdAccountCircle } from 'react-icons/md';
import jwt from "jsonwebtoken"

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

                        <div className="dropdown dropdown-end">
                            <label tabIndex="0" className={`${navActivePath('/fashion/men')} font-bold px-4 py-2  cursor-pointer`}>Fashion</label>
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
                        </div>
                        <a className="text-secondary font-bold ml-5">About</a>
                        <a className="text-secondary font-bold ml-5">Contact</a>
                    </div>
                </div>

                <div className="ml-5">
                    {
                        isAuthenticate ?
                            <div className="dropdown dropdown-end">
                                <label tabIndex="0" className="cursor-pointer">
                                    <div className="avatar placeholder  hover:scale-125 active:scale-90 transition-all duration-300">
                                        <div className="bg-neutral-focus  border-2 border-slate-400 text-neutral-content rounded-full w-7  shadow-2xl">
                                            <img src="https://i.ibb.co/jgDtzL8/empty-avatar.jpg" alt="" />
                                        </div>
                                    </div>
                                </label>
                                <ul tabIndex="0" className="menu dropdown-content px-2 shadow bg-base-100 w-36 mt-4">
                                    <li onClick={handleLogOut} className={`${dropdownActivePath('/fashion/men')} bg-accent text-white font-bold rounded-md`}>
                                        <a className="">Logout</a>
                                    </li>
                                </ul>
                            </div>
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