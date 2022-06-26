import Banner from "../components/Banner";
import HeadInfo from "../components/HeadInfo"
import Products from "../components/Product/Products";
const Home = () => {
  return (
    <>
      <HeadInfo title="Home - Sadi EShop" />
      <Banner />
      <Products />
    </>
  );
};

export default Home;