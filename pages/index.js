import Banner from "../components/Banner";
import HeadInfo from "../components/HeadInfo"
import HomeProducts from "../components/Products/HomeProducts";
import { useDispatch } from "react-redux"
import { useEffect } from "react";

const Home = ({cart}) => {


  console.log(`from home`,cart);



  return (
    <>
      <HeadInfo title="Home - Sadi EShop" />
      <Banner />
      <HomeProducts />
    </>
  );
};

export default Home;