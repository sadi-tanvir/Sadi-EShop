import Link from "next/link"
import { useRouter } from "next/router"


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
                    <ul className="menu menu-horizontal p-0">
                        <Link href="/">
                            <li>
                                <a className={`${router.pathname == '/' ? 'text-slate-600' : 'text-primary'} font-bold`}>
                                    Home
                                </a>
                            </li>
                        </Link>
                        <Link href="/blogs">
                            <li>
                                <a className={`${router.pathname == '/blogs' ? 'text-slate-600' : 'text-primary'} font-bold`}>
                                    Shop
                                </a>
                            </li>
                        </Link>
                        <li><a className="text-primary font-bold">About</a></li>
                        <li><a className="text-primary font-bold">Contact</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;