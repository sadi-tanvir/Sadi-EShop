import React, { useState } from 'react';
import { EmailIcon, PasswordIcon, UploadIcon, UserIcon } from '../components/shared/Icon';
import Link from "next/link"
import SocialLogin from "../components/SocialLogin"


const Register = () => {

    const handleSubmit = () => {}
    const handleChange = () => {}

    return (
        <>
            <div className="min-h-screen flex justify-center items-center py-20">
                <div className="flex w-full lg:w-7/12 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <form onSubmit={handleSubmit} className="bg-white rounded-md shadow-2xl px-8 py-10   rounded-xl">
                            <h1 className="font-bold text-2xl mb-1 text-center text-primary">Please Register!</h1>
                            <p className="text-sm font-normal text-gray-600 mb-8  text-center">Welcome to come here</p>

                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <UserIcon />
                                <input onChange={handleChange} id="name" className=" pl-2 w-full outline-none border-none" type="text" name="name" placeholder="Name" />
                            </div>

                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <EmailIcon />
                                <input onChange={handleChange} id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                            </div>

                            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                                <PasswordIcon />
                                <input onChange={handleChange} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />
                            </div>

                            <div className="flex items-center justify-center">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-3 pb-2">
                                        <UploadIcon />
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    </div>
                                    <input id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            <button type="submit" className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Register</button>
                            <div className="flex justify-between mt-4">
                                <Link href="/login">
                                    <span className="text-sm ml-2 hover:primary cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                                    Already have an account?
                                    </span>
                                </Link>
                            </div>
                            <div className="divider">OR</div>

                            {/* social login */}
                            <SocialLogin />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;