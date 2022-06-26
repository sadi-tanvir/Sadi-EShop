import ProductCard from '../ProductCard';
import ProductSlider from './ProductSlider';



const HomeVegetableProduct = () => {
    return (
        <>
            <div className="my-5">
                <div className='py-5 w-11/12 m-auto'>
                    <h1 className="text-3xl font-bold text-primary">Fresh Vegetables</h1>
                </div>
                <ProductSlider>
                    <ProductCard />
                </ProductSlider>
            </div>
        </>
    );
};

export default HomeVegetableProduct