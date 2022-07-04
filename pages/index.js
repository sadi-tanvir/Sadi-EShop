import Banner from "../components/Banner";
import HeadInfo from "../components/HeadInfo"
import HomeProducts from "../components/Products/HomeProducts";


const Home = () => {

  return (
    <>
      {/* header info */}
      <HeadInfo title="Home - Sadi EShop" />

      <Banner />
      <HomeProducts />
    </>
  );
};

export default Home;