import Banner from "../components/Banner";
import HeadInfo from "../components/HeadInfo"
import HomeProducts from "../components/Products/HomeProducts";
import { useDispatch } from "react-redux"
import { useEffect } from "react";

const Home = ({ cart }) => {
  // redux
  const dispatch = useDispatch();



  // reload data
  useEffect(() => {
    if (localStorage.getItem('userInfo') && localStorage.getItem('accessToken')) {
      dispatch({
        type: "loginUser", payload: {
          userInfo: localStorage.getItem("userInfo"),
          accessToken: localStorage.getItem("accessToken")
        }
      })
    }
  }, [])

  return (
    <>
      <HeadInfo title="Home - Sadi EShop" />
      <Banner />
      <HomeProducts />
    </>
  );
};

export default Home;