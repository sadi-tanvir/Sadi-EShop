import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChangePasswordForm from '../components/myAccount/ChangePasswordForm';
import UserInfoForm from '../components/myAccount/UserInfoForm';
import { UploadIcon } from '../components/shared/Icon';

// components

export default function MyAccount() {
    // redux
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    return (
        <>
            <div className="flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded-lg mt-16">
                <div className="px-6">
                    <div className="flex justify-center mt-14">
                        <img
                            src={userInfo?.img || "https://i.ibb.co/jgDtzL8/empty-avatar.jpg"}
                            alt="profile"
                            className="w-20  h-20 shadow-xl rounded-full align-middle border-none -m-16 -ml-20 lg:-ml-16"
                        />
                    </div>

                    <div className="text-center mt-7">
                        <h3 className="text-xl font-bold leading-normal mb-2 text-blueGray-700 mb-2">
                            Tanvir Hossain Sadi
                        </h3>
                    </div>

                    {/* start second */}
                    <div className="mt-10 py-10 border-t border-blueGray-200 text-center px-2 md:px-24">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                            <div className="rounded-t bg-white mb-0 px-6 py-6">
                                <div className="text-center flex justify-between">
                                    <h6 className="text-secondary text-2xl font-bold">My account</h6>
                                    <div
                                        className="bg-blueGray-700 active:bg-blueGray-600 text-primary font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                        type=""
                                    >
                                        {userInfo?.role}
                                    </div>
                                </div>
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                <h6 className="text-secondary text-xl mt-3 mb-6 font-bold uppercase">
                                    User Information
                                </h6>

                                {/* user info form */}
                                <UserInfoForm />

                                {/* update password */}
                                <ChangePasswordForm />

                            </div>
                        </div>
                    </div>
                    {/* end second */}
                </div>
            </div>
        </>
    );
}