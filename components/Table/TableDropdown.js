import React from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router"
import Link from "next/link";

const TableDropdown = ({order}) => {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
            placement: "left-start",
        });
        setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
        setDropdownPopoverShow(false);
    };

    // next/router 
    const router = useRouter()

    return (
        <>
            <div className="">
                <a
                    className="text-blueGray-500 px-3"
                    href="#pablo"
                    ref={btnDropdownRef}
                    onClick={(e) => {
                        e.preventDefault();
                        dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
                    }}>
                    <i className="fas fa-ellipsis-v text-primary font-bold inline-block text-lg"></i>
                </a>
                <div ref={popoverDropdownRef} className={`${dropdownPopoverShow ? "block " : "hidden "} bg-white text-base float-left py-2 list-none text-left rounded shadow-lg min-w-48`}>
                    <a onClick={() => router.push(`payment/${order?._id}`)} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                        Pay
                    </a>

                    <a onClick={() => router.push(`order/${order?._id}`)} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                        Details
                    </a>

                    {/* <a onClick={() => router.push('/orders')} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                        Delete
                    </a> */}
                </div>
            </div>
        </>
    );
};

export default TableDropdown;
