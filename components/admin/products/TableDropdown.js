import React from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router"
import Link from "next/link";
import axios from "axios"
import { useSelector, useDispatch } from 'react-redux';
import { toast } from "react-toastify"

const TableDropdown = ({ order, handleConfirmPayment, handleConfirmDelivery,handleDeleteOrder }) => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
        setDropdownPopoverShow(false);
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
                    {order?.payment_status ||
                        <a onClick={() => handleConfirmPayment(order?._id)} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                            confirm payment
                        </a>
                    }

                    {order?.shipping ||
                        <a onClick={() => handleConfirmDelivery(order?._id)} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                            confirm delivery
                        </a>
                    }

                    <a onClick={() => handleDeleteOrder(order?._id)} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                        Delete
                    </a>
                    
                    <a onClick={() => router.push(`/ order / ${order?._id}`)} className={"text-sm cursor-pointer py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"}>
                        Details
                    </a>
                </div>
            </div>
        </>
    );
};

export default TableDropdown;
