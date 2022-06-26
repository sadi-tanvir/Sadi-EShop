import ProductCard from '../ProductCard';
import ProductSlider from './ProductSlider';



const HomeVegetableProduct = () => {
    return (
        <>
            <div className="my-5">
                {/* <div className='w-11/12 m-auto'> */}
                    
                    <div className="divider">
                    <h1 className="text-3xl font-bold text-primary">
                        Fresh Vegetables
                    </h1></div> 
                {/* </div> */}
                <ProductSlider>
                    <ProductCard />
                </ProductSlider>
            </div>
        </>
    );
};

export default HomeVegetableProduct