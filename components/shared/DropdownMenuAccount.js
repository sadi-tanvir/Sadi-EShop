import { useSelector } from 'react-redux';
const DropdownMenuAccount = ({ children }) => {

    // redux
    const { userInfo } = useSelector(state => state.authReducer)

    return (
        <>
            <div className="group inline-block relative w-12">
                <button
                    className=" text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                    <div className="avatar placeholder  hover:scale-125 active:scale-90 transition-all duration-300">
                        <div className="bg-neutral-focus  border-2 border-slate-400 text-neutral-content rounded-full w-7  shadow-2xl">
                            <img
                                src={userInfo?.img || "https://i.ibb.co/jgDtzL8/empty-avatar.jpg"}
                                alt=""
                            />
                        </div>
                    </div>
                    <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                    </svg>
                </button>
                <ul className="absolute hidden z-10 text-gray-700 pt-1 group-hover:block w-[150px]">
                    {children}
                </ul>
            </div>
        </>
    );
};

export default DropdownMenuAccount;