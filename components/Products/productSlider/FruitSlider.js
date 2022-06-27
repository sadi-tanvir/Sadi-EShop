import ProductSlider from "../ProductSlider";
import ProductCard from "../ProductCard"


const FruitSlider = () => {
    return (
        <>
            <div className="my-10">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Fresh Fruits
                    </h1>
                </div>
                <ProductSlider>
                    <ProductCard img="https://chaldn.com/_mpimage/komola-orange-imported-50-gm-1-kg?src=https%3A%2F%2Feggyolk.chaldal.com%2Fapi%2FPicture%2FRaw%3FpictureId%3D64292&q=low&v=1&m=400&webp=1" />
                </ProductSlider>
            </div>
        </>
    );
};

export default FruitSlider