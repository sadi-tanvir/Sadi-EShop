import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import CartItem from "../Cart/Cart";
import { MdAccountCircle } from 'react-icons/md';
import { DownArrowIcon } from "../shared/Icon";

const Navbar = () => {
    // redux
    const dispatch = useDispatch();
    const { isAdmin, accessToken, userInfo, isAuthenticate } = useSelector(state => state.authReducer)
    const { menuDropDown, userDropDown, fashionDropDown } = useSelector(state => state.globalReducer)

    // router
    const router = useRouter()

    const dropdownActivePath = (path) => {
        return router.pathname == path ? 'bg-primary rounded-md text-white font-bold' : ''
    }

    // const navActivePath = (path) => {
    //     return router.pathname == path ? 'text-primary border-b-4 border-primary' : 'text-secondary'
    // }
    const navActivePath = (path) => {
        return router.pathname == path ? 'text-primary border-b-4 border-primary px-3' : 'text-secondary px-3'
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
            <nav id="header" className="bg-white w-full z-10 top-0 shadow">

                <div className="w-full container mx-auto flex flex-wrap items-center mt-0 pt-3 pb-3 md:pb-0">
                    {/* brand logo */}
                    <div className="w-1/2 pl-2 md:pl-0">
                        <Link href="/">
                            <a className="text-gray-900 text-base xl:text-xl no-underline hover:no-underline font-bold" href="#">
                                <i className="fas fa-sun text-pink-600 pr-3"></i>
                                Sadi EShop
                            </a>
                        </Link>
                    </div>

                    <div className="flex justify-end items-center ml-auto">
                        {/* large device size menu start */}
                        <div className={` w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white z-20`} id="nav-content">
                            <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
                                <Link href="/">
                                    <li className={`${router.pathname == '/' ? 'bg-primary' : 'bg-gray-100'} px-4 py-1 rounded-sm mr-6 md:my-3`}>
                                        <a href="#" className={`${router.pathname == '/' ? 'text-white' : 'text-primary'} font-semibold hover:border-primary flex pl-1 align-middle no-underline`}>
                                            {/* <i className={`${router.pathname == '/' ? 'text-primary' : ''} fas fa-home fa-fw mr-3`}></i> */}
                                            <span className="pb-1 md:pb-0 text-sm">Home</span>
                                        </a>
                                    </li>
                                </Link>
                                {
                                    userInfo.role === 'admin' &&
                                    <Link href="/admin">
                                        <li className={`${router.pathname == '/admin' ? 'bg-primary' : 'bg-gray-100'} px-4 py-1 rounded-sm mr-6 md:my-3`}>
                                            <a href="#" className={`${router.pathname == '/admin' ? 'text-white' : 'text-primary'} font-semibold hover:border-primary flex pl-1 align-middle no-underline`}>
                                                {/* <i className={`${router.pathname == '/' ? 'text-primary' : ''} fas fa-home fa-fw mr-3`}></i> */}
                                                <span className="pb-1 md:pb-0 text-sm">Dashboard</span>
                                            </a>
                                        </li>
                                    </Link>
                                }
                                <li className="relative text-sm">
                                    <button onClick={() => dispatch({ type: 'fashionDropDown' })} id="userButton" className="flex items-center focus:outline-none mr-3 bg-gray-100 px-3 py-1">
                                        <span className="pb-1 md:pb-0 text-sm font-semibold">Fashion</span>
                                        <DownArrowIcon />
                                    </button>
                                    <div id="userMenu" className={`${fashionDropDown ? "" : "invisible"}  z-50 bg-white w-40 rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto`}>
                                        <ul className="list-reset px-2 py-2">
                                            <Link href="/fashion/men">
                                                <li className={`${dropdownActivePath('/fashion/men')} py-2 px-2 cursor-pointer`}>
                                                    <a className="font-bold">Men Fashion</a>
                                                </li>
                                            </Link>
                                            <Link href="/fashion/women">
                                                <li className={`${dropdownActivePath('/fashion/women')} py-2 px-2  cursor-pointer`}>
                                                    <a className="font-bold">Women Fashion</a>
                                                </li>
                                            </Link>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div> {/* large device size menu end */}


                        <div className="w-1/2 pr-0">
                            <div className="flex relative inline-block float-right">

                                {/* user info dropdown start */}
                                {
                                    isAuthenticate ?
                                        <div className="relative text-sm">
                                            <button onClick={() => dispatch({ type: 'userDropDown' })} id="userButton" className="flex items-center focus:outline-none mr-3">
                                                <img className="w-8 h-8 rounded-full mr-4" src="https://i.ibb.co/jgDtzL8/empty-avatar.jpg" alt="Avatar of User" />
                                                <span className="hidden md:inline-block font-semibold -ml-2">
                                                    Hi, {userInfo?.name?.split(" ")[0]}
                                                </span>
                                                <DownArrowIcon />
                                            </button>
                                            <div div id="userMenu" className={`${userDropDown ? "" : "invisible"} bg-white w-40 rounded shadow-md mt-2 absolute mt-12 top-0 right-0 min-w-full overflow-auto z-30`}>
                                                <ul className="list-reset px-2 py-2">
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
                                            </div>
                                        </div>
                                        :
                                        // login icon
                                        <MdAccountCircle onClick={() => router.push('/login')} className="text-3xl text-slate-500 cursor-pointer style_btn mx-2" />
                                } {/* user info dropdown end */}


                                {/* cart items */}
                                <CartItem />

                                {/* small size menu dropdown button */}
                                <div className="block lg:hidden pr-4">
                                    <button onClick={() => dispatch({ type: 'menuDropDown' })} id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-teal-500 appearance-none focus:outline-none">
                                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <title>Menu</title>
                                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                                        </svg>
                                    </button>
                                </div>

                            </div>

                        </div>
                    </div>


                    {/* small size menu */}
                    <div className={`${menuDropDown ? "" : "hidden"} bg-gray-100 w-full flex-grow lg:flex lg:items-center lg:w-auto block lg:hidden mt-2 lg:mt-0 z-20`} id="nav-content">
                        <ul className="list-reset px-5 py-2">
                            <Link href="/">
                                <li className={`${dropdownActivePath('/')} py-2 px-2 cursor-pointer`}>
                                    <a className="font-bold">Home</a>
                                </li>
                            </Link>
                            {
                                userInfo.role === 'admin' &&
                                <Link href="/admin">
                                    <li className={`${dropdownActivePath('/admin')} py-2 px-2 cursor-pointer`}>
                                        <a className="font-bold">Dashboard</a>
                                    </li>
                                </Link>
                            }
                            <Link href="/fashion/men">
                                <li className={`${dropdownActivePath('/fashion/men')} py-2 px-2  cursor-pointer`}>
                                    <a className="font-bold">Men Fashion</a>
                                </li>
                            </Link>
                            <Link href="/fashion/women">
                                <li className={`${dropdownActivePath('/fashion/women')} py-2 px-2  cursor-pointer`}>
                                    <a className="font-bold">Women Fashion</a>
                                </li>
                            </Link>
                        </ul>
                    </div>

                </div>
            </nav>
        </>
    );
};

export default Navbar;