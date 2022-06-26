import Link from "next/link"
import { useRouter } from "next/router"
import CartIcon from "../shared/Icon";


const Navbar = () => {
    // router
    const router = useRouter()

    return (
        <nav className="navbar bg-base-100 flex justify-center items-center">
            <div className="w-10/12 flex justify-between items-center">
                <div className="">
                    <Link href="/">
                        <a className="btn btn-ghost normal-case text-2xl font-bold text-primary">Sadi Eshop</a>
                    </Link>
                </div>
                <div className="flex-none">
                    <Link href="/">
                        <a className={`${router.pathname == '/' ? 'text-primary border-b-4 border-primary' : 'text-primary'} font-bold  px-4 py-2`}>
                            Home
                        </a>
                    </Link>
                    <Link href="/vegetables">
                        <a className={`${router.pathname == '/vegetables' ? 'text-primary border-b-4 border-primary' : 'text-primary'} font-bold px-4 py-2`}>
                            Vegetables
                        </a>
                    </Link>

                    <a className="text-primary font-bold ml-5">About</a>
                    <a className="text-primary font-bold ml-5">Contact</a>


                </div>
            </div>
            <div className="indicator ml-5">
                <span className="indicator-item badge badge-primary text-white font-bold">2</span>
                <CartIcon />
            </div>
        </nav>
    );
};

export default Navbar;