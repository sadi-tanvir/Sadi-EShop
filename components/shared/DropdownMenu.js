
const DropdownMenu = ({ name, children }) => {
    return (
        <>
            <div className="group inline-block relative">
                <button
                    className=" text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center"
                >
                    <span className="font-bold">{name}</span>
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

export default DropdownMenu;