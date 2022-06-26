import ProductCard from "../../components/Products/ProductCard";

const MenFashion = () => {
    return (
        <>
            <div className="my-14 w-11/12 m-auto">
                <div className="divider">
                    <h1 className="text-2xl font-bold text-secondary uppercase">
                        Mens Fashion
                    </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    {
                        [...Array(9)].map((elem, index) => <ProductCard img="https://static-01.daraz.com.bd/p/3a9c0f9e26a40cc3ae44de5565b05c58.jpg" key={index} />)
                    }
                </div>
            </div>
        </>
    );
};

export default MenFashion;