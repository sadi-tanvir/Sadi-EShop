import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux"
import { ToastContainer } from 'react-toastify';
import wrapper from '../redux/store'
import { useEffect, useState } from 'react';
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from "next/router"


// routeChangeComplete(url, { shallow })
function MyApp({ Component, pageProps }) {
  // redux
  const dispatch = useDispatch();

  // state
  const [progress, setProgress] = useState(0)

  const router = useRouter()

  useEffect(() => {
    router.events.on('routeChangeStart', () => {
      setProgress(50)
    })
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
  }, [])



  // reload data
  useEffect(() => {
    if (localStorage.getItem('userInfo') && localStorage.getItem('accessToken')) {
      dispatch({ type: 'userInfo', payload: JSON.parse(localStorage.getItem("userInfo")) })
      dispatch({ type: 'accessToken', payload: JSON.parse(localStorage.getItem("accessToken")) })
      dispatch({ type: 'loginUser' })
    }
  }, [dispatch])

  // re-load cart data to redux store
  useEffect(() => {
    dispatch({ type: 'reloadCart', payload: JSON.parse(localStorage.getItem('cart')) })
  }, [])


  return (
    <>
      <LoadingBar
        color='#34d399'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Navbar />
      <Component {...pageProps} />
      <Footer />

      <ToastContainer
        position="top-left"
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
