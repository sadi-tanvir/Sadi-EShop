import ProductSlider from "../ProductSlider";
import ProductCard from "../ProductCard"


const FruitSlider = () => {
    return (
        <>
            <div className="my-10">
                {/* <div className='w-11/12 m-auto'> */}

                <div className="divider">
                    <h1 className="text-2xl font-bold text-primary uppercase">
                        Fresh Fruits
                    </h1>
                </div>
                {/* </div> */}
                <ProductSlider>
                    <ProductCard />
                </ProductSlider>
            </div>
        </>
    );
};

export default FruitSlider