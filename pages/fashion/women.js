import ProductCard from "../../components/Products/ProductCard";

const WomenFashion = () => {
    return (
        <>
            <div className="my-14 w-11/12 m-auto">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Womens Fashion
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        [...Array(9)].map((elem, index) => <ProductCard img="https://static-01.daraz.com.bd/p/8f4c8716c7aee87af057f6b643ee806d.jpg" key={index} />)
                    }
                </div>
            </div>
        </>
    );
};

export default WomenFashion;