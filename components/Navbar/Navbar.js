import Link from "next/link"
import { useRouter } from "next/router"
import CartItem from "../Cart/Cart";


const Navbar = () => {
    // router
    const router = useRouter()

    const dropdownActivePath = (path) => {
        return router.pathname == path ? 'bg-primary rounded-md text-white font-bold' : ''
    }

    const navActivePath = (path) => {
        return router.pathname == path ? 'text-primary border-b-4 border-primary' : 'text-secondary'
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
                            <label tabIndex="0" className={`${navActivePath('/food/vegetables' || '/food/fruits')} font-bold px-4 py-2  cursor-pointer`}>Food</label>
                            <ul tabIndex="0" className="menu dropdown-content p-2 shadow bg-base-100 w-52 mt-4">
                                <Link href="/food/vegetables">
                                    <li className={`${dropdownActivePath('/food/vegetables')}`}>
                                        <a className="">Vegetables</a>
                                    </li>
                                </Link>
                                <Link href="/food/fruits">
                                    <li className={`${dropdownActivePath('/food/fruits')}`}>
                                        <a>Fruits</a>
                                    </li>
                                </Link>
                            </ul>
                        </div>

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

                {/* cart items */}
                <CartItem />
            </nav>
        </>
    );
};

export default Navbar;