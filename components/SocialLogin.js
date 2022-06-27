import React from 'react';
import { FacebookSocialIcon, GithubIcon, GoogleIcon } from './shared/Icon';

const SocialLogin = () => {
    return (
        <div>
            {/* <!-- component --> */}

            <div className=" grid space-y-4">
                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:border-primary active:bg-primary">
                    <div className="relative flex items-center space-x-4 justify-center">
                        <GoogleIcon />
                        <span className="block w-max font-semibold tracking-wide text-secondary text-sm transition duration-300 sm:text-base group-active:text-white">Continue with Google</span>
                    </div>
                </button>
                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 hover:primary focus:primary active:bg-primary active:text-white">
                    <div className="relative flex items-center space-x-4 justify-center">
                        <GithubIcon />
                        <span className="block w-max font-semibold tracking-wide text-secondary text-sm transition duration-300 sm:text-base group-active:text-white">Continue with Github</span>
                    </div>
                </button>
                <button className="group h-12 px-6 border-2 border-gray-300 rounded-full transition duration-300 active:bg-primary">
                    <div className="relative flex items-center space-x-4 justify-center">
                        <FacebookSocialIcon />
                        <span className="block w-max font-semibold tracking-wide text-secondary text-sm transition duration-300 sm:text-base group-active:text-white">Continue with Facebook</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;