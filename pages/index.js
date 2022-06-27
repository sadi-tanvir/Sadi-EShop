import Banner from "../components/Banner";
import HeadInfo from "../components/HeadInfo"
import HomeProducts from "../components/Products/HomeProducts";
import { useSelector } from "react-redux"

const Home = () => {
    // redux
    // const { cart, subTotal } = useSelector((state) => state.productsReducer)
    // console.log(`redux check`, cart, subTotal);
    // const addToCart = (name, price, qty, itemCode, size, variant) => {}
  return (
    <>
      <HeadInfo title="Home - Sadi EShop" />
      <Banner />
      <HomeProducts />
    </>
  );
};

export default Home;