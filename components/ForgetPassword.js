import React from 'react';
import { EmailIcon } from './shared/Icon';



const ForgetPassword = () => {
    return (
        <>
            {/* <!-- The button to open modal --> */}
            {/* <label htmlFor="my-modal-3" className="btn modal-button">open modal</label> */}

            {/* <!-- Put this part before </body> tag --> */}
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="my-modal-3" className="btn btn-secondary text-white font-bold btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">Give your email address to reset your password</h3>
                    <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl mt-5">
                        <EmailIcon />
                        <input id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                    </div>
                    <button type="submit" className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                        Reset Password
                    </button>
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;