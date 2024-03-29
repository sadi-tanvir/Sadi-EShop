import { EmailIcon, PasswordIcon } from '../components/shared/Icon';
import Link from "next/link"
import SocialLogin from '../components/SocialLogin';
import ForgetPassword from '../components/ForgetPassword';
import { toast } from "react-toastify"
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import HeadInfo from '../components/HeadInfo';

const Login = () => {
    // redux
    const dispatch = useDispatch()
    const { isAuthenticate } = useSelector(state => state.authReducer)

    // state
    const [password, setPassword] = useState({
        newPassword: '',
        confirmPassword: ''
    })

    // next router
    const router = useRouter()

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPassword({ ...password, [name]: value })
    }


    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { newPassword, confirmPassword } = password;
            const res = await axios.put(`${process.env.NEXT_PUBLIC_PORT}/api/user/resetPassword`, { email: router.query.email, newPassword, confirmPassword })

            if (res.data.message) {
                toast.success(res.data.message)
                router.push('/login')
            }

        } catch (error) {
            toast.error(Object.values(error.response.data)[0]);
        }
    }

    // redirect to home page
    useEffect(() => {
        if (localStorage.getItem('userInfo') && localStorage.getItem('accessToken')) {
            if (isAuthenticate) {
                router.push('/')
            }
        }
    }, [isAuthenticate])


    return (
        <div>
            <HeadInfo title="Login - Sadi EShop" />
            <div className="h-screen flex justify-center items-center pb-20">
                <div className="flex w-full lg:w-7/12 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <form onSubmit={handleSubmit} className="bg-white shadow-2xl px-8 py-10 rounded-xl">
                            <h1 className="font-bold text-2xl mb-5 text-center text-primary">Reset Password</h1>
                            <div className="flex items-center border-2 mb-5 py-2 px-3 rounded-2xl ">
                                <PasswordIcon />
                                <input
                                    onChange={handleChange}
                                    className="pl-2 w-full outline-none border-none"
                                    type="password"
                                    name="newPassword"
                                    id="newPassword"
                                    placeholder="Password"
                                />
                            </div>
                            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                                <PasswordIcon />
                                <input
                                    onChange={handleChange}
                                    className="pl-2 w-full outline-none border-none"
                                    type="password"
                                    name="confirmPassword"
                                    id="confirmPassword"
                                    placeholder="Confirm Password"
                                />
                            </div>
                            <button type="submit" className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;