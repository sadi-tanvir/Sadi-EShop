import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import { ToastContainer } from 'react-toastify';
import wrapper from '../redux/store'
import { useEffect } from 'react';



function MyApp({ Component, pageProps }) {
  // redux
  const dispatch = useDispatch();
  

  // reload data
  useEffect(() => {
    if (localStorage.getItem('userInfo') && localStorage.getItem('accessToken')) {
      dispatch({ type: 'userInfo', payload: JSON.parse(localStorage.getItem("userInfo")) })
      dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem("accessToken")) })
      dispatch({ type: 'loginUser' })
    }
  }, [dispatch])

  
  return (
    <>
      {/* <Provider store={store}> */}
      <Navbar />
      <Component {...pageProps} />
      <Footer />
      {/* </Provider> */}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

// export default MyApp
export default wrapper.withRedux(MyApp);
