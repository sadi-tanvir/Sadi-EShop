import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Provider,useSelector } from "react-redux"
import store from '../redux/store'
import { ToastContainer } from 'react-toastify';




function MyApp({ Component, pageProps }) {


  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>

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

export default MyApp
