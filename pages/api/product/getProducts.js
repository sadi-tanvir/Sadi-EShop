import connectMongo from '../../../middleware/connectDB';
import Product from '../../../model/Product';



const getProducts = async (req, res) => {
    try {
        // connect mongodb
        await connectMongo();

        console.log(req.method)
        if (req.method !== 'GET') return res.status(400).json({ message: 'Method not allowed' });


        const products = await Product.find({});
        res.json({ products });

    } catch (error) {
        console.log(error);
        res.json({ error });
    }
}

export default getProducts;