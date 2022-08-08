import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios"
import { toast } from "react-toastify"

const ChangePasswordForm = () => {
    // redux
    const dispatch = useDispatch()
    const { accessToken, userInfo } = useSelector(state => state.authReducer)

    // state
    const [user, setUser] = useState({
        oldPassword: "",
        newPassword: "",
    })

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })
    }

    // handle form submit
    const handlePasswordChange = async (e) => {
        e.preventDefault()
        try {
            const { oldPassword, newPassword } = user;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/user/changePassword`, {
                oldPassword,
                newPassword
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    authentication: accessToken
                }
            })

            // console.log(res.data.response.status);

            if (res.data.message && res.data.success) {
                return toast.success(res.data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    return (
        <>
            <hr className="mt-20 border-b-1 border-blueGray-300" />
            <h6 className="text-secondary text-xl mt-3 mb-6 font-bold uppercase">
                Change Password
            </h6>
            <form onSubmit={handlePasswordChange}>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-5 items-center">
                    <input
                        type="password"
                        name="oldPassword"
                        className="border-0 px-3 py-3 h-10 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Old Password"
                        onChange={handleChange}
                        value={user.oldPassword}
                    />
                    <input
                        type="password"
                        name="newPassword"
                        className="border-0 px-3 h-10 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="New Password"
                        onChange={handleChange}
                        value={user.newPassword}
                    />
                    <button type="submit" className="col-span-2 md:col-span-1 block w-full mx-auto bg-primary md:mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                        Change Password
                    </button>
                </div>
            </form>
        </>
    );
};


export default ChangePasswordForm;











