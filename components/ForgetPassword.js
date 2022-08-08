import React, { useState } from 'react';
import { EmailIcon } from './shared/Icon';
import axios from 'axios'
import { toast } from "react-toastify"


const ForgetPassword = () => {
    const [email, setEmail] = useState("")
    
    // handle form submit
    const handleSendEmail = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_PORT}/api/user/forgotPassword`, { email })

            console.log(res.data);
            if (res.data.message) {
                toast.success(res.data.message)
            }


        } catch (error) {
            toast.error(Object.values(error.response.data)[0]);
            console.log(error)
        }
    }

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
                    {/* <form action=""> */}
                        <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl mt-5">
                            <EmailIcon />
                            <input onChange={(e) => setEmail(e.target.value)} className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                        </div>
                        <button onClick={handleSendEmail} className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                            Request for Recover Password
                        </button>
                    {/* </form> */}
                </div>
            </div>
        </>
    );
};

export default ForgetPassword;