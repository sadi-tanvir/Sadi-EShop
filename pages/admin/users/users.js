import React, { useEffect, useState } from 'react';
import SidebarLayout from '../../../components/admin/Sidebar/SidebarLayout';
import Breadcrumbs from '../../../components/Breadcrumbs';
import HeadInfo from '../../../components/HeadInfo';
import TableDropdown from "../../../components/admin/users/TableDropdown";
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../components/admin/Pagination';
import Swal from 'sweetalert2';

const Users = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [users, setUsers] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    const [count, setCount] = useState(0)
    const [size, setSize] = useState(5)
    const [page, setPage] = useState(0)
    const [search, setSearch] = useState("")



    // handle Delete Order
    const handleDeleteUser = async (userId) => {
        try {
            Swal.fire({ title: 'Are you sure?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33', confirmButtonText: 'Yes, cancel it!' }).then((result) => {
                if (result.isConfirmed) {
                    const deleteData = async () => {
                        const res = await axios.delete(`${process.env.NEXT_PUBLIC_PORT}/api/admin/users/deleteUser?id=${userId}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                authentication: accessToken
                            }
                        })

                        if (res.data.message) {
                            toast.success(res.data?.message)
                            setIsChanged(!isChanged)
                        }
                    }
                    deleteData()
                }
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data.message)
        }
    }

    // get count users
    useEffect(() => {
        const countUsers = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_PORT}/api/admin/users/usersCount`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            const count = res.data.usersCount
            const dividedCount = Math.ceil(count / size)
            setCount(dividedCount)
        }
        countUsers()
    }, [accessToken, size])

    // get all Users
    useEffect(() => {
        const getUsers = async () => {
            const res = await axios(`${process.env.NEXT_PUBLIC_PORT}/api/admin/users/getUsers?page=${page}&size=${size}&search=${search}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })
            setUsers(res.data.users)
        }
        getUsers()
    }, [isChanged, accessToken, size, page, search])


    return (
        <>
            {/* Breadcrumbs & header */}
            <Breadcrumbs firstPath="/" firstName="Home" secondPath="/admin" secondName="Dashboard" current="Users Management" />
            <HeadInfo title="Users Management - Sadi EShop" />

            <SidebarLayout>
                <div className={`px-5 flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded`}>
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap flex-col-reverse md:flex-row items-center mb-3">
                            <div className="mb-4 md:mb-0 w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className={`font-bold text-2xl text-secondary`} >
                                    User&rsquo;s Information
                                </h3>
                            </div>

                            {/* search products */}
                            <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search Users..." className="input input-bordered border-2 input-md input-primary lg:w-3/12 md:w-4/12 ml-auto" />
                        </div>
                    </div>
                    <div className="">
                        <div className="block w-full overflow-x-auto">
                            {/* Projects table */}
                            <table className="items-center w-full bg-gray-50 border-collapse">
                                <thead>
                                    <tr className="">
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            Name & Email
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            Phone
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            Role
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                            account Status
                                        </th>
                                        <th className={"px-6 align-middle border border-solid py-3 font-bold text-md uppercase border-l-0 border-r-0 whitespace-nowrap text-left bg-blueGray-50 text-secondary border-blueGray-100"}>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        users?.map(user => {
                                            return (
                                                <>
                                                    <tr>
                                                        <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
                                                            <div className="avatar">
                                                                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                                                    <img src={user?.img || "https://i.ibb.co/jgDtzL8/empty-avatar.jpg"} />
                                                                </div>
                                                            </div>
                                                            <span className={`ml-3 inline-block text-secondary font-bold text-md`}>
                                                                <span title={user?.name} className="block mb-2">
                                                                    {user?.name.length > 20 ? `${user?.name.slice(0, 20)}...` : user?.name}
                                                                </span>
                                                                <span title={user?.email} className="block">
                                                                    {user?.email.length > 20 ? `${user?.email.slice(0, 20)}...` : user?.email}
                                                                </span>
                                                            </span>
                                                        </th>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-primary text-white font-bold shadow-md">
                                                                {user?.phone}
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            <span className="badge badge-accent text-white font-bold shadow-md">
                                                                {user?.role}
                                                            </span>
                                                        </td>
                                                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                            {
                                                                user?.isActive ?
                                                                    <>
                                                                        <i className="fas fa-circle text-primary mr-2"></i>
                                                                        <span className='text-secondary font-bold'>
                                                                            active
                                                                        </span>
                                                                    </>
                                                                    :
                                                                    <>
                                                                        <i className="fas fa-circle text-accent mr-2"></i>
                                                                        <span className='text-secondary font-bold'>
                                                                            deactivated
                                                                        </span>
                                                                    </>
                                                            }
                                                        </td>
                                                        <td className="border-t-0 px-6 align-top border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right">
                                                            <TableDropdown
                                                                user={user}
                                                                handleDeleteUser={handleDeleteUser}
                                                            />
                                                        </td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {/* pagination */}
                    <div className="py-5">
                        <Pagination
                            count={count}
                            page={page}
                            setPage={setPage}
                            setSize={setSize}
                        />
                    </div>
                </div>
            </SidebarLayout>
        </>
    );
};


export default Users;