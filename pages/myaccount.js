import React from 'react';
import InfoForm from '../components/myAccount/InfoForm';
import { useSelector,useDispatch } from 'react-redux';

const MyAccount = () => {
    // redux
    const { accessToken, userInfo } = useSelector(state => state.authReducer)
    return (
        <>
            <section className="text-gray-600 body-font">
                <div className="container px-5 py-24 mx-auto flex flex-col">
                    <div className="lg:w-4/6 mx-auto">

                        <div className="flex flex-col sm:flex-row mt-10">
                            <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                                <div className="avatar">
                                    <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        <img src={userInfo?.img} alt="profile" />
                                    </div>
                                </div>
                                <div className="flex flex-col items-center text-center justify-center">
                                    <h2 className="font-medium title-font mt-4 text-gray-900 text-lg">Phoebe Caulfield</h2>
                                    <div className="w-12 h-1 bg-primary rounded mt-2 mb-4"></div>
                                </div>
                            </div>
                            <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                                <InfoForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default MyAccount;