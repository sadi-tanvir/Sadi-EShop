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
    const [info, setInfo] = useState({
        email: '',
        password: ''
    })

    // next router
    const router = useRouter()

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInfo({ ...info, [name]: value })
    }


    // handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { email, password } = info;
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user/login`, { email, password })

            if (res.data.user) {
                localStorage.setItem("userInfo", JSON.stringify(res.data.user))
                localStorage.setItem("accessToken", JSON.stringify(res.data.token))
                dispatch({ type: 'userInfo', payload: JSON.parse(localStorage.getItem("userInfo")) })
                dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem("accessToken")) })
                dispatch({ type: 'loginUser' })
                toast.success(res.data.message)
                router.push('/')
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
            <div className="h-screen flex justify-center items-center py-20">
                <div className="flex w-full lg:w-7/12 justify-center items-center bg-white space-y-8">
                    <div className="w-full px-8 md:px-32 lg:px-24">
                        <form onSubmit={handleSubmit} className="bg-white shadow-2xl px-8 py-10 rounded-xl">
                            <h1 className="font-bold text-2xl mb-1 text-center text-primary">Please Login!</h1>
                            <p className="text-sm font-normal text-gray-600 mb-8  text-center">Welcome Back</p>
                            <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                                <EmailIcon />
                                <input onChange={handleChange} id="email" className=" pl-2 w-full outline-none border-none" type="email" name="email" placeholder="Email Address" />
                            </div>
                            <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                                <PasswordIcon />
                                <input onChange={handleChange} className="pl-2 w-full outline-none border-none" type="password" name="password" id="password" placeholder="Password" />

                            </div>
                            <button type="submit" className="block w-full bg-primary mt-5 py-2 rounded-2xl hover:bg-primary hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">Login</button>
                            <div className="flex justify-between mt-4">
                                <label htmlFor="my-modal-3" className="text-sm ml-2 hover:primary cursor-pointer hover:-translate-y-1 duration-500 transition-all">Forgot Password ?</label>
                                <ForgetPassword />
                                <Link href="/register" >
                                    <span className="text-sm ml-2 hover:primary cursor-pointer hover:-translate-y-1 duration-500 transition-all">
                                        Do not have an account yet?
                                    </span>
                                </Link>
                            </div>

                            {/* <div className="divider">OR</div> */}
                            {/* social login */}
                            {/* <SocialLogin /> */}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;