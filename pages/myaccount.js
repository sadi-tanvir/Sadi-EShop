import React from 'react';
import InfoForm from '../components/myAccount/InfoForm';
import { useSelector, useDispatch } from 'react-redux';

const MyAccount = () => {
    // redux
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    return (
        <>
            <section className="text-gray-600 body-font mt-10">
                <div>
                    <div className="w-11/12 text-center sm:pr-8 sm:py-8 mx-auto">
                        <div className="avatar">
                            <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={userInfo?.img} alt="profile" />
                            </div>
                        </div>
                        <div className="flex flex-col items-center text-center justify-center">
                            <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">{userInfo?.name}</h2>
                            <div className="w-12 h-1 bg-primary rounded mt-2 mb-4"></div>
                        </div>
                    </div>
                    <div className="">
                        <InfoForm />
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyAccount;