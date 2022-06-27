import Navbar from '../components/Navbar/Navbar'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { Provider, useDispatch } from "react-redux"
import store from '../redux/store'



function MyApp({ Component, pageProps }) {
  
  return (
    <>
      <Provider store={store}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}

export default MyApp
